import { _class_call_check, _defineProperties, _create_class } from './_utils.js';
import { UIState } from './UIState.js';
import { KeyboardShortcuts } from './KeyboardShortcuts.js';
import { MainMenu } from './MainMenu.js';
import { SettingsPanel } from './SettingsPanel.js';
import { HUDDashboard } from './HUDDashboard.js';
import { HelpOverlay } from './HelpOverlay.js';

/**
 * UIManager.js - Main controller orchestrating all UI components
 */
export var UIManager = /*#__PURE__*/ function () {
    "use strict";
    function UIManager(gameInstance, renderDiv) {
        _class_call_check(this, UIManager);
        this.game = gameInstance;
        this.renderDiv = renderDiv;
        this.uiContainer = document.getElementById('ui-container');
        this.mainMenuContainer = document.getElementById('main-menu');
        this.settingsPanelContainer = document.getElementById('settings-panel');
        this.helpOverlayContainer = document.getElementById('help-overlay');
        this.hudDashboardContainer = document.getElementById('hud-dashboard');
        if (!this.uiContainer) {
            console.error('UI container not found in DOM');
            return;
        }
        this.state = new UIState();
        this.mainMenu = new MainMenu(this.mainMenuContainer);
        this.settingsPanel = new SettingsPanel(this.settingsPanelContainer);
        this.hudDashboard = new HUDDashboard(this.hudDashboardContainer);
        this.helpOverlay = new HelpOverlay(this.helpOverlayContainer);
        this.keyboardShortcuts = new KeyboardShortcuts();
        this.isInitialized = false;
    }
    _create_class(UIManager, [
        {
            key: "init",
            value: function init() {
                var _this = this;
                if (this.isInitialized) return;
                this.setupCallbacks();
                this.keyboardShortcuts.enable(this.handleKeyboardShortcut.bind(this));
                this.mainMenu.show();
                this.state.subscribe(function (newState, oldState) {
                    _this.onStateChange(newState, oldState);
                });
                this.isInitialized = true;
                console.log('UI Manager initialized');
            }
        },
        {
            key: "setupCallbacks",
            value: function setupCallbacks() {
                var _this = this;
                this.mainMenu.on('start', function () {
                    _this.handleStart();
                });
                this.mainMenu.on('help', function () {
                    _this.helpOverlay.show();
                });
                this.mainMenu.on('settings', function () {
                    _this.settingsPanel.show();
                });
                this.mainMenu.on('about', function () {
                    _this.showAbout();
                });
                this.settingsPanel.on('onTempoChange', function (value) {
                    if (_this.game && _this.game.setTempo) {
                        _this.game.setTempo(value);
                    }
                });
                this.settingsPanel.on('onScaleChange', function (value) {
                    console.log('Scale changed to:', value);
                });
                this.settingsPanel.on('onSynthChange', function (value) {
                    if (_this.game && _this.game.setSynthPreset) {
                        _this.game.setSynthPreset(value);
                    }
                });
                this.settingsPanel.on('onVolumeChange', function (value) {
                    if (_this.game && _this.game.setMasterVolume) {
                        _this.game.setMasterVolume(value);
                    }
                });
                this.settingsPanel.on('onReverbChange', function (value) {
                    if (_this.game && _this.game.setReverbWet) {
                        _this.game.setReverbWet(value);
                    }
                });
                this.settingsPanel.on('onDelayChange', function (value) {
                    if (_this.game && _this.game.setDelayWet) {
                        _this.game.setDelayWet(value);
                    }
                });
                this.settingsPanel.on('onWaveformToggle', function (value) {
                    if (_this.game && _this.game.toggleWaveform) {
                        _this.game.toggleWaveform(value);
                    }
                });
            }
        },
        {
            key: "handleStart",
            value: function handleStart() {
                var _this = this;
                if (this.game && this.game.musicManager) {
                    this.game.musicManager.start().then(function () {
                        _this.state.updateState({
                            audioContextReady: true,
                            menuVisible: false
                        });
                        _this.hudDashboard.show();
                    });
                } else {
                    this.hudDashboard.show();
                }
            }
        },
        {
            key: "showAbout",
            value: function showAbout() {
                var aboutOverlay = document.createElement('div');
                aboutOverlay.className = 'ui-overlay visible';
                aboutOverlay.innerHTML = '\n                <div class="help-content animate-slide-up">\n                    <button class="btn btn-close" data-action="close" aria-label="Close about">&times;</button>\n                    <h2 style="margin: 0 0 8px 0; font-size: 28px; color: var(--text-primary);">🪬 Arpeggiator</h2>\n                    <p style="margin: 0 0 24px 0; color: var(--text-muted);">Version 1.0</p>\n                    <p style="margin-bottom: 16px; color: var(--text-secondary);">\n                        A hand-controlled arpeggiator and drum machine powered by computer vision.\n                    </p>\n                    <p style="margin-bottom: 16px; color: var(--text-secondary);">\n                        Built with:\n                    </p>\n                    <ul style="margin-bottom: 24px; padding-left: 20px; color: var(--text-secondary);">\n                        <li>Three.js for 3D visualization</li>\n                        <li>MediaPipe for hand tracking</li>\n                        <li>Tone.js for audio synthesis</li>\n                    </ul>\n                    <p style="font-size: 13px; color: var(--text-muted); text-align: center;">\n                        <a href="https://github.com/Sarah27-dotcom/Arpeggiator" target="_blank" style="color: var(--color-purple);">View on GitHub</a>\n                    </p>\n                </div>\n            ';
                this.uiContainer.appendChild(aboutOverlay);
                var closeBtn = aboutOverlay.querySelector('button[data-action="close"]');
                closeBtn.addEventListener('click', function () {
                    return aboutOverlay.remove();
                });
                aboutOverlay.addEventListener('click', function (e) {
                    if (e.target === aboutOverlay) {
                        aboutOverlay.remove();
                    }
                });
            }
        },
        {
            key: "handleKeyboardShortcut",
            value: function handleKeyboardShortcut(action, event) {
                switch (action) {
                    case 'toggleTransport':
                        if (this.game && this.game.toggleTransport) {
                            this.game.toggleTransport();
                        }
                        break;
                    case 'cycleSynth':
                        if (this.game && this.game.cycleSynthPreset) {
                            this.game.cycleSynthPreset();
                        }
                        break;
                    case 'toggleMenu':
                        this.toggleMenu();
                        break;
                    case 'toggleHelp':
                        this.toggleHelp();
                        break;
                    case 'toggleSettings':
                        this.toggleSettings();
                        break;
                    case 'tempoUp':
                        if (this.game && this.game.setTempo) {
                            var currentBPM = this.state.getState().currentBPM || 100;
                            this.game.setTempo(Math.min(180, currentBPM + 5));
                        }
                        break;
                    case 'tempoDown':
                        if (this.game && this.game.setTempo) {
                            var currentBPM = this.state.getState().currentBPM || 100;
                            this.game.setTempo(Math.max(60, currentBPM - 5));
                        }
                        break;
                    case 'volumeUp':
                        if (this.game && this.game.setMasterVolume) {
                            var currentVol = this.state.getState().masterVolume || 1.0;
                            this.game.setMasterVolume(Math.min(1.0, currentVol + 0.1));
                        }
                        break;
                    case 'volumeDown':
                        if (this.game && this.game.setMasterVolume) {
                            var currentVol = this.state.getState().masterVolume || 1.0;
                            this.game.setMasterVolume(Math.max(0, currentVol - 0.1));
                        }
                        break;
                    case 'toggleWaveform':
                        if (this.game && this.game.toggleWaveform) {
                            var currentState = this.state.getState().waveformEnabled;
                            this.game.toggleWaveform(!currentState);
                        }
                        break;
                    case 'closePanels':
                        this.closeAllPanels();
                        break;
                }
            }
        },
        {
            key: "updateFromGame",
            value: function updateFromGame(gameState) {
                if (!gameState) return;
                this.state.updateState({
                    transportPlaying: gameState.transportPlaying,
                    audioContextReady: gameState.audioContextReady,
                    cameraActive: gameState.cameraActive,
                    handsDetected: gameState.handsDetected,
                    currentBPM: gameState.currentBPM,
                    synthPresetIndex: gameState.synthPresetIndex,
                    activeNotes: gameState.activeNotes,
                    activeDrums: gameState.activeDrums,
                    currentSynthName: gameState.currentSynthName,
                    masterVolume: gameState.masterVolume,
                    reverbWet: gameState.reverbWet,
                    delayWet: gameState.delayWet,
                    waveformEnabled: gameState.waveformEnabled
                });
                if (this.settingsPanel.isVisible) {
                    this.settingsPanel.updateControls(gameState);
                }
                this.hudDashboard.updateDisplay(gameState);
                this.mainMenu.setStartButtonState(gameState.transportPlaying);
            }
        },
        {
            key: "toggleMenu",
            value: function toggleMenu() {
                this.settingsPanel.hide();
                this.helpOverlay.hide();
                this.mainMenu.toggle();
                this.state.updateState({
                    menuVisible: this.mainMenu.isVisible,
                    currentPanel: this.mainMenu.isVisible ? 'menu' : null
                });
            }
        },
        {
            key: "toggleHelp",
            value: function toggleHelp() {
                this.mainMenu.hide();
                this.settingsPanel.hide();
                this.helpOverlay.toggle();
                this.state.updateState({
                    currentPanel: this.helpOverlay.isVisible ? 'help' : null
                });
            }
        },
        {
            key: "toggleSettings",
            value: function toggleSettings() {
                this.mainMenu.hide();
                this.helpOverlay.hide();
                this.settingsPanel.toggle();
                this.state.updateState({
                    currentPanel: this.settingsPanel.isVisible ? 'settings' : null
                });
            }
        },
        {
            key: "closeAllPanels",
            value: function closeAllPanels() {
                this.mainMenu.hide();
                this.helpOverlay.hide();
                this.settingsPanel.hide();
                this.state.updateState({
                    menuVisible: false,
                    currentPanel: null
                });
            }
        },
        {
            key: "onStateChange",
            value: function onStateChange(newState, oldState) {
            }
        },
        {
            key: "setSynthNames",
            value: function setSynthNames(names) {
                this.settingsPanel.setSynthNames(names);
            }
        },
        {
            key: "destroy",
            value: function destroy() {
                this.keyboardShortcuts.disable();
                this.closeAllPanels();
                this.hudDashboard.hide();
                this.isInitialized = false;
            }
        }
    ]);
    return UIManager;
}();
