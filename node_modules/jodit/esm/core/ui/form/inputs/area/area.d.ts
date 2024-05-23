/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * @module ui/form
 */

import type { IUITextArea, IViewBased, IUIInput } from "jodit/esm/types";
import { UIInput } from "jodit/esm/core/ui/form/inputs/input/input";
export declare class UITextArea extends UIInput implements IUITextArea {
    /** @override */
    className(): string;
    /** @override */
    static defaultState: IUITextArea['state'];
    nativeInput: HTMLTextAreaElement;
    protected createNativeInput(options?: Partial<this['state']>): IUIInput['nativeInput'];
    /** @override */
    state: IUITextArea['state'];
    constructor(jodit: IViewBased, state: Partial<IUITextArea['state']>);
    protected onChangeStateSize(): void;
}
