---
title: "Open Browser from mAirlist"
date: "2023-10-01"
author: "Thomas Mongstad"
description: "Maybe you need to open a spesific web-page at a spesific time?"
tags: ["mAirlist","scripting"]
draft: false
---

1. Set your desired URL in the variables. 
2. Find path to your browser. 
3. Add this file as script to start or end of file, cartwall, button or whatever in mAirlist
Voilá, you are opening your desired web page directly from mArilist in your preferred browser.

```
const
URL = 'https://www.yr.no/nb/v%C3%A6rvarsel/timetabell/1-72837/Norge/Oslo/Oslo/Oslo?i=0';
BROWSER = 'C:\Program Files\Google\Chrome\Application\chrome.exe';

begin
    ShellExecute(BROWSER, URL);
end.
```
<!-- TODO: create gif showing how this works.. -->

