/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** get some code from https://github.com/angular/material2 */
import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Optional, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { isNotNil } from '../core/util/check';
import { toNumber } from '../core/util/convert';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
/**
 * @record
 */
export function NzAnimatedInterface() { }
function NzAnimatedInterface_tsickle_Closure_declarations() {
    /** @type {?} */
    NzAnimatedInterface.prototype.inkBar;
    /** @type {?} */
    NzAnimatedInterface.prototype.tabPane;
}
export class NzTabChangeEvent {
}
function NzTabChangeEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTabChangeEvent.prototype.index;
    /** @type {?} */
    NzTabChangeEvent.prototype.tab;
}
export class NzTabSetComponent {
    /**
     * @param {?} renderer
     * @param {?} nzUpdateHostClassService
     * @param {?} elementRef
     * @param {?} document
     */
    constructor(renderer, nzUpdateHostClassService, elementRef, document) {
        this.renderer = renderer;
        this.nzUpdateHostClassService = nzUpdateHostClassService;
        this.elementRef = elementRef;
        this.document = document;
        this._tabPosition = 'top';
        this._indexToSelect = 0;
        this._selectedIndex = null;
        this._type = 'line';
        this._size = 'default';
        this._animated = true;
        this.prefixCls = 'ant-tabs';
        this.tabPositionMode = 'horizontal';
        this.inkBarAnimated = true;
        this.tabPaneAnimated = true;
        this.isViewInit = false;
        this.listOfNzTabComponent = [];
        this.nzShowPagination = true;
        this.nzHideAll = false;
        this.nzOnNextClick = new EventEmitter();
        this.nzOnPrevClick = new EventEmitter();
        this.nzSelectChange = new EventEmitter(true);
        this.el = this.elementRef.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzAnimated(value) {
        this._animated = value;
        this.setClassMap();
        this.inkBarAnimated = (this.nzAnimated === true) || ((/** @type {?} */ (this.nzAnimated)).inkBar === true);
        this.tabPaneAnimated = (this.nzAnimated === true) || ((/** @type {?} */ (this.nzAnimated)).tabPane === true);
    }
    /**
     * @return {?}
     */
    get nzAnimated() {
        return this._animated;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSelectedIndex(value) {
        this._indexToSelect = toNumber(value, null);
    }
    /**
     * @return {?}
     */
    get nzSelectedIndex() {
        return this._selectedIndex;
    }
    /**
     * @return {?}
     */
    get nzSelectedIndexChange() {
        return this.nzSelectChange.pipe(map(event => event.index));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSize(value) {
        this._size = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzSize() {
        return this._size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzTabPosition(value) {
        if (this._tabPosition === value) {
            return;
        }
        this._tabPosition = value;
        if ((this._tabPosition === 'top') || (this._tabPosition === 'bottom')) {
            this.tabPositionMode = 'horizontal';
        }
        else {
            this.tabPositionMode = 'vertical';
        }
        this.setPosition(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzTabPosition() {
        return this._tabPosition;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzType(value) {
        if (this._type === value) {
            return;
        }
        this._type = value;
        if (this._type === 'card') {
            this.nzAnimated = false;
        }
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzType() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setPosition(value) {
        if (this.isViewInit) {
            if (value === 'bottom') {
                this.renderer.insertBefore(this.el, this.tabContent.nativeElement, this.nzTabsNavComponent.elementRef.nativeElement);
            }
            else {
                this.renderer.insertBefore(this.el, this.nzTabsNavComponent.elementRef.nativeElement, this.tabContent.nativeElement);
            }
        }
    }
    /**
     * @return {?}
     */
    setClassMap() {
        /** @type {?} */
        const classMap = {
            [this.prefixCls]: true,
            [`${this.prefixCls}-vertical`]: (this.nzTabPosition === 'left') || (this.nzTabPosition === 'right'),
            [`${this.prefixCls}-${this.nzTabPosition}`]: this.nzTabPosition,
            [`${this.prefixCls}-no-animation`]: (this.nzAnimated === false) || ((/** @type {?} */ (this.nzAnimated)).tabPane === false),
            [`${this.prefixCls}-${this.nzType}`]: this.nzType,
            [`${this.prefixCls}-large`]: this.nzSize === 'large',
            [`${this.prefixCls}-small`]: this.nzSize === 'small'
        };
        this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
    }
    /**
     * @param {?} index
     * @param {?} disabled
     * @return {?}
     */
    clickLabel(index, disabled) {
        if (!disabled) {
            this.nzSelectedIndex = index;
            this.listOfNzTabComponent[index].nzClick.emit();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        /** @type {?} */
        const indexToSelect = this._indexToSelect =
            Math.min(this.listOfNzTabComponent.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect && isNotNil(this._selectedIndex)) {
            this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.listOfNzTabComponent.forEach((tab, index) => {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (isNotNil(this._selectedIndex) && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - this._selectedIndex;
            }
        });
        this._selectedIndex = indexToSelect;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    createChangeEvent(index) {
        /** @type {?} */
        const event = new NzTabChangeEvent();
        event.index = index;
        if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
            event.tab = this.listOfNzTabComponent[index];
            this.listOfNzTabComponent.forEach((item, i) => {
                if (i !== index) {
                    item.nzDeselect.emit();
                }
            });
            event.tab.nzSelect.emit();
        }
        return event;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    addTab(value) {
        this.listOfNzTabComponent.push(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    removeTab(value) {
        this.listOfNzTabComponent.splice(this.listOfNzTabComponent.indexOf(value), 1);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onScroll($event) {
        /** @type {?} */
        const target = /** @type {?} */ ($event.target);
        if (target.scrollLeft > 0) {
            target.scrollLeft = 0;
            if (this.document && this.document.activeElement) {
                (/** @type {?} */ (this.document.activeElement)).blur();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.isViewInit = true;
        this.setPosition(this.nzTabPosition);
    }
}
NzTabSetComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-tabset',
                preserveWhitespaces: false,
                providers: [NzUpdateHostClassService],
                template: "<div nz-tabs-nav\n  role=\"tablist\"\n  tabindex=\"0\"\n  [nzType]=\"nzType\"\n  [nzShowPagination]=\"nzShowPagination\"\n  [nzPositionMode]=\"tabPositionMode\"\n  [nzAnimated]=\"inkBarAnimated\"\n  [ngStyle]=\"nzTabBarStyle\"\n  [nzHideBar]=\"nzHideAll\"\n  [nzTabBarExtraContent]=\"nzTabBarExtraContent\"\n  [selectedIndex]=\"nzSelectedIndex\"\n  (nzOnNextClick)=\"nzOnNextClick.emit()\"\n  (nzOnPrevClick)=\"nzOnPrevClick.emit()\">\n  <div\n    nz-tab-label\n    role=\"tab\"\n    [style.margin-right.px]=\"nzTabBarGutter\"\n    [class.ant-tabs-tab-active]=\"(nzSelectedIndex == i) && !nzHideAll\"\n    [disabled]=\"tab.nzDisabled\"\n    (click)=\"clickLabel(i,tab.nzDisabled)\"\n    *ngFor=\"let tab of listOfNzTabComponent; let i = index\">\n    <ng-container *ngIf=\"tab.isTitleString; else titleTemplate\">{{ tab.nzTitle }}</ng-container>\n    <ng-template #titleTemplate>\n      <ng-template [ngTemplateOutlet]=\"tab.nzTitle\"></ng-template>\n    </ng-template>\n  </div>\n</div>\n<div\n  class=\"ant-tabs-content\"\n  #tabContent\n  [class.ant-tabs-content-animated]=\"tabPaneAnimated\"\n  [class.ant-tabs-content-no-animated]=\"!tabPaneAnimated\"\n  [style.margin-left.%]=\"tabPaneAnimated&&(-nzSelectedIndex*100)\">\n  <div nz-tab-body\n    class=\"ant-tabs-tabpane\"\n    [class.ant-tabs-tabpane-active]=\"(nzSelectedIndex == i) && !nzHideAll\"\n    [class.ant-tabs-tabpane-inactive]=\"(nzSelectedIndex != i) || nzHideAll\"\n    [content]=\"tab.content\"\n    *ngFor=\"let tab of listOfNzTabComponent; let i = index\">\n  </div>\n</div>",
                host: {
                    '(scroll)': 'onScroll($event)'
                },
                styles: [`
    :host {
      display: block;
    }
  `]
            }] }
];
/** @nocollapse */
NzTabSetComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: NzUpdateHostClassService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
NzTabSetComponent.propDecorators = {
    nzTabBarExtraContent: [{ type: Input }],
    nzTabsNavComponent: [{ type: ViewChild, args: [NzTabsNavComponent,] }],
    tabContent: [{ type: ViewChild, args: ['tabContent',] }],
    nzShowPagination: [{ type: Input }],
    nzHideAll: [{ type: Input }],
    nzTabBarGutter: [{ type: Input }],
    nzTabBarStyle: [{ type: Input }],
    nzOnNextClick: [{ type: Output }],
    nzOnPrevClick: [{ type: Output }],
    nzAnimated: [{ type: Input }],
    nzSelectedIndex: [{ type: Input }],
    nzSelectedIndexChange: [{ type: Output }],
    nzSelectChange: [{ type: Output }],
    nzSize: [{ type: Input }],
    nzTabPosition: [{ type: Input }],
    nzType: [{ type: Input }]
};
function NzTabSetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTabSetComponent.prototype._tabPosition;
    /** @type {?} */
    NzTabSetComponent.prototype._indexToSelect;
    /** @type {?} */
    NzTabSetComponent.prototype._selectedIndex;
    /** @type {?} */
    NzTabSetComponent.prototype._type;
    /** @type {?} */
    NzTabSetComponent.prototype._size;
    /** @type {?} */
    NzTabSetComponent.prototype._animated;
    /** @type {?} */
    NzTabSetComponent.prototype.el;
    /** @type {?} */
    NzTabSetComponent.prototype.prefixCls;
    /** @type {?} */
    NzTabSetComponent.prototype.tabPositionMode;
    /** @type {?} */
    NzTabSetComponent.prototype.inkBarAnimated;
    /** @type {?} */
    NzTabSetComponent.prototype.tabPaneAnimated;
    /** @type {?} */
    NzTabSetComponent.prototype.isViewInit;
    /** @type {?} */
    NzTabSetComponent.prototype.listOfNzTabComponent;
    /** @type {?} */
    NzTabSetComponent.prototype.nzTabBarExtraContent;
    /** @type {?} */
    NzTabSetComponent.prototype.nzTabsNavComponent;
    /** @type {?} */
    NzTabSetComponent.prototype.tabContent;
    /** @type {?} */
    NzTabSetComponent.prototype.nzShowPagination;
    /** @type {?} */
    NzTabSetComponent.prototype.nzHideAll;
    /** @type {?} */
    NzTabSetComponent.prototype.nzTabBarGutter;
    /** @type {?} */
    NzTabSetComponent.prototype.nzTabBarStyle;
    /** @type {?} */
    NzTabSetComponent.prototype.nzOnNextClick;
    /** @type {?} */
    NzTabSetComponent.prototype.nzOnPrevClick;
    /** @type {?} */
    NzTabSetComponent.prototype.nzSelectChange;
    /** @type {?} */
    NzTabSetComponent.prototype.renderer;
    /** @type {?} */
    NzTabSetComponent.prototype.nzUpdateHostClassService;
    /** @type {?} */
    NzTabSetComponent.prototype.elementRef;
    /** @type {?} */
    NzTabSetComponent.prototype.document;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0YWJzL256LXRhYnNldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUdMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7OztBQU83RCxNQUFNO0NBR0w7Ozs7Ozs7QUFvQkQsTUFBTTs7Ozs7OztJQWdNSixZQUFvQixRQUFtQixFQUFVLHdCQUFrRCxFQUFVLFVBQXNCLEVBQXdDLFFBQWE7UUFBcEssYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQXdDLGFBQVEsR0FBUixRQUFRLENBQUs7NEJBL0xsSixLQUFLOzhCQUNILENBQUM7OEJBQ0QsSUFBSTtxQkFDakIsTUFBTTtxQkFDakIsU0FBUzt5QkFDMEIsSUFBSTt5QkFFM0MsVUFBVTsrQkFDZSxZQUFZOzhCQUNoQyxJQUFJOytC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bS9hbmd1bGFyL21hdGVyaWFsMiAqL1xuXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE56VXBkYXRlSG9zdENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdXBkYXRlLWhvc3QtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL2NvcmUvdXRpbC9jaGVjayc7XG5pbXBvcnQgeyB0b051bWJlciB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcblxuaW1wb3J0IHsgTnpUYWJDb21wb25lbnQgfSBmcm9tICcuL256LXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUYWJzTmF2Q29tcG9uZW50IH0gZnJvbSAnLi9uei10YWJzLW5hdi5jb21wb25lbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE56QW5pbWF0ZWRJbnRlcmZhY2Uge1xuICBpbmtCYXI6IGJvb2xlYW47XG4gIHRhYlBhbmU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBOelRhYkNoYW5nZUV2ZW50IHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgdGFiOiBOelRhYkNvbXBvbmVudDtcbn1cblxuZXhwb3J0IHR5cGUgTnpUYWJQb3NpdGlvbiA9ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnO1xuZXhwb3J0IHR5cGUgTnpUYWJQb3NpdGlvbk1vZGUgPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuZXhwb3J0IHR5cGUgTnpUYWJUeXBlID0gJ2xpbmUnIHwgJ2NhcmQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXRhYnNldCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBwcm92aWRlcnMgICAgICAgICAgOiBbIE56VXBkYXRlSG9zdENsYXNzU2VydmljZSBdLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei10YWJzZXQuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0ICAgICAgICAgICAgICAgOiB7XG4gICAgJyhzY3JvbGwpJzogJ29uU2Nyb2xsKCRldmVudCknXG4gIH0sXG4gIHN0eWxlcyAgICAgICAgICAgICA6IFsgYFxuICAgIDpob3N0IHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIE56VGFiU2V0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfdGFiUG9zaXRpb246IE56VGFiUG9zaXRpb24gPSAndG9wJztcbiAgcHJpdmF0ZSBfaW5kZXhUb1NlbGVjdDogbnVtYmVyIHwgbnVsbCA9IDA7XG4gIHByaXZhdGUgX3NlbGVjdGVkSW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF90eXBlOiBOelRhYlR5cGUgPSAnbGluZSc7XG4gIHByaXZhdGUgX3NpemUgPSAnZGVmYXVsdCc7XG4gIHByaXZhdGUgX2FuaW1hdGVkOiBOekFuaW1hdGVkSW50ZXJmYWNlIHwgYm9vbGVhbiA9IHRydWU7XG4gIGVsOiBIVE1MRWxlbWVudDtcbiAgcHJlZml4Q2xzID0gJ2FudC10YWJzJztcbiAgdGFiUG9zaXRpb25Nb2RlOiBOelRhYlBvc2l0aW9uTW9kZSA9ICdob3Jpem9udGFsJztcbiAgaW5rQmFyQW5pbWF0ZWQgPSB0cnVlO1xuICB0YWJQYW5lQW5pbWF0ZWQgPSB0cnVlO1xuICBpc1ZpZXdJbml0ID0gZmFsc2U7XG4gIGxpc3RPZk56VGFiQ29tcG9uZW50OiBOelRhYkNvbXBvbmVudFtdID0gW107XG4gIEBJbnB1dCgpIG56VGFiQmFyRXh0cmFDb250ZW50OiBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgQFZpZXdDaGlsZChOelRhYnNOYXZDb21wb25lbnQpIG56VGFic05hdkNvbXBvbmVudDogTnpUYWJzTmF2Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCd0YWJDb250ZW50JykgdGFiQ29udGVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgbnpTaG93UGFnaW5hdGlvbiA9IHRydWU7XG4gIEBJbnB1dCgpIG56SGlkZUFsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBuelRhYkJhckd1dHRlcjogbnVtYmVyO1xuICBASW5wdXQoKSBuelRhYkJhclN0eWxlOiB7IFsga2V5OiBzdHJpbmcgXTogc3RyaW5nIH07XG4gIEBPdXRwdXQoKSBuek9uTmV4dENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbnpPblByZXZDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpBbmltYXRlZCh2YWx1ZTogTnpBbmltYXRlZEludGVyZmFjZSB8IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbmltYXRlZCA9IHZhbHVlO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgICB0aGlzLmlua0JhckFuaW1hdGVkID0gKHRoaXMubnpBbmltYXRlZCA9PT0gdHJ1ZSkgfHwgKCh0aGlzLm56QW5pbWF0ZWQgYXMgTnpBbmltYXRlZEludGVyZmFjZSkuaW5rQmFyID09PSB0cnVlKTtcbiAgICB0aGlzLnRhYlBhbmVBbmltYXRlZCA9ICh0aGlzLm56QW5pbWF0ZWQgPT09IHRydWUpIHx8ICgodGhpcy5uekFuaW1hdGVkIGFzIE56QW5pbWF0ZWRJbnRlcmZhY2UpLnRhYlBhbmUgPT09IHRydWUpO1xuICB9XG5cbiAgZ2V0IG56QW5pbWF0ZWQoKTogTnpBbmltYXRlZEludGVyZmFjZSB8IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRlZDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNlbGVjdGVkSW5kZXgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9pbmRleFRvU2VsZWN0ID0gdG9OdW1iZXIodmFsdWUsIG51bGwpO1xuICB9XG5cbiAgZ2V0IG56U2VsZWN0ZWRJbmRleCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBnZXQgbnpTZWxlY3RlZEluZGV4Q2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMubnpTZWxlY3RDaGFuZ2UucGlwZShtYXAoZXZlbnQgPT4gZXZlbnQuaW5kZXgpKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBuelNlbGVjdENoYW5nZTogRXZlbnRFbWl0dGVyPE56VGFiQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxOelRhYkNoYW5nZUV2ZW50Pih0cnVlKTtcblxuICBASW5wdXQoKSBzZXQgbnpTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56U2l6ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VGFiUG9zaXRpb24odmFsdWU6IE56VGFiUG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy5fdGFiUG9zaXRpb24gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3RhYlBvc2l0aW9uID0gdmFsdWU7XG4gICAgaWYgKCh0aGlzLl90YWJQb3NpdGlvbiA9PT0gJ3RvcCcpIHx8ICh0aGlzLl90YWJQb3NpdGlvbiA9PT0gJ2JvdHRvbScpKSB7XG4gICAgICB0aGlzLnRhYlBvc2l0aW9uTW9kZSA9ICdob3Jpem9udGFsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YWJQb3NpdGlvbk1vZGUgPSAndmVydGljYWwnO1xuICAgIH1cbiAgICB0aGlzLnNldFBvc2l0aW9uKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpUYWJQb3NpdGlvbigpOiBOelRhYlBvc2l0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fdGFiUG9zaXRpb247XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUeXBlKHZhbHVlOiBOelRhYlR5cGUpIHtcbiAgICBpZiAodGhpcy5fdHlwZSA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdHlwZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLl90eXBlID09PSAnY2FyZCcpIHtcbiAgICAgIHRoaXMubnpBbmltYXRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpUeXBlKCk6IE56VGFiVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZTogTnpUYWJQb3NpdGlvbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzVmlld0luaXQpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5pbnNlcnRCZWZvcmUodGhpcy5lbCwgdGhpcy50YWJDb250ZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMubnpUYWJzTmF2Q29tcG9uZW50LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLmVsLCB0aGlzLm56VGFic05hdkNvbXBvbmVudC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMudGFiQ29udGVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIHNldENsYXNzTWFwKCk6IHZvaWQge1xuICAgIGNvbnN0IGNsYXNzTWFwID0ge1xuICAgICAgWyB0aGlzLnByZWZpeENscyBdICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tdmVydGljYWxgIF0gICAgICAgICAgICAgOiAodGhpcy5uelRhYlBvc2l0aW9uID09PSAnbGVmdCcpIHx8ICh0aGlzLm56VGFiUG9zaXRpb24gPT09ICdyaWdodCcpLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tJHt0aGlzLm56VGFiUG9zaXRpb259YCBdOiB0aGlzLm56VGFiUG9zaXRpb24sXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1uby1hbmltYXRpb25gIF0gICAgICAgICA6ICh0aGlzLm56QW5pbWF0ZWQgPT09IGZhbHNlKSB8fCAoKHRoaXMubnpBbmltYXRlZCBhcyBOekFuaW1hdGVkSW50ZXJmYWNlKS50YWJQYW5lID09PSBmYWxzZSksXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpUeXBlfWAgXSAgICAgICA6IHRoaXMubnpUeXBlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tbGFyZ2VgIF0gICAgICAgICAgICAgICAgOiB0aGlzLm56U2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LXNtYWxsYCBdICAgICAgICAgICAgICAgIDogdGhpcy5uelNpemUgPT09ICdzbWFsbCdcbiAgICB9O1xuICAgIHRoaXMubnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlLnVwZGF0ZUhvc3RDbGFzcyh0aGlzLmVsLCBjbGFzc01hcCk7XG4gIH1cblxuICBjbGlja0xhYmVsKGluZGV4OiBudW1iZXIsIGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgdGhpcy5uelNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnRbIGluZGV4IF0ubnpDbGljay5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgIC8vIENsYW1wIHRoZSBuZXh0IHNlbGVjdGVkIGluZGV4IHRvIHRoZSBib3VuZHMgb2YgMCBhbmQgdGhlIHRhYnMgbGVuZ3RoLiBOb3RlIHRoZSBgfHwgMGAsIHdoaWNoXG4gICAgLy8gZW5zdXJlcyB0aGF0IHZhbHVlcyBsaWtlIE5hTiBjYW4ndCBnZXQgdGhyb3VnaCBhbmQgd2hpY2ggd291bGQgb3RoZXJ3aXNlIHRocm93IHRoZVxuICAgIC8vIGNvbXBvbmVudCBpbnRvIGFuIGluZmluaXRlIGxvb3AgKHNpbmNlIE1hdGgubWF4KE5hTiwgMCkgPT09IE5hTikuXG4gICAgY29uc3QgaW5kZXhUb1NlbGVjdCA9IHRoaXMuX2luZGV4VG9TZWxlY3QgPVxuICAgICAgTWF0aC5taW4odGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudC5sZW5ndGggLSAxLCBNYXRoLm1heCh0aGlzLl9pbmRleFRvU2VsZWN0IHx8IDAsIDApKTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhbmdlIGluIHNlbGVjdGVkIGluZGV4LCBlbWl0IGEgY2hhbmdlIGV2ZW50LiBTaG91bGQgbm90IHRyaWdnZXIgaWZcbiAgICAvLyB0aGUgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCB5ZXQgYmVlbiBpbml0aWFsaXplZC5cbiAgICBpZiAodGhpcy5fc2VsZWN0ZWRJbmRleCAhPT0gaW5kZXhUb1NlbGVjdCAmJiBpc05vdE5pbCh0aGlzLl9zZWxlY3RlZEluZGV4KSkge1xuICAgICAgdGhpcy5uelNlbGVjdENoYW5nZS5lbWl0KHRoaXMuY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXhUb1NlbGVjdCkpO1xuICAgIH1cblxuICAgIC8vIFNldHVwIHRoZSBwb3NpdGlvbiBmb3IgZWFjaCB0YWIgYW5kIG9wdGlvbmFsbHkgc2V0dXAgYW4gb3JpZ2luIG9uIHRoZSBuZXh0IHNlbGVjdGVkIHRhYi5cbiAgICB0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50LmZvckVhY2goKHRhYjogTnpUYWJDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIHRhYi5wb3NpdGlvbiA9IGluZGV4IC0gaW5kZXhUb1NlbGVjdDtcbiAgICAgIC8vIElmIHRoZXJlIGlzIGFscmVhZHkgYSBzZWxlY3RlZCB0YWIsIHRoZW4gc2V0IHVwIGFuIG9yaWdpbiBmb3IgdGhlIG5leHQgc2VsZWN0ZWQgdGFiXG4gICAgICAvLyBpZiBpdCBkb2Vzbid0IGhhdmUgb25lIGFscmVhZHkuXG4gICAgICBpZiAoaXNOb3ROaWwodGhpcy5fc2VsZWN0ZWRJbmRleCkgJiYgdGFiLnBvc2l0aW9uID09PSAwICYmICF0YWIub3JpZ2luKSB7XG4gICAgICAgIHRhYi5vcmlnaW4gPSBpbmRleFRvU2VsZWN0IC0gdGhpcy5fc2VsZWN0ZWRJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLl9zZWxlY3RlZEluZGV4ID0gaW5kZXhUb1NlbGVjdDtcbiAgfVxuXG4gIGNyZWF0ZUNoYW5nZUV2ZW50KGluZGV4OiBudW1iZXIpOiBOelRhYkNoYW5nZUV2ZW50IHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBOelRhYkNoYW5nZUV2ZW50KCk7XG4gICAgZXZlbnQuaW5kZXggPSBpbmRleDtcbiAgICBpZiAodGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudCAmJiB0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50Lmxlbmd0aCkge1xuICAgICAgZXZlbnQudGFiID0gdGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudFsgaW5kZXggXTtcbiAgICAgIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICBpZiAoaSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICBpdGVtLm56RGVzZWxlY3QuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGV2ZW50LnRhYi5uelNlbGVjdC5lbWl0KCk7XG4gICAgfVxuICAgIHJldHVybiBldmVudDtcbiAgfVxuXG4gIGFkZFRhYih2YWx1ZTogTnpUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50LnB1c2godmFsdWUpO1xuICB9XG5cbiAgcmVtb3ZlVGFiKHZhbHVlOiBOelRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQuc3BsaWNlKHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQuaW5kZXhPZih2YWx1ZSksIDEpO1xuICB9XG5cbiAgLy8gRnJvbSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3QtY29tcG9uZW50L3RhYnMvYmxvYi9tYXN0ZXIvc3JjL1RhYnMuanNcbiAgLy8gUHJldmVudCBmb2N1cyB0byBtYWtlIHRoZSBUYWJzIHNjcm9sbCBvZmZzZXRcbiAgb25TY3JvbGwoJGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldDogRWxlbWVudCA9ICRldmVudC50YXJnZXQgYXMgRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnNjcm9sbExlZnQgPiAwKSB7XG4gICAgICB0YXJnZXQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudCAmJiB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuYmx1cigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIG56VXBkYXRlSG9zdENsYXNzU2VydmljZTogTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzVmlld0luaXQgPSB0cnVlO1xuICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5uelRhYlBvc2l0aW9uKTtcbiAgfVxuXG59XG4iXX0=