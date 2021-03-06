/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
export class NzStepComponent {
    /**
     * @param {?} elementRef
     * @param {?} nzUpdateHostClassService
     */
    constructor(elementRef, nzUpdateHostClassService) {
        this.elementRef = elementRef;
        this.nzUpdateHostClassService = nzUpdateHostClassService;
        this._status = 'wait';
        this._currentIndex = 0;
        this.isCustomStatus = false;
        this.isDescriptionString = true;
        this.isTitleString = true;
        this.isIconString = true;
        this.last = false;
        this.showProcessDot = false;
        this.direction = 'horizontal';
        this.outStatus = 'process';
        this.index = 0;
        this.el = elementRef.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzTitle(value) {
        this.isTitleString = !(value instanceof TemplateRef);
        this._title = value;
    }
    /**
     * @return {?}
     */
    get nzTitle() {
        return this._title;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzIcon(value) {
        this.isIconString = !(value instanceof TemplateRef);
        this._icon = value;
    }
    /**
     * @return {?}
     */
    get nzIcon() {
        return this._icon;
    }
    /**
     * @param {?} status
     * @return {?}
     */
    set nzStatus(status) {
        this._status = status;
        this.isCustomStatus = true;
        this.updateClassMap();
    }
    /**
     * @return {?}
     */
    get nzStatus() {
        return this._status;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDescription(value) {
        this.isDescriptionString = !(value instanceof TemplateRef);
        this._description = value;
    }
    /**
     * @return {?}
     */
    get nzDescription() {
        return this._description;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        return this._currentIndex;
    }
    /**
     * @param {?} current
     * @return {?}
     */
    set currentIndex(current) {
        this._currentIndex = current;
        if (!this.isCustomStatus) {
            if (current > this.index) {
                this._status = 'finish';
            }
            else if (current === this.index) {
                if (this.outStatus) {
                    this._status = this.outStatus;
                }
            }
            else {
                this._status = 'wait';
            }
        }
        this.updateClassMap();
    }
    /**
     * @return {?}
     */
    updateClassMap() {
        /** @type {?} */
        const classMap = {
            ['ant-steps-item']: true,
            [`ant-steps-item-wait`]: this.nzStatus === 'wait',
            [`ant-steps-item-process`]: this.nzStatus === 'process',
            [`ant-steps-item-finish`]: this.nzStatus === 'finish',
            [`ant-steps-item-error`]: this.nzStatus === 'error',
            ['ant-steps-custom']: !!this.nzIcon,
            ['ant-steps-next-error']: (this.outStatus === 'error') && (this.currentIndex === this.index + 1)
        };
        this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
    }
}
NzStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-step',
                providers: [NzUpdateHostClassService],
                preserveWhitespaces: false,
                template: "<ng-template #titleTemplate>\n  <ng-template [ngTemplateOutlet]=\"nzTitle\"></ng-template>\n</ng-template>\n<ng-template #descriptionTemplate>\n  <ng-template [ngTemplateOutlet]=\"nzDescription\"></ng-template>\n</ng-template>\n<div class=\"ant-steps-item-tail\" *ngIf=\"last !== true\"></div>\n<div class=\"ant-steps-item-icon\">\n  <ng-template [ngIf]=\"!showProcessDot\">\n    <span class=\"ant-steps-icon anticon anticon-check\" *ngIf=\"nzStatus === 'finish' && !nzIcon\"></span>\n    <span class=\"ant-steps-icon anticon anticon-cross\" *ngIf=\"nzStatus === 'error'\"></span>\n    <span class=\"ant-steps-icon\" *ngIf=\"(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon\">{{ index + 1 }}</span>\n    <span class=\"ant-steps-icon\" *ngIf=\"nzIcon\">\n      <ng-container *ngIf=\"isIconString; else iconTemplate\">\n        <i [ngClass]=\"nzIcon\"></i>\n      </ng-container>\n      <ng-template #iconTemplate>\n      <ng-template [ngTemplateOutlet]=\"nzIcon\"></ng-template>\n    </ng-template>\n    </span>\n  </ng-template>\n  <ng-template [ngIf]=\"showProcessDot\">\n    <span class=\"ant-steps-icon\">\n      <ng-template #processDotTemplate>\n        <span class=\"ant-steps-icon-dot\"></span>\n      </ng-template>\n      <ng-template [ngTemplateOutlet]=\"customProcessTemplate||processDotTemplate\" [ngTemplateOutletContext]=\"{ $implicit: processDotTemplate, status:nzStatus, index:index }\"></ng-template>\n    </span>\n  </ng-template>\n</div>\n<div class=\"ant-steps-item-content\">\n  <div class=\"ant-steps-item-title\">\n    <ng-container *ngIf=\"isTitleString; else titleTemplate\">{{ nzTitle }}</ng-container>\n  </div>\n  <div class=\"ant-steps-item-description\">\n    <ng-container *ngIf=\"isDescriptionString; else descriptionTemplate\">{{ nzDescription }}</ng-container>\n  </div>\n</div>"
            }] }
];
/** @nocollapse */
NzStepComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NzUpdateHostClassService }
];
NzStepComponent.propDecorators = {
    processDotTemplate: [{ type: ViewChild, args: ['processDotTemplate',] }],
    nzTitle: [{ type: Input }],
    nzIcon: [{ type: Input }],
    nzStatus: [{ type: Input }],
    nzDescription: [{ type: Input }]
};
function NzStepComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzStepComponent.prototype._status;
    /** @type {?} */
    NzStepComponent.prototype._currentIndex;
    /** @type {?} */
    NzStepComponent.prototype._description;
    /** @type {?} */
    NzStepComponent.prototype._icon;
    /** @type {?} */
    NzStepComponent.prototype._title;
    /** @type {?} */
    NzStepComponent.prototype.el;
    /** @type {?} */
    NzStepComponent.prototype.isCustomStatus;
    /** @type {?} */
    NzStepComponent.prototype.isDescriptionString;
    /** @type {?} */
    NzStepComponent.prototype.isTitleString;
    /** @type {?} */
    NzStepComponent.prototype.isIconString;
    /** @type {?} */
    NzStepComponent.prototype.last;
    /** @type {?} */
    NzStepComponent.prototype.showProcessDot;
    /** @type {?} */
    NzStepComponent.prototype.direction;
    /** @type {?} */
    NzStepComponent.prototype.outStatus;
    /** @type {?} */
    NzStepComponent.prototype.index;
    /** @type {?} */
    NzStepComponent.prototype.processDotTemplate;
    /** @type {?} */
    NzStepComponent.prototype.customProcessTemplate;
    /** @type {?} */
    NzStepComponent.prototype.elementRef;
    /** @type {?} */
    NzStepComponent.prototype.nzUpdateHostClassService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsic3RlcHMvbnotc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBV3RGLE1BQU07Ozs7O0lBNkZKLFlBQW9CLFVBQXNCLEVBQVUsd0JBQWtEO1FBQWxGLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO3VCQTVGcEYsTUFBTTs2QkFDQSxDQUFDOzhCQUtSLEtBQUs7bUNBQ0EsSUFBSTs2QkFDVixJQUFJOzRCQUNMLElBQUk7b0JBQ1osS0FBSzs4QkFDSyxLQUFLO3lCQUNWLFlBQVk7eUJBQ1osU0FBUztxQkFDYixDQUFDO1FBK0VQLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztLQUNwQzs7Ozs7SUE1RUQsSUFDSSxPQUFPLENBQUMsS0FBaUM7UUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3JCOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQ0ksTUFBTSxDQUFDLEtBQTBDO1FBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUNwQjs7OztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7Ozs7SUFFRCxJQUNJLFFBQVEsQ0FBQyxNQUFjO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7OztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7Ozs7SUFFRCxJQUNJLGFBQWEsQ0FBQyxLQUFpQztRQUNqRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztLQUMzQjs7OztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztLQUMxQjs7OztJQUVELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjs7Ozs7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFlO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO2FBQ3pCO2lCQUFNLElBQUksT0FBTyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2lCQUMvQjthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2FBQ3ZCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7SUFFRCxjQUFjOztRQUNaLE1BQU0sUUFBUSxHQUFHO1lBQ2YsQ0FBRSxnQkFBZ0IsQ0FBRSxFQUFVLElBQUk7WUFDbEMsQ0FBRSxxQkFBcUIsQ0FBRSxFQUFLLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUN0RCxDQUFFLHdCQUF3QixDQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQ3pELENBQUUsdUJBQXVCLENBQUUsRUFBRyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVE7WUFDeEQsQ0FBRSxzQkFBc0IsQ0FBRSxFQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTztZQUN2RCxDQUFFLGtCQUFrQixDQUFFLEVBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQzNDLENBQUUsc0JBQXNCLENBQUUsRUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3JHLENBQUM7UUFDRixJQUFJLENBQUMsd0JBQXdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDbEU7OztZQWpHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLFNBQVM7Z0JBQzlCLFNBQVMsRUFBWSxDQUFFLHdCQUF3QixDQUFFO2dCQUNqRCxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQiwweURBQStDO2FBQ2hEOzs7O1lBaEJDLFVBQVU7WUFNSCx3QkFBd0I7OztpQ0EyQjlCLFNBQVMsU0FBQyxvQkFBb0I7c0JBRzlCLEtBQUs7cUJBVUwsS0FBSzt1QkFVTCxLQUFLOzRCQVdMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL3VwZGF0ZS1ob3N0LWNsYXNzLnNlcnZpY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5leHBvcnQgdHlwZSBTdGVwTmdDbGFzc1R5cGUgPSBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBbIGtsYXNzOiBzdHJpbmcgXTogYW55OyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXN0ZXAnLFxuICBwcm92aWRlcnMgICAgICAgICAgOiBbIE56VXBkYXRlSG9zdENsYXNzU2VydmljZSBdLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotc3RlcC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgTnpTdGVwQ29tcG9uZW50IHtcbiAgcHJpdmF0ZSBfc3RhdHVzID0gJ3dhaXQnO1xuICBwcml2YXRlIF9jdXJyZW50SW5kZXggPSAwO1xuICBwcml2YXRlIF9kZXNjcmlwdGlvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIHByaXZhdGUgX2ljb246IFN0ZXBOZ0NsYXNzVHlwZSB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBwcml2YXRlIF90aXRsZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBpc0N1c3RvbVN0YXR1cyA9IGZhbHNlO1xuICBpc0Rlc2NyaXB0aW9uU3RyaW5nID0gdHJ1ZTtcbiAgaXNUaXRsZVN0cmluZyA9IHRydWU7XG4gIGlzSWNvblN0cmluZyA9IHRydWU7XG4gIGxhc3QgPSBmYWxzZTtcbiAgc2hvd1Byb2Nlc3NEb3QgPSBmYWxzZTtcbiAgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICBvdXRTdGF0dXMgPSAncHJvY2Vzcyc7XG4gIGluZGV4ID0gMDtcbiAgQFZpZXdDaGlsZCgncHJvY2Vzc0RvdFRlbXBsYXRlJykgcHJvY2Vzc0RvdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgY3VzdG9tUHJvY2Vzc1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogVGVtcGxhdGVSZWY8dm9pZD4sIHN0YXR1czogc3RyaW5nLCBpbmRleDogbnVtYmVyIH0+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuelRpdGxlKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNUaXRsZVN0cmluZyA9ICEodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5fdGl0bGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelRpdGxlKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdGl0bGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpJY29uKHZhbHVlOiBTdGVwTmdDbGFzc1R5cGUgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNJY29uU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl9pY29uID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnpJY29uKCk6IFN0ZXBOZ0NsYXNzVHlwZSB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgIHRoaXMuX3N0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLmlzQ3VzdG9tU3RhdHVzID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUNsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpTdGF0dXMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGVzY3JpcHRpb24odmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgdGhpcy5pc0Rlc2NyaXB0aW9uU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56RGVzY3JpcHRpb24oKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIGdldCBjdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEluZGV4O1xuICB9XG5cbiAgc2V0IGN1cnJlbnRJbmRleChjdXJyZW50OiBudW1iZXIpIHtcbiAgICB0aGlzLl9jdXJyZW50SW5kZXggPSBjdXJyZW50O1xuICAgIGlmICghdGhpcy5pc0N1c3RvbVN0YXR1cykge1xuICAgICAgaWYgKGN1cnJlbnQgPiB0aGlzLmluZGV4KSB7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9ICdmaW5pc2gnO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID09PSB0aGlzLmluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLm91dFN0YXR1cykge1xuICAgICAgICAgIHRoaXMuX3N0YXR1cyA9IHRoaXMub3V0U3RhdHVzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zdGF0dXMgPSAnd2FpdCc7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ2xhc3NNYXAoKTtcbiAgfVxuXG4gIHVwZGF0ZUNsYXNzTWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTWFwID0ge1xuICAgICAgWyAnYW50LXN0ZXBzLWl0ZW0nIF0gICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYGFudC1zdGVwcy1pdGVtLXdhaXRgIF0gICA6IHRoaXMubnpTdGF0dXMgPT09ICd3YWl0JyxcbiAgICAgIFsgYGFudC1zdGVwcy1pdGVtLXByb2Nlc3NgIF06IHRoaXMubnpTdGF0dXMgPT09ICdwcm9jZXNzJyxcbiAgICAgIFsgYGFudC1zdGVwcy1pdGVtLWZpbmlzaGAgXSA6IHRoaXMubnpTdGF0dXMgPT09ICdmaW5pc2gnLFxuICAgICAgWyBgYW50LXN0ZXBzLWl0ZW0tZXJyb3JgIF0gIDogdGhpcy5uelN0YXR1cyA9PT0gJ2Vycm9yJyxcbiAgICAgIFsgJ2FudC1zdGVwcy1jdXN0b20nIF0gICAgICA6ICEhdGhpcy5uekljb24sXG4gICAgICBbICdhbnQtc3RlcHMtbmV4dC1lcnJvcicgXSAgOiAodGhpcy5vdXRTdGF0dXMgPT09ICdlcnJvcicpICYmICh0aGlzLmN1cnJlbnRJbmRleCA9PT0gdGhpcy5pbmRleCArIDEpXG4gICAgfTtcbiAgICB0aGlzLm56VXBkYXRlSG9zdENsYXNzU2VydmljZS51cGRhdGVIb3N0Q2xhc3ModGhpcy5lbCwgY2xhc3NNYXApO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIG56VXBkYXRlSG9zdENsYXNzU2VydmljZTogTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlKSB7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxufVxuIl19