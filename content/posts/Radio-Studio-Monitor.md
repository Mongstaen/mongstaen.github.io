---
title: "Radio Studio Monitor"
date: "2021-10-24"
author: "Thomas Mongstad"
description: "This small app is intended for use on LAN, hence the low - to non existing - security features..."
tags: ["NodeJS","Radio Broadcasting"]
draft: false
---

This small app is intended for use on LAN, hence the low - to non existing - security features. Currently running on a Raspberry Pi in our local radio studio. All services hosted on the Raspberry Pi itself, running alongside mAirlist Radio Automation.

Please find repo on github: https://github.com/Mongstaen/RadioStudioMonitor
### Installation

* Clone this repository
* Create your pusher user and app. https://pusher.com
* Create .env based on the example, update with your pusher details
* `npm install`
* `node index`


Feel free to use and contribute to this small project! This is my first project using JS and Node. And there are some known errors.

* The clock will not show the top center second-bullet. Would like the second-bullets to change state from hidden to showing, then hide again the next minute.
* EOF (end of file) warning, needs to be fixed, counting down and flashing.

![screenshot](https://github.com/Mongstaen/RadioStudioMonitor/blob/main/203078798_933184267461711_5805206543025988616_n.png?raw=true)

#
Buy me a coffee? :) 
https://www.buymeacoffee.com/mongstad

<!-- TODO: update the post. or make new post with updated settings.. -->