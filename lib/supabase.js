// API key management for the Chrome extension
// This file provides API key functionality for the extension

// Initialize the HeyTextAI object if it doesn't exist
window.HeyTextAI = window.HeyTextAI || {};

// Check if supabase functions have already been initialized
if (window.HeyTextAI.supabase && window.HeyTextAI.supabase.getAuthHeaders) {
    // Supabase functions already initialized
} else {
    // Define API key storage key directly
    const API_KEY_STORAGE_KEY = 'heytextai_api_key';

    /**
     * Get the API key from Chrome storage
     * @returns {Promise<string|null>} The API key or null if not set
     */
    async function getApiKey() {
        return new Promise((resolve) => {
            chrome.storage.local.get([API_KEY_STORAGE_KEY], (result) => {
                resolve(result[API_KEY_STORAGE_KEY] || null);
            });
        });
    }

    /**
     * Save the API key to Chrome storage
     * @param {string} apiKey - The API key to save
     * @returns {Promise<void>}
     */
    async function saveApiKey(apiKey) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [API_KEY_STORAGE_KEY]: apiKey }, resolve);
        });
    }

    /**
     * Clear the API key from Chrome storage
     * @returns {Promise<void>}
     */
    async function clearApiKey() {
        return new Promise((resolve) => {
            chrome.storage.local.remove([API_KEY_STORAGE_KEY], resolve);
        });
    }

    /**
     * Get the authorization header for API requests
     * @returns {Promise<Object>} Headers object with Authorization if API key exists
     */
    async function getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };

        // Check if we have an API key
        const apiKey = await getApiKey();
        if (apiKey) {
            headers['Authorization'] = `ApiKey ${apiKey}`;
        }

        return headers;
    }

    // Export the functions
    window.HeyTextAI = window.HeyTextAI || {};
    window.HeyTextAI.supabase = {
        getApiKey,
        saveApiKey,
        clearApiKey,
        getAuthHeaders
    };
}
