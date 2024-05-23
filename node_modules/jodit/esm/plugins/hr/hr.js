/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { Dom } from "jodit/esm/core/dom/index.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import hrIcon from "./hr.svg.js";
Icon.set('hr', hrIcon);
Config.prototype.controls.hr = {
    command: 'insertHorizontalRule',
    tags: ['hr'],
    tooltip: 'Insert Horizontal Line'
};
export function hr(editor) {
    editor.registerButton({
        name: 'hr',
        group: 'insert'
    });
    editor.registerCommand('insertHorizontalRule', () => {
        const elm = editor.createInside.element('hr');
        editor.s.insertNode(elm, false, false);
        const block = Dom.closest(elm.parentElement, Dom.isBlock, editor.editor);
        if (block && Dom.isEmpty(block) && block !== editor.editor) {
            Dom.after(block, elm);
            Dom.safeRemove(block);
        }
        let p = Dom.next(elm, Dom.isBlock, editor.editor, false);
        if (!p) {
            p = editor.createInside.element(editor.o.enter);
            Dom.after(elm, p);
        }
        editor.s.setCursorIn(p);
        return false;
    });
}
pluginSystem.add('hr', hr);
