/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
import { isInitable } from "jodit/esm/core/helpers/checker/index.js";
import { loadStyle } from "./load";
import { IS_PROD } from "jodit/esm/core/constants.js";
import { getContainer } from "jodit/esm/core/global.js";
/**
 * Init plugin if it has not dependencies in another case wait requires plugins will be init
 * @private
 */
export function init(jodit, pluginName, plugin, instance, doneList, waitingList) {
    if (isInitable(instance)) {
        try {
            instance.init(jodit);
        }
        catch (e) {
            console.error(e);
            if (!IS_PROD) {
                throw e;
            }
        }
    }
    doneList.set(pluginName, instance);
    waitingList.delete(pluginName);
    if (instance.hasStyle) {
        loadStyle(jodit, pluginName).catch(e => {
            !IS_PROD && console.error(e);
        });
    }
    if (instance.styles) {
        const style = getContainer(jodit, pluginName, 'style');
        style.innerHTML = instance.styles;
    }
}
