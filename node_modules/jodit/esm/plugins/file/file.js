/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { Config } from "jodit/esm/config.js";
import { Dom } from "jodit/esm/core/dom/dom.js";
import { FileSelectorWidget } from "jodit/esm/modules/widget/index.js";
import { pluginSystem } from "jodit/esm/core/global.js";
Config.prototype.controls.file = {
    popup: (editor, current, close) => {
        const insert = (url, title = '') => {
            editor.s.insertNode(editor.createInside.fromHTML(`<a href="${url}" title="${title}">${title || url}</a>`));
        };
        let sourceAnchor = null;
        if (current &&
            (Dom.isTag(current, 'a') ||
                Dom.closest(current, 'a', editor.editor))) {
            sourceAnchor = Dom.isTag(current, 'a')
                ? current
                : Dom.closest(current, 'a', editor.editor);
        }
        return FileSelectorWidget(editor, {
            filebrowser: (data) => {
                data.files &&
                    data.files.forEach(file => insert(data.baseurl + file));
                close();
            },
            upload: true,
            url: (url, text) => {
                if (sourceAnchor) {
                    sourceAnchor.setAttribute('href', url);
                    sourceAnchor.setAttribute('title', text);
                }
                else {
                    insert(url, text);
                }
                close();
            }
        }, sourceAnchor, close, false);
    },
    tags: ['a'],
    tooltip: 'Insert file'
};
export function file(editor) {
    editor.registerButton({
        name: 'file',
        group: 'media'
    });
}
pluginSystem.add('file', file);
