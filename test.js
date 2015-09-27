/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:util:escape
 * @fileoverview Test suite for `mdast-util-escape`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var escape = require('./index.js');

/*
 * Tests.
 */

test('mdast-util-escape', function (t) {
    t.deepEqual(escape('_foo_'), [
        {
            'type': 'escape',
            'value': '_'
        },
        {
            'type': 'text',
            'value': 'foo'
        },
        {
            'type': 'escape',
            'value': '_'
        }
    ]);

    t.end();
});

test('should accept `gfm`', function (t) {
    t.deepEqual(escape('~foo~', {
        'gfm': true
    }), [
        {
            'type': 'escape',
            'value': '~'
        },
        {
            'type': 'text',
            'value': 'foo'
        },
        {
            'type': 'escape',
            'value': '~'
        }
    ]);

    t.end();
});

test('should accept `commonmark`', function (t) {
    t.deepEqual(escape('| foo |', {
        'commonmark': true
    }), [
        {
            'type': 'escape',
            'value': '|'
        },
        {
            'type': 'text',
            'value': ' foo '
        },
        {
            'type': 'escape',
            'value': '|'
        }
    ]);

    t.end();
});
