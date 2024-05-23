/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { Dom } from "jodit/esm/core/dom/index.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import { getKey } from "./helpers";
import indentIcon from "./icons/indent.svg.js";
import outdentIcon from "./icons/outdent.svg.js";
Icon.set('indent', indentIcon).set('outdent', outdentIcon);
Config.prototype.controls.indent = {
    tooltip: 'Increase Indent'
};
Config.prototype.controls.outdent = {
    isDisabled: (editor) => {
        const current = editor.s.current();
        if (current) {
            const currentBox = Dom.closest(current, Dom.isBlock, editor.editor);
            if (currentBox) {
                const arrow = getKey(editor.o.direction, currentBox);
                return (!currentBox.style[arrow] ||
                    parseInt(currentBox.style[arrow], 10) <= 0);
            }
        }
        return true;
    },
    tooltip: 'Decrease Indent'
};
Config.prototype.indentMargin = 10;
