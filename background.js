// Import the constants file
importScripts('lib/constants.js');

// Use the shared constants directly with fallback
// Instead of using window.HeyTextAI, use globalThis.HeyTextAI (or self.HeyTextAI)
const API_KEY_STORAGE_KEY = globalThis.HeyTextAI?.constants?.API_KEY_STORAGE_KEY || 'heytextai_api_key';


// Initialize context menu on installation
chrome.runtime.onInstalled.addListener(() => {
    // Create the main context menu item
    chrome.contextMenus.create({
        id: "enhanceText",
        title: "Enhance with HeyTextAI",
        contexts: ["selection"]
    });

    // Style Mode submenu
    chrome.contextMenus.create({
        id: "styleMode",
        title: "Style",
        contexts: ["selection"], 
        parentId: "enhanceText"
    });

    // Style mode options
    const styleModes = [
        { id: "styleStandard", title: "Standard", mode: "standard" },
        { id: "styleFluency", title: "Fluency", mode: "fluency" },
        { id: "styleHumanize", title: "Humanize", mode: "humanize" },
        { id: "styleFormal", title: "Formal", mode: "formal" },
        { id: "styleAcademic", title: "Academic", mode: "academic" },
        { id: "styleSimple", title: "Simple", mode: "simple" }
    ];

    // Create style mode menu items
    styleModes.forEach(style => {
        chrome.contextMenus.create({
            id: style.id,
            title: style.title,
            contexts: ["selection"],
            parentId: "styleMode",
            type: "radio",
            checked: style.mode === "standard" // Default is standard
        });
    });

    // Action Mode submenu
    chrome.contextMenus.create({
        id: "actionMode",
        title: "Action",
        contexts: ["selection"],
        parentId: "enhanceText"
    });

    // Action mode options
    const actionModes = [
        { id: "actionImprove", title: "Improve", mode: "improve" },
        { id: "actionExtend", title: "Extend", mode: "extend" },
        { id: "actionShorten", title: "Shorten", mode: "shorten" }
    ];

    // Create action mode menu items
    actionModes.forEach(action => {
        chrome.contextMenus.create({
            id: action.id,
            title: action.title,
            contexts: ["selection"],
            parentId: "actionMode",
            type: "radio",
            checked: action.mode === "improve" // Default is improve
        });
    });

    // Separator
    chrome.contextMenus.create({
        id: "separator",
        type: "separator",
        contexts: ["selection"],
        parentId: "enhanceText"
    });

    // Quick actions
    chrome.contextMenus.create({
        id: "quickImprove",
        title: "Quick Improve",
        contexts: ["selection"],
        parentId: "enhanceText"
    });

    chrome.contextMenus.create({
        id: "quickFormal",
        title: "Quick Make Formal",
        contexts: ["selection"],
        parentId: "enhanceText"
    });

    chrome.contextMenus.create({
        id: "quickShorten",
        title: "Quick Make Concise",
        contexts: ["selection"],
        parentId: "enhanceText"
    });

    // Load saved preferences
    chrome.storage.sync.get(['selectedStyleMode', 'selectedActionMode'], (data) => {
        const currentStyleMode = data.selectedStyleMode || "standard";
        const currentActionMode = data.selectedActionMode || "improve";
        
        // Update the checked state of style mode items
        styleModes.forEach(style => {
            chrome.contextMenus.update(style.id, {
                checked: style.mode === currentStyleMode
            });
        });
        
        // Update the checked state of action mode items
        actionModes.forEach(action => {
            chrome.contextMenus.update(action.id, {
                checked: action.mode === currentActionMode
            });
        });
    });
});

