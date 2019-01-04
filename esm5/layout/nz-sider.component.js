/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Host, HostBinding, HostListener, Input, Optional, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzMatchMediaService } from '../core/services/nz-match-media.service';
import { toBoolean } from '../core/util/convert';
import { NzLayoutComponent } from './nz-layout.component';
var NzSiderComponent = /** @class */ (function () {
    function NzSiderComponent(nzLayoutComponent, nzMatchMediaService) {
        this.nzLayoutComponent = nzLayoutComponent;
        this.nzMatchMediaService = nzMatchMediaService;
        this._collapsed = false;
        this._collapsible = false;
        this._reverseArrow = false;
        this.below = false;
        this.isInit = false;
        this.dimensionMap = {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px'
        };
        this.nzWidth = 200;
        this.nzCollapsedWidth = 80;
        this.nzCollapsedChange = new EventEmitter();
    }
    Object.defineProperty(NzSiderComponent.prototype, "nzReverseArrow", {
        get: /**
         * @return {?}
         */
        function () {
            return this._reverseArrow;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._reverseArrow = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "nzTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this._trigger;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._trigger = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "nzCollapsible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsible;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsible = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "nzCollapsed", {
        get: /**
         * @return {?}
         */
        function () {
            return this._collapsed;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._collapsed = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "setZeroClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzCollapsed && (this.nzCollapsedWidth === 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "setFlex", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nzCollapsed) {
                return "0 0 " + this.nzCollapsedWidth + "px";
            }
            else {
                return "0 0 " + this.nzWidth + "px";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "setWidth", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nzCollapsed) {
                return this.nzCollapsedWidth;
            }
            else {
                return this.nzWidth;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    NzSiderComponent.prototype.onWindowResize = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.watchMatchMedia();
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.watchMatchMedia = /**
     * @return {?}
     */
    function () {
        if (this.nzBreakpoint) {
            /** @type {?} */
            var matchBelow = this.nzMatchMediaService.matchMedia("(max-width: " + this.dimensionMap[this.nzBreakpoint] + ")").matches;
            this.below = matchBelow;
            this.nzCollapsed = matchBelow;
            if (this.isInit) {
                this.nzCollapsedChange.emit(matchBelow);
            }
        }
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.toggleCollapse = /**
     * @return {?}
     */
    function () {
        this.nzCollapsed = !this.nzCollapsed;
        this.nzCollapsedChange.emit(this.nzCollapsed);
    };
    Object.defineProperty(NzSiderComponent.prototype, "isZeroTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth === 0) && ((this.nzBreakpoint && this.below) || (!this.nzBreakpoint));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSiderComponent.prototype, "isSiderTrigger", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth !== 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.watchMatchMedia();
        if (this.nzLayoutComponent) {
            this.nzLayoutComponent.hasSider = true;
        }
    };
    /**
     * @return {?}
     */
    NzSiderComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isInit = true;
    };
    NzSiderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-sider',
                    preserveWhitespaces: false,
                    template: "<div class=\"ant-layout-sider-children\">\n  <ng-content></ng-content>\n</div>\n<span class=\"ant-layout-sider-zero-width-trigger\" *ngIf=\"isZeroTrigger\" (click)=\"toggleCollapse()\">\n  <i class=\"anticon anticon-bars\"></i>\n</span>\n<div class=\"ant-layout-sider-trigger\" *ngIf=\"isSiderTrigger\" (click)=\"toggleCollapse()\" [style.width.px]=\"nzCollapsed?nzCollapsedWidth:nzWidth\">\n  <ng-template [ngTemplateOutlet]=\"nzTrigger\"></ng-template>\n</div>\n<ng-template #defaultTrigger>\n  <i class=\"anticon\" [class.anticon-left]=\"!nzCollapsed\" [class.anticon-right]=\"nzCollapsed\" *ngIf=\"!nzReverseArrow\"></i>\n  <i class=\"anticon\" [class.anticon-left]=\"nzCollapsed\" [class.anticon-right]=\"!nzCollapsed\" *ngIf=\"nzReverseArrow\"></i>\n</ng-template>",
                    host: {
                        '[class.ant-layout-sider]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzSiderComponent.ctorParameters = function () { return [
        { type: NzLayoutComponent, decorators: [{ type: Optional }, { type: Host }] },
        { type: NzMatchMediaService }
    ]; };
    NzSiderComponent.propDecorators = {
        _trigger: [{ type: ViewChild, args: ['defaultTrigger',] }],
        nzWidth: [{ type: Input }],
        nzCollapsedWidth: [{ type: Input }],
        nzBreakpoint: [{ type: Input }],
        nzReverseArrow: [{ type: Input }],
        nzTrigger: [{ type: Input }],
        nzCollapsible: [{ type: Input }],
        nzCollapsed: [{ type: Input }, { type: HostBinding, args: ['class.ant-layout-sider-collapsed',] }],
        nzCollapsedChange: [{ type: Output }],
        setZeroClass: [{ type: HostBinding, args: ['class.ant-layout-sider-zero-width',] }],
        setFlex: [{ type: HostBinding, args: ['style.flex',] }],
        setWidth: [{ type: HostBinding, args: ['style.max-width.px',] }, { type: HostBinding, args: ['style.min-width.px',] }, { type: HostBinding, args: ['style.width.px',] }],
        onWindowResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return NzSiderComponent;
}());
export { NzSiderComponent };
function NzSiderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSiderComponent.prototype._collapsed;
    /** @type {?} */
    NzSiderComponent.prototype._collapsible;
    /** @type {?} */
    NzSiderComponent.prototype._trigger;
    /** @type {?} */
    NzSiderComponent.prototype._reverseArrow;
    /** @type {?} */
    NzSiderComponent.prototype.below;
    /** @type {?} */
    NzSiderComponent.prototype.isInit;
    /** @type {?} */
    NzSiderComponent.prototype.dimensionMap;
    /** @type {?} */
    NzSiderComponent.prototype.nzWidth;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsedWidth;
    /** @type {?} */
    NzSiderComponent.prototype.nzBreakpoint;
    /** @type {?} */
    NzSiderComponent.prototype.nzCollapsedChange;
    /** @type {?} */
    NzSiderComponent.prototype.nzLayoutComponent;
    /** @type {?} */
    NzSiderComponent.prototype.nzMatchMediaService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2lkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImxheW91dC9uei1zaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQTRIeEQsMEJBQXdDLGlCQUFvQyxFQUFVLG1CQUF3QztRQUF0RixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjswQkEvR3pHLEtBQUs7NEJBQ0gsS0FBSzs2QkFFSixLQUFLO3FCQUNiLEtBQUs7c0JBQ0osS0FBSzs0QkFDQztZQUNyQixFQUFFLEVBQUcsT0FBTztZQUNaLEVBQUUsRUFBRyxPQUFPO1lBQ1osRUFBRSxFQUFHLE9BQU87WUFDWixFQUFFLEVBQUcsT0FBTztZQUNaLEVBQUUsRUFBRyxRQUFRO1lBQ2IsR0FBRyxFQUFFLFFBQVE7U0FDZDt1QkFDa0IsR0FBRztnQ0FDTSxFQUFFO2lDQXdDQSxJQUFJLFlBQVksRUFBRTtLQXlEL0M7SUE5RkQsc0JBQ0ksNENBQWM7Ozs7UUFJbEI7WUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDM0I7Ozs7O1FBUEQsVUFDbUIsS0FBYztZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2Qzs7O09BQUE7SUFN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ZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEM7S0FDRjs7OztJQUVELDBDQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOztnQkFwSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBYSxVQUFVO29CQUMvQixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQiw4d0JBQWdEO29CQUNoRCxJQUFJLEVBQWlCO3dCQUNuQiwwQkFBMEIsRUFBRSxNQUFNO3FCQUNuQztpQkFDRjs7OztnQkFYUSxpQkFBaUIsdUJBNEhYLFFBQVEsWUFBSSxJQUFJO2dCQS9IdEIsbUJBQW1COzs7MkJBa0J6QixTQUFTLFNBQUMsZ0JBQWdCOzBCQVkxQixLQUFLO21DQUNMLEtBQUs7K0JBQ0wsS0FBSztpQ0FFTCxLQUFLOzRCQVNMLEtBQUs7Z0NBU0wsS0FBSzs4QkFTTCxLQUFLLFlBQ0wsV0FBVyxTQUFDLGtDQUFrQztvQ0FTOUMsTUFBTTsrQkFFTixXQUFXLFNBQUMsbUNBQW1DOzBCQUsvQyxXQUFXLFNBQUMsWUFBWTsyQkFTeEIsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxXQUFXLFNBQUMsb0JBQW9CLGNBQ2hDLFdBQVcsU0FBQyxnQkFBZ0I7aUNBUzVCLFlBQVksU0FBQyxlQUFlLEVBQUUsQ0FBRSxRQUFRLENBQUU7OzJCQWpIN0M7O1NBOEJhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOek1hdGNoTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy9uei1tYXRjaC1tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcblxuaW1wb3J0IHsgTnpMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuL256LWxheW91dC5jb21wb25lbnQnO1xuXG5leHBvcnQgdHlwZSBOekJyZWFrUG9pbnQgPSAneHMnIHwgJ3NtJyB8ICdtZCcgfCAnbGcnIHwgJ3hsJyB8ICd4eGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXNpZGVyJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXNpZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgaG9zdCAgICAgICAgICAgICAgIDoge1xuICAgICdbY2xhc3MuYW50LWxheW91dC1zaWRlcl0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBOelNpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfY29sbGFwc2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX2NvbGxhcHNpYmxlID0gZmFsc2U7XG4gIEBWaWV3Q2hpbGQoJ2RlZmF1bHRUcmlnZ2VyJykgX3RyaWdnZXI6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBwcml2YXRlIF9yZXZlcnNlQXJyb3cgPSBmYWxzZTtcbiAgcHJpdmF0ZSBiZWxvdyA9IGZhbHNlO1xuICBwcml2YXRlIGlzSW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIGRpbWVuc2lvbk1hcCA9IHtcbiAgICB4cyA6ICc0ODBweCcsXG4gICAgc20gOiAnNTc2cHgnLFxuICAgIG1kIDogJzc2OHB4JyxcbiAgICBsZyA6ICc5OTJweCcsXG4gICAgeGwgOiAnMTIwMHB4JyxcbiAgICB4eGw6ICcxNjAwcHgnXG4gIH07XG4gIEBJbnB1dCgpIG56V2lkdGggPSAyMDA7XG4gIEBJbnB1dCgpIG56Q29sbGFwc2VkV2lkdGggPSA4MDtcbiAgQElucHV0KCkgbnpCcmVha3BvaW50OiBOekJyZWFrUG9pbnQ7XG5cbiAgQElucHV0KClcbiAgc2V0IG56UmV2ZXJzZUFycm93KHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmV2ZXJzZUFycm93ID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuelJldmVyc2VBcnJvdygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZUFycm93O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VHJpZ2dlcih2YWx1ZTogVGVtcGxhdGVSZWY8dm9pZD4pIHtcbiAgICB0aGlzLl90cmlnZ2VyID0gdmFsdWU7XG4gIH1cblxuICBnZXQgbnpUcmlnZ2VyKCk6IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fdHJpZ2dlcjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekNvbGxhcHNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29sbGFwc2libGUgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56Q29sbGFwc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNpYmxlO1xuICB9XG5cbiAgQElucHV0KClcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbGF5b3V0LXNpZGVyLWNvbGxhcHNlZCcpXG4gIHNldCBuekNvbGxhcHNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcbiAgfVxuXG4gIEBPdXRwdXQoKSBuekNvbGxhcHNlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1sYXlvdXQtc2lkZXItemVyby13aWR0aCcpXG4gIGdldCBzZXRaZXJvQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpDb2xsYXBzZWQgJiYgKHRoaXMubnpDb2xsYXBzZWRXaWR0aCA9PT0gMCk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmZsZXgnKVxuICBnZXQgc2V0RmxleCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm56Q29sbGFwc2VkKSB7XG4gICAgICByZXR1cm4gYDAgMCAke3RoaXMubnpDb2xsYXBzZWRXaWR0aH1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgMCAwICR7dGhpcy5ueldpZHRofXB4YDtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heC13aWR0aC5weCcpXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWluLXdpZHRoLnB4JylcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC5weCcpXG4gIGdldCBzZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLm56Q29sbGFwc2VkKSB7XG4gICAgICByZXR1cm4gdGhpcy5uekNvbGxhcHNlZFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5ueldpZHRoO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbICckZXZlbnQnIF0pXG4gIG9uV2luZG93UmVzaXplKGU6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLndhdGNoTWF0Y2hNZWRpYSgpO1xuICB9XG5cbiAgd2F0Y2hNYXRjaE1lZGlhKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm56QnJlYWtwb2ludCkge1xuICAgICAgY29uc3QgbWF0Y2hCZWxvdyA9IHRoaXMubnpNYXRjaE1lZGlhU2VydmljZS5tYXRjaE1lZGlhKGAobWF4LXdpZHRoOiAke3RoaXMuZGltZW5zaW9uTWFwWyB0aGlzLm56QnJlYWtwb2ludCBdfSlgKS5tYXRjaGVzO1xuICAgICAgdGhpcy5iZWxvdyA9IG1hdGNoQmVsb3c7XG4gICAgICB0aGlzLm56Q29sbGFwc2VkID0gbWF0Y2hCZWxvdztcbiAgICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgICB0aGlzLm56Q29sbGFwc2VkQ2hhbmdlLmVtaXQobWF0Y2hCZWxvdyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlQ29sbGFwc2UoKTogdm9pZCB7XG4gICAgdGhpcy5uekNvbGxhcHNlZCA9ICF0aGlzLm56Q29sbGFwc2VkO1xuICAgIHRoaXMubnpDb2xsYXBzZWRDaGFuZ2UuZW1pdCh0aGlzLm56Q29sbGFwc2VkKTtcbiAgfVxuXG4gIGdldCBpc1plcm9UcmlnZ2VyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56Q29sbGFwc2libGUgJiYgdGhpcy5uelRyaWdnZXIgJiYgKHRoaXMubnpDb2xsYXBzZWRXaWR0aCA9PT0gMCkgJiYgKCh0aGlzLm56QnJlYWtwb2ludCAmJiB0aGlzLmJlbG93KSB8fCAoIXRoaXMubnpCcmVha3BvaW50KSk7XG4gIH1cblxuICBnZXQgaXNTaWRlclRyaWdnZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpDb2xsYXBzaWJsZSAmJiB0aGlzLm56VHJpZ2dlciAmJiAodGhpcy5uekNvbGxhcHNlZFdpZHRoICE9PSAwKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBIb3N0KCkgcHJpdmF0ZSBuekxheW91dENvbXBvbmVudDogTnpMYXlvdXRDb21wb25lbnQsIHByaXZhdGUgbnpNYXRjaE1lZGlhU2VydmljZTogTnpNYXRjaE1lZGlhU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy53YXRjaE1hdGNoTWVkaWEoKTtcbiAgICBpZiAodGhpcy5uekxheW91dENvbXBvbmVudCkge1xuICAgICAgdGhpcy5uekxheW91dENvbXBvbmVudC5oYXNTaWRlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNJbml0ID0gdHJ1ZTtcbiAgfVxuXG59XG4iXX0=