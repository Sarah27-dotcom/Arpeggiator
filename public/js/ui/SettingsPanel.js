import { _class_call_check, _defineProperties, _create_class } from './_utils.js';

/**
 * SettingsPanel.js - Collapsible controls for audio/visual parameters
 */
export var SettingsPanel = /*#__PURE__*/ function () {
    "use strict";
    function SettingsPanel(container) {
        _class_call_check(this, SettingsPanel);
        this.container = container;
        this.isVisible = false;
        this.callbacks = {
            onTempoChange: null,
            onScaleChange: null,
            onSynthChange: null,
            onVolumeChange: null,
            onReverbChange: null,
            onDelayChange: null,
            onWaveformToggle: null
        };
        this.scales = [
            'C Minor Pentatonic',
            'C Major',
            'C Minor',
            'D Minor Pentatonic',
            'E Minor Pentatonic',
            'G Major'
        ];
        this.synthNames = ['Clean Sine Wave', 'Buzzy Sawtooth', 'Funk Electric Piano'];
        this.currentValues = {
            tempo: 100,
            scale: 'C Minor Pentatonic',
            synthIndex: 0,
            volume: 1.0,
            reverb: 0.8,
            delay: 0.0,
            waveformEnabled: true
        };
    }
    _create_class(SettingsPanel, [
        {
            key: "on",
            value: function on(action, callback) {
                if (this.callbacks.hasOwnProperty(action)) {
                    this.callbacks[action] = callback;
                }
            }
        },
        {
            key: "setSynthNames",
            value: function setSynthNames(names) {
                this.synthNames = names;
                if (this.isVisible) {
                    var synthSelect = this.container.querySelector('#synth-select');
                    if (synthSelect) {
                        var currentValue = parseInt(synthSelect.value, 10);
                        synthSelect.innerHTML = this.synthNames.map(function (name, i) {
                            return '<option value="' + i + '" ' + (i === currentValue ? 'selected' : '') + '>' + name + '</option>';
                        }).join('');
                    }
                }
            }
        },
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
            key: "updateControls",
            value: function updateControls(state) {
                if (!this.isVisible) return;
                if (state.currentBPM !== undefined) {
                    this.setControlValue('tempo', state.currentBPM);
                }
                if (state.synthPresetIndex !== undefined) {
                    this.setControlValue('synth', state.synthPresetIndex);
                }
                if (state.masterVolume !== undefined) {
                    this.setControlValue('volume', state.masterVolume);
                }
                if (state.reverbWet !== undefined) {
                    this.setControlValue('reverb', state.reverbWet);
                }
                if (state.delayWet !== undefined) {
                    this.setControlValue('delay', state.delayWet);
                }
                if (state.waveformEnabled !== undefined) {
                    this.setControlValue('waveform', state.waveformEnabled);
                }
            }
        },
        {
            key: "setControlValue",
            value: function setControlValue(name, value) {
                this.currentValues[name] = value;
                var element;
                switch (name) {
                    case 'tempo':
                        element = this.container.querySelector('#tempo-slider');
                        if (element) {
                            element.value = value;
                            var valueDisplay = this.container.querySelector('#tempo-value');
                            if (valueDisplay) valueDisplay.textContent = Math.round(value);
                        }
                        break;
                    case 'synth':
                        element = this.container.querySelector('#synth-select');
                        if (element) element.value = value;
                        break;
                    case 'volume':
                        element = this.container.querySelector('#volume-slider');
                        if (element) {
                            element.value = value;
                            var valueDisplay = this.container.querySelector('#volume-value');
                            if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        }
                        break;
                    case 'reverb':
                        element = this.container.querySelector('#reverb-slider');
                        if (element) {
                            element.value = value;
                            var valueDisplay = this.container.querySelector('#reverb-value');
                            if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        }
                        break;
                    case 'delay':
                        element = this.container.querySelector('#delay-slider');
                        if (element) {
                            element.value = value;
                            var valueDisplay = this.container.querySelector('#delay-value');
                            if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        }
                        break;
                    case 'waveform':
                        element = this.container.querySelector('#waveform-checkbox');
                        if (element) element.checked = value;
                        break;
                }
            }
        },
        {
            key: "render",
            value: function render() {
                var _this = this;
                var v = this.currentValues;
                this.container.innerHTML = '\n            <button class="btn btn-close" data-action="close" aria-label="Close settings">&times;</button>\n            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: var(--text-primary);">Settings</h2>\n            <div class="form-group">\n                <div class="form-row">\n                    <label class="form-label" for="tempo-slider">Tempo</label>\n                    <span class="form-value" id="tempo-value">' + Math.round(v.tempo) + ' BPM</span>\n                </div>\n                <input type="range" id="tempo-slider" min="60" max="180" value="' + v.tempo + '" step="1">\n            </div>\n            <div class="form-group">\n                <label class="form-label" for="scale-select">Scale</label>\n                <select id="scale-select">\n                    ' + this.scales.map(function (scale) {
                    return '<option value="' + scale + '" ' + (scale === v.scale ? 'selected' : '') + '>' + scale + '</option>';
                }).join('') + '\n                </select>\n            </div>\n            <div class="form-group">\n                <label class="form-label" for="synth-select">Synth Preset</label>\n                <select id="synth-select">\n                    ' + this.synthNames.map(function (name, i) {
                    return '<option value="' + i + '" ' + (i === v.synthIndex ? 'selected' : '') + '>' + name + '</option>';
                }).join('') + '\n                </select>\n            </div>\n            <hr style="border: none; border-top: 1px solid var(--border-color); margin: 16px 0;">\n            <div class="form-group">\n                <div class="form-row">\n                    <label class="form-label" for="volume-slider">Master Volume</label>\n                    <span class="form-value" id="volume-value">' + Math.round(v.volume * 100) + '%</span>\n                </div>\n                <input type="range" id="volume-slider" min="0" max="1" value="' + v.volume + '" step="0.01">\n            </div>\n            <div class="form-group">\n                <div class="form-row">\n                    <label class="form-label" for="reverb-slider">Reverb</label>\n                    <span class="form-value" id="reverb-value">' + Math.round(v.reverb * 100) + '%</span>\n                </div>\n                <input type="range" id="reverb-slider" min="0" max="1" value="' + v.reverb + '" step="0.01">\n            </div>\n            <div class="form-group">\n                <div class="form-row">\n                    <label class="form-label" for="delay-slider">Delay</label>\n                    <span class="form-value" id="delay-value">' + Math.round(v.delay * 100) + '%</span>\n                </div>\n                <input type="range" id="delay-slider" min="0" max="1" value="' + v.delay + '" step="0.01">\n            </div>\n            <hr style="border: none; border-top: 1px solid var(--border-color); margin: 16px 0;">\n            <div class="form-group">\n                <label class="checkbox-wrapper">\n                    <input type="checkbox" id="waveform-checkbox" ' + (v.waveformEnabled ? 'checked' : '') + '>\n                    <span class="checkbox-label">Show Waveform Visualizer</span>\n                </label>\n            </div>\n            <p style="margin-top: 16px; font-size: 12px; color: var(--text-muted);">\n                Press <span style="background: var(--bg-secondary); padding: 2px 6px; border-radius: 4px;">,</span> to toggle settings\n            </p>\n        ';
                var closeBtn = this.container.querySelector('button[data-action="close"]');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function () {
                        return _this.hide();
                    });
                }
                var tempoSlider = this.container.querySelector('#tempo-slider');
                if (tempoSlider) {
                    tempoSlider.addEventListener('input', function (e) {
                        var value = parseFloat(e.target.value);
                        _this.currentValues.tempo = value;
                        var valueDisplay = _this.container.querySelector('#tempo-value');
                        if (valueDisplay) valueDisplay.textContent = Math.round(value) + ' BPM';
                        if (_this.callbacks.onTempoChange) {
                            _this.callbacks.onTempoChange(value);
                        }
                    });
                }
                var scaleSelect = this.container.querySelector('#scale-select');
                if (scaleSelect) {
                    scaleSelect.addEventListener('change', function (e) {
                        var value = e.target.value;
                        _this.currentValues.scale = value;
                        if (_this.callbacks.onScaleChange) {
                            _this.callbacks.onScaleChange(value);
                        }
                    });
                }
                var synthSelect = this.container.querySelector('#synth-select');
                if (synthSelect) {
                    synthSelect.addEventListener('change', function (e) {
                        var value = parseInt(e.target.value, 10);
                        _this.currentValues.synthIndex = value;
                        if (_this.callbacks.onSynthChange) {
                            _this.callbacks.onSynthChange(value);
                        }
                    });
                }
                var volumeSlider = this.container.querySelector('#volume-slider');
                if (volumeSlider) {
                    volumeSlider.addEventListener('input', function (e) {
                        var value = parseFloat(e.target.value);
                        _this.currentValues.volume = value;
                        var valueDisplay = _this.container.querySelector('#volume-value');
                        if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        if (_this.callbacks.onVolumeChange) {
                            _this.callbacks.onVolumeChange(value);
                        }
                    });
                }
                var reverbSlider = this.container.querySelector('#reverb-slider');
                if (reverbSlider) {
                    reverbSlider.addEventListener('input', function (e) {
                        var value = parseFloat(e.target.value);
                        _this.currentValues.reverb = value;
                        var valueDisplay = _this.container.querySelector('#reverb-value');
                        if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        if (_this.callbacks.onReverbChange) {
                            _this.callbacks.onReverbChange(value);
                        }
                    });
                }
                var delaySlider = this.container.querySelector('#delay-slider');
                if (delaySlider) {
                    delaySlider.addEventListener('input', function (e) {
                        var value = parseFloat(e.target.value);
                        _this.currentValues.delay = value;
                        var valueDisplay = _this.container.querySelector('#delay-value');
                        if (valueDisplay) valueDisplay.textContent = Math.round(value * 100) + '%';
                        if (_this.callbacks.onDelayChange) {
                            _this.callbacks.onDelayChange(value);
                        }
                    });
                }
                var waveformCheckbox = this.container.querySelector('#waveform-checkbox');
                if (waveformCheckbox) {
                    waveformCheckbox.addEventListener('change', function (e) {
                        var value = e.target.checked;
                        _this.currentValues.waveformEnabled = value;
                        if (_this.callbacks.onWaveformToggle) {
                            _this.callbacks.onWaveformToggle(value);
                        }
                    });
                }
            }
        }
    ]);
    return SettingsPanel;
}();
