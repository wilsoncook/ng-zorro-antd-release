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
var NzTabChangeEvent = /** @class */ (function () {
    function NzTabChangeEvent() {
    }
    return NzTabChangeEvent;
}());
export { NzTabChangeEvent };
function NzTabChangeEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzTabChangeEvent.prototype.index;
    /** @type {?} */
    NzTabChangeEvent.prototype.tab;
}
var NzTabSetComponent = /** @class */ (function () {
    // tslint:disable-next-line:no-any
    function NzTabSetComponent(renderer, nzUpdateHostClassService, elementRef, document) {
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
    Object.defineProperty(NzTabSetComponent.prototype, "nzAnimated", {
        get: /**
         * @return {?}
         */
        function () {
            return this._animated;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._animated = value;
            this.setClassMap();
            this.inkBarAnimated = (this.nzAnimated === true) || ((/** @type {?} */ (this.nzAnimated)).inkBar === true);
            this.tabPaneAnimated = (this.nzAnimated === true) || ((/** @type {?} */ (this.nzAnimated)).tabPane === true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTabSetComponent.prototype, "nzSelectedIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selectedIndex;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._indexToSelect = toNumber(value, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTabSetComponent.prototype, "nzSelectedIndexChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzSelectChange.pipe(map(function (event) { return event.index; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTabSetComponent.prototype, "nzSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._size = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTabSetComponent.prototype, "nzTabPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tabPosition;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzTabSetComponent.prototype, "nzType", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._type === value) {
                return;
            }
            this._type = value;
            if (this._type === 'card') {
                this.nzAnimated = false;
            }
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NzTabSetComponent.prototype.setPosition = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isViewInit) {
            if (value === 'bottom') {
                this.renderer.insertBefore(this.el, this.tabContent.nativeElement, this.nzTabsNavComponent.elementRef.nativeElement);
            }
            else {
                this.renderer.insertBefore(this.el, this.nzTabsNavComponent.elementRef.nativeElement, this.tabContent.nativeElement);
            }
        }
    };
    /**
     * @return {?}
     */
    NzTabSetComponent.prototype.setClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this.prefixCls + "-vertical"] = (this.nzTabPosition === 'left') || (this.nzTabPosition === 'right'),
            _a[this.prefixCls + "-" + this.nzTabPosition] = this.nzTabPosition,
            _a[this.prefixCls + "-no-animation"] = (this.nzAnimated === false) || ((/** @type {?} */ (this.nzAnimated)).tabPane === false),
            _a[this.prefixCls + "-" + this.nzType] = this.nzType,
            _a[this.prefixCls + "-large"] = this.nzSize === 'large',
            _a[this.prefixCls + "-small"] = this.nzSize === 'small',
            _a);
        this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
    };
    /**
     * @param {?} index
     * @param {?} disabled
     * @return {?}
     */
    NzTabSetComponent.prototype.clickLabel = /**
     * @param {?} index
     * @param {?} disabled
     * @return {?}
     */
    function (index, disabled) {
        if (!disabled) {
            this.nzSelectedIndex = index;
            this.listOfNzTabComponent[index].nzClick.emit();
        }
    };
    /**
     * @return {?}
     */
    NzTabSetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setClassMap();
    };
    /**
     * @return {?}
     */
    NzTabSetComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var indexToSelect = this._indexToSelect =
            Math.min(this.listOfNzTabComponent.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect && isNotNil(this._selectedIndex)) {
            this.nzSelectChange.emit(this.createChangeEvent(indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this.listOfNzTabComponent.forEach(function (tab, index) {
            tab.position = index - indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (isNotNil(_this._selectedIndex) && tab.position === 0 && !tab.origin) {
                tab.origin = indexToSelect - _this._selectedIndex;
            }
        });
        this._selectedIndex = indexToSelect;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzTabSetComponent.prototype.createChangeEvent = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var event = new NzTabChangeEvent();
        event.index = index;
        if (this.listOfNzTabComponent && this.listOfNzTabComponent.length) {
            event.tab = this.listOfNzTabComponent[index];
            this.listOfNzTabComponent.forEach(function (item, i) {
                if (i !== index) {
                    item.nzDeselect.emit();
                }
            });
            event.tab.nzSelect.emit();
        }
        return event;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzTabSetComponent.prototype.addTab = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.listOfNzTabComponent.push(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzTabSetComponent.prototype.removeTab = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.listOfNzTabComponent.splice(this.listOfNzTabComponent.indexOf(value), 1);
    };
    // From https://github.com/react-component/tabs/blob/master/src/Tabs.js
    // Prevent focus to make the Tabs scroll offset
    /**
     * @param {?} $event
     * @return {?}
     */
    NzTabSetComponent.prototype.onScroll = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var target = /** @type {?} */ ($event.target);
        if (target.scrollLeft > 0) {
            target.scrollLeft = 0;
            if (this.document && this.document.activeElement) {
                (/** @type {?} */ (this.document.activeElement)).blur();
            }
        }
    };
    /**
     * @return {?}
     */
    NzTabSetComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.isViewInit = true;
        this.setPosition(this.nzTabPosition);
    };
    NzTabSetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-tabset',
                    preserveWhitespaces: false,
                    providers: [NzUpdateHostClassService],
                    template: "<div nz-tabs-nav\n  role=\"tablist\"\n  tabindex=\"0\"\n  [nzType]=\"nzType\"\n  [nzShowPagination]=\"nzShowPagination\"\n  [nzPositionMode]=\"tabPositionMode\"\n  [nzAnimated]=\"inkBarAnimated\"\n  [ngStyle]=\"nzTabBarStyle\"\n  [nzHideBar]=\"nzHideAll\"\n  [nzTabBarExtraContent]=\"nzTabBarExtraContent\"\n  [selectedIndex]=\"nzSelectedIndex\"\n  (nzOnNextClick)=\"nzOnNextClick.emit()\"\n  (nzOnPrevClick)=\"nzOnPrevClick.emit()\">\n  <div\n    nz-tab-label\n    role=\"tab\"\n    [style.margin-right.px]=\"nzTabBarGutter\"\n    [class.ant-tabs-tab-active]=\"(nzSelectedIndex == i) && !nzHideAll\"\n    [disabled]=\"tab.nzDisabled\"\n    (click)=\"clickLabel(i,tab.nzDisabled)\"\n    *ngFor=\"let tab of listOfNzTabComponent; let i = index\">\n    <ng-container *ngIf=\"tab.isTitleString; else titleTemplate\">{{ tab.nzTitle }}</ng-container>\n    <ng-template #titleTemplate>\n      <ng-template [ngTemplateOutlet]=\"tab.nzTitle\"></ng-template>\n    </ng-template>\n  </div>\n</div>\n<div\n  class=\"ant-tabs-content\"\n  #tabContent\n  [class.ant-tabs-content-animated]=\"tabPaneAnimated\"\n  [class.ant-tabs-content-no-animated]=\"!tabPaneAnimated\"\n  [style.margin-left.%]=\"tabPaneAnimated&&(-nzSelectedIndex*100)\">\n  <div nz-tab-body\n    class=\"ant-tabs-tabpane\"\n    [class.ant-tabs-tabpane-active]=\"(nzSelectedIndex == i) && !nzHideAll\"\n    [class.ant-tabs-tabpane-inactive]=\"(nzSelectedIndex != i) || nzHideAll\"\n    [content]=\"tab.content\"\n    *ngFor=\"let tab of listOfNzTabComponent; let i = index\">\n  </div>\n</div>",
                    host: {
                        '(scroll)': 'onScroll($event)'
                    },
                    styles: ["\n    :host {\n      display: block;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    NzTabSetComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: NzUpdateHostClassService },
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
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
    return NzTabSetComponent;
}());
export { NzTabSetComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJ0YWJzL256LXRhYnNldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUdMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUN0RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBR2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7OztBQU83RCxJQUFBOzs7MkJBakNBO0lBb0NDLENBQUE7QUFIRCw0QkFHQzs7Ozs7Ozs7SUFtTkMsa0NBQWtDO0lBQ2xDLDJCQUFvQixRQUFtQixFQUFVLHdCQUFrRCxFQUFVLFVBQXNCLEVBQXdDLFFBQWE7UUFBcEssYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQXdDLGFBQVEsR0FBUixRQUFRLENBQUs7NEJBL0xsSixLQUFLOzhCQUNILENBQUM7OEJBQ0QsSUFBSTtxQkFDakIsTUFBTTtxQkFDakIsU0FBUzt5QkFDMEIsSUFBSTt5QkFFM0MsVUFBVTsr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O2lDQUtOLE1BQU07eUJBRU4sS0FBSztnQ0FTTCxLQUFLO3lCQW1CTCxLQUFLOzs0QkF4SVI7O1NBd0RhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBnZXQgc29tZSBjb2RlIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyICovXG5cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudENoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlIH0gZnJvbSAnLi4vY29yZS9zZXJ2aWNlcy91cGRhdGUtaG9zdC1jbGFzcy5zZXJ2aWNlJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi4vY29yZS91dGlsL2NoZWNrJztcbmltcG9ydCB7IHRvTnVtYmVyIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuXG5pbXBvcnQgeyBOelRhYkNvbXBvbmVudCB9IGZyb20gJy4vbnotdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYnNOYXZDb21wb25lbnQgfSBmcm9tICcuL256LXRhYnMtbmF2LmNvbXBvbmVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTnpBbmltYXRlZEludGVyZmFjZSB7XG4gIGlua0JhcjogYm9vbGVhbjtcbiAgdGFiUGFuZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIE56VGFiQ2hhbmdlRXZlbnQge1xuICBpbmRleDogbnVtYmVyO1xuICB0YWI6IE56VGFiQ29tcG9uZW50O1xufVxuXG5leHBvcnQgdHlwZSBOelRhYlBvc2l0aW9uID0gJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XG5leHBvcnQgdHlwZSBOelRhYlBvc2l0aW9uTW9kZSA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5leHBvcnQgdHlwZSBOelRhYlR5cGUgPSAnbGluZScgfCAnY2FyZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotdGFic2V0JyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFsgTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlIF0sXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXRhYnNldC5jb21wb25lbnQuaHRtbCcsXG4gIGhvc3QgICAgICAgICAgICAgICA6IHtcbiAgICAnKHNjcm9sbCknOiAnb25TY3JvbGwoJGV2ZW50KSdcbiAgfSxcbiAgc3R5bGVzICAgICAgICAgICAgIDogWyBgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICBgIF1cbn0pXG5leHBvcnQgY2xhc3MgTnpUYWJTZXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRDaGVja2VkLCBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF90YWJQb3NpdGlvbjogTnpUYWJQb3NpdGlvbiA9ICd0b3AnO1xuICBwcml2YXRlIF9pbmRleFRvU2VsZWN0OiBudW1iZXIgfCBudWxsID0gMDtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWRJbmRleDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3R5cGU6IE56VGFiVHlwZSA9ICdsaW5lJztcbiAgcHJpdmF0ZSBfc2l6ZSA9ICdkZWZhdWx0JztcbiAgcHJpdmF0ZSBfYW5pbWF0ZWQ6IE56QW5pbWF0ZWRJbnRlcmZhY2UgfCBib29sZWFuID0gdHJ1ZTtcbiAgZWw6IEhUTUxFbGVtZW50O1xuICBwcmVmaXhDbHMgPSAnYW50LXRhYnMnO1xuICB0YWJQb3NpdGlvbk1vZGU6IE56VGFiUG9zaXRpb25Nb2RlID0gJ2hvcml6b250YWwnO1xuICBpbmtCYXJBbmltYXRlZCA9IHRydWU7XG4gIHRhYlBhbmVBbmltYXRlZCA9IHRydWU7XG4gIGlzVmlld0luaXQgPSBmYWxzZTtcbiAgbGlzdE9mTnpUYWJDb21wb25lbnQ6IE56VGFiQ29tcG9uZW50W10gPSBbXTtcbiAgQElucHV0KCkgbnpUYWJCYXJFeHRyYUNvbnRlbnQ6IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBAVmlld0NoaWxkKE56VGFic05hdkNvbXBvbmVudCkgbnpUYWJzTmF2Q29tcG9uZW50OiBOelRhYnNOYXZDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ3RhYkNvbnRlbnQnKSB0YWJDb250ZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBuelNob3dQYWdpbmF0aW9uID0gdHJ1ZTtcbiAgQElucHV0KCkgbnpIaWRlQWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIG56VGFiQmFyR3V0dGVyOiBudW1iZXI7XG4gIEBJbnB1dCgpIG56VGFiQmFyU3R5bGU6IHsgWyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfTtcbiAgQE91dHB1dCgpIG56T25OZXh0Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBuek9uUHJldkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuekFuaW1hdGVkKHZhbHVlOiBOekFuaW1hdGVkSW50ZXJmYWNlIHwgYm9vbGVhbikge1xuICAgIHRoaXMuX2FuaW1hdGVkID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIHRoaXMuaW5rQmFyQW5pbWF0ZWQgPSAodGhpcy5uekFuaW1hdGVkID09PSB0cnVlKSB8fCAoKHRoaXMubnpBbmltYXRlZCBhcyBOekFuaW1hdGVkSW50ZXJmYWNlKS5pbmtCYXIgPT09IHRydWUpO1xuICAgIHRoaXMudGFiUGFuZUFuaW1hdGVkID0gKHRoaXMubnpBbmltYXRlZCA9PT0gdHJ1ZSkgfHwgKCh0aGlzLm56QW5pbWF0ZWQgYXMgTnpBbmltYXRlZEludGVyZmFjZSkudGFiUGFuZSA9PT0gdHJ1ZSk7XG4gIH1cblxuICBnZXQgbnpBbmltYXRlZCgpOiBOekFuaW1hdGVkSW50ZXJmYWNlIHwgYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2FuaW1hdGVkO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U2VsZWN0ZWRJbmRleCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX2luZGV4VG9TZWxlY3QgPSB0b051bWJlcih2YWx1ZSwgbnVsbCk7XG4gIH1cblxuICBnZXQgbnpTZWxlY3RlZEluZGV4KCk6IG51bWJlciB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICB9XG5cbiAgQE91dHB1dCgpXG4gIGdldCBuelNlbGVjdGVkSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5uelNlbGVjdENoYW5nZS5waXBlKG1hcChldmVudCA9PiBldmVudC5pbmRleCkpO1xuICB9XG5cbiAgQE91dHB1dCgpIG56U2VsZWN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8TnpUYWJDaGFuZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPE56VGFiQ2hhbmdlRXZlbnQ+KHRydWUpO1xuXG4gIEBJbnB1dCgpIHNldCBuelNpemUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX3NpemUgPSB2YWx1ZTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUYWJQb3NpdGlvbih2YWx1ZTogTnpUYWJQb3NpdGlvbikge1xuICAgIGlmICh0aGlzLl90YWJQb3NpdGlvbiA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdGFiUG9zaXRpb24gPSB2YWx1ZTtcbiAgICBpZiAoKHRoaXMuX3RhYlBvc2l0aW9uID09PSAndG9wJykgfHwgKHRoaXMuX3RhYlBvc2l0aW9uID09PSAnYm90dG9tJykpIHtcbiAgICAgIHRoaXMudGFiUG9zaXRpb25Nb2RlID0gJ2hvcml6b250YWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhYlBvc2l0aW9uTW9kZSA9ICd2ZXJ0aWNhbCc7XG4gICAgfVxuICAgIHRoaXMuc2V0UG9zaXRpb24odmFsdWUpO1xuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgfVxuXG4gIGdldCBuelRhYlBvc2l0aW9uKCk6IE56VGFiUG9zaXRpb24ge1xuICAgIHJldHVybiB0aGlzLl90YWJQb3NpdGlvbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelR5cGUodmFsdWU6IE56VGFiVHlwZSkge1xuICAgIGlmICh0aGlzLl90eXBlID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuX3R5cGUgPT09ICdjYXJkJykge1xuICAgICAgdGhpcy5uekFuaW1hdGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuc2V0Q2xhc3NNYXAoKTtcbiAgfVxuXG4gIGdldCBuelR5cGUoKTogTnpUYWJUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlOiBOelRhYlBvc2l0aW9uKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNWaWV3SW5pdCkge1xuICAgICAgaWYgKHZhbHVlID09PSAnYm90dG9tJykge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmluc2VydEJlZm9yZSh0aGlzLmVsLCB0aGlzLnRhYkNvbnRlbnQubmF0aXZlRWxlbWVudCwgdGhpcy5uelRhYnNOYXZDb21wb25lbnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuaW5zZXJ0QmVmb3JlKHRoaXMuZWwsIHRoaXMubnpUYWJzTmF2Q29tcG9uZW50LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdGhpcy50YWJDb250ZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgY29uc3QgY2xhc3NNYXAgPSB7XG4gICAgICBbIHRoaXMucHJlZml4Q2xzIF0gICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS12ZXJ0aWNhbGAgXSAgICAgICAgICAgICA6ICh0aGlzLm56VGFiUG9zaXRpb24gPT09ICdsZWZ0JykgfHwgKHRoaXMubnpUYWJQb3NpdGlvbiA9PT0gJ3JpZ2h0JyksXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS0ke3RoaXMubnpUYWJQb3NpdGlvbn1gIF06IHRoaXMubnpUYWJQb3NpdGlvbixcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LW5vLWFuaW1hdGlvbmAgXSAgICAgICAgIDogKHRoaXMubnpBbmltYXRlZCA9PT0gZmFsc2UpIHx8ICgodGhpcy5uekFuaW1hdGVkIGFzIE56QW5pbWF0ZWRJbnRlcmZhY2UpLnRhYlBhbmUgPT09IGZhbHNlKSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LSR7dGhpcy5uelR5cGV9YCBdICAgICAgIDogdGhpcy5uelR5cGUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1sYXJnZWAgXSAgICAgICAgICAgICAgICA6IHRoaXMubnpTaXplID09PSAnbGFyZ2UnLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tc21hbGxgIF0gICAgICAgICAgICAgICAgOiB0aGlzLm56U2l6ZSA9PT0gJ3NtYWxsJ1xuICAgIH07XG4gICAgdGhpcy5uelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UudXBkYXRlSG9zdENsYXNzKHRoaXMuZWwsIGNsYXNzTWFwKTtcbiAgfVxuXG4gIGNsaWNrTGFiZWwoaW5kZXg6IG51bWJlciwgZGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB0aGlzLm56U2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudFsgaW5kZXggXS5uekNsaWNrLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgLy8gQ2xhbXAgdGhlIG5leHQgc2VsZWN0ZWQgaW5kZXggdG8gdGhlIGJvdW5kcyBvZiAwIGFuZCB0aGUgdGFicyBsZW5ndGguIE5vdGUgdGhlIGB8fCAwYCwgd2hpY2hcbiAgICAvLyBlbnN1cmVzIHRoYXQgdmFsdWVzIGxpa2UgTmFOIGNhbid0IGdldCB0aHJvdWdoIGFuZCB3aGljaCB3b3VsZCBvdGhlcndpc2UgdGhyb3cgdGhlXG4gICAgLy8gY29tcG9uZW50IGludG8gYW4gaW5maW5pdGUgbG9vcCAoc2luY2UgTWF0aC5tYXgoTmFOLCAwKSA9PT0gTmFOKS5cbiAgICBjb25zdCBpbmRleFRvU2VsZWN0ID0gdGhpcy5faW5kZXhUb1NlbGVjdCA9XG4gICAgICBNYXRoLm1pbih0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50Lmxlbmd0aCAtIDEsIE1hdGgubWF4KHRoaXMuX2luZGV4VG9TZWxlY3QgfHwgMCwgMCkpO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFuZ2UgaW4gc2VsZWN0ZWQgaW5kZXgsIGVtaXQgYSBjaGFuZ2UgZXZlbnQuIFNob3VsZCBub3QgdHJpZ2dlciBpZlxuICAgIC8vIHRoZSBzZWxlY3RlZCBpbmRleCBoYXMgbm90IHlldCBiZWVuIGluaXRpYWxpemVkLlxuICAgIGlmICh0aGlzLl9zZWxlY3RlZEluZGV4ICE9PSBpbmRleFRvU2VsZWN0ICYmIGlzTm90TmlsKHRoaXMuX3NlbGVjdGVkSW5kZXgpKSB7XG4gICAgICB0aGlzLm56U2VsZWN0Q2hhbmdlLmVtaXQodGhpcy5jcmVhdGVDaGFuZ2VFdmVudChpbmRleFRvU2VsZWN0KSk7XG4gICAgfVxuXG4gICAgLy8gU2V0dXAgdGhlIHBvc2l0aW9uIGZvciBlYWNoIHRhYiBhbmQgb3B0aW9uYWxseSBzZXR1cCBhbiBvcmlnaW4gb24gdGhlIG5leHQgc2VsZWN0ZWQgdGFiLlxuICAgIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQuZm9yRWFjaCgodGFiOiBOelRhYkNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgdGFiLnBvc2l0aW9uID0gaW5kZXggLSBpbmRleFRvU2VsZWN0O1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYWxyZWFkeSBhIHNlbGVjdGVkIHRhYiwgdGhlbiBzZXQgdXAgYW4gb3JpZ2luIGZvciB0aGUgbmV4dCBzZWxlY3RlZCB0YWJcbiAgICAgIC8vIGlmIGl0IGRvZXNuJ3QgaGF2ZSBvbmUgYWxyZWFkeS5cbiAgICAgIGlmIChpc05vdE5pbCh0aGlzLl9zZWxlY3RlZEluZGV4KSAmJiB0YWIucG9zaXRpb24gPT09IDAgJiYgIXRhYi5vcmlnaW4pIHtcbiAgICAgICAgdGFiLm9yaWdpbiA9IGluZGV4VG9TZWxlY3QgLSB0aGlzLl9zZWxlY3RlZEluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3NlbGVjdGVkSW5kZXggPSBpbmRleFRvU2VsZWN0O1xuICB9XG5cbiAgY3JlYXRlQ2hhbmdlRXZlbnQoaW5kZXg6IG51bWJlcik6IE56VGFiQ2hhbmdlRXZlbnQge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IE56VGFiQ2hhbmdlRXZlbnQoKTtcbiAgICBldmVudC5pbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50ICYmIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQubGVuZ3RoKSB7XG4gICAgICBldmVudC50YWIgPSB0aGlzLmxpc3RPZk56VGFiQ29tcG9uZW50WyBpbmRleCBdO1xuICAgICAgdGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmIChpICE9PSBpbmRleCkge1xuICAgICAgICAgIGl0ZW0ubnpEZXNlbGVjdC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZXZlbnQudGFiLm56U2VsZWN0LmVtaXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG5cbiAgYWRkVGFiKHZhbHVlOiBOelRhYkNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mTnpUYWJDb21wb25lbnQucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZW1vdmVUYWIodmFsdWU6IE56VGFiQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudC5zcGxpY2UodGhpcy5saXN0T2ZOelRhYkNvbXBvbmVudC5pbmRleE9mKHZhbHVlKSwgMSk7XG4gIH1cblxuICAvLyBGcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9yZWFjdC1jb21wb25lbnQvdGFicy9ibG9iL21hc3Rlci9zcmMvVGFicy5qc1xuICAvLyBQcmV2ZW50IGZvY3VzIHRvIG1ha2UgdGhlIFRhYnMgc2Nyb2xsIG9mZnNldFxuICBvblNjcm9sbCgkZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0OiBFbGVtZW50ID0gJGV2ZW50LnRhcmdldCBhcyBFbGVtZW50O1xuICAgIGlmICh0YXJnZXQuc2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgIHRhcmdldC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50ICYmIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAodGhpcy5kb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5ibHVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlOiBOelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNWaWV3SW5pdCA9IHRydWU7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLm56VGFiUG9zaXRpb24pO1xuICB9XG5cbn1cbiJdfQ==