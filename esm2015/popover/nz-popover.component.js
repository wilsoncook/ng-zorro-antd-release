/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild } from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
export class NzPopoverComponent extends NzToolTipComponent {
    constructor() {
        super(...arguments);
        this._prefix = 'ant-popover-placement';
    }
}
NzPopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-popover',
                animations: [fadeAnimation],
                template: "<ng-content></ng-content>\n<ng-template\n  #overlay=\"cdkConnectedOverlay\"\n  cdkConnectedOverlay\n  [cdkConnectedOverlayOrigin]=\"overlayOrigin\"\n  [cdkConnectedOverlayHasBackdrop]=\"_hasBackdrop\"\n  (backdropClick)=\"hide()\"\n  (detach)=\"hide()\"\n  (positionChange)=\"onPositionChange($event)\"\n  [cdkConnectedOverlayPositions]=\"_positions\"\n  [cdkConnectedOverlayOpen]=\"visible$ | async\">\n  <div class=\"ant-popover\" [ngClass]=\"_classMap\" [ngStyle]=\"nzOverlayStyle\" [@fadeAnimation]=\"''+(visible$ | async)\"\n    (@fadeAnimation.done)=\"_afterVisibilityAnimation($event)\">\n    <div class=\"ant-popover-content\">\n      <div class=\"ant-popover-arrow\"></div>\n      <div class=\"ant-popover-inner\">\n        <div class=\"ant-popover-title\" *ngIf=\"nzTitle\">\n          <ng-container *ngIf=\"isTitleString; else titleTemplate\">{{ nzTitle }}</ng-container>\n          <ng-template #titleTemplate>\n            <ng-template [ngTemplateOutlet]=\"nzTitle\"></ng-template>\n          </ng-template>\n        </div>\n        <div class=\"ant-popover-inner-content\">\n          <ng-container *ngIf=\"isContentString; else contentTemplate\">{{ nzContent }}</ng-container>\n          <ng-template #contentTemplate>\n            <ng-template [ngTemplateOutlet]=\"nzContent\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-template>",
                preserveWhitespaces: false,
                styles: [`
    .ant-popover {
      position: relative;
    }
  `]
            }] }
];
NzPopoverComponent.propDecorators = {
    _title: [{ type: ContentChild, args: ['neverUsedTemplate',] }],
    _content: [{ type: ContentChild, args: ['nzTemplate',] }]
};
function NzPopoverComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzPopoverComponent.prototype._prefix;
    /** @type {?} */
    NzPopoverComponent.prototype._title;
    /** @type {?} */
    NzPopoverComponent.prototype._content;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcG9wb3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsicG9wb3Zlci9uei1wb3BvdmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBRWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBYXJFLE1BQU0seUJBQTBCLFNBQVEsa0JBQWtCOzs7dUJBQzlDLHVCQUF1Qjs7OztZQVpsQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLFlBQVk7Z0JBQ2pDLFVBQVUsRUFBVyxDQUFFLGFBQWEsQ0FBRTtnQkFDdEMscTRDQUFrRDtnQkFDbEQsbUJBQW1CLEVBQUUsS0FBSzt5QkFDSDs7OztHQUl0QjthQUNGOzs7cUJBR0UsWUFBWSxTQUFDLG1CQUFtQjt1QkFDaEMsWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWRlQW5pbWF0aW9uIH0gZnJvbSAnLi4vY29yZS9hbmltYXRpb24vZmFkZS1hbmltYXRpb25zJztcbmltcG9ydCB7IE56VG9vbFRpcENvbXBvbmVudCB9IGZyb20gJy4uL3Rvb2x0aXAvbnotdG9vbHRpcC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXBvcG92ZXInLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbIGZhZGVBbmltYXRpb24gXSxcbiAgdGVtcGxhdGVVcmwgICAgICAgIDogJy4vbnotcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICBzdHlsZXMgICAgICAgICAgICAgOiBbIGBcbiAgICAuYW50LXBvcG92ZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cbiAgYCBdXG59KVxuZXhwb3J0IGNsYXNzIE56UG9wb3ZlckNvbXBvbmVudCBleHRlbmRzIE56VG9vbFRpcENvbXBvbmVudCB7XG4gIF9wcmVmaXggPSAnYW50LXBvcG92ZXItcGxhY2VtZW50JztcbiAgQENvbnRlbnRDaGlsZCgnbmV2ZXJVc2VkVGVtcGxhdGUnKSBfdGl0bGU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+OyAvLyB1c2VkIHRvIHJlbW92ZSBOelRvb2xUaXBDb21wb25lbnQgQENvbnRlbnRDaGlsZCgnbnpUZW1wbGF0ZScpXG4gIEBDb250ZW50Q2hpbGQoJ256VGVtcGxhdGUnKSBfY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG59XG4iXX0=