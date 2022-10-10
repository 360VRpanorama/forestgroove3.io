(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
  "this.Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
  "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8"
 ],
 "start": "this.playAudioList([this.audio_3474E1DB_05BF_06CA_4181_847828A6CE51]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D], 'gyroscopeAvailable'); this.syncPlaylists([this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "buttonToggleFullscreen": "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "scripts": {
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "existsKey": function(key){  return key in window; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "registerKey": function(key, value){  window[key] = value; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getKey": function(key){  return window[key]; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "unregisterKey": function(key){  delete window[key]; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); }
 },
 "minHeight": 20,
 "downloadEnabled": false,
 "paddingRight": 0,
 "paddingLeft": 0,
 "verticalAlign": "top",
 "minWidth": 20,
 "borderRadius": 0,
 "buttonToggleMute": "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "definitions": [{
 "audio": {
  "mp3Url": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_3474E1DB_05BF_06CA_4181_847828A6CE51.ogg"
 },
 "autoplay": true,
 "class": "MediaAudio",
 "id": "audio_3474E1DB_05BF_06CA_4181_847828A6CE51",
 "data": {
  "label": "Romantic"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0.53,
  "pitch": 0.93,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Kids_Hi res",
 "id": "photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB",
 "thumbnailUrl": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB_t.jpg",
 "width": 4000,
 "duration": 5000,
 "image": {
  "levels": [
   {
    "url": "media/photo_765DDD36_7A52_D51C_41D4_71F91FECEBAB.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2500
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AB0D246A_BCA1_537E_41B0_53F98FB1EBCE",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "hfov": 360,
 "label": "Intro",
 "id": "panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855",
 "thumbnailUrl": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_D2E30B42_C2EE_FCC0_41AA_DA8D2A8C2EA0"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Parents Bedroom_Hi res",
 "id": "photo_765FF95D_7A52_BD0C_41D4_3173C32E180D",
 "thumbnailUrl": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D_t.jpg",
 "width": 4000,
 "duration": 5000,
 "image": {
  "levels": [
   {
    "url": "media/photo_765FF95D_7A52_BD0C_41D4_3173C32E180D.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2250
},
{
 "id": "MainViewerVideoPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "class": "VideoPlayer"
},
{
 "items": [
  {
   "media": "this.panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855",
   "camera": "this.panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60",
   "camera": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10",
   "camera": "this.panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D",
   "camera": "this.panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C",
   "camera": "this.panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87",
   "camera": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5",
   "camera": "this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6",
   "camera": "this.panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A",
   "camera": "this.panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF",
   "camera": "this.panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D",
   "camera": "this.panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231",
   "camera": "this.panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7",
   "camera": "this.panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C",
   "camera": "this.panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932",
   "camera": "this.panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC",
   "camera": "this.panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59",
   "camera": "this.panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C",
   "camera": "this.panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C",
   "camera": "this.panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20",
   "camera": "this.panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D",
   "camera": "this.panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C65283F4_D379_0608_41DD_FE4F690D61DD",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_camera",
 "automaticZoomSpeed": 10
},
{
 "audio": {
  "mp3Url": "media/audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0",
 "data": {
  "label": "basketball"
 }
},
{
 "hfovMin": "135%",
 "label": "Retail Edge",
 "id": "panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D",
 "thumbnailUrl": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_A4F66A3A_BCA1_36DE_416F_6948A89C6188"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AAD80D97_BCAF_2DD6_41E0_DF2A2650F1C8"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_A4943288_BCA1_D7BA_41C7_D847D91A2BD8",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_camera",
 "automaticZoomSpeed": 10
},
{
 "audio": "this.audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6E85303_D30B_0609_41E4_E6A4F1E07FDF",
 "data": {
  "label": "Children"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C09492BD_D30B_0679_41E3_2366911C5FDC",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AB5A1EE2_BCA1_2F6E_41D8_C742575C26D9",
 "data": {
  "label": "Crowd"
 }
},
{
 "items": [
  {
   "media": "this.panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855",
   "camera": "this.panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60",
   "camera": "this.panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10",
   "camera": "this.panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D",
   "camera": "this.panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C",
   "camera": "this.panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87",
   "camera": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5",
   "camera": "this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6",
   "camera": "this.panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A",
   "camera": "this.panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF",
   "camera": "this.panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D",
   "camera": "this.panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231",
   "camera": "this.panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7",
   "camera": "this.panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C",
   "camera": "this.panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932",
   "camera": "this.panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC",
   "camera": "this.panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59",
   "camera": "this.panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C",
   "camera": "this.panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C",
   "camera": "this.panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20",
   "camera": "this.panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D",
   "camera": "this.panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist, 20, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "class": "PlayList"
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CA386D38_D319_7963_41C9_064456251874",
 "data": {
  "label": "Crowd"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AB874BDA_BCA7_D55E_41DB_252466E16617",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "Video",
 "label": "MLP",
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/video_DACA8ADC_D4AC_D390_41C9_8C70AE4C1248_t.jpg",
 "width": 3000,
 "loop": false,
 "id": "video_DACA8ADC_D4AC_D390_41C9_8C70AE4C1248",
 "height": 1500,
 "video": {
  "width": 1358,
  "class": "VideoResource",
  "height": 680,
  "mp4Url": "media/video_DACA8ADC_D4AC_D390_41C9_8C70AE4C1248.mp4"
 }
},
{
 "hfovMin": "135%",
 "label": "Bounce Land ",
 "id": "panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C",
 "thumbnailUrl": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AB0C9E9D_BCA1_2FDA_41E1_048A39A5643C",
  "this.audio_A4943288_BCA1_D7BA_41C7_D847D91A2BD8"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A8561BBE_BCA0_F5D6_41D0_91DC91126B56"
 ],
 "partial": false
},
{
 "class": "Photo",
 "label": "Master Bedroom _Hi res",
 "id": "photo_7672A840_7A52_5B75_41D6_811C88787749",
 "thumbnailUrl": "media/photo_7672A840_7A52_5B75_41D6_811C88787749_t.jpg",
 "width": 4000,
 "duration": 5000,
 "image": {
  "levels": [
   {
    "url": "media/photo_7672A840_7A52_5B75_41D6_811C88787749.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2500
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_A4F66A3A_BCA1_36DE_416F_6948A89C6188",
 "data": {
  "label": "Crowd"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_ABAA2F93_BCA0_EDAE_41E6_0CC17ECAF4DC",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_AB0D7E9D_BCA1_2FDA_41C8_D2463C9FC332",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C",
 "data": {
  "label": "KidsBouncy"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -171.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_D4F99743_C2EF_B4C7_41B9_0DA25C4129BA",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "label": "Living _Hi res 2",
 "id": "photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE",
 "thumbnailUrl": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE_t.jpg",
 "width": 4000,
 "duration": 5000,
 "image": {
  "levels": [
   {
    "url": "media/photo_769C2E67_7A53_D73C_41AF_9CA58A04F3AE.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 2250
},
{
 "hfovMin": "135%",
 "label": "Amphitheatre Closeup",
 "id": "panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A",
 "thumbnailUrl": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C872A4E6_D33B_08EF_41E0_E5F7052D2390"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B0C4E9D8_BCA0_F55A_41D3_849D76070BD7"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "label": "Children's Play Area",
 "id": "panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10",
 "thumbnailUrl": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C6777395_D309_0609_41DA_BA3F712D96C1",
  "this.audio_C6E85303_D30B_0609_41E4_E6A4F1E07FDF"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B12A37C3_BCA1_3DAD_41D0_A98AF5795CB9"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Jungle Gym Closeup",
 "id": "panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59",
 "thumbnailUrl": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AB823312_BCA0_F6AE_41E6_5C8C95905449"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A82E71D1_BCA3_35AA_41DC_2D849FE3DB49"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Multipurpose Court Option",
 "id": "panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C",
 "thumbnailUrl": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AA136CD9_BCA1_535A_41DC_20C614B5AAA0",
  "this.audio_AB874BDA_BCA7_D55E_41DB_252466E16617"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A86BBEC3_BCA1_6FAE_41E0_DD4E054F3E8E"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Swimming pool",
 "id": "panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D",
 "thumbnailUrl": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C6667E68_D379_FE07_41E6_E0F496B95754"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B19312FA_BCA1_F75E_41D3_EB2ABA2A1BDA"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "label": "Living Maze",
 "id": "panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20",
 "thumbnailUrl": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AB0D246A_BCA1_537E_41B0_53F98FB1EBCE"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A928702F_BCA1_32F6_41E7_554BED0DB02F"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Bounce Land Closeup",
 "id": "panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C",
 "thumbnailUrl": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B1D04621_BCA1_5EEA_41E1_CBBFC8E3B16B"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C7DE200B_D309_0218_41E3_0FD63E9F7759",
 "data": {
  "label": "Jungle"
 }
},
{
 "hfovMin": "135%",
 "label": "Ampthitheatre",
 "id": "panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6",
 "thumbnailUrl": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AB5A1EE2_BCA1_2F6E_41D8_C742575C26D9"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AD36D1F9_BCE1_F55A_41DB_84A89EF15018"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Tree House",
 "id": "panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60",
 "thumbnailUrl": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C65283F4_D379_0608_41DD_FE4F690D61DD",
  "this.audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B0645920_BCA3_72EA_41C8_A16B31177811"
 ],
 "partial": false
},
{
 "audio": {
  "mp3Url": "media/audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E.mp3",
  "class": "AudioResource",
  "oggUrl": "media/audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E.ogg"
 },
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E",
 "data": {
  "label": "party"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AA5C2AF9_BCA3_D75A_41D3_DBFFA25BE82D",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6667E68_D379_FE07_41E6_E0F496B95754",
 "data": {
  "label": "Pool"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_camera",
 "automaticZoomSpeed": 10
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 27.01,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_D4EE9762_C2EF_B4C1_41E0_1E441D53EB8D",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "135%",
 "label": "Natural Trail Concrete",
 "id": "panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5",
 "thumbnailUrl": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AA5C2AF9_BCA3_D75A_41D3_DBFFA25BE82D"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87",
   "yaw": -152.99,
   "backwardYaw": 8.29,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_ADF6774A_BCE1_3EBE_41D0_0FDEBEEF4684"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_AB0D7E9D_BCA1_2FDA_41C8_D2463C9FC332",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AB0C9E9D_BCA1_2FDA_41E1_048A39A5643C",
 "data": {
  "label": "KidsBouncy"
 }
},
{
 "class": "Photo",
 "label": "Kitchen_Hi res",
 "id": "photo_767255C6_7A52_557C_41DD_51216B6F3598",
 "thumbnailUrl": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598_t.jpg",
 "width": 4000,
 "duration": 5000,
 "image": {
  "levels": [
   {
    "url": "media/photo_767255C6_7A52_557C_41DD_51216B6F3598.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 3334
},
{
 "loop": true,
 "audio": "this.audioresource_AA137CD9_BCA1_535A_41DF_B854C8FBFA6C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AA136CD9_BCA1_535A_41DC_20C614B5AAA0",
 "data": {
  "label": "tennis"
 }
},
{
 "hfovMin": "135%",
 "label": "Basketball court ",
 "id": "panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231",
 "thumbnailUrl": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_CA545BBC_D307_1962_41B2_7F5747C0C9B0"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B1EED8E2_BCA1_336E_41E3_D8659FBE3264"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Party Lawn",
 "id": "panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D",
 "thumbnailUrl": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_CF5336EC_D339_08E3_41B3_BBCE8323C51E"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B1ED7CE9_BCA1_337A_41D1_42CB0F88E3A4"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C49CD85B_D31B_0726_41B7_2DAF623B283E",
 "data": {
  "label": "Jungle"
 }
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AA58DD86_BCA3_2DB6_41E6_35CB65228EAE",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_AB823312_BCA0_F6AE_41E6_5C8C95905449",
 "data": {
  "label": "Jungle"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D",
 "data": {
  "label": "Children"
 }
},
{
 "hfovMin": "135%",
 "label": "Fruit tree orchard",
 "id": "panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF",
 "thumbnailUrl": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C7DE200B_D309_0218_41E3_0FD63E9F7759"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B116E1FA_BCA3_555E_41CE_F28CE698C14E"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Kids pool ",
 "id": "panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C",
 "thumbnailUrl": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C6561C7D_D379_02F9_41E3_8F916F23D069"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B181CD2F_BCA1_52F6_41E3_2AD818B24DCC"
 ],
 "partial": false
},
{
 "hfovMin": "135%",
 "label": "Multipurpose Court",
 "id": "panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7",
 "thumbnailUrl": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231",
  "this.audio_ABAA2F93_BCA0_EDAE_41E6_0CC17ECAF4DC"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A812D3C9_BCAF_35BA_41CC_83A725B3392D"
 ],
 "partial": false
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.video_DACA8ADC_D4AC_D390_41C9_8C70AE4C1248",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_D71C9712_C2EF_B441_41D6_C7F16959A6A7, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_D71C9712_C2EF_B441_41D6_C7F16959A6A7, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "playList_D71C9712_C2EF_B441_41D6_C7F16959A6A7",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_camera",
 "automaticZoomSpeed": 10
},
{
 "loop": true,
 "audio": "this.audioresource_AA137CD9_BCA1_535A_41DF_B854C8FBFA6C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231",
 "data": {
  "label": "tennis"
 }
},
{
 "hfovMin": "135%",
 "label": "Natural Trail",
 "id": "panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87",
 "thumbnailUrl": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_AA58DD86_BCA3_2DB6_41E6_35CB65228EAE"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5",
   "yaw": 8.29,
   "backwardYaw": -152.99,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_AC6382CF_BCE3_77B6_41CF_0944179203F7",
  "this.overlay_AD0A7E4E_BCE3_EEB6_41B8_0D9EE6D7C546"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6777395_D309_0609_41DA_BA3F712D96C1",
 "data": {
  "label": "Jungle"
 }
},
{
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "gyroscopeEnabled": true,
 "touchControlMode": "drag_rotation",
 "buttonToggleGyroscope": "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonCardboardView": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true
},
{
 "hfovMin": "135%",
 "label": "Jungle Gym",
 "id": "panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC",
 "thumbnailUrl": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C09492BD_D30B_0679_41E3_2366911C5FDC"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A9647AE1_BCA1_576A_41E2_C8F49BD97ADB"
 ],
 "partial": false
},
{
 "loop": true,
 "audio": "this.audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C6561C7D_D379_02F9_41E3_8F916F23D069",
 "data": {
  "label": "Pool"
 }
},
{
 "loop": true,
 "audio": "this.audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "autoplay": true,
 "class": "PanoramaAudio",
 "id": "audio_C872A4E6_D33B_08EF_41E0_E5F7052D2390",
 "data": {
  "label": "Crowd"
 }
},
{
 "hfovMin": "135%",
 "label": "Senior Citizen",
 "id": "panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932",
 "thumbnailUrl": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_t.jpg",
 "hfov": 360,
 "audios": [
  "this.audio_C49CD85B_D31B_0726_41B7_2DAF623B283E",
  "this.audio_CA386D38_D319_7963_41C9_064456251874"
 ],
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_B1C8375D_BCAF_3D5A_41E7_55E1B9485D48"
 ],
 "partial": false
},
{
 "toolTipFontSize": "1.11vmin",
 "toolTipOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "minWidth": 100,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "shadow": false,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "borderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "class": "ViewerArea",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0DC4CF_5772_E32E_41CD_F6650DCF6BF2",
 "horizontalAlign": "left",
 "width": 115.05,
 "right": "0%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "height": 641,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
  "this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "id": "Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5",
 "left": "0%",
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_46D29939_57B6_2572_4181_A29735EA1C2F"
 ],
 "backgroundImageUrl": "skin/Container_46D2A939_57B6_2572_41BD_BAA93AA47AA5.png",
 "right": "0%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "height": "12.832%",
 "backgroundOpacity": 0.6,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- MENU"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "layout": "absolute"
},
{
 "fontFamily": "Arial",
 "data": {
  "name": "DropDown1204"
 },
 "id": "DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8",
 "left": 30,
 "popUpShadow": false,
 "width": "11.212%",
 "borderSize": 0,
 "playList": "this.DropDown_26FC0D4A_0587_7FCA_413E_0CC6043A37F8_playlist",
 "fontColor": "#333333",
 "arrowColor": "#8A8A8A",
 "popUpFontColor": "#000000",
 "minHeight": 20,
 "popUpShadowBlurRadius": 6,
 "popUpBorderRadius": 0,
 "top": 40,
 "popUpShadowOpacity": 0,
 "paddingRight": 5,
 "paddingLeft": 5,
 "backgroundOpacity": 0.72,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 200,
 "borderRadius": 4,
 "fontSize": 14,
 "rollOverPopUpBackgroundColor": "#CCCCCC",
 "arrowBeforeLabel": false,
 "popUpShadowSpread": 1,
 "height": "3.618%",
 "paddingTop": 0,
 "popUpShadowColor": "#000000",
 "paddingBottom": 0,
 "selectedPopUpBackgroundColor": "#33CCFF",
 "propagateClick": false,
 "gap": 0,
 "class": "DropDown",
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "textDecoration": "none",
 "popUpGap": 0,
 "shadow": false,
 "fontWeight": "normal",
 "popUpBackgroundColor": "#FFFFFF",
 "popUpBackgroundOpacity": 0.72,
 "backgroundColorDirection": "vertical"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "toggle",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "toggle",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton MUTE"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "mp3Url": "media/audio_C09492BD_D30B_0679_41E3_2366911C5FDC.mp3",
 "class": "AudioResource",
 "id": "audioresource_C7DFD00B_D309_0218_41C4_77F71F7F97A9",
 "oggUrl": "media/audio_C09492BD_D30B_0679_41E3_2366911C5FDC.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "Click Here To Enter",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 5.14,
   "yaw": -0.76,
   "image": {
    "levels": [
     {
      "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.14,
   "image": "this.AnimatedImageResource_D63A41FA_C2FE_AFC1_41E1_3E1CA470B866",
   "pitch": -31.13,
   "yaw": -0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_D2E30B42_C2EE_FCC0_41AA_DA8D2A8C2EA0",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "toolTip": "Tree House",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 83.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 3.48,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_A4D7913B_BC9F_F2DE_41E2_128DB7DAA67E",
   "pitch": 3.48,
   "yaw": 83.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AAD80D97_BCAF_2DD6_41E0_DF2A2650F1C8",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D.mp3",
 "class": "AudioResource",
 "id": "audioresource_C6E87303_D30B_0609_41C2_D93556F6CB1A",
 "oggUrl": "media/audio_C61B79A8_D309_0218_41E2_8680D3E8EB7D.ogg"
},
{
 "mp3Url": "media/audio_CA386D38_D319_7963_41C9_064456251874.mp3",
 "class": "AudioResource",
 "id": "audioresource_C4B7C8B3_D319_0765_41E1_3F689F7EDF9C",
 "oggUrl": "media/audio_CA386D38_D319_7963_41C9_064456251874.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "toolTip": "Bounce Land",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -2.37,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -1.8,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4D9513A_BC9F_F2DE_41E1_E099D4F9411C",
   "pitch": -1.8,
   "yaw": -2.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A8561BBE_BCA0_F5D6_41D0_91DC91126B56",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C.mp3",
 "class": "AudioResource",
 "id": "audioresource_AB0D7E9D_BCA1_2FDA_41C8_D2463C9FC332",
 "oggUrl": "media/audio_C9D12C2A_D309_1F67_41B3_203EFD467A1C.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "toolTip": "Fruit Tree Orchard",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 64.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.72,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DB1135_BC9F_F2EA_41D8_02B0D3DE59D0",
   "pitch": 1.72,
   "yaw": 64.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B0C4E9D8_BCA0_F55A_41D3_849D76070BD7",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "toolTip": "Swiming Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 133.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DDA133_BC9F_F2EE_41E0_A34D8F948BC6",
   "pitch": 2.22,
   "yaw": 133.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B12A37C3_BCA1_3DAD_41D0_A98AF5795CB9",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "toolTip": "Bounce Land",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.78,
   "yaw": 93.09,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_A4D9C13A_BC9F_F2DE_41E0_10E3AA44BE32",
   "pitch": -5.82,
   "yaw": 93.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A82E71D1_BCA3_35AA_41DC_2D849FE3DB49",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Senior's Corner",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -98.21,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4D9C138_BC9F_F2DA_41D8_D3D7BC29465D",
   "pitch": -0.33,
   "yaw": -98.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A86BBEC3_BCA1_6FAE_41E0_DD4E054F3E8E",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Kids Pool",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -86.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DD1133_BC9F_F2EE_41DF_B9E117509CFA",
   "pitch": -0.04,
   "yaw": -86.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B19312FA_BCA1_F75E_41D3_EB2ABA2A1BDA",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "toolTip": "Retail",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.75,
   "yaw": 66.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_A4D8E13B_BC9F_F2DE_41E4_60B693CB4F51",
   "pitch": 8.55,
   "yaw": 66.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A928702F_BCA1_32F6_41E7_554BED0DB02F",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "toolTip": "Living Maze",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -4.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.3,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4D8B13B_BC9F_F2DE_41D6_5A7459A9347B",
   "pitch": -2.3,
   "yaw": -4.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B1D04621_BCA1_5EEA_41E1_CBBFC8E3B16B",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "toolTip": "Amphitheatre",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.75,
   "yaw": 8.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_A4DB8135_BC9F_F2EA_41CC_C83F06015EF1",
   "pitch": -8.33,
   "yaw": 8.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AD36D1F9_BCE1_F55A_41DB_84A89EF15018",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "toolTip": "Children's Play Area",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -45.18,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.16,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DE6132_BC9F_F2EE_41AE_A7D77B7CD624",
   "pitch": -2.16,
   "yaw": -45.18,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B0645920_BCA3_72EA_41C8_A16B31177811",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_C6667E68_D379_FE07_41E6_E0F496B95754.mp3",
 "class": "AudioResource",
 "id": "audioresource_C6563C7D_D379_02F9_41C8_9CB3BDC478C4",
 "oggUrl": "media/audio_C6667E68_D379_FE07_41E6_E0F496B95754.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87, this.camera_D4F99743_C2EF_B4C7_41B9_0DA25C4129BA); this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Natural Trail",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.75,
   "yaw": -152.99,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_A4DC4135_BC9F_F2EA_41D2_BBAECDC046D6",
   "pitch": -8.33,
   "yaw": -152.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_ADF6774A_BCE1_3EBE_41D0_0FDEBEEF4684",
 "enabledInCardboard": true
},
{
 "mp3Url": "media/audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231.mp3",
 "class": "AudioResource",
 "id": "audioresource_AA137CD9_BCA1_535A_41DF_B854C8FBFA6C",
 "oggUrl": "media/audio_CBF6FC4A_D309_1F27_41D4_DFFBC1286231.ogg"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "toolTip": "Multi-purpose Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 139.82,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A1F0F8A0_BD60_D3EA_41E2_D343FA4F4BB7",
   "pitch": 0.97,
   "yaw": 139.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B1EED8E2_BCA1_336E_41E3_D8659FBE3264",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "toolTip": "Basketball Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 168.46,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.04,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DAD136_BC9F_F2D6_41CA_E4D920BD66F7",
   "pitch": -0.04,
   "yaw": 168.46,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B1ED7CE9_BCA1_337A_41D1_42CB0F88E3A4",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "toolTip": "Party Lawn",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 17.72,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DB5136_BC9F_F2D6_41C8_60FFDD8B72AC",
   "pitch": -0.79,
   "yaw": 17.72,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B116E1FA_BCA3_555E_41CE_F28CE698C14E",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "toolTip": "Natural Trail",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -105.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4DD4133_BC9F_F2EE_41C5_8F6DA42E4C11",
   "pitch": -0.29,
   "yaw": -105.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B181CD2F_BCA1_52F6_41E3_2AD818B24DCC",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "toolTip": "Multi-purpose Court",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": -174.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_A4DA7137_BC9F_F2D6_41E2_E8826577A05B",
   "pitch": -3.59,
   "yaw": -174.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A812D3C9_BCAF_35BA_41CC_83A725B3392D",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5, this.camera_D4EE9762_C2EF_B4C1_41E0_1E441D53EB8D); this.mainPlayList.set('selectedIndex', 6)",
   "toolTip": "Natural Trail",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.75,
   "yaw": 8.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.33,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_A4DCA134_BC9F_F2EA_41B9_FF31F2F4D244",
   "pitch": -8.33,
   "yaw": 8.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AC6382CF_BCE3_77B6_41CF_0944179203F7",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "toolTip": "Amphitheatre",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 91.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A3AF65E8_BDA7_7D7A_4188_C44B2707110E",
   "pitch": -2.55,
   "yaw": 91.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_AD0A7E4E_BCE3_EEB6_41B8_0D9EE6D7C546",
 "enabledInCardboard": true
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "toggle",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton HS "
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "toggle",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton GYRO"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "push",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44_rollover.png",
 "iconURL": "skin/IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 49,
 "id": "IconButton_46D29939_57B6_2572_4181_A29735EA1C2F",
 "maxHeight": 37,
 "width": 49,
 "right": 30,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "push",
 "height": 37,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": 8,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F_rollover.png",
 "iconURL": "skin/IconButton_46D29939_57B6_2572_4181_A29735EA1C2F.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton VR"
 },
 "visible": false,
 "shadow": false,
 "cursor": "hand"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "toolTip": "Jungle Gym",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 144.59,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.55,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_A4D8F139_BC9F_F2DA_41D7_5D24273DF943",
   "pitch": -2.55,
   "yaw": 144.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A9647AE1_BCA1_576A_41E2_C8F49BD97ADB",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "toolTip": "Jungle Gym",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 144.34,
   "image": {
    "levels": [
     {
      "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -3.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_A4D93138_BC9F_F2DA_41B4_8751D590F023",
   "pitch": -3.05,
   "yaw": 144.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B1C8375D_BCAF_3D5A_41E7_55E1B9485D48",
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0D64CF_5772_E32E_41D0_3F190463451B",
 "width": 110,
 "right": "0%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "minHeight": 1,
 "top": "0%",
 "paddingRight": 0,
 "paddingLeft": 0,
 "height": 110,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "children": [
  "this.IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3"
 ],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 10,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "horizontalAlign": "center",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8",
 "children": [
  "this.IconButton_5A0D54CF_5772_E32E_41CC_563BC5A99C44",
  "this.IconButton_5A0D24CF_5772_E32E_41D2_D193D2C1028D",
  "this.IconButton_5A0D34CF_5772_E32E_41C5_75E2393767BE",
  "this.IconButton_5A0D04CF_5772_E32E_41BB_81FF7DA1667F",
  "this.IconButton_5A0D14CF_5772_E32E_4158_F5607133AB8C",
  "this.IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
  "this.IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419"
 ],
 "right": "0%",
 "width": "91.304%",
 "contentOpaque": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "height": "85.959%",
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "bottom": "0%",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "gap": 3,
 "class": "Container",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "visible": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "scroll",
 "horizontalAlign": "center",
 "layout": "vertical"
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_D63A41FA_C2FE_AFC1_41E1_3E1CA470B866",
 "levels": [
  {
   "url": "media/panorama_CE1BF027_C2E9_6C4F_41E5_2E5FC5672855_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D7913B_BC9F_F2DE_41E2_128DB7DAA67E",
 "levels": [
  {
   "url": "media/panorama_B2214304_BCBF_36AA_41E6_D71E1B14924D_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D9513A_BC9F_F2DE_41E1_E099D4F9411C",
 "levels": [
  {
   "url": "media/panorama_B2C95AAF_BCA1_37F6_41DC_D0D270A4581C_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DB1135_BC9F_F2EA_41D8_02B0D3DE59D0",
 "levels": [
  {
   "url": "media/panorama_B0C4F9D8_BCA0_F55A_41E5_923F587F108A_1_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DDA133_BC9F_F2EE_41E0_A34D8F948BC6",
 "levels": [
  {
   "url": "media/panorama_B125C7C3_BCA1_3DAD_41D3_80EE98CF6D10_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D9C13A_BC9F_F2DE_41E0_10E3AA44BE32",
 "levels": [
  {
   "url": "media/panorama_B238A7AA_BCBF_3DFE_41D5_80A5C138FF59_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D9C138_BC9F_F2DA_41D8_D3D7BC29465D",
 "levels": [
  {
   "url": "media/panorama_B230F05F_BCBF_5356_41E4_0FFDB9F7E49C_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DD1133_BC9F_F2EE_41DF_B9E117509CFA",
 "levels": [
  {
   "url": "media/panorama_B193D2F5_BCA1_F76A_41E2_A80A109B209D_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D8E13B_BC9F_F2DE_41E4_60B693CB4F51",
 "levels": [
  {
   "url": "media/panorama_B23A0C5B_BCBF_535E_41E0_131D9EBA2F20_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D8B13B_BC9F_F2DE_41D6_5A7459A9347B",
 "levels": [
  {
   "url": "media/panorama_B1D0B621_BCA1_5EEA_41C0_854FAF84502C_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DB8135_BC9F_F2EA_41CC_C83F06015EF1",
 "levels": [
  {
   "url": "media/panorama_B2D1C6F2_BCA1_5F6E_41E1_890B5EF2EAE6_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DE6132_BC9F_F2EE_41AE_A7D77B7CD624",
 "levels": [
  {
   "url": "media/panorama_B065A91F_BCA3_72D6_41D5_E7B841E00C60_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DC4135_BC9F_F2EA_41D2_BBAECDC046D6",
 "levels": [
  {
   "url": "media/panorama_B232DF84_BCA0_EDAA_41DE_3AC8998352D5_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A1F0F8A0_BD60_D3EA_41E2_D343FA4F4BB7",
 "levels": [
  {
   "url": "media/panorama_B1EEE8E2_BCA1_336E_41D8_DD3EB5C79231_0_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DAD136_BC9F_F2D6_41CA_E4D920BD66F7",
 "levels": [
  {
   "url": "media/panorama_B1EC8CE9_BCA1_337A_41E4_33F80CCA7F8D_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DB5136_BC9F_F2D6_41C8_60FFDD8B72AC",
 "levels": [
  {
   "url": "media/panorama_B11701FA_BCA3_555E_41B8_FD758D3470AF_1_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DD4133_BC9F_F2EE_41C5_8F6DA42E4C11",
 "levels": [
  {
   "url": "media/panorama_B1802D2F_BCA1_52F6_41E2_310818A5874C_1_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DA7137_BC9F_F2D6_41E2_E8826577A05B",
 "levels": [
  {
   "url": "media/panorama_B1218997_BCA1_55D6_41DB_EA52E611B5A7_1_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4DCA134_BC9F_F2EA_41B9_FF31F2F4D244",
 "levels": [
  {
   "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A3AF65E8_BDA7_7D7A_4188_C44B2707110E",
 "levels": [
  {
   "url": "media/panorama_B239336D_BCA0_D57A_41D2_ABB5E2E7CA87_0_HS_1_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D8F139_BC9F_F2DA_41D7_5D24273DF943",
 "levels": [
  {
   "url": "media/panorama_B1F81D1B_BCA1_52DE_41D4_F8249663CCCC_1_HS_2_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_A4D93138_BC9F_F2DA_41B4_8751D590F023",
 "levels": [
  {
   "url": "media/panorama_B1C8475C_BCAF_3D5A_41E0_6A720D53A932_1_HS_0_0.png",
   "width": 1000,
   "height": 1500,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "horizontalAlign": "center",
 "maxWidth": 60,
 "id": "IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3",
 "maxHeight": 60,
 "width": 60,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed.png",
 "verticalAlign": "middle",
 "pressedRollOverIconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3_pressed_rollover.png",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "toggle",
 "height": 60,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "click": "if(!this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8.get('visible')){ this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_5A0D44CF_5772_E32E_41D0_19B23A64B7F8, false, 0, null, null, false) }",
 "iconURL": "skin/IconButton_5A0D74CF_5772_E32E_41CA_B71D343F60D3.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "image button menu"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "push",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2_rollover.png",
 "iconURL": "skin/IconButton_5A0DE4CF_5772_E32E_41B2_E8D74E2067B2.png",
 "paddingTop": 0,
 "click": "this.shareTwitter(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton TWITTER"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "horizontalAlign": "center",
 "maxWidth": 58,
 "id": "IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419",
 "maxHeight": 58,
 "width": 58,
 "borderSize": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "paddingRight": 0,
 "paddingLeft": 0,
 "mode": "push",
 "height": 58,
 "backgroundOpacity": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "transparencyActive": true,
 "rollOverIconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419_rollover.png",
 "iconURL": "skin/IconButton_5A0DF4CF_5772_E32E_41CE_2196B58CC419.png",
 "paddingTop": 0,
 "click": "this.shareFacebook(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "class": "IconButton",
 "data": {
  "name": "IconButton FB"
 },
 "shadow": false,
 "cursor": "hand"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "class": "Player",
 "scrollBarOpacity": 0.5,
 "desktopMipmappingEnabled": false,
 "data": {
  "name": "Player445"
 },
 "height": "100%",
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "overflow": "visible",
 "horizontalAlign": "left",
 "vrPolyfillScale": 0.65,
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
