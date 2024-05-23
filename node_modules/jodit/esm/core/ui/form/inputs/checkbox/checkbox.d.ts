/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module ui/form
 */

import type { IViewBased, IUICheckBox } from "jodit/esm/types";
import { UIInput } from "jodit/esm/core/ui/form/inputs/input/input";
export declare class UICheckbox extends UIInput implements IUICheckBox {
    /** @override */
    className(): string;
    /** @override */
    static defaultState: IUICheckBox['state'];
    /** @override */
    state: IUICheckBox['state'];
    /** @override */
    protected render(): HTMLElement;
    /** @override **/
    constructor(jodit: IViewBased, options: Partial<IUICheckBox['state']>);
    protected onChangeChecked(): void;
    protected onChangeNativeCheckBox(): void;
    protected onChangeSwitch(): void;
}
