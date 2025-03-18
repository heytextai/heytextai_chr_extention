# 📝 HeyTextAI Chrome Extension

A Chrome extension that enhances text using AI. The extension detects text fields, provides an overlay button, and allows users to enhance text via a context menu.

## ✨ Features

- **🔍 Text Field Detection**: Automatically detects text fields, textareas, and contenteditable elements
- **🔘 Smart Circular Button**: Shows a small circular button near text fields only when they are actively focused and contain text
- **🔄 Animated Loading**: Visual feedback with spinning and pulsing animations during text processing
- **📊 Sliding Options**: Action buttons slide out vertically when enhancement is complete
- **📋 Context Menu Integration**: Right-click on selected text to enhance it
- **📧 Email Provider Support**: Special support for Gmail, Outlook, and other email providers
- **🖱️ One-Click Enhancement**: Simply click the button to send text for enhancement
- **🌐 Multi-language Support**: Works with any language - we always preserve your original language

## 🤖 AI Technology

HeyTextAI leverages powerful Large Language Models (LLMs) through the OpenRouter API to provide state-of-the-art text enhancement capabilities:

- **🧠 Advanced Models**: Access to leading AI models including Claude, GPT-4, and more
- **📊 Contextual Understanding**: Our AI understands the context and intent of your writing
- **🌍 Language Preservation**: Enhances text in any language while preserving the original language
- **💡 Intelligent Suggestions**: Provides meaningful improvements rather than simple corrections

## 🎨 Writing Style Options

Choose from these writing styles to match your specific needs:

| Style | Description | Best For |
|-------|-------------|----------|
| ✨ **Standard** | Makes text more concise, clear, and professional | General purpose writing |
| 🌊 **Fluency** | Focuses on natural flow and smooth transitions | Essays, articles, stories |
| 👤 **Humanize** | Makes text sound more conversational and natural | Emails, social media, casual writing |
| 👔 **Formal** | Creates more professional and sophisticated text | Business documents, formal letters |
| 🎓 **Academic** | Transforms text into scholarly, precise language | Research papers, academic writing |
| 🔤 **Simple** | Simplifies text with shorter sentences and clearer explanations | Instructions, explanations, accessibility |

## ⚙️ Action Options

Customize how the AI enhances your text:

| Action | Description | When To Use |
|--------|-------------|-------------|
| 🔄 **Improve** | Enhances quality while maintaining length and key points | General enhancement |
| 📈 **Extend** | Expands text with relevant details and examples | When you need more depth |
| 📉 **Shorten** | Makes text more concise while preserving key information | When brevity is important |

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0). This means you are free to share and adapt the material for non-commercial purposes, as long as you give appropriate credit.

