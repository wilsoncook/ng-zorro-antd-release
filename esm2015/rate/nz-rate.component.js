/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { forwardRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
export class NzRateComponent {
    /**
     * @param {?} renderer
     */
    constructor(renderer) {
        this.renderer = renderer;
        this._allowClear = true;
        this._allowHalf = false;
        this._disabled = false;
        this._count = 5;
        this._value = 0;
        this._autoFocus = false;
        this.nzOnBlur = new EventEmitter();
        this.nzOnFocus = new EventEmitter();
        this.nzOnKeyDown = new EventEmitter();
        this.nzOnHoverChange = new EventEmitter();
        this.prefixCls = 'ant-rate';
        this.isInit = false;
        this.hasHalf = false;
        this.innerPrefixCls = `${this.prefixCls}-star`;
        this.starArray = [];
        this.hoverValue = 0;
        this.isFocused = false;
        this.floatReg = /^\d+(\.\d+)?$/;
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAutoFocus(value) {
        this._autoFocus = toBoolean(value);
        this.updateAutoFocus();
    }
    /**
     * @return {?}
     */
    get nzAutoFocus() {
        return this._autoFocus;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzCount(value) {
        if (this._count === value) {
            return;
        }
        this._count = value;
        this.updateStarArray();
    }
    /**
     * @return {?}
     */
    get nzCount() {
        return this._count;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAllowHalf(value) {
        this._allowHalf = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzAllowHalf() {
        return this._allowHalf;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAllowClear(value) {
        this._allowClear = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzAllowClear() {
        return this._allowClear;
    }
    /**
     * @return {?}
     */
    get nzValue() {
        return this._value;
    }
    /**
     * @param {?} input
     * @return {?}
     */
    set nzValue(input) {
        /** @type {?} */
        let value = input;
        if (this._value === value) {
            return;
        }
        this._value = value;
        if (this.floatReg.test(value.toString())) {
            value += 0.5;
            this.hasHalf = true;
        }
        this.hoverValue = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            [this.prefixCls]: true,
            [`${this.prefixCls}-disabled`]: this.nzDisabled
        };
    }
    /**
     * @return {?}
     */
    updateAutoFocus() {
        if (this.isInit && !this.nzDisabled) {
            if (this.nzAutoFocus) {
                this.renderer.setAttribute(this.ulElement.nativeElement, 'autofocus', 'autofocus');
            }
            else {
                this.renderer.removeAttribute(this.ulElement.nativeElement, 'autofocus');
            }
        }
    }
    /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    clickRate(e, index, isFull) {
        e.stopPropagation();
        if (this.nzDisabled) {
            return;
        }
        this.hasHalf = !isFull && this.nzAllowHalf;
        /** @type {?} */
        let actualValue = index + 1;
        this.hoverValue = actualValue;
        if (this.hasHalf) {
            actualValue -= 0.5;
        }
        if (this.nzValue === actualValue) {
            if (this.nzAllowClear) {
                this.nzValue = 0;
                this.onChange(this.nzValue);
            }
        }
        else {
            this.nzValue = actualValue;
            this.onChange(this.nzValue);
        }
    }
    /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    hoverRate(e, index, isFull) {
        e.stopPropagation();
        if (this.nzDisabled) {
            return;
        }
        /** @type {?} */
        const isHalf = !isFull && this.nzAllowHalf;
        if (this.hoverValue === index + 1 && isHalf === this.hasHalf) {
            return;
        }
        this.hoverValue = index + 1;
        this.nzOnHoverChange.emit(this.hoverValue);
        this.hasHalf = isHalf;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    leaveRate(e) {
        e.stopPropagation();
        /** @type {?} */
        let oldVal = this.nzValue;
        if (this.floatReg.test(oldVal.toString())) {
            oldVal += 0.5;
            this.hasHalf = true;
        }
        this.hoverValue = oldVal;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onFocus(e) {
        this.isFocused = true;
        this.nzOnFocus.emit(e);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onBlur(e) {
        this.isFocused = false;
        this.nzOnBlur.emit(e);
    }
    /**
     * @return {?}
     */
    focus() {
        this.ulElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    blur() {
        this.ulElement.nativeElement.blur();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        /** @type {?} */
        const code = e.code;
        if ((code === 'ArrowRight' || e.keyCode === 39) && (this.nzValue < this.nzCount)) {
            if (this.nzAllowHalf) {
                this.nzValue += 0.5;
            }
            else {
                this.nzValue += 1;
            }
            this.onChange(this.nzValue);
        }
        else if ((code === 'ArrowLeft' || e.keyCode === 37) && (this.nzValue > 0)) {
            if (this.nzAllowHalf) {
                this.nzValue -= 0.5;
            }
            else {
                this.nzValue -= 1;
            }
            this.onChange(this.nzValue);
        }
        this.nzOnKeyDown.emit(e);
        e.preventDefault();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    setClasses(i) {
        return {
            [this.innerPrefixCls]: true,
            [`${this.innerPrefixCls}-full`]: (i + 1 < this.hoverValue) || (!this.hasHalf) && (i + 1 === this.hoverValue),
            [`${this.innerPrefixCls}-half`]: (this.hasHalf) && (i + 1 === this.hoverValue),
            [`${this.innerPrefixCls}-active`]: (this.hasHalf) && (i + 1 === this.hoverValue),
            [`${this.innerPrefixCls}-zero`]: (i + 1 > this.hoverValue),
            [`${this.innerPrefixCls}-focused`]: (this.hasHalf) && (i + 1 === this.hoverValue) && this.isFocused
        };
    }
    /**
     * @return {?}
     */
    updateStarArray() {
        /** @type {?} */
        let index = 0;
        this.starArray = [];
        while (index < this.nzCount) {
            this.starArray.push(index++);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.nzValue = value || 0;
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
        this.nzDisabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
        this.updateStarArray();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isInit = true;
    }
}
NzRateComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-rate',
                preserveWhitespaces: false,
                template: "<ng-template #defaultCharacter><i class=\"anticon anticon-star\"></i></ng-template>\n<ul\n  #ulElement\n  [ngClass]=\"classMap\"\n  (mouseleave)=\"leaveRate($event)\"\n  (focus)=\"onFocus($event)\"\n  (blur)=\"onBlur($event)\"\n  (keydown)=\"onKeyDown($event)\"\n  [tabindex]=\"nzDisabled?-1:1\">\n  <li *ngFor=\"let star of starArray\"\n    [ngClass]=\"setClasses(star)\"\n    (mouseover)=\"hoverRate($event, star, true)\"\n    (click)=\"clickRate($event, star, true)\">\n    <div class=\"ant-rate-star-first\" (mouseover)=\"hoverRate($event, star, false)\" (click)=\"clickRate($event, star, false)\">\n      <ng-template [ngTemplateOutlet]=\"nzCharacter||defaultCharacter\"></ng-template>\n    </div>\n    <div class=\"ant-rate-star-second\" (mouseover)=\"hoverRate($event, star, true)\" (click)=\"clickRate($event, star, true)\">\n      <ng-template [ngTemplateOutlet]=\"nzCharacter||defaultCharacter\"></ng-template>\n    </div>\n  </li>\n</ul>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzRateComponent),
                        multi: true
                    }
                ]
            }] }
];
/** @nocollapse */
NzRateComponent.ctorParameters = () => [
    { type: Renderer2 }
];
NzRateComponent.propDecorators = {
    nzCharacter: [{ type: Input }],
    nzOnBlur: [{ type: Output }],
    nzOnFocus: [{ type: Output }],
    nzOnKeyDown: [{ type: Output }],
    nzOnHoverChange: [{ type: Output }],
    ulElement: [{ type: ViewChild, args: ['ulElement',] }],
    nzAutoFocus: [{ type: Input }],
    nzCount: [{ type: Input }],
    nzAllowHalf: [{ type: Input }],
    nzAllowClear: [{ type: Input }],
    nzDisabled: [{ type: Input }]
};
function NzRateComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzRateComponent.prototype._allowClear;
    /** @type {?} */
    NzRateComponent.prototype._allowHalf;
    /** @type {?} */
    NzRateComponent.prototype._disabled;
    /** @type {?} */
    NzRateComponent.prototype._count;
    /** @type {?} */
    NzRateComponent.prototype._value;
    /** @type {?} */
    NzRateComponent.prototype._autoFocus;
    /** @type {?} */
    NzRateComponent.prototype.nzCharacter;
    /** @type {?} */
    NzRateComponent.prototype.nzOnBlur;
    /** @type {?} */
    NzRateComponent.prototype.nzOnFocus;
    /** @type {?} */
    NzRateComponent.prototype.nzOnKeyDown;
    /** @type {?} */
    NzRateComponent.prototype.nzOnHoverChange;
    /** @type {?} */
    NzRateComponent.prototype.ulElement;
    /** @type {?} */
    NzRateComponent.prototype.prefixCls;
    /** @type {?} */
    NzRateComponent.prototype.isInit;
    /** @type {?} */
    NzRateComponent.prototype.hasHalf;
    /** @type {?} */
    NzRateComponent.prototype.innerPrefixCls;
    /** @type {?} */
    NzRateComponent.prototype.classMap;
    /** @type {?} */
    NzRateComponent.prototype.starArray;
    /** @type {?} */
    NzRateComponent.prototype.hoverValue;
    /** @type {?} */
    NzRateComponent.prototype.isFocused;
    /** @type {?} */
    NzRateComponent.prototype.floatReg;
    /** @type {?} */
    NzRateComponent.prototype.onChange;
    /** @type {?} */
    NzRateComponent.prototype.onTouched;
    /** @type {?} */
    NzRateComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcmF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsicmF0ZS9uei1yYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFFVixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFjakQsTUFBTTs7OztJQTJPSixZQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXOzJCQTFPakIsSUFBSTswQkFDTCxLQUFLO3lCQUNOLEtBQUs7c0JBQ1IsQ0FBQztzQkFDRCxDQUFDOzBCQUNHLEtBQUs7d0JBRUwsSUFBSSxZQUFZLEVBQWM7eUJBQzdCLElBQUksWUFBWSxFQUFjOzJCQUM1QixJQUFJLFlBQVksRUFBaUI7K0JBQzdCLElBQUksWUFBWSxFQUFVO3lCQUUxQyxVQUFVO3NCQUNiLEtBQUs7dUJBQ0osS0FBSzs4QkFDRSxHQUFHLElBQUksQ0FBQyxTQUFTLE9BQU87eUJBRW5CLEVBQUU7MEJBQ1gsQ0FBQzt5QkFDRixLQUFLO3dCQUNFLGVBQWU7d0JBRUUsR0FBRyxFQUFFLENBQUMsSUFBSTt5QkFDdEIsR0FBRyxFQUFFLENBQUMsSUFBSTtLQW9OakM7Ozs7O0lBbE5ELElBQ0ksV0FBVyxDQUFDLEtBQWM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxD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QzlCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUM5QyxLQUFLLEVBQVEsSUFBSTtxQkFDbEI7aUJBQ0Y7YUFDRjs7OztZQW5CQyxTQUFTOzs7MEJBMkJSLEtBQUs7dUJBQ0wsTUFBTTt3QkFDTixNQUFNOzBCQUNOLE1BQU07OEJBQ04sTUFBTTt3QkFDTixTQUFTLFNBQUMsV0FBVzswQkFjckIsS0FBSztzQkFVTCxLQUFLOzBCQWFMLEtBQUs7MkJBU0wsS0FBSzt5QkEwQkwsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXJhdGUnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotcmF0ZS5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFtcbiAgICB7XG4gICAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelJhdGVDb21wb25lbnQpLFxuICAgICAgbXVsdGkgICAgICA6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpSYXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgQWZ0ZXJWaWV3SW5pdCB7XG4gIHByaXZhdGUgX2FsbG93Q2xlYXIgPSB0cnVlO1xuICBwcml2YXRlIF9hbGxvd0hhbGYgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY291bnQgPSA1O1xuICBwcml2YXRlIF92YWx1ZSA9IDA7XG4gIHByaXZhdGUgX2F1dG9Gb2N1cyA9IGZhbHNlO1xuICBASW5wdXQoKSBuekNoYXJhY3RlcjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBPdXRwdXQoKSBuek9uQmx1ciA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpIG56T25Gb2N1cyA9IG5ldyBFdmVudEVtaXR0ZXI8Rm9jdXNFdmVudD4oKTtcbiAgQE91dHB1dCgpIG56T25LZXlEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpO1xuICBAT3V0cHV0KCkgbnpPbkhvdmVyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBWaWV3Q2hpbGQoJ3VsRWxlbWVudCcpIHByaXZhdGUgdWxFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcmVmaXhDbHMgPSAnYW50LXJhdGUnO1xuICBpc0luaXQgPSBmYWxzZTtcbiAgaGFzSGFsZiA9IGZhbHNlO1xuICBpbm5lclByZWZpeENscyA9IGAke3RoaXMucHJlZml4Q2xzfS1zdGFyYDtcbiAgY2xhc3NNYXA7XG4gIHN0YXJBcnJheTogbnVtYmVyW10gPSBbXTtcbiAgaG92ZXJWYWx1ZSA9IDA7XG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xuICBmbG9hdFJlZzogUmVnRXhwID0gL15cXGQrKFxcLlxcZCspPyQvO1xuXG4gIG9uQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZCA9ICgpID0+IG51bGw7XG4gIG9uVG91Y2hlZDogKCkgPT4gdm9pZCA9ICgpID0+IG51bGw7XG5cbiAgQElucHV0KClcbiAgc2V0IG56QXV0b0ZvY3VzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYXV0b0ZvY3VzID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZUF1dG9Gb2N1cygpO1xuICB9XG5cbiAgZ2V0IG56QXV0b0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hdXRvRm9jdXM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpDb3VudCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2NvdW50ID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jb3VudCA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlU3RhckFycmF5KCk7XG4gIH1cblxuICBnZXQgbnpDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekFsbG93SGFsZih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FsbG93SGFsZiA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpBbGxvd0hhbGYoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG93SGFsZjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekFsbG93Q2xlYXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbGxvd0NsZWFyID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekFsbG93Q2xlYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbG93Q2xlYXI7XG4gIH1cblxuICBnZXQgbnpWYWx1ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHNldCBuelZhbHVlKGlucHV0OiBudW1iZXIpIHtcbiAgICBsZXQgdmFsdWUgPSBpbnB1dDtcbiAgICBpZiAodGhpcy5fdmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuZmxvYXRSZWcudGVzdCh2YWx1ZS50b1N0cmluZygpKSkge1xuICAgICAgdmFsdWUgKz0gMC41O1xuICAgICAgdGhpcy5oYXNIYWxmID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5ob3ZlclZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpEaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBzZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzTWFwID0ge1xuICAgICAgWyB0aGlzLnByZWZpeENscyBdICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1kaXNhYmxlZGAgXTogdGhpcy5uekRpc2FibGVkXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUF1dG9Gb2N1cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0luaXQgJiYgIXRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgaWYgKHRoaXMubnpBdXRvRm9jdXMpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2F1dG9mb2N1cycsICdhdXRvZm9jdXMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhdXRvZm9jdXMnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGlja1JhdGUoZTogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlciwgaXNGdWxsOiBib29sZWFuKTogdm9pZCB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaGFzSGFsZiA9ICFpc0Z1bGwgJiYgdGhpcy5uekFsbG93SGFsZjtcblxuICAgIGxldCBhY3R1YWxWYWx1ZSA9IGluZGV4ICsgMTtcbiAgICB0aGlzLmhvdmVyVmFsdWUgPSBhY3R1YWxWYWx1ZTtcblxuICAgIGlmICh0aGlzLmhhc0hhbGYpIHtcbiAgICAgIGFjdHVhbFZhbHVlIC09IDAuNTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uelZhbHVlID09PSBhY3R1YWxWYWx1ZSkge1xuICAgICAgaWYgKHRoaXMubnpBbGxvd0NsZWFyKSB7XG4gICAgICAgIHRoaXMubnpWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5uelZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5uelZhbHVlID0gYWN0dWFsVmFsdWU7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgaG92ZXJSYXRlKGU6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIsIGlzRnVsbDogYm9vbGVhbik6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0hhbGY6IGJvb2xlYW4gPSAhaXNGdWxsICYmIHRoaXMubnpBbGxvd0hhbGY7XG4gICAgaWYgKHRoaXMuaG92ZXJWYWx1ZSA9PT0gaW5kZXggKyAxICYmIGlzSGFsZiA9PT0gdGhpcy5oYXNIYWxmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5ob3ZlclZhbHVlID0gaW5kZXggKyAxO1xuICAgIHRoaXMubnpPbkhvdmVyQ2hhbmdlLmVtaXQodGhpcy5ob3ZlclZhbHVlKTtcbiAgICB0aGlzLmhhc0hhbGYgPSBpc0hhbGY7XG4gIH1cblxuICBsZWF2ZVJhdGUoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IG9sZFZhbCA9IHRoaXMubnpWYWx1ZTtcbiAgICBpZiAodGhpcy5mbG9hdFJlZy50ZXN0KG9sZFZhbC50b1N0cmluZygpKSkge1xuICAgICAgb2xkVmFsICs9IDAuNTtcbiAgICAgIHRoaXMuaGFzSGFsZiA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IG9sZFZhbDtcbiAgfVxuXG4gIG9uRm9jdXMoZTogRm9jdXNFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLm56T25Gb2N1cy5lbWl0KGUpO1xuICB9XG5cbiAgb25CbHVyKGU6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMubnpPbkJsdXIuZW1pdChlKTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIGJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGNvZGUgPSBlLmNvZGU7XG4gICAgaWYgKChjb2RlID09PSAnQXJyb3dSaWdodCcgfHwgZS5rZXlDb2RlID09PSAzOSkgJiYgKHRoaXMubnpWYWx1ZSA8IHRoaXMubnpDb3VudCkpIHtcbiAgICAgIGlmICh0aGlzLm56QWxsb3dIYWxmKSB7XG4gICAgICAgIHRoaXMubnpWYWx1ZSArPSAwLjU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm56VmFsdWUgKz0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5uelZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKChjb2RlID09PSAnQXJyb3dMZWZ0JyB8fCBlLmtleUNvZGUgPT09IDM3KSAmJiAodGhpcy5uelZhbHVlID4gMCkpIHtcbiAgICAgIGlmICh0aGlzLm56QWxsb3dIYWxmKSB7XG4gICAgICAgIHRoaXMubnpWYWx1ZSAtPSAwLjU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm56VmFsdWUgLT0gMTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5uelZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5uek9uS2V5RG93bi5lbWl0KGUpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIHNldENsYXNzZXMoaTogbnVtYmVyKTogb2JqZWN0IHtcbiAgICByZXR1cm4ge1xuICAgICAgWyB0aGlzLmlubmVyUHJlZml4Q2xzIF0gICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLmlubmVyUHJlZml4Q2xzfS1mdWxsYCBdICAgOiAoaSArIDEgPCB0aGlzLmhvdmVyVmFsdWUpIHx8ICghdGhpcy5oYXNIYWxmKSAmJiAoaSArIDEgPT09IHRoaXMuaG92ZXJWYWx1ZSksXG4gICAgICBbIGAke3RoaXMuaW5uZXJQcmVmaXhDbHN9LWhhbGZgIF0gICA6ICh0aGlzLmhhc0hhbGYpICYmIChpICsgMSA9PT0gdGhpcy5ob3ZlclZhbHVlKSxcbiAgICAgIFsgYCR7dGhpcy5pbm5lclByZWZpeENsc30tYWN0aXZlYCBdIDogKHRoaXMuaGFzSGFsZikgJiYgKGkgKyAxID09PSB0aGlzLmhvdmVyVmFsdWUpLFxuICAgICAgWyBgJHt0aGlzLmlubmVyUHJlZml4Q2xzfS16ZXJvYCBdICAgOiAoaSArIDEgPiB0aGlzLmhvdmVyVmFsdWUpLFxuICAgICAgWyBgJHt0aGlzLmlubmVyUHJlZml4Q2xzfS1mb2N1c2VkYCBdOiAodGhpcy5oYXNIYWxmKSAmJiAoaSArIDEgPT09IHRoaXMuaG92ZXJWYWx1ZSkgJiYgdGhpcy5pc0ZvY3VzZWRcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlU3RhckFycmF5KCk6IHZvaWQge1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgdGhpcy5zdGFyQXJyYXkgPSBbXTtcbiAgICB3aGlsZSAoaW5kZXggPCB0aGlzLm56Q291bnQpIHtcbiAgICAgIHRoaXMuc3RhckFycmF5LnB1c2goaW5kZXgrKyk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMubnpWYWx1ZSA9IHZhbHVlIHx8IDA7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogbnVtYmVyKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5uekRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMudXBkYXRlU3RhckFycmF5KCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICB9XG59XG4iXX0=