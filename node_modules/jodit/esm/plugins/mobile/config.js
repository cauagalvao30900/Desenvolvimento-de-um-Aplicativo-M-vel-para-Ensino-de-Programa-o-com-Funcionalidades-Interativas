/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module plugins/mobile
 */
import { Config } from "jodit/esm/config.js";
import * as consts from "jodit/esm/core/constants.js";
import { makeCollection } from "jodit/esm/modules/toolbar/factory.js";
import { splitArray } from "jodit/esm/core/helpers/index.js";
import { ToolbarCollection } from "jodit/esm/modules/toolbar/collection/collection.js";
Config.prototype.mobileTapTimeout = 300;
Config.prototype.toolbarAdaptive = true;
Config.prototype.buttonsMD = [
    {
        group: 'font-style',
        buttons: []
    },
    {
        group: 'list',
        buttons: []
    },
    {
        group: 'font',
        buttons: []
    },
    '---',
    {
        group: 'media',
        buttons: []
    },
    '\n',
    {
        group: 'state',
        buttons: []
    },
    {
        group: 'insert',
        buttons: []
    },
    {
        group: 'indent',
        buttons: []
    },
    {
        group: 'color',
        buttons: []
    },
    '---',
    {
        group: 'history',
        buttons: []
    },
    {
        group: 'other',
        buttons: []
    },
    '|',
    'dots'
];
Config.prototype.buttonsSM = [
    {
        group: 'font-style',
        buttons: []
    },
    {
        group: 'list',
        buttons: []
    },
    '---',
    {
        group: 'font',
        buttons: []
    },
    '\n',
    {
        group: 'state',
        buttons: []
    },
    {
        group: 'indent',
        buttons: []
    },
    {
        group: 'color',
        buttons: []
    },
    '---',
    {
        group: 'history',
        buttons: []
    },
    '|',
    'dots'
];
Config.prototype.buttonsXS = [
    {
        group: 'font-style',
        buttons: []
    },
    {
        group: 'list',
        buttons: []
    },
    '---',
    {
        group: 'font',
        buttons: []
    },
    {
        group: 'color',
        buttons: []
    },
    '---',
    'dots'
];
Config.prototype.controls.dots = {
    mode: consts.MODE_SOURCE + consts.MODE_WYSIWYG,
    popup: (editor, current, close, button) => {
        let store = button.control.data;
        if (store === undefined) {
            store = {
                toolbar: makeCollection(editor),
                rebuild: () => {
                    if (button) {
                        const buttons = editor.e.fire('getDiffButtons.mobile', button.closest(ToolbarCollection));
                        if (buttons && store) {
                            store.toolbar.build(splitArray(buttons));
                            const w = editor.toolbar?.firstButton?.container
                                .offsetWidth || 36;
                            store.toolbar.container.style.width =
                                (w + 4) * 3 + 'px';
                        }
                    }
                }
            };
            button.control.data = store;
        }
        store.rebuild();
        return store.toolbar;
    },
    tooltip: 'Show all'
};
