/**
 * Utility functions for HeyTextAI Chrome Extension
 */

// Initialize the HeyTextAI object if it doesn't exist
window.HeyTextAI = window.HeyTextAI || {};

// Check if utility functions have already been initialized
if (window.HeyTextAI.isEmailProvider && window.HeyTextAI.getTextFieldSelectors) {
    // Utility functions already initialized
} else {
    // Function to check if the current domain is a supported email provider
    function isEmailProvider(domain) {
        const emailProviders = [
            'gmail.com',
            'mail.google.com',
            'outlook.com',
            'outlook.office365.com',
            'mail.yahoo.com'
        ];

        return emailProviders.some(provider => domain.includes(provider));
    }

    // Function to get the appropriate text field selectors based on the domain
    function getTextFieldSelectors(domain) {
        if (domain.includes('gmail') || domain.includes('mail.google.com')) {
            return [
                'div[role="textbox"][aria-label*="Body"]', // Gmail compose
                'div[role="textbox"][aria-label*="Reply"]'  // Gmail reply
            ];
        } else if (domain.includes('outlook')) {
            return [
                // Current selectors
                'div[role="textbox"][aria-label*="Message body"]',
                'div[contenteditable="true"][aria-label*="Message body"]',
                // Additional selectors for newer Outlook versions
                'div[role="textbox"][aria-label*="Body"]',
                'div[contenteditable="true"][aria-label*="Body"]',
                'div[role="textbox"][data-testid*="editor"]',
                'div.Editor-container [contenteditable="true"]',
                '[aria-label*="Text editor"] [contenteditable="true"]',
                // Specific selectors based on observed Outlook Web structure
                'div.dFCbN[role="textbox"][contenteditable="true"]',
                'div.dPKNh[role="textbox"][contenteditable="true"]',
                'div.z8tsM[role="textbox"][contenteditable="true"]',
                'div.DziEn[role="textbox"][contenteditable="true"]',
                // Generic contenteditable selectors that might work in Outlook
                '.owa-editor-container [contenteditable="true"]',
                '[data-app-section="ComposeArea"] [contenteditable="true"]'
            ];
        } else {
            // Default selectors for general websites
            return [
                'input[type="text"]',
                'textarea',
                'div[contenteditable="true"]'
            ];
        }
    }

    // Function to create a modal for displaying enhanced text
    function createEnhancedTextModal(originalText, enhancedText) {
        // Create modal container
        const modal = document.createElement('div');
        modal.classList.add('heytextai-modal');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '5px';
        modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
        modal.style.zIndex = '10000';
        modal.style.maxWidth = '80%';
        modal.style.maxHeight = '80%';
        modal.style.overflow = 'auto';

        // Add title
        const title = document.createElement('h2');
        title.textContent = 'HeyTextAI - Enhanced Text';
        title.style.marginTop = '0';
        modal.appendChild(title);

        // Add original text
        const originalTextHeading = document.createElement('h3');
        originalTextHeading.textContent = 'Original Text:';
        modal.appendChild(originalTextHeading);

        const originalTextElement = document.createElement('div');
        originalTextElement.textContent = originalText;
        originalTextElement.style.padding = '10px';
        originalTextElement.style.border = '1px solid #ccc';
        originalTextElement.style.marginBottom = '10px';
        modal.appendChild(originalTextElement);

        // Add enhanced text
        const enhancedTextHeading = document.createElement('h3');
        enhancedTextHeading.textContent = 'Enhanced Text:';
        modal.appendChild(enhancedTextHeading);

        const enhancedTextElement = document.createElement('div');
        enhancedTextElement.textContent = enhancedText;
        enhancedTextElement.style.padding = '10px';
        enhancedTextElement.style.border = '1px solid #ccc';
        enhancedTextElement.style.marginBottom = '20px';
        modal.appendChild(enhancedTextElement);

        // Add buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'space-between';

        const applyButton = document.createElement('button');
        applyButton.textContent = 'Apply Changes';
        applyButton.style.padding = '8px 16px';
        applyButton.style.backgroundColor = '#4CAF50';
        applyButton.style.color = 'white';
        applyButton.style.border = 'none';
        applyButton.style.borderRadius = '4px';
        applyButton.style.cursor = 'pointer';

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy to Clipboard';
        copyButton.style.padding = '8px 16px';
        copyButton.style.backgroundColor = '#2196F3';
        copyButton.style.color = 'white';
        copyButton.style.border = 'none';
        copyButton.style.borderRadius = '4px';
        copyButton.style.cursor = 'pointer';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.style.padding = '8px 16px';
        cancelButton.style.backgroundColor = '#f44336';
        cancelButton.style.color = 'white';
        cancelButton.style.border = 'none';
        cancelButton.style.borderRadius = '4px';
        cancelButton.style.cursor = 'pointer';

        buttonContainer.appendChild(applyButton);
        buttonContainer.appendChild(copyButton);
        buttonContainer.appendChild(cancelButton);
        modal.appendChild(buttonContainer);

        // Add modal to body
        document.body.appendChild(modal);

        // Return modal and buttons for event handling
        return {
            modal,
            applyButton,
            copyButton,
            cancelButton,
            enhancedText
        };
    }

    // Export functions
    window.HeyTextAI = window.HeyTextAI || {};
    Object.assign(window.HeyTextAI, {
        isEmailProvider,
        getTextFieldSelectors,
        createEnhancedTextModal,
        lastEnhancedText: window.HeyTextAI.lastEnhancedText || '' // Preserve existing value if it exists
    });

    // HeyTextAI utility functions initialized
}
