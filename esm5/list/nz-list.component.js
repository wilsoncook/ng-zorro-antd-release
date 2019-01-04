/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';
var NzListComponent = /** @class */ (function () {
    // endregion
    function NzListComponent(el, cd, updateHostClassService) {
        this.el = el;
        this.cd = cd;
        this.updateHostClassService = updateHostClassService;
        // region: fields
        this.nzDataSource = [];
        this._bordered = false;
        this._isHeader = false;
        this._header = '';
        this._isFooter = false;
        this._footer = '';
        this.nzItemLayout = 'horizontal';
        this._loading = false;
        this.nzSize = 'default';
        this._split = true;
        this.prefixCls = 'ant-list';
    }
    Object.defineProperty(NzListComponent.prototype, "nzBordered", {
        get: /**
         * @return {?}
         */
        function () {
            return this._bordered;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._bordered = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzListComponent.prototype, "nzHeader", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value instanceof TemplateRef) {
                this._header = null;
                this._headerTpl = value;
            }
            else {
                this._header = value;
            }
            this._isHeader = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzListComponent.prototype, "nzFooter", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value instanceof TemplateRef) {
                this._footer = null;
                this._footerTpl = value;
            }
            else {
                this._footer = value;
            }
            this._isFooter = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzListComponent.prototype, "nzLoading", {
        get: /**
         * @return {?}
         */
        function () {
            return this._loading;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._loading = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzListComponent.prototype, "nzSplit", {
        get: /**
         * @return {?}
         */
        function () {
            return this._split;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._split = toBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzListComponent.prototype._setClassMap = /**
     * @return {?}
     */
    function () {
        var _a;
        /** @type {?} */
        var classMap = (_a = {},
            _a[this.prefixCls] = true,
            _a[this.prefixCls + "-vertical"] = this.nzItemLayout === 'vertical',
            _a[this.prefixCls + "-lg"] = this.nzSize === 'large',
            _a[this.prefixCls + "-sm"] = this.nzSize === 'small',
            _a[this.prefixCls + "-split"] = this.nzSplit,
            _a[this.prefixCls + "-bordered"] = this.nzBordered,
            _a[this.prefixCls + "-loading"] = this.nzLoading,
            _a[this.prefixCls + "-grid"] = this.nzGrid,
            _a[this.prefixCls + "-something-after-last-item"] = !!(this.nzLoadMore || this.nzPagination || this._isFooter),
            _a);
        this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
        this.cd.detectChanges();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzListComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this._setClassMap();
    };
    NzListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-list',
                    template: "<ng-template #itemsTpl>\n  <ng-container *ngFor=\"let item of nzDataSource; let index = index\">\n    <ng-template\n      [ngTemplateOutlet]=\"nzRenderItem\"\n      [ngTemplateOutletContext]=\"{ $implicit: item, index: index }\"></ng-template>\n  </ng-container>\n</ng-template>\n<div *ngIf=\"_isHeader\" class=\"ant-list-header\">\n  <ng-container *ngIf=\"_header; else _headerTpl\">{{ _header }}</ng-container>\n</div>\n<nz-spin [nzSpinning]=\"nzLoading\">\n  <div *ngIf=\"nzLoading && nzDataSource.length === 0\" [style.min-height.px]=\"53\"></div>\n  <div *ngIf=\"nzGrid; else itemsTpl\" nz-row [nzGutter]=\"nzGrid.gutter\">\n    <div nz-col [nzSpan]=\"nzGrid.span\" [nzXs]=\"nzGrid.xs\" [nzSm]=\"nzGrid.sm\" [nzMd]=\"nzGrid.md\" [nzLg]=\"nzGrid.lg\" [nzXl]=\"nzGrid.xl\" [nzXXl]=\"nzGrid.xxl\"\n      *ngFor=\"let item of nzDataSource; let index = index\">\n      <ng-template\n        [ngTemplateOutlet]=\"nzRenderItem\"\n        [ngTemplateOutletContext]=\"{ $implicit: item, index: index }\"></ng-template>\n    </div>\n  </div>\n</nz-spin>\n<ng-template [ngTemplateOutlet]=\"nzLoadMore\"></ng-template>\n<ng-content></ng-content>\n<div *ngIf=\"nzPagination\" class=\"ant-list-pagination\">\n  <ng-template [ngTemplateOutlet]=\"nzPagination\"></ng-template>\n</div>\n<div *ngIf=\"_isFooter\" class=\"ant-list-footer\">\n  <ng-container *ngIf=\"_footer; else _footerTpl\">{{ _footer }}</ng-container>\n</div>",
                    providers: [NzUpdateHostClassService],
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["\n    :host {\n      display: block;\n    }\n\n    nz-spin {\n      display: block;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    NzListComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NzUpdateHostClassService }
    ]; };
    NzListComponent.propDecorators = {
        nzDataSource: [{ type: Input }],
        nzBordered: [{ type: Input }],
        nzGrid: [{ type: Input }],
        nzHeader: [{ type: Input }],
        nzFooter: [{ type: Input }],
        nzItemLayout: [{ type: Input }],
        nzRenderItem: [{ type: Input }],
        nzLoading: [{ type: Input }],
        nzLoadMore: [{ type: Input }],
        nzPagination: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzSplit: [{ type: Input }]
    };
    return NzListComponent;
}());
export { NzListComponent };
function NzListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzListComponent.prototype.nzDataSource;
    /** @type {?} */
    NzListComponent.prototype._bordered;
    /** @type {?} */
    NzListComponent.prototype.nzGrid;
    /** @type {?} */
    NzListComponent.prototype._isHeader;
    /** @type {?} */
    NzListComponent.prototype._header;
    /** @type {?} */
    NzListComponent.prototype._headerTpl;
    /** @type {?} */
    NzListComponent.prototype._isFooter;
    /** @type {?} */
    NzListComponent.prototype._footer;
    /** @type {?} */
    NzListComponent.prototype._footerTpl;
    /** @type {?} */
    NzListComponent.prototype.nzItemLayout;
    /** @type {?} */
    NzListComponent.prototype.nzRenderItem;
    /** @type {?} */
    NzListComponent.prototype._loading;
    /** @type {?} */
    NzListComponent.prototype.nzLoadMore;
    /** @type {?} */
    NzListComponent.prototype.nzPagination;
    /** @type {?} */
    NzListComponent.prototype.nzSize;
    /** @type {?} */
    NzListComponent.prototype._split;
    /** @type {?} */
    NzListComponent.prototype.prefixCls;
    /** @type {?} */
    NzListComponent.prototype.el;
    /** @type {?} */
    NzListComponent.prototype.cd;
    /** @type {?} */
    NzListComponent.prototype.updateHostClassService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsibGlzdC9uei1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsV0FBVyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7SUEySC9DLFlBQVk7SUFFWix5QkFBb0IsRUFBYyxFQUFVLEVBQXFCLEVBQVUsc0JBQWdEO1FBQXZHLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBMEI7OzRCQXZHNUYsRUFBRTt5QkFFYixLQUFLO3lCQWFiLEtBQUs7dUJBQ1AsRUFBRTt5QkFlQSxLQUFLO3VCQUNQLEVBQUU7NEJBZXVDLFlBQVk7d0JBSTVDLEtBQUs7c0JBY0ksU0FBUztzQkFFcEIsSUFBSTt5QkFlRCxVQUFVO0tBc0I3QjtJQXBHRCxzQkFDSSx1Q0FBVTs7OztRQUlkO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3ZCOzs7OztRQVBELFVBQ2UsS0FBYztZQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQzs7O09BQUE7SUFZRCxzQkFDSSxxQ0FBUTs7Ozs7UUFEWixVQUNhLEtBQWlDO1lBQzVDLElBQUksS0FBSyxZQUFZLFdBQVcsRUFBRTtnQkFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dC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dCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tYW55XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE56VXBkYXRlSG9zdENsYXNzU2VydmljZSB9IGZyb20gJy4uL2NvcmUvc2VydmljZXMvdXBkYXRlLWhvc3QtY2xhc3Muc2VydmljZSc7XG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmltcG9ydCB7IExpc3RTaXplLCBOekxpc3RHcmlkIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LWxpc3QnLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzICAgICAgICAgIDogWyBOelVwZGF0ZUhvc3RDbGFzc1NlcnZpY2UgXSxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIGNoYW5nZURldGVjdGlvbiAgICA6IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVzICAgICAgICAgICAgIDogWyBgXG4gICAgOmhvc3Qge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgbnotc3BpbiB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvLyByZWdpb246IGZpZWxkc1xuICBASW5wdXQoKSBuekRhdGFTb3VyY2U6IGFueVtdID0gW107XG5cbiAgcHJpdmF0ZSBfYm9yZGVyZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpCb3JkZXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2JvcmRlcmVkID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxuXG4gIGdldCBuekJvcmRlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ib3JkZXJlZDtcbiAgfVxuXG4gIEBJbnB1dCgpIG56R3JpZDogTnpMaXN0R3JpZDtcblxuICBfaXNIZWFkZXIgPSBmYWxzZTtcbiAgX2hlYWRlciA9ICcnO1xuICBfaGVhZGVyVHBsOiBUZW1wbGF0ZVJlZjx2b2lkPjtcblxuICBASW5wdXQoKVxuICBzZXQgbnpIZWFkZXIodmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIHRoaXMuX2hlYWRlciA9IG51bGw7XG4gICAgICB0aGlzLl9oZWFkZXJUcGwgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faGVhZGVyID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5faXNIZWFkZXIgPSAhIXZhbHVlO1xuICB9XG5cbiAgX2lzRm9vdGVyID0gZmFsc2U7XG4gIF9mb290ZXIgPSAnJztcbiAgX2Zvb3RlclRwbDogVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgQElucHV0KClcbiAgc2V0IG56Rm9vdGVyKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICB0aGlzLl9mb290ZXIgPSBudWxsO1xuICAgICAgdGhpcy5fZm9vdGVyVHBsID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2Zvb3RlciA9IHZhbHVlO1xuICAgIH1cblxuICAgIHRoaXMuX2lzRm9vdGVyID0gISF2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpIG56SXRlbUxheW91dDogJ3ZlcnRpY2FsJyB8ICdob3Jpem9udGFsJyA9ICdob3Jpem9udGFsJztcblxuICBASW5wdXQoKSBuelJlbmRlckl0ZW06IFRlbXBsYXRlUmVmPHZvaWQ+O1xuXG4gIHByaXZhdGUgX2xvYWRpbmcgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBzZXQgbnpMb2FkaW5nKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbG9hZGluZyA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KCkgbnpMb2FkTW9yZTogVGVtcGxhdGVSZWY8dm9pZD47XG4gIEBJbnB1dCgpIG56UGFnaW5hdGlvbjogVGVtcGxhdGVSZWY8dm9pZD47XG5cbiAgQElucHV0KCkgbnpTaXplOiBMaXN0U2l6ZSA9ICdkZWZhdWx0JztcblxuICBwcml2YXRlIF9zcGxpdCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgc2V0IG56U3BsaXQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zcGxpdCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpTcGxpdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3BsaXQ7XG4gIH1cblxuICAvLyBlbmRyZWdpb25cblxuICAvLyByZWdpb246IHN0eWxlc1xuXG4gIHByaXZhdGUgcHJlZml4Q2xzID0gJ2FudC1saXN0JztcblxuICBwcml2YXRlIF9zZXRDbGFzc01hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc01hcCA9IHtcbiAgICAgIFsgdGhpcy5wcmVmaXhDbHMgXSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHRydWUsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS12ZXJ0aWNhbGAgXSAgICAgICAgICAgICAgICAgOiB0aGlzLm56SXRlbUxheW91dCA9PT0gJ3ZlcnRpY2FsJyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWxnYCBdICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMubnpTaXplID09PSAnbGFyZ2UnLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tc21gIF0gICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5uelNpemUgPT09ICdzbWFsbCcsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zcGxpdGAgXSAgICAgICAgICAgICAgICAgICAgOiB0aGlzLm56U3BsaXQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1ib3JkZXJlZGAgXSAgICAgICAgICAgICAgICAgOiB0aGlzLm56Qm9yZGVyZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1sb2FkaW5nYCBdICAgICAgICAgICAgICAgICAgOiB0aGlzLm56TG9hZGluZyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWdyaWRgIF0gICAgICAgICAgICAgICAgICAgICA6IHRoaXMubnpHcmlkLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tc29tZXRoaW5nLWFmdGVyLWxhc3QtaXRlbWAgXTogISEodGhpcy5uekxvYWRNb3JlIHx8IHRoaXMubnpQYWdpbmF0aW9uIHx8IHRoaXMuX2lzRm9vdGVyKVxuICAgIH07XG4gICAgdGhpcy51cGRhdGVIb3N0Q2xhc3NTZXJ2aWNlLnVwZGF0ZUhvc3RDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGNsYXNzTWFwKTtcblxuICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgLy8gZW5kcmVnaW9uXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgdXBkYXRlSG9zdENsYXNzU2VydmljZTogTnpVcGRhdGVIb3N0Q2xhc3NTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0Q2xhc3NNYXAoKTtcbiAgfVxufVxuIl19