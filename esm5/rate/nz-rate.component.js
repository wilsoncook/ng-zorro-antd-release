/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { forwardRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
var NzRateComponent = /** @class */ (function () {
    function NzRateComponent(renderer) {
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
        this.innerPrefixCls = this.prefixCls + "-star";
        this.starArray = [];
        this.hoverValue = 0;
        this.isFocused = false;
        this.floatReg = /^\d+(\.\d+)?$/;
        this.onChange = function () { return null; };
        this.onTouched = function () { return null; };
    }
    Object.defineProperty(NzRateComponent.prototype, "nzAutoFocus", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoFocus;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._autoFocus = toBoolean(value);
            this.updateAutoFocus();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRateComponent.prototype, "nzCount", {
        get: /**
         * @return {?}
         */
        function () {
            return this._count;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._count === value) {
                return;
            }
            this._count = value;
            this.updateStarArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRateComponent.prototype, "nzAllowHalf", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allowHalf;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allowHalf = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRateComponent.prototype, "nzAllowClear", {
        get: /**
         * @return {?}
         */
        function () {
            return this._allowClear;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._allowClear = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRateComponent.prototype, "nzValue", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} input
         * @return {?}
         */
        function (input) {
            /** @type {?} */
            var value = input;
            if (this._value === value) {
                return;
            }
            this._value = value;
            if (this.floatReg.test(value.toString())) {
                value += 0.5;
                this.hasHalf = true;
            }
            this.hoverValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzRateComponent.prototype, "nzDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = toBoolean(value);
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzRateComponent.prototype.setClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        this.classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this.prefixCls + "-disabled"] = this.nzDisabled,
            _a);
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.updateAutoFocus = /**
     * @return {?}
     */
    function () {
        if (this.isInit && !this.nzDisabled) {
            if (this.nzAutoFocus) {
                this.renderer.setAttribute(this.ulElement.nativeElement, 'autofocus', 'autofocus');
            }
            else {
                this.renderer.removeAttribute(this.ulElement.nativeElement, 'autofocus');
            }
        }
    };
    /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    NzRateComponent.prototype.clickRate = /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    function (e, index, isFull) {
        e.stopPropagation();
        if (this.nzDisabled) {
            return;
        }
        this.hasHalf = !isFull && this.nzAllowHalf;
        /** @type {?} */
        var actualValue = index + 1;
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
    };
    /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    NzRateComponent.prototype.hoverRate = /**
     * @param {?} e
     * @param {?} index
     * @param {?} isFull
     * @return {?}
     */
    function (e, index, isFull) {
        e.stopPropagation();
        if (this.nzDisabled) {
            return;
        }
        /** @type {?} */
        var isHalf = !isFull && this.nzAllowHalf;
        if (this.hoverValue === index + 1 && isHalf === this.hasHalf) {
            return;
        }
        this.hoverValue = index + 1;
        this.nzOnHoverChange.emit(this.hoverValue);
        this.hasHalf = isHalf;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzRateComponent.prototype.leaveRate = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.stopPropagation();
        /** @type {?} */
        var oldVal = this.nzValue;
        if (this.floatReg.test(oldVal.toString())) {
            oldVal += 0.5;
            this.hasHalf = true;
        }
        this.hoverValue = oldVal;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzRateComponent.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isFocused = true;
        this.nzOnFocus.emit(e);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzRateComponent.prototype.onBlur = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isFocused = false;
        this.nzOnBlur.emit(e);
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.ulElement.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.blur = /**
     * @return {?}
     */
    function () {
        this.ulElement.nativeElement.blur();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzRateComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var code = e.code;
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
    };
    /**
     * @param {?} i
     * @return {?}
     */
    NzRateComponent.prototype.setClasses = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        var _a;
        return _a = {},
            _a[this.innerPrefixCls] = true,
            _a[this.innerPrefixCls + "-full"] = (i + 1 < this.hoverValue) || (!this.hasHalf) && (i + 1 === this.hoverValue),
            _a[this.innerPrefixCls + "-half"] = (this.hasHalf) && (i + 1 === this.hoverValue),
            _a[this.innerPrefixCls + "-active"] = (this.hasHalf) && (i + 1 === this.hoverValue),
            _a[this.innerPrefixCls + "-zero"] = (i + 1 > this.hoverValue),
            _a[this.innerPrefixCls + "-focused"] = (this.hasHalf) && (i + 1 === this.hoverValue) && this.isFocused,
            _a;
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.updateStarArray = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var index = 0;
        this.starArray = [];
        while (index < this.nzCount) {
            this.starArray.push(index++);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzRateComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.nzValue = value || 0;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzRateComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzRateComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NzRateComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.nzDisabled = isDisabled;
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setClassMap();
        this.updateStarArray();
    };
    /**
     * @return {?}
     */
    NzRateComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isInit = true;
    };
    NzRateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-rate',
                    preserveWhitespaces: false,
                    template: "<ng-template #defaultCharacter><i class=\"anticon anticon-star\"></i></ng-template>\n<ul\n  #ulElement\n  [ngClass]=\"classMap\"\n  (mouseleave)=\"leaveRate($event)\"\n  (focus)=\"onFocus($event)\"\n  (blur)=\"onBlur($event)\"\n  (keydown)=\"onKeyDown($event)\"\n  [tabindex]=\"nzDisabled?-1:1\">\n  <li *ngFor=\"let star of starArray\"\n    [ngClass]=\"setClasses(star)\"\n    (mouseover)=\"hoverRate($event, star, true)\"\n    (click)=\"clickRate($event, star, true)\">\n    <div class=\"ant-rate-star-first\" (mouseover)=\"hoverRate($event, star, false)\" (click)=\"clickRate($event, star, false)\">\n      <ng-template [ngTemplateOutlet]=\"nzCharacter||defaultCharacter\"></ng-template>\n    </div>\n    <div class=\"ant-rate-star-second\" (mouseover)=\"hoverRate($event, star, true)\" (click)=\"clickRate($event, star, true)\">\n      <ng-template [ngTemplateOutlet]=\"nzCharacter||defaultCharacter\"></ng-template>\n    </div>\n  </li>\n</ul>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NzRateComponent; }),
                            multi: true
                        }
                    ]
                }] }
    ];
    /** @nocollapse */
    NzRateComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
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
    return NzRateComponent;
}());
export { NzRateComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcmF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsicmF0ZS9uei1yYXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFFVixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0lBeVAvQyx5QkFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVzsyQkExT2pCLElBQUk7MEJBQ0wsS0FBSzt5QkFDTixLQUFLO3NCQUNSLENBQUM7c0JBQ0QsQ0FBQzswQkFDRyxLQUFLO3dCQUVMLElBQUksWUFBWSxFQUFjO3lCQUM3QixJQUFJLFlBQVksRUFBYzsyQkFDNUIsSUFBSSxZQUFZLEVBQWlCOytCQUM3QixJQUFJLFlBQVksRUFBVTt5QkFFMUMsVUFBVTtzQkFDYixLQUFLO3VCQUNKLEtBQUs7OEJBQ0ssSUFBSSxDQUFDLFNBQVMsVUFBTzt5QkFFbkIsRUFBRTswQkFDWCxDQUFDO3lCQUNGLEtBQUs7d0JBQ0UsZUFBZTt3QkFFRSxjQUFNLE9BQUEsSUFBSSxFQUFKLENBQUk7eUJBQ3RCLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSTtLQW9OakM7SUFsTkQsc0JBQ0ksd0NBQVc7Ozs7UUFLZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN4Qjs7Ozs7UUFSRCxVQUNnQixLQUFjO1lBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4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VCxRQUFRLEVBQWEsU0FBUztvQkFDOUIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsZzhCQUErQztvQkFDL0MsU0FBUyxFQUFZO3dCQUNuQjs0QkFDRSxPQUFPLEVBQU0saUJBQWlCOzRCQUM5QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxlQUFlLEVBQWYsQ0FBZSxDQUFDOzRCQUM5QyxLQUFLLEVBQVEsSUFBSTt5QkFDbEI7cUJBQ0Y7aUJBQ0Y7Ozs7Z0JBbkJDLFNBQVM7Ozs4QkEyQlIsS0FBSzsyQkFDTCxNQUFNOzRCQUNOLE1BQU07OEJBQ04sTUFBTTtrQ0FDTixNQUFNOzRCQUNOLFNBQVMsU0FBQyxXQUFXOzhCQWNyQixLQUFLOzBCQVVMLEtBQUs7OEJBYUwsS0FBSzsrQkFTTCxLQUFLOzZCQTBCTCxLQUFLOzswQkFqSFI7O1NBNkJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBmb3J3YXJkUmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICduei1yYXRlJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXJhdGUuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnMgICAgICAgICAgOiBbXG4gICAge1xuICAgICAgcHJvdmlkZSAgICA6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpSYXRlQ29tcG9uZW50KSxcbiAgICAgIG11bHRpICAgICAgOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56UmF0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9hbGxvd0NsZWFyID0gdHJ1ZTtcbiAgcHJpdmF0ZSBfYWxsb3dIYWxmID0gZmFsc2U7XG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX2NvdW50ID0gNTtcbiAgcHJpdmF0ZSBfdmFsdWUgPSAwO1xuICBwcml2YXRlIF9hdXRvRm9jdXMgPSBmYWxzZTtcbiAgQElucHV0KCkgbnpDaGFyYWN0ZXI6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBAT3V0cHV0KCkgbnpPbkJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBuek9uRm9jdXMgPSBuZXcgRXZlbnRFbWl0dGVyPEZvY3VzRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBuek9uS2V5RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8S2V5Ym9hcmRFdmVudD4oKTtcbiAgQE91dHB1dCgpIG56T25Ib3ZlckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAVmlld0NoaWxkKCd1bEVsZW1lbnQnKSBwcml2YXRlIHVsRWxlbWVudDogRWxlbWVudFJlZjtcbiAgcHJlZml4Q2xzID0gJ2FudC1yYXRlJztcbiAgaXNJbml0ID0gZmFsc2U7XG4gIGhhc0hhbGYgPSBmYWxzZTtcbiAgaW5uZXJQcmVmaXhDbHMgPSBgJHt0aGlzLnByZWZpeENsc30tc3RhcmA7XG4gIGNsYXNzTWFwO1xuICBzdGFyQXJyYXk6IG51bWJlcltdID0gW107XG4gIGhvdmVyVmFsdWUgPSAwO1xuICBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgZmxvYXRSZWc6IFJlZ0V4cCA9IC9eXFxkKyhcXC5cXGQrKT8kLztcblxuICBvbkNoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xuICBvblRvdWNoZWQ6ICgpID0+IHZvaWQgPSAoKSA9PiBudWxsO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuekF1dG9Gb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2F1dG9Gb2N1cyA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy51cGRhdGVBdXRvRm9jdXMoKTtcbiAgfVxuXG4gIGdldCBuekF1dG9Gb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b0ZvY3VzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q291bnQodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9jb3VudCA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY291bnQgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZVN0YXJBcnJheSgpO1xuICB9XG5cbiAgZ2V0IG56Q291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpBbGxvd0hhbGYodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbGxvd0hhbGYgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56QWxsb3dIYWxmKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxvd0hhbGY7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpBbGxvd0NsZWFyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYWxsb3dDbGVhciA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpBbGxvd0NsZWFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbGxvd0NsZWFyO1xuICB9XG5cbiAgZ2V0IG56VmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgbnpWYWx1ZShpbnB1dDogbnVtYmVyKSB7XG4gICAgbGV0IHZhbHVlID0gaW5wdXQ7XG4gICAgaWYgKHRoaXMuX3ZhbHVlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmZsb2F0UmVnLnRlc3QodmFsdWUudG9TdHJpbmcoKSkpIHtcbiAgICAgIHZhbHVlICs9IDAuNTtcbiAgICAgIHRoaXMuaGFzSGFsZiA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc01hcCA9IHtcbiAgICAgIFsgdGhpcy5wcmVmaXhDbHMgXSAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tZGlzYWJsZWRgIF06IHRoaXMubnpEaXNhYmxlZFxuICAgIH07XG4gIH1cblxuICB1cGRhdGVBdXRvRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbml0ICYmICF0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm56QXV0b0ZvY3VzKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdhdXRvZm9jdXMnLCAnYXV0b2ZvY3VzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LCAnYXV0b2ZvY3VzJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xpY2tSYXRlKGU6IE1vdXNlRXZlbnQsIGluZGV4OiBudW1iZXIsIGlzRnVsbDogYm9vbGVhbik6IHZvaWQge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmhhc0hhbGYgPSAhaXNGdWxsICYmIHRoaXMubnpBbGxvd0hhbGY7XG5cbiAgICBsZXQgYWN0dWFsVmFsdWUgPSBpbmRleCArIDE7XG4gICAgdGhpcy5ob3ZlclZhbHVlID0gYWN0dWFsVmFsdWU7XG5cbiAgICBpZiAodGhpcy5oYXNIYWxmKSB7XG4gICAgICBhY3R1YWxWYWx1ZSAtPSAwLjU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubnpWYWx1ZSA9PT0gYWN0dWFsVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLm56QWxsb3dDbGVhcikge1xuICAgICAgICB0aGlzLm56VmFsdWUgPSAwO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubnpWYWx1ZSA9IGFjdHVhbFZhbHVlO1xuICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLm56VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGhvdmVyUmF0ZShlOiBNb3VzZUV2ZW50LCBpbmRleDogbnVtYmVyLCBpc0Z1bGw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLm56RGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNIYWxmOiBib29sZWFuID0gIWlzRnVsbCAmJiB0aGlzLm56QWxsb3dIYWxmO1xuICAgIGlmICh0aGlzLmhvdmVyVmFsdWUgPT09IGluZGV4ICsgMSAmJiBpc0hhbGYgPT09IHRoaXMuaGFzSGFsZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaG92ZXJWYWx1ZSA9IGluZGV4ICsgMTtcbiAgICB0aGlzLm56T25Ib3ZlckNoYW5nZS5lbWl0KHRoaXMuaG92ZXJWYWx1ZSk7XG4gICAgdGhpcy5oYXNIYWxmID0gaXNIYWxmO1xuICB9XG5cbiAgbGVhdmVSYXRlKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBvbGRWYWwgPSB0aGlzLm56VmFsdWU7XG4gICAgaWYgKHRoaXMuZmxvYXRSZWcudGVzdChvbGRWYWwudG9TdHJpbmcoKSkpIHtcbiAgICAgIG9sZFZhbCArPSAwLjU7XG4gICAgICB0aGlzLmhhc0hhbGYgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmhvdmVyVmFsdWUgPSBvbGRWYWw7XG4gIH1cblxuICBvbkZvY3VzKGU6IEZvY3VzRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmlzRm9jdXNlZCA9IHRydWU7XG4gICAgdGhpcy5uek9uRm9jdXMuZW1pdChlKTtcbiAgfVxuXG4gIG9uQmx1cihlOiBGb2N1c0V2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLm56T25CbHVyLmVtaXQoZSk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gIH1cblxuICBibHVyKCk6IHZvaWQge1xuICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBjb2RlID0gZS5jb2RlO1xuICAgIGlmICgoY29kZSA9PT0gJ0Fycm93UmlnaHQnIHx8IGUua2V5Q29kZSA9PT0gMzkpICYmICh0aGlzLm56VmFsdWUgPCB0aGlzLm56Q291bnQpKSB7XG4gICAgICBpZiAodGhpcy5uekFsbG93SGFsZikge1xuICAgICAgICB0aGlzLm56VmFsdWUgKz0gMC41O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uelZhbHVlICs9IDE7XG4gICAgICB9XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgfSBlbHNlIGlmICgoY29kZSA9PT0gJ0Fycm93TGVmdCcgfHwgZS5rZXlDb2RlID09PSAzNykgJiYgKHRoaXMubnpWYWx1ZSA+IDApKSB7XG4gICAgICBpZiAodGhpcy5uekFsbG93SGFsZikge1xuICAgICAgICB0aGlzLm56VmFsdWUgLT0gMC41O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5uelZhbHVlIC09IDE7XG4gICAgICB9XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMubnpWYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMubnpPbktleURvd24uZW1pdChlKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBzZXRDbGFzc2VzKGk6IG51bWJlcik6IG9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIFsgdGhpcy5pbm5lclByZWZpeENscyBdICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYCR7dGhpcy5pbm5lclByZWZpeENsc30tZnVsbGAgXSAgIDogKGkgKyAxIDwgdGhpcy5ob3ZlclZhbHVlKSB8fCAoIXRoaXMuaGFzSGFsZikgJiYgKGkgKyAxID09PSB0aGlzLmhvdmVyVmFsdWUpLFxuICAgICAgWyBgJHt0aGlzLmlubmVyUHJlZml4Q2xzfS1oYWxmYCBdICAgOiAodGhpcy5oYXNIYWxmKSAmJiAoaSArIDEgPT09IHRoaXMuaG92ZXJWYWx1ZSksXG4gICAgICBbIGAke3RoaXMuaW5uZXJQcmVmaXhDbHN9LWFjdGl2ZWAgXSA6ICh0aGlzLmhhc0hhbGYpICYmIChpICsgMSA9PT0gdGhpcy5ob3ZlclZhbHVlKSxcbiAgICAgIFsgYCR7dGhpcy5pbm5lclByZWZpeENsc30temVyb2AgXSAgIDogKGkgKyAxID4gdGhpcy5ob3ZlclZhbHVlKSxcbiAgICAgIFsgYCR7dGhpcy5pbm5lclByZWZpeENsc30tZm9jdXNlZGAgXTogKHRoaXMuaGFzSGFsZikgJiYgKGkgKyAxID09PSB0aGlzLmhvdmVyVmFsdWUpICYmIHRoaXMuaXNGb2N1c2VkXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZVN0YXJBcnJheSgpOiB2b2lkIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHRoaXMuc3RhckFycmF5ID0gW107XG4gICAgd2hpbGUgKGluZGV4IDwgdGhpcy5uekNvdW50KSB7XG4gICAgICB0aGlzLnN0YXJBcnJheS5wdXNoKGluZGV4KyspO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlciB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLm56VmFsdWUgPSB2YWx1ZSB8fCAwO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IG51bWJlcikgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMubnpEaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLnVwZGF0ZVN0YXJBcnJheSgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgfVxufVxuIl19