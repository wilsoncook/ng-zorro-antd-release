/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Injector, Input, Optional, Output, Renderer2, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { NzScrollStrategyOptions } from '../core/overlay/scroll/nz-scroll-strategy-options';
import { toCssPixel, InputBoolean } from '../core/util/convert';
import { NzDrawerRef } from './nz-drawer-ref';
/** @type {?} */
export var DRAWER_ANIMATE_DURATION = 300;
/**
 * @template T, R, D
 */
var NzDrawerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NzDrawerComponent, _super);
    function NzDrawerComponent(
    // tslint:disable-next-line:no-any
    document, renderer, overlay, elementRef, injector, changeDetectorRef, focusTrapFactory, nzScrollStrategyOptions, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.renderer = renderer;
        _this.overlay = overlay;
        _this.elementRef = elementRef;
        _this.injector = injector;
        _this.changeDetectorRef = changeDetectorRef;
        _this.focusTrapFactory = focusTrapFactory;
        _this.nzScrollStrategyOptions = nzScrollStrategyOptions;
        _this.viewContainerRef = viewContainerRef;
        _this.isOpen = false;
        _this.templateContext = {
            $implicit: undefined,
            drawerRef: /** @type {?} */ (_this)
        };
        _this.nzClosable = true;
        _this.nzMaskClosable = true;
        _this.nzMask = true;
        _this.nzPlacement = 'right';
        _this.nzMaskStyle = {};
        _this.nzBodyStyle = {};
        _this.nzWidth = 256;
        _this.nzHeight = 256;
        _this.nzZIndex = 1000;
        _this.nzOffsetX = 0;
        _this.nzOffsetY = 0;
        _this.nzOnViewInit = new EventEmitter();
        _this.nzOnClose = new EventEmitter();
        _this.nzAfterOpen = new Subject();
        _this.nzAfterClose = new Subject();
        return _this;
    }
    Object.defineProperty(NzDrawerComponent.prototype, "transform", {
        get: /**
         * @return {?}
         */
        function () {
            switch (this.nzPlacement) {
                case 'left':
                    return this.isOpen ? "translateX(" + this.nzOffsetX + "px)" : "translateX(-" + this.width + ")";
                case 'right':
                    return this.isOpen ? "translateX(-" + this.nzOffsetX + "px)" : "translateX(" + this.width + ")";
                case 'top':
                    return this.isOpen ? "translateY(" + this.nzOffsetY + "px)" : "translateY(-" + this.height + ")";
                case 'bottom':
                    return this.isOpen ? "translateY(-" + this.nzOffsetY + "px)" : "translateY(" + this.height + ")";
                default:
                    return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "isLeftOrRight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzPlacement === 'left' || this.nzPlacement === 'right';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "nzVisible", {
        get: /**
         * @return {?}
         */
        function () {
            return this.isOpen;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "afterOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzAfterOpen.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzDrawerComponent.prototype, "afterClose", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzAfterClose.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NzDrawerComponent.prototype.isNonEmptyString = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return typeof value === 'string' && value !== '';
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzDrawerComponent.prototype.isTemplateRef = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value instanceof TemplateRef;
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.attachOverlay();
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.templateContext = { $implicit: this.nzContentParams, drawerRef: /** @type {?} */ (this) };
        this.changeDetectorRef.detectChanges();
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.attachBodyContent();
        setTimeout(function () {
            _this.nzOnViewInit.emit();
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.hasOwnProperty('nzVisible')) {
            /** @type {?} */
            var value = changes["nzVisible"].currentValue;
            this.updateOverlayStyle();
            if (value) {
                this.updateBodyOverflow();
                this.savePreviouslyFocusedElement();
                this.trapFocus();
            }
            else {
                setTimeout(function () {
                    _this.updateBodyOverflow();
                    _this.restoreFocus();
                }, DRAWER_ANIMATE_DURATION);
            }
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.disposeOverlay();
    };
    /**
     * @param {?=} result
     * @return {?}
     */
    NzDrawerComponent.prototype.close = /**
     * @param {?=} result
     * @return {?}
     */
    function (result) {
        var _this = this;
        this.isOpen = false;
        this.updateOverlayStyle();
        this.changeDetectorRef.detectChanges();
        setTimeout(function () {
            _this.updateBodyOverflow();
            _this.restoreFocus();
            _this.nzAfterClose.next(result);
            _this.nzAfterClose.complete();
        }, DRAWER_ANIMATE_DURATION);
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.isOpen = true;
        this.updateOverlayStyle();
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
        this.changeDetectorRef.detectChanges();
        setTimeout(function () {
            _this.nzAfterOpen.next();
        }, DRAWER_ANIMATE_DURATION);
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.closeClick = /**
     * @return {?}
     */
    function () {
        this.nzOnClose.emit();
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.maskClick = /**
     * @return {?}
     */
    function () {
        if (this.nzMaskClosable && this.nzMask) {
            this.nzOnClose.emit();
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.attachBodyContent = /**
     * @return {?}
     */
    function () {
        this.bodyPortalOutlet.dispose();
        if (this.nzContent instanceof Type) {
            /** @type {?} */
            var childInjector = new PortalInjector(this.injector, new WeakMap([[NzDrawerRef, this]]));
            /** @type {?} */
            var componentPortal = new ComponentPortal(this.nzContent, null, childInjector);
            /** @type {?} */
            var componentRef = this.bodyPortalOutlet.attachComponentPortal(componentPortal);
            if (this.nzContentParams) {
                Object.assign(componentRef.instance, this.nzContentParams);
            }
            componentRef.changeDetectorRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.attachOverlay = /**
     * @return {?}
     */
    function () {
        if (!this.overlayRef) {
            this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
            this.overlayRef = this.overlay.create(this.getOverlayConfig());
        }
        if (this.overlayRef && !this.overlayRef.hasAttached()) {
            this.overlayRef.attach(this.portal);
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.disposeOverlay = /**
     * @return {?}
     */
    function () {
        this.overlayRef.dispose();
        this.overlayRef = null;
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.getOverlayConfig = /**
     * @return {?}
     */
    function () {
        return new OverlayConfig({
            scrollStrategy: this.nzScrollStrategyOptions.block()
        });
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.updateOverlayStyle = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef && this.overlayRef.overlayElement) {
            this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.updateBodyOverflow = /**
     * @return {?}
     */
    function () {
        if (this.overlayRef) {
            if (this.isOpen) {
                this.overlayRef.getConfig().scrollStrategy.enable();
            }
            else {
                this.overlayRef.getConfig().scrollStrategy.disable();
            }
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.savePreviouslyFocusedElement = /**
     * @return {?}
     */
    function () {
        if (this.document) {
            this.previouslyFocusedElement = /** @type {?} */ (this.document.activeElement);
            this.previouslyFocusedElement.blur();
        }
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.trapFocus = /**
     * @return {?}
     */
    function () {
        if (!this.focusTrap) {
            this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
        }
        this.focusTrap.focusInitialElementWhenReady();
    };
    /**
     * @return {?}
     */
    NzDrawerComponent.prototype.restoreFocus = /**
     * @return {?}
     */
    function () {
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
        }
        if (this.focusTrap) {
            this.focusTrap.destroy();
        }
    };
    NzDrawerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-drawer',
                    template: "<ng-template #drawerTemplate>\n  <div\n    class=\"ant-drawer\"\n    [class.ant-drawer-open]=\"isOpen\"\n    [class.ant-drawer-top]=\"nzPlacement === 'top'\"\n    [class.ant-drawer-bottom]=\"nzPlacement === 'bottom'\"\n    [class.ant-drawer-right]=\"nzPlacement === 'right'\"\n    [class.ant-drawer-left]=\"nzPlacement === 'left'\">\n    <div  class=\"ant-drawer-mask\" (click)=\"maskClick()\" *ngIf=\"nzMask\" [style.zIndex]=\"nzZIndex\" [ngStyle]=\"nzMaskStyle\"></div>\n    <div class=\"ant-drawer-content-wrapper {{ nzWrapClassName }}\"\n         [style.zIndex]=\"nzZIndex\"\n         [style.width]=\"width\"\n         [style.height]=\"height\"\n         [style.transform]=\"transform\">\n      <div class=\"ant-drawer-content\">\n        <div class=\"ant-drawer-wrapper-body\"\n          [style.overflow]=\"isLeftOrRight ? 'auto' : null\"\n          [style.height]=\"isLeftOrRight ? '100%' : null\">\n          <div *ngIf=\"nzTitle\" class=\"ant-drawer-header\">\n            <div class=\"ant-drawer-title\">\n              <ng-container [ngSwitch]=\"true\">\n                <ng-container *ngSwitchCase=\"isTemplateRef(nzTitle)\" [ngTemplateOutlet]=\"nzTitle\"></ng-container>\n                <ng-container *ngSwitchCase=\"isNonEmptyString(nzTitle)\"><div [innerHTML]=\"nzTitle\"></div></ng-container>\n              </ng-container>\n            </div>\n          </div>\n          <button *ngIf=\"nzClosable\" (click)=\"closeClick()\" aria-label=\"Close\" class=\"ant-drawer-close\"><span class=\"ant-drawer-close-x\"></span></button>\n          <div class=\"ant-drawer-body\" [ngStyle]=\"nzBodyStyle\">\n            <ng-template cdkPortalOutlet></ng-template>\n            <ng-container *ngIf=\"isTemplateRef(nzContent)\">\n              <ng-container *ngTemplateOutlet=\"nzContent; context: templateContext\"></ng-container>\n            </ng-container>\n            <ng-content *ngIf=\"!nzContent\"></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>",
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    NzDrawerComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
        { type: Renderer2 },
        { type: Overlay },
        { type: ElementRef },
        { type: Injector },
        { type: ChangeDetectorRef },
        { type: FocusTrapFactory },
        { type: NzScrollStrategyOptions },
        { type: ViewContainerRef }
    ]; };
    NzDrawerComponent.propDecorators = {
        drawerTemplate: [{ type: ViewChild, args: ['drawerTemplate',] }],
        contentTemplate: [{ type: ViewChild, args: ['contentTemplate',] }],
        bodyPortalOutlet: [{ type: ViewChild, args: [CdkPortalOutlet,] }],
        nzContent: [{ type: Input }],
        nzClosable: [{ type: Input }],
        nzMaskClosable: [{ type: Input }],
        nzMask: [{ type: Input }],
        nzTitle: [{ type: Input }],
        nzPlacement: [{ type: Input }],
        nzMaskStyle: [{ type: Input }],
        nzBodyStyle: [{ type: Input }],
        nzWrapClassName: [{ type: Input }],
        nzWidth: [{ type: Input }],
        nzHeight: [{ type: Input }],
        nzZIndex: [{ type: Input }],
        nzOffsetX: [{ type: Input }],
        nzOffsetY: [{ type: Input }],
        nzVisible: [{ type: Input }],
        nzOnViewInit: [{ type: Output }],
        nzOnClose: [{ type: Output }]
    };
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Object)
    ], NzDrawerComponent.prototype, "nzClosable", void 0);
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Object)
    ], NzDrawerComponent.prototype, "nzMaskClosable", void 0);
    tslib_1.__decorate([
        InputBoolean(),
        tslib_1.__metadata("design:type", Object)
    ], NzDrawerComponent.prototype, "nzMask", void 0);
    return NzDrawerComponent;
}(NzDrawerRef));
export { NzDrawerComponent };
function NzDrawerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzDrawerComponent.prototype.previouslyFocusedElement;
    /** @type {?} */
    NzDrawerComponent.prototype.nzContentParams;
    /** @type {?} */
    NzDrawerComponent.prototype.overlayRef;
    /** @type {?} */
    NzDrawerComponent.prototype.portal;
    /** @type {?} */
    NzDrawerComponent.prototype.focusTrap;
    /** @type {?} */
    NzDrawerComponent.prototype.isOpen;
    /** @type {?} */
    NzDrawerComponent.prototype.templateContext;
    /** @type {?} */
    NzDrawerComponent.prototype.drawerTemplate;
    /** @type {?} */
    NzDrawerComponent.prototype.contentTemplate;
    /** @type {?} */
    NzDrawerComponent.prototype.bodyPortalOutlet;
    /** @type {?} */
    NzDrawerComponent.prototype.nzContent;
    /** @type {?} */
    NzDrawerComponent.prototype.nzClosable;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMaskClosable;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMask;
    /** @type {?} */
    NzDrawerComponent.prototype.nzTitle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzPlacement;
    /** @type {?} */
    NzDrawerComponent.prototype.nzMaskStyle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzBodyStyle;
    /** @type {?} */
    NzDrawerComponent.prototype.nzWrapClassName;
    /** @type {?} */
    NzDrawerComponent.prototype.nzWidth;
    /** @type {?} */
    NzDrawerComponent.prototype.nzHeight;
    /** @type {?} */
    NzDrawerComponent.prototype.nzZIndex;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOffsetX;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOffsetY;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOnViewInit;
    /** @type {?} */
    NzDrawerComponent.prototype.nzOnClose;
    /** @type {?} */
    NzDrawerComponent.prototype.nzAfterOpen;
    /** @type {?} */
    NzDrawerComponent.prototype.nzAfterClose;
    /** @type {?} */
    NzDrawerComponent.prototype.document;
    /** @type {?} */
    NzDrawerComponent.prototype.renderer;
    /** @type {?} */
    NzDrawerComponent.prototype.overlay;
    /** @type {?} */
    NzDrawerComponent.prototype.elementRef;
    /** @type {?} */
    NzDrawerComponent.prototype.injector;
    /** @type {?} */
    NzDrawerComponent.prototype.changeDetectorRef;
    /** @type {?} */
    NzDrawerComponent.prototype.focusTrapFactory;
    /** @type {?} */
    NzDrawerComponent.prototype.nzScrollStrategyOptions;
    /** @type {?} */
    NzDrawerComponent.prototype.viewContainerRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJkcmF3ZXIvbnotZHJhd2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sUUFBUSxFQUNSLEtBQUssRUFJTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsSUFBSSxFQUNKLFNBQVMsRUFDVCxnQkFBZ0IsRUFDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFhLGdCQUFnQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkcsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWhFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFOUMsV0FBYSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7Ozs7O0lBU3VCLDZDQUFjO0lBd0Y5RTs7SUFFd0MsUUFBYSxFQUMzQyxVQUNBLFNBQ0EsWUFDQSxVQUNBLG1CQUNBLGtCQUNBLHlCQUNBO1FBVlYsWUFXRSxpQkFBTyxTQUNSO1FBVnVDLGNBQVEsR0FBUixRQUFRLENBQUs7UUFD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QkFDTCxLQUFLOzRCQUVMLEtBQUs7K0JBU0wsTUFBTTs0QkFDTixNQUFNOzs7UUF4QkcsWUFBWSxFQUFFOzs7O1FBQ2QsWUFBWSxFQUFFOzs7O1FBQ2QsWUFBWSxFQUFFOzs7NEJBMUYxQjtFQTRDa0UsV0FBVztTQUFoRSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGb2N1c1RyYXAsIEZvY3VzVHJhcEZhY3RvcnkgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0LCBDb21wb25lbnRQb3J0YWwsIFBvcnRhbEluamVjdG9yLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IE56U2Nyb2xsU3RyYXRlZ3lPcHRpb25zIH0gZnJvbSAnLi4vY29yZS9vdmVybGF5L3Njcm9sbC9uei1zY3JvbGwtc3RyYXRlZ3ktb3B0aW9ucyc7XG5pbXBvcnQgeyB0b0Nzc1BpeGVsLCBJbnB1dEJvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5pbXBvcnQgeyBOekRyYXdlck9wdGlvbnMsIE56RHJhd2VyUGxhY2VtZW50IH0gZnJvbSAnLi9uei1kcmF3ZXItb3B0aW9ucyc7XG5pbXBvcnQgeyBOekRyYXdlclJlZiB9IGZyb20gJy4vbnotZHJhd2VyLXJlZic7XG5cbmV4cG9ydCBjb25zdCBEUkFXRVJfQU5JTUFURV9EVVJBVElPTiA9IDMwMDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgICAgICAgICA6ICduei1kcmF3ZXInLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1kcmF3ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uICAgIDogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuZXhwb3J0IGNsYXNzIE56RHJhd2VyQ29tcG9uZW50PFQgPSBhbnksIFIgPSBhbnksIEQgPSBhbnk+IGV4dGVuZHMgTnpEcmF3ZXJSZWY8Uj4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBOekRyYXdlck9wdGlvbnMge1xuICBwcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBuekNvbnRlbnRQYXJhbXM6IEQ7IC8vIG9ubHkgc2VydmljZVxuICBvdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuICBwb3J0YWw6IFRlbXBsYXRlUG9ydGFsO1xuICBmb2N1c1RyYXA6IEZvY3VzVHJhcDtcbiAgaXNPcGVuID0gZmFsc2U7XG4gIHRlbXBsYXRlQ29udGV4dDogeyAkaW1wbGljaXQ6IEQ7IGRyYXdlclJlZjogTnpEcmF3ZXJSZWY8Uj4gfSA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBkcmF3ZXJSZWY6IHRoaXMgYXMgTnpEcmF3ZXJSZWY8Uj5cbiAgfTtcblxuICBnZXQgdHJhbnNmb3JtKCk6IHN0cmluZyB7XG5cbiAgICBzd2l0Y2ggKHRoaXMubnpQbGFjZW1lbnQpIHtcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4gPyBgdHJhbnNsYXRlWCgke3RoaXMubnpPZmZzZXRYfXB4KWAgOiBgdHJhbnNsYXRlWCgtJHt0aGlzLndpZHRofSlgO1xuICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4gPyBgdHJhbnNsYXRlWCgtJHt0aGlzLm56T2Zmc2V0WH1weClgIDogYHRyYW5zbGF0ZVgoJHt0aGlzLndpZHRofSlgO1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNPcGVuID8gYHRyYW5zbGF0ZVkoJHt0aGlzLm56T2Zmc2V0WX1weClgIDogYHRyYW5zbGF0ZVkoLSR7dGhpcy5oZWlnaHR9KWA7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICByZXR1cm4gdGhpcy5pc09wZW4gPyBgdHJhbnNsYXRlWSgtJHt0aGlzLm56T2Zmc2V0WX1weClgIDogYHRyYW5zbGF0ZVkoJHt0aGlzLmhlaWdodH0pYDtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBnZXQgd2lkdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0xlZnRPclJpZ2h0ID8gdG9Dc3NQaXhlbCh0aGlzLm56V2lkdGgpIDogbnVsbDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gIXRoaXMuaXNMZWZ0T3JSaWdodCA/IHRvQ3NzUGl4ZWwodGhpcy5uekhlaWdodCkgOiBudWxsO1xuICB9XG5cbiAgZ2V0IGlzTGVmdE9yUmlnaHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubnpQbGFjZW1lbnQgPT09ICdsZWZ0JyB8fCB0aGlzLm56UGxhY2VtZW50ID09PSAncmlnaHQnO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgnZHJhd2VyVGVtcGxhdGUnKSBkcmF3ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8e30+O1xuICBAVmlld0NoaWxkKCdjb250ZW50VGVtcGxhdGUnKSBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPHt9PjtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQpIGJvZHlQb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcbiAgQElucHV0KCkgbnpDb250ZW50OiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogRCwgZHJhd2VyUmVmOiBOekRyYXdlclJlZjxSPiB9PiB8IFR5cGU8VD47XG4gIEBJbnB1dCgpIEBJbnB1dEJvb2xlYW4oKSBuekNsb3NhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TWFza0Nsb3NhYmxlID0gdHJ1ZTtcbiAgQElucHV0KCkgQElucHV0Qm9vbGVhbigpIG56TWFzayA9IHRydWU7XG4gIEBJbnB1dCgpIG56VGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHt9PjtcbiAgQElucHV0KCkgbnpQbGFjZW1lbnQ6IE56RHJhd2VyUGxhY2VtZW50ID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgbnpNYXNrU3R5bGU6IG9iamVjdCA9IHt9O1xuICBASW5wdXQoKSBuekJvZHlTdHlsZTogb2JqZWN0ID0ge307XG4gIEBJbnB1dCgpIG56V3JhcENsYXNzTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBueldpZHRoOiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56SGVpZ2h0OiBudW1iZXIgfCBzdHJpbmcgPSAyNTY7XG4gIEBJbnB1dCgpIG56WkluZGV4ID0gMTAwMDtcbiAgQElucHV0KCkgbnpPZmZzZXRYID0gMDtcbiAgQElucHV0KCkgbnpPZmZzZXRZID0gMDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpWaXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5pc09wZW4gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBuelZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xuICB9XG5cbiAgQE91dHB1dCgpIG56T25WaWV3SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG56T25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4oKTtcbiAgbnpBZnRlck9wZW4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBuekFmdGVyQ2xvc2UgPSBuZXcgU3ViamVjdDxSPigpO1xuXG4gIGdldCBhZnRlck9wZW4oKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMubnpBZnRlck9wZW4uYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgYWZ0ZXJDbG9zZSgpOiBPYnNlcnZhYmxlPFI+IHtcbiAgICByZXR1cm4gdGhpcy5uekFmdGVyQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBpc05vbkVtcHR5U3RyaW5nKHZhbHVlOiB7fSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlICE9PSAnJztcbiAgfVxuXG4gIGlzVGVtcGxhdGVSZWYodmFsdWU6IHt9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIG92ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgZm9jdXNUcmFwRmFjdG9yeTogRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBwcml2YXRlIG56U2Nyb2xsU3RyYXRlZ3lPcHRpb25zOiBOelNjcm9sbFN0cmF0ZWd5T3B0aW9ucyxcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hdHRhY2hPdmVybGF5KCk7XG4gICAgdGhpcy51cGRhdGVPdmVybGF5U3R5bGUoKTtcbiAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xuICAgIHRoaXMudGVtcGxhdGVDb250ZXh0ID0geyAkaW1wbGljaXQ6IHRoaXMubnpDb250ZW50UGFyYW1zLCBkcmF3ZXJSZWY6IHRoaXMgYXMgTnpEcmF3ZXJSZWY8Uj4gfTtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaEJvZHlDb250ZW50KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLm56T25WaWV3SW5pdC5lbWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ256VmlzaWJsZScpKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGNoYW5nZXMubnpWaXNpYmxlLmN1cnJlbnRWYWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlT3ZlcmxheVN0eWxlKCk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICAgICAgdGhpcy5zYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCk7XG4gICAgICAgIHRoaXMudHJhcEZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUJvZHlPdmVyZmxvdygpO1xuICAgICAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gICAgICAgIH0sIERSQVdFUl9BTklNQVRFX0RVUkFUSU9OKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3Bvc2VPdmVybGF5KCk7XG4gIH1cblxuICBjbG9zZShyZXN1bHQ/OiBSKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnVwZGF0ZU92ZXJsYXlTdHlsZSgpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gICAgICB0aGlzLm56QWZ0ZXJDbG9zZS5uZXh0KHJlc3VsdCk7XG4gICAgICB0aGlzLm56QWZ0ZXJDbG9zZS5jb21wbGV0ZSgpO1xuICAgIH0sIERSQVdFUl9BTklNQVRFX0RVUkFUSU9OKTtcbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlT3ZlcmxheVN0eWxlKCk7XG4gICAgdGhpcy51cGRhdGVCb2R5T3ZlcmZsb3coKTtcbiAgICB0aGlzLnNhdmVQcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQoKTtcbiAgICB0aGlzLnRyYXBGb2N1cygpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uekFmdGVyT3Blbi5uZXh0KCk7XG4gICAgfSwgRFJBV0VSX0FOSU1BVEVfRFVSQVRJT04pO1xuICB9XG5cbiAgY2xvc2VDbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLm56T25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICBtYXNrQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubnpNYXNrQ2xvc2FibGUgJiYgdGhpcy5uek1hc2spIHtcbiAgICAgIHRoaXMubnpPbkNsb3NlLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEJvZHlDb250ZW50KCk6IHZvaWQge1xuICAgIHRoaXMuYm9keVBvcnRhbE91dGxldC5kaXNwb3NlKCk7XG5cbiAgICBpZiAodGhpcy5uekNvbnRlbnQgaW5zdGFuY2VvZiBUeXBlKSB7XG4gICAgICBjb25zdCBjaGlsZEluamVjdG9yID0gbmV3IFBvcnRhbEluamVjdG9yKHRoaXMuaW5qZWN0b3IsIG5ldyBXZWFrTWFwKFsgWyBOekRyYXdlclJlZiwgdGhpcyBdIF0pKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFBvcnRhbCA9IG5ldyBDb21wb25lbnRQb3J0YWw8VD4odGhpcy5uekNvbnRlbnQsIG51bGwsIGNoaWxkSW5qZWN0b3IpO1xuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ib2R5UG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChjb21wb25lbnRQb3J0YWwpO1xuICAgICAgaWYgKHRoaXMubnpDb250ZW50UGFyYW1zKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY29tcG9uZW50UmVmLmluc3RhbmNlLCB0aGlzLm56Q29udGVudFBhcmFtcyk7XG4gICAgICB9XG4gICAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoT3ZlcmxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5wb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5kcmF3ZXJUZW1wbGF0ZSwgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZiA9IHRoaXMub3ZlcmxheS5jcmVhdGUodGhpcy5nZXRPdmVybGF5Q29uZmlnKCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm92ZXJsYXlSZWYgJiYgIXRoaXMub3ZlcmxheVJlZi5oYXNBdHRhY2hlZCgpKSB7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuYXR0YWNoKHRoaXMucG9ydGFsKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRpc3Bvc2VPdmVybGF5KCk6IHZvaWQge1xuICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgdGhpcy5vdmVybGF5UmVmID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3ZlcmxheUNvbmZpZygpOiBPdmVybGF5Q29uZmlnIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMubnpTY3JvbGxTdHJhdGVneU9wdGlvbnMuYmxvY2soKVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVPdmVybGF5U3R5bGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZiAmJiB0aGlzLm92ZXJsYXlSZWYub3ZlcmxheUVsZW1lbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5vdmVybGF5UmVmLm92ZXJsYXlFbGVtZW50LCAncG9pbnRlci1ldmVudHMnLCB0aGlzLmlzT3BlbiA/ICdhdXRvJyA6ICdub25lJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVCb2R5T3ZlcmZsb3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3ZlcmxheVJlZikge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5zY3JvbGxTdHJhdGVneS5lbmFibGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVJlZi5nZXRDb25maWcoKS5zY3JvbGxTdHJhdGVneS5kaXNhYmxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kb2N1bWVudCkge1xuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudC5ibHVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0cmFwRm9jdXMoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgdGhpcy5mb2N1c1RyYXAgPSB0aGlzLmZvY3VzVHJhcEZhY3RvcnkuY3JlYXRlKHRoaXMub3ZlcmxheVJlZi5vdmVybGF5RWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuZm9jdXNUcmFwLmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZUZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCkge1xuICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLmZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=