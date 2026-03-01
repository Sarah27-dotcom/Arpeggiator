// Shared utility functions for UI modules
export function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

export function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

export function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * EventEmitter - A simple event emitter utility class
 * Allows classes to emit events and register listeners
 */
export var EventEmitter = /*#__PURE__*/ function () {
    "use strict";

    function EventEmitter() {
        _class_call_check(this, EventEmitter);
        this._events = {};
    }

    _create_class(EventEmitter, [
        {
            key: "on",
            value: function on(event, callback) {
                if (!this._events[event]) {
                    this._events[event] = [];
                }
                this._events[event].push(callback);
                return this;
            }
        },
        {
            key: "off",
            value: function off(event, callback) {
                if (!this._events[event]) return this;
                if (!callback) {
                    delete this._events[event];
                } else {
                    this._events[event] = this._events[event].filter(function (cb) {
                        return cb !== callback;
                    });
                }
                return this;
            }
        },
        {
            key: "emit",
            value: function emit(event) {
                var _this = this;
                if (!this._events[event]) return this;
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }
                this._events[event].forEach(function (callback) {
                    callback.apply(_this, args);
                });
                return this;
            }
        }
    ]);

    return EventEmitter;
}();
