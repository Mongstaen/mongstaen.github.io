---
title: "Radio Studio Monitor Gets Song History Feature"
date: 2025-09-15T06:14:51+02:00
lastmod: 2025-09-15T06:14:51+02:00
author: ["Thomas Mongstad"]
keywords:
  - radio
  - studio monitor
  - docker
  - web development
categories:
  - Projects
tags:
  - Radio
  - Web Development
  - Docker
summary: "Enhanced the Radio Studio Monitor with automatic song history tracking, showing the last three played songs for better context."
description: "New update adds song history tracking to the Docker Radio Display project, improving user experience with real-time previous song information."
weight:
slug: ""
draft: false
comments: false
hidemeta: false
disableShare: true
showbreadcrumbs: false

ShowTOC: false
TocOpen: false

cover:
  image: ""
  zoom:
  caption: ""
  alt: ""
  relative: false
---

The [Docker Radio Display](https://github.com/Mongstaen/Docker-Radio-Display) project has received an update that adds automatic song history tracking to the studio monitor interface.

## What's New

The main addition is song history tracking - the system now maintains a record of the last three songs played and displays the current track alongside the previous song. This provides additional context that was previously unavailable.

### Key Features Added

**Song History Display**
The interface now shows the current song and the previous track, giving operators and visitors better visibility into recent programming.

**Real-time Updates**
Song history updates automatically when tracks change through WebSocket connections, keeping the information current.

**Backward Compatibility**
Existing integrations continue to work without modification - the new features don't break current functionality.

## Technical Implementation

The update includes:

- Server-side memory management for tracking song history
- Enhanced API responses with previous song data
- Updated frontend with new UI elements and styling
- Documentation covering the new API endpoints

The implementation maintains the project's Docker-based architecture while adding these capabilities.

## Benefits

For radio stations, recent song history provides:

- Program continuity for operators
- Better context for studio monitor visitors
- Easier content planning to avoid recent repeats

## Availability

The updated Radio Studio Monitor is available in the [main repository](https://github.com/Mongstaen/Docker-Radio-Display). The Docker setup process remains unchanged - pull the latest image to access the new song history features.

See [Pull Request #7](https://github.com/Mongstaen/Docker-Radio-Display/pull/7) for implementation details.
