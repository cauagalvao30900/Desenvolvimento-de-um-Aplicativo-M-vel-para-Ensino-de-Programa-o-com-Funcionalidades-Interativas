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
/**
 * [[include:plugins/image-properties/README.md]]
 * @packageDocumentation
 * @module plugins/image-properties
 */
import { Dom, Popup, Icon, Plugin } from "jodit/esm/modules/index.js";
import { css, trim, attr, position, isArray, markOwner, isString, refs, kebabCase, isNumeric, hAlignElement } from "jodit/esm/core/helpers/index.js";
import { FileSelectorWidget, TabsWidget } from "jodit/esm/modules/widget/index.js";
import { Button } from "jodit/esm/core/ui/button/index.js";
import { watch, autobind } from "jodit/esm/core/decorators/index.js";
import { openImageEditor } from "jodit/esm/modules/image-editor/image-editor.js";
import { pluginSystem } from "jodit/esm/core/global.js";
import { form } from "./templates/form";
import { mainTab } from "./templates/main-tab";
import { positionTab } from "./templates/position-tab";
import "./config";
/**
 * Plug-in for image editing window
 *
 * @example
 * ```javascript
 * const editor = Jodit.make('#editor', {
 *     image: {
 *         editSrc: false,
 *         editLink: false
 *     }
 * });
 * ```
 */
const normalSizeToString = (value) => {
    value = trim(value);
    return /^[0-9]+$/.test(value) ? value + 'px' : value;
};
const normalSizeFromString = (value) => {
    return /^[-+]?[0-9.]+px$/.test(value.toString())
        ? parseFloat(value.toString())
        : value;
};
/**
 * Show dialog with image's options
 */
