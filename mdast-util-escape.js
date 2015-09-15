(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdastUtilEscape = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:util:escape
 * @fileoverview Escape text to be inserted into mdast.
 */

/* eslint-env commonjs */

'use strict';

/*
 * The below lists contain all escapable characters in the
 * three main flavours of markdown.
 * The commented entries are not used by markdown-syntax,
 * so there’s no need to escape them.
 */

var normal = [
    '\\',
    '`',
    '*',
    // '{',
    // '}',
    '[',
    ']',
    '(',
    ')',
    '#',
    '+',
    '-',
    '.',
    '!',
    '_',
    '>'
];

var gfm = normal.concat([
    '~',
    '|'
]);

var commonmark = gfm.concat([
    // '\n',
    // '"',
    // '$',
    // '%',
    // '&',
    // '\','
    // ',',
    // '/',
    // ':',
    // ';',
    // '<',
    // '=',
    // '?',
    // '@',
    // '^'
]);

/**
 * Escape text to be inserted into mdast.
 *
 * @param {string} value - Content to escape.
 * @param {Object?} [options] - Configuration.
 * @param {boolean?} [options.gfm] - Escape for GFM.
 * @param {boolean?} [options.commonmark] - Escape for commonmark.
 * @return {string} - Escaped content.
 */
function escape(value, options) {
    var settings = options || {};
    var dictionary = normal;
    var length = value.length;
    var index = -1;
    var nodes = [];
    var result = '';
    var character;

    if (settings.commonmark) {
        dictionary = commonmark;
    } else if (settings.gfm) {
        dictionary = gfm;
    }

    /**
     * Flush a text node, if available.
     */
    function flush() {
        if (result) {
            nodes.push({
                'type': 'text',
                'value': result
            });

            result = '';
        }
    }

    while (++index < length) {
        character = value.charAt(index);

        if (dictionary.indexOf(character) !== -1) {
            flush();
            nodes.push({
                'type': 'escape',
                'value': character
            });
        } else {
            result += character;
        }
    }

    flush();

    return nodes;
}

/*
 * Expose.
 */

module.exports = escape;

},{}]},{},[1])(1)
});