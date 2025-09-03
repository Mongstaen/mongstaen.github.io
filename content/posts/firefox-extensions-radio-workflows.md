---
title: "Firefox Extensions for Radio Station Workflows"
date: 2025-09-03T09:30:14+01:00
author: ["Thomas Mongstad"]
keywords:
  - Firefox
  - Extensions
  - Radio Broadcasting
  - Web Development
  - JavaScript
categories:
  - Web Development
  - Radio Broadcasting
tags:
  - Firefox
  - Extensions
  - Radio
  - JavaScript
  - Broadcasting
summary: "Building custom Firefox extensions to streamline radio station operations and workflows."
description: "How to create Firefox extensions that solve real-world radio broadcasting challenges"
weight:
slug: ""
draft: true
comments: false
hidemeta: false
disableShare: true
showbreadcrumbs: false
ShowTOC: true
TocOpen: false
cover:
  image: ""
  zoom:
  caption: ""
  alt: ""
  relative: false
---

Working in radio means juggling multiple systems - automation software, streaming encoders, request forms, social media, and more. While most stations rely on separate applications for each task, Firefox extensions offer a unique opportunity to unify these workflows directly in your browser.

After years of switching between different tools and browser tabs, I realized we could build custom extensions to streamline common radio operations. Here's how to create Firefox extensions specifically designed for radio station workflows.

## Why Firefox Extensions for Radio?

Modern radio stations live in the browser. We're checking stream health, monitoring social media, managing requests, and updating websites constantly. Extensions provide:

- **Persistent interfaces** that stay visible across tabs
- **Real-time data updates** without manual refreshing
- **Single-click actions** for common tasks
- **Integration** between different web services
- **Custom workflows** tailored to your station's needs

## Extension Ideas for Radio Stations

### Now Playing Monitor

Display current track information from your streaming server in a persistent sidebar. Pull metadata from Icecast/SHOUTcast servers and show:

- Current song and artist
- Track duration and time remaining
- Next scheduled item
- Listener count and bitrate

### Request Manager

Unify listener requests from multiple sources:

- Web form submissions
- Social media mentions and DMs
- SMS gateway integration
- Email requests
- Priority queuing and filtering

### Stream Health Dashboard

Monitor your broadcast infrastructure:

- Encoder connection status
- Stream uptime and reliability
- Audio level monitoring
- Backup stream switching
- Alert notifications for outages

### Automation Controller

Browser interface for your playout system:

- Schedule events and voice tracks
- Upload and tag audio files
- Manage playlists and rotations
- Remote start/stop functionality
- Emergency override controls

## Building Your First Radio Extension

Let's create a simple "Stream Monitor" extension that displays current stream information.

### Project Structure

```
stream-monitor/
├── manifest.json
├── popup.html
├── popup.js
├── background.js
├── content.js
└── icons/
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

### Manifest Configuration (manifest.json)

```json
{
  "manifest_version": 3,
  "name": "Radio Stream Monitor",
  "version": "1.0",
  "description": "Monitor your radio stream status and metadata",

  "permissions": ["activeTab", "storage", "tabs"],

  "host_permissions": [
    "http://your-stream-server.com/*",
    "https://your-stream-server.com/*"
  ],

  "background": {
    "service_worker": "background.js"
  },

  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon-16.png",
      "48": "icons/icon-48.png",
      "128": "icons/icon-128.png"
    }
  },

  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],

  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  }
}
```

### Background Service Worker (background.js)

```javascript
// Poll stream metadata every 30 seconds
const POLL_INTERVAL = 30000;

chrome.runtime.onInstalled.addListener(() => {
  console.log("Radio Stream Monitor installed");
  startMetadataPolling();
});

async function fetchStreamMetadata() {
  try {
    // Replace with your stream's metadata endpoint
    const response = await fetch("http://your-server.com:8000/status-json.xsl");
    const data = await response.json();

    const streamInfo = {
      title: data.icestats.source.title || "Unknown",
      listeners: data.icestats.source.listeners || 0,
      bitrate: data.icestats.source.bitrate || "Unknown",
      status: "online",
      lastUpdate: new Date().toLocaleTimeString(),
    };

    // Store metadata for popup access
    chrome.storage.local.set({ streamInfo });

    // Update badge with listener count
    chrome.action.setBadgeText({
      text: streamInfo.listeners.toString(),
    });

    chrome.action.setBadgeBackgroundColor({
      color: "#00AA00",
    });
  } catch (error) {
    console.error("Failed to fetch stream metadata:", error);

    chrome.storage.local.set({
      streamInfo: {
        title: "Stream Offline",
        status: "offline",
        lastUpdate: new Date().toLocaleTimeString(),
      },
    });

    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#AA0000" });
  }
}

