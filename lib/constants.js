/**
 * Shared constants for the HeyTextAI extension
 * This file contains constants used across multiple extension components
 */

// Check if constants have already been initialized to prevent redeclaration errors
if (typeof window !== 'undefined' && window.HeyTextAI && window.HeyTextAI.constants) {
    // Constants already initialized in window context
} else if (typeof self !== 'undefined' && self.HeyTextAI && self.HeyTextAI.constants) {
    // Constants already initialized in service worker context
} else {
    // First initialization - use globalThis to work in both browser and service worker contexts
    const globalContext = typeof window !== 'undefined' ? window : self;

    // Constants for localStorage and chrome.storage keys
    const AUTH_STORAGE_KEY_VALUE = 'heytextai_auth_session';
    const API_KEY_STORAGE_KEY_VALUE = 'heytextai_api_key';

    // Make constants available globally
    globalContext.HeyTextAI = globalContext.HeyTextAI || {};
    globalContext.HeyTextAI.constants = {
        AUTH_STORAGE_KEY: AUTH_STORAGE_KEY_VALUE,
        API_KEY_STORAGE_KEY: API_KEY_STORAGE_KEY_VALUE
    };
}