For more information, see the [full license text](https://creativecommons.org/licenses/by-nc/4.0/legalcode).

## Installation

### Chrome Web Store
*Coming soon* - The extension will be available on the Chrome Web Store in the future.

### Manual Installation (Developer Mode)

As the extension is currently in development, you can install it manually using Chrome's developer mode:

1. **Download the Extension**
   - Clone this repository: `git clone https://github.com/yourusername/heytextai-chrome-extension.git`
   - Or download it as a ZIP file and extract it to a local folder

2. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in your Chrome address bar
   - Or navigate to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner of the extensions page

4. **Load the Extension**
   - Click the "Load unpacked" button that appears after enabling developer mode
   - Navigate to the folder where you extracted/cloned the extension files
   - Select the root folder (the one containing manifest.json) and click "Open"

5. **Verify Installation**
   - The HeyTextAI extension should now appear in your list of installed extensions
   - The extension icon should be visible in your Chrome toolbar

6. **Pin the Extension** (Optional)
   - Click the extensions icon (puzzle piece) in the Chrome toolbar
   - Find HeyTextAI and click the pin icon to keep it visible in your toolbar

### Troubleshooting

- If the extension doesn't appear to work, try reloading the page you're using it on
- If you update the extension's code, return to chrome://extensions/ and click the refresh icon on the extension card
- Check the browser console (F12) for any error messages related to the extension

### Keeping the Extension Updated

When using the extension in developer mode, you'll need to manually update it when new versions are released:

1. Download/pull the latest version
2. Go to chrome://extensions/
3. Find HeyTextAI and click the refresh icon, or uninstall it and load it again using "Load unpacked"

## Usage

### Enhanced Button Interface

1. Click on any text field or textarea to focus it
2. A circular button will appear near the field when it contains text and has focus
3. The button will disappear when the field loses focus or becomes empty
4. Click the button to send the text for enhancement
5. After processing, three option buttons will slide out:
   - Green checkmark (✓): Apply the enhanced text to the field
   - Blue clipboard (📋): Copy the enhanced text to clipboard
   - Red X (✕): Cancel and hide the options

### Context Menu

1. Select text on any webpage
2. Right-click and select "Enhance with HeyTextAI"
3. Review the enhanced text and choose to apply it or copy it

## API Specifications

The extension communicates with a backend API to enhance text. Below are the API specifications for implementing the backend.

### Base URL

```
https://api.heytextai.com/v1
```

### Endpoints

#### 1. Enhance Text

Enhances the provided text by improving its style.

```
POST /enhance
```

##### Request Format

```json
{
  "text": "String containing the original text to enhance",
  "context": {
    "source": "email|textfield|textarea|contextmenu|other",
    "domain": "gmail.com|outlook.com|example.com"
  },
  "preferences": {
    "enhancementType": "style"
  }
}
```

**Required Fields:**
- `text`: The original text to be enhanced (string, required)

**Optional Fields:**
- `context`: Information about where the text is coming from (object, optional)
  - `source`: Type of input field (string, optional)
  - `domain`: Website domain where text was entered (string, optional)
- `preferences`: User preferences for enhancement (object, optional)
  - `enhancementType`: Type of enhancement to perform (string, optional, defaults to "style")

##### Response Format

```json
{
  "original": "Original text entered by user",
  "enhanced": "Improved version of the text with better style and clarity",
  "changes": [
    {
      "type": "style",
      "original": "specific part that was changed",
      "enhanced": "improved version of that part",
      "explanation": "Brief explanation of why this change improves the text"
    }
  ],
  "metadata": {
    "processingTime": "0.5s",
    "confidence": 0.95
  }
}
```

**Response Fields:**
- `original`: The original text that was submitted (string)
- `enhanced`: The complete enhanced version of the text (string)
- `changes`: Array of specific changes made to the text (array of objects)
  - `type`: Type of change made (string)
  - `original`: Original text segment (string)
  - `enhanced`: Enhanced text segment (string)
  - `explanation`: Explanation of the change (string)
- `metadata`: Additional information about the processing (object)
  - `processingTime`: Time taken to process the request (string)
  - `confidence`: Confidence score for the enhancement (number, 0-1)

##### Example Request

```json
POST /enhance
Content-Type: application/json

{
  "text": "I wanted to inform you that we will be having a meeting tomorrow to discuss the project progress.",
  "context": {
    "source": "email",
    "domain": "gmail.com"
  },
  "preferences": {
    "enhancementType": "style"
  }
}
```

##### Example Response

```json
{
  "original": "I wanted to inform you that we will be having a meeting tomorrow to discuss the project progress.",
  "enhanced": "We'll be meeting tomorrow to discuss the project progress.",
  "changes": [
    {
      "type": "style",
      "original": "I wanted to inform you that we will be having a meeting",
      "enhanced": "We'll be meeting",
      "explanation": "More concise and direct phrasing"
    }
  ],
  "metadata": {
    "processingTime": "0.3s",
    "confidence": 0.92
  }
}
```

### Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests.

#### Error Response Format

```json
{
  "error": {
    "code": "error_code",
    "message": "Human-readable error message",
    "details": {
      "field": "Specific field causing the error (if applicable)"
    }
  }
}
```

#### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | The request was malformed or missing required fields |
| 400 | text_too_long | The provided text exceeds the maximum length |
| 422 | unsupported_language | The specified language is not supported |
| 429 | rate_limit_exceeded | Too many requests in a given time period |
| 500 | processing_error | Error occurred while processing the text |
| 503 | service_unavailable | The service is temporarily unavailable |

## Backend Implementation Notes

### Technology Stack Recommendations

- **Framework**: Node.js with Express
- **AI Integration**: OpenAI API (GPT-4 or similar) or OpenRouter
- **Caching**: Redis for response caching
- **Logging**: Winston or similar for request/response logging

### Prompt Engineering for Style Enhancement

For the AI backend, you'll need to craft effective prompts to achieve good style enhancement. Here's a sample prompt structure:

```
You are an expert writing assistant. Your task is to improve the style of the following text while preserving its meaning and intent. Make it more concise, clear, and professional.

Original text:
{text}

Enhance the style of this text. Return the enhanced version along with an explanation of the changes made.
```

## Development

### Project Structure

```
heytextai_chr_extension/
├── manifest.json         # Extension configuration
├── background.js         # Background script for context menu and API communication
├── content.js            # Content script for text field detection and UI overlay
├── lib/
│   └── utilities.js      # Utility functions for the extension
├── popup/
│   ├── popup.html        # Popup UI HTML
│   ├── popup.css         # Popup UI styles
│   └── popup.js          # Popup UI functionality
└── icons/                # Extension icons (not included)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Future Enhancements

- User authentication
- Multiple enhancement types (grammar, tone, formality)
- Custom user preferences
- History of enhancements
- Support for more email providers and text editors
