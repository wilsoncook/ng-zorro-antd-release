/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Host, HostBinding, HostListener, Input, Optional, Output, TemplateRef, ViewChild } from '@angular/core';
import { NzMatchMediaService } from '../core/services/nz-match-media.service';
import { toBoolean } from '../core/util/convert';
import { NzLayoutComponent } from './nz-layout.component';
export class NzSiderComponent {
    /**
     * @param {?} nzLayoutComponent
     * @param {?} nzMatchMediaService
     */
    constructor(nzLayoutComponent, nzMatchMediaService) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set nzReverseArrow(value) {
        this._reverseArrow = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzReverseArrow() {
        return this._reverseArrow;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzTrigger(value) {
        this._trigger = value;
    }
    /**
     * @return {?}
     */
    get nzTrigger() {
        return this._trigger;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzCollapsible(value) {
        this._collapsible = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzCollapsible() {
        return this._collapsible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzCollapsed(value) {
        this._collapsed = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzCollapsed() {
        return this._collapsed;
    }
    /**
     * @return {?}
     */
    get setZeroClass() {
        return this.nzCollapsed && (this.nzCollapsedWidth === 0);
    }
    /**
     * @return {?}
     */
    get setFlex() {
        if (this.nzCollapsed) {
            return `0 0 ${this.nzCollapsedWidth}px`;
        }
        else {
            return `0 0 ${this.nzWidth}px`;
        }
    }
    /**
     * @return {?}
     */
    get setWidth() {
        if (this.nzCollapsed) {
            return this.nzCollapsedWidth;
        }
        else {
            return this.nzWidth;
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onWindowResize(e) {
        this.watchMatchMedia();
    }
    /**
     * @return {?}
     */
    watchMatchMedia() {
        if (this.nzBreakpoint) {
            /** @type {?} */
            const matchBelow = this.nzMatchMediaService.matchMedia(`(max-width: ${this.dimensionMap[this.nzBreakpoint]})`).matches;
            this.below = matchBelow;
            this.nzCollapsed = matchBelow;
            if (this.isInit) {
                this.nzCollapsedChange.emit(matchBelow);
            }
        }
    }
    /**
     * @return {?}
     */
    toggleCollapse() {
        this.nzCollapsed = !this.nzCollapsed;
        this.nzCollapsedChange.emit(this.nzCollapsed);
    }
    /**
     * @return {?}
     */
    get isZeroTrigger() {
        return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth === 0) && ((this.nzBreakpoint && this.below) || (!this.nzBreakpoint));
    }
    /**
     * @return {?}
     */
    get isSiderTrigger() {
        return this.nzCollapsible && this.nzTrigger && (this.nzCollapsedWidth !== 0);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.watchMatchMedia();
        if (this.nzLayoutComponent) {
            this.nzLayoutComponent.hasSider = true;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isInit = true;
    }
}
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
NzSiderComponent.ctorParameters = () => [
    { type: NzLayoutComponent, decorators: [{ type: Optional }, { type: Host }] },
    { type: NzMatchMediaService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc2lkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImxheW91dC9uei1zaWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLElBQUksRUFDSixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFdBQVcsRUFDWCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBWTFELE1BQU07Ozs7O0lBZ0hKLFlBQXdDLGlCQUFvQyxFQUFVLG1CQUF3QztRQUF0RixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjswQkEvR3pHLEtBQUs7NEJBQ0gsS0FBSzs2QkFFSixLQUFLO3FCQUNiLEtBQUs7c0JBQ0osS0FBSzs0QkFDQztZQUNyQixFQUFFLEVBQUcsT0FBTztZQUNaLEVBQUUsRUFBRyxPQUFPO1lBQ1osRUFBRSxFQUFHLE9BQU87WUFDWixFQUFFLEVBQUcsT0FBTztZQUNaLEVBQUUsRUFBRyxRQUFRO1lBQ2IsR0FBRyxFQUFFLFFBQVE7U0FDZDt1QkFDa0IsR0FBRztnQ0FDTSxFQUFFO2lDQXdDQSxJQUFJLFlBQVksRUFBRTtLQXlEL0M7Ozs7O0lBOUZELElBQ0ksY0FBYyxDQUFDLEtBQWM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkM7Ozs7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0tB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UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNwQjs7O1lBcElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQWEsVUFBVTtnQkFDL0IsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsOHdCQUFnRDtnQkFDaEQsSUFBSSxFQUFpQjtvQkFDbkIsMEJBQTBCLEVBQUUsTUFBTTtpQkFDbkM7YUFDRjs7OztZQVhRLGlCQUFpQix1QkE0SFgsUUFBUSxZQUFJLElBQUk7WUEvSHRCLG1CQUFtQjs7O3VCQWtCekIsU0FBUyxTQUFDLGdCQUFnQjtzQkFZMUIsS0FBSzsrQkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBRUwsS0FBSzt3QkFTTCxLQUFLOzRCQVNMLEtBQUs7MEJBU0wsS0FBSyxZQUNMLFdBQVcsU0FBQyxrQ0FBa0M7Z0NBUzlDLE1BQU07MkJBRU4sV0FBVyxTQUFDLG1DQUFtQztzQkFLL0MsV0FBVyxTQUFDLFlBQVk7dUJBU3hCLFdBQVcsU0FBQyxvQkFBb0IsY0FDaEMsV0FBVyxTQUFDLG9CQUFvQixjQUNoQyxXQUFXLFNBQUMsZ0JBQWdCOzZCQVM1QixZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUUsUUFBUSxDQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56TWF0Y2hNZWRpYVNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL3NlcnZpY2VzL256LW1hdGNoLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5pbXBvcnQgeyBOekxheW91dENvbXBvbmVudCB9IGZyb20gJy4vbnotbGF5b3V0LmNvbXBvbmVudCc7XG5cbmV4cG9ydCB0eXBlIE56QnJlYWtQb2ludCA9ICd4cycgfCAnc20nIHwgJ21kJyB8ICdsZycgfCAneGwnIHwgJ3h4bCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotc2lkZXInLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotc2lkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0ICAgICAgICAgICAgICAgOiB7XG4gICAgJ1tjbGFzcy5hbnQtbGF5b3V0LXNpZGVyXSc6ICd0cnVlJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIE56U2lkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9jb2xsYXBzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY29sbGFwc2libGUgPSBmYWxzZTtcbiAgQFZpZXdDaGlsZCgnZGVmYXVsdFRyaWdnZXInKSBfdHJpZ2dlcjogVGVtcGxhdGVSZWY8dm9pZD47XG4gIHByaXZhdGUgX3JldmVyc2VBcnJvdyA9IGZhbHNlO1xuICBwcml2YXRlIGJlbG93ID0gZmFsc2U7XG4gIHByaXZhdGUgaXNJbml0ID0gZmFsc2U7XG4gIHByaXZhdGUgZGltZW5zaW9uTWFwID0ge1xuICAgIHhzIDogJzQ4MHB4JyxcbiAgICBzbSA6ICc1NzZweCcsXG4gICAgbWQgOiAnNzY4cHgnLFxuICAgIGxnIDogJzk5MnB4JyxcbiAgICB4bCA6ICcxMjAwcHgnLFxuICAgIHh4bDogJzE2MDBweCdcbiAgfTtcbiAgQElucHV0KCkgbnpXaWR0aCA9IDIwMDtcbiAgQElucHV0KCkgbnpDb2xsYXBzZWRXaWR0aCA9IDgwO1xuICBASW5wdXQoKSBuekJyZWFrcG9pbnQ6IE56QnJlYWtQb2ludDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpSZXZlcnNlQXJyb3codmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXZlcnNlQXJyb3cgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56UmV2ZXJzZUFycm93KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXZlcnNlQXJyb3c7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUcmlnZ2VyKHZhbHVlOiBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuX3RyaWdnZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelRyaWdnZXIoKTogVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl90cmlnZ2VyO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q29sbGFwc2libGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb2xsYXBzaWJsZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1sYXlvdXQtc2lkZXItY29sbGFwc2VkJylcbiAgc2V0IG56Q29sbGFwc2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekNvbGxhcHNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2VkO1xuICB9XG5cbiAgQE91dHB1dCgpIG56Q29sbGFwc2VkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWxheW91dC1zaWRlci16ZXJvLXdpZHRoJylcbiAgZ2V0IHNldFplcm9DbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uekNvbGxhcHNlZCAmJiAodGhpcy5uekNvbGxhcHNlZFdpZHRoID09PSAwKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuZmxleCcpXG4gIGdldCBzZXRGbGV4KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubnpDb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybiBgMCAwICR7dGhpcy5uekNvbGxhcHNlZFdpZHRofXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAwIDAgJHt0aGlzLm56V2lkdGh9cHhgO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUubWF4LXdpZHRoLnB4JylcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5taW4td2lkdGgucHgnKVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoLnB4JylcbiAgZ2V0IHNldFdpZHRoKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMubnpDb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLm56Q29sbGFwc2VkV2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm56V2lkdGg7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsgJyRldmVudCcgXSlcbiAgb25XaW5kb3dSZXNpemUoZTogVUlFdmVudCk6IHZvaWQge1xuICAgIHRoaXMud2F0Y2hNYXRjaE1lZGlhKCk7XG4gIH1cblxuICB3YXRjaE1hdGNoTWVkaWEoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpCcmVha3BvaW50KSB7XG4gICAgICBjb25zdCBtYXRjaEJlbG93ID0gdGhpcy5uek1hdGNoTWVkaWFTZXJ2aWNlLm1hdGNoTWVkaWEoYChtYXgtd2lkdGg6ICR7dGhpcy5kaW1lbnNpb25NYXBbIHRoaXMubnpCcmVha3BvaW50IF19KWApLm1hdGNoZXM7XG4gICAgICB0aGlzLmJlbG93ID0gbWF0Y2hCZWxvdztcbiAgICAgIHRoaXMubnpDb2xsYXBzZWQgPSBtYXRjaEJlbG93O1xuICAgICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICAgIHRoaXMubnpDb2xsYXBzZWRDaGFuZ2UuZW1pdChtYXRjaEJlbG93KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0b2dnbGVDb2xsYXBzZSgpOiB2b2lkIHtcbiAgICB0aGlzLm56Q29sbGFwc2VkID0gIXRoaXMubnpDb2xsYXBzZWQ7XG4gICAgdGhpcy5uekNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMubnpDb2xsYXBzZWQpO1xuICB9XG5cbiAgZ2V0IGlzWmVyb1RyaWdnZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpDb2xsYXBzaWJsZSAmJiB0aGlzLm56VHJpZ2dlciAmJiAodGhpcy5uekNvbGxhcHNlZFdpZHRoID09PSAwKSAmJiAoKHRoaXMubnpCcmVha3BvaW50ICYmIHRoaXMuYmVsb3cpIHx8ICghdGhpcy5uekJyZWFrcG9pbnQpKTtcbiAgfVxuXG4gIGdldCBpc1NpZGVyVHJpZ2dlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uekNvbGxhcHNpYmxlICYmIHRoaXMubnpUcmlnZ2VyICYmICh0aGlzLm56Q29sbGFwc2VkV2lkdGggIT09IDApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEhvc3QoKSBwcml2YXRlIG56TGF5b3V0Q29tcG9uZW50OiBOekxheW91dENvbXBvbmVudCwgcHJpdmF0ZSBuek1hdGNoTWVkaWFTZXJ2aWNlOiBOek1hdGNoTWVkaWFTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLndhdGNoTWF0Y2hNZWRpYSgpO1xuICAgIGlmICh0aGlzLm56TGF5b3V0Q29tcG9uZW50KSB7XG4gICAgICB0aGlzLm56TGF5b3V0Q29tcG9uZW50Lmhhc1NpZGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICB9XG5cbn1cbiJdfQ==