// Store the current selected modes
let currentStyleMode = "standard";
let currentActionMode = "improve";

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // Handle style mode selections
    if (info.menuItemId.startsWith("style") && info.menuItemId !== "styleMode") {
        const styleMode = info.menuItemId.replace("style", "").toLowerCase();
        currentStyleMode = styleMode;
        chrome.storage.sync.set({ 'selectedStyleMode': styleMode });
        return;
    }
    
    // Handle action mode selections
    if (info.menuItemId.startsWith("action") && info.menuItemId !== "actionMode") {
        const actionMode = info.menuItemId.replace("action", "").toLowerCase();
        currentActionMode = actionMode;
        chrome.storage.sync.set({ 'selectedActionMode': actionMode });
        return;
    }
    
    // Handle quick actions
    if (info.menuItemId === "quickImprove" && info.selectionText) {
        enhanceText(info.selectionText, tab, "improve", "standard");
    } else if (info.menuItemId === "quickFormal" && info.selectionText) {
        enhanceText(info.selectionText, tab, "improve", "formal");
    } else if (info.menuItemId === "quickShorten" && info.selectionText) {
        enhanceText(info.selectionText, tab, "shorten", "standard");
    } else if (info.menuItemId === "enhanceText" && info.selectionText) {
        // Use current selected modes
        chrome.storage.sync.get(['selectedStyleMode', 'selectedActionMode'], (data) => {
            const styleMode = data.selectedStyleMode || currentStyleMode || "standard";
            const actionMode = data.selectedActionMode || currentActionMode || "improve";
            enhanceText(info.selectionText, tab, actionMode, styleMode);
        });
    }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'api-key-updated') {
        // Send response
        sendResponse({ success: true });
        return true; // Keep the message channel open for async response
    }
    
    // Handle mode updates from content script
    if (message.type === 'update-modes') {
        // Update the current modes
        if (message.styleMode) {
            currentStyleMode = message.styleMode;
            
            // Update context menu checked state - clear all first
            const styleModes = ["standard", "fluency", "humanize", "formal", "academic", "simple"];
            styleModes.forEach(mode => {
                chrome.contextMenus.update(`style${capitalizeFirstLetter(mode)}`, {
                    checked: mode === message.styleMode
                });
            });
        }
        
        if (message.actionMode) {
            currentActionMode = message.actionMode;
            
            // Update context menu checked state - clear all first
            const actionModes = ["improve", "extend", "shorten"];
            actionModes.forEach(mode => {
                chrome.contextMenus.update(`action${capitalizeFirstLetter(mode)}`, {
                    checked: mode === message.actionMode
                });
            });
        }
        
        sendResponse({ success: true });
        return true;
    }
    
    // Handle preference syncing request
    if (message.type === 'get-preferences') {
        chrome.storage.sync.get(['selectedStyleMode', 'selectedActionMode'], (data) => {
            sendResponse({
                styleMode: data.selectedStyleMode || 'standard',
                actionMode: data.selectedActionMode || 'improve'
            });
        });
        return true; // Keep the message channel open for async response
    }
});

// Function to enhance text via API
async function enhanceText(selectedText, tab, actionMode = "improve", styleMode = "standard") {
    if (!selectedText || selectedText.trim() === '') {
        showNotification(tab.id, "Please select some text to enhance.");
        return;
    }

    const apiUrl = "https://heytextai.com/api/v1/enhance";
    let domain;

    try {
        domain = new URL(tab.url).hostname;
    } catch (error) {
        domain = "";
    }

    // Show loading notification
    showNotification(tab.id, "Enhancing text...");

    try {
        // Prepare headers
        const headers = {
            "Content-Type": "application/json"
        };

        // Get API key from storage
        const apiKeyData = await new Promise(resolve => {
            chrome.storage.local.get([API_KEY_STORAGE_KEY], (result) => {
                resolve(result[API_KEY_STORAGE_KEY]);
            });
        });

        if (apiKeyData) {
            // Use API key for authentication
            headers["Authorization"] = `ApiKey ${apiKeyData}`;
        } else {
            // No API key, proceed with anonymous request
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                text: selectedText,
                context: {
                    source: "contextmenu",
                    domain: domain
                },
                preferences: {
                    styleMode: styleMode,
                    actionMode: actionMode
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Execute script to show enhanced text in a styled popup
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: showEnhancedTextPopup,
            args: [selectedText, data.enhanced, styleMode, actionMode]
        });
    } catch (error) {
        showNotification(tab.id, "Error enhancing text. Please try again.");
    }
}

