// Use the shared constants
//const API_KEY_STORAGE_KEY = window.HeyTextAI.constants.API_KEY_STORAGE_KEY;

document.addEventListener('DOMContentLoaded', async function () {
    // Elements for authentication
    const authStatus = document.getElementById('auth-status');
    const authContainer = document.getElementById('auth-container');
    const userContainer = document.getElementById('user-container');
    const anonymousContainer = document.getElementById('anonymous-container');
    const userEmail = document.getElementById('user-email');
    const signOutButton = document.getElementById('sign-out-button');
    const usageCount = document.getElementById('usage-count');
    const usageBar = document.getElementById('usage-bar');
    const usageReset = document.getElementById('usage-reset');
    const anonymousUsageCount = document.getElementById('anonymous-usage-count');
    const anonymousUsageBar = document.getElementById('anonymous-usage-bar');
    const anonymousUsageReset = document.getElementById('anonymous-usage-reset');

    // Elements for options
    const enableOverlayCheckbox = document.getElementById('enableOverlay');
    const styleModeButtons = document.querySelectorAll('#styleModes .mode-button');
    const actionModeButtons = document.querySelectorAll('#actionModes .mode-button');

    // Initialize authentication
    await initializeAuth();

    // Load saved state from storage
    chrome.storage.sync.get(['enableOverlay', 'selectedStyleMode', 'selectedActionMode'], function (data) {
        // Set overlay checkbox state (default to true)
        enableOverlayCheckbox.checked = data.enableOverlay !== false;

        // Set active style mode button (default to standard)
        const activeStyleMode = data.selectedStyleMode || 'standard';
        styleModeButtons.forEach(button => {
            if (button.dataset.mode === activeStyleMode) {
                button.classList.add('active');
            }
        });

        // Set active action mode button (default to improve)
        const activeActionMode = data.selectedActionMode || 'improve';
        actionModeButtons.forEach(button => {
            if (button.dataset.mode === activeActionMode) {
                button.classList.add('active');
            }
        });
    });

    // Save overlay state when checkbox changes
    enableOverlayCheckbox.addEventListener('change', function () {
        chrome.storage.sync.set({ 'enableOverlay': enableOverlayCheckbox.checked });
    });

    // Handle style mode button clicks
    styleModeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all style buttons
            styleModeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Save selected mode to storage
            chrome.storage.sync.set({ 'selectedStyleMode': button.dataset.mode });
        });
    });

    // Handle action mode button clicks
    actionModeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all action buttons
            actionModeButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Save selected mode to storage
            chrome.storage.sync.set({ 'selectedActionMode': button.dataset.mode });
        });
    });

    // Handle API key button click
    document.getElementById('use-api-key-button').addEventListener('click', function () {
        showApiKeyUI();
    });

    // Handle sign out button click
    signOutButton.addEventListener('click', async function () {
        try {
            // Clear the API key from storage
            await window.HeyTextAI.supabase.clearApiKey();

            // Show anonymous UI
            showAnonymousUI();
        } catch (error) {
            // Error signing out
        }
    });

    // Initialize authentication
    async function initializeAuth() {
        try {
            authStatus.textContent = "Checking authentication...";

            // Check if we have an API key stored
            const apiKey = await window.HeyTextAI.supabase.getApiKey();

            if (apiKey) {
                // Verify the API key with the backend
                const response = await fetch('https://heytextai.com/api/v1/auth/user', {
                    headers: {
                        'Authorization': `ApiKey ${apiKey}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user) {
                        // Valid API key, show user UI
                        showUserUI({ email: data.user.email || 'API User' });
                        return;
                    }
                }

                // If we get here, the API key is invalid or expired
                await window.HeyTextAI.supabase.clearApiKey();
            }

            // No API key, show anonymous UI
            showAnonymousUI();
        } catch (error) {
            // Error initializing auth
            authStatus.textContent = "Authentication error. Please try again.";
            setTimeout(() => {
                showAnonymousUI();
            }, 2000);
        }
    }

    // Show API key input UI
    function showApiKeyUI() {
        // Hide other containers
        authStatus.style.display = 'none';
        authContainer.style.display = 'none';
        userContainer.style.display = 'none';
        anonymousContainer.style.display = 'none';

        // Get the API key container
        const apiKeyContainer = document.getElementById('api-key-container');

        // Show API key container
        apiKeyContainer.style.display = 'block';

        // Add event listeners
        const saveApiKeyButton = document.getElementById('save-api-key');
        const backButton = document.getElementById('back-to-anonymous');

        saveApiKeyButton.addEventListener('click', saveApiKey);
        backButton.addEventListener('click', showAnonymousUI);
    }

    // Save and verify API key
    async function saveApiKey() {
        const apiKeyInput = document.getElementById('api-key-input');
        const apiKey = apiKeyInput.value.trim();

        if (!apiKey) {
            alert('Please enter a valid API key');
            return;
        }

        try {
            // Show loading state
            const saveButton = document.getElementById('save-api-key');
            const originalText = saveButton.textContent;
            saveButton.textContent = 'Verifying...';
            saveButton.disabled = true;

            // Verify the API key with the backend
            const response = await fetch('https://heytextai.com/api/v1/auth/user', {
                headers: {
                    'Authorization': `ApiKey ${apiKey}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    // Valid API key, save it
                    await window.HeyTextAI.supabase.saveApiKey(apiKey);

                    // Notify background script
                    chrome.runtime.sendMessage({
                        type: 'api-key-updated',
                        apiKey: apiKey
                    });

                    // Show user UI
                    showUserUI({ email: data.user.email || 'API User' });
                    return;
                }
            }

            // Invalid API key
            alert('Invalid API key. Please check and try again.');
            saveButton.textContent = originalText;
            saveButton.disabled = false;
        } catch (error) {
            // Error verifying API key
            alert('Error verifying API key. Please try again.');
            document.getElementById('save-api-key').disabled = false;
        }
    }

    // Show the user UI
    async function showUserUI(user) {
        // Hide other containers
        authStatus.style.display = 'none';
        authContainer.style.display = 'none';
        anonymousContainer.style.display = 'none';

        // Show user container
        userContainer.style.display = 'block';

        // Set user email
        userEmail.textContent = user.email;

        // Fetch usage data
        await fetchUsageData(true);
    }

    // Show the anonymous UI
    async function showAnonymousUI() {
        // Hide other containers
        authStatus.style.display = 'none';
        authContainer.style.display = 'none';
        userContainer.style.display = 'none';

        // Show anonymous container
        anonymousContainer.style.display = 'block';

        // Fetch usage data
        await fetchUsageData(false);
    }

    // Fetch usage data from the API
    async function fetchUsageData(isAuthenticated) {
        try {

            // Prepare headers
            let headers = {};

            if (isAuthenticated) {
                // Get auth headers (with API key if available)
                headers = await window.HeyTextAI.supabase.getAuthHeaders();
                // Using API key for authentication
            }

            // Fetch usage data
            const response = await fetch('https://heytextai.com/api/v1/usage', {
                headers,
                // Add cache busting to prevent cached responses
                cache: 'no-store'
            });


            if (response.ok) {
                const data = await response.json();

                if (!data.usage) {
                    throw new Error("Invalid usage data format");
                }

                // Format reset time
                const resetDate = new Date(data.usage.reset * 1000);
                const resetTimeString = formatResetTime(resetDate);

                if (isAuthenticated) {
                    // Update authenticated user UI
                    usageCount.textContent = `${data.usage.used}/${data.usage.limit}`;
                    usageBar.style.width = `${(data.usage.used / data.usage.limit) * 100}%`;
                    usageReset.textContent = `Resets ${resetTimeString}`;

                    // Change color if usage is high
                    if (data.usage.used / data.usage.limit > 0.8) {
                        usageBar.style.backgroundColor = '#f44336';
                    } else if (data.usage.used / data.usage.limit > 0.6) {
                        usageBar.style.backgroundColor = '#ff9800';
                    } else {
                        usageBar.style.backgroundColor = '#4285f4';
                    }
                } else {
                    // Update anonymous user UI
                    anonymousUsageCount.textContent = `${data.usage.used}/${data.usage.limit}`;
                    anonymousUsageBar.style.width = `${(data.usage.used / data.usage.limit) * 100}%`;
                    anonymousUsageReset.textContent = `Resets ${resetTimeString}`;

                    // Change color if usage is high
                    if (data.usage.used / data.usage.limit > 0.8) {
                        anonymousUsageBar.style.backgroundColor = '#f44336';
                    } else if (data.usage.used / data.usage.limit > 0.6) {
                        anonymousUsageBar.style.backgroundColor = '#ff9800';
                    } else {
                        anonymousUsageBar.style.backgroundColor = '#4285f4';
                    }
                }
            } else {
                const errorText = await response.text();

                // Show error in UI
                if (isAuthenticated) {
                    usageCount.textContent = "Error";
                    usageReset.textContent = "Could not fetch usage data";
                } else {
                    anonymousUsageCount.textContent = "Error";
                    anonymousUsageReset.textContent = "Could not fetch usage data";
                }

                // Try to parse the error
                try {
                    const errorJson = JSON.parse(errorText);
                } catch (e) {
                    // Not JSON, just log the text
                }
            }
        } catch (error) {
            // Error fetching usage data

            // Show error in UI
            if (isAuthenticated) {
                usageCount.textContent = "Error";
                usageReset.textContent = error.message || "Network error";
            } else {
                anonymousUsageCount.textContent = "Error";
                anonymousUsageReset.textContent = error.message || "Network error";
            }
        }
    }

    // Format reset time
    function formatResetTime(resetDate) {
        const now = new Date();

        // If it's today, show "tonight at HH:MM"
        if (resetDate.toDateString() === now.toDateString()) {
            return `tonight at ${resetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // If it's tomorrow, show "tomorrow at HH:MM"
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        if (resetDate.toDateString() === tomorrow.toDateString()) {
            return `tomorrow at ${resetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }

        // Otherwise show full date
        return `on ${resetDate.toLocaleDateString()}`;
    }
});
