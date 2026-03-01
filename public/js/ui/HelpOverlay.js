import { _class_call_check, _defineProperties, _create_class } from './_utils.js';

/**
 * HelpOverlay.js - Gesture guide and keyboard shortcuts overlay
 */
export var HelpOverlay = /*#__PURE__*/ function () {
    "use strict";
    function HelpOverlay(container) {
        _class_call_check(this, HelpOverlay);
        this.container = container;
        this.isVisible = false;
        this.callbacks = {
            onClose: null
        };
    }
    _create_class(HelpOverlay, [
        {
            key: "on",
            value: function on(action, callback) {
                if (this.callbacks.hasOwnProperty(action)) {
                    this.callbacks[action] = callback;
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
            key: "render",
            value: function render() {
                var _this = this;
                this.container.innerHTML = '\n            <div class="help-content animate-slide-up">\n                <button class="btn btn-close" data-action="close" aria-label="Close help">&times;</button>\n                <h2 style="margin: 0 0 8px 0; font-size: 28px; color: var(--text-primary);">How to Play</h2>\n                <p style="margin: 0 0 24px 0; color: var(--text-muted);">Control music with your hands</p>\n                <div class="help-section">\n                    <h3 class="help-section-title">✋ Hand 1: Arpeggio Control</h3>\n                    <ul class="gesture-list">\n                        <li>\n                            <span class="gesture-icon">👆</span>\n                            <div class="gesture-description">\n                                <strong>Raise hand vertically</strong>\n                                Start/Control the arpeggiator. Higher pitch = higher notes.\n                            </div>\n                        </li>\n                        <li>\n                            <span class="gesture-icon">👌</span>\n                            <div class="gesture-description">\n                                <strong>Thumb-Index distance</strong>\n                                Controls volume (velocity). Wider = louder.\n                            </div>\n                        </li>\n                        <li>\n                            <span class="gesture-icon">✊</span>\n                            <div class="gesture-description">\n                                <strong>Make a fist</strong>\n                                Cycle through synth presets and stop arpeggio.\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n                <div class="help-section">\n                    <h3 class="help-section-title">✌️ Hand 2: Drum Control</h3>\n                    <ul class="gesture-list">\n                        <li>\n                            <span class="gesture-icon">☝️</span>\n                            <div class="gesture-description">\n                                <strong>Index finger up</strong>\n                                Trigger <strong>Kick</strong> drum\n                            </div>\n                        </li>\n                        <li>\n                            <span class="gesture-icon">🖕</span>\n                            <div class="gesture-description">\n                                <strong>Middle finger up</strong>\n                                Trigger <strong>Snare</strong> drum\n                            </div>\n                        </li>\n                        <li>\n                            <span class="gesture-icon">🤟</span>\n                            <div class="gesture-description">\n                                <strong>Ring finger up</strong>\n                                Trigger <strong>Clap</strong> sound\n                            </div>\n                        </li>\n                        <li>\n                            <span class="gesture-icon">🤙</span>\n                            <div class="gesture-description">\n                                <strong>Pinky finger up</strong>\n                                Trigger <strong>Hi-Hat</strong>\n                            </div>\n                        </li>\n                    </ul>\n                </div>\n                <div class="help-section">\n                    <h3 class="help-section-title">⌨️ Keyboard Shortcuts</h3>\n                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">Space</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Start/Stop transport</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">S</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Cycle synth preset</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">M</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Toggle main menu</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">H / ?</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Toggle this help</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">,</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Toggle settings</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">+ / -</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Adjust tempo</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">[ / ]</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Adjust volume</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">W</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Toggle waveform</span>\n                        </div>\n                        <div style="display: flex; align-items: center; gap: 12px; padding: 6px 0;">\n                            <span class="help-key-combo"><span class="help-key">ESC</span></span>\n                            <span style="font-size: 14px; color: var(--text-secondary);">Close all panels</span>\n                        </div>\n                    </div>\n                </div>\n                <p style="margin-top: 24px; font-size: 13px; color: var(--text-muted); text-align: center;">\n                    Raise your hands to raise the roof 🪬\n                </p>\n            </div>\n        ';
                var closeBtn = this.container.querySelector('button[data-action="close"]');
                if (closeBtn) {
                    closeBtn.addEventListener('click', function () {
                        _this.hide();
                        if (_this.callbacks.onClose) {
                            _this.callbacks.onClose();
                        }
                    });
                }
                this.container.addEventListener('click', function (e) {
                    if (e.target === _this.container) {
                        _this.hide();
                        if (_this.callbacks.onClose) {
                            _this.callbacks.onClose();
                        }
                    }
                });
            }
        }
    ]);
    return HelpOverlay;
}();
