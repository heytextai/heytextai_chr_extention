// Add CSS for animations and button styles
function addStyles() {
    if (document.getElementById('heytextai-styles')) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'heytextai-styles';
    styleEl.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(66, 133, 244, 0); }
            100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
        }
        
        @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        
        .heytextai-enhance-button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            padding: 0;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            position: fixed;
            z-index: 10000;
            backdrop-filter: blur(4px);
            background: rgba(66, 133, 244, 0.9);
            animation: buttonAppear 0.3s ease-out;
        }
        
        .heytextai-enhance-button:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }
        
        .heytextai-enhance-button:focus-visible {
            box-shadow: 0 0 0 2px white, 0 0 0 4px #4285f4;
        }
        
        .heytextai-enhance-button svg {
            filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.3));
            transition: transform 0.3s ease;
        }
        
        .heytextai-enhance-button:hover svg {
            transform: scale(1.1);
        }
        
        .heytextai-loading {
            pointer-events: none;
            animation: pulse 2s infinite;
        }
        
        .heytextai-loading::after {
            content: "";
            position: absolute;
            width: 80%;
            height: 80%;
            border: 2px solid white;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .heytextai-action-button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        }
        
        .heytextai-action-button:hover {
            transform: scale(1.1);
            box-shadow: 0 3px 8px rgba(0,0,0,0.3);
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
        
        .heytextai-preview-popup {
            position: fixed;
            width: 250px;
            max-height: 300px;
            overflow-y: auto;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            padding: 12px;
            font-size: 12px;
            z-index: 10001;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            color: #333;
            pointer-events: none;
        }
        
        .heytextai-preview-popup.show {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
            animation: fadeIn 0.3s ease forwards;
        }
        
        .heytextai-preview-title {
            font-weight: bold;
            margin-bottom: 2px;
            color: #4285f4;
        }
        
        .heytextai-preview-mode {
            font-size: 10px;
            color: #777;
            margin-bottom: 8px;
        }
        
        .heytextai-preview-content {
            margin-bottom: 12px;
            line-height: 1.4;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        
        .heytextai-action-buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
        }
        
        .heytextai-mode-menu {
            position: fixed;
            width: 180px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            padding: 10px;
            font-size: 12px;
            z-index: 10001;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
            transform: translateY(10px);
            color: #333;
        }
        
        .heytextai-mode-menu.show {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
        
        .heytextai-mode-container {
            margin-bottom: 10px;
        }
        
        .heytextai-mode-label {
            font-weight: bold;
            margin-bottom: 5px;
            color: #4285f4;
        }
        
        .heytextai-mode-button {
            display: inline-block;
            margin: 2px;
            padding: 4px 8px;
            border-radius: 12px;
            border: 1px solid #ddd;
            background: #f5f5f5;
            font-size: 11px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .heytextai-mode-button:hover {
            background: #e0e0e0;
            transform: translateY(-1px);
        }
        
        .heytextai-mode-button.active {
            background: #4285f4;
            color: white;
            border-color: #4285f4;
        }
        
        /* Animation for button appearance */
        @keyframes buttonAppear {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(styleEl);
}

// Store references to buttons and their associated elements
const buttonMap = new Map();
let currentButton = null;
let currentPopup = null;

// Store the last valid selection for email providers
let lastValidSelection = null;
let lastValidRange = null;

// Gmail-specific selection handling
let gmailSelectionData = null;

// Store reference to last selected text and position
let lastSelectedText = null;
let lastSelectionRect = null;
let lastEditableElement = null;

// Function to get selected text position
function getSelectionPosition() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return rect;
}

// Enhanced text context detection for email providers
function detectTextContext(selection) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    
    // Store the selection and range for email providers
    lastValidSelection = selection;
    lastValidRange = range;
    
    // Get the context of where the text is
    const context = {
        isEditable: false,
        isInputField: false,
        isContentEditable: false,
        isRichText: false,
        isEmailEditor: false,
        parentElement: null,
        editableParent: null,
        iframe: null
    };

    // Check if we're in an iframe
    let iframe = null;
    try {
        if (window.location.hostname.includes('gmail.com') || 
            window.location.hostname.includes('outlook') ||
            window.location.hostname.includes('yahoo.com')) {
            
            context.isEmailEditor = true;
            
            // Find the iframe we're in
            let currentWindow = window;
            while (currentWindow !== window.top) {
                iframe = currentWindow.frameElement;
                if (iframe) {
                    context.iframe = iframe;
                    break;
                }
                currentWindow = currentWindow.parent;
            }
        }
    } catch (e) {
        console.log('Cross-origin iframe detection failed:', e);
    }

    // Check if selection is in an input field or contenteditable
    let element = container.nodeType === 3 ? container.parentElement : container;
    let currentElement = element;

    while (currentElement && currentElement !== document.body) {
        // Check for email-specific editors
        if (currentElement.getAttribute('role') === 'textbox' || 
            currentElement.getAttribute('contenteditable') === 'true' ||
            currentElement.classList.contains('editable') ||
            currentElement.classList.contains('compose-message') ||
            currentElement.id?.includes('editor') ||
            currentElement.className?.includes('editor')) {
            
            context.isContentEditable = true;
            context.isRichText = true;
            context.isEmailEditor = true;
            context.editableParent = currentElement;
            break;
        }

        // Check for input fields
        if (currentElement.tagName === 'INPUT' || currentElement.tagName === 'TEXTAREA') {
            context.isInputField = true;
            context.parentElement = currentElement;
            break;
        }
        
        // Check for contenteditable
        if (currentElement.isContentEditable || currentElement.getAttribute('contenteditable') === 'true') {
            context.isContentEditable = true;
            context.editableParent = currentElement;
            
            // Check if it's a rich text editor
            if (currentElement.querySelector('div, p, br') || 
                currentElement.closest('[role="textbox"]') ||
                currentElement.closest('.ql-editor') ||
                currentElement.closest('.tox-edit-area') ||
                currentElement.closest('.cke_editable') ||
                currentElement.closest('.fr-element')) {
                context.isRichText = true;
            }
            break;
        }

        currentElement = currentElement.parentElement;
    }

    context.isEditable = context.isInputField || context.isContentEditable;
    return context;
}

// Improved smart text replacement for email providers
function smartReplaceText(selection, newText, context) {
    if ((!selection || !selection.rangeCount) && !lastValidSelection) return false;

    try {
        // Use the stored selection/range for email providers if the current one is lost
        if (context.isEmailEditor && (!selection || !selection.rangeCount) && lastValidSelection && lastValidRange) {
            selection = lastValidSelection;
            range = lastValidRange;
        } else {
            range = selection.getRangeAt(0);
        }

        if (context.isEmailEditor) {
            // Special handling for email editors
            const textNode = document.createTextNode(newText);
            
            // Preserve formatting if possible
            let formattedContent = range.cloneContents();
            if (formattedContent.textContent) {
                // Replace text while keeping the HTML structure
                let fragment = document.createDocumentFragment();
                let tempDiv = document.createElement('div');
                tempDiv.appendChild(formattedContent);
                
                // Replace text content while preserving HTML
                const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT);
                let node;
                while (node = walker.nextNode()) {
                    node.textContent = newText;
                    break; // Only replace first text node
                }
                
                fragment.appendChild(tempDiv.firstChild);
                range.deleteContents();
                range.insertNode(fragment);
            } else {
                // Simple text replacement
                range.deleteContents();
                range.insertNode(textNode);
            }
            
            // Trigger input events for email editors
            const inputEvent = new InputEvent('input', {
                bubbles: true,
                cancelable: true
            });
            context.editableParent?.dispatchEvent(inputEvent);
            
            // Additional event for Gmail
            if (window.location.hostname.includes('gmail.com')) {
                const changeEvent = new Event('change', { bubbles: true });
                context.editableParent?.dispatchEvent(changeEvent);
            }
            
            return true;
        } 
        else if (context.isInputField) {
            const input = context.parentElement;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            
            // Handle input/textarea replacement
            const currentValue = input.value;
            input.value = currentValue.substring(0, start) + newText + currentValue.substring(end);
            
            // Maintain cursor position
            input.selectionStart = start + newText.length;
            input.selectionEnd = start + newText.length;
            
            // Trigger input event for frameworks
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            return true;
        } 
        else if (context.isContentEditable) {
            if (context.isRichText) {
                // Handle rich text editors
                const textNode = document.createTextNode(newText);
                range.deleteContents();
                range.insertNode(textNode);
                
                // Move cursor to end of inserted text
                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                selection.removeAllRanges();
                selection.addRange(range);
                
                // Trigger input event for rich text editors
                const inputEvent = new InputEvent('input', {
                    bubbles: true,
                    cancelable: true
                });
                context.editableParent.dispatchEvent(inputEvent);
            } else {
                // Handle simple contenteditable
                range.deleteContents();
                range.insertNode(document.createTextNode(newText));
            }
            return true;
        }
        else {
            // Handle regular text selection (non-editable)
            console.log("Selected text is not in an editable area");
            return false;
        }
    } catch (error) {
        console.error("Error replacing text:", error);
        return false;
    }
}

