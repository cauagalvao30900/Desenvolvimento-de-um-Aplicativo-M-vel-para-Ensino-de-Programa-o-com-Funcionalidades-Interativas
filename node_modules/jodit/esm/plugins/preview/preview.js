/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * [[include:plugins/preview/README.md]]
 * @packageDocumentation
 * @module plugins/preview
 */
import { MODE_SOURCE, MODE_WYSIWYG } from "jodit/esm/core/constants.js";
import { previewBox } from "jodit/esm/core/helpers/utils/print.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import { Config } from "jodit/esm/config.js";
Config.prototype.controls.preview = {
    icon: 'eye',
    command: 'preview',
    mode: MODE_SOURCE + MODE_WYSIWYG,
    tooltip: 'Preview'
};
export function preview(editor) {
    editor.registerButton({
        name: 'preview'
    });
    editor.registerCommand('preview', (_, _1, defaultValue) => {
        const dialog = editor.dlg();
        dialog
            .setSize(1024, 600)
            .open('', editor.i18n('Preview'))
            .setModal(true);
        const [, onDestrcut] = previewBox(editor, defaultValue, 'px', dialog.getElm('content'));
        dialog.e.on(dialog, 'afterClose', onDestrcut);
    });
}
pluginSystem.add('preview', preview);
