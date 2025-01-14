---
title: "Regex Aviation"
date: 2024-12-19T20:55:28+01:00
author: ["Thomas Mongstad"]
keywords: 
- Aviation
- Regex
categories:
- Aviation
tags:
- Aviation
- Regex
description: "How to match a movement message with regex?"
summary: "How to match a movement message with regex?"
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




## Why
Thought I would just share from my old job at the airport. I love the fact that airlines and aviation in general still relies on telex-messages to distribute information to relevant parties. When I first started working in aviation we wrote these manually on each flight. No auto-generated from any systems.. Amazing. All black terminal with bright green letters.

I started building a system in PHP trying to categorize these SITA / IATA messages. With no experience at all, at the time, the project stopped rather quickly. Later I retried and actually built a webapp that was in use while I was working there. This was before I knew RegEx. I wish I did..

[Link to Regex 101](https://regex101.com/r/PMQxYA/1)

IATA standard MVT-DEP message. There are multiple variations of MVT messages, and multiple other message types. Maybe.. one day I will share.

Tried to obscure the message to avoid sharing airline and passenger info. This message is from 2018, should be a-ok.
```
MVT
xx1203/07.HELLO.AMS
AD1402/1413 EA1524 SVG
PX???
SI MAP1405 
```
Regex to match almost all the groups. After line 3 in the message, i would like to match all the way to the end in one group. The last bits are "Supplementary Information", no spesific information required. If no info, should state "SI NIL"

Regex phrase:
```
/^([A-Z]{3})\n([A-Z0-9]{3,})\/([0-9]{2})\.([A-Z0-9]{5,}).([A-Z]{3})\n([A-Z]{2})([0-9]{4,6})\/([0-9]{4,6}) ([A-Z]{2}[0-9]{4}) ([A-Z]{3})\n(.{0,})\n(.{0,})$/
```
Results in these groups
```json
[
  [
    {
      "content": "MVT\nKL1203/07.PHBGF.AMS\nAD1402/1413 EA1524 SVG\nPX108\nSI MAP1405",
      "isParticipating": true,
      "groupNum": 0,
      "startPos": 0,
      "endPos": 63
    },
    {
      "content": "MVT",
      "isParticipating": true,
      "groupNum": 1,
      "groupName": "MSGTYPE",
      "startPos": 0,
      "endPos": 3
    },
    {
      "content": "xx1203",
      "isParticipating": true,
      "groupNum": 2,
      "groupName": "FLIGHTNO",
      "startPos": 4,
      "endPos": 10
    },
    {
      "content": "07",
      "isParticipating": true,
      "groupNum": 3,
      "groupName": "DATE",
      "startPos": 11,
      "endPos": 13
    },
    {
      "content": "HELLO",
      "isParticipating": true,
      "groupNum": 4,
      "groupName": "ACREG",
      "startPos": 14,
      "endPos": 19
    },
    {
      "content": "AMS",
      "isParticipating": true,
      "groupNum": 5,
      "groupName": "ORIGIN",
      "startPos": 20,
      "endPos": 23
    },
    {
      "content": "AD",
      "isParticipating": true,
      "groupNum": 6,
      "groupName": "MVTTYPE",
      "startPos": 24,
      "endPos": 26
    },
    {
      "content": "1402",
      "isParticipating": true,
      "groupNum": 7,
      "groupName": "PUSH",
      "startPos": 26,
      "endPos": 30
    },
    {
      "content": "1413",
      "isParticipating": true,
      "groupNum": 8,
      "groupName": "TAKEOFF",
      "startPos": 31,
      "endPos": 35
    },
    {
      "content": "EA1524",
      "isParticipating": true,
      "groupNum": 9,
      "groupName": "ETA",
      "startPos": 36,
      "endPos": 42
    },
    {
      "content": "SVG",
      "isParticipating": true,
      "groupNum": 10,
      "groupName": "DESTINATION",
      "startPos": 43,
      "endPos": 46
    },
    {
      "content": "PX???",
      "isParticipating": true,
      "groupNum": 11,
      "groupName": "SI1",
      "startPos": 47,
      "endPos": 52
    },
    {
      "content": "SI MAP1405",
      "isParticipating": true,
      "groupNum": 12,
      "groupName": "SI2",
      "startPos": 53,
      "endPos": 63
    }
  ]
]
```
