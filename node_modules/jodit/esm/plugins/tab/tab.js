/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Plugin } from "jodit/esm/core/plugin/index.js";
import { watch } from "jodit/esm/core/decorators/index.js";
import { KEY_TAB } from "jodit/esm/core/constants.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import { onTabInsideLi } from "./cases";
import "./config";
class tab extends Plugin {
    afterInit(jodit) { }
    __onTab(event) {
        if (event.key === KEY_TAB && this.__onShift(event.shiftKey)) {
            return false;
        }
    }
    __onCommand(command) {
        if ((command === 'indent' || command === 'outdent') &&
            this.__onShift(command === 'outdent')) {
            return false;
        }
    }
    __onShift(shift) {
        const res = onTabInsideLi(this.j, shift);
        if (res) {
            this.j.e.fire('afterTab', shift);
        }
        return res;
    }
    beforeDestruct(jodit) { }
}
__decorate([
    watch(':keydown.tab')
], tab.prototype, "__onTab", null);
__decorate([
    watch(':beforeCommand.tab')
], tab.prototype, "__onCommand", null);
pluginSystem.add('tab', tab);
