/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ""Software""), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***************************************************************************** */

declare module WinJS.UI {

	/**
	* Represents an interface in between a WinJS.UI.MediaElementAdapter and a video or audio HTML element.
	**/
	class MediaElementAdapter {
		//#region Constructors

		/**
		* Creates a new MediaElementAdapter object.
		* @constructor
		* @param element The DOM element that will host the control.
		* @param existingMediaElement A WinJS.UI.MediaPlayer that is associated with this mediaElementAdapter.
		**/
		constructor(mediaPlayer: any, existingMediaElement: HTMLElement);

		//#endregion Constructors

		//#region Methods

		/**
		* Disposes this control.
		**/
		dispose(): void;

		/**
		* The base class constructor. If you are deriving from the MediaElementAdapter class, you
		* must call this base class constructor.
		* @param element The DOM element that will host the control.
		* @param existingMediaElement A WinJS.UI.MediaPlayer that is associated with this mediaElementAdapter.
		**/
		baseMediaElementAdapterConstructor(mediaPlayer: any, existingMediaElement: HTMLElement): void;

		/**
		* Skips to the next track in a playlist. This function is empty by default and
		* meant to be overridden with a custom implementation.
		**/
		nextTrack(): void;

		/**
		* Pauses the media.
		**/
		pause(): void;

		/**
		* Sets the playbackRate to the default playbackRate for the media and plays the media.
		**/
		play(): void;

		/**
		* Skips to the previous track in a playlist. This function is empty by default and
		* meant to be overridden with a custom implementation.
		**/
		previousTrack(): void;

		/**
		* Skips to the previous track in a playlist. This function is empty by default and
		* meant to be overridden with a custom implementation.
		* @param newTime The new time to set the media to.
		**/
		seek(newTime: number): void;

		/**
		* Navigates to the specified position in the media.
		**/
		stop(): void;

		//#endregion Methods

		//#region Properties

		/**
		* Gets or sets the live time.
		**/
		liveTime: number;

		/**
		* Gets or sets whether the content is a live stream.
		**/
		isLive: boolean;

		/**
		* Gets or sets a value that specifies whether the pause method can be executed.
		**/
		isPauseAllowed: boolean;
		/**
		* Gets or sets a value that specifies whether the play method can be executed.
		**/
		isPlayAllowed: boolean;

		/**
		* Gets or sets a value that specifies whether the seek method can be executed.
		**/
		isSeekAllowed: boolean;

		/**
		* Gets or sets a value the underlying media element. This is either a video or audio tag.
		**/
		mediaElement: HTMLElement;

		/**
		* Indicates that the object is compatibile with declarative processing.
		**/
		static supportedForProcessing: boolean;

		//#endregion Properties
	}


	/**
	* Represents a command to be displayed in a MediaPlayer object.
	**/
	class MediaPlayer {
		//#region Constructors

		/**
		* Creates a new MediaPlayer object.
		* @constructor
		* @param element The DOM element that hosts the MediaPlayer control.
		* @param options Each property of the options object corresponds to one of the control's properties or events.
		**/
		constructor(element?: HTMLElement, options?: any);

		//#endregion Constructors

		//#region Events

		/**
		* Occurs before Controls is shown
		* @param eventInfo An object that contains information about the event.
		**/
		onbeforeshowcontrols(eventInfo: Event): void;

		/**
		* Occurs after Controls is shown
		* @param eventInfo An object that contains information about the event.
		**/
		onaftershowcontrols(eventInfo: Event): void;

		/**
		* Occurs before the Controls is hidden.
		* @param eventInfo An object that contains information about the event.
		**/
		onbeforehidecontrols(eventInfo: Event): void;

		/**
		* Occurs after the Controls is hidden.
		* @param eventInfo An object that contains information about the event.
		**/
		onafterhidecontrols(eventInfo: Event): void;

		/**
		* Occurs after the Marker is reached
		* @param eventInfo An object that contains information about the event.
		**/
		onmarkerreached(eventInfo: Event): void;

		/**
		* Occurs after the execution of the MediaCommand.
		* @param eventInfo An object that contains information about the event.
		**/
		onmediacommandexecuted(eventInfo: Event): void;

