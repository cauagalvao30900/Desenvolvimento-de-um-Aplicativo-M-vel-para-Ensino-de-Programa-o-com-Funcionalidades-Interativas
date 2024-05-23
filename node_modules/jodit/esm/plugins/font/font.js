/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { normalizeSize } from "jodit/esm/core/helpers/index.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import "./config";
/**
 * Process commands `fontsize` and `fontname`
 */
export function font(editor) {
    editor
        .registerButton({
        name: 'font',
        group: 'font'
    })
        .registerButton({
        name: 'fontsize',
        group: 'font'
    });
    const callback = (command, second, third) => {
        switch (command) {
            case 'fontsize':
                editor.s.commitStyle({
                    attributes: {
                        style: {
                            fontSize: normalizeSize(third, editor.o.defaultFontSizePoints)
                        }
                    }
                });
                break;
            case 'fontname':
                editor.s.commitStyle({
                    attributes: {
                        style: {
                            fontFamily: third
                        }
                    }
                });
                break;
        }
        editor.synchronizeValues();
        return false;
    };
    editor
        .registerCommand('fontsize', callback)
        .registerCommand('fontname', callback);
}
pluginSystem.add('font', font);
