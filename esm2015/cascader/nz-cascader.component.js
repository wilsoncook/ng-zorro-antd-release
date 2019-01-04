/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { forwardRef, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { DEFAULT_DROPDOWN_POSITIONS } from '../core/overlay/overlay-position-map';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function toArray(value) {
    /** @type {?} */
    let ret;
    if (value == null) {
        ret = [];
    }
    else if (!Array.isArray(value)) {
        ret = [value];
    }
    else {
        ret = value;
    }
    return ret;
}
/**
 * @template T
 * @param {?} array1
 * @param {?} array2
 * @return {?}
 */
function arrayEquals(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }
    /** @type {?} */
    const len = array1.length;
    for (let i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
/** @type {?} */
const defaultDisplayRender = label => label.join(' / ');
const ɵ0 = defaultDisplayRender;
/**
 * @record
 */
export function CascaderOption() { }
function CascaderOption_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    CascaderOption.prototype.value;
    /** @type {?|undefined} */
    CascaderOption.prototype.label;
    /** @type {?|undefined} */
    CascaderOption.prototype.title;
    /** @type {?|undefined} */
    CascaderOption.prototype.disabled;
    /** @type {?|undefined} */
    CascaderOption.prototype.loading;
    /** @type {?|undefined} */
    CascaderOption.prototype.isLeaf;
    /** @type {?|undefined} */
    CascaderOption.prototype.parent;
    /** @type {?|undefined} */
    CascaderOption.prototype.children;
    /* TODO: handle strange member:
    [ key: string ]: any;
    */
}
/**
 * @record
 */
export function CascaderSearchOption() { }
function CascaderSearchOption_tsickle_Closure_declarations() {
    /** @type {?} */
    CascaderSearchOption.prototype.path;
}
/**
 * @record
 */
export function NzShowSearchOptions() { }
function NzShowSearchOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    NzShowSearchOptions.prototype.filter;
    /** @type {?|undefined} */
    NzShowSearchOptions.prototype.sorter;
}
export class NzCascaderComponent {
    /**
     * @param {?} elementRef
     * @param {?} cdr
     * @param {?} nzUpdateHostClassService
     */
    constructor(elementRef, cdr, nzUpdateHostClassService) {
        this.elementRef = elementRef;
        this.cdr = cdr;
        this.nzUpdateHostClassService = nzUpdateHostClassService;
        this.allowClear = true;
        this.autoFocus = false;
        this.disabled = false;
        this.enableCache = true;
        this.showArrow = true;
        this.showInput = true;
        this.size = 'default';
        this.prefixCls = 'ant-cascader';
        this.inputPrefixCls = 'ant-input';
        this.changeOnSelect = false;
        this.dropDownPosition = 'bottom';
        this.menuVisible = false;
        this.isLoading = false;
        this.isOpening = false;
        this.isFocused = false;
        this.isLabelRenderTemplate = false;
        this.labelRenderContext = {};
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.nzColumns = [];
        /**
         * 搜索相关的输入值
         */
        this._inputValue = '';
        // ngModel Access
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.positions = [...DEFAULT_DROPDOWN_POSITIONS];
        /**
         * If cascader is in search mode.
         */
        this.inSearch = false;
        /**
         * Hover text for the clear icon
         */
        this.nzClearText = 'Clear';
        /**
         * Expand column item when click or hover, one of 'click' 'hover'
         */
        this.nzExpandTrigger = 'click';
        /**
         * Specify content to show when no result matches.
         */
        this.nzNotFoundContent = 'Not Found';
        /**
         * Input placeholder
         */
        this.nzPlaceHolder = 'Please select';
        /**
         * Delay time to show when mouse enter, when `nzExpandTrigger` is `hover`.
         */
        this.nzMouseEnterDelay = 150;
        /**
         * Delay time to hide when mouse enter, when `nzExpandTrigger` is `hover`.
         */
        this.nzMouseLeaveDelay = 150;
        /**
         * Triggering mode: can be Array<'click'|'hover'>
         */
        this.nzTriggerAction = ['click'];
        /**
         * Property name for getting `value` in the option
         */
        this.nzValueProperty = 'value';
        /**
         * Property name for getting `label` in the option
         */
        this.nzLabelProperty = 'label';
        /**
         * Event: emit on popup show or hide
         */
        this.nzVisibleChange = new EventEmitter();
        /**
         * Event: emit on values changed
         */
        this.nzChange = new EventEmitter();
        /**
         * Event: emit on values and selection changed
         */
        this.nzSelectionChange = new EventEmitter();
        /**
         * Event: emit on option selected, event data：{option: any, index: number}
         */
        this.nzSelect = new EventEmitter();
        /**
         * Event: emit on the clear button clicked
         */
        this.nzClear = new EventEmitter();
        this.el = this.elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    get inputValue() {
        return this._inputValue;
    }
    /**
     * @param {?} inputValue
     * @return {?}
     */
    set inputValue(inputValue) {
        this._inputValue = inputValue;
        /** @type {?} */
        const willBeInSearch = !!inputValue;
        // 搜索状态变动之前，如要进入则要保留之前激活选项的快照，退出搜索状态要还原该快照
        if (!this.inSearch && willBeInSearch) {
            this.oldActivatedOptions = this.activatedOptions;
            this.activatedOptions = [];
            this.searchWidthStyle = `${this.input.nativeElement.offsetWidth}px`;
        }
        else if (this.inSearch && !willBeInSearch) {
            this.activatedOptions = this.oldActivatedOptions;
        }
        // 搜索状态变更之后
        this.inSearch = !!willBeInSearch;
        if (this.inSearch) {
            this.prepareSearchValue();
        }
        else {
            if (this.showSearch) {
                this.nzColumns = this.oldColumnsHolder;
            }
            this.searchWidthStyle = '';
        }
        this.setClassMap();
    }
    /**
     * Display Render ngTemplate
     * @param {?} value
     * @return {?}
     */
    set nzLabelRender(value) {
        this.labelRenderTpl = value;
        this.isLabelRenderTemplate = (value instanceof TemplateRef);
    }
    /**
     * @return {?}
     */
    get nzLabelRender() {
        return this.labelRenderTpl;
    }
    /**
     * prefixCls
     * @param {?} prefixCls
     * @return {?}
     */
    set nzPrefixCls(prefixCls) {
        this.prefixCls = prefixCls;
        this.setClassMap();
        this.setLabelClass();
        this.setArrowClass();
        this.setLoadingClass();
        this.setClearClass();
        this.setInputClass();
        this.setMenuClass();
        this.setMenuColumnClass();
    }
    /**
     * @return {?}
     */
    get nzPrefixCls() {
        return this.prefixCls;
    }
    /**
     * Whether is disabled
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this.disabled = toBoolean(value);
        this.setClassMap();
        this.setInputClass();
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this.disabled;
    }
    /**
     * Input size, one of `large` `default` `small`
     * @param {?} value
     * @return {?}
     */
    set nzSize(value) {
        this.size = value;
        this.setClassMap();
        this.setInputClass();
    }
    /**
     * @return {?}
     */
    get nzSize() {
        return this.size;
    }
    /**
     * Whether show input box. Defaults to `true`.
     * @param {?} value
     * @return {?}
     */
    set nzShowInput(value) {
        this.showInput = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzShowInput() {
        return this.showInput;
    }
    /**
     * Whether can search. Defaults to `false`.
     * @param {?} value
     * @return {?}
     */
    set nzShowSearch(value) {
        this.showSearch = value;
    }
    /**
     * @return {?}
     */
    get nzShowSearch() {
        return this.showSearch;
    }
    /**
     * Whether allow clear. Defaults to `true`.
     * @param {?} value
     * @return {?}
     */
    set nzAllowClear(value) {
        this.allowClear = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzAllowClear() {
        return this.allowClear;
    }
    /**
     * Whether auto focus.
     * @param {?} value
     * @return {?}
     */
    set nzAutoFocus(value) {
        this.autoFocus = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzAutoFocus() {
        return this.autoFocus;
    }
    /**
     * Whether to show arrow
     * @param {?} value
     * @return {?}
     */
    set nzShowArrow(value) {
        this.showArrow = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzShowArrow() {
        return this.showArrow;
    }
    /**
     * Additional className of popup overlay
     * @param {?} value
     * @return {?}
     */
    set nzMenuClassName(value) {
        this.menuClassName = value;
        this.setMenuClass();
    }
    /**
     * @return {?}
     */
    get nzMenuClassName() {
        return this.menuClassName;
    }
    /**
     * Additional className of popup overlay column
     * @param {?} value
     * @return {?}
     */
    set nzColumnClassName(value) {
        this.columnClassName = value;
        this.setMenuColumnClass();
    }
    /**
     * @return {?}
     */
    get nzColumnClassName() {
        return this.columnClassName;
    }
    /**
     * Options for first column, sub column will be load async
     * @param {?} options
     * @return {?}
     */
    set nzOptions(options) {
        this.oldColumnsHolder = this.nzColumns = options && options.length ? [options] : [];
        if (this.defaultValue && this.nzColumns.length) {
            this.initOptions(0);
        }
    }
    /**
     * @return {?}
     */
    get nzOptions() {
        return this.nzColumns[0];
    }
    /**
     * Change value on each selection if set to true
     * @param {?} value
     * @return {?}
     */
    set nzChangeOnSelect(value) {
        this.changeOnSelect = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzChangeOnSelect() {
        return this.changeOnSelect;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    onPositionChange(position) {
        /** @type {?} */
        const newValue = position.connectionPair.originY === 'bottom' ? 'bottom' : 'top';
        if (this.dropDownPosition !== newValue) {
            this.dropDownPosition = newValue;
            this.cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    focus() {
        if (!this.isFocused) {
            /** @type {?} */
            const input = /** @type {?} */ (this.el.querySelector(`.${this.prefixCls}-input`));
            if (input && input.focus) {
                input.focus();
            }
            else {
                this.el.focus();
            }
            this.isFocused = true;
            this.setClassMap();
        }
    }
    /**
     * @return {?}
     */
    blur() {
        if (this.isFocused) {
            /** @type {?} */
            const input = /** @type {?} */ (this.el.querySelector(`.${this.prefixCls}-input`));
            if (input && input.blur) {
                input.blur();
            }
            else {
                this.el.blur();
            }
            this.isFocused = false;
            this.setClassMap();
            this.setLabelClass();
        }
    }
    /**
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        const classMap = {
            [`${this.prefixCls}`]: 1,
            [`${this.prefixCls}-picker`]: 1,
            [`${this.prefixCls}-lg`]: this.nzSize === 'large',
            [`${this.prefixCls}-sm`]: this.nzSize === 'small',
            [`${this.prefixCls}-picker-disabled`]: this.disabled,
            [`${this.prefixCls}-focused`]: this.isFocused,
            [`${this.prefixCls}-picker-open`]: this.menuVisible,
            [`${this.prefixCls}-picker-with-value`]: this.inputValue && this.inputValue.length
        };
        this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
    }
    /**
     * 标签 样式
     * @return {?}
     */
    get labelCls() {
        return this._labelCls;
    }
    /**
     * @return {?}
     */
    setLabelClass() {
        this._labelCls = {
            [`${this.prefixCls}-picker-label`]: true,
            [`${this.prefixCls}-show-search`]: !!this.nzShowSearch,
            [`${this.prefixCls}-focused`]: !!this.nzShowSearch && this.isFocused && !this._inputValue
        };
    }
    /**
     * 箭头 样式
     * @return {?}
     */
    get arrowCls() {
        return this._arrowCls;
    }
    /**
     * @return {?}
     */
    setArrowClass() {
        this._arrowCls = {
            [`${this.prefixCls}-picker-arrow`]: true,
            [`${this.prefixCls}-picker-arrow-expand`]: this.menuVisible
        };
    }
    /**
     * 加载中图标 样式
     * @return {?}
     */
    get loadingCls() {
        return this._loadingCls;
    }
    /**
     * @return {?}
     */
    setLoadingClass() {
        this._loadingCls = {
            [`${this.prefixCls}-picker-arrow`]: true
        };
    }
    /**
     * 清除图标 样式
     * @return {?}
     */
    get clearCls() {
        return this._clearCls;
    }
    /**
     * @return {?}
     */
    setClearClass() {
        this._clearCls = {
            [`${this.prefixCls}-picker-clear`]: true
        };
    }
    /**
     * 输入框 样式
     * @return {?}
     */
    get inputCls() {
        return this._inputCls;
    }
    /**
     * @return {?}
     */
    setInputClass() {
        this._inputCls = {
            [`${this.prefixCls}-input`]: 1,
            [`${this.inputPrefixCls}-disabled`]: this.nzDisabled,
            [`${this.inputPrefixCls}-lg`]: this.nzSize === 'large',
            [`${this.inputPrefixCls}-sm`]: this.nzSize === 'small'
        };
    }
    /**
     * 浮层 样式
     * @return {?}
     */
    get menuCls() {
        return this._menuCls;
    }
    /**
     * @return {?}
     */
    setMenuClass() {
        this._menuCls = {
            [`${this.prefixCls}-menus`]: true,
            [`${this.prefixCls}-menus-hidden`]: !this.menuVisible,
            [`${this.nzMenuClassName}`]: this.nzMenuClassName
        };
    }
    /**
     * 浮层列 样式
     * @return {?}
     */
    get menuColumnCls() {
        return this._menuColumnCls;
    }
    /**
     * @return {?}
     */
    setMenuColumnClass() {
        this._menuColumnCls = {
            [`${this.prefixCls}-menu`]: true,
            [`${this.nzColumnClassName}`]: this.nzColumnClassName
        };
    }
    /**
     * 获取列中Option的样式
     * @param {?} option
     * @param {?} index
     * @return {?}
     */
    getOptionCls(option, index) {
        return {
            [`${this.prefixCls}-menu-item`]: true,
            [`${this.prefixCls}-menu-item-expand`]: !option.isLeaf,
            [`${this.prefixCls}-menu-item-active`]: this.isActivedOption(option, index),
            [`${this.prefixCls}-menu-item-disabled`]: option.disabled,
            [`${this.prefixCls}-menu-item-loading`]: option.loading
        };
    }
    /**
     * prevent input change event
     * @param {?} event
     * @return {?}
     */
    handlerInputChange(event) {
        event.stopPropagation();
    }
    /**
     * input element blur
     * @param {?} event
     * @return {?}
     */
    handleInputBlur(event) {
        /*
            if (!this.nzShowSearch) {
              return;
            }
            */
        if (this.menuVisible) {
            this.focus(); // keep input has focus when menu opened
        }
        else {
            this.blur();
        }
    }
    /**
     * input element focus
     * @param {?} event
     * @return {?}
     */
    handleInputFocus(event) {
        /*
            if (!this.nzShowSearch) {
              return;
            }
            */
        this.focus();
        this.setLabelClass();
    }
    /**
     * @return {?}
     */
    hasInput() {
        return this.inputValue.length > 0;
    }
    /**
     * @return {?}
     */
    hasValue() {
        return this.value && this.value.length > 0;
    }
    /**
     * Whether to show input element placeholder
     * @return {?}
     */
    get showPlaceholder() {
        return !(this.hasInput() || this.hasValue());
    }
    /**
     * Whether the clear button is visible
     * @return {?}
     */
    get showClearIcon() {
        /** @type {?} */
        const isHasValue = this.hasValue();
        /** @type {?} */
        const isHasInput = this.hasInput();
        return this.nzAllowClear && !this.nzDisabled && (isHasValue || isHasInput);
    }
    /**
     * clear the input box and selected options
     * @param {?=} event
     * @return {?}
     */
    clearSelection(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.labelRenderText = '';
        // this.isLabelRenderTemplate = false;
        // clear custom context
        this.labelRenderContext = {};
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.inputValue = '';
        this.setMenuVisible(false);
        // trigger change event
        this.onValueChange();
    }
    /**
     * @return {?}
     */
    buildDisplayLabel() {
        /** @type {?} */
        const selectedOptions = this.selectedOptions;
        /** @type {?} */
        const labels = selectedOptions.map(o => this.getOptionLabel(o));
        // 设置当前控件的显示值
        if (this.isLabelRenderTemplate) {
            this.labelRenderContext = { labels, selectedOptions };
        }
        else {
            this.labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        /** @type {?} */
        const keyCode = event.keyCode;
        if (keyCode !== DOWN_ARROW &&
            keyCode !== UP_ARROW &&
            keyCode !== LEFT_ARROW &&
            keyCode !== RIGHT_ARROW &&
            keyCode !== ENTER &&
            keyCode !== BACKSPACE &&
            keyCode !== ESCAPE) {
            return;
        }
        if (this.inSearch && (keyCode === BACKSPACE ||
            keyCode === LEFT_ARROW ||
            keyCode === RIGHT_ARROW)) {
            return;
        }
        // Press any keys above to reopen menu
        if (!this.isMenuVisible() &&
            keyCode !== BACKSPACE &&
            keyCode !== ESCAPE) {
            this.setMenuVisible(true);
            return;
        }
        // Press ESC to close menu
        if (keyCode === ESCAPE) {
            // this.setMenuVisible(false); // already call by cdk-overlay detach
            return;
        }
        if (this.isMenuVisible()) {
            event.preventDefault();
            if (keyCode === DOWN_ARROW) {
                this.moveDown();
            }
            else if (keyCode === UP_ARROW) {
                this.moveUp();
            }
            else if (keyCode === LEFT_ARROW) {
                this.moveLeft();
            }
            else if (keyCode === RIGHT_ARROW) {
                this.moveRight();
            }
            else if (keyCode === ENTER) {
                this.onEnter();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTriggerClick(event) {
        if (this.nzDisabled) {
            return;
        }
        this.onTouched(); // set your control to 'touched'
        if (this.nzShowSearch) {
            this.focus();
        }
        if (this.isClickTiggerAction()) {
            this.delaySetMenuVisible(!this.menuVisible, 100);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTriggerMouseEnter(event) {
        if (this.nzDisabled) {
            return;
        }
        if (this.isPointerTiggerAction()) {
            this.delaySetMenuVisible(true, this.nzMouseEnterDelay, true);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTriggerMouseLeave(event) {
        if (this.nzDisabled) {
            return;
        }
        if (!this.isMenuVisible() || this.isOpening) {
            event.preventDefault();
            return;
        }
        if (this.isPointerTiggerAction()) {
            /** @type {?} */
            const mouseTarget = /** @type {?} */ (event.relatedTarget);
            /** @type {?} */
            const hostEl = this.el;
            /** @type {?} */
            const menuEl = this.menu && /** @type {?} */ (this.menu.nativeElement);
            if (hostEl.contains(mouseTarget) || (menuEl && menuEl.contains(mouseTarget))
            /*|| mouseTarget.parentElement.contains(menuEl)*/ ) {
                // 因为浮层的backdrop出现，暂时没有办法自动消失
                return;
            }
            this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
        }
    }
    /**
     * @return {?}
     */
    isClickTiggerAction() {
        if (typeof this.nzTriggerAction === 'string') {
            return this.nzTriggerAction === 'click';
        }
        return this.nzTriggerAction.indexOf('click') !== -1;
    }
    /**
     * @return {?}
     */
    isPointerTiggerAction() {
        if (typeof this.nzTriggerAction === 'string') {
            return this.nzTriggerAction === 'hover';
        }
        return this.nzTriggerAction.indexOf('hover') !== -1;
    }
    /**
     * @return {?}
     */
    closeMenu() {
        this.blur();
        this.clearDelayTimer();
        this.setMenuVisible(false);
    }
    /**
     * @return {?}
     */
    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }
    /**
     * 显示或者隐藏菜单
     *
     * @param {?} visible true-显示，false-隐藏
     * @param {?} delay 延迟时间
     * @param {?=} setOpening
     * @return {?}
     */
    delaySetMenuVisible(visible, delay, setOpening = false) {
        this.clearDelayTimer();
        if (delay) {
            if (visible && setOpening) {
                this.isOpening = true;
            }
            this.delayTimer = setTimeout(() => {
                this.setMenuVisible(visible);
                this.clearDelayTimer();
                if (visible) {
                    setTimeout(() => {
                        this.isOpening = false;
                    }, 100);
                }
            }, delay);
        }
        else {
            this.setMenuVisible(visible);
        }
    }
    /**
     * @return {?}
     */
    isMenuVisible() {
        return this.menuVisible;
    }
    /**
     * @param {?} menuVisible
     * @return {?}
     */
    setMenuVisible(menuVisible) {
        if (this.nzDisabled) {
            return;
        }
        if (this.menuVisible !== menuVisible) {
            this.menuVisible = menuVisible;
            // update class
            this.setClassMap();
            this.setArrowClass();
            this.setMenuClass();
            if (menuVisible) {
                this.beforeVisible();
            }
            this.nzVisibleChange.emit(menuVisible);
        }
    }
    /**
     * load init data if necessary
     * @return {?}
     */
    beforeVisible() {
        this.loadRootOptions();
    }
    /**
     * @return {?}
     */
    loadRootOptions() {
        if (!this.nzColumns.length) {
            /** @type {?} */
            const root = {};
            this.loadChildren(root, -1);
        }
    }
    /**
     * 获取Option的值，例如，可以指定labelProperty="name"来取Name
     * @param {?} option
     * @return {?}
     */
    getOptionLabel(option) {
        return option[this.nzLabelProperty || 'label'];
    }
    /**
     * 获取Option的值，例如，可以指定valueProperty="id"来取ID
     * @param {?} option
     * @return {?}
     */
    getOptionValue(option) {
        return option[this.nzValueProperty || 'value'];
    }
    /**
     * @param {?} option
     * @param {?} index
     * @return {?}
     */
    isActivedOption(option, index) {
        /** @type {?} */
        const activeOpt = this.activatedOptions[index];
        return activeOpt === option;
    }
    /**
     * 设置某列的激活的菜单选项
     *
     * @param {?} option 菜单选项
     * @param {?} index  选项所在的列组的索引
     * @param {?=} select 是否触发选择结点
     * @param {?=} loadChildren
     * @return {?}
     */
    setActiveOption(option, index, select = false, loadChildren = true) {
        if (!option || option.disabled) {
            return;
        }
        this.activatedOptions[index] = option;
        // 当直接选择最后一级时，前面的选项要补全。例如，选择“城市”，则自动补全“国家”、“省份”
        for (let i = index - 1; i >= 0; i--) {
            if (!this.activatedOptions[i]) {
                this.activatedOptions[i] = this.activatedOptions[i + 1].parent;
            }
        }
        // 截断多余的选项，如选择“省份”，则只会有“国家”、“省份”，去掉“城市”、“区县”
        if (index < this.activatedOptions.length - 1) {
            this.activatedOptions = this.activatedOptions.slice(0, index + 1);
        }
        // load children
        if (option.children && option.children.length) {
            option.isLeaf = false;
            option.children.forEach(child => child.parent = option);
            this.setColumnData(option.children, index + 1);
        }
        else if (!option.isLeaf && loadChildren) {
            this.loadChildren(option, index);
        }
        else {
            // clicking leaf node will remove any children columns
            if (index < this.nzColumns.length - 1) {
                this.nzColumns = this.nzColumns.slice(0, index + 1);
            }
        }
        // trigger select event, and display label
        if (select) {
            this.onSelectOption(option, index);
        }
    }
    /**
     * @param {?} option
     * @param {?} index
     * @param {?=} success
     * @param {?=} failure
     * @return {?}
     */
    loadChildren(option, index, success, failure) {
        if (this.nzLoadData) {
            this.isLoading = index < 0;
            option.loading = true;
            this.nzLoadData(option, index).then(() => {
                option.loading = this.isLoading = false;
                if (option.children) {
                    option.children.forEach(child => child.parent = index < 0 ? undefined : option);
                    this.setColumnData(option.children, index + 1);
                }
                if (success) {
                    success();
                }
            }, () => {
                option.loading = this.isLoading = false;
                option.isLeaf = true;
                if (failure) {
                    failure();
                }
            });
        }
    }
    /**
     * @param {?} option
     * @param {?} index
     * @return {?}
     */
    onSelectOption(option, index) {
        // trigger `nzSelect` event
        this.nzSelect.emit({ option, index });
        // 生成显示
        if (option.isLeaf || this.nzChangeOnSelect || this.isChangeOn(option, index)) {
            this.selectedOptions = this.activatedOptions;
            // 设置当前控件的显示值
            this.buildDisplayLabel();
            // 触发变更事件
            this.onValueChange();
        }
        // close menu if click on leaf
        if (option.isLeaf) {
            this.delaySetMenuVisible(false, this.nzMouseLeaveDelay);
        }
    }
    /**
     * 由用户来定义点击后是否变更
     * @param {?} option
     * @param {?} index
     * @return {?}
     */
    isChangeOn(option, index) {
        if (typeof this.nzChangeOn === 'function') {
            return this.nzChangeOn(option, index) === true;
        }
        return false;
    }
    /**
     * @param {?} options
     * @param {?} index
     * @return {?}
     */
    setColumnData(options, index) {
        if (!arrayEquals(this.nzColumns[index], options)) {
            this.nzColumns[index] = options;
            if (index < this.nzColumns.length - 1) {
                this.nzColumns = this.nzColumns.slice(0, index + 1);
            }
        }
    }
    /**
     * 鼠标点击选项
     *
     * @param {?} option 菜单选项
     * @param {?} index 选项所在的列组的索引
     * @param {?} event 鼠标事件
     * @return {?}
     */
    onOptionClick(option, index, event) {
        if (event) {
            event.preventDefault();
        }
        // Keep focused state for keyboard support
        this.el.focus();
        if (option && option.disabled) {
            return;
        }
        if (this.inSearch) {
            this.setSearchActiveOption(/** @type {?} */ (option), event);
        }
        else {
            this.setActiveOption(option, index, true);
        }
    }
    /**
     * 按下回车键时选择
     * @return {?}
     */
    onEnter() {
        /** @type {?} */
        const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
        /** @type {?} */
        const activeOption = this.activatedOptions[columnIndex];
        if (activeOption && !activeOption.disabled) {
            if (this.inSearch) {
                this.setSearchActiveOption(/** @type {?} */ (activeOption), null);
            }
            else {
                this.onSelectOption(activeOption, columnIndex);
            }
        }
    }
    /**
     * press `up` or `down` arrow to activate the sibling option.
     * @param {?} isUp
     * @return {?}
     */
    moveUpOrDown(isUp) {
        /** @type {?} */
        const columnIndex = Math.max(this.activatedOptions.length - 1, 0);
        /** @type {?} */
        const activeOption = this.activatedOptions[columnIndex];
        /** @type {?} */
        const options = this.nzColumns[columnIndex] || [];
        /** @type {?} */
        const length = options.length;
        /** @type {?} */
        let nextIndex = -1;
        if (!activeOption) { // 该列还没有选中的选项
            // 该列还没有选中的选项
            nextIndex = isUp ? length : -1;
        }
        else {
            nextIndex = options.indexOf(activeOption);
        }
        while (true) {
            nextIndex = isUp ? nextIndex - 1 : nextIndex + 1;
            if (nextIndex < 0 || nextIndex >= length) {
                break;
            }
            /** @type {?} */
            const nextOption = options[nextIndex];
            if (!nextOption || nextOption.disabled) {
                continue;
            }
            this.setActiveOption(nextOption, columnIndex);
            break;
        }
    }
    /**
     * @return {?}
     */
    moveUp() {
        this.moveUpOrDown(true);
    }
    /**
     * @return {?}
     */
    moveDown() {
        this.moveUpOrDown(false);
    }
    /**
     * press `left` arrow to remove the last selected option.
     * @return {?}
     */
    moveLeft() {
        /** @type {?} */
        const options = this.activatedOptions;
        if (options.length) {
            options.pop(); // Remove the last one
        }
    }
    /**
     * press `right` arrow to select the next column option.
     * @return {?}
     */
    moveRight() {
        /** @type {?} */
        const length = this.activatedOptions.length;
        /** @type {?} */
        const options = this.nzColumns[length];
        if (options && options.length) {
            /** @type {?} */
            const nextOpt = options.find(o => !o.disabled);
            if (nextOpt) {
                this.setActiveOption(nextOpt, length);
            }
        }
    }
    /**
     * 鼠标划入选项
     *
     * @param {?} option 菜单选项
     * @param {?} index 选项所在的列组的索引
     * @param {?} event 鼠标事件
     * @return {?}
     */
    onOptionMouseEnter(option, index, event) {
        event.preventDefault();
        if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
            this.delaySelect(option, index, true);
        }
    }
    /**
     * 鼠标划出选项
     *
     * @param {?} option 菜单选项
     * @param {?} index 选项所在的列组的索引
     * @param {?} event 鼠标事件
     * @return {?}
     */
    onOptionMouseLeave(option, index, event) {
        event.preventDefault();
        if (this.nzExpandTrigger === 'hover' && !option.isLeaf) {
            this.delaySelect(option, index, false);
        }
    }
    /**
     * @return {?}
     */
    clearDelaySelectTimer() {
        if (this.delaySelectTimer) {
            clearTimeout(this.delaySelectTimer);
            this.delaySelectTimer = null;
        }
    }
    /**
     * @param {?} option
     * @param {?} index
     * @param {?} doSelect
     * @return {?}
     */
    delaySelect(option, index, doSelect) {
        this.clearDelaySelectTimer();
        if (doSelect) {
            this.delaySelectTimer = setTimeout(() => {
                // 鼠标滑入只展开，不进行选中操作
                this.setActiveOption(option, index);
                this.delaySelectTimer = null;
            }, 150);
        }
    }
    /**
     * @return {?}
     */
    getSubmitValue() {
        /** @type {?} */
        const values = [];
        this.selectedOptions.forEach(option => {
            values.push(this.getOptionValue(option));
        });
        return values;
    }
    /**
     * @return {?}
     */
    onValueChange() {
        /** @type {?} */
        const value = this.getSubmitValue();
        if (!arrayEquals(this.value, value)) {
            this.defaultValue = null; // clear the init-value
            this.value = value;
            this.onChange(value); // Angular need this
            if (value.length === 0) {
                this.nzClear.emit(); // first trigger `clear` and then `change`
            }
            this.nzSelectionChange.emit(this.selectedOptions);
            this.nzChange.emit(value);
        }
    }
    /**
     * @param {?} option
     * @param {?} index
     * @return {?}
     */
    findOption(option, index) {
        /** @type {?} */
        const options = this.nzColumns[index];
        if (options) {
            /** @type {?} */
            const value = typeof option === 'object' ? this.getOptionValue(option) : option;
            return options.find(o => value === this.getOptionValue(o));
        }
        return null;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isLoaded(index) {
        return this.nzColumns[index] && this.nzColumns[index].length > 0;
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    activateOnInit(index, value) {
        /** @type {?} */
        let option = this.findOption(value, index);
        if (!option) {
            option = typeof value === 'object' ? value : {
                [`${this.nzValueProperty || 'value'}`]: value,
                [`${this.nzLabelProperty || 'label'}`]: value
            };
        }
        this.setActiveOption(option, index, false, false);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    initOptions(index) {
        /** @type {?} */
        const vs = this.defaultValue;
        /** @type {?} */
        const load = () => {
            this.activateOnInit(index, vs[index]);
            if (index < vs.length - 1) {
                this.initOptions(index + 1);
            }
            if (index === vs.length - 1) {
                this.afterWriteValue();
            }
        };
        if (this.isLoaded(index) || !this.nzLoadData) {
            load();
        }
        else {
            /** @type {?} */
            const node = this.activatedOptions[index - 1] || {};
            this.loadChildren(node, index - 1, load, this.afterWriteValue);
        }
    }
    /**
     * @return {?}
     */
    afterWriteValue() {
        this.selectedOptions = this.activatedOptions;
        this.value = this.getSubmitValue();
        this.buildDisplayLabel();
    }
    /**
     * Write a new value to the element.
     *
     * \@Override (From ControlValueAccessor interface)
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /** @type {?} */
        const vs = this.defaultValue = toArray(value);
        if (vs.length) {
            this.initOptions(0);
        }
        else {
            this.value = vs;
            this.activatedOptions = [];
            this.afterWriteValue();
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.closeMenu();
        }
        this.nzDisabled = isDisabled;
    }
    /**
     * @return {?}
     */
    prepareSearchValue() {
        /** @type {?} */
        const results = [];
        /** @type {?} */
        const path = [];
        /** @type {?} */
        const defaultFilter = (inputValue, p) => {
            /** @type {?} */
            let flag = false;
            p.forEach(n => {
                if (n.label.indexOf(inputValue) > -1) {
                    flag = true;
                }
            });
            return flag;
        };
        /** @type {?} */
        const filter = this.nzShowSearch instanceof Object && (/** @type {?} */ (this.nzShowSearch)).filter ?
            (/** @type {?} */ (this.nzShowSearch)).filter :
            defaultFilter;
        /** @type {?} */
        const sorter = this.nzShowSearch instanceof Object && (/** @type {?} */ (this.nzShowSearch)).sorter;
        /** @type {?} */
        const loopParent = (node, forceDisabled = false) => {
            /** @type {?} */
            const disabled = forceDisabled || node.disabled;
            path.push(node);
            node.children.forEach((sNode) => {
                if (!sNode.parent) {
                    sNode.parent = node;
                }
                /** 搜索的同时建立 parent 连接，因为用户直接搜索的话是没有建立连接的，会提升从叶子节点回溯的难度 */
                if (!sNode.isLeaf) {
                    loopParent(sNode, disabled);
                }
                if (sNode.isLeaf || !sNode.children || !sNode.children.length) {
                    loopChild(sNode, disabled);
                }
            });
            path.pop();
        };
        /** @type {?} */
        const loopChild = (node, forceDisabled = false) => {
            path.push(node);
            /** @type {?} */
            const cPath = Array.from(path);
            if (filter(this._inputValue, cPath)) {
                /** @type {?} */
                const disabled = forceDisabled || node.disabled;
                results.push(/** @type {?} */ ({
                    disabled,
                    isLeaf: true,
                    path: cPath,
                    label: cPath.map(p => p.label).join(' / ')
                }));
            }
            path.pop();
        };
        this.oldColumnsHolder[0].forEach(node => (node.isLeaf || !node.children || !node.children.length) ? loopChild(node) : loopParent(node));
        if (sorter) {
            results.sort((a, b) => sorter(a.path, b.path, this._inputValue));
        }
        this.nzColumns = [results];
    }
    /**
     * @param {?} str
     * @return {?}
     */
    renderSearchString(str) {
        return str.replace(new RegExp(this._inputValue, 'g'), `<span class="ant-cascader-menu-item-keyword">${this._inputValue}</span>`);
    }
    /**
     * @param {?} result
     * @param {?} event
     * @return {?}
     */
    setSearchActiveOption(result, event) {
        this.activatedOptions = [result];
        this.delaySetMenuVisible(false, 200);
        setTimeout(() => {
            this.inputValue = '';
            /** @type {?} */
            const index = result.path.length - 1;
            /** @type {?} */
            const destiNode = result.path[index];
            /** @type {?} */
            const mockClickParent = (node, cIndex) => {
                if (node && node.parent) {
                    mockClickParent(node.parent, cIndex - 1);
                }
                this.onOptionClick(node, cIndex, event);
            };
            mockClickParent(destiNode, index);
        }, 300);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // 设置样式
        this.setClassMap();
        this.setLabelClass();
        this.setArrowClass();
        this.setLoadingClass();
        this.setClearClass();
        this.setInputClass();
        this.setMenuClass();
        this.setMenuColumnClass();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.clearDelayTimer();
        this.clearDelaySelectTimer();
    }
}
NzCascaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-cascader,[nz-cascader]',
                preserveWhitespaces: false,
                animations: [
                    dropDownAnimation
                ],
                template: "<div\n  cdkOverlayOrigin\n  #origin=\"cdkOverlayOrigin\"\n  #trigger>\n  <div *ngIf=\"nzShowInput\">\n    <input #input\n      nz-input\n      [attr.autoComplete]=\"'off'\"\n      [attr.placeholder]=\"showPlaceholder ? nzPlaceHolder : null\"\n      [attr.autofocus]=\"nzAutoFocus ? 'autofocus' : null\"\n      [readonly]=\"!nzShowSearch\"\n      [disabled]=\"nzDisabled\"\n      [nzSize]=\"nzSize\"\n      [ngClass]=\"inputCls\"\n      [(ngModel)]=\"inputValue\"\n      (blur)=\"handleInputBlur($event)\"\n      (focus)=\"handleInputFocus($event)\"\n      (change)=\"handlerInputChange($event)\">\n    <i *ngIf=\"showClearIcon\"\n      [class]=\"'anticon anticon-cross-circle'\"\n      [ngClass]=\"clearCls\"\n      [attr.title]=\"nzClearText\"\n      (click)=\"clearSelection($event)\"></i>\n    <i *ngIf=\"nzShowArrow && !isLoading\"\n      class=\"anticon anticon-down\"\n      [ngClass]=\"arrowCls\"></i>\n    <i *ngIf=\"isLoading\"\n      class=\"anticon anticon-loading anticon-spin\"\n      [ngClass]=\"loadingCls\"></i>\n    <span [ngClass]=\"labelCls\">\n          <ng-container *ngIf=\"!isLabelRenderTemplate; else labelTemplate\">{{ labelRenderText }}</ng-container>\n          <ng-template #labelTemplate>\n            <ng-template [ngTemplateOutlet]=\"nzLabelRender\" [ngTemplateOutletContext]=\"labelRenderContext\"></ng-template>\n          </ng-template>\n        </span>\n  </div>\n  <ng-content></ng-content>\n</div>\n<ng-template\n  cdkConnectedOverlay\n  cdkConnectedOverlayHasBackdrop\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayPositions]=\"positions\"\n  (backdropClick)=\"closeMenu()\"\n  (detach)=\"closeMenu()\"\n  (positionChange)=\"onPositionChange($event)\"\n  [cdkConnectedOverlayOpen]=\"menuVisible\">\n  <div #menu\n    [ngClass]=\"menuCls\" [ngStyle]=\"nzMenuStyle\"\n    [@dropDownAnimation]=\"dropDownPosition\"\n    (mouseleave)=\"onTriggerMouseLeave($event)\">\n    <ul *ngFor=\"let options of nzColumns; let i = index;\" [ngClass]=\"menuColumnCls\"\n      [style.height]=\"inSearch && !nzColumns[0].length ? 'auto': ''\" [style.width]=\"searchWidthStyle\">\n      <li *ngFor=\"let option of options\"\n        [attr.title]=\"option.title || getOptionLabel(option)\"\n        [ngClass]=\"getOptionCls(option, i)\"\n        (mouseenter)=\"onOptionMouseEnter(option, i, $event)\"\n        (mouseleave)=\"onOptionMouseLeave(option, i, $event)\"\n        (click)=\"onOptionClick(option, i, $event)\">\n        <ng-container *ngIf=\"inSearch\">\n          <span [innerHTML]=\"renderSearchString(getOptionLabel(option))\"></span>\n        </ng-container>\n        <ng-container *ngIf=\"!inSearch\">\n          {{ getOptionLabel(option) }}\n        </ng-container>\n      </li>\n      <li *ngIf=\"inSearch && !nzColumns[0].length\" class=\"ant-cascader-menu-item ant-cascader-menu-item-expanded ant-cascader-menu-item-disabled\">\n        Not Found\n      </li>\n    </ul>\n  </div>\n</ng-template>\n",
                providers: [
                    NzUpdateHostClassService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzCascaderComponent),
                        multi: true
                    }
                ],
                host: {
                    '[attr.tabIndex]': '"0"'
                },
                styles: [`.ant-cascader-menus {
      margin-top: 4px;
      margin-bottom: 4px;
      top: 100%;
      left: 0;
      position: relative;
      width: 100%;
    }`]
            }] }
];
/** @nocollapse */
NzCascaderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NzUpdateHostClassService }
];
NzCascaderComponent.propDecorators = {
    nzLabelRender: [{ type: Input }],
    nzPrefixCls: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzShowInput: [{ type: Input }],
    nzShowSearch: [{ type: Input }],
    nzAllowClear: [{ type: Input }],
    nzAutoFocus: [{ type: Input }],
    nzShowArrow: [{ type: Input }],
    nzMenuClassName: [{ type: Input }],
    nzColumnClassName: [{ type: Input }],
    nzOptions: [{ type: Input }],
    nzChangeOnSelect: [{ type: Input }],
    nzClearText: [{ type: Input }],
    nzExpandTrigger: [{ type: Input }],
    nzNotFoundContent: [{ type: Input }],
    nzPlaceHolder: [{ type: Input }],
    nzMenuStyle: [{ type: Input }],
    nzChangeOn: [{ type: Input }],
    nzMouseEnterDelay: [{ type: Input }],
    nzMouseLeaveDelay: [{ type: Input }],
    nzTriggerAction: [{ type: Input }],
    nzValueProperty: [{ type: Input }],
    nzLabelProperty: [{ type: Input }],
    nzLoadData: [{ type: Input }],
    nzVisibleChange: [{ type: Output }],
    nzChange: [{ type: Output }],
    nzSelectionChange: [{ type: Output }],
    nzSelect: [{ type: Output }],
    nzClear: [{ type: Output }],
    input: [{ type: ViewChild, args: ['input',] }],
    menu: [{ type: ViewChild, args: ['menu',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onTriggerMouseEnter: [{ type: HostListener, args: ['mouseenter', ['$event'],] }],
    onTriggerMouseLeave: [{ type: HostListener, args: ['mouseleave', ['$event'],] }]
};
function NzCascaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCascaderComponent.prototype.allowClear;
    /** @type {?} */
    NzCascaderComponent.prototype.autoFocus;
    /** @type {?} */
    NzCascaderComponent.prototype.disabled;
    /** @type {?} */
    NzCascaderComponent.prototype.enableCache;
    /** @type {?} */
    NzCascaderComponent.prototype.showArrow;
    /** @type {?} */
    NzCascaderComponent.prototype.showInput;
    /** @type {?} */
    NzCascaderComponent.prototype.size;
    /** @type {?} */
    NzCascaderComponent.prototype.prefixCls;
    /** @type {?} */
    NzCascaderComponent.prototype.inputPrefixCls;
    /** @type {?} */
    NzCascaderComponent.prototype.menuClassName;
    /** @type {?} */
    NzCascaderComponent.prototype.columnClassName;
    /** @type {?} */
    NzCascaderComponent.prototype.changeOnSelect;
    /** @type {?} */
    NzCascaderComponent.prototype.showSearch;
    /** @type {?} */
    NzCascaderComponent.prototype.defaultValue;
    /** @type {?} */
    NzCascaderComponent.prototype.dropDownPosition;
    /** @type {?} */
    NzCascaderComponent.prototype.menuVisible;
    /** @type {?} */
    NzCascaderComponent.prototype.isLoading;
    /** @type {?} */
    NzCascaderComponent.prototype.isOpening;
    /** @type {?} */
    NzCascaderComponent.prototype._arrowCls;
    /** @type {?} */
    NzCascaderComponent.prototype._clearCls;
    /** @type {?} */
    NzCascaderComponent.prototype._inputCls;
    /** @type {?} */
    NzCascaderComponent.prototype._labelCls;
    /** @type {?} */
    NzCascaderComponent.prototype._loadingCls;
    /** @type {?} */
    NzCascaderComponent.prototype._menuCls;
    /** @type {?} */
    NzCascaderComponent.prototype._menuColumnCls;
    /** @type {?} */
    NzCascaderComponent.prototype.el;
    /** @type {?} */
    NzCascaderComponent.prototype.isFocused;
    /**
     * 选择选项后，渲染显示文本
     * @type {?}
     */
    NzCascaderComponent.prototype.labelRenderTpl;
    /** @type {?} */
    NzCascaderComponent.prototype.isLabelRenderTemplate;
    /** @type {?} */
    NzCascaderComponent.prototype.labelRenderText;
    /** @type {?} */
    NzCascaderComponent.prototype.labelRenderContext;
    /** @type {?} */
    NzCascaderComponent.prototype.value;
    /** @type {?} */
    NzCascaderComponent.prototype.selectedOptions;
    /** @type {?} */
    NzCascaderComponent.prototype.activatedOptions;
    /** @type {?} */
    NzCascaderComponent.prototype.nzColumns;
    /** @type {?} */
    NzCascaderComponent.prototype.delayTimer;
    /** @type {?} */
    NzCascaderComponent.prototype.delaySelectTimer;
    /**
     * 搜索相关的输入值
     * @type {?}
     */
    NzCascaderComponent.prototype._inputValue;
    /** @type {?} */
    NzCascaderComponent.prototype.onChange;
    /** @type {?} */
    NzCascaderComponent.prototype.onTouched;
    /** @type {?} */
    NzCascaderComponent.prototype.positions;
    /** @type {?} */
    NzCascaderComponent.prototype.searchWidthStyle;
    /** @type {?} */
    NzCascaderComponent.prototype.oldColumnsHolder;
    /** @type {?} */
    NzCascaderComponent.prototype.oldActivatedOptions;
    /**
     * If cascader is in search mode.
     * @type {?}
     */
    NzCascaderComponent.prototype.inSearch;
    /**
     * Hover text for the clear icon
     * @type {?}
     */
    NzCascaderComponent.prototype.nzClearText;
    /**
     * Expand column item when click or hover, one of 'click' 'hover'
     * @type {?}
     */
    NzCascaderComponent.prototype.nzExpandTrigger;
    /**
     * Specify content to show when no result matches.
     * @type {?}
     */
    NzCascaderComponent.prototype.nzNotFoundContent;
    /**
     * Input placeholder
     * @type {?}
     */
    NzCascaderComponent.prototype.nzPlaceHolder;
    /**
     * Additional style of popup overlay
     * @type {?}
     */
    NzCascaderComponent.prototype.nzMenuStyle;
    /**
     * Change value on selection only if this function returns `true`
     * @type {?}
     */
    NzCascaderComponent.prototype.nzChangeOn;
    /**
     * Delay time to show when mouse enter, when `nzExpandTrigger` is `hover`.
     * @type {?}
     */
    NzCascaderComponent.prototype.nzMouseEnterDelay;
    /**
     * Delay time to hide when mouse enter, when `nzExpandTrigger` is `hover`.
     * @type {?}
     */
    NzCascaderComponent.prototype.nzMouseLeaveDelay;
    /**
     * Triggering mode: can be Array<'click'|'hover'>
     * @type {?}
     */
    NzCascaderComponent.prototype.nzTriggerAction;
    /**
     * Property name for getting `value` in the option
     * @type {?}
     */
    NzCascaderComponent.prototype.nzValueProperty;
    /**
     * Property name for getting `label` in the option
     * @type {?}
     */
    NzCascaderComponent.prototype.nzLabelProperty;
    /**
     * 异步加载数据
     * @type {?}
     */
    NzCascaderComponent.prototype.nzLoadData;
    /**
     * Event: emit on popup show or hide
     * @type {?}
     */
    NzCascaderComponent.prototype.nzVisibleChange;
    /**
     * Event: emit on values changed
     * @type {?}
     */
    NzCascaderComponent.prototype.nzChange;
    /**
     * Event: emit on values and selection changed
     * @type {?}
     */
    NzCascaderComponent.prototype.nzSelectionChange;
    /**
     * Event: emit on option selected, event data：{option: any, index: number}
     * @type {?}
     */
    NzCascaderComponent.prototype.nzSelect;
    /**
     * Event: emit on the clear button clicked
     * @type {?}
     */
    NzCascaderComponent.prototype.nzClear;
    /** @type {?} */
    NzCascaderComponent.prototype.input;
    /**
     * 浮层菜单
     * @type {?}
     */
    NzCascaderComponent.prototype.menu;
    /** @type {?} */
    NzCascaderComponent.prototype.elementRef;
    /** @type {?} */
    NzCascaderComponent.prototype.cdr;
    /** @type {?} */
    NzCascaderComponent.prototype.nzUpdateHostClassService;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY2FzY2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNhc2NhZGVyL256LWNhc2NhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFVBQVUsRUFDVixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWhILE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7O0FBRWpELGlCQUFvQixLQUFjOztJQUNoQyxJQUFJLEdBQUcsQ0FBTTtJQUNiLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNqQixHQUFHLEdBQUcsRUFBRSxDQUFDO0tBQ1Y7U0FBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNoQyxHQUFHLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztLQUNqQjtTQUFNO1FBQ0wsR0FBRyxHQUFHLEtBQUssQ0FBQztLQUNiO0lBQ0QsT0FBTyxHQUFHLENBQUM7Q0FDWjs7Ozs7OztBQUVELHFCQUF3QixNQUFXLEVB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Ozs7TUFPQTthQUVMOzs7O1lBdEdDLFVBQVU7WUFGVixpQkFBaUI7WUFtQlYsd0JBQXdCOzs7NEJBZ0w5QixLQUFLOzBCQVdMLEtBQUs7eUJBa0JMLEtBQUs7cUJBWUwsS0FBSzswQkFZTCxLQUFLOzJCQVVMLEtBQUs7MkJBaUJMLEtBQUs7MEJBVUwsS0FBSzswQkFVTCxLQUFLOzhCQVVMLEtBQUs7Z0NBV0wsS0FBSzt3QkFXTCxLQUFLOytCQVlMLEtBQUs7MEJBVUwsS0FBSzs4QkFHTCxLQUFLO2dDQUdMLEtBQUs7NEJBR0wsS0FBSzswQkFHTCxLQUFLO3lCQUdMLEtBQUs7Z0NBR0wsS0FBSztnQ0FHTCxLQUFLOzhCQUdMLEtBQUs7OEJBR0wsS0FBSzs4QkFHTCxLQUFLO3lCQUdMLEtBQUs7OEJBR0wsTUFBTTt1QkFHTixNQUFNO2dDQUdOLE1BQU07dUJBS04sTUFBTTtzQkFNTixNQUFNO29CQUVOLFNBQVMsU0FBQyxPQUFPO21CQUVqQixTQUFTLFNBQUMsTUFBTTt3QkFxT2hCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBRSxRQUFRLENBQUU7NkJBa0RwQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUUsUUFBUSxDQUFFO2tDQWVsQyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUUsUUFBUSxDQUFFO2tDQVV2QyxZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUUsUUFBUSxDQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tYW55XG5pbXBvcnQge1xuICBmb3J3YXJkUmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEJBQ0tTUEFDRSwgRE9XTl9BUlJPVywgRU5URVIsIEVTQ0FQRSwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFVQX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcbmltcG9ydCB7IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSwgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IERFRkFVTFRfRFJPUERPV05fUE9TSVRJT05TIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXktcG9zaXRpb24tbWFwJztcblxuaW1wb3J0IHsgZHJvcERvd25BbmltYXRpb24gfSBmcm9tICcuLi9jb3JlL2FuaW1hdGlvbi9kcm9wZG93bi1hbmltYXRpb25zJztcbmltcG9ydCB7IE56VXBkYXRlSG9zdENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdXBkYXRlLWhvc3QtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmZ1bmN0aW9uIHRvQXJyYXk8VD4odmFsdWU6IFQgfCBUW10pOiBUW10ge1xuICBsZXQgcmV0OiBUW107XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0ID0gW107XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0ID0gWyB2YWx1ZSBdO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IHZhbHVlO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIGFycmF5RXF1YWxzPFQ+KGFycmF5MTogVFtdLCBhcnJheTI6IFRbXSk6IGJvb2xlYW4ge1xuICBpZiAoIWFycmF5MSB8fCAhYXJyYXkyIHx8IGFycmF5MS5sZW5ndGggIT09IGFycmF5Mi5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBsZW4gPSBhcnJheTEubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGFycmF5MVsgaSBdICE9PSBhcnJheTJbIGkgXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgZGVmYXVsdERpc3BsYXlSZW5kZXIgPSBsYWJlbCA9PiBsYWJlbC5qb2luKCcgLyAnKTtcblxuZXhwb3J0IHR5cGUgTnpDYXNjYWRlckV4cGFuZFRyaWdnZXIgPSAnY2xpY2snIHwgJ2hvdmVyJztcbmV4cG9ydCB0eXBlIE56Q2FzY2FkZXJUcmlnZ2VyVHlwZSA9ICdjbGljaycgfCAnaG92ZXInO1xuZXhwb3J0IHR5cGUgTnpDYXNjYWRlclNpemUgPSAnc21hbGwnIHwgJ2xhcmdlJyB8ICdkZWZhdWx0JyA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FzY2FkZXJPcHRpb24ge1xuICB2YWx1ZT86IGFueTtcbiAgbGFiZWw/OiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGxvYWRpbmc/OiBib29sZWFuO1xuICBpc0xlYWY/OiBib29sZWFuO1xuICBwYXJlbnQ/OiBDYXNjYWRlck9wdGlvbjtcbiAgY2hpbGRyZW4/OiBDYXNjYWRlck9wdGlvbltdO1xuXG4gIFsga2V5OiBzdHJpbmcgXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhc2NhZGVyU2VhcmNoT3B0aW9uIGV4dGVuZHMgQ2FzY2FkZXJPcHRpb24ge1xuICBwYXRoOiBDYXNjYWRlck9wdGlvbltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE56U2hvd1NlYXJjaE9wdGlvbnMge1xuICBmaWx0ZXI/KGlucHV0VmFsdWU6IHN0cmluZywgcGF0aDogQ2FzY2FkZXJPcHRpb25bXSk6IGJvb2xlYW47XG4gIHNvcnRlcj8oYTogQ2FzY2FkZXJPcHRpb25bXSwgYjogQ2FzY2FkZXJPcHRpb25bXSwgaW5wdXRWYWx1ZTogc3RyaW5nKTogbnVtYmVyO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LWNhc2NhZGVyLFtuei1jYXNjYWRlcl0nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9ucyAgICAgICAgIDogW1xuICAgIGRyb3BEb3duQW5pbWF0aW9uXG4gIF0sXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LWNhc2NhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzICAgICAgICAgIDogW1xuICAgIE56VXBkYXRlSG9zdENsYXNzU2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOekNhc2NhZGVyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpICAgICAgOiB0cnVlXG4gICAgfVxuICBdLFxuICBob3N0ICAgICAgICAgICAgICAgOiB7XG4gICAgJ1thdHRyLnRhYkluZGV4XSc6ICdcIjBcIidcbiAgfSxcbiAgc3R5bGVzICAgICAgICAgICAgIDogW1xuICAgICAgYC5hbnQtY2FzY2FkZXItbWVudXMge1xuICAgICAgbWFyZ2luLXRvcDogNHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgdG9wOiAxMDAlO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1gXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpDYXNjYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHByaXZhdGUgYWxsb3dDbGVhciA9IHRydWU7XG4gIHByaXZhdGUgYXV0b0ZvY3VzID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBlbmFibGVDYWNoZSA9IHRydWU7XG4gIHByaXZhdGUgc2hvd0Fycm93ID0gdHJ1ZTtcbiAgcHJpdmF0ZSBzaG93SW5wdXQgPSB0cnVlO1xuICBwcml2YXRlIHNpemU6IE56Q2FzY2FkZXJTaXplID0gJ2RlZmF1bHQnO1xuICBwcml2YXRlIHByZWZpeENscyA9ICdhbnQtY2FzY2FkZXInO1xuICBwcml2YXRlIGlucHV0UHJlZml4Q2xzID0gJ2FudC1pbnB1dCc7XG4gIHByaXZhdGUgbWVudUNsYXNzTmFtZTtcbiAgcHJpdmF0ZSBjb2x1bW5DbGFzc05hbWU7XG4gIHByaXZhdGUgY2hhbmdlT25TZWxlY3QgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzaG93U2VhcmNoOiBib29sZWFuIHwgTnpTaG93U2VhcmNoT3B0aW9ucztcbiAgcHJpdmF0ZSBkZWZhdWx0VmFsdWU6IGFueVtdO1xuXG4gIHB1YmxpYyBkcm9wRG93blBvc2l0aW9uID0gJ2JvdHRvbSc7XG4gIHB1YmxpYyBtZW51VmlzaWJsZSA9IGZhbHNlO1xuICBwdWJsaWMgaXNMb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgaXNPcGVuaW5nID0gZmFsc2U7XG5cbiAgLy8g5YaF6YOo5qC35byPXG4gIHByaXZhdGUgX2Fycm93Q2xzOiB7IFsgbmFtZTogc3RyaW5nIF06IGFueSB9O1xuICBwcml2YXRlIF9jbGVhckNsczogeyBbIG5hbWU6IHN0cmluZyBdOiBhbnkgfTtcbiAgcHJpdmF0ZSBfaW5wdXRDbHM6IHsgWyBuYW1lOiBzdHJpbmcgXTogYW55IH07XG4gIHByaXZhdGUgX2xhYmVsQ2xzOiB7IFsgbmFtZTogc3RyaW5nIF06IGFueSB9O1xuICBwcml2YXRlIF9sb2FkaW5nQ2xzOiB7IFsgbmFtZTogc3RyaW5nIF06IGFueSB9O1xuICBwcml2YXRlIF9tZW51Q2xzOiB7IFsgbmFtZTogc3RyaW5nIF06IGFueSB9O1xuICBwcml2YXRlIF9tZW51Q29sdW1uQ2xzOiB7IFsgbmFtZTogc3RyaW5nIF06IGFueSB9O1xuXG4gIHB1YmxpYyBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgaXNGb2N1c2VkID0gZmFsc2U7XG5cbiAgLyoqIOmAieaLqemAiemhueWQju+8jOa4suafk+aYvuekuuaWh+acrCAqL1xuICBwcml2YXRlIGxhYmVsUmVuZGVyVHBsOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBwdWJsaWMgaXNMYWJlbFJlbmRlclRlbXBsYXRlID0gZmFsc2U7XG4gIHB1YmxpYyBsYWJlbFJlbmRlclRleHQ6IHN0cmluZztcbiAgcHVibGljIGxhYmVsUmVuZGVyQ29udGV4dDogYW55ID0ge307XG5cbiAgLy8g5b2T5YmN5YC8XG4gIHByaXZhdGUgdmFsdWU6IGFueVtdO1xuICAvLyDlt7LpgInmi6nnmoTpgInpobnooajnpLrlvZPliY3lt7Lnoa7orqTnmoTpgInpobnvvJpzZWxlY3Rpb24gd2lsbCB0cmlnZ2VyIHZhbHVlIGNoYW5nZVxuICBwcml2YXRlIHNlbGVjdGVkT3B0aW9uczogQ2FzY2FkZXJPcHRpb25bXSA9IFtdO1xuICAvLyDlt7Lmv4DmtLvnmoTpgInpobnooajnpLrpgJrov4fplK7nm5jmlrnlkJHplK7pgInmi6nnmoTpgInpobnvvIzlubbmnKrmnIDnu4jnoa7orqTvvIjpmaTpnZ7mjIlFTlRFUumUru+8ie+8mmFjdGl2YWN0aW9uIHdpbGwgbm90IHRyaWdnZXIgdmFsdWUgY2hhbmdlXG4gIHByaXZhdGUgYWN0aXZhdGVkT3B0aW9uczogQ2FzY2FkZXJPcHRpb25bXSA9IFtdO1xuICAvLyDooajnpLrlvZPliY3oj5zljZXnmoTmlbDmja7liJfvvJphbGwgZGF0YSBjb2x1bW5zXG4gIHB1YmxpYyBuekNvbHVtbnM6IENhc2NhZGVyT3B0aW9uW11bXSA9IFtdO1xuXG4gIC8vIOaYvuekuuaIlumakOiXj+iPnOWNleiuoeaXtuWZqFxuICBwcml2YXRlIGRlbGF5VGltZXI6IGFueTtcbiAgcHJpdmF0ZSBkZWxheVNlbGVjdFRpbWVyOiBhbnk7XG5cbiAgLyoqIOaQnOe0ouebuOWFs+eahOi+k+WFpeWAvCAqL1xuICBwcml2YXRlIF9pbnB1dFZhbHVlID0gJyc7XG4gIGdldCBpbnB1dFZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2lucHV0VmFsdWU7XG4gIH1cblxuICBzZXQgaW5wdXRWYWx1ZShpbnB1dFZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICBjb25zdCB3aWxsQmVJblNlYXJjaCA9ICEhaW5wdXRWYWx1ZTtcblxuICAgIC8vIOaQnOe0oueKtuaAgeWPmOWKqOS5i+WJje+8jOWmguimgei/m+WFpeWImeimgeS/neeVmeS5i+WJjea/gOa0u+mAiemhueeahOW/q+eFp++8jOmAgOWHuuaQnOe0oueKtuaAgeimgei/mOWOn+ivpeW/q+eFp1xuICAgIGlmICghdGhpcy5pblNlYXJjaCAmJiB3aWxsQmVJblNlYXJjaCkge1xuICAgICAgdGhpcy5vbGRBY3RpdmF0ZWRPcHRpb25zID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gW107XG4gICAgICB0aGlzLnNlYXJjaFdpZHRoU3R5bGUgPSBgJHt0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGh9cHhgO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pblNlYXJjaCAmJiAhd2lsbEJlSW5TZWFyY2gpIHtcbiAgICAgIHRoaXMuYWN0aXZhdGVkT3B0aW9ucyA9IHRoaXMub2xkQWN0aXZhdGVkT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyDmkJzntKLnirbmgIHlj5jmm7TkuYvlkI5cbiAgICB0aGlzLmluU2VhcmNoID0gISF3aWxsQmVJblNlYXJjaDtcbiAgICBpZiAodGhpcy5pblNlYXJjaCkge1xuICAgICAgdGhpcy5wcmVwYXJlU2VhcmNoVmFsdWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuc2hvd1NlYXJjaCkge1xuICAgICAgICB0aGlzLm56Q29sdW1ucyA9IHRoaXMub2xkQ29sdW1uc0hvbGRlcjtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VhcmNoV2lkdGhTdHlsZSA9ICcnO1xuICAgIH1cbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICAvLyBuZ01vZGVsIEFjY2Vzc1xuICBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBvblRvdWNoZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgcG9zaXRpb25zOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10gPSBbIC4uLkRFRkFVTFRfRFJPUERPV05fUE9TSVRJT05TIF07XG5cbiAgLyoqIERpc3BsYXkgUmVuZGVyIG5nVGVtcGxhdGUgKi9cbiAgQElucHV0KClcbiAgc2V0IG56TGFiZWxSZW5kZXIodmFsdWU6IFRlbXBsYXRlUmVmPGFueT4pIHtcbiAgICB0aGlzLmxhYmVsUmVuZGVyVHBsID0gdmFsdWU7XG4gICAgdGhpcy5pc0xhYmVsUmVuZGVyVGVtcGxhdGUgPSAodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG4gIH1cblxuICBnZXQgbnpMYWJlbFJlbmRlcigpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5sYWJlbFJlbmRlclRwbDtcbiAgfVxuXG4gIC8qKiBwcmVmaXhDbHMgKi9cbiAgQElucHV0KClcbiAgc2V0IG56UHJlZml4Q2xzKHByZWZpeENsczogc3RyaW5nKSB7XG4gICAgdGhpcy5wcmVmaXhDbHMgPSBwcmVmaXhDbHM7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMuc2V0TGFiZWxDbGFzcygpO1xuICAgIHRoaXMuc2V0QXJyb3dDbGFzcygpO1xuICAgIHRoaXMuc2V0TG9hZGluZ0NsYXNzKCk7XG4gICAgdGhpcy5zZXRDbGVhckNsYXNzKCk7XG4gICAgdGhpcy5zZXRJbnB1dENsYXNzKCk7XG4gICAgdGhpcy5zZXRNZW51Q2xhc3MoKTtcbiAgICB0aGlzLnNldE1lbnVDb2x1bW5DbGFzcygpO1xuICB9XG5cbiAgZ2V0IG56UHJlZml4Q2xzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucHJlZml4Q2xzO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgaXMgZGlzYWJsZWQgKi9cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmRpc2FibGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gICAgdGhpcy5zZXRJbnB1dENsYXNzKCk7XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBJbnB1dCBzaXplLCBvbmUgb2YgYGxhcmdlYCBgZGVmYXVsdGAgYHNtYWxsYCAqL1xuICBASW5wdXQoKVxuICBzZXQgbnpTaXplKHZhbHVlOiBOekNhc2NhZGVyU2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLnNldElucHV0Q2xhc3MoKTtcbiAgfVxuXG4gIGdldCBuelNpemUoKTogTnpDYXNjYWRlclNpemUge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cblxuICAvKiogV2hldGhlciBzaG93IGlucHV0IGJveC4gRGVmYXVsdHMgdG8gYHRydWVgLiAqL1xuICBASW5wdXQoKVxuICBzZXQgbnpTaG93SW5wdXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNob3dJbnB1dCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpTaG93SW5wdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2hvd0lucHV0O1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgY2FuIHNlYXJjaC4gRGVmYXVsdHMgdG8gYGZhbHNlYC4gKi9cbiAgQElucHV0KClcbiAgc2V0IG56U2hvd1NlYXJjaCh2YWx1ZTogYm9vbGVhbiB8IE56U2hvd1NlYXJjaE9wdGlvbnMpIHtcbiAgICB0aGlzLnNob3dTZWFyY2ggPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelNob3dTZWFyY2goKTogYm9vbGVhbiB8IE56U2hvd1NlYXJjaE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLnNob3dTZWFyY2g7XG4gIH1cblxuICBwdWJsaWMgc2VhcmNoV2lkdGhTdHlsZTogc3RyaW5nO1xuICBwcml2YXRlIG9sZENvbHVtbnNIb2xkZXI7XG4gIHByaXZhdGUgb2xkQWN0aXZhdGVkT3B0aW9ucztcblxuICAvKiogSWYgY2FzY2FkZXIgaXMgaW4gc2VhcmNoIG1vZGUuICovXG4gIHB1YmxpYyBpblNlYXJjaCA9IGZhbHNlO1xuXG4gIC8qKiBXaGV0aGVyIGFsbG93IGNsZWFyLiBEZWZhdWx0cyB0byBgdHJ1ZWAuICovXG4gIEBJbnB1dCgpXG4gIHNldCBuekFsbG93Q2xlYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFsbG93Q2xlYXIgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56QWxsb3dDbGVhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hbGxvd0NsZWFyO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgYXV0byBmb2N1cy4gKi9cbiAgQElucHV0KClcbiAgc2V0IG56QXV0b0ZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5hdXRvRm9jdXMgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56QXV0b0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmF1dG9Gb2N1cztcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgYXJyb3cgKi9cbiAgQElucHV0KClcbiAgc2V0IG56U2hvd0Fycm93KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zaG93QXJyb3cgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56U2hvd0Fycm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNob3dBcnJvdztcbiAgfVxuXG4gIC8qKiBBZGRpdGlvbmFsIGNsYXNzTmFtZSBvZiBwb3B1cCBvdmVybGF5ICovXG4gIEBJbnB1dCgpXG4gIHNldCBuek1lbnVDbGFzc05hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMubWVudUNsYXNzTmFtZSA9IHZhbHVlO1xuICAgIHRoaXMuc2V0TWVudUNsYXNzKCk7XG4gIH1cblxuICBnZXQgbnpNZW51Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWVudUNsYXNzTmFtZTtcbiAgfVxuXG4gIC8qKiBBZGRpdGlvbmFsIGNsYXNzTmFtZSBvZiBwb3B1cCBvdmVybGF5IGNvbHVtbiAqL1xuICBASW5wdXQoKVxuICBzZXQgbnpDb2x1bW5DbGFzc05hbWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY29sdW1uQ2xhc3NOYW1lID0gdmFsdWU7XG4gICAgdGhpcy5zZXRNZW51Q29sdW1uQ2xhc3MoKTtcbiAgfVxuXG4gIGdldCBuekNvbHVtbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbkNsYXNzTmFtZTtcbiAgfVxuXG4gIC8qKiBPcHRpb25zIGZvciBmaXJzdCBjb2x1bW4sIHN1YiBjb2x1bW4gd2lsbCBiZSBsb2FkIGFzeW5jICovXG4gIEBJbnB1dCgpIHNldCBuek9wdGlvbnMob3B0aW9uczogQ2FzY2FkZXJPcHRpb25bXSB8IG51bGwpIHtcbiAgICB0aGlzLm9sZENvbHVtbnNIb2xkZXIgPSB0aGlzLm56Q29sdW1ucyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5sZW5ndGggPyBbIG9wdGlvbnMgXSA6IFtdO1xuICAgIGlmICh0aGlzLmRlZmF1bHRWYWx1ZSAmJiB0aGlzLm56Q29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMoMCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56T3B0aW9ucygpOiBDYXNjYWRlck9wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5uekNvbHVtbnNbIDAgXTtcbiAgfVxuXG4gIC8qKiBDaGFuZ2UgdmFsdWUgb24gZWFjaCBzZWxlY3Rpb24gaWYgc2V0IHRvIHRydWUgKi9cbiAgQElucHV0KClcbiAgc2V0IG56Q2hhbmdlT25TZWxlY3QodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNoYW5nZU9uU2VsZWN0ID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekNoYW5nZU9uU2VsZWN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNoYW5nZU9uU2VsZWN0O1xuICB9XG5cbiAgLyoqIEhvdmVyIHRleHQgZm9yIHRoZSBjbGVhciBpY29uICovXG4gIEBJbnB1dCgpIG56Q2xlYXJUZXh0ID0gJ0NsZWFyJztcblxuICAvKiogRXhwYW5kIGNvbHVtbiBpdGVtIHdoZW4gY2xpY2sgb3IgaG92ZXIsIG9uZSBvZiAnY2xpY2snICdob3ZlcicgKi9cbiAgQElucHV0KCkgbnpFeHBhbmRUcmlnZ2VyOiBOekNhc2NhZGVyRXhwYW5kVHJpZ2dlciA9ICdjbGljayc7XG5cbiAgLyoqIFNwZWNpZnkgY29udGVudCB0byBzaG93IHdoZW4gbm8gcmVzdWx0IG1hdGNoZXMuICovXG4gIEBJbnB1dCgpIG56Tm90Rm91bmRDb250ZW50ID0gJ05vdCBGb3VuZCc7XG5cbiAgLyoqIElucHV0IHBsYWNlaG9sZGVyICovXG4gIEBJbnB1dCgpIG56UGxhY2VIb2xkZXIgPSAnUGxlYXNlIHNlbGVjdCc7XG5cbiAgLyoqIEFkZGl0aW9uYWwgc3R5bGUgb2YgcG9wdXAgb3ZlcmxheSAqL1xuICBASW5wdXQoKSBuek1lbnVTdHlsZTogeyBbIGtleTogc3RyaW5nIF06IHN0cmluZzsgfTtcblxuICAvKiogQ2hhbmdlIHZhbHVlIG9uIHNlbGVjdGlvbiBvbmx5IGlmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBgdHJ1ZWAgKi9cbiAgQElucHV0KCkgbnpDaGFuZ2VPbjogKG9wdGlvbjogQ2FzY2FkZXJPcHRpb24sIGxldmVsOiBudW1iZXIpID0+IGJvb2xlYW47XG5cbiAgLyoqIERlbGF5IHRpbWUgdG8gc2hvdyB3aGVuIG1vdXNlIGVudGVyLCB3aGVuIGBuekV4cGFuZFRyaWdnZXJgIGlzIGBob3ZlcmAuICovXG4gIEBJbnB1dCgpIG56TW91c2VFbnRlckRlbGF5ID0gMTUwOyAvLyBtc1xuXG4gIC8qKiBEZWxheSB0aW1lIHRvIGhpZGUgd2hlbiBtb3VzZSBlbnRlciwgd2hlbiBgbnpFeHBhbmRUcmlnZ2VyYCBpcyBgaG92ZXJgLiAqL1xuICBASW5wdXQoKSBuek1vdXNlTGVhdmVEZWxheSA9IDE1MDsgLy8gbXNcblxuICAvKiogVHJpZ2dlcmluZyBtb2RlOiBjYW4gYmUgQXJyYXk8J2NsaWNrJ3wnaG92ZXInPiAqL1xuICBASW5wdXQoKSBuelRyaWdnZXJBY3Rpb246IE56Q2FzY2FkZXJUcmlnZ2VyVHlwZSB8IE56Q2FzY2FkZXJUcmlnZ2VyVHlwZVtdID0gWyAnY2xpY2snIF07XG5cbiAgLyoqIFByb3BlcnR5IG5hbWUgZm9yIGdldHRpbmcgYHZhbHVlYCBpbiB0aGUgb3B0aW9uICovXG4gIEBJbnB1dCgpIG56VmFsdWVQcm9wZXJ0eSA9ICd2YWx1ZSc7XG5cbiAgLyoqIFByb3BlcnR5IG5hbWUgZm9yIGdldHRpbmcgYGxhYmVsYCBpbiB0aGUgb3B0aW9uICovXG4gIEBJbnB1dCgpIG56TGFiZWxQcm9wZXJ0eSA9ICdsYWJlbCc7XG5cbiAgLyoqIOW8guatpeWKoOi9veaVsOaNriAqL1xuICBASW5wdXQoKSBuekxvYWREYXRhOiAobm9kZTogQ2FzY2FkZXJPcHRpb24sIGluZGV4PzogbnVtYmVyKSA9PiBQcm9taXNlTGlrZTxhbnk+O1xuXG4gIC8qKiBFdmVudDogZW1pdCBvbiBwb3B1cCBzaG93IG9yIGhpZGUgKi9cbiAgQE91dHB1dCgpIG56VmlzaWJsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKiogRXZlbnQ6IGVtaXQgb24gdmFsdWVzIGNoYW5nZWQgKi9cbiAgQE91dHB1dCgpIG56Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICAvKiogRXZlbnQ6IGVtaXQgb24gdmFsdWVzIGFuZCBzZWxlY3Rpb24gY2hhbmdlZCAqL1xuICBAT3V0cHV0KCkgbnpTZWxlY3Rpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhc2NhZGVyT3B0aW9uW10+KCk7XG5cbiAgLyoqXG4gICAqIEV2ZW50OiBlbWl0IG9uIG9wdGlvbiBzZWxlY3RlZCwgZXZlbnQgZGF0Ye+8mntvcHRpb246IGFueSwgaW5kZXg6IG51bWJlcn1cbiAgICovXG4gIEBPdXRwdXQoKSBuelNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIG9wdGlvbjogQ2FzY2FkZXJPcHRpb24sXG4gICAgaW5kZXg6IG51bWJlclxuICB9PigpO1xuXG4gIC8qKiBFdmVudDogZW1pdCBvbiB0aGUgY2xlYXIgYnV0dG9uIGNsaWNrZWQgKi9cbiAgQE91dHB1dCgpIG56Q2xlYXIgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcbiAgLyoqIOa1ruWxguiPnOWNlSAqL1xuICBAVmlld0NoaWxkKCdtZW51JykgbWVudTogRWxlbWVudFJlZjtcblxuICBwdWJsaWMgb25Qb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5ZID09PSAnYm90dG9tJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgaWYgKHRoaXMuZHJvcERvd25Qb3NpdGlvbiAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuZHJvcERvd25Qb3NpdGlvbiA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNGb2N1c2VkKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5wcmVmaXhDbHN9LWlucHV0YCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoaW5wdXQgJiYgaW5wdXQuZm9jdXMpIHtcbiAgICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYmx1cigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0ZvY3VzZWQpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLnByZWZpeENsc30taW5wdXRgKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChpbnB1dCAmJiBpbnB1dC5ibHVyKSB7XG4gICAgICAgIGlucHV0LmJsdXIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWwuYmx1cigpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICAgIHRoaXMuc2V0TGFiZWxDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgY29uc3QgY2xhc3NNYXAgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfWAgXSAgICAgICAgICAgICAgICAgIDogMSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LXBpY2tlcmAgXSAgICAgICAgICAgOiAxLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tbGdgIF0gICAgICAgICAgICAgICA6IHRoaXMubnpTaXplID09PSAnbGFyZ2UnLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tc21gIF0gICAgICAgICAgICAgICA6IHRoaXMubnpTaXplID09PSAnc21hbGwnLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tcGlja2VyLWRpc2FibGVkYCBdICA6IHRoaXMuZGlzYWJsZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1mb2N1c2VkYCBdICAgICAgICAgIDogdGhpcy5pc0ZvY3VzZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1waWNrZXItb3BlbmAgXSAgICAgIDogdGhpcy5tZW51VmlzaWJsZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LXBpY2tlci13aXRoLXZhbHVlYCBdOiB0aGlzLmlucHV0VmFsdWUgJiYgdGhpcy5pbnB1dFZhbHVlLmxlbmd0aFxuICAgIH07XG4gICAgdGhpcy5uelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UudXBkYXRlSG9zdENsYXNzKHRoaXMuZWwsIGNsYXNzTWFwKTtcbiAgfVxuXG4gIC8qKiDmoIfnrb4g5qC35byPICovXG4gIHB1YmxpYyBnZXQgbGFiZWxDbHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWxDbHM7XG4gIH1cblxuICBwcml2YXRlIHNldExhYmVsQ2xhc3MoKTogdm9pZCB7XG4gICAgdGhpcy5fbGFiZWxDbHMgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1waWNrZXItbGFiZWxgIF06IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zaG93LXNlYXJjaGAgXSA6ICEhdGhpcy5uelNob3dTZWFyY2gsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1mb2N1c2VkYCBdICAgICA6ICEhdGhpcy5uelNob3dTZWFyY2ggJiYgdGhpcy5pc0ZvY3VzZWQgJiYgIXRoaXMuX2lucHV0VmFsdWVcbiAgICB9O1xuICB9XG5cbiAgLyoqIOeureWktCDmoLflvI8gKi9cbiAgcHVibGljIGdldCBhcnJvd0NscygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9hcnJvd0NscztcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXJyb3dDbGFzcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hcnJvd0NscyA9IHtcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LXBpY2tlci1hcnJvd2AgXSAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1waWNrZXItYXJyb3ctZXhwYW5kYCBdOiB0aGlzLm1lbnVWaXNpYmxlXG4gICAgfTtcbiAgfVxuXG4gIC8qKiDliqDovb3kuK3lm77moIcg5qC35byPICovXG4gIHB1YmxpYyBnZXQgbG9hZGluZ0NscygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nQ2xzO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRMb2FkaW5nQ2xhc3MoKTogdm9pZCB7XG4gICAgdGhpcy5fbG9hZGluZ0NscyA9IHtcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LXBpY2tlci1hcnJvd2AgXTogdHJ1ZVxuICAgIH07XG4gIH1cblxuICAvKiog5riF6Zmk5Zu+5qCHIOagt+W8jyAqL1xuICBwdWJsaWMgZ2V0IGNsZWFyQ2xzKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsZWFyQ2xzO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDbGVhckNsYXNzKCk6IHZvaWQge1xuICAgIHRoaXMuX2NsZWFyQ2xzID0ge1xuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tcGlja2VyLWNsZWFyYCBdOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIC8qKiDovpPlhaXmoYYg5qC35byPICovXG4gIHB1YmxpYyBnZXQgaW5wdXRDbHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5faW5wdXRDbHM7XG4gIH1cblxuICBwcml2YXRlIHNldElucHV0Q2xhc3MoKTogdm9pZCB7XG4gICAgdGhpcy5faW5wdXRDbHMgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1pbnB1dGAgXSAgICAgICAgOiAxLFxuICAgICAgWyBgJHt0aGlzLmlucHV0UHJlZml4Q2xzfS1kaXNhYmxlZGAgXTogdGhpcy5uekRpc2FibGVkLFxuICAgICAgWyBgJHt0aGlzLmlucHV0UHJlZml4Q2xzfS1sZ2AgXSAgICAgIDogdGhpcy5uelNpemUgPT09ICdsYXJnZScsXG4gICAgICBbIGAke3RoaXMuaW5wdXRQcmVmaXhDbHN9LXNtYCBdICAgICAgOiB0aGlzLm56U2l6ZSA9PT0gJ3NtYWxsJ1xuICAgIH07XG4gIH1cblxuICAvKiog5rWu5bGCIOagt+W8jyAqL1xuICBwdWJsaWMgZ2V0IG1lbnVDbHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVudUNscztcbiAgfVxuXG4gIHByaXZhdGUgc2V0TWVudUNsYXNzKCk6IHZvaWQge1xuICAgIHRoaXMuX21lbnVDbHMgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1tZW51c2AgXSAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1tZW51cy1oaWRkZW5gIF06ICF0aGlzLm1lbnVWaXNpYmxlLFxuICAgICAgWyBgJHt0aGlzLm56TWVudUNsYXNzTmFtZX1gIF0gICAgICAgOiB0aGlzLm56TWVudUNsYXNzTmFtZVxuICAgIH07XG4gIH1cblxuICAvKiog5rWu5bGC5YiXIOagt+W8jyAqL1xuICBwdWJsaWMgZ2V0IG1lbnVDb2x1bW5DbHMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fbWVudUNvbHVtbkNscztcbiAgfVxuXG4gIHByaXZhdGUgc2V0TWVudUNvbHVtbkNsYXNzKCk6IHZvaWQge1xuICAgIHRoaXMuX21lbnVDb2x1bW5DbHMgPSB7XG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1tZW51YCBdICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLm56Q29sdW1uQ2xhc3NOYW1lfWAgXTogdGhpcy5uekNvbHVtbkNsYXNzTmFtZVxuICAgIH07XG4gIH1cblxuICAvKiog6I635Y+W5YiX5LitT3B0aW9u55qE5qC35byPICovXG4gIHB1YmxpYyBnZXRPcHRpb25DbHMob3B0aW9uOiBDYXNjYWRlck9wdGlvbiwgaW5kZXg6IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LW1lbnUtaXRlbWAgXSAgICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LW1lbnUtaXRlbS1leHBhbmRgIF0gIDogIW9wdGlvbi5pc0xlYWYsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1tZW51LWl0ZW0tYWN0aXZlYCBdICA6IHRoaXMuaXNBY3RpdmVkT3B0aW9uKG9wdGlvbiwgaW5kZXgpLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tbWVudS1pdGVtLWRpc2FibGVkYCBdOiBvcHRpb24uZGlzYWJsZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1tZW51LWl0ZW0tbG9hZGluZ2AgXSA6IG9wdGlvbi5sb2FkaW5nXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBwcmV2ZW50IGlucHV0IGNoYW5nZSBldmVudCAqL1xuICBwdWJsaWMgaGFuZGxlcklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqIGlucHV0IGVsZW1lbnQgYmx1ciAqL1xuICBwdWJsaWMgaGFuZGxlSW5wdXRCbHVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIC8qXG4gICAgaWYgKCF0aGlzLm56U2hvd1NlYXJjaCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAqL1xuICAgIGlmICh0aGlzLm1lbnVWaXNpYmxlKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7IC8vIGtlZXAgaW5wdXQgaGFzIGZvY3VzIHdoZW4gbWVudSBvcGVuZWRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ibHVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIGlucHV0IGVsZW1lbnQgZm9jdXMgKi9cbiAgcHVibGljIGhhbmRsZUlucHV0Rm9jdXMoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgLypcbiAgICBpZiAoIXRoaXMubnpTaG93U2VhcmNoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgICovXG4gICAgdGhpcy5mb2N1cygpO1xuICAgIHRoaXMuc2V0TGFiZWxDbGFzcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYXNJbnB1dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbnB1dFZhbHVlLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwcml2YXRlIGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRvIHNob3cgaW5wdXQgZWxlbWVudCBwbGFjZWhvbGRlciAqL1xuICBwdWJsaWMgZ2V0IHNob3dQbGFjZWhvbGRlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISh0aGlzLmhhc0lucHV0KCkgfHwgdGhpcy5oYXNWYWx1ZSgpKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBjbGVhciBidXR0b24gaXMgdmlzaWJsZSAqL1xuICBwdWJsaWMgZ2V0IHNob3dDbGVhckljb24oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNIYXNWYWx1ZSA9IHRoaXMuaGFzVmFsdWUoKTtcbiAgICBjb25zdCBpc0hhc0lucHV0ID0gdGhpcy5oYXNJbnB1dCgpO1xuICAgIHJldHVybiB0aGlzLm56QWxsb3dDbGVhciAmJiAhdGhpcy5uekRpc2FibGVkICYmIChpc0hhc1ZhbHVlIHx8IGlzSGFzSW5wdXQpO1xuICB9XG5cbiAgLyoqIGNsZWFyIHRoZSBpbnB1dCBib3ggYW5kIHNlbGVjdGVkIG9wdGlvbnMgKi9cbiAgcHVibGljIGNsZWFyU2VsZWN0aW9uKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICB0aGlzLmxhYmVsUmVuZGVyVGV4dCA9ICcnO1xuICAgIC8vIHRoaXMuaXNMYWJlbFJlbmRlclRlbXBsYXRlID0gZmFsc2U7XG4gICAgLy8gY2xlYXIgY3VzdG9tIGNvbnRleHRcbiAgICB0aGlzLmxhYmVsUmVuZGVyQ29udGV4dCA9IHt9O1xuICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gW107XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gJyc7XG4gICAgdGhpcy5zZXRNZW51VmlzaWJsZShmYWxzZSk7XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZSBldmVudFxuICAgIHRoaXMub25WYWx1ZUNoYW5nZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZERpc3BsYXlMYWJlbCgpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9ucztcbiAgICBjb25zdCBsYWJlbHM6IHN0cmluZ1tdID0gc2VsZWN0ZWRPcHRpb25zLm1hcChvID0+IHRoaXMuZ2V0T3B0aW9uTGFiZWwobykpO1xuICAgIC8vIOiuvue9ruW9k+WJjeaOp+S7tueahOaYvuekuuWAvFxuICAgIGlmICh0aGlzLmlzTGFiZWxSZW5kZXJUZW1wbGF0ZSkge1xuICAgICAgdGhpcy5sYWJlbFJlbmRlckNvbnRleHQgPSB7IGxhYmVscywgc2VsZWN0ZWRPcHRpb25zIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFiZWxSZW5kZXJUZXh0ID0gZGVmYXVsdERpc3BsYXlSZW5kZXIuY2FsbCh0aGlzLCBsYWJlbHMsIHNlbGVjdGVkT3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsgJyRldmVudCcgXSlcbiAgcHVibGljIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICAgIGlmIChrZXlDb2RlICE9PSBET1dOX0FSUk9XICYmXG4gICAgICBrZXlDb2RlICE9PSBVUF9BUlJPVyAmJlxuICAgICAga2V5Q29kZSAhPT0gTEVGVF9BUlJPVyAmJlxuICAgICAga2V5Q29kZSAhPT0gUklHSFRfQVJST1cgJiZcbiAgICAgIGtleUNvZGUgIT09IEVOVEVSICYmXG4gICAgICBrZXlDb2RlICE9PSBCQUNLU1BBQ0UgJiZcbiAgICAgIGtleUNvZGUgIT09IEVTQ0FQRSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmluU2VhcmNoICYmIChcbiAgICAgIGtleUNvZGUgPT09IEJBQ0tTUEFDRSB8fFxuICAgICAga2V5Q29kZSA9PT0gTEVGVF9BUlJPVyB8fFxuICAgICAga2V5Q29kZSA9PT0gUklHSFRfQVJST1dcbiAgICApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJlc3MgYW55IGtleXMgYWJvdmUgdG8gcmVvcGVuIG1lbnVcbiAgICBpZiAoIXRoaXMuaXNNZW51VmlzaWJsZSgpICYmXG4gICAgICBrZXlDb2RlICE9PSBCQUNLU1BBQ0UgJiZcbiAgICAgIGtleUNvZGUgIT09IEVTQ0FQRSkge1xuICAgICAgdGhpcy5zZXRNZW51VmlzaWJsZSh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gUHJlc3MgRVNDIHRvIGNsb3NlIG1lbnVcbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFKSB7XG4gICAgICAvLyB0aGlzLnNldE1lbnVWaXNpYmxlKGZhbHNlKTsgLy8gYWxyZWFkeSBjYWxsIGJ5IGNkay1vdmVybGF5IGRldGFjaFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTWVudVZpc2libGUoKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmIChrZXlDb2RlID09PSBET1dOX0FSUk9XKSB7XG4gICAgICAgIHRoaXMubW92ZURvd24oKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcbiAgICAgICAgdGhpcy5tb3ZlVXAoKTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gTEVGVF9BUlJPVykge1xuICAgICAgICB0aGlzLm1vdmVMZWZ0KCk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IFJJR0hUX0FSUk9XKSB7XG4gICAgICAgIHRoaXMubW92ZVJpZ2h0KCk7XG4gICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIHRoaXMub25FbnRlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyAnJGV2ZW50JyBdKVxuICBwdWJsaWMgb25UcmlnZ2VyQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub25Ub3VjaGVkKCk7IC8vIHNldCB5b3VyIGNvbnRyb2wgdG8gJ3RvdWNoZWQnXG4gICAgaWYgKHRoaXMubnpTaG93U2VhcmNoKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNDbGlja1RpZ2dlckFjdGlvbigpKSB7XG4gICAgICB0aGlzLmRlbGF5U2V0TWVudVZpc2libGUoIXRoaXMubWVudVZpc2libGUsIDEwMCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicsIFsgJyRldmVudCcgXSlcbiAgcHVibGljIG9uVHJpZ2dlck1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUG9pbnRlclRpZ2dlckFjdGlvbigpKSB7XG4gICAgICB0aGlzLmRlbGF5U2V0TWVudVZpc2libGUodHJ1ZSwgdGhpcy5uek1vdXNlRW50ZXJEZWxheSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsgJyRldmVudCcgXSlcbiAgcHVibGljIG9uVHJpZ2dlck1vdXNlTGVhdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc01lbnVWaXNpYmxlKCkgfHwgdGhpcy5pc09wZW5pbmcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUG9pbnRlclRpZ2dlckFjdGlvbigpKSB7XG4gICAgICBjb25zdCBtb3VzZVRhcmdldCA9IGV2ZW50LnJlbGF0ZWRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBjb25zdCBob3N0RWwgPSB0aGlzLmVsO1xuICAgICAgY29uc3QgbWVudUVsID0gdGhpcy5tZW51ICYmIHRoaXMubWVudS5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKGhvc3RFbC5jb250YWlucyhtb3VzZVRhcmdldCkgfHwgKG1lbnVFbCAmJiBtZW51RWwuY29udGFpbnMobW91c2VUYXJnZXQpKVxuICAgICAgLyp8fCBtb3VzZVRhcmdldC5wYXJlbnRFbGVtZW50LmNvbnRhaW5zKG1lbnVFbCkqLykge1xuICAgICAgICAvLyDlm6DkuLrmta7lsYLnmoRiYWNrZHJvcOWHuueOsO+8jOaaguaXtuayoeacieWKnuazleiHquWKqOa2iOWksVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlbGF5U2V0TWVudVZpc2libGUoZmFsc2UsIHRoaXMubnpNb3VzZUxlYXZlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNDbGlja1RpZ2dlckFjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpUcmlnZ2VyQWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMubnpUcmlnZ2VyQWN0aW9uID09PSAnY2xpY2snO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uelRyaWdnZXJBY3Rpb24uaW5kZXhPZignY2xpY2snKSAhPT0gLTE7XG4gIH1cblxuICBwcml2YXRlIGlzUG9pbnRlclRpZ2dlckFjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpUcmlnZ2VyQWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMubnpUcmlnZ2VyQWN0aW9uID09PSAnaG92ZXInO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uelRyaWdnZXJBY3Rpb24uaW5kZXhPZignaG92ZXInKSAhPT0gLTE7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VNZW51KCk6IHZvaWQge1xuICAgIHRoaXMuYmx1cigpO1xuICAgIHRoaXMuY2xlYXJEZWxheVRpbWVyKCk7XG4gICAgdGhpcy5zZXRNZW51VmlzaWJsZShmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRGVsYXlUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZWxheVRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWxheVRpbWVyKTtcbiAgICAgIHRoaXMuZGVsYXlUaW1lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOaYvuekuuaIluiAhemakOiXj+iPnOWNlVxuICAgKlxuICAgKiBAcGFyYW0gdmlzaWJsZSB0cnVlLeaYvuekuu+8jGZhbHNlLemakOiXj1xuICAgKiBAcGFyYW0gZGVsYXkg5bu26L+f5pe26Ze0XG4gICAqL1xuICBwdWJsaWMgZGVsYXlTZXRNZW51VmlzaWJsZSh2aXNpYmxlOiBib29sZWFuLCBkZWxheTogbnVtYmVyLCBzZXRPcGVuaW5nOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmNsZWFyRGVsYXlUaW1lcigpO1xuICAgIGlmIChkZWxheSkge1xuICAgICAgaWYgKHZpc2libGUgJiYgc2V0T3BlbmluZykge1xuICAgICAgICB0aGlzLmlzT3BlbmluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmRlbGF5VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRNZW51VmlzaWJsZSh2aXNpYmxlKTtcbiAgICAgICAgdGhpcy5jbGVhckRlbGF5VGltZXIoKTtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuaW5nID0gZmFsc2U7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgICAgfSwgZGVsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldE1lbnVWaXNpYmxlKHZpc2libGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc01lbnVWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm1lbnVWaXNpYmxlO1xuICB9XG5cbiAgcHVibGljIHNldE1lbnVWaXNpYmxlKG1lbnVWaXNpYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1lbnVWaXNpYmxlICE9PSBtZW51VmlzaWJsZSkge1xuICAgICAgdGhpcy5tZW51VmlzaWJsZSA9IG1lbnVWaXNpYmxlO1xuXG4gICAgICAvLyB1cGRhdGUgY2xhc3NcbiAgICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICAgIHRoaXMuc2V0QXJyb3dDbGFzcygpO1xuICAgICAgdGhpcy5zZXRNZW51Q2xhc3MoKTtcblxuICAgICAgaWYgKG1lbnVWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlVmlzaWJsZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5uelZpc2libGVDaGFuZ2UuZW1pdChtZW51VmlzaWJsZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIGxvYWQgaW5pdCBkYXRhIGlmIG5lY2Vzc2FyeSAqL1xuICBwcml2YXRlIGJlZm9yZVZpc2libGUoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkUm9vdE9wdGlvbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFJvb3RPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5uekNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCByb290OiBhbnkgPSB7fTtcbiAgICAgIHRoaXMubG9hZENoaWxkcmVuKHJvb3QsIC0xKTtcbiAgICB9XG4gIH1cblxuICAvKiog6I635Y+WT3B0aW9u55qE5YC877yM5L6L5aaC77yM5Y+v5Lul5oyH5a6abGFiZWxQcm9wZXJ0eT1cIm5hbWVcIuadpeWPlk5hbWUgKi9cbiAgcHVibGljIGdldE9wdGlvbkxhYmVsKG9wdGlvbjogQ2FzY2FkZXJPcHRpb24pOiBhbnkge1xuICAgIHJldHVybiBvcHRpb25bIHRoaXMubnpMYWJlbFByb3BlcnR5IHx8ICdsYWJlbCcgXTtcbiAgfVxuXG4gIC8qKiDojrflj5ZPcHRpb27nmoTlgLzvvIzkvovlpoLvvIzlj6/ku6XmjIflrpp2YWx1ZVByb3BlcnR5PVwiaWRcIuadpeWPlklEICovXG4gIHB1YmxpYyBnZXRPcHRpb25WYWx1ZShvcHRpb246IENhc2NhZGVyT3B0aW9uKTogYW55IHtcbiAgICByZXR1cm4gb3B0aW9uWyB0aGlzLm56VmFsdWVQcm9wZXJ0eSB8fCAndmFsdWUnIF07XG4gIH1cblxuICBwcml2YXRlIGlzQWN0aXZlZE9wdGlvbihvcHRpb246IENhc2NhZGVyT3B0aW9uLCBpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYWN0aXZlT3B0ID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zWyBpbmRleCBdO1xuICAgIHJldHVybiBhY3RpdmVPcHQgPT09IG9wdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiDorr7nva7mn5DliJfnmoTmv4DmtLvnmoToj5zljZXpgInpoblcbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbiDoj5zljZXpgInpoblcbiAgICogQHBhcmFtIGluZGV4ICDpgInpobnmiYDlnKjnmoTliJfnu4TnmoTntKLlvJVcbiAgICogQHBhcmFtIHNlbGVjdCDmmK/lkKbop6blj5HpgInmi6nnu5PngrlcbiAgICovXG4gIHByaXZhdGUgc2V0QWN0aXZlT3B0aW9uKG9wdGlvbjogQ2FzY2FkZXJPcHRpb24sIGluZGV4OiBudW1iZXIsIHNlbGVjdDogYm9vbGVhbiA9IGZhbHNlLCBsb2FkQ2hpbGRyZW46IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKCFvcHRpb24gfHwgb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zWyBpbmRleCBdID0gb3B0aW9uO1xuXG4gICAgLy8g5b2T55u05o6l6YCJ5oup5pyA5ZCO5LiA57qn5pe277yM5YmN6Z2i55qE6YCJ6aG56KaB6KGl5YWo44CC5L6L5aaC77yM6YCJ5oup4oCc5Z+O5biC4oCd77yM5YiZ6Ieq5Yqo6KGl5YWo4oCc5Zu95a624oCd44CB4oCc55yB5Lu94oCdXG4gICAgZm9yIChsZXQgaSA9IGluZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICghdGhpcy5hY3RpdmF0ZWRPcHRpb25zWyBpIF0pIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zWyBpIF0gPSB0aGlzLmFjdGl2YXRlZE9wdGlvbnNbIGkgKyAxIF0ucGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyDmiKrmlq3lpJrkvZnnmoTpgInpobnvvIzlpoLpgInmi6nigJznnIHku73igJ3vvIzliJnlj6rkvJrmnInigJzlm73lrrbigJ3jgIHigJznnIHku73igJ3vvIzljrvmjonigJzln47luILigJ3jgIHigJzljLrljr/igJ1cbiAgICBpZiAoaW5kZXggPCB0aGlzLmFjdGl2YXRlZE9wdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zLnNsaWNlKDAsIGluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgLy8gbG9hZCBjaGlsZHJlblxuICAgIGlmIChvcHRpb24uY2hpbGRyZW4gJiYgb3B0aW9uLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgb3B0aW9uLmlzTGVhZiA9IGZhbHNlO1xuICAgICAgb3B0aW9uLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gY2hpbGQucGFyZW50ID0gb3B0aW9uKTtcbiAgICAgIHRoaXMuc2V0Q29sdW1uRGF0YShvcHRpb24uY2hpbGRyZW4sIGluZGV4ICsgMSk7XG4gICAgfSBlbHNlIGlmICghb3B0aW9uLmlzTGVhZiAmJiBsb2FkQ2hpbGRyZW4pIHtcbiAgICAgIHRoaXMubG9hZENoaWxkcmVuKG9wdGlvbiwgaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjbGlja2luZyBsZWFmIG5vZGUgd2lsbCByZW1vdmUgYW55IGNoaWxkcmVuIGNvbHVtbnNcbiAgICAgIGlmIChpbmRleCA8IHRoaXMubnpDb2x1bW5zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5uekNvbHVtbnMgPSB0aGlzLm56Q29sdW1ucy5zbGljZSgwLCBpbmRleCArIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgc2VsZWN0IGV2ZW50LCBhbmQgZGlzcGxheSBsYWJlbFxuICAgIGlmIChzZWxlY3QpIHtcbiAgICAgIHRoaXMub25TZWxlY3RPcHRpb24ob3B0aW9uLCBpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQ2hpbGRyZW4ob3B0aW9uOiBDYXNjYWRlck9wdGlvbiwgaW5kZXg6IG51bWJlciwgc3VjY2Vzcz86ICgpID0+IHZvaWQsIGZhaWx1cmU/OiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpMb2FkRGF0YSkge1xuICAgICAgdGhpcy5pc0xvYWRpbmcgPSBpbmRleCA8IDA7XG4gICAgICBvcHRpb24ubG9hZGluZyA9IHRydWU7XG4gICAgICB0aGlzLm56TG9hZERhdGEob3B0aW9uLCBpbmRleCkudGhlbigoKSA9PiB7XG4gICAgICAgIG9wdGlvbi5sb2FkaW5nID0gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9wdGlvbi5jaGlsZHJlbikge1xuICAgICAgICAgIG9wdGlvbi5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IGNoaWxkLnBhcmVudCA9IGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IG9wdGlvbik7XG4gICAgICAgICAgdGhpcy5zZXRDb2x1bW5EYXRhKG9wdGlvbi5jaGlsZHJlbiwgaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgIHN1Y2Nlc3MoKTtcbiAgICAgICAgfVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICBvcHRpb24ubG9hZGluZyA9IHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIG9wdGlvbi5pc0xlYWYgPSB0cnVlO1xuICAgICAgICBpZiAoZmFpbHVyZSkge1xuICAgICAgICAgIGZhaWx1cmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblNlbGVjdE9wdGlvbihvcHRpb246IENhc2NhZGVyT3B0aW9uLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gdHJpZ2dlciBgbnpTZWxlY3RgIGV2ZW50XG4gICAgdGhpcy5uelNlbGVjdC5lbWl0KHsgb3B0aW9uLCBpbmRleCB9KTtcblxuICAgIC8vIOeUn+aIkOaYvuekulxuICAgIGlmIChvcHRpb24uaXNMZWFmIHx8IHRoaXMubnpDaGFuZ2VPblNlbGVjdCB8fCB0aGlzLmlzQ2hhbmdlT24ob3B0aW9uLCBpbmRleCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zID0gdGhpcy5hY3RpdmF0ZWRPcHRpb25zO1xuICAgICAgLy8g6K6+572u5b2T5YmN5o6n5Lu255qE5pi+56S65YC8XG4gICAgICB0aGlzLmJ1aWxkRGlzcGxheUxhYmVsKCk7XG4gICAgICAvLyDop6blj5Hlj5jmm7Tkuovku7ZcbiAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8vIGNsb3NlIG1lbnUgaWYgY2xpY2sgb24gbGVhZlxuICAgIGlmIChvcHRpb24uaXNMZWFmKSB7XG4gICAgICB0aGlzLmRlbGF5U2V0TWVudVZpc2libGUoZmFsc2UsIHRoaXMubnpNb3VzZUxlYXZlRGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDnlLHnlKjmiLfmnaXlrprkuYnngrnlh7vlkI7mmK/lkKblj5jmm7QgKi9cbiAgcHJpdmF0ZSBpc0NoYW5nZU9uKG9wdGlvbjogQ2FzY2FkZXJPcHRpb24sIGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubnpDaGFuZ2VPbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMubnpDaGFuZ2VPbihvcHRpb24sIGluZGV4KSA9PT0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb2x1bW5EYXRhKG9wdGlvbnM6IENhc2NhZGVyT3B0aW9uW10sIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIWFycmF5RXF1YWxzKHRoaXMubnpDb2x1bW5zWyBpbmRleCBdLCBvcHRpb25zKSkge1xuICAgICAgdGhpcy5uekNvbHVtbnNbIGluZGV4IF0gPSBvcHRpb25zO1xuICAgICAgaWYgKGluZGV4IDwgdGhpcy5uekNvbHVtbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLm56Q29sdW1ucyA9IHRoaXMubnpDb2x1bW5zLnNsaWNlKDAsIGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOm8oOagh+eCueWHu+mAiemhuVxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9uIOiPnOWNlemAiemhuVxuICAgKiBAcGFyYW0gaW5kZXgg6YCJ6aG55omA5Zyo55qE5YiX57uE55qE57Si5byVXG4gICAqIEBwYXJhbSBldmVudCDpvKDmoIfkuovku7ZcbiAgICovXG4gIG9uT3B0aW9uQ2xpY2sob3B0aW9uOiBDYXNjYWRlck9wdGlvbiwgaW5kZXg6IG51bWJlciwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8vIEtlZXAgZm9jdXNlZCBzdGF0ZSBmb3Iga2V5Ym9hcmQgc3VwcG9ydFxuICAgIHRoaXMuZWwuZm9jdXMoKTtcblxuICAgIGlmIChvcHRpb24gJiYgb3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaW5TZWFyY2gpIHtcbiAgICAgIHRoaXMuc2V0U2VhcmNoQWN0aXZlT3B0aW9uKG9wdGlvbiBhcyBDYXNjYWRlclNlYXJjaE9wdGlvbiwgZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihvcHRpb24sIGluZGV4LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKiog5oyJ5LiL5Zue6L2m6ZSu5pe26YCJ5oupICovXG4gIHByaXZhdGUgb25FbnRlcigpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5JbmRleCA9IE1hdGgubWF4KHRoaXMuYWN0aXZhdGVkT3B0aW9ucy5sZW5ndGggLSAxLCAwKTtcbiAgICBjb25zdCBhY3RpdmVPcHRpb24gPSB0aGlzLmFjdGl2YXRlZE9wdGlvbnNbIGNvbHVtbkluZGV4IF07XG4gICAgaWYgKGFjdGl2ZU9wdGlvbiAmJiAhYWN0aXZlT3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICBpZiAodGhpcy5pblNlYXJjaCkge1xuICAgICAgICB0aGlzLnNldFNlYXJjaEFjdGl2ZU9wdGlvbihhY3RpdmVPcHRpb24gYXMgQ2FzY2FkZXJTZWFyY2hPcHRpb24sIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdE9wdGlvbihhY3RpdmVPcHRpb24sIGNvbHVtbkluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcHJlc3MgYHVwYCBvciBgZG93bmAgYXJyb3cgdG8gYWN0aXZhdGUgdGhlIHNpYmxpbmcgb3B0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBtb3ZlVXBPckRvd24oaXNVcDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gTWF0aC5tYXgodGhpcy5hY3RpdmF0ZWRPcHRpb25zLmxlbmd0aCAtIDEsIDApO1xuICAgIC8vIOivpee7hOS4reW3sue7j+iiq+a/gOa0u+eahOmAiemhuVxuICAgIGNvbnN0IGFjdGl2ZU9wdGlvbiA9IHRoaXMuYWN0aXZhdGVkT3B0aW9uc1sgY29sdW1uSW5kZXggXTtcbiAgICAvLyDor6Xnu4TmiYDmnInnmoTpgInpobnvvIznlKjkuo7pgY3ljobojrflj5bkuIvkuIDkuKrooqvmv4DmtLvnmoTpgInpoblcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5uekNvbHVtbnNbIGNvbHVtbkluZGV4IF0gfHwgW107XG4gICAgY29uc3QgbGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgbGV0IG5leHRJbmRleCA9IC0xO1xuICAgIGlmICghYWN0aXZlT3B0aW9uKSB7IC8vIOivpeWIl+i/mOayoeaciemAieS4reeahOmAiemhuVxuICAgICAgbmV4dEluZGV4ID0gaXNVcCA/IGxlbmd0aCA6IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0SW5kZXggPSBvcHRpb25zLmluZGV4T2YoYWN0aXZlT3B0aW9uKTtcbiAgICB9XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgbmV4dEluZGV4ID0gaXNVcCA/IG5leHRJbmRleCAtIDEgOiBuZXh0SW5kZXggKyAxO1xuICAgICAgaWYgKG5leHRJbmRleCA8IDAgfHwgbmV4dEluZGV4ID49IGxlbmd0aCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHRPcHRpb24gPSBvcHRpb25zWyBuZXh0SW5kZXggXTtcbiAgICAgIGlmICghbmV4dE9wdGlvbiB8fCBuZXh0T3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24obmV4dE9wdGlvbiwgY29sdW1uSW5kZXgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlVXAoKTogdm9pZCB7XG4gICAgdGhpcy5tb3ZlVXBPckRvd24odHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIG1vdmVEb3duKCk6IHZvaWQge1xuICAgIHRoaXMubW92ZVVwT3JEb3duKGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcmVzcyBgbGVmdGAgYXJyb3cgdG8gcmVtb3ZlIHRoZSBsYXN0IHNlbGVjdGVkIG9wdGlvbi5cbiAgICovXG4gIHByaXZhdGUgbW92ZUxlZnQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuYWN0aXZhdGVkT3B0aW9ucztcbiAgICBpZiAob3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnMucG9wKCk7IC8vIFJlbW92ZSB0aGUgbGFzdCBvbmVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcHJlc3MgYHJpZ2h0YCBhcnJvdyB0byBzZWxlY3QgdGhlIG5leHQgY29sdW1uIG9wdGlvbi5cbiAgICovXG4gIHByaXZhdGUgbW92ZVJpZ2h0KCk6IHZvaWQge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuYWN0aXZhdGVkT3B0aW9ucy5sZW5ndGg7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMubnpDb2x1bW5zWyBsZW5ndGggXTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dE9wdCA9IG9wdGlvbnMuZmluZChvID0+ICFvLmRpc2FibGVkKTtcbiAgICAgIGlmIChuZXh0T3B0KSB7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG5leHRPcHQsIGxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOm8oOagh+WIkuWFpemAiemhuVxuICAgKlxuICAgKiBAcGFyYW0gb3B0aW9uIOiPnOWNlemAiemhuVxuICAgKiBAcGFyYW0gaW5kZXgg6YCJ6aG55omA5Zyo55qE5YiX57uE55qE57Si5byVXG4gICAqIEBwYXJhbSBldmVudCDpvKDmoIfkuovku7ZcbiAgICovXG4gIG9uT3B0aW9uTW91c2VFbnRlcihvcHRpb246IENhc2NhZGVyT3B0aW9uLCBpbmRleDogbnVtYmVyLCBldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLm56RXhwYW5kVHJpZ2dlciA9PT0gJ2hvdmVyJyAmJiAhb3B0aW9uLmlzTGVhZikge1xuICAgICAgdGhpcy5kZWxheVNlbGVjdChvcHRpb24sIGluZGV4LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6byg5qCH5YiS5Ye66YCJ6aG5XG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb24g6I+c5Y2V6YCJ6aG5XG4gICAqIEBwYXJhbSBpbmRleCDpgInpobnmiYDlnKjnmoTliJfnu4TnmoTntKLlvJVcbiAgICogQHBhcmFtIGV2ZW50IOm8oOagh+S6i+S7tlxuICAgKi9cbiAgb25PcHRpb25Nb3VzZUxlYXZlKG9wdGlvbjogQ2FzY2FkZXJPcHRpb24sIGluZGV4OiBudW1iZXIsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMubnpFeHBhbmRUcmlnZ2VyID09PSAnaG92ZXInICYmICFvcHRpb24uaXNMZWFmKSB7XG4gICAgICB0aGlzLmRlbGF5U2VsZWN0KG9wdGlvbiwgaW5kZXgsIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRGVsYXlTZWxlY3RUaW1lcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kZWxheVNlbGVjdFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWxheVNlbGVjdFRpbWVyKTtcbiAgICAgIHRoaXMuZGVsYXlTZWxlY3RUaW1lciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZWxheVNlbGVjdChvcHRpb246IENhc2NhZGVyT3B0aW9uLCBpbmRleDogbnVtYmVyLCBkb1NlbGVjdDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJEZWxheVNlbGVjdFRpbWVyKCk7XG4gICAgaWYgKGRvU2VsZWN0KSB7XG4gICAgICB0aGlzLmRlbGF5U2VsZWN0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8g6byg5qCH5ruR5YWl5Y+q5bGV5byA77yM5LiN6L+b6KGM6YCJ5Lit5pON5L2cXG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKG9wdGlvbiwgaW5kZXgpO1xuICAgICAgICB0aGlzLmRlbGF5U2VsZWN0VGltZXIgPSBudWxsO1xuICAgICAgfSwgMTUwKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3VibWl0VmFsdWUoKTogYW55W10ge1xuICAgIGNvbnN0IHZhbHVlczogYW55W10gPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICB2YWx1ZXMucHVzaCh0aGlzLmdldE9wdGlvblZhbHVlKG9wdGlvbikpO1xuICAgIH0pO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cblxuICBwcml2YXRlIG9uVmFsdWVDaGFuZ2UoKTogdm9pZCB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFN1Ym1pdFZhbHVlKCk7XG4gICAgaWYgKCFhcnJheUVxdWFscyh0aGlzLnZhbHVlLCB2YWx1ZSkpIHtcbiAgICAgIHRoaXMuZGVmYXVsdFZhbHVlID0gbnVsbDsgLy8gY2xlYXIgdGhlIGluaXQtdmFsdWVcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpOyAvLyBBbmd1bGFyIG5lZWQgdGhpc1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm56Q2xlYXIuZW1pdCgpOyAvLyBmaXJzdCB0cmlnZ2VyIGBjbGVhcmAgYW5kIHRoZW4gYGNoYW5nZWBcbiAgICAgIH1cbiAgICAgIHRoaXMubnpTZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG4gICAgICB0aGlzLm56Q2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIG56VXBkYXRlSG9zdENsYXNzU2VydmljZTogTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kT3B0aW9uKG9wdGlvbjogYW55LCBpbmRleDogbnVtYmVyKTogQ2FzY2FkZXJPcHRpb24ge1xuICAgIGNvbnN0IG9wdGlvbnM6IENhc2NhZGVyT3B0aW9uW10gPSB0aGlzLm56Q29sdW1uc1sgaW5kZXggXTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2Ygb3B0aW9uID09PSAnb2JqZWN0JyA/IHRoaXMuZ2V0T3B0aW9uVmFsdWUob3B0aW9uKSA6IG9wdGlvbjtcbiAgICAgIHJldHVybiBvcHRpb25zLmZpbmQobyA9PiB2YWx1ZSA9PT0gdGhpcy5nZXRPcHRpb25WYWx1ZShvKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0xvYWRlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpDb2x1bW5zWyBpbmRleCBdICYmIHRoaXMubnpDb2x1bW5zWyBpbmRleCBdLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwcml2YXRlIGFjdGl2YXRlT25Jbml0KGluZGV4OiBudW1iZXIsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBsZXQgb3B0aW9uID0gdGhpcy5maW5kT3B0aW9uKHZhbHVlLCBpbmRleCk7XG4gICAgaWYgKCFvcHRpb24pIHtcbiAgICAgIG9wdGlvbiA9IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgPyB2YWx1ZSA6IHtcbiAgICAgICAgWyBgJHt0aGlzLm56VmFsdWVQcm9wZXJ0eSB8fCAndmFsdWUnfWAgXTogdmFsdWUsXG4gICAgICAgIFsgYCR7dGhpcy5uekxhYmVsUHJvcGVydHkgfHwgJ2xhYmVsJ31gIF06IHZhbHVlXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihvcHRpb24sIGluZGV4LCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0T3B0aW9ucyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgdnMgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcbiAgICBjb25zdCBsb2FkID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0ZU9uSW5pdChpbmRleCwgdnNbIGluZGV4IF0pO1xuICAgICAgaWYgKGluZGV4IDwgdnMubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLmluaXRPcHRpb25zKGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT09IHZzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5hZnRlcldyaXRlVmFsdWUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuaXNMb2FkZWQoaW5kZXgpIHx8ICF0aGlzLm56TG9hZERhdGEpIHtcbiAgICAgIGxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMuYWN0aXZhdGVkT3B0aW9uc1sgaW5kZXggLSAxIF0gfHwge307XG4gICAgICB0aGlzLmxvYWRDaGlsZHJlbihub2RlLCBpbmRleCAtIDEsIGxvYWQsIHRoaXMuYWZ0ZXJXcml0ZVZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhZnRlcldyaXRlVmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLmFjdGl2YXRlZE9wdGlvbnM7XG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuZ2V0U3VibWl0VmFsdWUoKTtcbiAgICB0aGlzLmJ1aWxkRGlzcGxheUxhYmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogV3JpdGUgYSBuZXcgdmFsdWUgdG8gdGhlIGVsZW1lbnQuXG4gICAqXG4gICAqIEBPdmVycmlkZSAoRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2UpXG4gICAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCB2cyA9IHRoaXMuZGVmYXVsdFZhbHVlID0gdG9BcnJheSh2YWx1ZSk7XG4gICAgaWYgKHZzLmxlbmd0aCkge1xuICAgICAgdGhpcy5pbml0T3B0aW9ucygwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHZzO1xuICAgICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gW107XG4gICAgICB0aGlzLmFmdGVyV3JpdGVWYWx1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IChfOiBhbnkpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChpc0Rpc2FibGVkKSB7XG4gICAgICB0aGlzLmNsb3NlTWVudSgpO1xuICAgIH1cbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU2VhcmNoVmFsdWUoKTogdm9pZCB7XG4gICAgY29uc3QgcmVzdWx0czogQ2FzY2FkZXJTZWFyY2hPcHRpb25bXSA9IFtdO1xuICAgIGNvbnN0IHBhdGg6IENhc2NhZGVyT3B0aW9uW10gPSBbXTtcbiAgICBjb25zdCBkZWZhdWx0RmlsdGVyID0gKGlucHV0VmFsdWU6IHN0cmluZywgcDogQ2FzY2FkZXJPcHRpb25bXSk6IGJvb2xlYW4gPT4ge1xuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgIHAuZm9yRWFjaChuID0+IHtcbiAgICAgICAgaWYgKG4ubGFiZWwuaW5kZXhPZihpbnB1dFZhbHVlKSA+IC0xKSB7XG4gICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZsYWc7XG4gICAgfTtcbiAgICBjb25zdCBmaWx0ZXI6IChpbnB1dFZhbHVlOiBzdHJpbmcsIHA6IENhc2NhZGVyT3B0aW9uW10pID0+IGJvb2xlYW4gPVxuICAgICAgdGhpcy5uelNob3dTZWFyY2ggaW5zdGFuY2VvZiBPYmplY3QgJiYgKHRoaXMubnpTaG93U2VhcmNoIGFzIE56U2hvd1NlYXJjaE9wdGlvbnMpLmZpbHRlciA/XG4gICAgICAgICh0aGlzLm56U2hvd1NlYXJjaCBhcyBOelNob3dTZWFyY2hPcHRpb25zKS5maWx0ZXIgOlxuICAgICAgICBkZWZhdWx0RmlsdGVyO1xuICAgIGNvbnN0IHNvcnRlcjogKGE6IENhc2NhZGVyT3B0aW9uW10sIGI6IENhc2NhZGVyT3B0aW9uW10sIGlucHV0VmFsdWU6IHN0cmluZykgPT4gbnVtYmVyID1cbiAgICAgIHRoaXMubnpTaG93U2VhcmNoIGluc3RhbmNlb2YgT2JqZWN0ICYmICh0aGlzLm56U2hvd1NlYXJjaCBhcyBOelNob3dTZWFyY2hPcHRpb25zKS5zb3J0ZXI7XG4gICAgY29uc3QgbG9vcFBhcmVudCA9IChub2RlOiBDYXNjYWRlck9wdGlvbiwgZm9yY2VEaXNhYmxlZCA9IGZhbHNlKSA9PiB7XG4gICAgICBjb25zdCBkaXNhYmxlZCA9IGZvcmNlRGlzYWJsZWQgfHwgbm9kZS5kaXNhYmxlZDtcbiAgICAgIHBhdGgucHVzaChub2RlKTtcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoc05vZGUpID0+IHtcbiAgICAgICAgaWYgKCFzTm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICBzTm9kZS5wYXJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgICAgIC8qKiDmkJzntKLnmoTlkIzml7blu7rnq4sgcGFyZW50IOi/nuaOpe+8jOWboOS4uueUqOaIt+ebtOaOpeaQnOe0oueahOivneaYr+ayoeacieW7uueri+i/nuaOpeeahO+8jOS8muaPkOWNh+S7juWPtuWtkOiKgueCueWbnua6r+eahOmavuW6piAqL1xuICAgICAgICBpZiAoIXNOb2RlLmlzTGVhZikge1xuICAgICAgICAgIGxvb3BQYXJlbnQoc05vZGUsIGRpc2FibGVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc05vZGUuaXNMZWFmIHx8ICFzTm9kZS5jaGlsZHJlbiB8fCAhc05vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgbG9vcENoaWxkKHNOb2RlLCBkaXNhYmxlZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcGF0aC5wb3AoKTtcbiAgICB9O1xuICAgIGNvbnN0IGxvb3BDaGlsZCA9IChub2RlOiBDYXNjYWRlck9wdGlvbiwgZm9yY2VEaXNhYmxlZCA9IGZhbHNlKSA9PiB7XG4gICAgICBwYXRoLnB1c2gobm9kZSk7XG4gICAgICBjb25zdCBjUGF0aCA9IEFycmF5LmZyb20ocGF0aCk7XG4gICAgICBpZiAoZmlsdGVyKHRoaXMuX2lucHV0VmFsdWUsIGNQYXRoKSkge1xuICAgICAgICBjb25zdCBkaXNhYmxlZCA9IGZvcmNlRGlzYWJsZWQgfHwgbm9kZS5kaXNhYmxlZDtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICBpc0xlYWY6IHRydWUsXG4gICAgICAgICAgcGF0aCAgOiBjUGF0aCxcbiAgICAgICAgICBsYWJlbCA6IGNQYXRoLm1hcChwID0+IHAubGFiZWwpLmpvaW4oJyAvICcpXG4gICAgICAgIH0gYXMgQ2FzY2FkZXJTZWFyY2hPcHRpb24pO1xuICAgICAgfVxuICAgICAgcGF0aC5wb3AoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5vbGRDb2x1bW5zSG9sZGVyWyAwIF0uZm9yRWFjaChub2RlID0+IChub2RlLmlzTGVhZiB8fCAhbm9kZS5jaGlsZHJlbiB8fCAhbm9kZS5jaGlsZHJlbi5sZW5ndGgpID8gbG9vcENoaWxkKG5vZGUpIDogbG9vcFBhcmVudChub2RlKSk7XG4gICAgaWYgKHNvcnRlcikge1xuICAgICAgcmVzdWx0cy5zb3J0KChhLCBiKSA9PiBzb3J0ZXIoYS5wYXRoLCBiLnBhdGgsIHRoaXMuX2lucHV0VmFsdWUpKTtcbiAgICB9XG4gICAgdGhpcy5uekNvbHVtbnMgPSBbIHJlc3VsdHMgXTtcbiAgfVxuXG4gIHJlbmRlclNlYXJjaFN0cmluZyhzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5faW5wdXRWYWx1ZSwgJ2cnKSxcbiAgICAgIGA8c3BhbiBjbGFzcz1cImFudC1jYXNjYWRlci1tZW51LWl0ZW0ta2V5d29yZFwiPiR7dGhpcy5faW5wdXRWYWx1ZX08L3NwYW4+YCk7XG4gIH1cblxuICBzZXRTZWFyY2hBY3RpdmVPcHRpb24ocmVzdWx0OiBDYXNjYWRlclNlYXJjaE9wdGlvbiwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb25zID0gWyByZXN1bHQgXTtcbiAgICB0aGlzLmRlbGF5U2V0TWVudVZpc2libGUoZmFsc2UsIDIwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcnOyAvLyBOb3Qgb25seSByZW1vdmUgYGlucHV0VmFsdWVgIGJ1dCBhbHNvIHJldmVyc2UgYG56Q29sdW1uc2AgaW4gdGhlIGhvb2suXG4gICAgICBjb25zdCBpbmRleCA9IHJlc3VsdC5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCBkZXN0aU5vZGUgPSByZXN1bHQucGF0aFsgaW5kZXggXTtcbiAgICAgIGNvbnN0IG1vY2tDbGlja1BhcmVudCA9IChub2RlOiBDYXNjYWRlck9wdGlvbiwgY0luZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICBtb2NrQ2xpY2tQYXJlbnQobm9kZS5wYXJlbnQsIGNJbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25PcHRpb25DbGljayhub2RlLCBjSW5kZXgsIGV2ZW50KTtcbiAgICAgIH07XG4gICAgICBtb2NrQ2xpY2tQYXJlbnQoZGVzdGlOb2RlLCBpbmRleCk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIOiuvue9ruagt+W8j1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLnNldExhYmVsQ2xhc3MoKTtcbiAgICB0aGlzLnNldEFycm93Q2xhc3MoKTtcbiAgICB0aGlzLnNldExvYWRpbmdDbGFzcygpO1xuICAgIHRoaXMuc2V0Q2xlYXJDbGFzcygpO1xuICAgIHRoaXMuc2V0SW5wdXRDbGFzcygpO1xuICAgIHRoaXMuc2V0TWVudUNsYXNzKCk7XG4gICAgdGhpcy5zZXRNZW51Q29sdW1uQ2xhc3MoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xlYXJEZWxheVRpbWVyKCk7XG4gICAgdGhpcy5jbGVhckRlbGF5U2VsZWN0VGltZXIoKTtcbiAgfVxuXG59XG4iXX0=