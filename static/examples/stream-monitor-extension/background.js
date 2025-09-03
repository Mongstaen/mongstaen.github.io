// Radio Stream Monitor - Background Service Worker
// Polls stream metadata and manages extension state

const POLL_INTERVAL = 30000; // 30 seconds
const DEFAULT_STREAM_URL = 'https://demo.icecast.org/status-json.xsl';

let pollTimer;

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Radio Stream Monitor installed');
  initializeExtension();
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
  initializeExtension();
});

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'refreshStream':
      fetchStreamMetadata();
      sendResponse({ success: true });
      break;
    case 'updateStreamUrl':
      updateStreamUrl(request.url);
      sendResponse({ success: true });
      break;
    case 'getStreamInfo':
      getStoredStreamInfo().then(sendResponse);
      return true; // Will respond asynchronously
  }
});

async function initializeExtension() {
  // Set default settings if not already configured
  const settings = await chrome.storage.local.get(['streamUrl', 'pollInterval']);
  
  if (!settings.streamUrl) {
    await chrome.storage.local.set({
      streamUrl: DEFAULT_STREAM_URL,
      pollInterval: POLL_INTERVAL
    });
  }
  
  startMetadataPolling();
}

async function fetchStreamMetadata() {
  try {
    const settings = await chrome.storage.local.get(['streamUrl']);
    const streamUrl = settings.streamUrl || DEFAULT_STREAM_URL;
    
    console.log('Fetching metadata from:', streamUrl);
    
    const response = await fetch(streamUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Parse Icecast status format
    let streamInfo;
    if (data.icestats && data.icestats.source) {
      const source = Array.isArray(data.icestats.source) 
        ? data.icestats.source[0] 
        : data.icestats.source;
      
      streamInfo = {
        title: source.title || source.server_name || 'Unknown Stream',
        artist: extractArtist(source.title),
        song: extractSong(source.title),
        listeners: parseInt(source.listeners) || 0,
        bitrate: source.bitrate || 'Unknown',
        genre: source.genre || 'Unknown',
        status: 'online',
        serverName: source.server_name || 'Radio Station',
        maxListeners: parseInt(source.listener_peak) || 0,
        lastUpdate: new Date().toLocaleTimeString(),
        streamUrl: source.listenurl || streamUrl
      };
    } else {
      // Fallback format for other stream servers
      streamInfo = {
        title: data.title || 'Unknown Stream',
        listeners: parseInt(data.listeners) || 0,
        bitrate: data.bitrate || 'Unknown',
        status: 'online',
        lastUpdate: new Date().toLocaleTimeString()
      };
    }
    
    // Store metadata
    await chrome.storage.local.set({ streamInfo });
    
    // Update extension badge
    updateBadge(streamInfo.listeners, true);
    
    console.log('Stream metadata updated:', streamInfo);
    
  } catch (error) {
    console.error('Failed to fetch stream metadata:', error);
    
    const offlineInfo = {
      title: 'Stream Offline',
      status: 'offline',
      error: error.message,
      lastUpdate: new Date().toLocaleTimeString()
    };
    
    await chrome.storage.local.set({ streamInfo: offlineInfo });
    updateBadge(0, false);
  }
}

function extractArtist(title) {
  if (!title) return '';
  const parts = title.split(' - ');
  return parts.length > 1 ? parts[0].trim() : '';
}

function extractSong(title) {
  if (!title) return '';
  const parts = title.split(' - ');
  return parts.length > 1 ? parts.slice(1).join(' - ').trim() : title;
}

function updateBadge(listenerCount, isOnline) {
  if (isOnline) {
    chrome.action.setBadgeText({
      text: listenerCount > 0 ? listenerCount.toString() : '0'
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#00AA00'
    });
  } else {
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#AA0000' });
  }
}

function startMetadataPolling() {
  // Clear any existing timer
  if (pollTimer) {
    clearInterval(pollTimer);
  }
  
  // Initial fetch
  fetchStreamMetadata();
  
  // Set up polling
  pollTimer = setInterval(fetchStreamMetadata, POLL_INTERVAL);
}

async function updateStreamUrl(newUrl) {
  await chrome.storage.local.set({ streamUrl: newUrl });
  // Restart polling with new URL
  startMetadataPolling();
}

async function getStoredStreamInfo() {
  const result = await chrome.storage.local.get('streamInfo');
  return result.streamInfo || {};
}