// Enhanced email provider detection
function isInEmailProvider() {
    const hostname = window.location.hostname;
    return hostname.includes('gmail.com') || 
           hostname.includes('outlook') ||
           hostname.includes('mail.yahoo.com') ||
           hostname.includes('mail.google.com');
}

// Store selection data more reliably for Gmail
function storeSelectionData(selection) {
    if (!selection || !selection.rangeCount) return null;

    try {
        const range = selection.getRangeAt(0);
        const selectedText = selection.toString().trim();
        
        if (isInEmailProvider() && selectedText) {
            // Save detailed selection info for Gmail
            const container = range.commonAncestorContainer;
            const startContainer = range.startContainer;
            const endContainer = range.endContainer;
            
            // Find parent element for tracking
            const parentElement = container.nodeType === 3 ? container.parentElement : container;
            const xpath = getXPath(parentElement);
            
            gmailSelectionData = {
                text: selectedText,
                xpath: xpath,
                startOffset: range.startOffset,
                endOffset: range.endOffset,
                rect: range.getBoundingClientRect()
            };
            
            // Add attribute to make tracking easier
            if (parentElement) {
                parentElement.setAttribute('data-heytextai-selection', 'true');
            }
        }
    } catch (e) {
        console.error('Failed to store selection data:', e);
    }
}

