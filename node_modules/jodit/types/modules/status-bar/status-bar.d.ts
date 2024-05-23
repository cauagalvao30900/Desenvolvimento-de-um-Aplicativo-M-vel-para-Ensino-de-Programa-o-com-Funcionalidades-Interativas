/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * [[include:modules/status-bar/README.md]]
 * @packageDocumentation
 * @module modules/status-bar
 */

import type { IJodit, IStatusBar, IDictionary, ModType } from "jodit/esm/types";
import { ViewComponent } from "jodit/esm/core/component";
import { Mods } from "jodit/esm/core/traits/mods";
import { Elms } from "jodit/esm/core/traits/elms";
export interface StatusBar extends Mods, Elms {
}
export declare class StatusBar extends ViewComponent<IJodit> implements IStatusBar {
    readonly target: HTMLElement;
    className(): string;
    container: HTMLDivElement;
    /**
     * Hide statusbar
     */
    hide(): void;
    /**
     * Show statusbar
     */
    show(): void;
    /**
     * Status bar is shown
     */
    get isShown(): boolean;
    readonly mods: IDictionary<ModType>;
    /**
     * Height of statusbar
     */
    getHeight(): number;
    private findEmpty;
    /**
     * Add element in statusbar
     */
    append(child: HTMLElement, inTheRight?: boolean): void;
    constructor(jodit: IJodit, target: HTMLElement);
    destruct(): void;
}