// Function to show a toast notification instead of an alert
function showNotification(tabId, message) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: createToastNotification,
        args: [message]
    });
}

// Function to create a toast notification
function createToastNotification(message) {
    // Add styles if not already added
    if (!document.getElementById('heytextai-toast-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'heytextai-toast-styles';
        styleEl.textContent = `
            @keyframes toastFadeIn {
                0% { opacity: 0; transform: translateY(20px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes toastFadeOut {
                0% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(20px); }
            }
            
            .heytextai-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(66, 133, 244, 0.95);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10001;
                font-size: 14px;
                max-width: 300px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                backdrop-filter: blur(4px);
                border-left: 4px solid #2a6797;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            
            .heytextai-toast.show {
                opacity: 1;
                transform: translateY(0);
                animation: toastFadeIn 0.3s ease forwards;
            }
            
            .heytextai-toast.hide {
                animation: toastFadeOut 0.3s ease forwards;
            }
            
            .heytextai-toast-icon {
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            
            .heytextai-toast-icon svg {
                width: 20px;
                height: 20px;
                filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.2));
            }
            
            .heytextai-toast-text {
                flex-grow: 1;
                line-height: 1.4;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'heytextai-toast';
    
    const icon = document.createElement('span');
    icon.className = 'heytextai-toast-icon';
    
    // Use custom SVG icon
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("viewBox", "0 0 36 36");
    iconSvg.innerHTML = '<path fill="#4289C1" d="M26 28H10c-2.484 0-4.615 1.51-5.527 3.661C4.107 31.258 3.584 31 3 31c-1.1 0-2 .9-2 2v3h31v-2c0-3.313-2.687-6-6-6z"/><path fill="#2A6797" d="M14 27h8s1 9-4 9-4-9-4-9z"/><ellipse fill="#292F33" cx="18" cy="19.024" rx="15" ry="3.529"/><path fill="#FFDC5D" d="M26.339 17.563c-.809-3.6-4.235-8.65-8.339-8.65s-7.53 5.05-8.339 8.65c-.836.048-1.494.52-1.494 1.889 0 1.448.734 2.622 1.639 2.622.015 0 .028-.006.043-.007 1.064 4.376 4.31 8.013 8.152 8.013s7.088-3.637 8.152-8.013c.015.001.028.007.043.007.905 0 1.639-1.174 1.639-2.622-.002-1.369-.659-1.84-1.496-1.889z"/><path fill="#662113" d="M14 20.709c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm8 0c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1z"/><path fill="#C1694F" d="M18.75 21.824h-1.5c-.413 0-.75-.337-.75-.75s.337-.75.75-.75h1.5c.413 0 .75.337.75.75s-.337.75-.75.75zm1.417 3.209h-4.333c-.412 0-.75-.337-.75-.75v-.331c0-.412.337-.75.75-.75h4.333c.413 0 .75.337.75.75v.331c0 .412-.338.75-.75.75z"/><path fill="#E6E7E8" d="M26.424 17.846c.193-.092.348-.224.449-.399.414-.717-.219-1.859-1.415-2.549s-2.501-.668-2.915.049c-.414.717.219 1.859 1.415 2.549.519.299 1.054.457 1.532.489-.292.524-.49 1.473-.49 2.569 0 1.063.185 1.991.463 2.524-.409-.016-.953.396-1.291.764-.709-.739-1.841-1.549-3.12-1.802-2.052-.406-2.901.386-3.088.933-.182-.547-1.029-1.348-3.09-.94-1.259.249-2.374 1.038-3.085 1.767-.339-.357-.86-.737-1.253-.722.279-.533.464-1.462.464-2.524 0-1.101-.2-2.054-.495-2.575.566.064 1.274-.09 1.953-.482 1.196-.69 1.829-1.832 1.415-2.549-.414-.717-1.719-.739-2.915-.049s-1.829 1.832-1.415 2.549c.05.087.115.163.189.229-.421.352-.732 1.5-.732 2.877 0 1.657.448 3 1 3 .02 0 .039-.014.059-.018-.037.136-.059.302-.059.511 0 1.823.667 1.823.667 1.823-.667 1.823.667 3.66.667 3.66 0 2.735 2 2.735 2 2.735C13.333 35 16 34.089 16 34.089 16.667 35 18 35 18 35s1.333 0 2-.911c0 0 2.667.911 2.667-1.823 0 0 2 0 2-2.735 0 0 1.333-1.837.667-3.66 0 0 .667 0 .667-1.823 0-.21-.022-.376-.059-.512.02.004.039.018.059.018.552 0 1-1.343 1-3-.001-1.2-.237-2.228-.577-2.708zm-5.757 8.024C18.781 24.582 18 24.959 18 24.959s-.781-.377-2.667.911c-1.013.692-2.024-.192-2.745-1.057.748-.275 1.684-.622 2.675-.818 1.831.03 2.534-.225 2.701-.599.167.364.875.598 2.7.606 1.013.2 1.97.56 2.726.837-.719.856-1.721 1.717-2.723 1.031z"/><path fill="#4289C1" d="M25.765 15.157C24.537 12.47 18.793 0 18 0s-6.537 12.47-7.765 15.157C5.415 16.001 3 17.595 3 19c6-2 11-2.443 15-2.443S27 17 33 19c0-1.405-2.415-2.999-7.235-3.843z"/><path fill="#D99E82" d="M5 36H3V11.862L2 8h4l-1 3.862z"/><circle fill="#55ACEE" cx="4" cy="6" r="3"/><circle fill="#B0F0FF" cx="3.5" cy="5.5" r="1.5"/><path fill="#FFDC5D" d="M7 30.5C7 32.433 5.657 34 4 34s-3-1.567-3-3.5S2.343 28 4 28s3 .567 3 2.5z"/>';
    
    icon.appendChild(iconSvg);
    
    const text = document.createElement('span');
    text.className = 'heytextai-toast-text';
    text.textContent = message;
    
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    
    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Function to show enhanced text with a styled popup
function showEnhancedTextPopup(originalText, enhancedText, styleMode, actionMode) {
    // Store the enhanced text for later use
    window.HeyTextAI = window.HeyTextAI || {};
    window.HeyTextAI.lastEnhancedText = enhancedText;
    
    // Add styles if not already added
    addStyles();
    
    // Create the popup
    const popup = document.createElement("div");
    popup.classList.add("heytextai-preview-popup");
    
    // Create title container with icon
    const titleContainer = document.createElement("div");
    titleContainer.style.display = "flex";
    titleContainer.style.alignItems = "center";
    titleContainer.style.marginBottom = "8px";
    
    const iconContainer = document.createElement("div");
    iconContainer.style.marginRight = "5px";
    
    // Use custom SVG icon
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("viewBox", "0 0 36 36");
    iconSvg.setAttribute("width", "16");
    iconSvg.setAttribute("height", "16");
    iconSvg.innerHTML = '<path fill="#4289C1" d="M26 28H10c-2.484 0-4.615 1.51-5.527 3.661C4.107 31.258 3.584 31 3 31c-1.1 0-2 .9-2 2v3h31v-2c0-3.313-2.687-6-6-6z"/><path fill="#2A6797" d="M14 27h8s1 9-4 9-4-9-4-9z"/><ellipse fill="#292F33" cx="18" cy="19.024" rx="15" ry="3.529"/><path fill="#FFDC5D" d="M26.339 17.563c-.809-3.6-4.235-8.65-8.339-8.65s-7.53 5.05-8.339 8.65c-.836.048-1.494.52-1.494 1.889 0 1.448.734 2.622 1.639 2.622.015 0 .028-.006.043-.007 1.064 4.376 4.31 8.013 8.152 8.013s7.088-3.637 8.152-8.013c.015.001.028.007.043.007.905 0 1.639-1.174 1.639-2.622-.002-1.369-.659-1.84-1.496-1.889z"/><path fill="#662113" d="M14 20.709c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm8 0c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1z"/><path fill="#C1694F" d="M18.75 21.824h-1.5c-.413 0-.75-.337-.75-.75s.337-.75.75-.75h1.5c.413 0 .75.337.75.75s-.337.75-.75.75zm1.417 3.209h-4.333c-.412 0-.75-.337-.75-.75v-.331c0-.412.337-.75.75-.75h4.333c.413 0 .75.337.75.75v.331c0 .412-.338.75-.75.75z"/><path fill="#E6E7E8" d="M26.424 17.846c.193-.092.348-.224.449-.399.414-.717-.219-1.859-1.415-2.549s-2.501-.668-2.915.049c-.414.717.219 1.859 1.415 2.549.519.299 1.054.457 1.532.489-.292.524-.49 1.473-.49 2.569 0 1.063.185 1.991.463 2.524-.409-.016-.953.396-1.291.764-.709-.739-1.841-1.549-3.12-1.802-2.052-.406-2.901.386-3.088.933-.182-.547-1.029-1.348-3.09-.94-1.259.249-2.374 1.038-3.085 1.767-.339-.357-.86-.737-1.253-.722.279-.533.464-1.462.464-2.524 0-1.101-.2-2.054-.495-2.575.566.064 1.274-.09 1.953-.482 1.196-.69 1.829-1.832 1.415-2.549-.414-.717-1.719-.739-2.915-.049s-1.829 1.832-1.415 2.549c.05.087.115.163.189.229-.421.352-.732 1.5-.732 2.877 0 1.657.448 3 1 3 .02 0 .039-.014.059-.018-.037.136-.059.302-.059.511 0 1.823.667 1.823.667 1.823-.667 1.823.667 3.66.667 3.66 0 2.735 2 2.735 2 2.735C13.333 35 16 34.089 16 34.089 16.667 35 18 35 18 35s1.333 0 2-.911c0 0 2.667.911 2.667-1.823 0 0 2 0 2-2.735 0 0 1.333-1.837.667-3.66 0 0 .667 0 .667-1.823 0-.21-.022-.376-.059-.512.02.004.039.018.059.018.552 0 1-1.343 1-3-.001-1.2-.237-2.228-.577-2.708zm-5.757 8.024C18.781 24.582 18 24.959 18 24.959s-.781-.377-2.667.911c-1.013.692-2.024-.192-2.745-1.057.748-.275 1.684-.622 2.675-.818 1.831.03 2.534-.225 2.701-.599.167.364.875.598 2.7.606 1.013.2 1.97.56 2.726.837-.719.856-1.721 1.717-2.723 1.031z"/><path fill="#4289C1" d="M25.765 15.157C24.537 12.47 18.793 0 18 0s-6.537 12.47-7.765 15.157C5.415 16.001 3 17.595 3 19c6-2 11-2.443 15-2.443S27 17 33 19c0-1.405-2.415-2.999-7.235-3.843z"/><path fill="#D99E82" d="M5 36H3V11.862L2 8h4l-1 3.862z"/><circle fill="#55ACEE" cx="4" cy="6" r="3"/><circle fill="#B0F0FF" cx="3.5" cy="5.5" r="1.5"/><path fill="#FFDC5D" d="M7 30.5C7 32.433 5.657 34 4 34s-3-1.567-3-3.5S2.343 28 4 28s3 .567 3 2.5z"/>';
    
    iconContainer.appendChild(iconSvg);
    
    const previewTitle = document.createElement("div");
    previewTitle.classList.add("heytextai-preview-title");
    previewTitle.textContent = "Enhanced Text:";
    
    titleContainer.appendChild(iconContainer);
    titleContainer.appendChild(previewTitle);
    
    const previewMode = document.createElement("div");
    previewMode.classList.add("heytextai-preview-mode");
    previewMode.textContent = `${capitalizeFirstLetter(actionMode)} - ${capitalizeFirstLetter(styleMode)}`;
    
    const previewContent = document.createElement("div");
    previewContent.classList.add("heytextai-preview-content");
    previewContent.textContent = enhancedText;
    
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("heytextai-action-buttons");
    
    const applyButton = document.createElement("button");
    applyButton.innerHTML = "✓";
    applyButton.classList.add("heytextai-action-button", "heytextai-apply-button");
    applyButton.title = "Apply Changes";
    
    const copyButton = document.createElement("button");
    copyButton.innerHTML = "📋";
    copyButton.classList.add("heytextai-action-button", "heytextai-copy-button");
    copyButton.title = "Copy to Clipboard";
    
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = "✕";
    cancelButton.classList.add("heytextai-action-button", "heytextai-cancel-button");
    cancelButton.title = "Cancel";
    
    // Add button event listeners
    applyButton.addEventListener("click", () => {
        let success = false;
        
        // Try to replace the selected text
        try {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const container = range.commonAncestorContainer;
                
                // Find the closest input, textarea, or contenteditable element
                let element = container;
                while (element && element.nodeType === Node.TEXT_NODE) {
                    element = element.parentNode;
                }
                
                if (element) {
                    // Check if it's an input or textarea
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        // For input/textarea elements
                        const start = element.selectionStart;
                        const end = element.selectionEnd;
                        
                        // Handle input/textarea replacement
                        const currentValue = element.value;
                        element.value = currentValue.substring(0, start) + enhancedText + currentValue.substring(end);
                        
                        // Maintain cursor position
                        element.selectionStart = start + enhancedText.length;
                        element.selectionEnd = start + enhancedText.length;
                        
                        // Trigger input event for frameworks
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                        
                        success = true;
                    }
                    // Check if it's contenteditable
                    else if (element.isContentEditable || element.getAttribute('contenteditable') === 'true') {
                        // For contenteditable elements like Gmail
                        range.deleteContents();
                        range.insertNode(document.createTextNode(enhancedText));
                        
                        // Dispatch input event
                        const inputEvent = new InputEvent('input', {
                            bubbles: true,
                            cancelable: true
                        });
                        element.dispatchEvent(inputEvent);
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                        
                        success = true;
                    }
                    // Regular text node replacement
                    else {
                        range.deleteContents();
                        range.insertNode(document.createTextNode(enhancedText));
                        success = true;
                    }
                } else {
                    // Fallback to simple replacement
                    range.deleteContents();
                    range.insertNode(document.createTextNode(enhancedText));
                    success = true;
                }
            }
        } catch (error) {
            console.error("Error replacing text:", error);
        }
        
        if (!success) {
            // Show copy message
            createToastNotification("Couldn't apply changes automatically. Text copied to clipboard instead.");
            navigator.clipboard.writeText(enhancedText);
        } else {
            createToastNotification("Changes applied successfully!");
        }
        
        // Remove popup with animation
        popup.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    });
    
    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(enhancedText)
            .then(() => {
                // Visual feedback on button click
                const originalColor = copyButton.style.backgroundColor;
                copyButton.style.backgroundColor = "#45a049";
                setTimeout(() => {
                    copyButton.style.backgroundColor = originalColor;
                }, 500);
                
                createToastNotification("Text copied to clipboard");
            });
            
        // Remove popup after a delay with animation
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
            }, 300);
        }, 300);
    });
    
    cancelButton.addEventListener("click", () => {
        // Remove with animation
        popup.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 300);
    });
    
    // Add elements to popup
    actionButtons.appendChild(applyButton);
    actionButtons.appendChild(copyButton);
    actionButtons.appendChild(cancelButton);
    
    popup.appendChild(titleContainer);
    popup.appendChild(previewMode);
    popup.appendChild(previewContent);
    popup.appendChild(actionButtons);
    
    // Position the popup
    positionPopup(popup);
    
    // Add popup to the document
    document.body.appendChild(popup);
    
    // Show with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

// Function to position the popup
function positionPopup(popup) {
    // Get selection position
    const selection = window.getSelection();
    let rect = null;
    
    if (selection.rangeCount > 0) {
        rect = selection.getRangeAt(0).getBoundingClientRect();
    }
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Set initial position to render the popup so we can get its dimensions
    popup.style.opacity = '0';
    popup.style.top = '0';
    popup.style.left = '0';
    
    // Get dimensions after a small delay to ensure rendering
    setTimeout(() => {
        const popupWidth = popup.offsetWidth || 250; // Default width if not rendered yet
        const popupHeight = popup.offsetHeight || 200; // Estimate height if not rendered yet
        
        // Set final position
        if (rect && rect.width > 0) {
            // Position relative to selection
            if (rect.right + 50 + popupWidth > windowWidth) {
                // Not enough space on the right, try left side
                if (rect.left - 50 - popupWidth > 0) {
                    // Enough space on the left
                    popup.style.left = "auto";
                    popup.style.right = (windowWidth - rect.left + 10) + "px";
                } else {
                    // Not enough space on either side, center horizontally
                    popup.style.left = Math.max(10, (windowWidth - popupWidth) / 2) + "px";
                    popup.style.right = "auto";
                }
            } else {
                // Enough space on the right
                popup.style.left = (rect.right + 50) + "px";
                popup.style.right = "auto";
            }
            
            // Vertical positioning
            if (rect.top - 10 + popupHeight > windowHeight) {
                // Would go off bottom of screen, position higher
                popup.style.top = Math.max(10, windowHeight - popupHeight - 10) + "px";
            } else if (rect.top - 10 < 0) {
                // Would go off top of screen, position lower
                popup.style.top = "10px";
            } else {
                // Default position
                popup.style.top = (rect.top - 10) + "px";
            }
        } else {
            // Fallback to center screen if no valid selection position
            popup.style.left = Math.max(10, (windowWidth - popupWidth) / 2) + "px";
            popup.style.top = Math.max(10, (windowHeight - popupHeight) / 2) + "px";
        }
        
        // Make popup visible with transition
        popup.style.opacity = '1';
    }, 0);
}

// Function to capitalize first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add CSS for animations and popup styles
function addStyles() {
    if (document.getElementById('heytextai-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'heytextai-styles';
    styleEl.textContent = `
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            0% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(10px); }
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(66, 133, 244, 0); }
            100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
        }
        
        @keyframes buttonScale {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .heytextai-preview-popup {
            position: fixed;
            width: 250px;
            max-height: 300px;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            padding: 16px;
            font-size: 14px;
            z-index: 10001;
            transition: all 0.3s ease;
            color: #333;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .heytextai-preview-popup.show {
            animation: fadeIn 0.3s ease forwards;
        }
        
        .heytextai-preview-popup:not(.show) {
            animation: fadeOut 0.3s ease forwards;
        }
        
        .heytextai-preview-title {
            font-weight: bold;
            margin-bottom: 2px;
            color: #4285f4;
        }
        
        .heytextai-preview-mode {
            font-size: 12px;
            color: #777;
            margin-bottom: 12px;
            background-color: #f5f8ff;
            padding: 4px 8px;
            border-radius: 4px;
            display: inline-block;
        }
        
        .heytextai-preview-content {
            margin-bottom: 16px;
            line-height: 1.6;
            border-bottom: 1px solid #eee;
            padding-bottom: 16px;
        }
        
        .heytextai-action-buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
        }
        
        .heytextai-action-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        }
        
        .heytextai-action-button:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }
        
        .heytextai-action-button:active {
            transform: scale(0.95);
        }
        
        .heytextai-apply-button {
            background-color: #4CAF50;
        }
        
        .heytextai-copy-button {
            background-color: #2196F3;
        }
        
        .heytextai-cancel-button {
            background-color: #f44336;
        }
    `;
    document.head.appendChild(styleEl);
}
