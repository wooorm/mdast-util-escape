/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:util:escape
 * @fileoverview Test suite for `mdast-util-escape`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var escape = require('./index.js');

/*
 * Methods.
 */

var dequal = assert.deepEqual;

/*
 * Tests.
 */

describe('mdast-util-escape', function () {
    it('should escape', function () {
        dequal(escape('_foo_'), [
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
    });

    it('should accept `gfm`', function () {
        dequal(escape('~foo~', {
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
    });

    it('should accept `commonmark`', function () {
        dequal(escape('| foo |', {
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
    });
});
