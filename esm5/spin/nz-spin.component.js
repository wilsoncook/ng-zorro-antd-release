/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { isEmpty, isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';
var NzSpinComponent = /** @class */ (function () {
    function NzSpinComponent(elementRef, renderer, zone) {
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
    Object.defineProperty(NzSpinComponent.prototype, "nzDelay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._delay;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._delay = value;
                this.resultSpinning$ = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSpinComponent.prototype, "nzTip", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tip;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tip = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSpinComponent.prototype, "nzSpinning", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.baseSpinning$.next(toBoolean(value));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzSpinComponent.prototype.checkNested = /**
     * @return {?}
     */
    function () {
        /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
        if (!isEmpty(this.containerElement.nativeElement)) {
            this.isNested = true;
            this.renderer.setStyle(this.el, 'display', 'block');
        }
        else {
            this.isNested = false;
            this.renderer.removeStyle(this.el, 'display');
        }
    };
    /**
     * @return {?}
     */
    NzSpinComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.checkNested();
    };
    NzSpinComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-spin',
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "<ng-template #defaultIndicatorTemplate>\n  <span\n    class=\"ant-spin-dot\"\n    [class.ant-spin-dot-spin]=\"resultSpinning$|async\">\n    <i></i><i></i><i></i><i></i>\n  </span>\n</ng-template>\n<div [class.ant-spin-nested-loading]=\"isNested\">\n  <div [hidden]=\"!(resultSpinning$|async)\">\n    <div\n      class=\"ant-spin\"\n      [class.ant-spin-spinning]=\"resultSpinning$|async\"\n      [class.ant-spin-lg]=\"nzSize=='large'\"\n      [class.ant-spin-sm]=\"nzSize=='small'\"\n      [class.ant-spin-show-text]=\"nzTip\">\n      <ng-template [ngTemplateOutlet]=\"nzIndicator||defaultIndicatorTemplate\"></ng-template>\n      <div class=\"ant-spin-text\" *ngIf=\"nzTip\">{{ nzTip }}</div>\n    </div>\n  </div>\n  <div\n    #containerElement\n    class=\"ant-spin-container\"\n    [class.ant-spin-blur]=\"resultSpinning$|async\"\n    [hidden]=\"!isNested\"\n    (cdkObserveContent)=\"checkNested()\">\n    <ng-content></ng-content>\n  </div>\n</div>"
                }] }
    ];
    /** @nocollapse */
    NzSpinComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone }
    ]; };
    NzSpinComponent.propDecorators = {
        containerElement: [{ type: ViewChild, args: ['containerElement',] }],
        nzIndicator: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzDelay: [{ type: Input }],
        nzTip: [{ type: Input }],
        nzSpinning: [{ type: Input }]
    };
    return NzSpinComponent;
}());
export { NzSpinComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3Bpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsic3Bpbi9uei1zcGluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0lBd0QvQyx5QkFBb0IsVUFBc0IsRUFBVSxRQUFtQixFQUFVLElBQVk7UUFBekUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFRO3NCQTlDNUUsQ0FBQzt3QkFFUCxLQUFLOzZCQUNBLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQzsrQkFDRixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3NCQUd2RixTQUFTO1FBd0N6QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0tBQ3pDO0lBdkNELHNCQUNJLG9DQUFPOzs7O1FBT1g7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7Ozs7O1FBVkQsVUFDWSxLQUFhO1lBQ3ZCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDM0Y7U0FDRjs7O09BQUE7SUFNRCxzQkFDSSxrQ0FBSzs7OztRQUlUO1lBQ0UsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ2xCOzs7OztRQVBELFVBQ1UsS0FBYTtZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNuQjs7O09BQUE7SUFNRCxzQkFDSSx1Q0FBVTs7Ozs7UUFEZCxVQUNlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDM0M7OztPQUFBOzs7O0lBRUQscUNBQVc7OztJQUFYOztRQUVFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQy9DO0tBQ0Y7Ozs7SUFNRCx5Q0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7O2dCQTVERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFhLFNBQVM7b0JBQzlCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGVBQWUsRUFBTSx1QkFBdUIsQ0FBQyxNQUFNO29CQUNuRCx1OEJBQStDO2lCQUNoRDs7OztnQkFsQkMsVUFBVTtnQkFHVixTQUFTO2dCQURULE1BQU07OzttQ0F3QkwsU0FBUyxTQUFDLGtCQUFrQjs4QkFDNUIsS0FBSzt5QkFDTCxLQUFLOzBCQUVMLEtBQUs7d0JBWUwsS0FBSzs2QkFTTCxLQUFLOzswQkF2RFI7O1NBdUJhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgaXNFbXB0eSwgaXNOb3ROaWwgfSBmcm9tICcuLi9jb3JlL3V0aWwvY2hlY2snO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXNwaW4nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uICAgIDogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zcGluLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOelNwaW5Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfdGlwOiBzdHJpbmc7XG4gIHByaXZhdGUgX2RlbGF5ID0gMDtcbiAgZWw6IEhUTUxFbGVtZW50O1xuICBpc05lc3RlZCA9IGZhbHNlO1xuICBiYXNlU3Bpbm5pbmckID0gbmV3IEJlaGF2aW9yU3ViamVjdCh0cnVlKTtcbiAgcmVzdWx0U3Bpbm5pbmckOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5iYXNlU3Bpbm5pbmckLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZGVib3VuY2VUaW1lKHRoaXMubnpEZWxheSkpO1xuICBAVmlld0NoaWxkKCdjb250YWluZXJFbGVtZW50JykgY29udGFpbmVyRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgbnpJbmRpY2F0b3I6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBASW5wdXQoKSBuelNpemUgPSAnZGVmYXVsdCc7XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGVsYXkodmFsdWU6IG51bWJlcikge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2RlbGF5ID0gdmFsdWU7XG4gICAgICB0aGlzLnJlc3VsdFNwaW5uaW5nJCA9IHRoaXMuYmFzZVNwaW5uaW5nJC5hc09ic2VydmFibGUoKS5waXBlKGRlYm91bmNlVGltZSh0aGlzLm56RGVsYXkpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpEZWxheSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelRpcCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdGlwID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnpUaXAoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGlwO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U3Bpbm5pbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmJhc2VTcGlubmluZyQubmV4dCh0b0Jvb2xlYW4odmFsdWUpKTtcbiAgfVxuXG4gIGNoZWNrTmVzdGVkKCk6IHZvaWQge1xuICAgIC8qKiBubyB3YXkgdG8gZGV0ZWN0IGVtcHR5IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzEyNTMwICoqL1xuICAgIGlmICghaXNFbXB0eSh0aGlzLmNvbnRhaW5lckVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcbiAgICAgIHRoaXMuaXNOZXN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsLCAnZGlzcGxheScsICdibG9jaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzTmVzdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuZWwsICdkaXNwbGF5Jyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tOZXN0ZWQoKTtcbiAgfVxufVxuIl19