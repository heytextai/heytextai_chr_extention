# HeyTextAI API Documentation

## Overview

The HeyTextAI API is a RESTful service that enhances text by improving its style and content. The API receives text from the Chrome extension, processes it using AI, and returns an enhanced version based on user-selected preferences for style and action modes.

## Base URL

```
https://api.heytextai.com/v1
```

## Authentication

For the MVP, no authentication is required. In future versions, authentication can be implemented using API keys or OAuth.

## Endpoints

### 1. Enhance Text

Enhances the provided text according to specified style and action preferences.

```
POST /enhance
```

#### Request Format

```json
{
  "text": "String containing the original text to enhance",
  "context": {
    "source": "email|textfield|textarea|contextmenu|other",
    "domain": "gmail.com|outlook.com|example.com",
    "language": "en-US|fr-FR|etc"
  },
  "preferences": {
    "enhancementType": "style",
    "styleMode": "standard|fluency|humanize|formal|academic|simple",
    "actionMode": "improve|extend|shorten",
    "model": "model-name"
  }
}
```

**Required Fields:**
- `text`: The original text to be enhanced (string, required)

**Optional Fields:**
- `context`: Information about where the text is coming from (object, optional)
  - `source`: Type of input field (string, optional)
  - `domain`: Website domain where text was entered (string, optional)
  - `language`: Language code of the text (string, optional, defaults to "en-US")
- `preferences`: User preferences for enhancement (object, optional)
  - `enhancementType`: Type of enhancement to perform (string, optional, defaults to "style")
  - `styleMode`: Style modification to apply (string, optional, defaults to "standard")
    - `standard`: Concise, clear, and professional while maintaining original tone
    - `fluency`: Natural flow with smooth transitions between ideas
    - `humanize`: Conversational and natural, as if written by a human
    - `formal`: Professional and sophisticated with proper grammar
    - `academic`: Scholarly tone with precise terminology and formal structure
    - `simple`: Accessible with shorter sentences and simpler words
  - `actionMode`: Action to perform on the text (string, optional, defaults to "improve")
    - `improve`: Enhance quality while maintaining length and key points
    - `extend`: Expand with relevant details, examples, or explanations
    - `shorten`: Make more concise while preserving key information
  - `model`: AI model to use (string, optional, defaults to system configuration)

#### Response Format

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
    "confidence": 0.95,
    "model": "model-name-used"
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
  - `model`: The AI model used for enhancement (string)

#### Example Requests

**Standard Style Improvement:**
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
    "styleMode": "standard",
    "actionMode": "improve"
  }
}
```

**Formal Style with Text Extension:**
```json
POST /enhance
Content-Type: application/json

{
  "text": "We need to talk about the budget issues.",
  "preferences": {
    "styleMode": "formal",
    "actionMode": "extend"
  }
}
```

**Academic Style with Text Shortening:**
```json
POST /enhance
Content-Type: application/json

{
  "text": "The experiment showed that the new compound had some effect on cell growth, which was interesting because we didn't expect to see any changes at all given the previous literature on similar compounds that suggested minimal impact on cellular processes.",
  "preferences": {
    "styleMode": "academic",
    "actionMode": "shorten"
  }
}
```

#### Example Response

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
    "confidence": 0.92,
    "model": "google/gemini-2.0-pro-exp-02-05"
  }
}
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests.

### Error Response Format

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

### Common Error Codes

| Status Code | Error Code | Description |
|-------------|------------|-------------|
| 400 | invalid_request | The request was malformed or missing required fields |
| 400 | text_too_long | The provided text exceeds the maximum length |
| 422 | unsupported_language | The specified language is not supported |
| 429 | rate_limit_exceeded | Too many requests in a given time period |
| 500 | processing_error | Error occurred while processing the text |
| 502 | ai_service_error | Error from the underlying AI service |
| 503 | service_unavailable | The service is temporarily unavailable |

### Example Error Response

```json
{
  "error": {
    "code": "text_too_long",
    "message": "The provided text exceeds the maximum length of 5000 characters",
    "details": {
      "field": "text",
      "limit": 5000,
      "provided": 6200
    }
  }
}
```

## Rate Limiting

Basic rate limiting is implemented:
- 10 requests per minute per IP address
- 100 requests per day per IP address

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 5
X-RateLimit-Reset: 1614556800
```

## Frontend Implementation Guidelines

### Chrome Extension Integration

The frontend should:

1. **Collect User Input**:
   - Capture text from the active input field
   - Allow users to select style and action modes

2. **Send API Requests**:
   - Format the request according to the API specification
   - Include context information about the source
   - Pass user-selected preferences for style and action modes

3. **Handle Responses**:
   - Display the enhanced text to the user
   - Provide options to apply, copy, or cancel the enhancement
   - Show appropriate loading and error states

4. **Store User Preferences**:
   - Save selected style and action modes using Chrome storage
   - Apply these preferences to future enhancement requests

### Style and Action Modes

The frontend should provide UI for selecting:

1. **Style Modes**:
   - Standard: Default balanced style
   - Fluency: Smooth, natural flow
   - Humanize: Conversational, human-like
   - Formal: Professional, sophisticated
   - Academic: Scholarly, precise
   - Simple: Accessible, straightforward

2. **Action Modes**:
   - Improve: Enhance quality (default)
   - Extend: Add details and examples
   - Shorten: Make more concise

### Error Handling

The frontend should:
- Display appropriate error messages based on API responses
- Implement retry logic for transient errors
- Provide fallback options when the service is unavailable

## Backend Implementation Guidelines

### Technology Stack

- **Framework**: Node.js with Express
- **AI Integration**: OpenRouter API (with models like GPT-4 or Gemini)
- **Caching**: Redis for response caching
- **Logging**: Winston or similar for request/response logging

### Prompt Engineering

The backend constructs prompts based on the selected style and action modes. Here's the general structure:

```
You are an expert writing assistant. Your task is to improve the style of text while preserving its meaning and intent. 

[Style-specific instructions based on styleMode]

[Action-specific instructions based on actionMode]

Original text:
{text}

Enhance the text according to the instructions. Return the enhanced version along with an explanation of the changes made.
```

### Response Processing

The backend should:
- Parse the AI response into a structured format
- Extract the enhanced text and change explanations
- Handle any parsing errors gracefully
- Return a consistent response format to the frontend
