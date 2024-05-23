/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { css } from "jodit/esm/core/helpers/utils/css.js";
import { isVoid } from "jodit/esm/core/helpers/checker/is-void.js";
import { normalizeCssValue } from "jodit/esm/core/helpers/normalize/normalize-css-value.js";
import { Dom } from "jodit/esm/core/dom/dom.js";
import { assert } from "jodit/esm/core/helpers/utils/assert.js";
/**
 * Element has the same styles as in the commit
 * @private
 */
export function hasSameStyle(elm, rules) {
    return Boolean(!Dom.isTag(elm, 'font') &&
        Dom.isHTMLElement(elm) &&
        Object.keys(rules).every(property => {
            const value = css(elm, property, true);
            if (value === '' &&
                (rules[property] === '' || rules[property] == null)) {
                return true;
            }
            return (!isVoid(value) &&
                value !== '' &&
                !isVoid(rules[property]) &&
                normalizeCssValue(property, rules[property])
                    .toString()
                    .toLowerCase() === value.toString().toLowerCase());
        }));
}
const elm = document.createElement('div');
elm.style.color = 'red';
assert(hasSameStyle(elm, { color: 'red' }), 'Style test');
assert(hasSameStyle(elm, { fontSize: null }), 'Style test');
assert(hasSameStyle(elm, { fontSize: '' }), 'Style test');
/**
 * Element has the similar styles keys
 */
export function hasSameStyleKeys(elm, rules) {
    return Boolean(!Dom.isTag(elm, 'font') &&
        Dom.isHTMLElement(elm) &&
        Object.keys(rules).every(property => {
            const value = css(elm, property, true);
            return value !== '';
        }));
}
const elm2 = document.createElement('div');
elm2.style.color = 'red';
assert(hasSameStyleKeys(elm2, { color: 'red' }), 'Style test');
assert(!hasSameStyleKeys(elm2, { font: 'Arial', color: 'red' }), 'Style test');
assert(!hasSameStyleKeys(elm2, { border: '1px solid #ccc' }), 'Style test');
