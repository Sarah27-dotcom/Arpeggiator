import { _class_call_check, _defineProperties, _create_class } from './_utils.js';

/**
 * KeyboardShortcuts.js - Keyboard input handler for UI controls
 */
export var KeyboardShortcuts = /*#__PURE__*/ function () {
    "use strict";
    function KeyboardShortcuts(keyMap) {
        _class_call_check(this, KeyboardShortcuts);
        this.keyMap = keyMap || this.defaultKeyMap;
        this.isEnabled = false;
        this.keydownHandler = null;
    }
    _create_class(KeyboardShortcuts, [
        {
            key: "defaultKeyMap",
            get: function get() {
                return {
                    ' ': 'toggleTransport',
                    'Space': 'toggleTransport',
                    'Enter': 'toggleTransport',
                    's': 'cycleSynth',
                    'S': 'cycleSynth',
                    'm': 'toggleMenu',
                    'M': 'toggleMenu',
                    'h': 'toggleHelp',
                    'H': 'toggleHelp',
                    '?': 'toggleHelp',
                    ',': 'toggleSettings',
                    '+': 'tempoUp',
                    '=': 'tempoUp',
                    '-': 'tempoDown',
                    '_': 'tempoDown',
                    ']': 'volumeUp',
                    '[': 'volumeDown',
                    'w': 'toggleWaveform',
                    'W': 'toggleWaveform',
                    'Escape': 'closePanels',
                    'Esc': 'closePanels'
                };
            }
        },
        {
            key: "enable",
            value: function enable(callback) {
                if (this.isEnabled) return;
                this.callback = callback;
                this.keydownHandler = this.handleKeydown.bind(this);
                document.addEventListener('keydown', this.keydownHandler);
                this.isEnabled = true;
            }
        },
        {
            key: "disable",
            value: function disable() {
                if (!this.isEnabled) return;
                document.removeEventListener('keydown', this.keydownHandler);
                this.keydownHandler = null;
                this.callback = null;
                this.isEnabled = false;
            }
        },
        {
            key: "handleKeydown",
            value: function handleKeydown(event) {
                var target = event.target;
                var isInputFocused = target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
                if (isInputFocused) {
                    if (event.key === 'Escape') {
                        var action = this.keyMap['Escape'];
                        if (action && this.callback) {
                            this.callback(action, event);
                        }
                    }
                    return;
                }
                var key = event.key;
                var action = this.keyMap[key];
                if (action && this.callback) {
                    event.preventDefault();
                    event.stopPropagation();
                    this.callback(action, event);
                }
            }
        },
        {
            key: "getHelpText",
            value: function getHelpText() {
                return [
                    { key: 'Space', action: 'toggleTransport', description: 'Start/Stop transport' },
                    { key: 'S', action: 'cycleSynth', description: 'Cycle synth preset' },
                    { key: 'M', action: 'toggleMenu', description: 'Toggle main menu' },
                    { key: 'H', action: 'toggleHelp', description: 'Toggle help overlay' },
                    { key: ',', action: 'toggleSettings', description: 'Toggle settings panel' },
                    { key: '+ / -', action: 'tempo', description: 'Adjust tempo' },
                    { key: '[ / ]', action: 'volume', description: 'Adjust master volume' },
                    { key: 'W', action: 'toggleWaveform', description: 'Toggle waveform visualizer' },
                    { key: 'ESC', action: 'closePanels', description: 'Close all panels' }
                ];
            }
        }
    ]);
    return KeyboardShortcuts;
}();
