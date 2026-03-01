import { _class_call_check, _defineProperties, _create_class } from './_utils.js';

/**
 * UIState.js - Centralized state management for UI components
 */
export var UIState = /*#__PURE__*/ function () {
    "use strict";
    function UIState() {
        _class_call_check(this, UIState);
        this.state = {
            menuVisible: true,
            currentPanel: null,
            tempo: 100,
            scale: 'C Minor Pentatonic',
            synthPresetIndex: 0,
            masterVolume: 1.0,
            reverbWet: 0.8,
            delayWet: 0.0,
            waveformEnabled: true,
            transportPlaying: false,
            audioContextReady: false,
            cameraActive: false,
            handsDetected: 0,
            currentBPM: 100,
            activeNotes: [],
            activeDrums: [],
            currentSynthName: 'Clean Sine Wave'
        };
        this.subscribers = [];
    }
    _create_class(UIState, [
        {
            key: "getState",
            value: function getState() {
                return Object.assign({}, this.state);
            }
        },
        {
            key: "updateState",
            value: function updateState(updates) {
                var oldState = Object.assign({}, this.state);
                this.state = Object.assign({}, this.state, updates);
                this.notify(this.state, oldState);
            }
        },
        {
            key: "subscribe",
            value: function subscribe(callback) {
                var _this = this;
                this.subscribers.push(callback);
                return function () {
                    var index = _this.subscribers.indexOf(callback);
                    if (index > -1) {
                        _this.subscribers.splice(index, 1);
                    }
                };
            }
        },
        {
            key: "notify",
            value: function notify(newState, oldState) {
                for (var i = 0; i < this.subscribers.length; i++) {
                    try {
                        this.subscribers[i](newState, oldState);
                    } catch (error) {
                        console.error('Error in state subscriber:', error);
                    }
                }
            }
        }
    ]);
    return UIState;
}();
