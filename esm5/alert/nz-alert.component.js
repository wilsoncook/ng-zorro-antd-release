/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../core/util/convert';
var NzAlertComponent = /** @class */ (function () {
    function NzAlertComponent() {
        this._banner = false;
        this._closeable = false;
        this._showIcon = false;
        this._type = 'info';
        this.display = true;
        this.isTypeSet = false;
        this.isShowIconSet = false;
        this.prefixClass = 'ant-alert';
        this.nzOnClose = new EventEmitter();
    }
    Object.defineProperty(NzAlertComponent.prototype, "nzDescription", {
        get: /**
         * @return {?}
         */
        function () {
            return this._description;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isDescriptionString = !(value instanceof TemplateRef);
            this._description = value;
            this.updateOuterClassMap();
            this.updateIconClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzCloseText", {
        get: /**
         * @return {?}
         */
        function () {
            return this._closeText;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isCloseTextString = !(value instanceof TemplateRef);
            this._closeText = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzMessage", {
        get: /**
         * @return {?}
         */
        function () {
            return this._message;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isMessageString = !(value instanceof TemplateRef);
            this._message = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzType", {
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
            this._type = value;
            this.isTypeSet = true;
            this.updateOuterClassMap();
            this.updateIconClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzBanner", {
        get: /**
         * @return {?}
         */
        function () {
            return this._banner;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._banner = toBoolean(value);
            if (!this.isTypeSet) {
                this.nzType = 'warning';
            }
            if (!this.isShowIconSet) {
                this.nzShowIcon = true;
            }
            this.updateOuterClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzCloseable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._closeable;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._closeable = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzAlertComponent.prototype, "nzShowIcon", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showIcon;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showIcon = toBoolean(value);
            this.isShowIconSet = true;
            this.updateOuterClassMap();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzAlertComponent.prototype.closeAlert = /**
     * @return {?}
     */
    function () {
        this.display = false;
    };
    /**
     * @return {?}
     */
    NzAlertComponent.prototype.onFadeAnimationDone = /**
     * @return {?}
     */
    function () {
        if (!this.display) {
            this.nzOnClose.emit(true);
        }
    };
    /**
     * @return {?}
     */
    NzAlertComponent.prototype.updateOuterClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        this.outerClassMap = (_a = {},
            _a["" + this.prefixClass] = true,
            _a[this.prefixClass + "-" + this.nzType] = true,
            _a[this.prefixClass + "-no-icon"] = !this.nzShowIcon,
            _a[this.prefixClass + "-banner"] = this.nzBanner,
            _a[this.prefixClass + "-with-description"] = !!this.nzDescription,
            _a);
    };
    /**
     * @return {?}
     */
    NzAlertComponent.prototype.updateIconClassMap = /**
     * @return {?}
     */
    function () {
        this.iconClassMap = {
            'anticon-cross-circle-o': this.nzDescription && this.nzType === 'error',
            'anticon-check-circle-o': this.nzDescription && this.nzType === 'success',
            'anticon-info-circle-o': this.nzDescription && this.nzType === 'info',
            'anticon-exclamation-circle-o': this.nzDescription && this.nzType === 'warning',
            'anticon-cross-circle': (!this.nzDescription) && this.nzType === 'error',
            'anticon-check-circle': (!this.nzDescription) && this.nzType === 'success',
            'anticon-info-circle': (!this.nzDescription) && this.nzType === 'info',
            'anticon-exclamation-circle': (!this.nzDescription) && this.nzType === 'warning'
        };
    };
    /**
     * @return {?}
     */
    NzAlertComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateIconClassMap();
        this.updateOuterClassMap();
    };
    NzAlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-alert',
                    animations: [fadeAnimation],
                    preserveWhitespaces: false,
                    template: "<div [ngClass]=\"outerClassMap\" *ngIf=\"display\" [@fadeAnimation] (@fadeAnimation.done)=\"onFadeAnimationDone()\">\n  <ng-container *ngIf=\"nzShowIcon\">\n    <i class=\"ant-alert-icon\" [ngClass]=\"nzIconType\" *ngIf=\"nzIconType; else iconTemplate\"></i>\n    <ng-template #iconTemplate>\n      <i class=\"ant-alert-icon anticon\" [ngClass]=\"iconClassMap\">\n      </i>\n    </ng-template>\n  </ng-container>\n  <span class=\"ant-alert-message\" *ngIf=\"nzMessage\">\n        <ng-container *ngIf=\"isMessageString; else messageTemplate\">{{ nzMessage }}</ng-container>\n        <ng-template #messageTemplate>\n          <ng-template [ngTemplateOutlet]=\"nzMessage\"></ng-template>\n        </ng-template>\n      </span>\n  <span class=\"ant-alert-description\" *ngIf=\"nzDescription\">\n        <ng-container *ngIf=\"isDescriptionString; else descriptionTemplate\">{{ nzDescription }}</ng-container>\n        <ng-template #descriptionTemplate>\n          <ng-template [ngTemplateOutlet]=\"nzDescription\"></ng-template>\n        </ng-template>\n      </span>\n  <a\n    *ngIf=\"nzCloseable || nzCloseText\"\n    (click)=\"closeAlert()\"\n    class=\"ant-alert-close-icon\">\n    <ng-template #closeDefaultTemplate>\n      <i class=\"anticon anticon-cross\"></i>\n    </ng-template>\n    <ng-container *ngIf=\"nzCloseText; else closeDefaultTemplate\">\n      <ng-container *ngIf=\"isCloseTextString; else closeTextTemplate\">{{ nzCloseText }}</ng-container>\n      <ng-template #closeTextTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzCloseText\"></ng-template>\n      </ng-template>\n    </ng-container>\n  </a>\n</div>",
                    styles: [":host {\n      display: block;\n    }"]
                }] }
    ];
    NzAlertComponent.propDecorators = {
        nzOnClose: [{ type: Output }],
        nzIconType: [{ type: Input }],
        nzDescription: [{ type: Input }],
        nzCloseText: [{ type: Input }],
        nzMessage: [{ type: Input }],
        nzType: [{ type: Input }],
        nzBanner: [{ type: Input }],
        nzCloseable: [{ type: Input }],
        nzShowIcon: [{ type: Input }]
    };
    return NzAlertComponent;
}());
export { NzAlertComponent };
function NzAlertComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzAlertComponent.prototype._banner;
    /** @type {?} */
    NzAlertComponent.prototype._closeable;
    /** @type {?} */
    NzAlertComponent.prototype._showIcon;
    /** @type {?} */
    NzAlertComponent.prototype._type;
    /** @type {?} */
    NzAlertComponent.prototype._description;
    /** @type {?} */
    NzAlertComponent.prototype._message;
    /** @type {?} */
    NzAlertComponent.prototype._closeText;
    /** @type {?} */
    NzAlertComponent.prototype.display;
    /** @type {?} */
    NzAlertComponent.prototype.isTypeSet;
    /** @type {?} */
    NzAlertComponent.prototype.isShowIconSet;
    /** @type {?} */
    NzAlertComponent.prototype.prefixClass;
    /** @type {?} */
    NzAlertComponent.prototype.isDescriptionString;
    /** @type {?} */
    NzAlertComponent.prototype.isMessageString;
    /** @type {?} */
    NzAlertComponent.prototype.isCloseTextString;
    /** @type {?} */
    NzAlertComponent.prototype.outerClassMap;
    /** @type {?} */
    NzAlertComponent.prototype.iconClassMap;
    /** @type {?} */
    NzAlertComponent.prototype.nzOnClose;
    /** @type {?} */
    NzAlertComponent.prototype.nzIconType;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImFsZXJ0L256LWFsZXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7O3VCQWM3QixLQUFLOzBCQUNGLEtBQUs7eUJBQ04sS0FBSztxQkFDVCxNQUFNO3VCQUlaLElBQUk7eUJBQ0YsS0FBSzs2QkFDRCxLQUFLOzJCQUNQLFdBQVc7eUJBTW9CLElBQUksWUFBWSxFQUFFOztJQUcvRCxzQkFDSSwyQ0FBYTs7OztRQU9qQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjs7Ozs7UUFWRCxVQUNrQixLQUFpQztZQUNqRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUFDLEtBQUssWUFBWSxXQUFXLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjs7O09BQUE7SUFNRCxzQkFDSSx5Q0FBVzs7OztRQUtmO1lBQ0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCOzs7OztRQVJELFVBQ2dCLEtBQWlDO1lBQy9DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCOzs7T0FBQTtJQU1ELHNCQUNJLHVDQUFT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QUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTTtZQUM1RSw4QkFBOEIsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUMvRSxzQkFBc0IsRUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTztZQUNoRixzQkFBc0IsRUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztZQUNsRixxQkFBcUIsRUFBVyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTTtZQUMvRSw0QkFBNEIsRUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUztTQUNuRixDQUFDO0tBQ0g7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztLQUM1Qjs7Z0JBbkpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQWEsVUFBVTtvQkFDL0IsVUFBVSxFQUFXLENBQUUsYUFBYSxDQUFFO29CQUN0QyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQiw0bURBQWdEOzZCQUU5Qyx1Q0FFRTtpQkFFTDs7OzRCQWtCRSxNQUFNOzZCQUNOLEtBQUs7Z0NBRUwsS0FBSzs4QkFZTCxLQUFLOzRCQVVMLEtBQUs7eUJBVUwsS0FBSzsyQkFZTCxLQUFLOzhCQWdCTCxLQUFLOzZCQVNMLEtBQUs7OzJCQW5IUjs7U0EwQmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbmV4cG9ydCB0eXBlIE5nQ2xhc3NUeXBlID0gc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgWyBrbGFzczogc3RyaW5nIF06IGFueTsgfTtcblxuaW1wb3J0IHsgZmFkZUFuaW1hdGlvbiB9IGZyb20gJy4uL2NvcmUvYW5pbWF0aW9uL2ZhZGUtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnbnotYWxlcnQnLFxuICBhbmltYXRpb25zICAgICAgICAgOiBbIGZhZGVBbmltYXRpb24gXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LWFsZXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzICAgICAgICAgICAgIDogW1xuICAgIGA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE56QWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIF9iYW5uZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2xvc2VhYmxlID0gZmFsc2U7XG4gIHByaXZhdGUgX3Nob3dJY29uID0gZmFsc2U7XG4gIHByaXZhdGUgX3R5cGUgPSAnaW5mbyc7XG4gIHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgcHJpdmF0ZSBfbWVzc2FnZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIHByaXZhdGUgX2Nsb3NlVGV4dDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD47XG4gIGRpc3BsYXkgPSB0cnVlO1xuICBpc1R5cGVTZXQgPSBmYWxzZTtcbiAgaXNTaG93SWNvblNldCA9IGZhbHNlO1xuICBwcmVmaXhDbGFzcyA9ICdhbnQtYWxlcnQnO1xuICBpc0Rlc2NyaXB0aW9uU3RyaW5nOiBib29sZWFuO1xuICBpc01lc3NhZ2VTdHJpbmc6IGJvb2xlYW47XG4gIGlzQ2xvc2VUZXh0U3RyaW5nOiBib29sZWFuO1xuICBvdXRlckNsYXNzTWFwO1xuICBpY29uQ2xhc3NNYXA7XG4gIEBPdXRwdXQoKSBuek9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgbnpJY29uVHlwZTogTmdDbGFzc1R5cGU7XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGVzY3JpcHRpb24odmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgdGhpcy5pc0Rlc2NyaXB0aW9uU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl9kZXNjcmlwdGlvbiA9IHZhbHVlO1xuICAgIHRoaXMudXBkYXRlT3V0ZXJDbGFzc01hcCgpO1xuICAgIHRoaXMudXBkYXRlSWNvbkNsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpEZXNjcmlwdGlvbigpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q2xvc2VUZXh0KHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNDbG9zZVRleHRTdHJpbmcgPSAhKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpO1xuICAgIHRoaXMuX2Nsb3NlVGV4dCA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56Q2xvc2VUZXh0KCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2xvc2VUZXh0O1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56TWVzc2FnZSh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4pIHtcbiAgICB0aGlzLmlzTWVzc2FnZVN0cmluZyA9ICEodmFsdWUgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5fbWVzc2FnZSA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56TWVzc2FnZSgpOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX21lc3NhZ2U7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUeXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgdGhpcy5pc1R5cGVTZXQgPSB0cnVlO1xuICAgIHRoaXMudXBkYXRlT3V0ZXJDbGFzc01hcCgpO1xuICAgIHRoaXMudXBkYXRlSWNvbkNsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpCYW5uZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9iYW5uZXIgPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIGlmICghdGhpcy5pc1R5cGVTZXQpIHtcbiAgICAgIHRoaXMubnpUeXBlID0gJ3dhcm5pbmcnO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNTaG93SWNvblNldCkge1xuICAgICAgdGhpcy5uelNob3dJY29uID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVPdXRlckNsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpCYW5uZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhbm5lcjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekNsb3NlYWJsZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Nsb3NlYWJsZSA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDbG9zZWFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nsb3NlYWJsZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNob3dJY29uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0ljb24gPSB0b0Jvb2xlYW4odmFsdWUpO1xuICAgIHRoaXMuaXNTaG93SWNvblNldCA9IHRydWU7XG4gICAgdGhpcy51cGRhdGVPdXRlckNsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpTaG93SWNvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd0ljb247XG4gIH1cblxuICBjbG9zZUFsZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzcGxheSA9IGZhbHNlO1xuICB9XG5cbiAgb25GYWRlQW5pbWF0aW9uRG9uZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZGlzcGxheSkge1xuICAgICAgdGhpcy5uek9uQ2xvc2UuZW1pdCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVPdXRlckNsYXNzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMub3V0ZXJDbGFzc01hcCA9IHtcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbGFzc31gIF0gICAgICAgICAgICAgICAgIDogdHJ1ZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbGFzc30tJHt0aGlzLm56VHlwZX1gIF0gIDogdHJ1ZSxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbGFzc30tbm8taWNvbmAgXSAgICAgICAgIDogIXRoaXMubnpTaG93SWNvbixcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbGFzc30tYmFubmVyYCBdICAgICAgICAgIDogdGhpcy5uekJhbm5lcixcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbGFzc30td2l0aC1kZXNjcmlwdGlvbmAgXTogISF0aGlzLm56RGVzY3JpcHRpb25cbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlSWNvbkNsYXNzTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuaWNvbkNsYXNzTWFwID0ge1xuICAgICAgJ2FudGljb24tY3Jvc3MtY2lyY2xlLW8nICAgICAgOiB0aGlzLm56RGVzY3JpcHRpb24gJiYgdGhpcy5uelR5cGUgPT09ICdlcnJvcicsXG4gICAgICAnYW50aWNvbi1jaGVjay1jaXJjbGUtbycgICAgICA6IHRoaXMubnpEZXNjcmlwdGlvbiAmJiB0aGlzLm56VHlwZSA9PT0gJ3N1Y2Nlc3MnLFxuICAgICAgJ2FudGljb24taW5mby1jaXJjbGUtbycgICAgICAgOiB0aGlzLm56RGVzY3JpcHRpb24gJiYgdGhpcy5uelR5cGUgPT09ICdpbmZvJyxcbiAgICAgICdhbnRpY29uLWV4Y2xhbWF0aW9uLWNpcmNsZS1vJzogdGhpcy5uekRlc2NyaXB0aW9uICYmIHRoaXMubnpUeXBlID09PSAnd2FybmluZycsXG4gICAgICAnYW50aWNvbi1jcm9zcy1jaXJjbGUnICAgICAgICA6ICghdGhpcy5uekRlc2NyaXB0aW9uKSAmJiB0aGlzLm56VHlwZSA9PT0gJ2Vycm9yJyxcbiAgICAgICdhbnRpY29uLWNoZWNrLWNpcmNsZScgICAgICAgIDogKCF0aGlzLm56RGVzY3JpcHRpb24pICYmIHRoaXMubnpUeXBlID09PSAnc3VjY2VzcycsXG4gICAgICAnYW50aWNvbi1pbmZvLWNpcmNsZScgICAgICAgICA6ICghdGhpcy5uekRlc2NyaXB0aW9uKSAmJiB0aGlzLm56VHlwZSA9PT0gJ2luZm8nLFxuICAgICAgJ2FudGljb24tZXhjbGFtYXRpb24tY2lyY2xlJyAgOiAoIXRoaXMubnpEZXNjcmlwdGlvbikgJiYgdGhpcy5uelR5cGUgPT09ICd3YXJuaW5nJ1xuICAgIH07XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUljb25DbGFzc01hcCgpO1xuICAgIHRoaXMudXBkYXRlT3V0ZXJDbGFzc01hcCgpO1xuICB9XG59XG4iXX0=