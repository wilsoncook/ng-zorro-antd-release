/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { isNotNil } from '../core/util/check';
var NzSelectTopControlComponent = /** @class */ (function () {
    function NzSelectTopControlComponent(renderer) {
        this.renderer = renderer;
        this._listTemplateOfOption = [];
        this.listOfCachedSelectedOption = [];
        this.isComposing = false;
        // tslint:disable-next-line:no-any
        this.nzListOfSelectedValueChange = new EventEmitter();
        this.nzOnSearch = new EventEmitter();
        this.nzMode = 'default';
        this.nzShowSearch = false;
        this.nzDisabled = false;
        this.nzOpen = false;
    }
    Object.defineProperty(NzSelectTopControlComponent.prototype, "nzListOfSelectedValue", {
        // tslint:disable-next-line:no-any
        get: /**
         * @return {?}
         */
        function () {
            return this._listOfSelectedValue;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._listOfSelectedValue = value;
            this.updateListOfCachedOption();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSelectTopControlComponent.prototype, "nzListTemplateOfOption", {
        get: /**
         * @return {?}
         */
        function () {
            return this._listTemplateOfOption;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._listTemplateOfOption = value;
            this.updateListOfCachedOption();
        },
        enumerable: true,
        configurable: true
    });
    /** cached selected option list **/
    /**
     * cached selected option list *
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.updateListOfCachedOption = /**
     * cached selected option list *
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isSingleMode) {
            /** @type {?} */
            var selectedOption = this.nzListTemplateOfOption.find(function (o) { return _this.compareWith(o.nzValue, _this.nzListOfSelectedValue[0]); });
            if (isNotNil(selectedOption)) {
                this.listOfCachedSelectedOption = [selectedOption];
            }
        }
        else {
            /** @type {?} */
            var listOfCachedOptionFromLatestTemplate_1 = this.nzListTemplateOfOption.filter(function (o) { return isNotNil(_this.nzListOfSelectedValue.find(function (v) { return _this.compareWith(v, o.nzValue); })); });
            /** @type {?} */
            var restSelectedValue_1 = this.nzListOfSelectedValue.filter(function (v) { return !isNotNil(listOfCachedOptionFromLatestTemplate_1.find(function (o) { return _this.compareWith(o.nzValue, v); })); });
            /** @type {?} */
            var listOfCachedOptionFromOld = this.listOfCachedSelectedOption.filter(function (o) { return isNotNil(restSelectedValue_1.find(function (v) { return _this.compareWith(o.nzValue, v); })); });
            this.listOfCachedSelectedOption = listOfCachedOptionFromLatestTemplate_1.concat(listOfCachedOptionFromOld);
        }
    };
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.setInputValue = /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    function (value, emit) {
        this.inputValue = value;
        this.updateWidth();
        this.nzOnSearch.emit({ value: value, emit: emit });
    };
    Object.defineProperty(NzSelectTopControlComponent.prototype, "isSingleMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzMode === 'default';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSelectTopControlComponent.prototype, "isMultipleOrTags", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzMode === 'tags' || this.nzMode === 'multiple';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSelectTopControlComponent.prototype, "placeHolderDisplay", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inputValue || this.isComposing || this.nzListOfSelectedValue.length ? 'none' : 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSelectTopControlComponent.prototype, "selectedValueDisplay", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var showSelectedValue = false;
            /** @type {?} */
            var opacity = 1;
            if (!this.nzShowSearch) {
                showSelectedValue = true;
            }
            else {
                if (this.nzOpen) {
                    showSelectedValue = !(this.inputValue || this.isComposing);
                    if (showSelectedValue) {
                        opacity = 0.4;
                    }
                }
                else {
                    showSelectedValue = true;
                }
            }
            return {
                display: showSelectedValue ? 'block' : 'none',
                opacity: "" + opacity
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSelectTopControlComponent.prototype, "singleValueLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.getPropertyFromValue(this.nzListOfSelectedValue[0], 'nzLabel');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.focusOnInput = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.inputElement) {
                _this.inputElement.nativeElement.focus();
            }
        });
    };
    // tslint:disable-next-line:no-any
    /**
     * @param {?} value
     * @param {?} prop
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.getPropertyFromValue = /**
     * @param {?} value
     * @param {?} prop
     * @return {?}
     */
    function (value, prop) {
        var _this = this;
        /** @type {?} */
        var targetOption = this.listOfCachedSelectedOption.find(function (item) { return _this.compareWith(item.nzValue, value); });
        return targetOption ? targetOption[prop] : '';
    };
    // tslint:disable-next-line:no-any
    /**
     * @param {?} value
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.isOptionDisplay = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return (this.nzMode === 'tags') || !!this.getPropertyFromValue(value, 'nzLabel');
    };
    // tslint:disable-next-line:no-any
    /**
     * @param {?} value
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.removeValueFormSelected = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.nzDisabled || this.getPropertyFromValue(value, 'nzDisabled')) {
            return;
        }
        this._listOfSelectedValue = this.nzListOfSelectedValue.filter(function (item) { return item !== value; });
        this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
    };
    /**
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.updateWidth = /**
     * @return {?}
     */
    function () {
        if (this.isMultipleOrTags && this.inputElement) {
            if (this.inputValue || this.isComposing) {
                this.renderer.setStyle(this.inputElement.nativeElement, 'width', this.inputElement.nativeElement.scrollWidth + "px");
            }
            else {
                this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
            }
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzSelectTopControlComponent.prototype.onKeyDownInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var keyCode = e.keyCode;
        /** @type {?} */
        var eventTarget = /** @type {?} */ (e.target);
        if (this.isMultipleOrTags &&
            !eventTarget.value &&
            // BackSpace
            keyCode === 8) {
            e.preventDefault();
            if (this.nzListOfSelectedValue.length) {
                this.removeValueFormSelected(this.nzListOfSelectedValue[this.nzListOfSelectedValue.length - 1]);
            }
        }
    };
    NzSelectTopControlComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nz-select-top-control]',
                    preserveWhitespaces: false,
                    animations: [
                        trigger('tagAnimation', [
                            state('*', style({ opacity: 1, transform: 'scale(1)' })),
                            transition('void => *', [
                                style({ opacity: 0, transform: 'scale(0)' }),
                                animate('150ms linear')
                            ]),
                            state('void', style({ opacity: 0, transform: 'scale(0)' })),
                            transition('* => void', [
                                style({ opacity: 1, transform: 'scale(1)' }),
                                animate('150ms linear')
                            ])
                        ])
                    ],
                    template: "<ng-template #inputTemplate>\n  <input\n    #inputElement\n    autocomplete=\"something-new\"\n    class=\"ant-select-search__field\"\n    (compositionstart)=\"isComposing = true\"\n    (compositionend)=\"isComposing = false\"\n    (input)=\"updateWidth()\"\n    (keydown)=\"onKeyDownInput($event)\"\n    [ngModel]=\"inputValue\"\n    (ngModelChange)=\"setInputValue($event,true)\"\n    [disabled]=\"nzDisabled\">\n</ng-template>\n<div\n  *ngIf=\"nzPlaceHolder\"\n  nz-select-unselectable\n  [style.display]=\"placeHolderDisplay\"\n  (click)=\"focusOnInput()\"\n  class=\"ant-select-selection__placeholder\">{{ nzPlaceHolder }}</div>\n<!--single mode-->\n<ng-container *ngIf=\"isSingleMode\">\n  <!--selected label-->\n  <div\n    *ngIf=\"nzListOfSelectedValue.length\"\n    class=\"ant-select-selection-selected-value\"\n    [attr.title]=\"nzListOfSelectedValue[0].nzLabel\"\n    [ngStyle]=\"selectedValueDisplay\">\n    {{ singleValueLabel }}\n  </div>\n  <!--show search-->\n  <div\n    *ngIf=\"nzShowSearch\"\n    class=\"ant-select-search ant-select-search--inline\">\n    <div class=\"ant-select-search__field__wrap\">\n      <ng-template [ngTemplateOutlet]=\"inputTemplate\"></ng-template>\n      <span class=\"ant-select-search__field__mirror\">{{inputValue}}&nbsp;</span>\n    </div>\n  </div>\n</ng-container>\n<!--multiple or tags mode-->\n<ul *ngIf=\"isMultipleOrTags\">\n  <ng-container *ngFor=\"let value of nzListOfSelectedValue\">\n    <li\n      *ngIf=\"isOptionDisplay(value)\"\n      [@tagAnimation]\n      [attr.title]=\"getPropertyFromValue(value,'nzLabel')\"\n      [class.ant-select-selection__choice__disabled]=\"getPropertyFromValue(value,'nzDisabled')\"\n      class=\"ant-select-selection__choice\">\n      <div class=\"ant-select-selection__choice__content\">{{ getPropertyFromValue(value, 'nzLabel') || value }}</div>\n      <span *ngIf=\"!getPropertyFromValue(value,'nzDisabled')\" class=\"ant-select-selection__choice__remove\" (click)=\"removeValueFormSelected(value)\"></span>\n    </li>\n  </ng-container>\n\n  <li class=\"ant-select-search ant-select-search--inline\">\n    <ng-template [ngTemplateOutlet]=\"inputTemplate\"></ng-template>\n  </li>\n</ul>",
                    host: {
                        '[class.ant-select-selection__rendered]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzSelectTopControlComponent.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    NzSelectTopControlComponent.propDecorators = {
        inputElement: [{ type: ViewChild, args: ['inputElement',] }],
        nzListOfSelectedValueChange: [{ type: Output }],
        nzOnSearch: [{ type: Output }],
        nzMode: [{ type: Input }],
        nzShowSearch: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        nzPlaceHolder: [{ type: Input }],
        nzOpen: [{ type: Input }],
        compareWith: [{ type: Input }],
        nzListOfSelectedValue: [{ type: Input }],
        nzListTemplateOfOption: [{ type: Input }]
    };
    return NzSelectTopControlComponent;
}());
export { NzSelectTopControlComponent };
function NzSelectTopControlComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSelectTopControlComponent.prototype._listOfSelectedValue;
    /** @type {?} */
    NzSelectTopControlComponent.prototype._listTemplateOfOption;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.listOfCachedSelectedOption;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.inputValue;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.isComposing;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.inputElement;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzListOfSelectedValueChange;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzOnSearch;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzMode;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzShowSearch;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzDisabled;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.nzOpen;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.compareWith;
    /** @type {?} */
    NzSelectTopControlComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJzZWxlY3Qvbnotc2VsZWN0LXRvcC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLE9BQU8sRUFDUCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFVBQVUsRUFDVixPQUFPLEVBQ1IsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFtTDVDLHFDQUFvQixRQUFtQjtRQUFuQixhQUFRLEdBQVIsUUFBUSxDQUFXO3FDQXZKYyxFQUFFOzBDQUNMLEVBQUU7MkJBRXRDLEtBQUs7OzJDQUdxQixJQUFJLFlBQVksRUFBUzswQkFDMUMsSUFBSSxZQUFZLEVBQW9DO3NCQUN6RCxTQUFTOzRCQUNILEtBQUs7MEJBQ1AsS0FBSztzQkFHVCxLQUFLO0tBNEl0QjtJQXhJRCxzQkFFSSw4REFBcUI7UUFLekIsa0NBQWtDOzs7O1FBQ2xDO1lBQ0UsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7U0FDbEM7Ozs7O1FBVkQsVUFFMEIsS0FBWTtZQUNwQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2pDOzs7T0FBQTtJQU9ELHNCQUNJLCtEQUFzQjs7OztRQUsxQjtZQUNFLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ25DOzs7OztRQVJELFVBQzJCLEtBQTBCO1lBQ25ELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7WUFDbkMsSUFBSSxD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RUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDO2dDQUM1QyxPQUFPLENBQUMsY0FBYyxDQUFDOzZCQUN4QixDQUFDO3lCQUNILENBQUM7cUJBQ0g7b0JBQ0QseXBFQUE2RDtvQkFDN0QsSUFBSSxFQUFpQjt3QkFDbkIsd0NBQXdDLEVBQUUsTUFBTTtxQkFDakQ7aUJBQ0Y7Ozs7Z0JBekI0RCxTQUFTOzs7K0JBaUNuRSxTQUFTLFNBQUMsY0FBYzs4Q0FFeEIsTUFBTTs2QkFDTixNQUFNO3lCQUNOLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO2dDQUVMLEtBQUs7eUJBQ0wsS0FBSzs4QkFFTCxLQUFLO3dDQUVMLEtBQUs7eUNBWUwsS0FBSzs7c0NBakVSOztTQWlDYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBhbmltYXRlLFxuICBzdGF0ZSxcbiAgc3R5bGUsXG4gIHRyYW5zaXRpb24sXG4gIHRyaWdnZXJcbn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi4vY29yZS91dGlsL2NoZWNrJztcbmltcG9ydCB7IE56T3B0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uei1vcHRpb24uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICdbbnotc2VsZWN0LXRvcC1jb250cm9sXScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbXG4gICAgdHJpZ2dlcigndGFnQW5pbWF0aW9uJywgW1xuICAgICAgc3RhdGUoJyonLCBzdHlsZSh7IG9wYWNpdHk6IDEsIHRyYW5zZm9ybTogJ3NjYWxlKDEpJyB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknIH0pLFxuICAgICAgICBhbmltYXRlKCcxNTBtcyBsaW5lYXInKVxuICAgICAgXSksXG4gICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMCknIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAxLCB0cmFuc2Zvcm06ICdzY2FsZSgxKScgfSksXG4gICAgICAgIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpXG4gICAgICBdKVxuICAgIF0pXG4gIF0sXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXNlbGVjdC10b3AtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3QgICAgICAgICAgICAgICA6IHtcbiAgICAnW2NsYXNzLmFudC1zZWxlY3Qtc2VsZWN0aW9uX19yZW5kZXJlZF0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNlbGVjdFRvcENvbnRyb2xDb21wb25lbnQge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByaXZhdGUgX2xpc3RPZlNlbGVjdGVkVmFsdWU6IGFueVtdO1xuICBwcml2YXRlIF9saXN0VGVtcGxhdGVPZk9wdGlvbjogTnpPcHRpb25Db21wb25lbnRbXSA9IFtdO1xuICBsaXN0T2ZDYWNoZWRTZWxlY3RlZE9wdGlvbjogTnpPcHRpb25Db21wb25lbnRbXSA9IFtdO1xuICBpbnB1dFZhbHVlOiBzdHJpbmc7XG4gIGlzQ29tcG9zaW5nID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2lucHV0RWxlbWVudCcpIGlucHV0RWxlbWVudDogRWxlbWVudFJlZjtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBAT3V0cHV0KCkgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcbiAgQE91dHB1dCgpIG56T25TZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyPHsgdmFsdWU6IHN0cmluZywgZW1pdDogYm9vbGVhbiB9PigpO1xuICBASW5wdXQoKSBuek1vZGUgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIG56U2hvd1NlYXJjaCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgbnpQbGFjZUhvbGRlcjogc3RyaW5nO1xuICBASW5wdXQoKSBuek9wZW4gPSBmYWxzZTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBASW5wdXQoKSBjb21wYXJlV2l0aDogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBzZXQgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlKHZhbHVlOiBhbnlbXSkge1xuICAgIHRoaXMuX2xpc3RPZlNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RPZkNhY2hlZE9wdGlvbigpO1xuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBnZXQgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdE9mU2VsZWN0ZWRWYWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekxpc3RUZW1wbGF0ZU9mT3B0aW9uKHZhbHVlOiBOek9wdGlvbkNvbXBvbmVudFtdKSB7XG4gICAgdGhpcy5fbGlzdFRlbXBsYXRlT2ZPcHRpb24gPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RPZkNhY2hlZE9wdGlvbigpO1xuICB9XG5cbiAgZ2V0IG56TGlzdFRlbXBsYXRlT2ZPcHRpb24oKTogTnpPcHRpb25Db21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RUZW1wbGF0ZU9mT3B0aW9uO1xuICB9XG5cbiAgLyoqIGNhY2hlZCBzZWxlY3RlZCBvcHRpb24gbGlzdCAqKi9cbiAgdXBkYXRlTGlzdE9mQ2FjaGVkT3B0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU2luZ2xlTW9kZSkge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSB0aGlzLm56TGlzdFRlbXBsYXRlT2ZPcHRpb24uZmluZChvID0+IHRoaXMuY29tcGFyZVdpdGgoby5uelZhbHVlLCB0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZVsgMCBdKSk7XG4gICAgICBpZiAoaXNOb3ROaWwoc2VsZWN0ZWRPcHRpb24pKSB7XG4gICAgICAgIHRoaXMubGlzdE9mQ2FjaGVkU2VsZWN0ZWRPcHRpb24gPSBbIHNlbGVjdGVkT3B0aW9uIF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxpc3RPZkNhY2hlZE9wdGlvbkZyb21MYXRlc3RUZW1wbGF0ZSA9IHRoaXMubnpMaXN0VGVtcGxhdGVPZk9wdGlvbi5maWx0ZXIobyA9PiBpc05vdE5pbCh0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZS5maW5kKHYgPT4gdGhpcy5jb21wYXJlV2l0aCh2LCBvLm56VmFsdWUpKSkpO1xuICAgICAgY29uc3QgcmVzdFNlbGVjdGVkVmFsdWUgPSB0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZS5maWx0ZXIodiA9PiAhaXNOb3ROaWwobGlzdE9mQ2FjaGVkT3B0aW9uRnJvbUxhdGVzdFRlbXBsYXRlLmZpbmQobyA9PiB0aGlzLmNvbXBhcmVXaXRoKG8ubnpWYWx1ZSwgdikpKSk7XG4gICAgICBjb25zdCBsaXN0T2ZDYWNoZWRPcHRpb25Gcm9tT2xkID0gdGhpcy5saXN0T2ZDYWNoZWRTZWxlY3RlZE9wdGlvbi5maWx0ZXIobyA9PiBpc05vdE5pbChyZXN0U2VsZWN0ZWRWYWx1ZS5maW5kKHYgPT4gdGhpcy5jb21wYXJlV2l0aChvLm56VmFsdWUsIHYpKSkpO1xuICAgICAgdGhpcy5saXN0T2ZDYWNoZWRTZWxlY3RlZE9wdGlvbiA9IGxpc3RPZkNhY2hlZE9wdGlvbkZyb21MYXRlc3RUZW1wbGF0ZS5jb25jYXQobGlzdE9mQ2FjaGVkT3B0aW9uRnJvbU9sZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dFZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy51cGRhdGVXaWR0aCgpO1xuICAgIHRoaXMubnpPblNlYXJjaC5lbWl0KHsgdmFsdWUsIGVtaXQgfSk7XG4gIH1cblxuICBnZXQgaXNTaW5nbGVNb2RlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56TW9kZSA9PT0gJ2RlZmF1bHQnO1xuICB9XG5cbiAgZ2V0IGlzTXVsdGlwbGVPclRhZ3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpNb2RlID09PSAndGFncycgfHwgdGhpcy5uek1vZGUgPT09ICdtdWx0aXBsZSc7XG4gIH1cblxuICBnZXQgcGxhY2VIb2xkZXJEaXNwbGF5KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRWYWx1ZSB8fCB0aGlzLmlzQ29tcG9zaW5nIHx8IHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlLmxlbmd0aCA/ICdub25lJyA6ICdibG9jayc7XG4gIH1cblxuICBnZXQgc2VsZWN0ZWRWYWx1ZURpc3BsYXkoKTogeyBbIGtleTogc3RyaW5nIF06IHN0cmluZyB9IHtcbiAgICBsZXQgc2hvd1NlbGVjdGVkVmFsdWUgPSBmYWxzZTtcbiAgICBsZXQgb3BhY2l0eSA9IDE7XG4gICAgaWYgKCF0aGlzLm56U2hvd1NlYXJjaCkge1xuICAgICAgc2hvd1NlbGVjdGVkVmFsdWUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5uek9wZW4pIHtcbiAgICAgICAgc2hvd1NlbGVjdGVkVmFsdWUgPSAhKHRoaXMuaW5wdXRWYWx1ZSB8fCB0aGlzLmlzQ29tcG9zaW5nKTtcbiAgICAgICAgaWYgKHNob3dTZWxlY3RlZFZhbHVlKSB7XG4gICAgICAgICAgb3BhY2l0eSA9IDAuNDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hvd1NlbGVjdGVkVmFsdWUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogc2hvd1NlbGVjdGVkVmFsdWUgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgb3BhY2l0eTogYCR7b3BhY2l0eX1gXG4gICAgfTtcbiAgfVxuXG4gIGdldCBzaW5nbGVWYWx1ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlGcm9tVmFsdWUodGhpcy5uekxpc3RPZlNlbGVjdGVkVmFsdWVbIDAgXSwgJ256TGFiZWwnKTtcbiAgfVxuXG4gIGZvY3VzT25JbnB1dCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmlucHV0RWxlbWVudCkge1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGdldFByb3BlcnR5RnJvbVZhbHVlKHZhbHVlOiBhbnksIHByb3A6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgdGFyZ2V0T3B0aW9uID0gdGhpcy5saXN0T2ZDYWNoZWRTZWxlY3RlZE9wdGlvbi5maW5kKGl0ZW0gPT4gdGhpcy5jb21wYXJlV2l0aChpdGVtLm56VmFsdWUsIHZhbHVlKSk7XG4gICAgcmV0dXJuIHRhcmdldE9wdGlvbiA/IHRhcmdldE9wdGlvblsgcHJvcCBdIDogJyc7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIGlzT3B0aW9uRGlzcGxheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLm56TW9kZSA9PT0gJ3RhZ3MnKSB8fCAhIXRoaXMuZ2V0UHJvcGVydHlGcm9tVmFsdWUodmFsdWUsICduekxhYmVsJyk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHJlbW92ZVZhbHVlRm9ybVNlbGVjdGVkKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkIHx8IHRoaXMuZ2V0UHJvcGVydHlGcm9tVmFsdWUodmFsdWUsICduekRpc2FibGVkJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbGlzdE9mU2VsZWN0ZWRWYWx1ZSA9IHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHZhbHVlKTtcbiAgICB0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlKTtcbiAgfVxuXG4gIHVwZGF0ZVdpZHRoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTXVsdGlwbGVPclRhZ3MgJiYgdGhpcy5pbnB1dEVsZW1lbnQpIHtcbiAgICAgIGlmICh0aGlzLmlucHV0VmFsdWUgfHwgdGhpcy5pc0NvbXBvc2luZykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3RoaXMuaW5wdXRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGh9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3dpZHRoJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25LZXlEb3duSW5wdXQoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGtleUNvZGUgPSBlLmtleUNvZGU7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGlmIChcbiAgICAgIHRoaXMuaXNNdWx0aXBsZU9yVGFncyAmJlxuICAgICAgIWV2ZW50VGFyZ2V0LnZhbHVlICYmXG4gICAgICAvLyBCYWNrU3BhY2VcbiAgICAgIGtleUNvZGUgPT09IDhcbiAgICApIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICh0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZUZvcm1TZWxlY3RlZCh0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZVsgdGhpcy5uekxpc3RPZlNlbGVjdGVkVmFsdWUubGVuZ3RoIC0gMSBdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcblxuICB9XG59XG4iXX0=