function startMetadataPolling() {
  fetchStreamMetadata();
  setInterval(fetchStreamMetadata, POLL_INTERVAL);
}
```

### Popup Interface (popup.html)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        width: 300px;
        padding: 15px;
        font-family: Arial, sans-serif;
        margin: 0;
      }

      .stream-info {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      .status-online {
        border-left: 4px solid #00aa00;
      }
      .status-offline {
        border-left: 4px solid #aa0000;
      }

      .title {
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 14px;
      }

      .metadata {
        font-size: 12px;
        color: #666;
        line-height: 1.4;
      }

      .controls button {
        background: #0066cc;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 3px;
        cursor: pointer;
        margin-right: 5px;
        font-size: 11px;
      }

      .controls button:hover {
        background: #0052a3;
      }
    </style>
  </head>
  <body>
    <div id="stream-container">
      <div class="stream-info" id="stream-info">
        <div class="title" id="stream-title">Loading...</div>
        <div class="metadata" id="stream-metadata">
          <div>Status: <span id="stream-status">-</span></div>
          <div>Listeners: <span id="listener-count">-</span></div>
          <div>Bitrate: <span id="stream-bitrate">-</span></div>
          <div>Updated: <span id="last-update">-</span></div>
        </div>
      </div>

      <div class="controls">
        <button id="refresh-btn">Refresh</button>
        <button id="open-stats">Full Stats</button>
      </div>
    </div>

    <script src="popup.js"></script>
  </body>
</html>
```

### Popup Logic (popup.js)

```javascript
document.addEventListener("DOMContentLoaded", async () => {
  await loadStreamInfo();

  document.getElementById("refresh-btn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "refreshStream" });
    setTimeout(loadStreamInfo, 1000);
  });

  document.getElementById("open-stats").addEventListener("click", () => {
    chrome.tabs.create({
      url: "http://your-server.com:8000/admin/",
    });
  });
});

async function loadStreamInfo() {
  const result = await chrome.storage.local.get("streamInfo");
  const streamInfo = result.streamInfo || {};

  const container = document.getElementById("stream-info");
  const statusClass =
    streamInfo.status === "online" ? "status-online" : "status-offline";
  container.className = `stream-info ${statusClass}`;

  document.getElementById("stream-title").textContent =
    streamInfo.title || "No data";
  document.getElementById("stream-status").textContent =
    streamInfo.status || "unknown";
  document.getElementById("listener-count").textContent =
    streamInfo.listeners || "0";
  document.getElementById("stream-bitrate").textContent =
    streamInfo.bitrate || "Unknown";
  document.getElementById("last-update").textContent =
    streamInfo.lastUpdate || "Never";
}

// Listen for storage changes to update popup in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "local" && changes.streamInfo) {
    loadStreamInfo();
  }
});
```

## Advanced Features

### WebSocket Integration

For real-time updates from automation systems:

```javascript
// In background.js
let ws;

function connectToAutomation() {
  ws = new WebSocket("ws://automation-server:8080/websocket");

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "nowplaying") {
      chrome.storage.local.set({
        currentTrack: {
          artist: data.artist,
          title: data.title,
          duration: data.duration,
          remaining: data.remaining,
        },
      });
    }
  };
}
```

### Cross-Tab Communication

Share data between extension instances:

```javascript
// Broadcast updates to all tabs
chrome.tabs.query({}, (tabs) => {
  tabs.forEach((tab) => {
    chrome.tabs.sendMessage(tab.id, {
      type: "streamUpdate",
      data: streamInfo,
    });
  });
});
```

## Installation and Testing

1. **Development Setup**:

   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox" → "Load Temporary Add-on"
   - Select your `manifest.json` file

2. **Testing Workflow**:

   - Configure your stream server URLs
   - Test with live and offline streams
   - Verify real-time updates
   - Check error handling

3. **Distribution**:
   - Package as `.xpi` file for internal distribution
   - Submit to Firefox Add-ons store for public release

## Real-World Applications

I've built similar extensions for:

- **Request queue management** - Unified inbox for all listener communications
- **Social media monitoring** - Track mentions and hashtags across platforms
- **Emergency broadcast controls** - Quick access to override automation
- **Staff scheduling interface** - Browser-based shift management

## Next Steps

This basic stream monitor is just the beginning. Consider adding:

- Audio level visualization
- Historical data and charts
- Integration with multiple streams
- Mobile-responsive design
- Push notifications for outages

Extensions offer incredible flexibility for radio station workflows. By building tools specifically for your operation, you can eliminate context switching and create more efficient broadcasting processes.

The beauty of browser extensions is their ability to persist alongside your regular web browsing, providing instant access to critical station information without disrupting your workflow.

---

_Source code for this extension and others available on [GitHub](https://github.com/mongstaen). Feel free to reach out at @mongstad:matrix.org with questions or feature suggestions!_
