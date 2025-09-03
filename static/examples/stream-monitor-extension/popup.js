// Radio Stream Monitor - Popup Interface
// Handles UI interactions and displays stream information

document.addEventListener('DOMContentLoaded', async () => {
  await initializePopup();
  setupEventListeners();
  await loadStreamInfo();
  
  // Auto-refresh every 30 seconds while popup is open
  setInterval(loadStreamInfo, 30000);
});

async function initializePopup() {
  // Load current settings
  const settings = await chrome.storage.local.get(['streamUrl']);
  const streamUrlInput = document.getElementById('stream-url');
  
  if (settings.streamUrl) {
    streamUrlInput.value = settings.streamUrl;
  }
}

function setupEventListeners() {
  // Refresh button
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    showLoading();
    
    try {
      await chrome.runtime.sendMessage({ action: 'refreshStream' });
      setTimeout(loadStreamInfo, 1000);
    } catch (error) {
      showError('Failed to refresh stream data');
    }
  });
  
  // Listen button
  document.getElementById('listen-btn').addEventListener('click', async () => {
    const streamInfo = await getStoredStreamInfo();
    
    if (streamInfo.streamUrl) {
      chrome.tabs.create({ url: streamInfo.streamUrl });
    } else {
      // Try to construct a listen URL from the status URL
      const settings = await chrome.storage.local.get(['streamUrl']);
      if (settings.streamUrl) {
        const baseUrl = settings.streamUrl.replace(/\/status.*$/, '');
        chrome.tabs.create({ url: baseUrl });
      }
    }
  });
  
  // Settings toggle
  document.getElementById('settings-toggle').addEventListener('click', () => {
    const panel = document.getElementById('settings-panel');
    panel.classList.toggle('show');
  });
  
  // Save settings
  document.getElementById('save-settings').addEventListener('click', async () => {
    const streamUrl = document.getElementById('stream-url').value.trim();
    
    if (!streamUrl) {
      showError('Please enter a valid stream URL');
      return;
    }
    
    try {
      await chrome.runtime.sendMessage({ 
        action: 'updateStreamUrl', 
        url: streamUrl 
      });
      
      await chrome.storage.local.set({ streamUrl });
      
      // Hide settings panel and refresh data
      document.getElementById('settings-panel').classList.remove('show');
      showLoading();
      setTimeout(loadStreamInfo, 1000);
      
    } catch (error) {
      showError('Failed to save settings');
    }
  });
}

async function loadStreamInfo() {
  try {
    const streamInfo = await getStoredStreamInfo();
    
    if (Object.keys(streamInfo).length === 0) {
      showLoading();
      return;
    }
    
    displayStreamInfo(streamInfo);
    hideLoading();
    clearError();
    
  } catch (error) {
    console.error('Error loading stream info:', error);
    showError('Failed to load stream information');
  }
}

function displayStreamInfo(streamInfo) {
  const container = document.getElementById('stream-container');
  const streamInfoDiv = document.getElementById('stream-info');
  
  // Update status styling
  if (streamInfo.status === 'online') {
    streamInfoDiv.className = 'stream-info online';
    document.getElementById('status-dot').className = 'status-dot online';
  } else {
    streamInfoDiv.className = 'stream-info offline';
    document.getElementById('status-dot').className = 'status-dot';
  }
  
  // Update content
  document.getElementById('song-title').textContent = streamInfo.song || streamInfo.title || 'Unknown Track';
  document.getElementById('artist-name').textContent = streamInfo.artist || 'Unknown Artist';
  document.getElementById('stream-status').textContent = streamInfo.status || 'Unknown';
  document.getElementById('listener-count').textContent = streamInfo.listeners || '0';
  document.getElementById('stream-bitrate').textContent = streamInfo.bitrate || 'Unknown';
  document.getElementById('last-update').textContent = streamInfo.lastUpdate || 'Never';
  
  // Show/hide artist name if not available
  const artistElement = document.getElementById('artist-name');
  if (!streamInfo.artist) {
    artistElement.style.display = 'none';
  } else {
    artistElement.style.display = 'block';
  }
  
  container.style.display = 'block';
}

async function getStoredStreamInfo() {
  const result = await chrome.storage.local.get('streamInfo');
  return result.streamInfo || {};
}

function showLoading() {
  document.getElementById('loading').style.display = 'block';
  document.getElementById('stream-container').style.display = 'none';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

function showError(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

function clearError() {
  document.getElementById('error-container').innerHTML = '';
}

// Listen for storage changes to update popup in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.streamInfo) {
    loadStreamInfo();
  }
});

// Handle popup visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Popup became visible, refresh data
    loadStreamInfo();
  }
});