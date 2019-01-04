/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isEmpty, isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
export class NzSpinComponent {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} zone
     */
    constructor(elementRef, renderer, zone) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.zone = zone;
        this._delay = 0;
        this.isNested = false;
        this.baseSpinning$ = new BehaviorSubject(true);
        this.resultSpinning$ = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
        this.nzSize = 'default';
        this.el = this.elementRef.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDelay(value) {
        if (isNotNil(value)) {
            this._delay = value;
            this.resultSpinning$ = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
        }
    }
    /**
     * @return {?}
     */
    get nzDelay() {
        return this._delay;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzTip(value) {
        this._tip = value;
    }
    /**
     * @return {?}
     */
    get nzTip() {
        return this._tip;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSpinning(value) {
        this.baseSpinning$.next(toBoolean(value));
    }
    /**
     * @return {?}
     */
    checkNested() {
        /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
        if (!isEmpty(this.containerElement.nativeElement)) {
            this.isNested = true;
            this.renderer.setStyle(this.el, 'display', 'block');
        }
        else {
            this.isNested = false;
            this.renderer.removeStyle(this.el, 'display');
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.checkNested();
    }
}
NzSpinComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-spin',
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: "<ng-template #defaultIndicatorTemplate>\n  <span\n    class=\"ant-spin-dot\"\n    [class.ant-spin-dot-spin]=\"resultSpinning$|async\">\n    <i></i><i></i><i></i><i></i>\n  </span>\n</ng-template>\n<div [class.ant-spin-nested-loading]=\"isNested\">\n  <div [hidden]=\"!(resultSpinning$|async)\">\n    <div\n      class=\"ant-spin\"\n      [class.ant-spin-spinning]=\"resultSpinning$|async\"\n      [class.ant-spin-lg]=\"nzSize=='large'\"\n      [class.ant-spin-sm]=\"nzSize=='small'\"\n      [class.ant-spin-show-text]=\"nzTip\">\n      <ng-template [ngTemplateOutlet]=\"nzIndicator||defaultIndicatorTemplate\"></ng-template>\n      <div class=\"ant-spin-text\" *ngIf=\"nzTip\">{{ nzTip }}</div>\n    </div>\n  </div>\n  <div\n    #containerElement\n    class=\"ant-spin-container\"\n    [class.ant-spin-blur]=\"resultSpinning$|async\"\n    [hidden]=\"!isNested\"\n    (cdkObserveContent)=\"checkNested()\">\n    <ng-content></ng-content>\n  </div>\n</div>"
            }] }
];
/** @nocollapse */
NzSpinComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
NzSpinComponent.propDecorators = {
    containerElement: [{ type: ViewChild, args: ['containerElement',] }],
    nzIndicator: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzDelay: [{ type: Input }],
    nzTip: [{ type: Input }],
    nzSpinning: [{ type: Input }]
};
function NzSpinComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSpinComponent.prototype._tip;
    /** @type {?} */
    NzSpinComponent.prototype._delay;
    /** @type {?} */
    NzSpinComponent.prototype.el;
    /** @type {?} */
    NzSpinComponent.prototype.isNested;
    /** @type {?} */
    NzSpinComponent.prototype.baseSpinning$;
    /** @type {?} */
    NzSpinComponent.prototype.resultSpinning$;
    /** @type {?} */
    NzSpinComponent.prototype.containerElement;
    /** @type {?} */
    NzSpinComponent.prototype.nzIndicator;
    /** @type {?} */
    NzSpinComponent.prototype.nzSize;
    /** @type {?} */
    NzSpinComponent.prototype.elementRef;
    /** @type {?} */
    NzSpinComponent.prototype.renderer;
    /** @type {?} */
    NzSpinComponent.prototype.zone;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3Bpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsic3Bpbi9uei1zcGluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRakQsTUFBTTs7Ozs7O0lBZ0RKLFlBQW9CLFVBQXNCLEVBQVUsUUFBbUIsRUFBVSxJQUFZO1FBQXpFLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBUTtzQkE5QzVFLENBQUM7d0JBRVAsS0FBSzs2QkFDQSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUM7K0JBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztzQkFHdkYsU0FBUztRQXdDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztLQUN6Qzs7Ozs7SUF2Q0QsSUFDSSxPQUFPLENBQUMsS0FBYTtRQUN2QixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUMzRjtLQUNGOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3BCOzs7OztJQUVELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7S0FDbkI7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDbEI7Ozs7O0lBRUQsSUFDSSxVQUFVLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMzQzs7OztJQUVELFdBQVc7O1FBRVQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckQ7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDL0M7S0FDRjs7OztJQU1ELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7OztZQTVERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLFNBQVM7Z0JBQzlCLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLGVBQWUsRUFBTSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUNuRCx1OEJBQStDO2FBQ2hEOzs7O1lBbEJDLFVBQVU7WUFHVixTQUFTO1lBRFQsTUFBTTs7OytCQXdCTCxTQUFTLFNBQUMsa0JBQWtCOzBCQUM1QixLQUFLO3FCQUNMLEtBQUs7c0JBRUwsS0FBSztvQkFZTCxLQUFLO3lCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgaXNFbXB0eSwgaXNOb3ROaWwgfSBmcm9tICcuLi9jb3JlL3V0aWwvY2hlY2snO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXNwaW4nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uICAgIDogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zcGluLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOelNwaW5Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfdGlwOiBzdHJpbmc7XG4gIHByaXZhdGUgX2RlbGF5ID0gMDtcbiAgZWw6IEhUTUxFbGVtZW50O1xuICBpc05lc3RlZCA9IGZhbHNlO1xuICBiYXNlU3Bpbm5pbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgcmVzdWx0U3Bpbm5pbmckOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5iYXNlU3Bpbm5pbmckLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMubnpEZWxheSkpO1xuICBAVmlld0NoaWxkKCdjb250YWluZXJFbGVtZW50JykgY29udGFpbmVyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgbnpJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelNpemUgPSAnZGVmYXVsdCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2RlbGF5ID0gdmFsdWU7XG4gICAgICB0aGlzLnJlc3VsdFNwaW5uaW5nJCA9IHRoaXMuYmFzZVNwaW5uaW5nJC5hc09ic2VydmFibGUoKS5waXBlKGRlYm91bmNlVGltZSh0aGlzLm56RGVsYXkpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEZWxheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelRpcCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGlwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnpUaXAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGlwO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U3Bpbm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmJhc2VTcGlubmluZyQubmV4dCh0b0Jvb2xlYW4odmFsdWUpKTtcbiAgfVxuXG4gIGNoZWNrTmVzdGVkKCk6IHZvaWQge1xuICAgIC8qKiBubyB3YXkgdG8gZGV0ZWN0IGVtcHR5IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEyNTMwICoqL1xuICAgIGlmICghaXNFbXB0eSh0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaXNOZXN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzTmVzdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwsICdkaXNwbGF5Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tOZXN0ZWQoKTtcbiAgfVxufVxuIl19