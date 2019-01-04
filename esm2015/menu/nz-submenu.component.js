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
export class NzSubMenuComponent {
    /**
     * @param {?} nzMenuDirective
     * @param {?} cd
     * @param {?} nzSubMenuComponent
     * @param {?} nzDropDownComponent
     * @param {?} nzDropDownButtonComponent
     */
    constructor(nzMenuDirective, cd, nzSubMenuComponent, nzDropDownComponent, nzDropDownButtonComponent) {
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
        this.handleOpenEvent = (data) => {
            if (this.nzDisabled) {
                return;
            }
            if (this.nzOpen !== data) {
                this.nzOpen = data;
                this.nzOpenChange.emit(this.nzOpen);
            }
            if (this.nzSubMenuComponent) {
                this.nzSubMenuComponent.$subOpen.next(this.nzOpen);
            }
            if (this.nzDropDownComponent) {
                this.nzDropDownComponent.$subOpen.next(this.nzOpen);
            }
            if (this.nzDropDownButtonComponent) {
                this.nzDropDownButtonComponent.$subOpen.next(this.nzOpen);
            }
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzOpen(value) {
        this._open = toBoolean(value);
        this.setTriggerWidth();
    }
    /**
     * @return {?}
     */
    get nzOpen() {
        return this._open;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @return {?}
     */
    get subItemSelected() {
        return !!this.nzMenuDirective.menuItems.find(e => e.nzSelected && e.nzSubMenuComponent === this);
    }
    /**
     * @return {?}
     */
    get submenuSelected() {
        return !!this.subMenus.toArray().find(e => e !== this && e.subItemSelected);
    }
    /**
     * @return {?}
     */
    get expandState() {
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
    }
    /**
     * @return {?}
     */
    get overlayPositions() {
        if (this.subMenuMode === 'horizontal') {
            return [POSITION_MAP["bottomLeft"]];
        }
        else {
            return [POSITION_MAP["rightTop"], POSITION_MAP["leftTop"]];
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    clickSubMenuTitle($event) {
        if (this.nzDisabled) {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }
        if ((this.subMenuMode === 'inline') && (!this.isInDropDown)) {
            this.nzOpen = !this.nzOpen;
            this.nzOpenChange.emit(this.nzOpen);
        }
    }
    /**
     * @return {?}
     */
    clickSubMenuDropDown() {
        if (this.isInDropDown || (this.subMenuMode === 'vertical') || (this.subMenuMode === 'horizontal')) {
            this.$mouseSubject.next(false);
        }
    }
    /**
     * @return {?}
     */
    get subMenuMode() {
        if (this.nzMenuDirective.nzMode === 'inline') {
            return 'inline';
        }
        else if ((this.nzMenuDirective.nzMode === 'vertical') || (this.isInSubMenu)) {
            return 'vertical';
        }
        else {
            return 'horizontal';
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseEnterEvent(e) {
        if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
            this.$mouseSubject.next(true);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseLeaveEvent(e) {
        if ((this.subMenuMode === 'horizontal') || (this.subMenuMode === 'vertical') || this.isInDropDown) {
            this.$mouseSubject.next(false);
        }
    }
    /**
     * @return {?}
     */
    get setDropDownSubmenuClass() {
        return this.isInDropDown;
    }
    /**
     * @return {?}
     */
    get setMenuSubmenuOpenClass() {
        return (!this.isInDropDown) && (this.nzOpen);
    }
    /**
     * @return {?}
     */
    get setDropDownVerticalClass() {
        return this.isInDropDown && (this.subMenuMode === 'vertical');
    }
    /**
     * @return {?}
     */
    get setDropDownHorizontalClass() {
        return this.isInDropDown && (this.subMenuMode === 'horizontal');
    }
    /**
     * @return {?}
     */
    get setDropDownDisabled() {
        return this.isInDropDown && this.nzDisabled;
    }
    /**
     * @return {?}
     */
    get setMenuSubmenuClass() {
        return !this.isInDropDown;
    }
    /**
     * @return {?}
     */
    get setMenuSubmenuSelectedClass() {
        return this.submenuSelected || this.subItemSelected;
    }
    /**
     * @return {?}
     */
    get setMenuVerticalClass() {
        return (!this.isInDropDown) && (this.subMenuMode === 'vertical');
    }
    /**
     * @return {?}
     */
    get setMenuHorizontalClass() {
        return (!this.isInDropDown) && (this.subMenuMode === 'horizontal');
    }
    /**
     * @return {?}
     */
    get setMenuInlineClass() {
        return (!this.isInDropDown) && (this.subMenuMode === 'inline');
    }
    /**
     * @return {?}
     */
    get setMenuDisabled() {
        return (!this.isInDropDown) && this.nzDisabled;
    }
    /**
     * @return {?}
     */
    setTriggerWidth() {
        if (this.subMenuMode === 'horizontal') {
            this.triggerWidth = this.trigger.nativeElement.getBoundingClientRect().width;
            /** should remove after after https://github.com/angular/material2/pull/8765 merged **/
            if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
                this.cdkOverlay.overlayRef.updateSize({
                    width: this.triggerWidth
                });
            }
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onPositionChange($event) {
        if ($event.connectionPair) {
            /** @type {?} */
            const originMap = {
                originX: $event.connectionPair.originX,
                originY: $event.connectionPair.originY,
                overlayX: $event.connectionPair.overlayX,
                overlayY: $event.connectionPair.overlayY
            };
            /** @type {?} */
            const keyList = ['originX', 'originY', 'overlayX', 'overlayY'];
            if (keyList.every(key => originMap[key] === POSITION_MAP["leftTop"][key])) {
                this.placement = 'leftTop';
            }
            else if (keyList.every(key => originMap[key] === POSITION_MAP["rightTop"][key])) {
                this.placement = 'rightTop';
            }
            this.cd.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.nzMenuDirective.subMenus.push(this);
        /** @type {?} */
        const $combineAll = combineLatest(this.$subOpen, this.$mouseSubject.asObservable()).pipe(map(value => value[0] || value[1]), auditTime(150));
        $combineAll.pipe(takeUntil(this.unsubscribe$)).subscribe(this.handleOpenEvent);
        this.isInDropDown = this.nzMenuDirective.nzInDropDown;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.subMenus && this.subMenus.length) {
            this.subMenus.filter(x => x !== this).forEach(menu => {
                if (this.subMenuMode === 'inline') {
                    Promise.resolve().then(() => menu.level = this.level + 1);
                }
                menu.isInSubMenu = true;
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
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
                styles: [`
      .ant-menu-submenu-placement-bottomLeft {
        top: 6px;
        position: relative;
      }

      .ant-menu-submenu-placement-rightTop {
        left: 4px;
        position: relative;
      }

      .ant-menu-submenu-placement-leftTop {
        right: 4px;
        position: relative;
      }
    `]
            }] }
];
/** @nocollapse */
NzSubMenuComponent.ctorParameters = () => [
    { type: NzMenuDirective },
    { type: ChangeDetectorRef },
    { type: NzSubMenuComponent, decorators: [{ type: SkipSelf }, { type: Optional }] },
    { type: NzDropDownComponent, decorators: [{ type: Host }, { type: Optional }] },
    { type: NzDropDownButtonComponent, decorators: [{ type: Host }, { type: Optional }] }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3VibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsibWVudS9uei1zdWJtZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQTBELE1BQU0sc0JBQXNCLENBQUM7QUFDbkgsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osSUFBSSxFQUNKLFdBQVcsRUFDWCxLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNyRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUE4RHRELE1BQU07Ozs7Ozs7O0lBaU5KLFlBQW1CLGVBQWdDLEVBQVUsRUFBcUIsRUFBa0Msa0JBQXNDLEVBQThCLG1CQUF3QyxFQUE4Qix5QkFBb0Q7UUFBL1Isb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFBa0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUE4Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQThCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7cUJBaE5sUyxLQUFLO3lCQUNELEtBQUs7NkJBQ0QsSUFBSSxPQUFPLEVBQVc7NEJBQ3ZCLElBQUksT0FBTyxFQUFRO3lCQUU5QixVQUFVO3dCQUNYLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs0QkFDL0IsS0FBSzsyQkFDTixLQUFLO3FCQUNYLENBQUM7NEJBQ00sSUFBSTs0QkFFNkIsSUFBSSxZQUFZLEVBQUU7K0JBaUxoRCxDQUFDLElBQWEsRUFBRSxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsT0FBTzthQUNSO1lBQ0QsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQztZQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEQ7WUFDRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JEO1lBQ0QsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzRDtTQUNGO0tBR0E7Ozs7O0lBak1ELElBQ0ksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0tBQ3hCOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7OztJQUVELElBQ0ksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDbkM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUM7S0FDbEc7Ozs7SUFFRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUM3RTs7OztJQUVELElBQUksV0FBVztRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtZQUNoRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUMzRCxPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUN6RCxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07WUFDTCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtLQUNGOzs7O0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxPQUFPLENBQUUsWUFBWSxlQUFhLENBQUM7U0FDcEM7YUFBTTtZQUNMLE9BQU8sQ0FBRSxZQUFZLGNBQVcsWUFBWSxZQUFVLENBQUM7U0FDeEQ7S0FDRjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxNQUFrQjtRQUNsQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztLQUNGOzs7O0lBRUQsb0JBQW9CO1FBQ2xCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksQ0FBQyxFQUFFO1lBQ2pHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM1QyxPQUFPLFFBQVEsQ0FBQztTQUNqQjthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3RSxPQUFPLFVBQVUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsT0FBTyxZQUFZLENBQUM7U0FDckI7S0FDRjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxDQUFhO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7Ozs7O0lBRUQsaUJBQWlCLENBQUMsQ0FBYTtRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7O0lBRUQsSUFDSSx1QkFBdUI7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzFCOzs7O0lBRUQsSUFDSSx1QkFBdUI7UUFDekIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlDOzs7O0lBRUQsSUFDSSx3QkFBd0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQztLQUMvRDs7OztJQUVELElBQ0ksMEJBQTBCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxDQUFDLENBQUM7S0FDakU7Ozs7SUFFRCxJQUNJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUM3Qzs7OztJQUVELElBQ0ksbUJBQW1CO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0tBQzNCOzs7O0lBRUQsSUFDSSwyQkFBMkI7UUFDN0IsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7S0FDckQ7Ozs7SUFFRCxJQUNJLG9CQUFvQjtRQUN0QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxDQUFDO0tBQ2xFOzs7O0lBRUQsSUFDSSxzQkFBc0I7UUFDeEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxZQUFZLENBQUMsQ0FBQztLQUNwRTs7OztJQUVELElBQ0ksa0JBQWtCO1FBQ3BCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUM7S0FDaEU7Ozs7SUFFRCxJQUNJLGVBQWU7UUFDakIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDaEQ7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFlBQVksRUFBRTtZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDOztZQUU3RSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztvQkFDcEMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUN6QixDQUFDLENBQUM7YUFDSjtTQUNGO0tBRUY7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsTUFBc0M7UUFDckQsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFOztZQUN6QixNQUFNLFNBQVMsR0FBRztnQkFDaEIsT0FBTyxFQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTztnQkFDdkMsT0FBTyxFQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTztnQkFDdkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUTtnQkFDeEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUTthQUN6QyxDQUFDOztZQUNGLE1BQU0sT0FBTyxHQUFHLENBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFFLENBQUM7WUFDakUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxLQUFLLFlBQVksWUFBVSxHQUFHLENBQUUsQ0FBQyxFQUFFO2dCQUMxRSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUM1QjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFFLEtBQUssWUFBWSxhQUFXLEdBQUcsQ0FBRSxDQUFDLEVBQUU7Z0JBQ2xGLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN6QjtLQUNGOzs7O0lBd0JELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBQ3pDLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBRSxJQUFJLEtBQUssQ0FBRSxDQUFDLENBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pKLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQztLQUN2RDs7OztJQUVELGtCQUFrQjtRQUNoQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxFQUFFO29CQUNqQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDM0Q7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDekIsQ0FBQyxDQUFDO1NBQ0o7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7OztZQXJTRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLGNBQWM7Z0JBQ25DLG1CQUFtQixFQUFFLEtBQUs7Z0JBQzFCLFVBQVUsRUFBVztvQkFDbkIsT0FBTyxDQUFDLGlCQUFpQixFQUFFO3dCQUN6QixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN2QyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7d0JBQ3pELFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3BDLFVBQVUsQ0FBQyxjQUFjLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQ3BDLENBQUM7d0JBQ0YsVUFBVSxDQUFDLGNBQWMsRUFBRTs0QkFDekIsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDO3lCQUNiLENBQUM7d0JBQ0YsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7NEJBQ3BCLE9BQU8sRUFBVSxDQUFDOzRCQUNsQixTQUFTLEVBQVEsV0FBVzs0QkFDNUIsZUFBZSxFQUFFLE9BQU87eUJBQ3pCLENBQUMsQ0FBQzt3QkFDSCxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzNCLEtBQUssQ0FBQztnQ0FDSixPQUFPLEVBQVUsQ0FBQztnQ0FDbEIsU0FBUyxFQUFRLGFBQWE7Z0NBQzlCLGVBQWUsRUFBRSxPQUFPOzZCQUN6QixDQUFDOzRCQUNGLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQzt5QkFDaEQsQ0FBQzt3QkFDRixVQUFVLENBQUMsZ0JBQWdCLEVBQUU7NEJBQzNCLE9BQU8sQ0FBQyxzQ0FBc0MsRUFBRSxLQUFLLENBQUM7Z0NBQ3BELE9BQU8sRUFBVSxDQUFDO2dDQUNsQixTQUFTLEVBQVEsYUFBYTtnQ0FDOUIsZUFBZSxFQUFFLE9BQU87NkJBQ3pCLENBQUMsQ0FBQzt5QkFDSixDQUFDO3FCQUNILENBQUM7aUJBQ0g7Z0JBQ0QsOGdGQUFrRDt5QkFFaEQ7Ozs7Ozs7Ozs7Ozs7OztLQWVDO2FBRUo7Ozs7WUE1RFEsZUFBZTtZQXpCdEIsaUJBQWlCO1lBd1N1SCxrQkFBa0IsdUJBQXJFLFFBQVEsWUFBSSxRQUFRO1lBalJsRyxtQkFBbUIsdUJBaVJtSSxJQUFJLFlBQUksUUFBUTtZQWxSdEsseUJBQXlCLHVCQWtSbU0sSUFBSSxZQUFJLFFBQVE7Ozt1QkFyTWxQLGVBQWUsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUU7MkJBQ3pELE1BQU07eUJBQ04sU0FBUyxTQUFDLG1CQUFtQjtzQkFDN0IsU0FBUyxTQUFDLFNBQVM7cUJBRW5CLEtBQUs7eUJBVUwsS0FBSztzQ0E2RUwsV0FBVyxTQUFDLGlDQUFpQztzQ0FLN0MsV0FBVyxTQUFDLDZCQUE2Qjt1Q0FLekMsV0FBVyxTQUFDLDBDQUEwQzt5Q0FLdEQsV0FBVyxTQUFDLDRDQUE0QztrQ0FLeEQsV0FBVyxTQUFDLDBDQUEwQztrQ0FLdEQsV0FBVyxTQUFDLHdCQUF3QjswQ0FLcEMsV0FBVyxTQUFDLGlDQUFpQzttQ0FLN0MsV0FBVyxTQUFDLGlDQUFpQztxQ0FLN0MsV0FBVyxTQUFDLG1DQUFtQztpQ0FLL0MsV0FBVyxTQUFDLCtCQUErQjs4QkFLM0MsV0FBVyxTQUFDLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ2RrQ29ubmVjdGVkT3ZlcmxheSwgQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlLCBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3QsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgU2tpcFNlbGYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIG1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQT1NJVElPTl9NQVAgfSBmcm9tICcuLi9jb3JlL292ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbi1tYXAnO1xuaW1wb3J0IHsgdG9Cb29sZWFuIH0gZnJvbSAnLi4vY29yZS91dGlsL2NvbnZlcnQnO1xuaW1wb3J0IHsgTnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4uL2Ryb3Bkb3duL256LWRyb3Bkb3duLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpEcm9wRG93bkNvbXBvbmVudCB9IGZyb20gJy4uL2Ryb3Bkb3duL256LWRyb3Bkb3duLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IE56TWVudURpcmVjdGl2ZSB9IGZyb20gJy4vbnotbWVudS5kaXJlY3RpdmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ1tuei1zdWJtZW51XScsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbXG4gICAgdHJpZ2dlcignZXhwYW5kQW5pbWF0aW9uJywgW1xuICAgICAgc3RhdGUoJ2V4cGFuZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHsgaGVpZ2h0OiAwLCBvdmVyZmxvdzogJ2hpZGRlbicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kID0+IGhpZGRlbicsIGFuaW1hdGUoMTUwKSksXG4gICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gZXhwYW5kJywgYW5pbWF0ZSgxNTApKSxcbiAgICAgIHN0YXRlKCdmYWRlJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2ZhZGUgPT4gdm9pZCcsIFtcbiAgICAgICAgYW5pbWF0ZSgxNTAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAgICAgIF0pLFxuICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBmYWRlJywgW1xuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6ICcwJyB9KSxcbiAgICAgICAgYW5pbWF0ZSgxNTApXG4gICAgICBdKSxcbiAgICAgIHN0YXRlKCdib3R0b20nLCBzdHlsZSh7XG4gICAgICAgIG9wYWNpdHkgICAgICAgIDogMSxcbiAgICAgICAgdHJhbnNmb3JtICAgICAgOiAnc2NhbGVZKDEpJyxcbiAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgMCUnXG4gICAgICB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGJvdHRvbScsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHkgICAgICAgIDogMCxcbiAgICAgICAgICB0cmFuc2Zvcm0gICAgICA6ICdzY2FsZVkoMC44KScsXG4gICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgMCUnXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKCcxNTBtcyBjdWJpYy1iZXppZXIoMC4yMywgMSwgMC4zMiwgMSknKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCdib3R0b20gPT4gdm9pZCcsIFtcbiAgICAgICAgYW5pbWF0ZSgnMTUwbXMgY3ViaWMtYmV6aWVyKDAuMjMsIDEsIDAuMzIsIDEpJywgc3R5bGUoe1xuICAgICAgICAgIG9wYWNpdHkgICAgICAgIDogMCxcbiAgICAgICAgICB0cmFuc2Zvcm0gICAgICA6ICdzY2FsZVkoMC44KScsXG4gICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnMCUgMCUnXG4gICAgICAgIH0pKVxuICAgICAgXSlcbiAgICBdKVxuICBdLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zdWJtZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzICAgICAgICAgICAgIDogW1xuICAgIGBcbiAgICAgIC5hbnQtbWVudS1zdWJtZW51LXBsYWNlbWVudC1ib3R0b21MZWZ0IHtcbiAgICAgICAgdG9wOiA2cHg7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLmFudC1tZW51LXN1Ym1lbnUtcGxhY2VtZW50LXJpZ2h0VG9wIHtcbiAgICAgICAgbGVmdDogNHB4O1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB9XG5cbiAgICAgIC5hbnQtbWVudS1zdWJtZW51LXBsYWNlbWVudC1sZWZ0VG9wIHtcbiAgICAgICAgcmlnaHQ6IDRweDtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcblxuZXhwb3J0IGNsYXNzIE56U3ViTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlckNvbnRlbnRJbml0IHtcbiAgcHJpdmF0ZSBfb3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlICRtb3VzZVN1YmplY3QgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBwcml2YXRlIHVuc3Vic2NyaWJlJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcGxhY2VtZW50ID0gJ3JpZ2h0VG9wJztcbiAgJHN1Yk9wZW4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgaXNJbkRyb3BEb3duID0gZmFsc2U7XG4gIGlzSW5TdWJNZW51ID0gZmFsc2U7XG4gIGxldmVsID0gMTtcbiAgdHJpZ2dlcldpZHRoID0gbnVsbDtcbiAgQENvbnRlbnRDaGlsZHJlbihOelN1Yk1lbnVDb21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSkgc3ViTWVudXM6IFF1ZXJ5TGlzdDxOelN1Yk1lbnVDb21wb25lbnQ+O1xuICBAT3V0cHV0KCkgbnpPcGVuQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoQ2RrQ29ubmVjdGVkT3ZlcmxheSkgY2RrT3ZlcmxheTogQ2RrQ29ubmVjdGVkT3ZlcmxheTtcbiAgQFZpZXdDaGlsZCgndHJpZ2dlcicpIHRyaWdnZXI6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KClcbiAgc2V0IG56T3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX29wZW4gPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIHRoaXMuc2V0VHJpZ2dlcldpZHRoKCk7XG4gIH1cblxuICBnZXQgbnpPcGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vcGVuO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cblxuICBnZXQgc3ViSXRlbVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubnpNZW51RGlyZWN0aXZlLm1lbnVJdGVtcy5maW5kKGUgPT4gZS5uelNlbGVjdGVkICYmIGUubnpTdWJNZW51Q29tcG9uZW50ID09PSB0aGlzKTtcbiAgfVxuXG4gIGdldCBzdWJtZW51U2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zdWJNZW51cy50b0FycmF5KCkuZmluZChlID0+IGUgIT09IHRoaXMgJiYgZS5zdWJJdGVtU2VsZWN0ZWQpO1xuICB9XG5cbiAgZ2V0IGV4cGFuZFN0YXRlKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMubnpPcGVuICYmIHRoaXMuc3ViTWVudU1vZGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICByZXR1cm4gJ2V4cGFuZCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLm56T3BlbiAmJiB0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHJldHVybiAnYm90dG9tJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubnpPcGVuICYmIHRoaXMuc3ViTWVudU1vZGUgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiAnZmFkZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnaGlkZGVuJztcbiAgICB9XG4gIH1cblxuICBnZXQgb3ZlcmxheVBvc2l0aW9ucygpOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyW10ge1xuICAgIGlmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHJldHVybiBbIFBPU0lUSU9OX01BUC5ib3R0b21MZWZ0IF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbIFBPU0lUSU9OX01BUC5yaWdodFRvcCwgUE9TSVRJT05fTUFQLmxlZnRUb3AgXTtcbiAgICB9XG4gIH1cblxuICBjbGlja1N1Yk1lbnVUaXRsZSgkZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaW5saW5lJykgJiYgKCF0aGlzLmlzSW5Ecm9wRG93bikpIHtcbiAgICAgIHRoaXMubnpPcGVuID0gIXRoaXMubnpPcGVuO1xuICAgICAgdGhpcy5uek9wZW5DaGFuZ2UuZW1pdCh0aGlzLm56T3Blbik7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tTdWJNZW51RHJvcERvd24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbkRyb3BEb3duIHx8ICh0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKSB8fCAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKSkge1xuICAgICAgdGhpcy4kbW91c2VTdWJqZWN0Lm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdWJNZW51TW9kZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLm56TWVudURpcmVjdGl2ZS5uek1vZGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICByZXR1cm4gJ2lubGluZSc7XG4gICAgfSBlbHNlIGlmICgodGhpcy5uek1lbnVEaXJlY3RpdmUubnpNb2RlID09PSAndmVydGljYWwnKSB8fCAodGhpcy5pc0luU3ViTWVudSkpIHtcbiAgICAgIHJldHVybiAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ2hvcml6b250YWwnO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VFbnRlckV2ZW50KGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoKHRoaXMuc3ViTWVudU1vZGUgPT09ICdob3Jpem9udGFsJykgfHwgKHRoaXMuc3ViTWVudU1vZGUgPT09ICd2ZXJ0aWNhbCcpIHx8IHRoaXMuaXNJbkRyb3BEb3duKSB7XG4gICAgICB0aGlzLiRtb3VzZVN1YmplY3QubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlTGVhdmVFdmVudChlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpIHx8ICh0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKSB8fCB0aGlzLmlzSW5Ecm9wRG93bikge1xuICAgICAgdGhpcy4kbW91c2VTdWJqZWN0Lm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudScpXG4gIGdldCBzZXREcm9wRG93blN1Ym1lbnVDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc0luRHJvcERvd247XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtb3BlbicpXG4gIGdldCBzZXRNZW51U3VibWVudU9wZW5DbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCF0aGlzLmlzSW5Ecm9wRG93bikgJiYgKHRoaXMubnpPcGVuKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS12ZXJ0aWNhbCcpXG4gIGdldCBzZXREcm9wRG93blZlcnRpY2FsQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNJbkRyb3BEb3duICYmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1ob3Jpem9udGFsJylcbiAgZ2V0IHNldERyb3BEb3duSG9yaXpvbnRhbENsYXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5Ecm9wRG93biAmJiAodGhpcy5zdWJNZW51TW9kZSA9PT0gJ2hvcml6b250YWwnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LWRyb3Bkb3duLW1lbnUtc3VibWVudS1kaXNhYmxlZCcpXG4gIGdldCBzZXREcm9wRG93bkRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzSW5Ecm9wRG93biAmJiB0aGlzLm56RGlzYWJsZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LXN1Ym1lbnUnKVxuICBnZXQgc2V0TWVudVN1Ym1lbnVDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaXNJbkRyb3BEb3duO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51LXNlbGVjdGVkJylcbiAgZ2V0IHNldE1lbnVTdWJtZW51U2VsZWN0ZWRDbGFzcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdWJtZW51U2VsZWN0ZWQgfHwgdGhpcy5zdWJJdGVtU2VsZWN0ZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtdmVydGljYWwnKVxuICBnZXQgc2V0TWVudVZlcnRpY2FsQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5pc0luRHJvcERvd24pICYmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAndmVydGljYWwnKTtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYW50LW1lbnUtc3VibWVudS1ob3Jpem9udGFsJylcbiAgZ2V0IHNldE1lbnVIb3Jpem9udGFsQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5pc0luRHJvcERvd24pICYmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaG9yaXpvbnRhbCcpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtbWVudS1zdWJtZW51LWlubGluZScpXG4gIGdldCBzZXRNZW51SW5saW5lQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5pc0luRHJvcERvd24pICYmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaW5saW5lJyk7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFudC1tZW51LXN1Ym1lbnUtZGlzYWJsZWQnKVxuICBnZXQgc2V0TWVudURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuaXNJbkRyb3BEb3duKSAmJiB0aGlzLm56RGlzYWJsZWQ7XG4gIH1cblxuICBzZXRUcmlnZ2VyV2lkdGgoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3ViTWVudU1vZGUgPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy50cmlnZ2VyV2lkdGggPSB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgIC8qKiBzaG91bGQgcmVtb3ZlIGFmdGVyIGFmdGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzg3NjUgbWVyZ2VkICoqL1xuICAgICAgaWYgKHRoaXMuY2RrT3ZlcmxheSAmJiB0aGlzLmNka092ZXJsYXkub3ZlcmxheVJlZikge1xuICAgICAgICB0aGlzLmNka092ZXJsYXkub3ZlcmxheVJlZi51cGRhdGVTaXplKHtcbiAgICAgICAgICB3aWR0aDogdGhpcy50cmlnZ2VyV2lkdGhcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBvblBvc2l0aW9uQ2hhbmdlKCRldmVudDogQ29ubmVjdGVkT3ZlcmxheVBvc2l0aW9uQ2hhbmdlKTogdm9pZCB7XG4gICAgaWYgKCRldmVudC5jb25uZWN0aW9uUGFpcikge1xuICAgICAgY29uc3Qgb3JpZ2luTWFwID0ge1xuICAgICAgICBvcmlnaW5YIDogJGV2ZW50LmNvbm5lY3Rpb25QYWlyLm9yaWdpblgsXG4gICAgICAgIG9yaWdpblkgOiAkZXZlbnQuY29ubmVjdGlvblBhaXIub3JpZ2luWSxcbiAgICAgICAgb3ZlcmxheVg6ICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WCxcbiAgICAgICAgb3ZlcmxheVk6ICRldmVudC5jb25uZWN0aW9uUGFpci5vdmVybGF5WVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGtleUxpc3QgPSBbICdvcmlnaW5YJywgJ29yaWdpblknLCAnb3ZlcmxheVgnLCAnb3ZlcmxheVknIF07XG4gICAgICBpZiAoa2V5TGlzdC5ldmVyeShrZXkgPT4gb3JpZ2luTWFwWyBrZXkgXSA9PT0gUE9TSVRJT05fTUFQLmxlZnRUb3BbIGtleSBdKSkge1xuICAgICAgICB0aGlzLnBsYWNlbWVudCA9ICdsZWZ0VG9wJztcbiAgICAgIH0gZWxzZSBpZiAoa2V5TGlzdC5ldmVyeShrZXkgPT4gb3JpZ2luTWFwWyBrZXkgXSA9PT0gUE9TSVRJT05fTUFQLnJpZ2h0VG9wWyBrZXkgXSkpIHtcbiAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSAncmlnaHRUb3AnO1xuICAgICAgfVxuICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlT3BlbkV2ZW50ID0gKGRhdGE6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAodGhpcy5uekRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm56T3BlbiAhPT0gZGF0YSkge1xuICAgICAgdGhpcy5uek9wZW4gPSBkYXRhO1xuICAgICAgdGhpcy5uek9wZW5DaGFuZ2UuZW1pdCh0aGlzLm56T3Blbik7XG4gICAgfVxuICAgIGlmICh0aGlzLm56U3ViTWVudUNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uelN1Yk1lbnVDb21wb25lbnQuJHN1Yk9wZW4ubmV4dCh0aGlzLm56T3Blbik7XG4gICAgfVxuICAgIGlmICh0aGlzLm56RHJvcERvd25Db21wb25lbnQpIHtcbiAgICAgIHRoaXMubnpEcm9wRG93bkNvbXBvbmVudC4kc3ViT3Blbi5uZXh0KHRoaXMubnpPcGVuKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudCkge1xuICAgICAgdGhpcy5uekRyb3BEb3duQnV0dG9uQ29tcG9uZW50LiRzdWJPcGVuLm5leHQodGhpcy5uek9wZW4pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuek1lbnVEaXJlY3RpdmU6IE56TWVudURpcmVjdGl2ZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBTa2lwU2VsZigpIEBPcHRpb25hbCgpIHByaXZhdGUgbnpTdWJNZW51Q29tcG9uZW50OiBOelN1Yk1lbnVDb21wb25lbnQsIEBIb3N0KCkgQE9wdGlvbmFsKCkgcHJpdmF0ZSBuekRyb3BEb3duQ29tcG9uZW50OiBOekRyb3BEb3duQ29tcG9uZW50LCBASG9zdCgpIEBPcHRpb25hbCgpIHByaXZhdGUgbnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudDogTnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudCkge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uek1lbnVEaXJlY3RpdmUuc3ViTWVudXMucHVzaCh0aGlzKTtcbiAgICBjb25zdCAkY29tYmluZUFsbCA9IGNvbWJpbmVMYXRlc3QodGhpcy4kc3ViT3BlbiwgdGhpcy4kbW91c2VTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpKS5waXBlKG1hcCh2YWx1ZSA9PiB2YWx1ZVsgMCBdIHx8IHZhbHVlWyAxIF0pLCBhdWRpdFRpbWUoMTUwKSk7XG4gICAgJGNvbWJpbmVBbGwucGlwZSh0YWtlVW50aWwodGhpcy51bnN1YnNjcmliZSQpKS5zdWJzY3JpYmUodGhpcy5oYW5kbGVPcGVuRXZlbnQpO1xuICAgIHRoaXMuaXNJbkRyb3BEb3duID0gdGhpcy5uek1lbnVEaXJlY3RpdmUubnpJbkRyb3BEb3duO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1Yk1lbnVzICYmIHRoaXMuc3ViTWVudXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1Yk1lbnVzLmZpbHRlcih4ID0+IHggIT09IHRoaXMpLmZvckVhY2gobWVudSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN1Yk1lbnVNb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gbWVudS5sZXZlbCA9IHRoaXMubGV2ZWwgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBtZW51LmlzSW5TdWJNZW51ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMudW5zdWJzY3JpYmUkLm5leHQoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlJC5jb21wbGV0ZSgpO1xuICB9XG59XG4iXX0=