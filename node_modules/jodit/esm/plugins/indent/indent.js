/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { BR, PARAGRAPH } from "jodit/esm/core/constants.js";
import { Dom } from "jodit/esm/core/dom/index.js";
import { attr } from "jodit/esm/core/helpers/index.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import "./config";
import { getKey } from "./helpers";
/**
 * Indents the line containing the selection or insertion point.
 */
export function indent(editor) {
    editor
        .registerButton({
        name: 'indent',
        group: 'indent'
    })
        .registerButton({
        name: 'outdent',
        group: 'indent'
    });
    const callback = (command) => {
        const processedElements = [];
        editor.s.eachSelection((current) => {
            editor.s.save();
            let currentBox = current
                ? Dom.up(current, Dom.isBlock, editor.editor)
                : false;
            const { enter } = editor.o;
            if (!currentBox && current) {
                currentBox = Dom.wrapInline(current, enter !== BR ? enter : PARAGRAPH, editor);
            }
            if (!currentBox) {
                editor.s.restore();
                return false;
            }
            const alreadyIndented = processedElements.includes(currentBox);
            if (currentBox && !alreadyIndented) {
                const key = getKey(editor.o.direction, currentBox);
                processedElements.push(currentBox);
                let value = currentBox.style[key]
                    ? parseInt(currentBox.style[key], 10)
                    : 0;
                value +=
                    editor.o.indentMargin * (command === 'outdent' ? -1 : 1);
                currentBox.style[key] = value > 0 ? value + 'px' : '';
                if (!attr(currentBox, 'style')) {
                    attr(currentBox, 'style', null);
                }
            }
            editor.s.restore();
        });
        editor.synchronizeValues();
        return false;
    };
    editor.registerCommand('indent', {
        exec: callback,
        hotkeys: ['ctrl+]', 'cmd+]']
    });
    editor.registerCommand('outdent', {
        exec: callback,
        hotkeys: ['ctrl+[', 'cmd+[']
    });
}
pluginSystem.add('indent', indent);
