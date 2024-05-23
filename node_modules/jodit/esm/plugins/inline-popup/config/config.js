/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import * as addcolumn from "jodit/esm/plugins/inline-popup/icons/addcolumn.svg.js";
import * as addrow from "jodit/esm/plugins/inline-popup/icons/addrow.svg.js";
import * as merge from "jodit/esm/plugins/inline-popup/icons/merge.svg.js";
import * as th from "jodit/esm/plugins/inline-popup/icons/th.svg.js";
import * as splitg from "jodit/esm/plugins/inline-popup/icons/splitg.svg.js";
import * as splitv from "jodit/esm/plugins/inline-popup/icons/splitv.svg.js";
import * as thList from "jodit/esm/plugins/inline-popup/icons/th-list.svg.js";
import a from "./items/a";
import img from "./items/img";
import cells from "./items/cells";
import toolbar from "./items/toolbar";
import jodit from "./items/iframe";
import iframe from "./items/iframe";
import joditMedia from "./items/iframe";
Config.prototype.toolbarInline = true;
Config.prototype.toolbarInlineForSelection = false;
Config.prototype.toolbarInlineDisableFor = [];
Config.prototype.toolbarInlineDisabledButtons = ['source'];
Icon.set('addcolumn', addcolumn.default)
    .set('addrow', addrow.default)
    .set('merge', merge.default)
    .set('th', th.default)
    .set('splitg', splitg.default)
    .set('splitv', splitv.default)
    .set('th-list', thList.default);
Config.prototype.popup = {
    a,
    img,
    cells,
    toolbar,
    jodit,
    iframe,
    'jodit-media': joditMedia,
    selection: [
        'bold',
        'underline',
        'italic',
        'ul',
        'ol',
        '\n',
        'outdent',
        'indent',
        'fontsize',
        'brush',
        'cut',
        '\n',
        'paragraph',
        'link',
        'align',
        'dots'
    ]
};