		/**
		* Occurs whenever target rate is changed.
		* @param eventInfo An object that contains information about the event.
		**/
		ontargetratechange(eventInfo: Event): void;

		/**
		* Occurs whenever target time is updated.
		* @param eventInfo An object that contains information about the event.
		**/
		ontargettimeupdate(eventInfo: Event): void;

		/**
		* Occurs for requesting a thumbnail.
		* @param eventInfo An object that contains information about the event.
		**/
		onthumbnailrequest(eventInfo: Event): void;

		//#endregion Events

		//#region Methods

		/**
		* Adds a new timeline marker.
		* @param time The marker time.
		* @param type The marker type.
		* @param data The marker data.
		* @param extraClass An extra class that can be used to style the marker.
		**/
		addMarker(time: number, type: string, data: any, extraClass: string): void;

		/**
		* Seeks to the previous chapter marker.
		**/
		chapterSkipBack(): void;

		/**
		* Seeks to the next chapter marker.
		**/
		chapterSkipForward(): void;

		/**
		* Disposes this control.
		**/
		dispose(): void;

		/**
		* Increases the playback rate of the media.
		**/
		fastForward(): void;

		/**
		* Navigates to the real-time position in live streamed media.
		**/
		goToLive(): void;

		/**
		* Hides all the UI associated with the MediaPlayer.
		**/
		hideControls(): void;

		/**
		* Plays the next track.
		**/
		nextTrack(): void;

		/**
		* Pauses the media.
		**/
		pause(): void;

		/**
		* Sets the playbackRate to the default playbackRate for the media and plays the media.
		**/
		play(): void;

		/**
		* Plays the previous track.
		**/
		previousTrack(): void;

		/**
		* The time of the marker to remove.
		**/
		removeMarker(time: number): void;

		/**
		* Decreases the playbackRate of the media.
		**/
		rewind(): void;

		/**
		* The position in seconds to seek to.
		**/
		seek(time: number): void;

		/**
		* Sets the metadata fields for the given piece of media. This method should be called before changing the video stream.
		* @param contentType The type of content that will be played by the mediaPlayer.
		* @param metadata A collection of name value pairs that provide additional information about the current media.
		**/
		setContentMetadata(contentType: string, metadata: any): void;

		/**
		* Displays the UI associated with the MediaPlayer.
		**/
		showControls(): void;

		/**
		* Stops the media.
		**/
		stop(): void;

		/**
		* Moves the current timeline position backward by a short interval.
		**/
		timeSkipBack(): void;

		/**
		* Moves the current timeline position forward by a short interval.
		**/
		timeSkipForward(): void;

		/**
		* Registers an event handler for the specified event.
		* @param type The event type to register.
		* @param listener The event handler function to associate with the event.
		* @param useCapture Set to true to register the event handler for the capturing phase; otherwise, set to false to register the event handler for the bubbling phase.
		**/
		addEventListener(type: string, listener: Function, useCapture?: boolean): void;

		/**
		* Removes an event handler that the addEventListener method registered.
		* @param type The event type to unregister.
		* @param listener The event handler function to remove.
		* @param useCapture Set to true to remove the capturing phase event handler; set to false to remove the bubbling phase event handler.
		**/
		removeEventListener(type: string, listener: Function, useCapture?: boolean): void;

		/**
		* Raises an event of the specified type and with the specified additional properties.
		* @param type The name of the event to raise.
		* @param details The set of additional properties to attach to the event object.
		**/
		dispatchEvent(type: string, details: any): void;

		/**
		* Forces the MediaPlayer to update its layout.
		**/
		forceLayout(): void;


		//#endregion Methods

		//#region Methods

		/**
		* Gets a property that specifies whether the transport controls are visible.
		**/
		isControlsVisible: boolean;

		/**
		* Gets or sets maximum playback position of the media. By default, the value is the duration of the media.
		**/
		endTime: boolean;

		/**
		* The DOM element that hosts the MediaPlayer control.
		**/
		element: HTMLElement;

		/**
		* Gets or sets a value indicating whether the MediaPlayer is using a layout that minimized space used, but only has room for a limited number of
		* commands or a layout that has room for a lot of commands, but takes up more space.
		**/
		compact: boolean;

		/**
		* Gets or sets a value indicating whether the MediaPlayer is full screen.
		**/
		isFullScreen: boolean;

