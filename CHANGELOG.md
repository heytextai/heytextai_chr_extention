# HeyTextAI Chrome Extension Changelog

## Version 1.2.0 (March 11, 2025)

### Improved UI Behavior
- **Enhancement Button Visibility**: Changed the enhancement button to only appear when a text field is actively focused and contains text, rather than appearing whenever a text field contains text
- **Modern Framework Support**: Added improved detection for text fields in modern JavaScript frameworks
- **Focus Detection**: Enhanced focus detection to work with nested components and custom elements
- **Event Handling**: Added multiple event listeners to better detect user interaction with text fields
- **Context Menu Enhancement**: Added specialized context menu options for all websites

### Technical Improvements
- Added support for detecting focus in Shadow DOM and custom components
- Implemented smarter ancestor/descendant focus detection for complex web applications
- Added debouncing to prevent performance issues with multiple event listeners
- Enhanced mutation observer to better detect dynamically added input fields
- Added iframe support for web applications that use iframes for text editors
- Added specialized context menu for all websites with different enhancement options:
  - HeyTextAI: Improve Writing - Enhances text with standard style
  - HeyTextAI: Make More Formal - Enhances text with formal style
  - HeyTextAI: Make More Concise - Shortens text while maintaining meaning

### Bug Fixes
- Fixed issues with button appearing on non-active text fields
- Improved button positioning when text fields are dynamically resized
- Fixed edge cases where button would remain visible after a text field lost focus
- **Global Context Menu**: Added right-click context menu support for all websites, ensuring consistent functionality across the web

## Version 0.1 (Previous Version)

### Features
- Added support for different text enhancement modes (Standard, Fluency, Humanize, etc.)
- Added support for different action modes (Improve, Extend, Shorten)
- Improved UI with animated buttons and popups

### Improvements
- Enhanced text field detection for Gmail and Outlook
- Added support for contenteditable elements
- Improved button positioning to avoid overlapping with page elements