// Get XPath for an element (for tracking)
function getXPath(element) {
    if (!element) return '';
    
    // Use a simpler identifier for Gmail specific elements
    if (element.id) return `//*[@id="${element.id}"]`;
    
    // For Gmail compose area
    if (element.getAttribute('role') === 'textbox' || 
        element.getAttribute('contenteditable') === 'true' ||
        element.getAttribute('g_editable') === 'true' ||
        element.classList.contains('editable')) {
        
        return '//div[@role="textbox"]';
    }
    
    // Generic XPath fallback
    try {
        if (element.parentNode === document) return '/' + element.tagName;
        
        let siblings = element.parentNode.childNodes;
        let count = 0;
        let index = 0;
        for (let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
                count++;
                if (sibling === element) index = count;
            }
        }
        
        return getXPath(element.parentNode) + '/' + element.tagName + '[' + index + ']';
    } catch (e) {
        return '';
    }
}

// Function to locate Gmail's compose area
function findGmailComposeArea() {
    // Look for Gmail's compose areas
    return document.querySelector('[role="textbox"][contenteditable="true"], ' +
        '[g_editable="true"], ' +
        '.Am.Al.editable, ' + 
        '.Ak.Al.editable, ' +
        '[aria-label*="Message Body"]');
}

// Function to handle text selection
function handleTextSelection() {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText) {
        // Store text and position when we have a selection
        lastSelectedText = selectedText;
        if (selection.rangeCount > 0) {
            lastSelectionRect = selection.getRangeAt(0).getBoundingClientRect();
            
            // For Gmail, find and mark the element containing the selection
            if (isInEmailProvider()) {
                const node = selection.anchorNode;
                const container = node.nodeType === 3 ? node.parentElement : node;
                if (container) {
                    // Mark this element for later reference
                    container.setAttribute('data-heytextai-selection', 'true');
                    lastEditableElement = container;
                }
            }
        }
        
        // Create button if it doesn't exist
        if (!currentButton) {
            currentButton = createEnhanceButton();
            document.body.appendChild(currentButton);
        }
        
        // Store the selected text in the button
        currentButton.dataset.selectedText = selectedText;
        
        // Position and show the button
        const buttonSize = 30;
        const spacing = 5;
        
        if (lastSelectionRect) {
            currentButton.style.left = `${window.scrollX + lastSelectionRect.right + spacing}px`;
            currentButton.style.top = `${window.scrollY + lastSelectionRect.top + (lastSelectionRect.height/2) - (buttonSize/2)}px`;
            currentButton.style.display = 'flex';
        }
    }
    
    // DON'T hide button when selection is lost in email providers
    // Only hide in non-email contexts
    if (!selectedText && !isInEmailProvider()) {
        // Don't remove the button immediately if it exists and is being interacted with
        if (currentButton && !currentButton.matches(':hover') && (!currentPopup || !currentPopup.matches(':hover'))) {
            removeEnhanceButton();
            if (currentPopup && document.body.contains(currentPopup)) {
                document.body.removeChild(currentPopup);
                currentPopup = null;
            }
        }
    }
}

