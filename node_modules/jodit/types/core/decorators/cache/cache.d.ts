/*!
 * Jodit Editor (https://xdsoft.net/jodit/)
 * Released under MIT see LICENSE.txt in the project root for license information.
 * Copyright (c) 2013-2024 Valeriy Chupurnov. All rights reserved. https://xdsoft.net
 */
/**
 * [[include:core/decorators/cache/README.md]]
 * @packageDocumentation
 * @module decorators/cache
 */
import type { IDictionary } from "jodit/esm/types";
export interface CachePropertyDescriptor<T, R> extends PropertyDescriptor {
    get?: (this: T) => R;
}
export declare function cache<T, R>(target: object, name: PropertyKey, descriptor: CachePropertyDescriptor<T, R>): void;
export declare function cacheHTML<T extends Function, R>(target: IDictionary, name: string, descriptor: CachePropertyDescriptor<T, R>): void;
