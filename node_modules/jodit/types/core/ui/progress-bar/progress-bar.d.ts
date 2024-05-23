/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * [[include:core/ui/progress-bar/README.md]]
 * @packageDocumentation
 * @module ui/progress-bar
 */

import type { IProgressBar } from "jodit/esm/types";
import { UIElement } from "jodit/esm/core/ui/element";
export declare class ProgressBar extends UIElement implements IProgressBar {
    /** @override */
    className(): string;
    /** @override */
    protected render(): string;
    /**
     * Show progress bar
     */
    show(): IProgressBar;
    hide(): IProgressBar;
    progress(percentage: number): IProgressBar;
    destruct(): any;
}
