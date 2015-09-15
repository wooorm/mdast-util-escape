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
