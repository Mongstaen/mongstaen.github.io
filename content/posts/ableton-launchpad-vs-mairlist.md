---
title: "Ableton Launchpad vs Mairlist"
date: 2021-10-28
lastmod: 2021-10-28
author: ["Thomas Mongstad"]
keywords: 
- mAirlist
- Ableton Launchpad
- Midi
categories:
- mAirlist
tags:
- mAirlist
summary: "This script makes your Launchpad MIDIcontroller interact with mAirlist.. Inspired by Thomas Kloppholzs' Launchpad Script. 
Changed for our current need. "
description: ""
weight:
slug: ""
draft: false
comments: false
hidemeta: false
disableShare: true
showbreadcrumbs: false
cover:
    image: "" 
    zoom: 
    caption: ""
    alt: ""
    relative: false
---



Inspired by Thomas Kloppholzs' Launchpad Script. 
Changed for our current need. 

Feel free to use. But please credit Mr. Kloppholzs if you do. 
https://github.com/Mongstaen/Launchpad-mAirlist

``` js
if (Data1 = 0) and (Data2 = 127) then
    begin
        ExecuteCommand('CARTWALL 1 CLICK');
    end
```

{{< youtube BHzI3VjI2l8 >}}

``` js
Data1 = ID of button.
Data2 = 127 if button is pressed (max midi value)
ExecuteCommand('YOUR COMMAND') - Executes required command.
```

Please see mAirlist reference here: https://wiki.mairlist.com/reference:remote_control_commands
Also, note the procedures available: https://community.mairlist.com/t/scripting-hilfe-prozeduren/12329

