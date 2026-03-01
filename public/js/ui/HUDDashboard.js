import { _class_call_check, _defineProperties, _create_class } from './_utils.js';

/**
 * HUDDashboard.js - Real-time heads-up display for status and metrics
 */
export var HUDDashboard = /*#__PURE__*/ function () {
    "use strict";
    function HUDDashboard(container) {
        _class_call_check(this, HUDDashboard);
        this.container = container;
        this.isVisible = false;
        this.currentData = {
            bpm: 100,
            activeNotes: [],
            activeDrums: [],
            synthName: 'Clean Sine Wave',
            audioReady: false,
            cameraActive: false,
            handsDetected: 0,
            transportPlaying: false
        };
    }
    _create_class(HUDDashboard, [
        {
            key: "show",
            value: function show() {
                if (this.isVisible) return;
                this.render();
                this.container.classList.add('visible');
                this.isVisible = true;
            }
        },
        {
            key: "hide",
            value: function hide() {
                var _this = this;
                if (!this.isVisible) return;
                this.container.classList.remove('visible');
                this.isVisible = false;
                setTimeout(function () {
                    if (!_this.isVisible) {
                        _this.container.innerHTML = '';
                    }
                }, 250);
            }
        },
        {
            key: "toggle",
            value: function toggle() {
                if (this.isVisible) {
                    this.hide();
                } else {
                    this.show();
                }
            }
        },
        {
            key: "updateDisplay",
            value: function updateDisplay(data) {
                if (!this.isVisible) return;
                this.currentData = Object.assign({}, this.currentData, data);
                var bpmElement = this.container.querySelector('#hud-bpm');
                if (bpmElement) {
                    bpmElement.textContent = Math.round(data.currentBPM || data.bpm || 100);
                }
                var notesElement = this.container.querySelector('#hud-notes');
                if (notesElement) {
                    var count = (data.activeNotes || []).length;
                    notesElement.textContent = count;
                    notesElement.className = 'hud-value' + (count > 0 ? ' highlight' : '');
                }
                var synthElement = this.container.querySelector('#hud-synth');
                if (synthElement) {
                    var synthName = data.currentSynthName || 'Unknown';
                    synthElement.textContent = synthName.length > 15 ? synthName.substring(0, 12) + '...' : synthName;
                }
                var drumsElement = this.container.querySelector('#hud-drums');
                if (drumsElement) {
                    var drums = data.activeDrums || [];
                    if (drums.length > 0) {
                        drumsElement.textContent = drums.slice(0, 3).join(', ') + (drums.length > 3 ? ' +' : '');
                        drumsElement.className = 'hud-value highlight';
                    } else {
                        drumsElement.textContent = 'None';
                        drumsElement.className = 'hud-value';
                    }
                }
                var audioStatus = this.container.querySelector('#hud-audio-status');
                if (audioStatus) {
                    var indicator = audioStatus.querySelector('.status-indicator');
                    if (indicator) {
                        if (data.audioContextReady && data.transportPlaying) {
                            indicator.className = 'status-indicator active';
                        } else {
                            indicator.className = 'status-indicator';
                        }
                    }
                }
                var cameraStatus = this.container.querySelector('#hud-camera-status');
                if (cameraStatus) {
                    var indicator = cameraStatus.querySelector('.status-indicator');
                    if (indicator) {
                        indicator.className = data.cameraActive ? 'status-indicator active' : 'status-indicator';
                    }
                }
                var handsElement = this.container.querySelector('#hud-hands');
                if (handsElement) {
                    var count = data.handsDetected || 0;
                    handsElement.textContent = count;
                    handsElement.className = 'hud-value' + (count > 0 ? ' highlight' : '');
                }
            }
        },
        {
            key: "render",
            value: function render() {
                this.container.innerHTML = '\n            <div class="hud-corner hud-corner-top-left">\n                <div class="hud-item">\n                    <span class="hud-label">BPM</span>\n                    <span class="hud-value" id="hud-bpm">' + Math.round(this.currentData.bpm) + '</span>\n                </div>\n                <div class="hud-item">\n                    <span class="hud-label">Notes</span>\n                    <span class="hud-value" id="hud-notes">' + this.currentData.activeNotes.length + '</span>\n                </div>\n            </div>\n            <div class="hud-corner hud-corner-top-right">\n                <div class="hud-item">\n                    <span class="hud-label">Synth</span>\n                    <span class="hud-value" id="hud-synth">' + this.currentData.synthName + '</span>\n                </div>\n                <div class="hud-item">\n                    <span class="hud-label">Drums</span>\n                    <span class="hud-value" id="hud-drums">' + (this.currentData.activeDrums.length > 0 ? this.currentData.activeDrums.slice(0, 3).join(', ') : 'None') + '</span>\n                </div>\n            </div>\n            <div class="hud-corner hud-corner-bottom-left">\n                <div class="hud-item">\n                    <div class="status-wrapper">\n                        <span class="status-indicator' + (this.currentData.audioReady && this.currentData.transportPlaying ? ' active' : '') + '"></span>\n                        <span class="hud-label">Audio</span>\n                    </div>\n                </div>\n                <div class="hud-item">\n                    <div class="status-wrapper" id="hud-camera-status">\n                        <span class="status-indicator' + (this.currentData.cameraActive ? ' active' : '') + '"></span>\n                        <span class="hud-label">Camera</span>\n                    </div>\n                </div>\n            </div>\n            <div class="hud-corner hud-corner-bottom-right">\n                <div class="hud-item">\n                    <span class="hud-label">Hands</span>\n                    <span class="hud-value' + (this.currentData.handsDetected > 0 ? ' highlight' : '') + '" id="hud-hands">' + this.currentData.handsDetected + '</span>\n                </div>\n            </div>\n        ';
            }
        }
    ]);
    return HUDDashboard;
}();
