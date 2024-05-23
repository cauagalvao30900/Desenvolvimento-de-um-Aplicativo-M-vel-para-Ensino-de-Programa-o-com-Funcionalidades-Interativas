/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import * as consts from "jodit/esm/core/constants.js";
import { Plugin } from "jodit/esm/core/plugin/plugin.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import { Icon } from "jodit/esm/core/ui/icon.js";
import redoIcon from "./icons/redo.svg.js";
import undoIcon from "./icons/undo.svg.js";
Icon.set('redo', redoIcon).set('undo', undoIcon);
Config.prototype.controls.redo = {
    mode: consts.MODE_SPLIT,
    isDisabled: (editor) => !editor.history.canRedo(),
    tooltip: 'Redo'
};
Config.prototype.controls.undo = {
    mode: consts.MODE_SPLIT,
    isDisabled: (editor) => !editor.history.canUndo(),
    tooltip: 'Undo'
};
/**
 * Custom process Redo and Undo functionality
 */
export class redoUndo extends Plugin {
    constructor() {
        super(...arguments);
        /** @override */
        this.buttons = [
            {
                name: 'undo',
                group: 'history'
            },
            {
                name: 'redo',
                group: 'history'
            }
        ];
    }
    beforeDestruct() {
        // do nothing
    }
    afterInit(editor) {
        const callback = (command) => {
            editor.history[command]();
            return false;
        };
        editor.registerCommand('redo', {
            exec: callback,
            hotkeys: ['ctrl+y', 'ctrl+shift+z', 'cmd+y', 'cmd+shift+z']
        });
        editor.registerCommand('undo', {
            exec: callback,
            hotkeys: ['ctrl+z', 'cmd+z']
        });
    }
}
pluginSystem.add('redoUndo', redoUndo);