// Create enhancement button
function createEnhanceButton() {
    const button = document.createElement('button');
    button.className = 'heytextai-enhance-button';
    button.style.backgroundColor = '#4285f4';
    
    // Use custom SVG icon instead of emoji
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("viewBox", "0 0 36 36");
    iconSvg.setAttribute("width", "20");
    iconSvg.setAttribute("height", "20");
    iconSvg.innerHTML = '<path fill="#4289C1" d="M26 28H10c-2.484 0-4.615 1.51-5.527 3.661C4.107 31.258 3.584 31 3 31c-1.1 0-2 .9-2 2v3h31v-2c0-3.313-2.687-6-6-6z"/><path fill="#2A6797" d="M14 27h8s1 9-4 9-4-9-4-9z"/><ellipse fill="#292F33" cx="18" cy="19.024" rx="15" ry="3.529"/><path fill="#FFDC5D" d="M26.339 17.563c-.809-3.6-4.235-8.65-8.339-8.65s-7.53 5.05-8.339 8.65c-.836.048-1.494.52-1.494 1.889 0 1.448.734 2.622 1.639 2.622.015 0 .028-.006.043-.007 1.064 4.376 4.31 8.013 8.152 8.013s7.088-3.637 8.152-8.013c.015.001.028.007.043.007.905 0 1.639-1.174 1.639-2.622-.002-1.369-.659-1.84-1.496-1.889z"/><path fill="#662113" d="M14 20.709c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm8 0c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1z"/><path fill="#C1694F" d="M18.75 21.824h-1.5c-.413 0-.75-.337-.75-.75s.337-.75.75-.75h1.5c.413 0 .75.337.75.75s-.337.75-.75.75zm1.417 3.209h-4.333c-.412 0-.75-.337-.75-.75v-.331c0-.412.337-.75.75-.75h4.333c.413 0 .75.337.75.75v.331c0 .412-.338.75-.75.75z"/><path fill="#E6E7E8" d="M26.424 17.846c.193-.092.348-.224.449-.399.414-.717-.219-1.859-1.415-2.549s-2.501-.668-2.915.049c-.414.717.219 1.859 1.415 2.549.519.299 1.054.457 1.532.489-.292.524-.49 1.473-.49 2.569 0 1.063.185 1.991.463 2.524-.409-.016-.953.396-1.291.764-.709-.739-1.841-1.549-3.12-1.802-2.052-.406-2.901.386-3.088.933-.182-.547-1.029-1.348-3.09-.94-1.259.249-2.374 1.038-3.085 1.767-.339-.357-.86-.737-1.253-.722.279-.533.464-1.462.464-2.524 0-1.101-.2-2.054-.495-2.575.566.064 1.274-.09 1.953-.482 1.196-.69 1.829-1.832 1.415-2.549-.414-.717-1.719-.739-2.915-.049s-1.829 1.832-1.415 2.549c.05.087.115.163.189.229-.421.352-.732 1.5-.732 2.877 0 1.657.448 3 1 3 .02 0 .039-.014.059-.018-.037.136-.059.302-.059.511 0 1.823.667 1.823.667 1.823-.667 1.823.667 3.66.667 3.66 0 2.735 2 2.735 2 2.735C13.333 35 16 34.089 16 34.089 16.667 35 18 35 18 35s1.333 0 2-.911c0 0 2.667.911 2.667-1.823 0 0 2 0 2-2.735 0 0 1.333-1.837.667-3.66 0 0 .667 0 .667-1.823 0-.21-.022-.376-.059-.512.02.004.039.018.059.018.552 0 1-1.343 1-3-.001-1.2-.237-2.228-.577-2.708zm-5.757 8.024C18.781 24.582 18 24.959 18 24.959s-.781-.377-2.667.911c-1.013.692-2.024-.192-2.745-1.057.748-.275 1.684-.622 2.675-.818 1.831.03 2.534-.225 2.701-.599.167.364.875.598 2.7.606 1.013.2 1.97.56 2.726.837-.719.856-1.721 1.717-2.723 1.031z"/><path fill="#4289C1" d="M25.765 15.157C24.537 12.47 18.793 0 18 0s-6.537 12.47-7.765 15.157C5.415 16.001 3 17.595 3 19c6-2 11-2.443 15-2.443S27 17 33 19c0-1.405-2.415-2.999-7.235-3.843z"/><path fill="#D99E82" d="M5 36H3V11.862L2 8h4l-1 3.862z"/><circle fill="#55ACEE" cx="4" cy="6" r="3"/><circle fill="#B0F0FF" cx="3.5" cy="5.5" r="1.5"/><path fill="#FFDC5D" d="M7 30.5C7 32.433 5.657 34 4 34s-3-1.567-3-3.5S2.343 28 4 28s3 .567 3 2.5z"/>';
    
    button.appendChild(iconSvg);
    button.title = 'Enhance selected text';
    
    // Create the mode menu container
    const modeMenu = document.createElement("div");
    modeMenu.classList.add("heytextai-mode-menu");

    // Create style mode options
    const styleModes = ["Standard", "Fluency", "Humanize", "Formal", "Academic", "Simple"];
    const styleModeContainer = document.createElement("div");
    styleModeContainer.classList.add("heytextai-mode-container", "heytextai-style-modes");

    const styleModeLabel = document.createElement("div");
    styleModeLabel.classList.add("heytextai-mode-label");
    styleModeLabel.textContent = "Style:";
    styleModeContainer.appendChild(styleModeLabel);

    // Load currently selected style mode
    chrome.storage.sync.get(['selectedStyleMode'], (data) => {
        const currentStyleMode = data.selectedStyleMode || "standard";
        
        styleModes.forEach(mode => {
            const modeButton = document.createElement("button");
            modeButton.classList.add("heytextai-mode-button", "heytextai-style-mode");
            modeButton.dataset.mode = mode.toLowerCase();
            modeButton.textContent = mode;

            // Set active class if this is the selected mode
            if (currentStyleMode === mode.toLowerCase()) {
                modeButton.classList.add("active");
            }

            modeButton.addEventListener("click", (e) => {
                e.stopPropagation();
                // Remove active class from all style mode buttons
                document.querySelectorAll(".heytextai-style-mode").forEach(btn => {
                    btn.classList.remove("active");
                });
                // Add active class to clicked button
                modeButton.classList.add("active");
                
                const styleMode = mode.toLowerCase();
                
                // Save selected mode to storage
                chrome.storage.sync.set({ 'selectedStyleMode': styleMode });
                
                // Notify background script to update context menu
                chrome.runtime.sendMessage({
                    type: 'update-modes',
                    styleMode: styleMode
                });
            });

            styleModeContainer.appendChild(modeButton);
        });
    });

    // Create action mode options
    const actionModes = ["Improve", "Extend", "Shorten"];
    const actionModeContainer = document.createElement("div");
    actionModeContainer.classList.add("heytextai-mode-container", "heytextai-action-modes");

    const actionModeLabel = document.createElement("div");
    actionModeLabel.classList.add("heytextai-mode-label");
    actionModeLabel.textContent = "Action:";
    actionModeContainer.appendChild(actionModeLabel);

    // Load currently selected action mode
    chrome.storage.sync.get(['selectedActionMode'], (data) => {
        const currentActionMode = data.selectedActionMode || "improve";
        
        actionModes.forEach(mode => {
            const modeButton = document.createElement("button");
            modeButton.classList.add("heytextai-mode-button", "heytextai-action-mode");
            modeButton.dataset.mode = mode.toLowerCase();
            modeButton.textContent = mode;

            // Set active class if this is the selected mode
            if (currentActionMode === mode.toLowerCase()) {
                modeButton.classList.add("active");
            }

            modeButton.addEventListener("click", (e) => {
                e.stopPropagation();
                // Remove active class from all action mode buttons
                document.querySelectorAll(".heytextai-action-mode").forEach(btn => {
                    btn.classList.remove("active");
                });
                // Add active class to clicked button
                modeButton.classList.add("active");
                
                const actionMode = mode.toLowerCase();
                
                // Save selected mode to storage
                chrome.storage.sync.set({ 'selectedActionMode': actionMode });
                
                // Notify background script to update context menu
                chrome.runtime.sendMessage({
                    type: 'update-modes',
                    actionMode: actionMode
                });
            });

            actionModeContainer.appendChild(modeButton);
        });
    });

    // Add mode containers to menu
    modeMenu.appendChild(styleModeContainer);
    modeMenu.appendChild(actionModeContainer);
    
    // Add the mode menu to the document
    document.body.appendChild(modeMenu);
    
    // Show/hide mode menu on hover
    let menuTimeout;

    button.addEventListener("mouseenter", () => {
        clearTimeout(menuTimeout);
        const rect = button.getBoundingClientRect();
        positionModeMenu(modeMenu, rect);
        modeMenu.classList.add("show");
    });

    modeMenu.addEventListener("mouseenter", () => {
        clearTimeout(menuTimeout);
    });

    button.addEventListener("mouseleave", () => {
        menuTimeout = setTimeout(() => {
            if (!modeMenu.matches(":hover")) {
                modeMenu.classList.remove("show");
            }
        }, 300);
    });

    modeMenu.addEventListener("mouseleave", () => {
        menuTimeout = setTimeout(() => {
            if (!button.matches(":hover")) {
                modeMenu.classList.remove("show");
            }
        }, 300);
    });
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Hide the mode menu when the button is clicked
        modeMenu.classList.remove("show");
        
        // Use the stored text even if selection is lost
        const selectedText = button.dataset.selectedText || lastSelectedText;
        if (!selectedText) return;

        // Create and show preview popup
        if (!currentPopup) {
            currentPopup = createPreviewPopup();
            document.body.appendChild(currentPopup);
        }

        const buttonRect = button.getBoundingClientRect();
        const previewContent = currentPopup.querySelector('.heytextai-preview-content');
        
        // Use the stored selection rect for positioning, fallback to button position
        const selectionRect = lastSelectionRect || getSelectionPosition();
        
        // Always position the popup, even if there's no selection rect
        positionPopup(currentPopup, selectionRect, buttonRect);
        
        // Enhance the selected text
        enhanceText(selectedText, lastEditableElement, button, currentPopup, previewContent);
    });

    return button;
}