Copy paste of "Background Script Template.mls"
``` js
// Called when script is loaded
procedure OnLoad;
begin
end;

// Calld when script is unloaded
procedure OnUnload;
begin
end;

// Called after mAirList startup
procedure OnStartup;
begin
end;

// Called before mAirList shutdown
procedure OnShutdown;
begin
end;

// Called when mAirList goes ON AIR
procedure OnOnAir;
begin
end;

// Called when mAirList goes OFF AIR
procedure OnOffAir;
begin
end;

// Called when cartwall window becomes visible
procedure OnCartwallShow;
begin
end;

// Called when cartwall window becomes invisible
procedure OnCartwallHide;
begin
end;

// Called when automation is enabled
procedure OnAutomationOn(PlaylistIndex: integer);
begin
end;

// Called when automation is disabled
procedure OnAutomationOff(PlaylistIndex: integer);
begin
end;

// Called when (playlist) player is started
procedure OnPlayerStart(PlaylistIndex: integer; PlayerIndex: integer; Item: IPlaylistItem);
begin
end;

// Called when (playlist) player is stopped
procedure OnPlayerStop(PlaylistIndex: integer; PlayerIndex: integer; Duration: TTimeValue; Item: IPlaylistItem);
begin
end;

// Called when (playlist) player reaches EOF warning point (default: 10s before end)
procedure OnPlayerEOFWarning(PlaylistIndex: integer; PlayerIndex: integer);
begin
end;

// Called when (playlist) player changes its state
procedure OnPlayerStateChange(PlaylistIndex: integer; PlayerIndex: integer; OldState: TPlayerState; NewState: TPlayerState; Item: IPlaylistItem);
begin
end;

// Called when (playlist) player enters PFL
procedure OnPlayerPFLOn(PlaylistIndex: integer; PlayerIndex: integer; PFLCount: integer);
begin
end;

// Called when (playlist) player leaves PFL
procedure OnPlayerPFLOff(PlaylistIndex: integer; PlayerIndex: integer; PFLCount: integer);
begin
end;

// Called when the cartwall switches its on air mode (on air, off air, PFL)
procedure OnCartwallOnAirModeChange(OldMode, NewMode: TCartwallOnAirMode);
begin
end;

// Called when the user switches between pages/tabs in the cartwall.
// OldPage and/or NewPage can be nil, indicating that no tabs were/are open.
procedure OnCartwallActivePageChange(OldPage: ICartwallPageControl; NewPage: ICartwallPageControl);
begin
end;

// Called when the state of a player on the current cartwall page changes
// (or the user switches to another page).
procedure OnCartwallPlayerStateChange(PlayerIndex: integer;
  OldState: TPlayerState; NewState: TPlayerState;
  Item: IAudioCartwallItem; PlaylistItem: IPlaylistItem;
  OnAirMode: TCartwallOnAirMode);
begin
end;

// Called when cart player is started
procedure OnCartwallPlayerStart(PlayerIndex: integer; Item: IAudioCartwallItem; PlaylistItem: IPlaylistItem);
begin
end;

// Called when cart player is stopped
procedure OnCartwallPlayerStop(PlayerIndex: integer; Item: IAudioCartwallItem; PlaylistItem: IPlaylistItem; Duration: TTimeValue);
begin
end;

// Called when cart player reaches EOF warning point
procedure OnCartwallPlayerEOFWarning(PlayerIndex: integer; Item: IAudioCartwallItem; PlaylistItem: IPlaylistItem);
begin
end;

// Called when on-air playback of an item (in any player) begins
procedure OnItemStart(Item: IPlaylistItem; Region: byte; OnAir: boolean; UniqueID: string);
begin
end;

// Called when on-air playback of an item (in any player) ends
procedure OnItemStop(Item: IPlaylistItem; Region: byte; OnAir: boolean; UniqueID: string; Duration: TTimeValue);
begin
end;

// Called when playback passes a cue marker
procedure OnItemCueMarker(Item: IPlaylistItem; MarkerType: TCuePositionType);
begin
end;

// Called when metadata is received from a (relayed) stream
procedure OnItemMetadata(Item: IPlaylistItem; Metadata: string);
begin
end;

// Called when any player, cue editor, mix editor... enters PFL
// PFLCount is the number of active PFL sources
procedure OnPFLOn(Item: IPlaylistItem; PFLCount: integer);
begin
end;

// Called when any player, cue editor, mix editor... leaves PFL
// PFLCount is the number of active PFL sources
procedure OnPFLOff(Item: IPlaylistItem; PFLCount: integer);
begin
end;

// Called when cue editor, mix editor... (but not a player) starts playback
// ExtPFLCount is the number of active such ExtPFL sources
procedure OnExtPFLOn(Item: IPlaylistItem; ExtPFLCount: integer);
begin
end;

// Called when cue editor, mix editor... (but not a player) stops playback
// ExtPFLCount is the number of active such ExtPFL sources
procedure OnExtPFLOff(Item: IPlaylistItem; ExtPFLCount: integer);
begin
end;

// Called when playlist runs empty during automation
procedure OnPlaylistEmpty(PlaylistIndex: integer);
begin
end;

// Called when a remote command is received from any remote control
procedure OnExecuteCommand(Command: string);
begin
end;

// Called when messages are added to the System Log.
// Be careful what you do here, try not to raise exceptions or use
// SystemLog here, or you might end up in an infinite loop.
procedure OnSystemLog(Category: TLogCategory; Message: string);
begin
end;

// Called every x milliseconds
// Start in OnLoad with: EnableTimer(x);
// Stop with: DisableTimer;
procedure OnTimer;
begin
end;

// Called every x milliseconds with the specified ID
// Start in OnLoad with: EnableTimerEx(ID, x);
// Stop with: DisableTimerEx(ID);
procedure OnTimerEx(ID: string);
begin
end;

// Called when RuntimeData (global variables shared among scripts) change.
// Set data with SetRuntimData(key, value);
procedure OnRuntimeDataChange(Key, Value: string);
begin
end;

// Called when data is received from a serial port; the serial port must
// be opened first, either manually, or by adding a dummy "Serial port"
// remote to the config
procedure OnSerialData(Port: string; Data: AnsiString);
begin
end;

// Called when a command is received from an SAS remote
procedure OnSASCommand(Remote: ISASRemote; Command: byte; Data: string);
begin
end;

// Called when an SAS GPI goes ON
procedure OnSASGPIOn(Remote: ISASRemote; GPI: byte);
begin
end;

// Called when an SAS GPI goes OFF
procedure OnSASGPIOff(Remote: ISASRemote; GPI: byte);
begin
end;

// Called when an SAS sources goes PFL ON
procedure OnSASPFLOn(Remote: ISASRemote; SourceName: string);
begin
end;

// Called when an SAS sources goes PFL OFF
procedure OnSASPFLOff(Remote: ISASRemote; SourceName: string);
begin
end;

// Called when a MIDI message is received
procedure OnMidiMessage(Device: integer; Status, Data1, Data2: byte);
begin
end;

// Called when a MIDI sysex is received
procedure OnMidiSysex(Device: integer; Data: string);
begin
end;

// Called when Voice Track Recorder is opened
procedure OnVTOn;
begin
end;

// Called when Voice Track Recorder is closed
procedure OnVTOff;
begin
end;

// Called when a volume slider is moved in Voice Track Recorder
// Volume is in dB. Source is either "GUI" or "REMOTE".
procedure OnVTVolume(Player: string; Volume: single; Source: string);
begin
end;

// Called when an encoder input is turned on or off
procedure OnEncoderInputToggle(Input: TEncoderInput; NewState: boolean);
begin
end;

// Available in DHD module:

{

procedure OnDHDCommand(Remote: IDHDRemote; ID: cardinal; Len: integer; Data0, Data1, Data2, Data3, Data4, Data5, Data6, Data7: byte);
begin
end;

procedure OnDHDFaderOn(Remote: IDHDRemote; FaderNo: integer; State: boolean);
begin
end;

procedure OnDHDFaderPFL(Remote: IDHDRemote; FaderNo: integer; State: boolean);
begin
end;

procedure OnDHDFaderLevel(Remote: IDHDRemote; FaderNo: integer; Level: SmallInt);
begin
end;

}

// Available in REST module:

{

// Called when a request is made to the REST server
procedure OnRESTRequestRaw(Request: TRawRESTRequest; var Response: TRawRESTResponse);
begin
end;

// Called when a JSON request is made to the REST server
procedure OnRESTRequest(Request: TRESTRequest; var Response: IPersistentStorage);
begin
end;

}

begin
end.

```