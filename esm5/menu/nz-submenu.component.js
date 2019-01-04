/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Host, HostBinding, Input, Optional, Output, QueryList, SkipSelf, ViewChild } from '@angular/core';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { auditTime, map, takeUntil } from 'rxjs/operators';
import { POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzDropDownButtonComponent } from '../dropdown/nz-dropdown-button.component';
import { NzDropDownComponent } from '../dropdown/nz-dropdown.component';
import { NzMenuDirective } from './nz-menu.directive';
var NzSubMenuComponent = /** @class */ (function () {
    function NzSubMenuComponent(nzMenuDirective, cd, nzSubMenuComponent, nzDropDownComponent, nzDropDownButtonComponent) {
        var _this = this;
        this.nzMenuDirective = nzMenuDirective;
        this.cd = cd;
        this.nzSubMenuComponent = nzSubMenuComponent;
        this.nzDropDownComponent = nzDropDownComponent;
        this.nzDropDownButtonComponent = nzDropDownButtonComponent;
        this._open = false;
        this._disabled = false;
        this.$mouseSubject = new Subject();
        this.unsubscribe$ = new Subject();
        this.placement = 'rightTop';
        this.$subOpen = new BehaviorSubject(false);
        this.isInDropDown = false;
        this.isInSubMenu = false;
        this.level = 1;
        this.triggerWidth = null;
        this.nzOpenChange = new EventEmitter();
        this.handleOpenEvent = function (data) {
            if (_this.nzDisabled) {
                return;
            }
            if (_this.nzOpen !== data) {
                _this.nzOpen = data;
                _this.nzOpenChange.emit(_this.nzOpen);
            }
            if (_this.nzSubMenuComponent) {
                _this.nzSubMenuComponent.$subOpen.next(_this.nzOpen);
            }
            if (_this.nzDropDownComponent) {
                _this.nzDropDownComponent.$subOpen.next(_this.nzOpen);
            }
            if (_this.nzDropDownButtonComponent) {
                _this.nzDropDownButtonComponent.$subOpen.next(_this.nzOpen);
            }
        };
    }
    Object.defineProperty(NzSubMenuComponent.prototype, "nzOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._open;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._open = toBoolean(value);
            this.setTriggerWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "nzDisabled", {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "subItemSelected", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return !!this.nzMenuDirective.menuItems.find(function (e) { return e.nzSelected && e.nzSubMenuComponent === _this; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "submenuSelected", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return !!this.subMenus.toArray().find(function (e) { return e !== _this && e.subItemSelected; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "expandState", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nzOpen && this.subMenuMode === 'inline') {
                return 'expand';
            }
            else if (this.nzOpen && this.subMenuMode === 'horizontal') {
                return 'bottom';
            }
            else if (this.nzOpen && this.subMenuMode === 'vertical') {
                return 'fade';
            }
            else {
                return 'hidden';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "overlayPositions", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.subMenuMode === 'horizontal') {
                return [POSITION_MAP["bottomLeft"]];
            }
            else {
                return [POSITION_MAP["rightTop"], POSITION_MAP["leftTop"]];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} $event
     * @return {?}
     */
    NzSubMenuComponent.prototype.clickSubMenuTitle = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if (this.nzDisabled) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }
        if ((this.subMenuMode === 'inline') && (!this.isInDropDown)) {
            this.nzOpen = !this.nzOpen;
            this.nzOpenChange.emit(this.nzOpen);
        }
    };
    /**
     * @return {?}
     */
    NzSubMenuComponent.prototype.clickSubMenuDropDown = /**
     * @return {?}
     */
    function () {
        if (this.isInDropDown || (this.subMenuMode === 'vertical') || (this.subMenuMode === 'horizontal')) {
            this.$mouseSubject.next(false);
        }
    };
    Object.defineProperty(NzSubMenuComponent.prototype, "subMenuMode", {
        get: /**
         * @return {?}
         */
        function () {
            if (this.nzMenuDirective.nzMode === 'inline') {
                return 'inline';
            }
            else if ((this.nzMenuDirective.nzMode === 'vertical') || (this.isInSubMenu)) {
                return 'vertical';
            }
            else {
                return 'horizontal';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    NzSubMenuComponent.prototype.onMouseEnterEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
            this.$mouseSubject.next(true);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NzSubMenuComponent.prototype.onMouseLeaveEvent = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
            this.$mouseSubject.next(false);
        }
    };
    Object.defineProperty(NzSubMenuComponent.prototype, "setDropDownSubmenuClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isInDropDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuSubmenuOpenClass", {
        get: /**
         * @return {?}
         */
        function () {
            return (!this.isInDropDown) && (this.nzOpen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setDropDownVerticalClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isInDropDown && (this.subMenuMode === 'vertical');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setDropDownHorizontalClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isInDropDown && (this.subMenuMode === 'horizontal');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setDropDownDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isInDropDown && this.nzDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuSubmenuClass", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.isInDropDown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuSubmenuSelectedClass", {
        get: /**
         * @return {?}
         */
        function () {
            return this.submenuSelected || this.subItemSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuVerticalClass", {
        get: /**
         * @return {?}
         */
        function () {
            return (!this.isInDropDown) && (this.subMenuMode === 'vertical');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuHorizontalClass", {
        get: /**
         * @return {?}
         */
        function () {
            return (!this.isInDropDown) && (this.subMenuMode === 'horizontal');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuInlineClass", {
        get: /**
         * @return {?}
         */
        function () {
            return (!this.isInDropDown) && (this.subMenuMode === 'inline');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzSubMenuComponent.prototype, "setMenuDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return (!this.isInDropDown) && this.nzDisabled;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzSubMenuComponent.prototype.setTriggerWidth = /**
     * @return {?}
     */
    function () {
        if (this.subMenuMode === 'horizontal') {
            this.triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
            /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
            if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
                this.cdkOverlay.overlayRef.updateSize({
                    width: this.triggerWidth
                });
            }
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NzSubMenuComponent.prototype.onPositionChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        if ($event.connectionPair) {
            /** @type {?} */
            var originMap_1 = {
                originX: $event.connectionPair.originX,
                originY: $event.connectionPair.originY,
                overlayX: $event.connectionPair.overlayX,
                overlayY: $event.connectionPair.overlayY
            };
            /** @type {?} */
            var keyList = ['originX', 'originY', 'overlayX', 'overlayY'];
            if (keyList.every(function (key) { return originMap_1[key] === POSITION_MAP["leftTop"][key]; })) {
                this.placement = 'leftTop';
            }
            else if (keyList.every(function (key) { return originMap_1[key] === POSITION_MAP["rightTop"][key]; })) {
                this.placement = 'rightTop';
            }
            this.cd.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    NzSubMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.nzMenuDirective.subMenus.push(this);
        /** @type {?} */
        var $combineAll = combineLatest(this.$subOpen, this.$mouseSubject.asObservable()).pipe(map(function (value) { return value[0] || value[1]; }), auditTime(150));
        $combineAll.pipe(takeUntil(this.unsubscribe$)).subscribe(this.handleOpenEvent);
        this.isInDropDown = this.nzMenuDirective.nzInDropDown;
    };
    /**
     * @return {?}
     */
    NzSubMenuComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.subMenus && this.subMenus.length) {
            this.subMenus.filter(function (x) { return x !== _this; }).forEach(function (menu) {
                if (_this.subMenuMode === 'inline') {
                    Promise.resolve().then(function () { return menu.level = _this.level + 1; });
                }
                menu.isInSubMenu = true;
            });
        }
    };
    /**
     * @return {?}
     */
    NzSubMenuComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    };
    NzSubMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: '[nz-submenu]',
                    preserveWhitespaces: false,
                    animations: [
                        trigger('expandAnimation', [
                            state('expand', style({ height: '*' })),
                            state('hidden', style({ height: 0, overflow: 'hidden' })),
                            transition('expand => hidden', animate(150)),
                            transition('hidden => expand', animate(150)),
                            state('fade', style({ opacity: 1 })),
                            transition('fade => void', [
                                animate(150, style({ opacity: 0 }))
                            ]),
                            transition('void => fade', [
                                style({ opacity: '0' }),
                                animate(150)
                            ]),
                            state('bottom', style({
                                opacity: 1,
                                transform: 'scaleY(1)',
                                transformOrigin: '0% 0%'
                            })),
                            transition('void => bottom', [
                                style({
                                    opacity: 0,
                                    transform: 'scaleY(0.8)',
                                    transformOrigin: '0% 0%'
                                }),
                                animate('150ms cubic-bezier(0.23, 1, 0.32, 1)')
                            ]),
                            transition('bottom => void', [
                                animate('150ms cubic-bezier(0.23, 1, 0.32, 1)', style({
                                    opacity: 0,
                                    transform: 'scaleY(0.8)',
                                    transformOrigin: '0% 0%'
                                }))
                            ])
                        ])
                    ],
                    template: "<div\n  #trigger\n  cdkOverlayOrigin\n  #origin=\"cdkOverlayOrigin\"\n  [class.ant-dropdown-menu-submenu-title]=\"isInDropDown\"\n  [class.ant-menu-submenu-title]=\"!isInDropDown\"\n  (mouseenter)=\"onMouseEnterEvent($event)\"\n  (mouseleave)=\"onMouseLeaveEvent($event)\"\n  (click)=\"clickSubMenuTitle($event)\"\n  [style.paddingLeft.px]=\"(nzMenuDirective.nzMode === 'inline')?(level*nzMenuDirective.nzInlineIndent):null\">\n  <ng-content select=\"[title]\"></ng-content>\n  <i [class.ant-dropdown-menu-submenu-arrow]=\"isInDropDown\" [class.ant-menu-submenu-arrow]=\"!isInDropDown\"></i>\n</div>\n<ul\n  [class.ant-dropdown-menu]=\"isInDropDown\"\n  [@expandAnimation]=\"expandState\"\n  [class.ant-menu]=\"!isInDropDown\"\n  [class.ant-dropdown-menu-vertical]=\"isInDropDown\"\n  [class.ant-menu-inline]=\"!isInDropDown\"\n  [class.ant-dropdown-menu-sub]=\"isInDropDown\"\n  [class.ant-menu-sub]=\"!isInDropDown\"\n  (mouseleave)=\"onMouseLeaveEvent($event)\"\n  (mouseenter)=\"onMouseEnterEvent($event)\"\n  *ngIf=\"(nzMenuDirective.nzMode=='inline')\">\n  <ng-template [ngTemplateOutlet]=\"subMenuTemplate\"></ng-template>\n</ul>\n<ng-template\n  cdkConnectedOverlay\n  [cdkConnectedOverlayPositions]=\"overlayPositions\"\n  [cdkConnectedOverlayOrigin]=\"origin\"\n  [cdkConnectedOverlayWidth]=\"triggerWidth\"\n  (positionChange)=\"onPositionChange($event)\"\n  [cdkConnectedOverlayOpen]=\"nzOpen&&(nzMenuDirective.nzMode!='inline')\">\n  <div\n    class=\"ant-menu-submenu ant-menu-submenu-popup\"\n    [class.ant-menu-light]=\"nzMenuDirective.nzTheme=='light'\"\n    [class.ant-menu-dark]=\"nzMenuDirective.nzTheme=='dark'\"\n    [class.ant-menu-submenu-placement-bottomLeft]=\"subMenuMode=='horizontal'\"\n    [class.ant-menu-submenu-placement-rightTop]=\"(subMenuMode=='vertical')&&(placement=='rightTop')\"\n    [class.ant-menu-submenu-placement-leftTop]=\"(subMenuMode=='vertical')&&(placement=='leftTop')\"\n    [@expandAnimation]=\"expandState\">\n    <ul\n      [class.ant-dropdown-menu]=\"isInDropDown\"\n      [class.ant-menu]=\"!isInDropDown\"\n      [class.ant-dropdown-menu-vertical]=\"isInDropDown\"\n      [class.ant-menu-vertical]=\"!isInDropDown\"\n      [class.ant-dropdown-menu-sub]=\"isInDropDown\"\n      [class.ant-menu-sub]=\"!isInDropDown\"\n      (mouseleave)=\"onMouseLeaveEvent($event)\"\n      (mouseenter)=\"onMouseEnterEvent($event)\">\n      <ng-template [ngTemplateOutlet]=\"subMenuTemplate\"></ng-template>\n    </ul>\n  </div>\n</ng-template>\n<ng-template #subMenuTemplate>\n  <ng-content></ng-content>\n</ng-template>",
                    styles: ["\n      .ant-menu-submenu-placement-bottomLeft {\n        top: 6px;\n        position: relative;\n      }\n\n      .ant-menu-submenu-placement-rightTop {\n        left: 4px;\n        position: relative;\n      }\n\n      .ant-menu-submenu-placement-leftTop {\n        right: 4px;\n        position: relative;\n      }\n    "]
                }] }
    ];
    /** @nocollapse */
    NzSubMenuComponent.ctorParameters = function () { return [
        { type: NzMenuDirective },
        { type: ChangeDetectorRef },
        { type: NzSubMenuComponent, decorators: [{ type: SkipSelf }, { type: Optional }] },
        { type: NzDropDownComponent, decorators: [{ type: Host }, { type: Optional }] },
        { type: NzDropDownButtonComponent, decorators: [{ type: Host }, { type: Optional }] }
    ]; };
    NzSubMenuComponent.propDecorators = {
        subMenus: [{ type: ContentChildren, args: [NzSubMenuComponent, { descendants: true },] }],
        nzOpenChange: [{ type: Output }],
        cdkOverlay: [{ type: ViewChild, args: [CdkConnectedOverlay,] }],
        trigger: [{ type: ViewChild, args: ['trigger',] }],
        nzOpen: [{ type: Input }],
        nzDisabled: [{ type: Input }],
        setDropDownSubmenuClass: [{ type: HostBinding, args: ['class.ant-dropdown-menu-submenu',] }],
        setMenuSubmenuOpenClass: [{ type: HostBinding, args: ['class.ant-menu-submenu-open',] }],
        setDropDownVerticalClass: [{ type: HostBinding, args: ['class.ant-dropdown-menu-submenu-vertical',] }],
        setDropDownHorizontalClass: [{ type: HostBinding, args: ['class.ant-dropdown-menu-submenu-horizontal',] }],
        setDropDownDisabled: [{ type: HostBinding, args: ['class.ant-dropdown-menu-submenu-disabled',] }],
        setMenuSubmenuClass: [{ type: HostBinding, args: ['class.ant-menu-submenu',] }],
        setMenuSubmenuSelectedClass: [{ type: HostBinding, args: ['class.ant-menu-submenu-selected',] }],
        setMenuVerticalClass: [{ type: HostBinding, args: ['class.ant-menu-submenu-vertical',] }],
        setMenuHorizontalClass: [{ type: HostBinding, args: ['class.ant-menu-submenu-horizontal',] }],
        setMenuInlineClass: [{ type: HostBinding, args: ['class.ant-menu-submenu-inline',] }],
        setMenuDisabled: [{ type: HostBinding, args: ['class.ant-menu-submenu-disabled',] }]
    };
    return NzSubMenuComponent;
}());
export { NzSubMenuComponent };
function NzSubMenuComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSubMenuComponent.prototype._open;
    /** @type {?} */
    NzSubMenuComponent.prototype._disabled;
    /** @type {?} */
    NzSubMenuComponent.prototype.$mouseSubject;
    /** @type {?} */
    NzSubMenuComponent.prototype.unsubscribe$;
    /** @type {?} */
    NzSubMenuComponent.prototype.placement;
    /** @type {?} */
    NzSubMenuComponent.prototype.$subOpen;
    /** @type {?} */
    NzSubMenuComponent.prototype.isInDropDown;
    /** @type {?} */
    NzSubMenuComponent.prototype.isInSubMenu;
    /** @type {?} */
    NzSubMenuComponent.prototype.level;
    /** @type {?} */
    NzSubMenuComponent.prototype.triggerWidth;
    /** @type {?} */
    NzSubMenuComponent.prototype.subMenus;
    /** @type {?} */
    NzSubMenuComponent.prototype.nzOpenChange;
    /** @type {?} */
    NzSubMenuComponent.prototype.cdkOverlay;
    /** @type {?} */
    NzSubMenuComponent.prototype.trigger;
    /** @type {?} */
    NzSubMenuComponent.prototype.handleOpenEvent;
    /** @type {?} */
    NzSubMenuComponent.prototype.nzMenuDirective;
    /** @type {?} */
    NzSubMenuComponent.prototype.cd;
    /** @type {?} */
    NzSubMenuComponent.prototype.nzSubMenuComponent;
    /** @type {?} */
    NzSubMenuComponent.prototype.nzDropDownComponent;
    /** @type {?} */
    NzSubMenuComponent.prototype.nzDropDownButtonComponent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3VibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsibWVudS9uei1zdWJtZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQTBELE1BQU0sc0JBQXNCLENBQUM7QUFDbkgsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLFdBQVcsRUFDWCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0lBK1FwRCw0QkFBbUIsZUFBZ0MsRUFBVSxFQUFxQixFQUFrQyxrQkFBc0MsRUFBOEIsbUJBQXdDLEVBQThCLHlCQUFvRDtRQUFsVCxpQkFDQztRQURrQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFB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QWlDO3VDQUs3QyxXQUFXLFNBQUMsaUNBQWlDO3lDQUs3QyxXQUFXLFNBQUMsbUNBQW1DO3FDQUsvQyxXQUFXLFNBQUMsK0JBQStCO2tDQUszQyxXQUFXLFNBQUMsaUNBQWlDOzs2QkFyUGhEOztTQTJGYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENka0Nvbm5lY3RlZE92ZXJsYXksIENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSwgQ29ubmVjdGlvblBvc2l0aW9uUGFpciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFNraXBTZWxmLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBtYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUE9TSVRJT05fTUFQIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L292ZXJsYXktcG9zaXRpb24tbWFwJztcbmltcG9ydCB7IHRvQm9vbGVhbiB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IE56RHJvcERvd25CdXR0b25Db21wb25lbnQgfSBmcm9tICcuLi9kcm9wZG93bi9uei1kcm9wZG93bi1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE56RHJvcERvd25Db21wb25lbnQgfSBmcm9tICcuLi9kcm9wZG93bi9uei1kcm9wZG93bi5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBOek1lbnVEaXJlY3RpdmUgfSBmcm9tICcuL256LW1lbnUuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICdbbnotc3VibWVudV0nLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgYW5pbWF0aW9ucyAgICAgICAgIDogW1xuICAgIHRyaWdnZXIoJ2V4cGFuZEFuaW1hdGlvbicsIFtcbiAgICAgIHN0YXRlKCdleHBhbmQnLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IGhlaWdodDogMCwgb3ZlcmZsb3c6ICdoaWRkZW4nIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZCA9PiBoaWRkZW4nLCBhbmltYXRlKDE1MCkpLFxuICAgICAgdHJhbnNpdGlvbignaGlkZGVuID0+IGV4cGFuZCcsIGFuaW1hdGUoMTUwKSksXG4gICAgICBzdGF0ZSgnZmFkZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICB0cmFuc2l0aW9uKCdmYWRlID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUoMTUwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gZmFkZScsIFtcbiAgICAgICAgc3R5bGUoeyBvcGFjaXR5OiAnMCcgfSksXG4gICAgICAgIGFuaW1hdGUoMTUwKVxuICAgICAgXSksXG4gICAgICBzdGF0ZSgnYm90dG9tJywgc3R5bGUoe1xuICAgICAgICBvcGFjaXR5ICAgICAgICA6IDEsXG4gICAgICAgIHRyYW5zZm9ybSAgICAgIDogJ3NjYWxlWSgxKScsXG4gICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAlIDAlJ1xuICAgICAgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBib3R0b20nLCBbXG4gICAgICAgIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5ICAgICAgICA6IDAsXG4gICAgICAgICAgdHJhbnNmb3JtICAgICAgOiAnc2NhbGVZKDAuOCknLFxuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAlIDAlJ1xuICAgICAgICB9KSxcbiAgICAgICAgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuMjMsIDEsIDAuMzIsIDEpJylcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbignYm90dG9tID0+IHZvaWQnLCBbXG4gICAgICAgIGFuaW1hdGUoJzE1MG1zIGN1YmljLWJlemllcigwLjIzLCAxLCAwLjMyLCAxKScsIHN0eWxlKHtcbiAgICAgICAgICBvcGFjaXR5ICAgICAgICA6IDAsXG4gICAgICAgICAgdHJhbnNmb3JtICAgICAgOiAnc2NhbGVZKDAuOCknLFxuICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogJzAlIDAlJ1xuICAgICAgICB9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotc3VibWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlcyAgICAgICAgICAgICA6IFtcbiAgICBgXG4gICAgICAuYW50LW1lbnUtc3VibWVudS1wbGFjZW1lbnQtYm90dG9tTGVmdCB7XG4gICAgICAgIHRvcDogNnB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5hbnQtbWVudS1zdWJtZW51LXBsYWNlbWVudC1yaWdodFRvcCB7XG4gICAgICAgIGxlZnQ6IDRweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuXG4gICAgICAuYW50LW1lbnUtc3VibWVudS1wbGFjZW1lbnQtbGVmdFRvcCB7XG4gICAgICAgIHJpZ2h0OiA0cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOelN1Yk1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIHByaXZhdGUgX29wZW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSAkbW91c2VTdWJqZWN0ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJpdmF0ZSB1bnN1YnNjcmliZSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHBsYWNlbWVudCA9ICdyaWdodFRvcCc7XG4gICRzdWJPcGVuID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGlzSW5Ecm9wRG93biA9IGZhbHNlO1xuICBpc0luU3ViTWVudSA9IGZhbHNlO1xuICBsZXZlbCA9IDE7XG4gIHRyaWdnZXJXaWR0aCA9IG51bGw7XG4gIEBDb250ZW50Q2hpbGRyZW4oTnpTdWJNZW51Q29tcG9uZW50LCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIHN1Yk1lbnVzOiBRdWVyeUxpc3Q8TnpTdWJNZW51Q29tcG9uZW50PjtcbiAgQE91dHB1dCgpIG56T3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAVmlld0NoaWxkKENka0Nvbm5lY3RlZE92ZXJsYXkpIGNka092ZXJsYXk6IENka0Nvbm5lY3RlZE92ZXJsYXk7XG4gIEBWaWV3Q2hpbGQoJ3RyaWdnZXInKSB0cmlnZ2VyOiBFbGVtZW50UmVmO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuek9wZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9vcGVuID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldFRyaWdnZXJXaWR0aCgpO1xuICB9XG5cbiAgZ2V0IG56T3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fb3BlbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICB9XG5cbiAgZ2V0IG56RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgZ2V0IHN1Ykl0ZW1TZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLm56TWVudURpcmVjdGl2ZS5tZW51SXRlbXMuZmluZChlID0+IGUubnpTZWxlY3RlZCAmJiBlLm56U3ViTWVudUNvbXBvbmVudCA9PT0gdGhpcyk7XG4gIH1cblxuICBnZXQgc3VibWVudVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc3ViTWVudXMudG9BcnJheSgpLmZpbmQoZSA9PiBlICE9PSB0aGlzICYmIGUuc3ViSXRlbVNlbGVjdGVkKTtcbiAgfVxuXG4gIGdldCBleHBhbmRTdGF0ZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm56T3BlbiAmJiB0aGlzLnN1Yk1lbnVNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgcmV0dXJuICdleHBhbmQnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5uek9wZW4gJiYgdGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICByZXR1cm4gJ2JvdHRvbSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm56T3BlbiAmJiB0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4gJ2ZhZGUnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2hpZGRlbic7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG92ZXJsYXlQb3NpdGlvbnMoKTogQ29ubmVjdGlvblBvc2l0aW9uUGFpcltdIHtcbiAgICBpZiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICByZXR1cm4gWyBQT1NJVElPTl9NQVAuYm90dG9tTGVmdCBdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gWyBQT1NJVElPTl9NQVAucmlnaHRUb3AsIFBPU0lUSU9OX01BUC5sZWZ0VG9wIF07XG4gICAgfVxuICB9XG5cbiAgY2xpY2tTdWJNZW51VGl0bGUoJGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2lubGluZScpICYmICghdGhpcy5pc0luRHJvcERvd24pKSB7XG4gICAgICB0aGlzLm56T3BlbiA9ICF0aGlzLm56T3BlbjtcbiAgICAgIHRoaXMubnpPcGVuQ2hhbmdlLmVtaXQodGhpcy5uek9wZW4pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrU3ViTWVudURyb3BEb3duKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5Ecm9wRG93biB8fCAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ3ZlcnRpY2FsJykgfHwgKHRoaXMuc3ViTWVudU1vZGUgPT09ICdob3Jpem9udGFsJykpIHtcbiAgICAgIHRoaXMuJG1vdXNlU3ViamVjdC5uZXh0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc3ViTWVudU1vZGUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5uek1lbnVEaXJlY3RpdmUubnpNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgcmV0dXJuICdpbmxpbmUnO1xuICAgIH0gZWxzZSBpZiAoKHRoaXMubnpNZW51RGlyZWN0aXZlLm56TW9kZSA9PT0gJ3ZlcnRpY2FsJykgfHwgKHRoaXMuaXNJblN1Yk1lbnUpKSB7XG4gICAgICByZXR1cm4gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlRW50ZXJFdmVudChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpIHx8ICh0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKSB8fCB0aGlzLmlzSW5Ecm9wRG93bikge1xuICAgICAgdGhpcy4kbW91c2VTdWJqZWN0Lm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZUxlYXZlRXZlbnQoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICgodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKSB8fCAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ3ZlcnRpY2FsJykgfHwgdGhpcy5pc0luRHJvcERvd24pIHtcbiAgICAgIHRoaXMuJG1vdXNlU3ViamVjdC5uZXh0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUnKVxuICBnZXQgc2V0RHJvcERvd25TdWJtZW51Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNJbkRyb3BEb3duO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51LW9wZW4nKVxuICBnZXQgc2V0TWVudVN1Ym1lbnVPcGVuQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5pc0luRHJvcERvd24pICYmICh0aGlzLm56T3Blbik7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtdmVydGljYWwnKVxuICBnZXQgc2V0RHJvcERvd25WZXJ0aWNhbENsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5Ecm9wRG93biAmJiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ3ZlcnRpY2FsJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtaG9yaXpvbnRhbCcpXG4gIGdldCBzZXREcm9wRG93bkhvcml6b250YWxDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luRHJvcERvd24gJiYgKHRoaXMuc3ViTWVudU1vZGUgPT09ICdob3Jpem9udGFsJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1kcm9wZG93bi1tZW51LXN1Ym1lbnUtZGlzYWJsZWQnKVxuICBnZXQgc2V0RHJvcERvd25EaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luRHJvcERvd24gJiYgdGhpcy5uekRpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51JylcbiAgZ2V0IHNldE1lbnVTdWJtZW51Q2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmlzSW5Ecm9wRG93bjtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LW1lbnUtc3VibWVudS1zZWxlY3RlZCcpXG4gIGdldCBzZXRNZW51U3VibWVudVNlbGVjdGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3VibWVudVNlbGVjdGVkIHx8IHRoaXMuc3ViSXRlbVNlbGVjdGVkO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51LXZlcnRpY2FsJylcbiAgZ2V0IHNldE1lbnVWZXJ0aWNhbENsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuaXNJbkRyb3BEb3duKSAmJiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ3ZlcnRpY2FsJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtaG9yaXpvbnRhbCcpXG4gIGdldCBzZXRNZW51SG9yaXpvbnRhbENsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuaXNJbkRyb3BEb3duKSAmJiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LW1lbnUtc3VibWVudS1pbmxpbmUnKVxuICBnZXQgc2V0TWVudUlubGluZUNsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuaXNJbkRyb3BEb3duKSAmJiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2lubGluZScpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51LWRpc2FibGVkJylcbiAgZ2V0IHNldE1lbnVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCF0aGlzLmlzSW5Ecm9wRG93bikgJiYgdGhpcy5uekRpc2FibGVkO1xuICB9XG5cbiAgc2V0VHJpZ2dlcldpZHRoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMudHJpZ2dlcldpZHRoID0gdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAvKiogc2hvdWxkIHJlbW92ZSBhZnRlciBhZnRlciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC84NzY1IG1lcmdlZCAqKi9cbiAgICAgIGlmICh0aGlzLmNka092ZXJsYXkgJiYgdGhpcy5jZGtPdmVybGF5Lm92ZXJsYXlSZWYpIHtcbiAgICAgICAgdGhpcy5jZGtPdmVybGF5Lm92ZXJsYXlSZWYudXBkYXRlU2l6ZSh7XG4gICAgICAgICAgd2lkdGg6IHRoaXMudHJpZ2dlcldpZHRoXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgb25Qb3NpdGlvbkNoYW5nZSgkZXZlbnQ6IENvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbkNoYW5nZSk6IHZvaWQge1xuICAgIGlmICgkZXZlbnQuY29ubmVjdGlvblBhaXIpIHtcbiAgICAgIGNvbnN0IG9yaWdpbk1hcCA9IHtcbiAgICAgICAgb3JpZ2luWCA6ICRldmVudC5jb25uZWN0aW9uUGFpci5vcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZIDogJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblksXG4gICAgICAgIG92ZXJsYXlYOiAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVgsXG4gICAgICAgIG92ZXJsYXlZOiAkZXZlbnQuY29ubmVjdGlvblBhaXIub3ZlcmxheVlcbiAgICAgIH07XG4gICAgICBjb25zdCBrZXlMaXN0ID0gWyAnb3JpZ2luWCcsICdvcmlnaW5ZJywgJ292ZXJsYXlYJywgJ292ZXJsYXlZJyBdO1xuICAgICAgaWYgKGtleUxpc3QuZXZlcnkoa2V5ID0+IG9yaWdpbk1hcFsga2V5IF0gPT09IFBPU0lUSU9OX01BUC5sZWZ0VG9wWyBrZXkgXSkpIHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSAnbGVmdFRvcCc7XG4gICAgICB9IGVsc2UgaWYgKGtleUxpc3QuZXZlcnkoa2V5ID0+IG9yaWdpbk1hcFsga2V5IF0gPT09IFBPU0lUSU9OX01BUC5yaWdodFRvcFsga2V5IF0pKSB7XG4gICAgICAgIHRoaXMucGxhY2VtZW50ID0gJ3JpZ2h0VG9wJztcbiAgICAgIH1cbiAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU9wZW5FdmVudCA9IChkYXRhOiBib29sZWFuKSA9PiB7XG4gICAgaWYgKHRoaXMubnpEaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5uek9wZW4gIT09IGRhdGEpIHtcbiAgICAgIHRoaXMubnpPcGVuID0gZGF0YTtcbiAgICAgIHRoaXMubnpPcGVuQ2hhbmdlLmVtaXQodGhpcy5uek9wZW4pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uelN1Yk1lbnVDb21wb25lbnQpIHtcbiAgICAgIHRoaXMubnpTdWJNZW51Q29tcG9uZW50LiRzdWJPcGVuLm5leHQodGhpcy5uek9wZW4pO1xuICAgIH1cbiAgICBpZiAodGhpcy5uekRyb3BEb3duQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLm56RHJvcERvd25Db21wb25lbnQuJHN1Yk9wZW4ubmV4dCh0aGlzLm56T3Blbik7XG4gICAgfVxuICAgIGlmICh0aGlzLm56RHJvcERvd25CdXR0b25Db21wb25lbnQpIHtcbiAgICAgIHRoaXMubnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudC4kc3ViT3Blbi5uZXh0KHRoaXMubnpPcGVuKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbnpNZW51RGlyZWN0aXZlOiBOek1lbnVEaXJlY3RpdmUsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBAU2tpcFNlbGYoKSBAT3B0aW9uYWwoKSBwcml2YXRlIG56U3ViTWVudUNvbXBvbmVudDogTnpTdWJNZW51Q29tcG9uZW50LCBASG9zdCgpIEBPcHRpb25hbCgpIHByaXZhdGUgbnpEcm9wRG93bkNvbXBvbmVudDogTnpEcm9wRG93bkNvbXBvbmVudCwgQEhvc3QoKSBAT3B0aW9uYWwoKSBwcml2YXRlIG56RHJvcERvd25CdXR0b25Db21wb25lbnQ6IE56RHJvcERvd25CdXR0b25Db21wb25lbnQpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMubnpNZW51RGlyZWN0aXZlLnN1Yk1lbnVzLnB1c2godGhpcyk7XG4gICAgY29uc3QgJGNvbWJpbmVBbGwgPSBjb21iaW5lTGF0ZXN0KHRoaXMuJHN1Yk9wZW4sIHRoaXMuJG1vdXNlU3ViamVjdC5hc09ic2VydmFibGUoKSkucGlwZShtYXAodmFsdWUgPT4gdmFsdWVbIDAgXSB8fCB2YWx1ZVsgMSBdKSwgYXVkaXRUaW1lKDE1MCkpO1xuICAgICRjb21iaW5lQWxsLnBpcGUodGFrZVVudGlsKHRoaXMudW5zdWJzY3JpYmUkKSkuc3Vic2NyaWJlKHRoaXMuaGFuZGxlT3BlbkV2ZW50KTtcbiAgICB0aGlzLmlzSW5Ecm9wRG93biA9IHRoaXMubnpNZW51RGlyZWN0aXZlLm56SW5Ecm9wRG93bjtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWJNZW51cyAmJiB0aGlzLnN1Yk1lbnVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5zdWJNZW51cy5maWx0ZXIoeCA9PiB4ICE9PSB0aGlzKS5mb3JFYWNoKG1lbnUgPT4ge1xuICAgICAgICBpZiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IG1lbnUubGV2ZWwgPSB0aGlzLmxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgbWVudS5pc0luU3ViTWVudSA9IHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5uZXh0KCk7XG4gICAgdGhpcy51bnN1YnNjcmliZSQuY29tcGxldGUoKTtcbiAgfVxufVxuIl19