// Helper function to clean up when removing the button
function removeEnhanceButton() {
    if (currentButton) {
        // Also remove the associated mode menu
        const modeMenu = document.querySelector(".heytextai-mode-menu");
        if (modeMenu) {
            document.body.removeChild(modeMenu);
        }
        
        if (document.body.contains(currentButton)) {
            document.body.removeChild(currentButton);
            currentButton = null;
        }
    }
}

// Initialize the extension
function initializeExtension() {
    addStyles();
    
    // Add selection change listener with debounce
    let selectionTimeout;
    document.addEventListener('selectionchange', () => {
        clearTimeout(selectionTimeout);
        selectionTimeout = setTimeout(handleTextSelection, 100);
    });
    
    // Add mouseup listener to ensure button stays visible after selection
    document.addEventListener('mouseup', () => {
        setTimeout(handleTextSelection, 10);
    });
    
    // Gmail-specific listeners for better selection handling
    if (isInEmailProvider()) {
        // Add a manual dismiss button for email providers
        document.addEventListener('click', (e) => {
            // Only hide if clicking outside our UI and not near the selection
            if (currentButton && 
                !e.target.closest('.heytextai-enhance-button') && 
                !e.target.closest('.heytextai-preview-popup') &&
                !e.target.closest('[data-heytextai-selection="true"]')) {
                
                // Check if click is far from the button
                const buttonRect = currentButton.getBoundingClientRect();
                const clickX = e.clientX;
                const clickY = e.clientY;
                const buffer = 50; // pixels
                
                // If click is far from button, hide it
                if (clickX < buttonRect.left - buffer || 
                    clickX > buttonRect.right + buffer || 
                    clickY < buttonRect.top - buffer || 
                    clickY > buttonRect.bottom + buffer) {
                    
                    currentButton.style.display = 'none';
                    
                    // Clean up markers
                    const markedElements = document.querySelectorAll('[data-heytextai-selection="true"]');
                    markedElements.forEach(el => el.removeAttribute('data-heytextai-selection'));
                }
            }
        });
    } else {
        // Standard behavior for non-email sites
        document.addEventListener('click', (e) => {
            if (currentButton && 
                !e.target.closest('.heytextai-enhance-button') && 
                !e.target.closest('.heytextai-preview-popup') &&
                !window.getSelection().toString().trim()) {
                currentButton.style.display = 'none';
            }
        });
    }
}

// Start the extension
initializeExtension();

// Function to position popup with smart boundary detection
function positionPopup(popup, elementRect, buttonRect) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const popupWidth = popup.offsetWidth || 250; // Default width if not rendered yet
    const popupHeight = popup.offsetHeight || 200; // Estimate height if not rendered yet

    // Use buttonRect as fallback if elementRect is null
    if (!elementRect && buttonRect) {
        elementRect = buttonRect;
    }

    // Safety check - if both are null, position in center of screen
    if (!elementRect) {
        popup.style.left = Math.max(10, (windowWidth - popupWidth) / 2) + "px";
        popup.style.top = Math.max(10, (windowHeight - popupHeight) / 2) + "px";
        popup.classList.add('show');
        return;
    }

    // Horizontal positioning
    if (elementRect.right + 50 + popupWidth > windowWidth) {
        // Not enough space on the right, try left side
        if (elementRect.left - 50 - popupWidth > 0) {
            // Enough space on the left
            popup.style.left = "auto";
            popup.style.right = (windowWidth - elementRect.left + 10) + "px";
        } else {
            // Not enough space on either side, center horizontally
            popup.style.left = Math.max(10, (windowWidth - popupWidth) / 2) + "px";
            popup.style.right = "auto";
        }
    } else {
        // Enough space on the right
        popup.style.left = (elementRect.right + 50) + "px";
        popup.style.right = "auto";
    }

    // Vertical positioning
    if (elementRect.top - 10 + popupHeight > windowHeight) {
        // Would go off bottom of screen, position higher
        popup.style.top = Math.max(10, windowHeight - popupHeight - 10) + "px";
    } else if (elementRect.top - 10 < 0) {
        // Would go off top of screen, position lower
        popup.style.top = "10px";
    } else {
        // Default position
        popup.style.top = (elementRect.top - 10) + "px";
    }
}

