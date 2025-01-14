---
title: "Yamaha MW12CX Faderstart"
date: 2022-02-10
author: ["Thomas Mongstad"]
keywords: 
- 
categories:
- 
tags:
- Mods
- Radio Broadcasting
- Mixer
summary: "Bought a new - used - mixer for my personal radio studio... And made a mess!"
description: "Bought a new - used - mixer for my personal radio studio... And made a mess!"
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



**Pictures will follow**

Bought a new - used - mixer for my personal radio studio. 
Remembering back when I was 18 years old, eager to start working in the local station, 
I had one of these Yamaha MW12CX mixers. it was perfect! Excerpt some missing features.

Now, 12 years later, I came across one of these mixers again. Now with some extra experience and patience, I could finally add the features I needed. 

Entire code available at [Github](https://github.com/Mongstaen/YamahaCircuitPython/blob/main/code.py)

#### Getting started  
How do one start with a project like this? I found this mixer on finn.no (equvialent of craigslist, but for Norway), relatively cheap. Cheap enough that if I failed, or broke the mixer, I'd be fine.. at least financially. (but broken hearted)

**1. What did i want this mixer to do?**  
I wanted to make this mixer work in a broadcasting environment. 
Out of the 8 faders on the mixer, I've added 6 microswitches, and left two faders without switches.. Why? No reason.. But if i had to make one up, it was getting quite tight with the wiring at the end..
![microswitch](https://raw.githubusercontent.com/Mongstaen/mongstad.dev/main/public/images/microswitch1.png?token=GHSAT0AAAAAABPUULSJYRBR6UCPCEV4XNMUYSRI5JA)

For two of the faders, I've programmed the Raspberry Pi Pico to trigger a relay, which is muting the studio monitors.
Not much to say, but one of these for [aliexpress](https://www.aliexpress.com/item/32857386584.html?spm=a2g0o.order_list.0.0.21ef1802OIoa3v) also supported the 3.3V power of the Pico.

![relay](https://ae01.alicdn.com/kf/HTB1L6yKevWG3KVjSZPcq6zkbXXaL/3-3V-2-Channel-Relay-Module-Optocoupler-Isolation-Module-Relay-Control-Board.jpg_Q90.jpg_.webp)
![relay1](images/relay.png)

```pascal
for i in range(len(mic_faders)):
    mic_faders[i].update()
    if mic_faders[i].fell:
        print(mic_opened[i])
        monitor_relay.value = False
    if mic_faders[i].rose:
        print(mic_closed[i])
        monitor_relay.value = True
```

**2. How did I do it?**  
Quite easy. All you need is a few tools, patience, a few days, and a 3D printer will help. 
First you'd open the case.. Trying to figure out where to place the microswithches and where to route the wires. 
I found that on this mixer, the swithches would fit perfectly between the faders, but would need some standoffs in order to avoid other components. 
![switchplacement](https://www.mongstad.dev/images/microswitch1.png)

After placing all the standoffs and attaching the switches, the soldering of wires took place.. 
Also quite straight forward, one common ground between all switches and the Pico. And individual lines from the "hot" end of the switch to the individual pins on the Pico. 

**3. 10/10 would do again?**  
Actually, yes. I'm quite happy with this setup now. :)
The project was actually quite fun, and the mixer is still working properly.  
I'll be honest and say that it's a hot mess of wires inside the mixer :) .. Whatever works, right?

{{< youtube Ja2IeAiC7rs >}}  
{{< youtube aOU86YsR4TU >}}  
Feel free to send me a chat at @mongstad:matrix.org if you have any questions or feedback!  
[Maybe buy me a coffee?](https://www.buymeacoffee.com/mongstad)