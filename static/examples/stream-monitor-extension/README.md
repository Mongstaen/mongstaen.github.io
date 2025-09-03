# Radio Stream Monitor Extension

A Firefox extension that monitors radio stream metadata and displays real-time information about your broadcast.

## Features

- **Real-time stream monitoring** - Polls your Icecast/SHOUTcast server every 30 seconds
- **Live listener count** - Shows current listeners in the extension badge
- **Now playing information** - Displays current song and artist
- **Stream status tracking** - Online/offline status with visual indicators
- **Configurable stream URL** - Easy setup for different servers
- **Clean, modern interface** - Responsive design with smooth animations

## Installation

### Development Installation
1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" → "Load Temporary Add-on"
3. Select the `manifest.json` file from this directory

### Manual Installation (.xpi)
1. Download the packaged extension
2. Open Firefox and navigate to `about:addons`
3. Click the gear icon → "Install Add-on From File"
4. Select the downloaded .xpi file

## Configuration

1. Click the extension icon in your Firefox toolbar
2. Click "⚙️ Settings" at the bottom of the popup
3. Enter your stream's status URL (e.g., `https://your-server.com:8000/status-json.xsl`)
4. Click "Save"

### Supported Stream Formats

The extension works with:
- **Icecast 2.x** servers (`/status-json.xsl`)
- **SHOUTcast v2** servers (`/stats?json=1`)
- Custom JSON APIs that provide stream metadata

### Example URLs
- Icecast: `https://stream.example.com:8000/status-json.xsl`
- SHOUTcast: `https://stream.example.com:8000/stats?json=1`

## API Response Format

The extension expects JSON responses in Icecast format:

```json
{
  "icestats": {
    "source": {
      "title": "Artist - Song Title",
      "listeners": 42,
      "bitrate": 128,
      "server_name": "Your Radio Station",
      "genre": "Pop",
      "listenurl": "https://stream.example.com:8000/stream"
    }
  }
}
```

## Permissions

The extension requires these permissions:
- `activeTab` - To interact with the current tab
- `storage` - To save your stream URL and settings
- `tabs` - To open stream links in new tabs
- `http://*/*` and `https://*/*` - To fetch stream metadata

## Development

### Project Structure
```
stream-monitor-extension/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for data fetching
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and UI interactions
├── content.js            # Content script for web page integration
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
└── README.md            # This file
```

### Building Icons

Create icons in the following sizes:
- 16x16 pixels (toolbar icon)
- 48x48 pixels (extensions page)
- 128x128 pixels (Chrome Web Store)

Use a radio/broadcasting theme with good contrast for visibility.

### Testing

1. Configure with a test stream server
2. Verify online/offline state changes
3. Test with various metadata formats
4. Check error handling with invalid URLs
5. Verify badge updates correctly

### Packaging for Distribution

To create a .xpi file for distribution:

```bash
cd stream-monitor-extension
zip -r ../stream-monitor-extension.xpi . -x "*.DS_Store" "*.git*" "README.md"
```

## Customization

### Adding New Stream Formats

Modify the `fetchStreamMetadata()` function in `background.js` to support additional API formats:

```javascript
// Add support for custom API format
if (data.customFormat) {
  streamInfo = {
    title: data.customFormat.nowplaying,
    listeners: data.customFormat.audience,
    // ... other mappings
  };
}
```

### Extending the UI

The popup interface can be extended with additional features:
- Stream quality indicators
- Historical listener graphs
- Social media integration
- Request management

## Troubleshooting

### Common Issues

**Extension badge shows "OFF"**
- Check that your stream URL is correct
- Verify the server is online and responding
- Check browser console for CORS errors

**No metadata displaying**
- Ensure your server provides JSON status endpoints
- Check the response format matches expected structure
- Verify server allows cross-origin requests

**Listeners count not updating**
- Confirm the server provides listener statistics
- Check that polling is working (browser console logs)
- Verify the JSON path matches your server's format

### Debug Mode

Enable debug logging by opening Firefox Developer Tools (F12) and checking the Console tab while using the extension.

## License

This extension is provided as an educational example for the blog post "Firefox Extensions for Radio Station Workflows".

Feel free to modify and adapt for your specific use case.

## Support

For questions or issues, reach out at @mongstad:matrix.org or create an issue on the GitHub repository.