/**
 * API key utility script
 * This script provides utility functions for API key usage
 */

// Initialize the HeyTextAI object if it doesn't exist
window.HeyTextAI = window.HeyTextAI || {
    isEmailProvider: function () { return false; },
    getTextFieldSelectors: function () { return []; },
    createEnhancedTextModal: function () { return {}; },
    lastEnhancedText: '',
    constants: window.HeyTextAI?.constants || {}
};

// Check if authSync functions have already been initialized
if (window.HeyTextAI.authSync && window.HeyTextAI.authSync.refreshUsage) {
    // AuthSync functions already initialized
} else {
    // Define API key storage key directly if not available from constants
    //const API_KEY_STORAGE_KEY = 'heytextai_api_key';

    /**
     * Function to handle usage refresh events
     * This is called when the extension receives a response with the X-Refresh-Usage header
     */
    function refreshUsage() {
        try {
            // Dispatch a custom event to notify the website to refresh usage data
            const refreshEvent = new CustomEvent('heytextai:refresh-usage', {
                detail: {
                    timestamp: Date.now(),
                    source: 'extension'
                }
            });
            window.dispatchEvent(refreshEvent);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    // Export functions for content script
    window.HeyTextAI.authSync = {
        refreshUsage
    };

    // HeyTextAI API key utility initialized
}
