/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { TEXT_PLAIN } from "jodit/esm/core/constants.js";
import { getContainer } from "jodit/esm/core/global.js";
import { attr, isJoditObject } from "jodit/esm/core/helpers/index.js";
import { Dom } from "jodit/esm/core/dom/index.js";
import { dataURItoBlob, sendFiles } from "./index";
export function processOldBrowserDrag(self, cData, handlerSuccess, handlerError, onFinally) {
    if (cData && (!cData.types.length || cData.types[0] !== TEXT_PLAIN)) {
        const div = self.j.c.div('', {
            tabindex: -1,
            style: 'left: -9999px; top: 0; width: 0; height: 100%;line-height: 140%; ' +
                'overflow: hidden; position: fixed; z-index: 2147483647; word-break: break-all;',
            contenteditable: true
        });
        getContainer(self.j, self.constructor).appendChild(div);
        const selection = isJoditObject(self.j) ? self.j.s.save() : null, restore = () => selection && isJoditObject(self.j) && self.j.s.restore();
        div.focus();
        self.j.async.setTimeout(() => {
            const child = div.firstChild;
            Dom.safeRemove(div);
            if (child && child.hasAttribute('src')) {
                const src = attr(child, 'src') || '';
                restore();
                sendFiles(self, [dataURItoBlob(src)], handlerSuccess, handlerError).finally(onFinally);
            }
        }, self.j.defaultTimeout);
    }
}