// Function to enhance the text
function enhanceText(selectedText, element, button, popup, previewContent) {
    if (!selectedText || selectedText.trim() === '') {
        createToastNotification("Please enter some text to enhance.");
        return;
    }

    if (!previewContent) {
        previewContent = popup.querySelector('.heytextai-preview-content');
    }

    const apiUrl = "https://heytextai.com/api/v1/enhance";
    const domain = window.location.hostname;
    const source = window.HeyTextAI?.isEmailProvider?.(domain) ? "email" : "textfield";

    // Show loading animation on the button
    button.classList.add('heytextai-loading');

    // Store original text for reference
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = "";
    
    // Show loading toast
    createToastNotification("Enhancing your text...");

    // Get the selected modes and API key
    chrome.storage.sync.get(['selectedStyleMode', 'selectedActionMode'], async function (data) {
        const styleMode = data.selectedStyleMode || 'standard';
        const actionMode = data.selectedActionMode || 'improve';

        try {
            // Get auth headers (with API key if available)
            const headers = await window.HeyTextAI?.supabase?.getAuthHeaders() || {"Content-Type": "application/json"};

            // Add content type if not already added
            if (!headers["Content-Type"]) {
                headers["Content-Type"] = "application/json";
            }

            // Add fingerprint for anonymous tracking
            headers["X-Fingerprint"] = generateFingerprint();

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    text: selectedText,
                    context: {
                        source: source,
                        domain: domain
                    },
                    preferences: {
                        styleMode: styleMode,
                        actionMode: actionMode
                    }
                })
            });

            // Handle rate limiting
            if (response.status === 429) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || 'Rate limit exceeded. Please try again later.';

                // Check if this is an anonymous user rate limit
                if (errorMessage.includes('Sign in for more requests')) {
                    // Show a more helpful error message
                    throw new Error('Daily limit reached. Open the extension popup and sign in for more requests.');
                } else {
                    throw new Error(errorMessage);
                }
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check if we should refresh usage data
            if (response.headers.get('X-Refresh-Usage') === 'true') {
                // Notify the website to refresh usage data if we're on the website
                if (window.HeyTextAI && window.HeyTextAI.authSync && window.HeyTextAI.authSync.refreshUsage) {
                    window.HeyTextAI.authSync.refreshUsage();
                }
            }

            const data = await response.json();

            // Store the enhanced text for later use
            window.HeyTextAI = window.HeyTextAI || {};
            window.HeyTextAI.lastEnhancedText = data.enhanced;

            // Remove loading state
            button.classList.remove('heytextai-loading');
            button.innerHTML = button.dataset.originalText;

            // Update preview content
            if (previewContent) {
                previewContent.textContent = data.enhanced;
                
                // Add mode information if not already present
                if (!popup.querySelector('.heytextai-preview-mode')) {
                    const previewMode = document.createElement("div");
                    previewMode.classList.add("heytextai-preview-mode");
                    previewMode.textContent = `${capitalizeFirstLetter(actionMode)} - ${capitalizeFirstLetter(styleMode)}`;
                    popup.insertBefore(previewMode, previewContent);
                }
            }

            // Position and show popup - handle potential null selection rect
            let selectionRect = getSelectionPosition() || lastSelectionRect; 
            const buttonRect = button.getBoundingClientRect();
            
            // If both are null, use the button position as reference
            positionPopup(popup, selectionRect, buttonRect);
            popup.classList.add('show');
        } catch (error) {
            // Remove loading state
            button.classList.remove('heytextai-loading');
            button.innerHTML = button.dataset.originalText;

            // Show error message
            createToastNotification(error.message || "Error enhancing text. Please try again.");

            // Show error briefly
            const originalColor = button.style.backgroundColor;
            button.style.backgroundColor = "#f44336"; // Red
            setTimeout(() => {
                button.style.backgroundColor = originalColor;
            }, 1000);
        }
    });
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to create a toast notification
function createToastNotification(message) {
    // Add styles if not already added
    if (!document.getElementById('heytextai-toast-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'heytextai-toast-styles';
        styleEl.textContent = `
            .heytextai-toast {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(66, 133, 244, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 10001;
                font-size: 14px;
                max-width: 300px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                backdrop-filter: blur(4px);
            }
            
            .heytextai-toast.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .heytextai-toast-icon {
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .heytextai-toast-icon svg {
                width: 20px;
                height: 20px;
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.heytextai-toast');
    existingToasts.forEach(toast => {
        document.body.removeChild(toast);
    });
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'heytextai-toast';
    
    const icon = document.createElement('span');
    icon.className = 'heytextai-toast-icon';
    
    // Use custom SVG icon
    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("viewBox", "0 0 36 36");
    iconSvg.setAttribute("width", "20");
    iconSvg.setAttribute("height", "20");
    iconSvg.innerHTML = '<path fill="#4289C1" d="M26 28H10c-2.484 0-4.615 1.51-5.527 3.661C4.107 31.258 3.584 31 3 31c-1.1 0-2 .9-2 2v3h31v-2c0-3.313-2.687-6-6-6z"/><path fill="#2A6797" d="M14 27h8s1 9-4 9-4-9-4-9z"/><ellipse fill="#292F33" cx="18" cy="19.024" rx="15" ry="3.529"/><path fill="#FFDC5D" d="M26.339 17.563c-.809-3.6-4.235-8.65-8.339-8.65s-7.53 5.05-8.339 8.65c-.836.048-1.494.52-1.494 1.889 0 1.448.734 2.622 1.639 2.622.015 0 .028-.006.043-.007 1.064 4.376 4.31 8.013 8.152 8.013s7.088-3.637 8.152-8.013c.015.001.028.007.043.007.905 0 1.639-1.174 1.639-2.622-.002-1.369-.659-1.84-1.496-1.889z"/><path fill="#662113" d="M14 20.709c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm8 0c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1z"/><path fill="#C1694F" d="M18.75 21.824h-1.5c-.413 0-.75-.337-.75-.75s.337-.75.75-.75h1.5c.413 0 .75.337.75.75s-.337.75-.75.75zm1.417 3.209h-4.333c-.412 0-.75-.337-.75-.75v-.331c0-.412.337-.75.75-.75h4.333c.413 0 .75.337.75.75v.331c0 .412-.338.75-.75.75z"/><path fill="#E6E7E8" d="M26.424 17.846c.193-.092.348-.224.449-.399.414-.717-.219-1.859-1.415-2.549s-2.501-.668-2.915.049c-.414.717.219 1.859 1.415 2.549.519.299 1.054.457 1.532.489-.292.524-.49 1.473-.49 2.569 0 1.063.185 1.991.463 2.524-.409-.016-.953.396-1.291.764-.709-.739-1.841-1.549-3.12-1.802-2.052-.406-2.901.386-3.088.933-.182-.547-1.029-1.348-3.09-.94-1.259.249-2.374 1.038-3.085 1.767-.339-.357-.86-.737-1.253-.722.279-.533.464-1.462.464-2.524 0-1.101-.2-2.054-.495-2.575.566.064 1.274-.09 1.953-.482 1.196-.69 1.829-1.832 1.415-2.549-.414-.717-1.719-.739-2.915-.049s-1.829 1.832-1.415 2.549c.05.087.115.163.189.229-.421.352-.732 1.5-.732 2.877 0 1.657.448 3 1 3 .02 0 .039-.014.059-.018-.037.136-.059.302-.059.511 0 1.823.667 1.823.667 1.823-.667 1.823.667 3.66.667 3.66 0 2.735 2 2.735 2 2.735C13.333 35 16 34.089 16 34.089 16.667 35 18 35 18 35s1.333 0 2-.911c0 0 2.667.911 2.667-1.823 0 0 2 0 2-2.735 0 0 1.333-1.837.667-3.66 0 0 .667 0 .667-1.823 0-.21-.022-.376-.059-.512.02.004.039.018.059.018.552 0 1-1.343 1-3-.001-1.2-.237-2.228-.577-2.708zm-5.757 8.024C18.781 24.582 18 24.959 18 24.959s-.781-.377-2.667.911c-1.013.692-2.024-.192-2.745-1.057.748-.275 1.684-.622 2.675-.818 1.831.03 2.534-.225 2.701-.599.167.364.875.598 2.7.606 1.013.2 1.97.56 2.726.837-.719.856-1.721 1.717-2.723 1.031z"/><path fill="#4289C1" d="M25.765 15.157C24.537 12.47 18.793 0 18 0s-6.537 12.47-7.765 15.157C5.415 16.001 3 17.595 3 19c6-2 11-2.443 15-2.443S27 17 33 19c0-1.405-2.415-2.999-7.235-3.843z"/><path fill="#D99E82" d="M5 36H3V11.862L2 8h4l-1 3.862z"/><circle fill="#55ACEE" cx="4" cy="6" r="3"/><circle fill="#B0F0FF" cx="3.5" cy="5.5" r="1.5"/><path fill="#FFDC5D" d="M7 30.5C7 32.433 5.657 34 4 34s-3-1.567-3-3.5S2.343 28 4 28s3 .567 3 2.5z"/>';
    
    icon.appendChild(iconSvg);
    
    const text = document.createElement('span');
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
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Function to position the mode menu around the button
function positionModeMenu(menu, buttonRect) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Position relative to button
    if (buttonRect.left > windowWidth / 2) {
        // Button is on the right side of the screen, show menu to the left
        menu.style.left = "auto";
        menu.style.right = (windowWidth - buttonRect.left + 10) + "px";
    } else {
        // Button is on the left side, show menu to the right
        menu.style.right = "auto";
        menu.style.left = (buttonRect.right + 10) + "px";
    }

    // Vertical positioning
    const menuHeight = menu.offsetHeight || 200; // Estimate if not yet rendered
    if (buttonRect.top + menuHeight > windowHeight) {
        // Menu would go off bottom of screen, position it higher
        menu.style.top = Math.max(10, windowHeight - menuHeight - 10) + "px";
    } else {
        menu.style.top = buttonRect.top + "px";
    }
}

// Generate a fingerprint for anonymous tracking
function generateFingerprint() {
    // Use a combination of browser information to create a unique identifier
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;

    // Combine all information and hash it
    const rawFingerprint = `${screenInfo}|${timeZone}|${language}|${platform}|${userAgent}`;

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < rawFingerprint.length; i++) {
        const char = rawFingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to a hex string and ensure it's positive
    return Math.abs(hash).toString(16);
}

// Function to handle usage refresh
function handleUsageRefresh() {
    // Check if refreshUsage function is available
    if (window.HeyTextAI && window.HeyTextAI.authSync && window.HeyTextAI.authSync.refreshUsage) {
        window.HeyTextAI.authSync.refreshUsage();
    }
}

// Run the detection when the page loads
window.addEventListener("load", () => {
    // Wait a short time to ensure utilities are loaded
    setTimeout(() => {
        initializeExtension();
    }, 500);
});

// Create preview popup
function createPreviewPopup() {
    const popup = document.createElement("div");
    popup.classList.add("heytextai-preview-popup");

    const previewTitle = document.createElement("div");
    previewTitle.classList.add("heytextai-preview-title");
    
    // Add the icon next to the title for branding
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
    
    previewTitle.textContent = "Enhanced Text:";
    
    titleContainer.appendChild(iconContainer);
    titleContainer.appendChild(previewTitle);
    
    const previewMode = document.createElement("div");
    previewMode.classList.add("heytextai-preview-mode");
    
    // Get current modes to display
    chrome.storage.sync.get(['selectedStyleMode', 'selectedActionMode'], (data) => {
        const styleMode = data.selectedStyleMode || 'standard';
        const actionMode = data.selectedActionMode || 'improve';
        
        // Set mode info
        previewMode.textContent = `${capitalizeFirstLetter(actionMode)} - ${capitalizeFirstLetter(styleMode)}`;
    });

    const previewContent = document.createElement("div");
    previewContent.classList.add("heytextai-preview-content");

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

    // Add button event listeners with Gmail-specific handling
    applyButton.addEventListener("click", () => {
        let success = false;
        
        // For Gmail, use direct element manipulation
        if (isInEmailProvider()) {
            success = replaceTextInGmailEditor(window.HeyTextAI.lastEnhancedText);
        }
        
        // If Gmail-specific method failed or we're not in Gmail
        if (!success) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const context = detectTextContext(selection);
                success = smartReplaceText(selection, window.HeyTextAI.lastEnhancedText, context);
            }
        }
        
        if (!success) {
            // Fallback to copy suggestion
            createToastNotification("Couldn't apply changes automatically. Text copied to clipboard instead.");
            navigator.clipboard.writeText(window.HeyTextAI.lastEnhancedText);
        } else {
            createToastNotification("Changes applied successfully!");
        }
        
        hidePopup();
        
        // Clean up the marker attribute after applying
        const markedElements = document.querySelectorAll('[data-heytextai-selection="true"]');
        markedElements.forEach(el => el.removeAttribute('data-heytextai-selection'));
    });

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(window.HeyTextAI.lastEnhancedText)
            .then(() => {
                const originalColor = copyButton.style.backgroundColor;
                copyButton.style.backgroundColor = "#45a049";
                setTimeout(() => {
                    copyButton.style.backgroundColor = originalColor;
                }, 500);
                
                createToastNotification("Text copied to clipboard");
            });
        setTimeout(hidePopup, 500);
    });

    cancelButton.addEventListener("click", hidePopup);

    actionButtons.appendChild(applyButton);
    actionButtons.appendChild(copyButton);
    actionButtons.appendChild(cancelButton);

    popup.appendChild(titleContainer);
    popup.appendChild(previewMode);
    popup.appendChild(previewContent);
    popup.appendChild(actionButtons);

    return popup;
}

function hidePopup() {
    if (currentPopup) {
        currentPopup.classList.remove('show');
    }
    
    // In email providers, don't hide the button automatically
    if (currentButton && !isInEmailProvider()) {
        currentButton.style.display = 'none';
    }
}

// Specific function to handle text replacement in Gmail
function replaceTextInGmailEditor(newText) {
    // Try using the marked element first
    const markedElement = document.querySelector('[data-heytextai-selection="true"]');
    
    if (markedElement) {
        try {
            // Focus the element
            markedElement.focus();
            
            // Save and restore attributes that Gmail needs
            const dir = markedElement.getAttribute('dir') || 'ltr';
            
            // Replace content
            markedElement.innerHTML = newText;
            markedElement.setAttribute('dir', dir);
            
            // Trigger Gmail's events
            markedElement.dispatchEvent(new Event('input', {bubbles: true}));
            markedElement.dispatchEvent(new Event('change', {bubbles: true}));
            
            return true;
        } catch (e) {
            console.error("Gmail marked element replacement failed:", e);
        }
    }
    
    // Fallback to compose area
    const composeArea = findGmailComposeArea();
    if (composeArea) {
        try {
            // Focus the compose area
            composeArea.focus();
            
            // Try using execCommand
            document.execCommand('insertText', false, newText);
            
            // Trigger events
            composeArea.dispatchEvent(new Event('input', {bubbles: true}));
            composeArea.dispatchEvent(new Event('change', {bubbles: true}));
            
            return true;
        } catch (e) {
            console.error("Gmail compose area insertion failed:", e);
        }
    }
    
    return false;
}
