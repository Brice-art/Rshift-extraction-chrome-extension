# Rshift-extraction-chrome-extension
The **R Shift system** is a shift management platform commonly used by companies in Japan to manage part-time workers’ schedules. This extension helps users save time by automating the process of transferring shifts to their personal calendar.

The **R Shift system** is a shift management platform commonly used by companies in Japan to manage part-time workers’ schedules. This extension helps users save time by automating the process of transferring shifts to their personal calendar.

## Features

- ✅ Automatically detects your shift schedule on the R Shift webpage.
- ✅ Authenticates with your Google account securely.
- ✅ Exports your shifts to Google Calendar with one click.
  
## Installation

1. Download the repository as a `.zip` file and extract it to a folder.
3. Open Google Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** (top right corner).
5. Click **Load unpacked** and select the folder where you extracted the extension.
6. In the file [`manifest.json`](https://github.com/Brice-art/Rshift-to-google-calendar-chrome-extension/blob/main/manifest.json), replace client_id with your Google client_id. Follow [Google Client ID Guide](https://docs.themeum.com/tutor-lms/tutorials/get-google-client-id/) for step-by-step instructions.
   
## Permissions

- **identity**: Used for authenticating with your Google account.
- **activeTab** and **scripting**: Required to read shift data from the current webpage.
- **calendar.events** scope: Used to create calendar events.

## Note

This extension is not affiliated with or officially supported by the R Shift system or Google.

## License

MIT License