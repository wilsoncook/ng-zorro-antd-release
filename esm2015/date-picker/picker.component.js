/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DateHelperService } from '../i18n/date-helper.service';
export class NzPickerComponent {
    /**
     * @param {?} dateHelper
     * @param {?} changeDetector
     */
    constructor(dateHelper, changeDetector) {
        this.dateHelper = dateHelper;
        this.changeDetector = changeDetector;
        this.isRange = false;
        this.open = undefined;
        this.valueChange = new EventEmitter();
        this.openChange = new EventEmitter();
        this.prefixCls = 'ant-calendar';
        this.animationOpenState = false;
        this.overlayOpen = false;
        this.overlayOffsetY = 0;
        this.overlayOffsetX = -2;
        this.overlayPositions = /** @type {?} */ ([
            {
                // offsetX: -10, // TODO: What a pity, cdk/overlay current not support offset configs even though it already provide these properties
                // offsetY: -10,
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top'
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom'
            },
            {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'top'
            },
            {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'bottom'
            }
        ]);
        this.dropdownAnimation = 'bottom';
        this.currentPositionX = 'start';
        this.currentPositionY = 'top';
    }
    /**
     * @return {?}
     */
    get realOpenState() {
        // The value that really decide the open state of overlay
        return this.isOpenHandledByUser() ? this.open : this.overlayOpen;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.autoFocus) {
            if (this.isRange) {
                /** @type {?} */
                const firstInput = /** @type {?} */ ((/** @type {?} */ (this.pickerInput.nativeElement)).querySelector('input:first-child'));
                firstInput.focus(); // Focus on the first input
            }
            else {
                this.pickerInput.nativeElement.focus();
            }
        }
    }
    /**
     * @return {?}
     */
    showOverlay() {
        if (!this.realOpenState) {
            this.overlayOpen = true;
            this.openChange.emit(this.overlayOpen);
            setTimeout(() => {
                if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
                    this.cdkConnectedOverlay.overlayRef.updatePosition();
                }
            });
        }
    }
    /**
     * @return {?}
     */
    hideOverlay() {
        if (this.realOpenState) {
            this.overlayOpen = false;
            this.openChange.emit(this.overlayOpen);
        }
    }
    /**
     * @return {?}
     */
    onClickInputBox() {
        if (!this.disabled && !this.isOpenHandledByUser()) {
            this.showOverlay();
        }
    }
    /**
     * @return {?}
     */
    onClickBackdrop() {
        this.hideOverlay();
    }
    /**
     * @return {?}
     */
    onOverlayDetach() {
        this.hideOverlay();
    }
    /**
     * @param {?} position
     * @return {?}
     */
    onPositionChange(position) {
        this.dropdownAnimation = position.connectionPair.originY === 'top' ? 'bottom' : 'top';
        this.currentPositionX = /** @type {?} */ (position.connectionPair.originX);
        this.currentPositionY = /** @type {?} */ (position.connectionPair.originY);
        this.changeDetector.detectChanges(); // Take side-effects to position styles
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClickClear(event) {
        event.preventDefault();
        event.stopPropagation();
        this.value = this.isRange ? [] : null;
        this.valueChange.emit(this.value);
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getReadableValue(partType) {
        /** @type {?} */
        let value;
        if (this.isRange) {
            value = this.value[this.getPartTypeIndex(partType)];
        }
        else {
            value = /** @type {?} */ (this.value);
        }
        return value ? this.dateHelper.format(value.nativeDate, this.format) : null;
    }
    /**
     * @param {?} partType
     * @return {?}
     */
    getPartTypeIndex(partType) {
        return { 'left': 0, 'right': 1 }[partType];
    }
    /**
     * @param {?=} partType
     * @return {?}
     */
    getPlaceholder(partType) {
        return this.isRange ? this.placeholder[this.getPartTypeIndex(partType)] : /** @type {?} */ (this.placeholder);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isEmptyValue(value) {
        if (this.isRange) {
            return !value || !Array.isArray(value) || value.every((val) => !val);
        }
        else {
            return !value;
        }
    }
    /**
     * @return {?}
     */
    isOpenHandledByUser() {
        return this.open !== undefined;
    }
    /**
     * @return {?}
     */
    animationStart() {
        if (this.realOpenState) {
            this.animationOpenState = true;
        }
    }
    /**
     * @return {?}
     */
    animationDone() {
        this.animationOpenState = this.realOpenState;
    }
}
NzPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-picker',
                template: "<span cdkOverlayOrigin #origin=\"cdkOverlayOrigin\" class=\"{{ prefixCls }}-picker {{ size ? prefixCls + '-picker-' + size : '' }} {{ className }}\" [ngStyle]=\"style\" tabindex=\"0\">\n  <!-- Content of single picker -->\n  <ng-container *ngIf=\"!isRange\">\n    <input\n      #pickerInput\n      class=\"{{ prefixCls }}-picker-input ant-input\"\n      [class.ant-input-lg]=\"size === 'large'\"\n      [class.ant-input-sm]=\"size === 'small'\"\n      [class.ant-input-disabled]=\"disabled\"\n      (click)=\"onClickInputBox()\"\n\n      [disabled]=\"disabled\"\n      readonly\n      value=\"{{ getReadableValue() }}\"\n      placeholder=\"{{ getPlaceholder() }}\"\n    />\n    <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n  </ng-container>\n\n  <!-- Content of range picker -->\n  <ng-container *ngIf=\"isRange\">\n    <span\n      #pickerInput\n      class=\"{{ prefixCls }}-picker-input ant-input\"\n      [class.ant-input-lg]=\"size === 'large'\"\n      [class.ant-input-sm]=\"size === 'small'\"\n      [class.ant-input-disabled]=\"disabled\"\n      (click)=\"onClickInputBox()\"\n    >\n      <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'left' }\"></ng-container>\n      <span class=\"{{ prefixCls }}-range-picker-separator\"> ~ </span>\n      <ng-container *ngTemplateOutlet=\"tplRangeInput; context: { partType: 'right' }\"></ng-container>\n      <ng-container *ngTemplateOutlet=\"tplRightRest\"></ng-container>\n    </span>\n  </ng-container>\n</span>\n\n<!-- Input for Range ONLY -->\n<ng-template #tplRangeInput let-partType=\"partType\">\n  <input\n    class=\"{{ prefixCls }}-range-picker-input\"\n    [disabled]=\"disabled\"\n    readonly\n    value=\"{{ getReadableValue(partType) }}\"\n    placeholder=\"{{ getPlaceholder(partType) }}\"\n  />\n</ng-template>\n\n<!-- Right operator icons -->\n<ng-template #tplRightRest>\n  <i\n    *ngIf=\"!disabled && !isEmptyValue(value) && allowClear\"\n    class=\"anticon anticon-cross-circle {{ prefixCls }}-picker-clear\"\n    (click)=\"onClickClear($event)\"\n  ></i>\n  <span class=\"{{ prefixCls }}-picker-icon\"></span>\n</ng-template>\n\n<!-- Overlay -->\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayOpen]=\"realOpenState\"\n  [cdkConnectedOverlayHasBackdrop]=\"!isOpenHandledByUser()\"\n  [cdkConnectedOverlayPositions]=\"overlayPositions\"\n  (positionChange)=\"onPositionChange($event)\"\n  (backdropClick)=\"onClickBackdrop()\"\n  (detach)=\"onOverlayDetach()\"\n>\n  <div\n    [@dropDownAnimation]=\"dropdownAnimation\"\n    (@dropDownAnimation.start)=\"animationStart()\"\n    (@dropDownAnimation.done)=\"animationDone()\"\n    style=\"position: relative;\"\n    [style.left]=\"currentPositionX === 'start' ? '-2px' : '2px'\"\n    [style.top]=\"currentPositionY === 'top' ? '-2px' : '2px'\"\n  > <!-- Compatible for overlay that not support offset dynamically and immediately -->\n    <ng-content></ng-content>\n  </div>\n</ng-template>",
                animations: [
                    dropDownAnimation
                ],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
NzPickerComponent.ctorParameters = () => [
    { type: DateHelperService },
    { type: ChangeDetectorRef }
];
NzPickerComponent.propDecorators = {
    isRange: [{ type: Input }],
    open: [{ type: Input }],
    disabled: [{ type: Input }],
    placeholder: [{ type: Input }],
    allowClear: [{ type: Input }],
    autoFocus: [{ type: Input }],
    className: [{ type: Input }],
    format: [{ type: Input }],
    size: [{ type: Input }],
    style: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    openChange: [{ type: Output }],
    origin: [{ type: ViewChild, args: ['origin',] }],
    cdkConnectedOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay,] }],
    pickerInput: [{ type: ViewChild, args: ['pickerInput',] }]
};
function NzPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzPickerComponent.prototype.isRange;
    /** @type {?} */
    NzPickerComponent.prototype.open;
    /** @type {?} */
    NzPickerComponent.prototype.disabled;
    /** @type {?} */
    NzPickerComponent.prototype.placeholder;
    /** @type {?} */
    NzPickerComponent.prototype.allowClear;
    /** @type {?} */
    NzPickerComponent.prototype.autoFocus;
    /** @type {?} */
    NzPickerComponent.prototype.className;
    /** @type {?} */
    NzPickerComponent.prototype.format;
    /** @type {?} */
    NzPickerComponent.prototype.size;
    /** @type {?} */
    NzPickerComponent.prototype.style;
    /** @type {?} */
    NzPickerComponent.prototype.value;
    /** @type {?} */
    NzPickerComponent.prototype.valueChange;
    /** @type {?} */
    NzPickerComponent.prototype.openChange;
    /** @type {?} */
    NzPickerComponent.prototype.origin;
    /** @type {?} */
    NzPickerComponent.prototype.cdkConnectedOverlay;
    /** @type {?} */
    NzPickerComponent.prototype.pickerInput;
    /** @type {?} */
    NzPickerComponent.prototype.prefixCls;
    /** @type {?} */
    NzPickerComponent.prototype.animationOpenState;
    /** @type {?} */
    NzPickerComponent.prototype.overlayOpen;
    /** @type {?} */
    NzPickerComponent.prototype.overlayOffsetY;
    /** @type {?} */
    NzPickerComponent.prototype.overlayOffsetX;
    /** @type {?} */
    NzPickerComponent.prototype.overlayPositions;
    /** @type {?} */
    NzPickerComponent.prototype.dropdownAnimation;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionX;
    /** @type {?} */
    NzPickerComponent.prototype.currentPositionY;
    /** @type {?} */
    NzPickerComponent.prototype.dateHelper;
    /** @type {?} */
    NzPickerComponent.prototype.changeDetector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci9waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUdqQixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBWWhFLE1BQU07Ozs7O0lBNkRKLFlBQW9CLFVBQTZCLEVBQVUsY0FBaUM7UUFBeEUsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7dUJBNURoRSxLQUFLO29CQUNSLFNBQVM7MkJBV1YsSUFBSSxZQUFZLEVBQTJCOzBCQUU1QyxJQUFJLFlBQVksRUFBVzt5QkFNdEMsY0FBYztrQ0FDTCxLQUFLOzJCQUNILEtBQUs7OEJBQ0gsQ0FBQzs4QkFDRCxDQUFDLENBQUM7a0RBQ2tCO1lBQzNDOzs7Z0JBR0UsT0FBTyxFQUFHLE9BQU87Z0JBQ2pCLE9BQU8sRUFBRyxLQUFLO2dCQUNmLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNoQjtZQUNEO2dCQUNFLE9BQU8sRUFBRyxPQUFPO2dCQUNqQixPQUFPLEVBQUcsUUFBUTtnQkFDbEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxRQUFRO2FBQ25CO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFHLEtBQUs7Z0JBQ2YsT0FBTyxFQUFHLEtBQUs7Z0JBQ2Ys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Q2Y7S0FDRjs7OztJQUdELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO0tBQ2hDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7S0FDOUM7OztZQW5MRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFTLFdBQVc7Z0JBQzVCLDQ4RkFBMEM7Z0JBQzFDLFVBQVUsRUFBTztvQkFDZixpQkFBaUI7aUJBQ2xCO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBVlEsaUJBQWlCO1lBWHhCLGlCQUFpQjs7O3NCQXdCaEIsS0FBSzttQkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFFTCxLQUFLOzBCQUNMLE1BQU07eUJBRU4sTUFBTTtxQkFFTixTQUFTLFNBQUMsUUFBUTtrQ0FDbEIsU0FBUyxTQUFDLG1CQUFtQjswQkFDN0IsU0FBUyxTQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDZGtDb25uZWN0ZWRPdmVybGF5LFxuICBDZGtPdmVybGF5T3JpZ2luLFxuICBDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25DaGFuZ2UsXG4gIENvbm5lY3Rpb25Qb3NpdGlvblBhaXJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGRyb3BEb3duQW5pbWF0aW9uIH0gZnJvbSAnLi4vY29yZS9hbmltYXRpb24vZHJvcGRvd24tYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2kxOG4vZGF0ZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDYW5keURhdGUgfSBmcm9tICcuL2xpYi9jYW5keS1kYXRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgIDogJ256LXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsICAgIDogJy4vcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgYW5pbWF0aW9ucyAgICAgOiBbXG4gICAgZHJvcERvd25BbmltYXRpb25cbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBOelBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIGlzUmFuZ2U6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb3BlbjogYm9vbGVhbiA9IHVuZGVmaW5lZDsgLy8gXCJ1bmRlZmluZWRcIiA9IHRoaXMgdmFsdWUgd2lsbCBiZSBub3QgdXNlZFxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHN0cmluZ1tdO1xuICBASW5wdXQoKSBhbGxvd0NsZWFyOiBib29sZWFuO1xuICBASW5wdXQoKSBhdXRvRm9jdXM6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGNsYXNzTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBmb3JtYXQ6IHN0cmluZztcbiAgQElucHV0KCkgc2l6ZTogJ2xhcmdlJyB8ICdzbWFsbCc7XG4gIEBJbnB1dCgpIHN0eWxlOiBvYmplY3Q7XG5cbiAgQElucHV0KCkgdmFsdWU6IENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdO1xuICBAT3V0cHV0KCkgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdPigpO1xuXG4gIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpOyAvLyBFbWl0dGVkIHdoZW4gb3ZlcmxheSdzIG9wZW4gc3RhdGUgY2hhbmdlXG5cbiAgQFZpZXdDaGlsZCgnb3JpZ2luJykgb3JpZ2luOiBDZGtPdmVybGF5T3JpZ2luO1xuICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXkpIGNka0Nvbm5lY3RlZE92ZXJsYXk6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG4gIEBWaWV3Q2hpbGQoJ3BpY2tlcklucHV0JykgcGlja2VySW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJlZml4Q2xzID0gJ2FudC1jYWxlbmRhcic7XG4gIGFuaW1hdGlvbk9wZW5TdGF0ZSA9IGZhbHNlO1xuICBvdmVybGF5T3BlbjogYm9vbGVhbiA9IGZhbHNlOyAvLyBBdmFpbGFibGUgd2hlbiBcIm9wZW5cIj11bmRlZmluZWRcbiAgb3ZlcmxheU9mZnNldFk6IG51bWJlciA9IDA7XG4gIG92ZXJsYXlPZmZzZXRYOiBudW1iZXIgPSAtMjtcbiAgb3ZlcmxheVBvc2l0aW9uczogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdID0gW1xuICAgIHtcbiAgICAgIC8vIG9mZnNldFg6IC0xMCwgLy8gVE9ETzogV2hhdCBhIHBpdHksIGNkay9vdmVybGF5IGN1cnJlbnQgbm90IHN1cHBvcnQgb2Zmc2V0IGNvbmZpZ3MgZXZlbiB0aG91Z2ggaXQgYWxyZWFkeSBwcm92aWRlIHRoZXNlIHByb3BlcnRpZXNcbiAgICAgIC8vIG9mZnNldFk6IC0xMCxcbiAgICAgIG9yaWdpblggOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWSA6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG9yaWdpblggOiAnc3RhcnQnLFxuICAgICAgb3JpZ2luWSA6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG9yaWdpblggOiAnZW5kJyxcbiAgICAgIG9yaWdpblkgOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgIH0sXG4gICAge1xuICAgICAgb3JpZ2luWCA6ICdlbmQnLFxuICAgICAgb3JpZ2luWSA6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgfVxuICBdIGFzIENvbm5lY3Rpb25Qb3NpdGlvblBhaXJbXTtcbiAgZHJvcGRvd25BbmltYXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSAnYm90dG9tJztcbiAgY3VycmVudFBvc2l0aW9uWDogJ3N0YXJ0JyB8ICdlbmQnID0gJ3N0YXJ0JztcbiAgY3VycmVudFBvc2l0aW9uWTogJ3RvcCcgfCAnYm90dG9tJyA9ICd0b3AnO1xuICBnZXQgcmVhbE9wZW5TdGF0ZSgpOiBib29sZWFuIHsgLy8gVGhlIHZhbHVlIHRoYXQgcmVhbGx5IGRlY2lkZSB0aGUgb3BlbiBzdGF0ZSBvZiBvdmVybGF5XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuSGFuZGxlZEJ5VXNlcigpID8gdGhpcy5vcGVuIDogdGhpcy5vdmVybGF5T3BlbjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGF0ZUhlbHBlcjogRGF0ZUhlbHBlclNlcnZpY2UsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hdXRvRm9jdXMpIHtcbiAgICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgICAgY29uc3QgZmlyc3RJbnB1dCA9ICh0aGlzLnBpY2tlcklucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0OmZpcnN0LWNoaWxkJykgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgZmlyc3RJbnB1dC5mb2N1cygpOyAvLyBGb2N1cyBvbiB0aGUgZmlyc3QgaW5wdXRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGlja2VySW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFNob3cgb3ZlcmxheSBjb250ZW50XG4gIHNob3dPdmVybGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFsT3BlblN0YXRlKSB7XG4gICAgICB0aGlzLm92ZXJsYXlPcGVuID0gdHJ1ZTtcbiAgICAgIHRoaXMub3BlbkNoYW5nZS5lbWl0KHRoaXMub3ZlcmxheU9wZW4pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNka0Nvbm5lY3RlZE92ZXJsYXkgJiYgdGhpcy5jZGtDb25uZWN0ZWRPdmVybGF5Lm92ZXJsYXlSZWYpIHtcbiAgICAgICAgICB0aGlzLmNka0Nvbm5lY3RlZE92ZXJsYXkub3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoaWRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZWFsT3BlblN0YXRlKSB7XG4gICAgICB0aGlzLm92ZXJsYXlPcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh0aGlzLm92ZXJsYXlPcGVuKTtcbiAgICB9XG4gIH1cblxuICBvbkNsaWNrSW5wdXRCb3goKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLmlzT3BlbkhhbmRsZWRCeVVzZXIoKSkge1xuICAgICAgdGhpcy5zaG93T3ZlcmxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2xpY2tCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVPdmVybGF5KCk7XG4gIH1cblxuICBvbk92ZXJsYXlEZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlT3ZlcmxheSgpO1xuICB9XG5cbiAgLy8gTk9URTogQSBpc3N1ZSBoZXJlLCB0aGUgZmlyc3QgdGltZSBwb3NpdGlvbiBjaGFuZ2UsIHRoZSBhbmltYXRpb24gd2lsbCBub3QgYmUgdHJpZ2dlcmVkLlxuICAvLyBCZWNhdXNlIHRoZSBvdmVybGF5J3MgXCJwb3NpdGlvbkNoYW5nZVwiIGV2ZW50IGlzIGVtaXR0ZWQgYWZ0ZXIgdGhlIGNvbnRlbnQncyBmdWxsIHNob3duIHVwLlxuICAvLyBBbGwgb3RoZXIgY29tcG9uZW50cyBsaWtlIFwibnotZHJvcGRvd25cIiB3aGljaCBkZXBlbmRzIG9uIG92ZXJsYXkgYWxzbyBoYXMgdGhlIHNhbWUgaXNzdWUuXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvaXNzdWVzLzE0MjlcbiAgb25Qb3NpdGlvbkNoYW5nZShwb3NpdGlvbjogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5kcm9wZG93bkFuaW1hdGlvbiA9IHBvc2l0aW9uLmNvbm5lY3Rpb25QYWlyLm9yaWdpblkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICB0aGlzLmN1cnJlbnRQb3NpdGlvblggPSBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5YIGFzICdzdGFydCcgfCAnZW5kJztcbiAgICB0aGlzLmN1cnJlbnRQb3NpdGlvblkgPSBwb3NpdGlvbi5jb25uZWN0aW9uUGFpci5vcmlnaW5ZIGFzICd0b3AnIHwgJ2JvdHRvbSc7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7IC8vIFRha2Ugc2lkZS1lZmZlY3RzIHRvIHBvc2l0aW9uIHN0eWxlc1xuICB9XG5cbiAgb25DbGlja0NsZWFyKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmlzUmFuZ2UgPyBbXSA6IG51bGw7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICB9XG5cbiAgZ2V0UmVhZGFibGVWYWx1ZShwYXJ0VHlwZT86IFJhbmdlUGFydFR5cGUpOiBzdHJpbmcge1xuICAgIGxldCB2YWx1ZTogQ2FuZHlEYXRlO1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIHZhbHVlID0gdGhpcy52YWx1ZVsgdGhpcy5nZXRQYXJ0VHlwZUluZGV4KHBhcnRUeXBlKSBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMudmFsdWUgYXMgQ2FuZHlEYXRlO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPyB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KHZhbHVlLm5hdGl2ZURhdGUsIHRoaXMuZm9ybWF0KSA6IG51bGw7XG4gIH1cblxuICBnZXRQYXJ0VHlwZUluZGV4KHBhcnRUeXBlOiBSYW5nZVBhcnRUeXBlKTogbnVtYmVyIHtcbiAgICByZXR1cm4geyAnbGVmdCc6IDAsICdyaWdodCc6IDEgfVsgcGFydFR5cGUgXTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyKHBhcnRUeXBlPzogUmFuZ2VQYXJ0VHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYW5nZSA/IHRoaXMucGxhY2Vob2xkZXJbIHRoaXMuZ2V0UGFydFR5cGVJbmRleChwYXJ0VHlwZSkgXSA6IHRoaXMucGxhY2Vob2xkZXIgYXMgc3RyaW5nO1xuICB9XG5cbiAgaXNFbXB0eVZhbHVlKHZhbHVlOiBDYW5keURhdGVbXSB8IENhbmR5RGF0ZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmlzUmFuZ2UpIHtcbiAgICAgIHJldHVybiAhdmFsdWUgfHwgIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlLmV2ZXJ5KCh2YWwpID0+ICF2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIXZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdoZXRoZXIgb3BlbiBzdGF0ZSBpcyBwZXJtYW5lbnRseSBjb250cm9sbGVkIGJ5IHVzZXIgaGltc2VsZlxuICBpc09wZW5IYW5kbGVkQnlVc2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm9wZW4gIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFuaW1hdGlvblN0YXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnJlYWxPcGVuU3RhdGUpIHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uT3BlblN0YXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBhbmltYXRpb25Eb25lKCk6IHZvaWQge1xuICAgIHRoaXMuYW5pbWF0aW9uT3BlblN0YXRlID0gdGhpcy5yZWFsT3BlblN0YXRlO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJhbmdlUGFydFR5cGUgPSAnbGVmdCcgfCAncmlnaHQnO1xuIl19