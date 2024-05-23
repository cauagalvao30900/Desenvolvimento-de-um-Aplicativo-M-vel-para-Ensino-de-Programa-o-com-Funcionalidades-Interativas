/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { memorizeExec } from "jodit/esm/core/helpers/index.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import lineHeightIcon from "./line-height.svg.js";
Config.prototype.defaultLineHeight = null;
Icon.set('line-height', lineHeightIcon);
Config.prototype.controls.lineHeight = {
    command: 'applyLineHeight',
    tags: ['ol'],
    tooltip: 'Line height',
    list: [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2],
    exec: (editor, event, { control }) => memorizeExec(editor, event, { control }, (value) => value)
};
