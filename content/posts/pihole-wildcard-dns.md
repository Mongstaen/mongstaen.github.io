---
title: "Pihole Wildcard DNS"
date: 2025-09-09T07:17:50+02:00
lastmod: 2025-09-09T07:17:50+02:00
author: ["Thomas Mongstad"]
keywords:
  -
categories:
  -
tags:
  -
summary: ""
description: "Pihole supports Wildcards!"
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

Until now I've been adding all my sub-sub domains manually in my home lab in the PiHole GUI..
There must be a better way.. And there is!

1. In your PiHole Instance go to `/etc/dmasq.d/`
2. Create a new file. `02-wildcards.conf`
3. Add this line to the file: `address=/.subdomain.domain.tld/192.168.1.2`
4. Save the file and run the command `service pihole-FTL restart`
