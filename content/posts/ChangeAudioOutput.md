---
title: "Change Audio output in mAirlist with a script"
date: 2025-01-23T21:08:17+01:00
lastmod: 2025-01-23T21:08:17+01:00
author: ["Thomas Mongstad"]
keywords: 
- mAirlist
- Script
categories:
- mAirlist
tags:
- mAirlist
summary: "Short script that changes the audio output"
description: "Short script that changes the audio output"
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

You'll find your Audio Devices in your devices.ini file located in the mAirlist folder in C:/Program Files.

From devices.ini (your might be different)
```ini
[Playback]
Player0_0=Encoder
Player0_1=WASAPI:default
Player0_2=WASAPI:{0.0.0.00000000}.{88c47e81-19af-4772-a821-dede8f60ad2d}
```

This script can be called to change the Audio Output from whatever is set in your config, to the encoder. One way only.. 
```pascal
begin
    Instance.GetPlaybackRouting.SetSingleAssignment('Player0_0', 'ENCODER')
end.
```
Or ie. 
```pascal
begin
    Instance.GetPlaybackRouting.SetSingleAssignment('Player0_0', 'WASAPI:{0.0.0.00000000}.{88c47e81-19af-4772-a821-dede8f60ad2d}')
end.
```

I have created one script per required audio output. And calling whenever needed via a event in mAirlist... Whatever works 😅

Could of course also be used via the OnExecuteCommand procedure 
```pascal
procedure OnExecuteCommand(Command: string);
begin
  if Command = 'CHANGEAUDIO' then begin
    Instance.GetPlaybackRouting.SetSingleAssignment('Player0_0', 'ENCODER')
  end;
end;
```

{{ <script src="https://gist.mongst.ad/thomas/aead2876944549358272679cf2bdb244.js"></script> }}