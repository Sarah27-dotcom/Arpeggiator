import { _class_call_check, _defineProperties, _create_class, EventEmitter } from './_utils.js';

/**
 * MainMenu.js - Startup overlay with main navigation options
 */
export var MainMenu = /*#__PURE__*/ function () {
    "use strict";

    function MainMenu(container) {
        _class_call_check(this, MainMenu);
        EventEmitter.call(this);
        this.container = container;
        this.isVisible = false;
    }

    _create_class(MainMenu, [
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
                this.container.innerHTML = '\n            <div class="menu-content animate-slide-up">\n                <h1 class="menu-title">🪬 Arpeggiator</h1>\n                <p class="menu-subtitle">Hand-controlled arpeggiator & drum machine</p>\n                <div class="menu-buttons">\n                    <button class="btn btn-primary" data-action="start">Start</button>\n                    <button class="btn btn-secondary" data-action="help">Help</button>\n                    <button class="btn btn-secondary" data-action="settings">Settings</button>\n                    <button class="btn btn-secondary" data-action="about">About</button>\n                </div>\n                <p style="margin-top: 40px; font-size: 14px; color: var(--text-muted);">\n                    Press <span style="background: var(--bg-secondary); padding: 4px 8px; border-radius: 4px;">M</span> to toggle menu\n                </p>\n            </div>\n        ';
                var buttons = this.container.querySelectorAll('button[data-action]');
                buttons.forEach(function (button) {
                    button.addEventListener('click', function () {
                        var action = button.dataset.action;
                        _this.handleAction(action);
                    });
                });
            }
        },
        {
            key: "handleAction",
            value: function handleAction(action) {
                switch (action) {
                    case 'start':
                        this.emit('start');
                        this.hide();
                        break;
                    case 'help':
                        this.hide();
                        this.emit('help');
                        break;
                    case 'settings':
                        this.hide();
                        this.emit('settings');
                        break;
                    case 'about':
                        this.emit('about');
                        break;
                }
            }
        },
        {
            key: "setStartButtonState",
            value: function setStartButtonState(playing) {
                var startButton = this.container.querySelector('button[data-action="start"]');
                if (startButton) {
                    startButton.textContent = playing ? 'Pause' : 'Start';
                }
            }
        }
    ]);
    // Inherit from EventEmitter after methods are defined
    Object.setPrototypeOf(MainMenu.prototype, EventEmitter.prototype);
    Object.setPrototypeOf(MainMenu, EventEmitter);
    return MainMenu;
}();
