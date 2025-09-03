// Radio Stream Monitor - Content Script
// Runs on all web pages to provide additional functionality

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'streamUpdate':
      handleStreamUpdate(request.data);
      break;
    case 'insertNowPlaying':
      insertNowPlayingWidget(request.data);
      break;
  }
});

function handleStreamUpdate(streamInfo) {
  // Update any on-page stream widgets
  const widgets = document.querySelectorAll('.stream-monitor-widget');
  widgets.forEach(widget => updateWidget(widget, streamInfo));
  
  // Dispatch custom event for websites to listen to
  window.dispatchEvent(new CustomEvent('streamMonitorUpdate', {
    detail: streamInfo
  }));
}

function updateWidget(widget, streamInfo) {
  if (!widget) return;
  
  const titleElement = widget.querySelector('.sm-title');
  const artistElement = widget.querySelector('.sm-artist');
  const statusElement = widget.querySelector('.sm-status');
  const listenersElement = widget.querySelector('.sm-listeners');
  
  if (titleElement) titleElement.textContent = streamInfo.song || streamInfo.title || 'Unknown';
  if (artistElement) artistElement.textContent = streamInfo.artist || '';
  if (statusElement) {
    statusElement.textContent = streamInfo.status;
    statusElement.className = `sm-status ${streamInfo.status}`;
  }
  if (listenersElement) listenersElement.textContent = streamInfo.listeners || '0';
}

function insertNowPlayingWidget(streamInfo) {
  // Only inject widget if requested and not already present
  if (document.querySelector('.stream-monitor-widget')) return;
  
  const widget = createNowPlayingWidget(streamInfo);
  document.body.appendChild(widget);
}

function createNowPlayingWidget(streamInfo) {
  const widget = document.createElement('div');
  widget.className = 'stream-monitor-widget';
  widget.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 250px;
    cursor: move;
  `;
  
  widget.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
      <strong>📻 Now Playing</strong>
      <button class="sm-close" style="border: none; background: none; cursor: pointer; font-size: 16px;">&times;</button>
    </div>
    <div class="sm-title" style="font-weight: bold; margin-bottom: 4px;">${streamInfo.song || streamInfo.title || 'Unknown'}</div>
    <div class="sm-artist" style="color: #666; margin-bottom: 8px;">${streamInfo.artist || ''}</div>
    <div style="display: flex; justify-content: space-between; font-size: 12px;">
      <span class="sm-status ${streamInfo.status}" style="color: ${streamInfo.status === 'online' ? '#28a745' : '#dc3545'};">${streamInfo.status}</span>
      <span><span class="sm-listeners">${streamInfo.listeners || 0}</span> listeners</span>
    </div>
  `;
  
  // Make widget draggable
  makeWidgetDraggable(widget);
  
  // Add close functionality
  widget.querySelector('.sm-close').addEventListener('click', () => {
    widget.remove();
  });
  
  return widget;
}

function makeWidgetDraggable(widget) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;
  
  widget.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('sm-close')) return;
    
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === widget || widget.contains(e.target)) {
      isDragging = true;
      widget.style.cursor = 'grabbing';
    }
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      
      xOffset = currentX;
      yOffset = currentY;
      
      widget.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    }
  });
  
  document.addEventListener('mouseup', () => {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    widget.style.cursor = 'move';
  });
}

// Initialize content script
console.log('Radio Stream Monitor content script loaded');