/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { css, dataBind } from "jodit/esm/core/helpers/index.js";
import { ColorPickerWidget, TabsWidget } from "jodit/esm/modules/widget/index.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import { Dom } from "jodit/esm/core/dom/dom.js";
import brushIcon from "./brush.svg.js";
Icon.set('brush', brushIcon);
Config.prototype.controls.brush = {
    update(editor, button) {
        const color = dataBind(button, 'color');
        const update = (key, value) => {
            if (value && value !== css(editor.editor, key).toString()) {
                button.state.icon.fill = value;
                return;
            }
        };
        if (color) {
            const mode = dataBind(button, 'color');
            update(mode === 'color' ? mode : 'background-color', color);
            return;
        }
        const current = editor.s.current();
        if (current && !button.state.disabled) {
            const currentBpx = Dom.closest(current, Dom.isElement, editor.editor) || editor.editor;
            update('color', css(currentBpx, 'color').toString());
            update('background-color', css(currentBpx, 'background-color').toString());
        }
        button.state.icon.fill = '';
        button.state.activated = false;
    },
    popup: (editor, current, close, button) => {
        let colorHEX = '', bg_color = '', tabs = [], currentElement = null;
        if (current && current !== editor.editor && Dom.isNode(current)) {
            if (Dom.isElement(current) &&
                editor.s.isCollapsed() &&
                !Dom.isTag(current, new Set(['br', 'hr']))) {
                currentElement = current;
            }
            Dom.up(current, (node) => {
                if (Dom.isHTMLElement(node)) {
                    const color = css(node, 'color', true), background = css(node, 'background-color', true);
                    if (color) {
                        colorHEX = color.toString();
                        return true;
                    }
                    if (background) {
                        bg_color = background.toString();
                        return true;
                    }
                }
            }, editor.editor);
        }
        const backgroundTag = ColorPickerWidget(editor, (value) => {
            if (!currentElement) {
                editor.execCommand('background', false, value);
            }
            else {
                currentElement.style.backgroundColor = value;
            }
            dataBind(button, 'color', value);
            dataBind(button, 'color-mode', 'background');
            close();
        }, bg_color);
        const colorTab = ColorPickerWidget(editor, (value) => {
            if (!currentElement) {
                editor.execCommand('forecolor', false, value);
            }
            else {
                currentElement.style.color = value;
            }
            dataBind(button, 'color', value);
            dataBind(button, 'color-mode', 'color');
            close();
        }, colorHEX);
        tabs = [
            {
                name: 'Background',
                content: backgroundTag
            },
            {
                name: 'Text',
                content: colorTab
            }
        ];
        if (editor.o.colorPickerDefaultTab !== 'background') {
            tabs = tabs.reverse();
        }
        return TabsWidget(editor, tabs, currentElement);
    },
    exec(jodit, current, { button }) {
        const mode = dataBind(button, 'color-mode'), color = dataBind(button, 'color');
        if (!mode) {
            return false;
        }
        if (current &&
            current !== jodit.editor &&
            Dom.isNode(current) &&
            Dom.isElement(current)) {
            switch (mode) {
                case 'color':
                    current.style.color = color;
                    break;
                case 'background':
                    current.style.backgroundColor = color;
                    break;
            }
        }
        else {
            jodit.execCommand(mode === 'background' ? mode : 'forecolor', false, color);
        }
    },
    tooltip: 'Fill color or set the text color'
};