export class imageProperties extends Plugin {
    constructor() {
        super(...arguments);
        this.state = {
            image: new Image(),
            get ratio() {
                return this.image.naturalWidth / this.image.naturalHeight || 1;
            },
            sizeIsLocked: true,
            marginIsLocked: true
        };
        this.activeTabState = {
            __activeTab: 'Image'
        };
    }
    onChangeMarginIsLocked() {
        if (!this.form) {
            return;
        }
        const { marginRight, marginBottom, marginLeft, lockMargin } = refs(this.form);
        [marginRight, marginBottom, marginLeft].forEach(elm => {
            attr(elm, 'disabled', this.state.marginIsLocked || null);
        });
        lockMargin.innerHTML = Icon.get(this.state.marginIsLocked ? 'lock' : 'unlock');
    }
    onChangeSizeIsLocked() {
        if (!this.form) {
            return;
        }
        const { lockSize, imageWidth } = refs(this.form);
        lockSize.innerHTML = Icon.get(this.state.sizeIsLocked ? 'lock' : 'unlock');
        lockSize.classList.remove('jodit-properties__lock');
        lockSize.classList.remove('jodit-properties__unlock');
        lockSize.classList.add(this.state.sizeIsLocked
            ? 'jodit-properties__lock'
            : 'jodit-properties__unlock');
        this.j.e.fire(imageWidth, 'change');
    }
    /**
     * Open dialog editing image properties
     *
     * @example
     * ```javascript
     * const editor = Jodit.makeJodit('#editor');
     *     img = editor.createInside.element('img');
     *
     * img.setAttribute('src', 'images/some-image.png');
     * editor.s.insertImage(img);
     * // open the properties of the editing window
     * editor.events.fire('openImageProperties', img);
     * ```
     */
    open() {
        this.makeForm();
        this.activeTabState.__activeTab = 'Image';
        this.j.e.fire('hidePopup');
        markOwner(this.j, this.dialog.container);
        this.state.marginIsLocked = true;
        this.state.sizeIsLocked = true;
        this.onChangeMarginIsLocked();
        this.onChangeSizeIsLocked();
        this.updateValues();
        this.dialog.open().setModal(true).setPosition();
        return false;
    }
    /**
     * Create form for edit image properties
     */
    makeForm() {
        if (this.dialog) {
            return;
        }
        this.dialog = this.j.dlg({
            minWidth: Math.min(400, screen.width),
            minHeight: 590,
            buttons: ['fullsize', 'dialog.close']
        });
        const editor = this.j, opt = editor.o, i18n = editor.i18n.bind(editor), buttons = {
            check: Button(editor, 'ok', 'Apply', 'primary'),
            remove: Button(editor, 'bin', 'Delete')
        };
        editor.e.on(this.dialog, 'afterClose', () => {
            if (this.state.image.parentNode &&
                opt.image.selectImageAfterClose) {
                editor.s.select(this.state.image);
            }
        });
        buttons.remove.onAction(() => {
            editor.s.removeNode(this.state.image);
            this.dialog.close();
        });
        const { dialog } = this;
        dialog.setHeader(i18n('Image properties'));
        const mainForm = form(editor);
        this.form = mainForm;
        dialog.setContent(mainForm);
        const { tabsBox } = refs(this.form);
        if (tabsBox) {
            tabsBox.appendChild(TabsWidget(editor, [
                { name: 'Image', content: mainTab(editor) },
                { name: 'Advanced', content: positionTab(editor) }
            ], this.activeTabState));
        }
        buttons.check.onAction(this.onApply);
        const { changeImage, editImage } = refs(this.form);
        editor.e.on(changeImage, 'click', this.openImagePopup);
        if (opt.image.useImageEditor) {
            editor.e.on(editImage, 'click', this.openImageEditor);
        }
        const { lockSize, lockMargin, imageWidth, imageHeight } = refs(mainForm);
        if (lockSize) {
            editor.e.on(lockSize, 'click', () => {
                this.state.sizeIsLocked = !this.state.sizeIsLocked;
            });
        }
        editor.e.on(lockMargin, 'click', (e) => {
            this.state.marginIsLocked = !this.state.marginIsLocked;
            e.preventDefault();
        });
        const changeSizes = (event) => {
            if (!isNumeric(imageWidth.value) || !isNumeric(imageHeight.value)) {
                return;
            }
            const w = parseFloat(imageWidth.value), h = parseFloat(imageHeight.value);
            if (event.target === imageWidth) {
                imageHeight.value = Math.round(w / this.state.ratio).toString();
            }
            else {
                imageWidth.value = Math.round(h * this.state.ratio).toString();
            }
        };
        editor.e.on([imageWidth, imageHeight], 'change keydown mousedown paste', (event) => {
            if (!this.state.sizeIsLocked) {
                return;
            }
            editor.async.setTimeout(changeSizes.bind(this, event), {
                timeout: editor.defaultTimeout,
                label: 'image-properties-changeSize'
            });
        });
        dialog.setFooter([buttons.remove, buttons.check]);
        dialog.setSize(this.j.o.image.dialogWidth);
    }
    /**
     * Set input values from image
     */
    updateValues() {
        const opt = this.j.o;
        const { image } = this.state;
        const { marginTop, marginRight, marginBottom, marginLeft, lockMargin, imageSrc, id, classes, align, style, imageTitle, imageAlt, borderRadius, imageLink, imageWidth, imageHeight, imageLinkOpenInNewTab, imageViewSrc, lockSize } = refs(this.form);
        const updateLock = () => {
            lockMargin.checked = this.state.marginIsLocked;
            lockSize.checked = this.state.sizeIsLocked;
        }, updateAlign = () => {
            if (image.style.cssFloat &&
                ['left', 'right'].indexOf(image.style.cssFloat.toLowerCase()) !== -1) {
                align.value = css(image, 'float');
            }
            else {
                if (css(image, 'display') === 'block' &&
                    image.style.marginLeft === 'auto' &&
                    image.style.marginRight === 'auto') {
                    align.value = 'center';
                }
            }
        }, updateBorderRadius = () => {
            borderRadius.value = (parseInt(image.style.borderRadius || '0', 10) || '0').toString();
        }, updateId = () => {
            id.value = attr(image, 'id') || '';
        }, updateStyle = () => {
            style.value = attr(image, 'style') || '';
        }, updateClasses = () => {
            classes.value = (attr(image, 'class') || '').replace(/jodit_focused_image[\s]*/, '');
        }, updateMargins = () => {
            if (!opt.image.editMargins) {
                return;
            }
            let equal = true, wasEmptyField = false;
            [marginTop, marginRight, marginBottom, marginLeft].forEach(elm => {
                const id = attr(elm, 'data-ref') || '';
                let value = image.style.getPropertyValue(kebabCase(id));
                if (!value) {
                    wasEmptyField = true;
                    elm.value = '';
                    return;
                }
                if (/^[0-9]+(px)?$/.test(value)) {
                    value = parseInt(value, 10);
                }
                elm.value = value.toString() || '';
                if ((wasEmptyField && elm.value) ||
                    (equal &&
                        id !== 'marginTop' &&
                        elm.value !== marginTop.value)) {
                    equal = false;
                }
            });
            this.state.marginIsLocked = equal;
        }, updateSizes = () => {
            const width = attr(image, 'width') ||
                css(image, 'width', true) ||
                false, height = attr(image, 'height') ||
                css(image, 'height', true) ||
                false;
            imageWidth.value =
                width !== false
                    ? normalSizeFromString(width).toString()
                    : image.offsetWidth.toString();
            imageHeight.value =
                height !== false
                    ? normalSizeFromString(height).toString()
                    : image.offsetHeight.toString();
            this.state.sizeIsLocked = (() => {
                if (!isNumeric(imageWidth.value) ||
                    !isNumeric(imageHeight.value)) {
                    return false;
                }
                const w = parseFloat(imageWidth.value), h = parseFloat(imageHeight.value);
                return Math.abs(w - h * this.state.ratio) < 1;
            })();
        }, updateText = () => {
            imageTitle.value = attr(image, 'title') || '';
            imageAlt.value = attr(image, 'alt') || '';
            const a = Dom.closest(image, 'a', this.j.editor);
            if (a) {
                imageLink.value = attr(a, 'href') || '';
                imageLinkOpenInNewTab.checked =
                    attr(a, 'target') === '_blank';
            }
            else {
                imageLink.value = '';
                imageLinkOpenInNewTab.checked = false;
            }
        }, updateSrc = () => {
            imageSrc.value = attr(image, 'src') || '';
            if (imageViewSrc) {
                attr(imageViewSrc, 'src', attr(image, 'src') || '');
            }
        };
        updateLock();
        updateSrc();
        updateText();
        updateSizes();
        updateMargins();
        updateClasses();
        updateId();
        updateBorderRadius();
        updateAlign();
        updateStyle();
    }
    /**
     * Apply form's values to image
     */
    onApply() {
        const { style, imageSrc, borderRadius, imageTitle, imageAlt, imageLink, imageWidth, imageHeight, marginTop, marginRight, marginBottom, marginLeft, imageLinkOpenInNewTab, align, classes, id } = refs(this.form);
        const opt = this.j.o;
        const { image } = this.state;
        // styles
        if (opt.image.editStyle) {
            attr(image, 'style', style.value || null);
        }
        // Src
        if (imageSrc.value) {
            attr(image, 'src', imageSrc.value);
        }
        else {
            Dom.safeRemove(image);
            this.dialog.close();
            return;
        }
        // Border radius
        if (borderRadius.value !== '0' && /^[0-9]+$/.test(borderRadius.value)) {
            image.style.borderRadius = borderRadius.value + 'px';
        }
        else {
            image.style.borderRadius = '';
        }
        // Title
        attr(image, 'title', imageTitle.value || null);
        // Alt
        attr(image, 'alt', imageAlt.value || null);
        // Link
        let link = Dom.closest(image, 'a', this.j.editor);
        if (imageLink.value) {
            if (!link) {
                link = Dom.wrap(image, 'a', this.j.createInside);
            }
            attr(link, 'href', imageLink.value);
            attr(link, 'target', imageLinkOpenInNewTab.checked ? '_blank' : null);
        }
        else {
            if (link && link.parentNode) {
                link.parentNode.replaceChild(image, link);
            }
        }
        // Size
        if (imageWidth.value !== image.offsetWidth.toString() ||
            imageHeight.value !== image.offsetHeight.toString()) {
            const updatedtWidth = trim(imageWidth.value)
                ? normalSizeToString(imageWidth.value)
                : null;
            const updatedHeight = trim(imageHeight.value)
                ? normalSizeToString(imageHeight.value)
                : null;
            css(image, {
                width: updatedtWidth,
                height: updatedHeight
            });
            attr(image, 'width', attr(image, 'width') ? updatedtWidth : null);
            attr(image, 'height', attr(image, 'height') ? updatedHeight : null);
        }
        const margins = [marginTop, marginRight, marginBottom, marginLeft];
        if (opt.image.editMargins) {
            if (!this.state.marginIsLocked) {
                margins.forEach((margin) => {
                    const side = attr(margin, 'data-ref') || '';
                    css(image, side, normalSizeToString(margin.value));
                });
            }
            else {
                css(image, 'margin', normalSizeToString(marginTop.value));
            }
        }
        if (opt.image.editClass) {
            attr(image, 'class', classes.value || null);
        }
        if (opt.image.editId) {
            attr(image, 'id', id.value || null);
        }
        if (opt.image.editAlign) {
            hAlignElement(image, align.value);
        }
        this.j.synchronizeValues();
        this.dialog.close();
    }
    /**
     * Open image editor dialog
     */
    openImageEditor() {
        const url = attr(this.state.image, 'src') || '', a = this.j.c.element('a'), loadExternal = () => {
            if (a.host !== location.host) {
                this.j.confirm('You can only edit your own images. Download this image on the host?', yes => {
                    if (yes && this.j.uploader) {
                        this.j.uploader.uploadRemoteImage(a.href.toString(), resp => {
                            this.j.alert('The image has been successfully uploaded to the host!', () => {
                                if (isString(resp.newfilename)) {
                                    attr(this.state.image, 'src', resp.baseurl +
                                        resp.newfilename);
                                    this.updateValues();
                                }
                            });
                        }, error => {
                            this.j.alert('There was an error loading %s', error.message);
                        });
                    }
                });
                return;
            }
        };
        a.href = url;
        this.j.filebrowser.dataProvider
            .getPathByUrl(a.href.toString())
            .then(resp => {
            openImageEditor.call(this.j.filebrowser, a.href, resp.name, resp.path, resp.source, () => {
                const timestamp = new Date().getTime();
                attr(this.state.image, 'src', url +
                    (url.indexOf('?') !== -1 ? '' : '?') +
                    '&_tmp=' +
                    timestamp.toString());
                this.updateValues();
            }, error => {
                this.j.alert(error.message);
            });
        })
            .catch(error => {
            this.j.alert(error.message, loadExternal);
        });
    }
    /**
     * Open popup with filebrowser/uploader buttons for image
     */
    openImagePopup(event) {
        const popup = new Popup(this.j), { changeImage } = refs(this.form);
        popup.setZIndex(this.dialog.getZIndex() + 1);
        popup
            .setContent(FileSelectorWidget(this.j, {
            upload: (data) => {
                if (data.files && data.files.length) {
                    attr(this.state.image, 'src', data.baseurl + data.files[0]);
                }
                this.updateValues();
                popup.close();
            },
            filebrowser: (data) => {
                if (data &&
                    isArray(data.files) &&
                    data.files.length) {
                    attr(this.state.image, 'src', data.files[0]);
                    popup.close();
                    this.updateValues();
                }
            }
        }, this.state.image, popup.close))
            .open(() => position(changeImage));
        event.stopPropagation();
    }
    /** @override **/
    afterInit(editor) {
        const self = this;
        editor.e
            .on('afterConstructor changePlace', () => {
            editor.e
                .off(editor.editor, '.imageproperties')
                .on(editor.editor, 'dblclick.imageproperties', (e) => {
                const image = e.target;
                if (!Dom.isTag(image, 'img')) {
                    return;
                }
                if (editor.o.image.openOnDblClick) {
                    if (this.j.e.fire('openOnDblClick', image) ===
                        false) {
                        return;
                    }
                    self.state.image = image;
                    if (!editor.o.readonly) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        self.open();
                    }
                }
                else {
                    e.stopImmediatePropagation();
                    editor.s.select(image);
                }
            });
        })
            .on('openImageProperties.imageproperties', (image) => {
            this.state.image = image;
            this.open();
        });
    }
    /** @override */
    beforeDestruct(editor) {
        this.dialog && this.dialog.destruct();
        editor.e.off(editor.editor, '.imageproperties').off('.imageproperties');
    }
}
__decorate([
    watch('state.marginIsLocked')
], imageProperties.prototype, "onChangeMarginIsLocked", null);
__decorate([
    watch('state.sizeIsLocked')
], imageProperties.prototype, "onChangeSizeIsLocked", null);
__decorate([
    autobind
], imageProperties.prototype, "onApply", null);
__decorate([
    autobind
], imageProperties.prototype, "openImageEditor", null);
__decorate([
    autobind
], imageProperties.prototype, "openImagePopup", null);
pluginSystem.add('imageProperties', imageProperties);