		/**
		* Gets or sets a value indicating whether to use thumbnails for fast forward, rewind and scrubbing. If true, the fast forward, rewind and scrub operations
		* will pause the mediaElement and cycle thumbnails as the user changes position. If false, the fast forward and rewind operations will increase or decrease
		* the mediaElement's playbackRate and the scrub operation will move the position.
		**/
		isThumbnailEnabled: boolean;

		/**
		* Gets or sets the MediaPlayer's marker collection.
		**/
		markers: any;

		/**
		* Gets or sets an interface that your application can implement to have more control over synchronization between
		* the MediaPlayer and your media.
		**/
		mediaElementAdapter: any;

		/**
		* Gets or sets the playback mode, which specifies how many transport controls are shown.
		**/
		layout: string;

		/**
		* Gets or sets minimum playback position of the media. By default the value is zero.
		**/
		startTime: number;

		/**
		* Gets the current time as it is represented in the UI. While fast forwarding or rewinding, this property may be different than the video or audio
		* tag's 'currentTime' property. This is because during a fast forward or rewind operation, the media is paused while the timeline animates to
		* simulate a fast forward or rewind operation.
		**/
		targetCurrentTime: number;

		/**
		* Gets the playbackRate as it is represented in the UI. While fast forwarding or rewinding, this property may be different than the video or audio
		* tag's 'playbackRate' property. This is because during a fast forward or rewind operation, the media is paused while the timeline animates to
		* simulate a fast forward or rewind operation.
		**/
		targetPlaybackRate: number;

		/**
		* Gets or sets a function that converts raw time data from the video or audio tag into text to display in the UI of the MediaPlayer.
		**/
		timeFormatter: any;

		/**
		* Sets the path to the current thumbnail image to display.
		**/
		thumbnailImage: string;

		/**
		* Gets or sets whether the CAST button is visible.
		**/
		castButtonVisible: boolean;

		/**
		* Gets or sets whether the cast button is enabled.
		**/
		castButtonEnabled: boolean;

		/**
		* Gets or sets whether the chapter skip back button is visible.
		**/
		chapterSkipBackButtonVisible: boolean;

		/**
		* Gets or sets whether the chapter skip back button is enabled.
		**/
		chapterSkipBackButtonEnabled: boolean;

		/**
		* Gets or sets whether the chapter skip forward button is visible.
		**/
		chapterSkipForwardButtonVisible: boolean;

		/**
		* Gets or sets whether the chapter skip forward button is enabled.
		**/
		chapterSkipForwardButtonEnabled: boolean;

		/**
		* Gets or sets whether the fast forward button is visible.
		**/
		fastForwardButtonVisible: boolean;

		/**
		* Gets or sets whether the fast forward button is enabled.
		**/
		fastForwardButtonEnabled: boolean;

		/**
		* Gets or sets whether the full screen button is visible.
		**/
		fullscreenButtonVisible: boolean;

		/**
		* Gets or sets whether the more button is enabled.
		**/
		fullscreenButtonEnabled: boolean;

		/**
		* Gets or sets whether the LIVE button is visible.
		**/
		goToLiveButtonVisible: boolean;

		/**
		* Gets or sets whether the LIVE button is enabled.
		**/
		goToLiveButtonEnabled: boolean;

		/**
		* Gets or sets whether the next track button is visible.
		**/
		nextTrackButtonVisible: boolean;

		/**
		* Gets or sets whether the next track button is enabled.
		**/
		nextTrackButtonEnabled: boolean;

		/**
		* Gets or sets whether the play from beginning button is visible.
		**/
		playFromBeginningButtonVisible: boolean;

		/**
		* Gets or sets whether the play from beginning button is enabled.
		**/
		playFromBeginningButtonEnabled: boolean;

		/**
		* Gets or sets whether the play / pause button is visible.
		**/
		playPauseButtonVisible: boolean;

		/**
		* Gets or sets whether the play / pause button is enabled.
		**/
		playPauseButtonEnabled: boolean;

		/**
		* Gets or sets whether the playback rate button is visible.
		**/
		playbackRateButtonVisible: boolean;

		/**
		* Gets or sets whether the playback rate button is enabled.
		**/
		playbackRateButtonEnabled: boolean;

		/**
		* Gets or sets whether the previous track button is enabled.
		**/
		previousTrackButtonEnabled: boolean;

		/**
		* Gets or sets whether the previous track button is visible.
		**/
		previousTrackButtonVisible: boolean;

		/**
		* Gets or sets whether the rewind button is visible.
		**/
		rewindButtonVisible: boolean;

		/**
		* Gets or sets whether the rewind button is enabled.
		**/
		rewindButtonEnabled: boolean;

		/**
		* Gets or sets whether the seek bar is visible.
		**/
		seekBarVisible: boolean;

		/**
		* Gets or sets whether seeking is enabled.
		**/
		seekingEnabled: boolean;

		/**
		* Gets or sets whether the stop button is visible.
		**/
		stopButtonVisible: boolean;

		/**
		* Gets or sets whether the stop button is enabled.
		**/
		stopButtonEnabled: boolean;

		/**
		* Gets or sets whether the time skip back button is visible.
		**/
		timeSkipBackButtonVisible: boolean;

		/**
		* Gets or sets whether the time skip back button is enabled.
		**/
		timeSkipBackButtonEnabled: boolean;

		/**
		* Gets or sets whether the time skip forward button is visible.
		**/
		timeSkipForwardButtonVisible: boolean;

		/**
		* Gets or sets whether the time skip forward button is enabled.
		**/
		timeSkipForwardButtonEnabled: boolean;

		/**
		* Gets or sets whether the volume button is visible.
		**/
		volumeButtonVisible: boolean;

		/**
		* Gets or sets whether the volume button is enabled.
		**/
		volumeButtonEnabled: boolean;

		/**
		* Gets or sets whether the zoom button is visible.
		**/
		zoomButtonVisible: boolean;

		/**
		* Gets or sets whether the zoom button is enabled.
		**/
		zoomButtonEnabled: boolean;

		/**
		* Indicates that the object is compatibile with declarative processing.
		**/
		static supportedForProcessing: boolean;

		//#endregion Properties
	}
	/**
	* An enumeration of Media commands that the transport bar buttons support.
	**/
	interface MediaCommand {
		/**
			* Invokes a menu that allows the viewer to select an audio track.
		**/
		audioTracks: string;
		/**
			* The Media Control shows the partial set of transport controls.
		**/
		cast: string;
		/**
			* Seeks to the previous chapter.
		**/
		chapterSkipBack: string;
		/**
			* Seeks to the next chapter marker.
		**/
		chapterSkipForward: string;
		/**
			* Invokes a menu that allows the user to choose a closed captions setting.
		**/
		closedCaptions: string;
		/**
			* Increases the playback rate of the media.
		**/
		fastForward: string;
		/**
			* Navigates to the real-time position in live streamed media.
		**/
		goToLive: string;
		/**
			* Plays the next track.
		**/
		nextTrack: string;
		/**
			* Pauses the Media.
		**/
		pause: string;
		/**
			* Sets the playbackRate to the default playbackRate for the media and plays the media.
		**/
		play: string;
		/**
			* Allows the viewer to select a playback rate for the media.
		**/
		playbackRate: string;
		/**
			* Seeks to the beginning of the timeline and starts playing.
		**/
		playFromBeginning: string;
		/**
			* Plays the previous track.
		**/
		previousTrack: string;
		/**
			* Decreases the playbackRate of the media.
		**/
		rewind: string;
		/**
			* Navigates to the specified position in the media.
		**/
		seek: string;
		/**
			* Stops the media.
		**/
		stop: string;
		/**
			* Moves the current timeline position backward by a short interval.
		**/
		timeSkipBack: string;
		/**
			* Moves the current timeline position forward short interval.
		**/
		timeSkipForward: string;
		/**
			* Shows UI that allows the viewer to change the volume.
		**/
		volume: string;
		/**
			* Toggles the display mode between letterbox and native.
		**/
		zoom: string;
	}

	/**
	* The types of timeline markers supported by the MediaPlayer.
	**/
	interface MarkerType {
		/**
			* The marker represents the beginning of an advertisement.
		**/
		advertisement: string;
		/**
			* The markers represents the beginning of a chapter.
		**/
		chapter: string;
		/**
			* The markers represents a custom event.
		**/
		custom: string;
	}

}
