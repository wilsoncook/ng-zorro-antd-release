/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { isNotNil } from '../core/util/check';
var NzProgressComponent = /** @class */ (function () {
    function NzProgressComponent() {
        this._gapDegree = 0;
        this._gapPosition = 'top';
        this._percent = 0;
        this._status = 'normal';
        this._cacheStatus = 'normal';
        this._strokeWidth = 8;
        this._size = 'default';
        this._type = 'line';
        this._format = function (percent) { return percent + "%"; };
        this.isStatusSet = false;
        this.isStrokeWidthSet = false;
        this.isFormatSet = false;
        this.isGapDegreeSet = false;
        this.isGapPositionSet = false;
        this.statusColorMap = {
            normal: '#108ee9',
            exception: '#ff5500',
            success: '#87d068'
        };
        this.nzShowInfo = true;
        this.nzWidth = 132;
        this.nzSuccessPercent = 0;
    }
    Object.defineProperty(NzProgressComponent.prototype, "nzSize", {
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
            if (this.nzSize === 'small' && !this.isStrokeWidthSet) {
                this._strokeWidth = 6;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzFormat", {
        get: /**
         * @return {?}
         */
        function () {
            return this._format;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._format = value;
                this.isFormatSet = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzPercent", {
        get: /**
         * @return {?}
         */
        function () {
            return this._percent;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._percent = value;
            if (isNotNil(value)) {
                /** @type {?} */
                var fillAll = parseInt(value.toString(), 10) >= 100;
                if (fillAll && !this.isStatusSet) {
                    this._status = 'success';
                }
                else {
                    this._status = this._cacheStatus;
                }
                this.updatePathStyles();
                this.updateIconClassMap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzStrokeWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._strokeWidth;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._strokeWidth = value;
                this.isStrokeWidthSet = true;
                this.updatePathStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzStatus", {
        get: /**
         * @return {?}
         */
        function () {
            return this._status;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._status = value;
                this._cacheStatus = value;
                this.isStatusSet = true;
                this.updateIconClassMap();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzType", {
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
            if (!this.isStrokeWidthSet) {
                if (this.nzType !== 'line') {
                    this._strokeWidth = 6;
                }
            }
            if (this.nzType === 'dashboard') {
                if (!this.isGapPositionSet) {
                    this._gapPosition = 'bottom';
                }
                if (!this.isGapDegreeSet) {
                    this._gapDegree = 75;
                }
            }
            this.updateIconClassMap();
            this.updatePathStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzGapDegree", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gapDegree;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._gapDegree = value;
                this.isGapDegreeSet = true;
                this.updatePathStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "nzGapPosition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gapPosition;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (isNotNil(value)) {
                this._gapPosition = value;
                this.isGapPositionSet = true;
                this.updatePathStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzProgressComponent.prototype, "isCirCleStyle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.nzType === 'circle' || this.nzType === 'dashboard';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzProgressComponent.prototype.updatePathStyles = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var radius = 50 - (this.nzStrokeWidth / 2);
        /** @type {?} */
        var beginPositionX = 0;
        /** @type {?} */
        var beginPositionY = -radius;
        /** @type {?} */
        var endPositionX = 0;
        /** @type {?} */
        var endPositionY = radius * -2;
        switch (this.nzGapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }
        this.pathString = "M 50,50 m " + beginPositionX + "," + beginPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + endPositionX + "," + -endPositionY + "\n     a " + radius + "," + radius + " 0 1 1 " + -endPositionX + "," + endPositionY;
        /** @type {?} */
        var len = Math.PI * 2 * radius;
        this.trailPathStyle = {
            strokeDasharray: len - this.nzGapDegree + "px " + len + "px",
            strokeDashoffset: "-" + this.nzGapDegree / 2 + "px",
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };
        this.strokePathStyle = {
            strokeDasharray: (this.nzPercent / 100) * (len - this.nzGapDegree) + "px " + len + "px",
            strokeDashoffset: "-" + this.nzGapDegree / 2 + "px",
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s' // eslint-disable-line
        };
    };
    /**
     * @return {?}
     */
    NzProgressComponent.prototype.updateIconClassMap = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isCircle = (this.nzType === 'circle' || this.nzType === 'dashboard');
        this.iconClassMap = {
            'anticon-check': (this.nzStatus === 'success') && isCircle,
            'anticon-cross': (this.nzStatus === 'exception') && isCircle,
            'anticon-check-circle': (this.nzStatus === 'success') && !isCircle,
            'anticon-cross-circle': (this.nzStatus === 'exception') && !isCircle
        };
    };
    /**
     * @return {?}
     */
    NzProgressComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updatePathStyles();
        this.updateIconClassMap();
    };
    NzProgressComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-progress',
                    preserveWhitespaces: false,
                    template: "<ng-template #progressInfoTemplate>\n  <span class=\"ant-progress-text\" *ngIf=\"nzShowInfo\">\n    <ng-container *ngIf=\"(nzStatus=='exception')||(nzStatus=='success')&&(!isFormatSet); else formatTemplate\">\n      <i class=\"anticon\" [ngClass]=\"iconClassMap\"></i>\n    </ng-container>\n    <ng-template #formatTemplate>\n      {{ nzFormat(nzPercent) }}\n    </ng-template>\n  </span>\n</ng-template>\n<div [ngClass]=\"'ant-progress ant-progress-status-'+nzStatus\"\n  [class.ant-progress-line]=\"nzType=='line'\"\n  [class.ant-progress-small]=\"nzSize=='small'\"\n  [class.ant-progress-show-info]=\"nzShowInfo\"\n  [class.ant-progress-circle]=\"isCirCleStyle\">\n  <div *ngIf=\"nzType=='line'\">\n    <div class=\"ant-progress-outer\">\n      <div class=\"ant-progress-inner\">\n        <div class=\"ant-progress-bg\" [style.width.%]=\"nzPercent\" [style.height.px]=\"nzStrokeWidth\"></div>\n        <div class=\"ant-progress-success-bg\" [style.width.%]=\"nzSuccessPercent\" [style.height.px]=\"nzStrokeWidth\"></div>\n      </div>\n    </div>\n    <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n  </div>\n  <div\n    [style.width.px]=\"this.nzWidth\"\n    [style.height.px]=\"this.nzWidth\"\n    [style.fontSize.px]=\"this.nzWidth*0.15+6\"\n    class=\"ant-progress-inner\"\n    *ngIf=\"isCirCleStyle\">\n    <svg class=\"ant-progress-circle \" viewBox=\"0 0 100 100\">\n      <path\n        class=\"ant-progress-circle-trail\"\n        stroke=\"#f3f3f3\"\n        fill-opacity=\"0\"\n        [attr.stroke-width]=\"nzStrokeWidth\"\n        [ngStyle]=\"trailPathStyle\"\n        [attr.d]=\"pathString\">\n      </path>\n      <path\n        class=\"ant-progress-circle-path\"\n        [attr.d]=\"pathString\"\n        stroke-linecap=\"round\"\n        fill-opacity=\"0\"\n        [attr.stroke]=\"statusColorMap[nzStatus]\"\n        [attr.stroke-width]=\"nzPercent?nzStrokeWidth:0\"\n        [ngStyle]=\"strokePathStyle\">\n      </path>\n    </svg>\n    <ng-template [ngTemplateOutlet]=\"progressInfoTemplate\"></ng-template>\n  </div>\n</div>"
                }] }
    ];
    NzProgressComponent.propDecorators = {
        nzShowInfo: [{ type: Input }],
        nzWidth: [{ type: Input }],
        nzSuccessPercent: [{ type: Input }],
        nzSize: [{ type: Input }],
        nzFormat: [{ type: Input }],
        nzPercent: [{ type: Input }],
        nzStrokeWidth: [{ type: Input }],
        nzStatus: [{ type: Input }],
        nzType: [{ type: Input }],
        nzGapDegree: [{ type: Input }],
        nzGapPosition: [{ type: Input }]
    };
    return NzProgressComponent;
}());
export { NzProgressComponent };
function NzProgressComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzProgressComponent.prototype._gapDegree;
    /** @type {?} */
    NzProgressComponent.prototype._gapPosition;
    /** @type {?} */
    NzProgressComponent.prototype._percent;
    /** @type {?} */
    NzProgressComponent.prototype._status;
    /** @type {?} */
    NzProgressComponent.prototype._cacheStatus;
    /** @type {?} */
    NzProgressComponent.prototype._strokeWidth;
    /** @type {?} */
    NzProgressComponent.prototype._size;
    /** @type {?} */
    NzProgressComponent.prototype._type;
    /** @type {?} */
    NzProgressComponent.prototype._format;
    /** @type {?} */
    NzProgressComponent.prototype.trailPathStyle;
    /** @type {?} */
    NzProgressComponent.prototype.strokePathStyle;
    /** @type {?} */
    NzProgressComponent.prototype.pathString;
    /** @type {?} */
    NzProgressComponent.prototype.iconClassMap;
    /** @type {?} */
    NzProgressComponent.prototype.isStatusSet;
    /** @type {?} */
    NzProgressComponent.prototype.isStrokeWidthSet;
    /** @type {?} */
    NzProgressComponent.prototype.isFormatSet;
    /** @type {?} */
    NzProgressComponent.prototype.isGapDegreeSet;
    /** @type {?} */
    NzProgressComponent.prototype.isGapPositionSet;
    /** @type {?} */
    NzProgressComponent.prototype.statusColorMap;
    /** @type {?} */
    NzProgressComponent.prototype.nzShowInfo;
    /** @type {?} */
    NzProgressComponent.prototype.nzWidth;
    /** @type {?} */
    NzProgressComponent.prototype.nzSuccessPercent;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotcHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbInByb2dyZXNzL256LXByb2dyZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFLdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7MEJBUXZCLENBQUM7NEJBQzRCLEtBQUs7d0JBQ3BDLENBQUM7dUJBQ29CLFFBQVE7NEJBQ0gsUUFBUTs0QkFDOUIsQ0FBQztxQkFDUixTQUFTO3FCQUNXLE1BQU07dUJBQ3hCLFVBQUMsT0FBZSxJQUFhLE9BQUcsT0FBTyxNQUFHLEVBQWIsQ0FBYTsyQkFLOUMsS0FBSztnQ0FDQSxLQUFLOzJCQUNWLEtBQUs7OEJBQ0YsS0FBSztnQ0FDSCxLQUFLOzhCQUNQO1lBQ2YsTUFBTSxFQUFLLFNBQVM7WUFDcEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFJLFNBQVM7U0FDckI7MEJBQ3FCLElBQUk7dUJBQ1AsR0FBRztnQ0FDTSxDQUFDOztJQUU3QixzQkFDSSx1Q0FBTTs7OztRQU9WO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25COzs7OztRQVZELFVBQ1csS0FBYTtZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNGOzs7T0FBQTtJQU1ELHNCQUNJLHlDQUFROzs7O1FBT1o7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7Ozs7O1FBVkQsVUFDYSxLQUFrQztZQUM3QyxJQUFJLFFBQVEsQ0FBQyxL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TUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsZUFBZSxFQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsSUFBSSxRQUFRO1lBQ2pFLGVBQWUsRUFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLElBQUksUUFBUTtZQUNuRSxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2xFLHNCQUFzQixFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVE7U0FDckUsQ0FBQztLQUNIOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7S0FDM0I7O2dCQXBORixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFhLGFBQWE7b0JBQ2xDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLHVpRUFBbUQ7aUJBQ3BEOzs7NkJBeUJFLEtBQUs7MEJBQ0wsS0FBSzttQ0FDTCxLQUFLO3lCQUVMLEtBQUs7MkJBWUwsS0FBSzs0QkFZTCxLQUFLO2dDQW1CTCxLQUFLOzJCQWFMLEtBQUs7eUJBY0wsS0FBSzs4QkF3QkwsS0FBSztnQ0FjTCxLQUFLOzs4QkF4SlI7O1NBZ0JhLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IHR5cGUgTnpQcm9ncmVzc0dhcFBvc2l0aW9uVHlwZSA9ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnO1xuZXhwb3J0IHR5cGUgTnpQcm9ncmVzc1N0YXR1c1R5cGUgPSAnc3VjY2VzcycgfCAnZXhjZXB0aW9uJyB8ICdhY3RpdmUnIHwgJ25vcm1hbCc7XG5leHBvcnQgdHlwZSBOelByb2dyZXNzVHlwZVR5cGUgPSAnbGluZScgfCAnY2lyY2xlJyB8ICdkYXNoYm9hcmQnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi9jb3JlL3V0aWwvY2hlY2snO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXByb2dyZXNzJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LXByb2dyZXNzLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBOelByb2dyZXNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBfZ2FwRGVncmVlID0gMDtcbiAgcHJpdmF0ZSBfZ2FwUG9zaXRpb246IE56UHJvZ3Jlc3NHYXBQb3NpdGlvblR5cGUgPSAndG9wJztcbiAgcHJpdmF0ZSBfcGVyY2VudCA9IDA7XG4gIHByaXZhdGUgX3N0YXR1czogTnpQcm9ncmVzc1N0YXR1c1R5cGUgPSAnbm9ybWFsJztcbiAgcHJpdmF0ZSBfY2FjaGVTdGF0dXM6IE56UHJvZ3Jlc3NTdGF0dXNUeXBlID0gJ25vcm1hbCc7XG4gIHByaXZhdGUgX3N0cm9rZVdpZHRoID0gODtcbiAgcHJpdmF0ZSBfc2l6ZSA9ICdkZWZhdWx0JztcbiAgcHJpdmF0ZSBfdHlwZTogTnpQcm9ncmVzc1R5cGVUeXBlID0gJ2xpbmUnO1xuICBwcml2YXRlIF9mb3JtYXQgPSAocGVyY2VudDogbnVtYmVyKTogc3RyaW5nID0+IGAke3BlcmNlbnR9JWA7XG4gIHRyYWlsUGF0aFN0eWxlOiB7IFsga2V5OiBzdHJpbmcgXTogc3RyaW5nIH07XG4gIHN0cm9rZVBhdGhTdHlsZTogeyBbIGtleTogc3RyaW5nIF06IHN0cmluZyB9O1xuICBwYXRoU3RyaW5nOiBzdHJpbmc7XG4gIGljb25DbGFzc01hcDtcbiAgaXNTdGF0dXNTZXQgPSBmYWxzZTtcbiAgaXNTdHJva2VXaWR0aFNldCA9IGZhbHNlO1xuICBpc0Zvcm1hdFNldCA9IGZhbHNlO1xuICBpc0dhcERlZ3JlZVNldCA9IGZhbHNlO1xuICBpc0dhcFBvc2l0aW9uU2V0ID0gZmFsc2U7XG4gIHN0YXR1c0NvbG9yTWFwID0ge1xuICAgIG5vcm1hbCAgIDogJyMxMDhlZTknLFxuICAgIGV4Y2VwdGlvbjogJyNmZjU1MDAnLFxuICAgIHN1Y2Nlc3MgIDogJyM4N2QwNjgnXG4gIH07XG4gIEBJbnB1dCgpIG56U2hvd0luZm8gPSB0cnVlO1xuICBASW5wdXQoKSBueldpZHRoID0gMTMyO1xuICBASW5wdXQoKSBuelN1Y2Nlc3NQZXJjZW50ID0gMDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpTaXplKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgaWYgKHRoaXMubnpTaXplID09PSAnc21hbGwnICYmICF0aGlzLmlzU3Ryb2tlV2lkdGhTZXQpIHtcbiAgICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gNjtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpTaXplKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpGb3JtYXQodmFsdWU6IChwZXJjZW50OiBudW1iZXIpID0+IHN0cmluZykge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlO1xuICAgICAgdGhpcy5pc0Zvcm1hdFNldCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG56Rm9ybWF0KCk6IChwZXJjZW50OiBudW1iZXIpID0+IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelBlcmNlbnQodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX3BlcmNlbnQgPSB2YWx1ZTtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICBjb25zdCBmaWxsQWxsID0gcGFyc2VJbnQodmFsdWUudG9TdHJpbmcoKSwgMTApID49IDEwMDtcbiAgICAgIGlmIChmaWxsQWxsICYmICF0aGlzLmlzU3RhdHVzU2V0KSB7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9ICdzdWNjZXNzJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3N0YXR1cyA9IHRoaXMuX2NhY2hlU3RhdHVzO1xuICAgICAgfVxuICAgICAgdGhpcy51cGRhdGVQYXRoU3R5bGVzKCk7XG4gICAgICB0aGlzLnVwZGF0ZUljb25DbGFzc01hcCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuelBlcmNlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyY2VudDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelN0cm9rZVdpZHRoKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAoaXNOb3ROaWwodmFsdWUpKSB7XG4gICAgICB0aGlzLl9zdHJva2VXaWR0aCA9IHZhbHVlO1xuICAgICAgdGhpcy5pc1N0cm9rZVdpZHRoU2V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBkYXRlUGF0aFN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuelN0cm9rZVdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cm9rZVdpZHRoO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56U3RhdHVzKHZhbHVlOiBOelByb2dyZXNzU3RhdHVzVHlwZSkge1xuICAgIGlmIChpc05vdE5pbCh2YWx1ZSkpIHtcbiAgICAgIHRoaXMuX3N0YXR1cyA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2FjaGVTdGF0dXMgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaXNTdGF0dXNTZXQgPSB0cnVlO1xuICAgICAgdGhpcy51cGRhdGVJY29uQ2xhc3NNYXAoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpTdGF0dXMoKTogTnpQcm9ncmVzc1N0YXR1c1R5cGUge1xuICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpUeXBlKHZhbHVlOiBOelByb2dyZXNzVHlwZVR5cGUpIHtcbiAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgaWYgKCF0aGlzLmlzU3Ryb2tlV2lkdGhTZXQpIHtcbiAgICAgIGlmICh0aGlzLm56VHlwZSAhPT0gJ2xpbmUnKSB7XG4gICAgICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gNjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMubnpUeXBlID09PSAnZGFzaGJvYXJkJykge1xuICAgICAgaWYgKCF0aGlzLmlzR2FwUG9zaXRpb25TZXQpIHtcbiAgICAgICAgdGhpcy5fZ2FwUG9zaXRpb24gPSAnYm90dG9tJztcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pc0dhcERlZ3JlZVNldCkge1xuICAgICAgICB0aGlzLl9nYXBEZWdyZWUgPSA3NTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVJY29uQ2xhc3NNYXAoKTtcbiAgICB0aGlzLnVwZGF0ZVBhdGhTdHlsZXMoKTtcbiAgfVxuXG4gIGdldCBuelR5cGUoKTogTnpQcm9ncmVzc1R5cGVUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekdhcERlZ3JlZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKGlzTm90TmlsKHZhbHVlKSkge1xuICAgICAgdGhpcy5fZ2FwRGVncmVlID0gdmFsdWU7XG4gICAgICB0aGlzLmlzR2FwRGVncmVlU2V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMudXBkYXRlUGF0aFN0eWxlcygpO1xuICAgIH1cblxuICB9XG5cbiAgZ2V0IG56R2FwRGVncmVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2dhcERlZ3JlZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekdhcFBvc2l0aW9uKHZhbHVlOiBOelByb2dyZXNzR2FwUG9zaXRpb25UeXBlKSB7XG4gICAgaWYgKGlzTm90TmlsKHZhbHVlKSkge1xuICAgICAgdGhpcy5fZ2FwUG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuaXNHYXBQb3NpdGlvblNldCA9IHRydWU7XG4gICAgICB0aGlzLnVwZGF0ZVBhdGhTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbnpHYXBQb3NpdGlvbigpOiBOelByb2dyZXNzR2FwUG9zaXRpb25UeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fZ2FwUG9zaXRpb247XG4gIH1cblxuICBnZXQgaXNDaXJDbGVTdHlsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uelR5cGUgPT09ICdjaXJjbGUnIHx8IHRoaXMubnpUeXBlID09PSAnZGFzaGJvYXJkJztcbiAgfVxuXG4gIHVwZGF0ZVBhdGhTdHlsZXMoKTogdm9pZCB7XG4gICAgY29uc3QgcmFkaXVzID0gNTAgLSAodGhpcy5uelN0cm9rZVdpZHRoIC8gMik7XG4gICAgbGV0IGJlZ2luUG9zaXRpb25YID0gMDtcbiAgICBsZXQgYmVnaW5Qb3NpdGlvblkgPSAtcmFkaXVzO1xuICAgIGxldCBlbmRQb3NpdGlvblggPSAwO1xuICAgIGxldCBlbmRQb3NpdGlvblkgPSByYWRpdXMgKiAtMjtcbiAgICBzd2l0Y2ggKHRoaXMubnpHYXBQb3NpdGlvbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGJlZ2luUG9zaXRpb25YID0gLXJhZGl1cztcbiAgICAgICAgYmVnaW5Qb3NpdGlvblkgPSAwO1xuICAgICAgICBlbmRQb3NpdGlvblggPSByYWRpdXMgKiAyO1xuICAgICAgICBlbmRQb3NpdGlvblkgPSAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgYmVnaW5Qb3NpdGlvblggPSByYWRpdXM7XG4gICAgICAgIGJlZ2luUG9zaXRpb25ZID0gMDtcbiAgICAgICAgZW5kUG9zaXRpb25YID0gcmFkaXVzICogLTI7XG4gICAgICAgIGVuZFBvc2l0aW9uWSA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgYmVnaW5Qb3NpdGlvblkgPSByYWRpdXM7XG4gICAgICAgIGVuZFBvc2l0aW9uWSA9IHJhZGl1cyAqIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gICAgdGhpcy5wYXRoU3RyaW5nID0gYE0gNTAsNTAgbSAke2JlZ2luUG9zaXRpb25YfSwke2JlZ2luUG9zaXRpb25ZfVxuICAgICBhICR7cmFkaXVzfSwke3JhZGl1c30gMCAxIDEgJHtlbmRQb3NpdGlvblh9LCR7LWVuZFBvc2l0aW9uWX1cbiAgICAgYSAke3JhZGl1c30sJHtyYWRpdXN9IDAgMSAxICR7LWVuZFBvc2l0aW9uWH0sJHtlbmRQb3NpdGlvbll9YDtcbiAgICBjb25zdCBsZW4gPSBNYXRoLlBJICogMiAqIHJhZGl1cztcbiAgICB0aGlzLnRyYWlsUGF0aFN0eWxlID0ge1xuICAgICAgc3Ryb2tlRGFzaGFycmF5IDogYCR7bGVuIC0gdGhpcy5uekdhcERlZ3JlZX1weCAke2xlbn1weGAsXG4gICAgICBzdHJva2VEYXNob2Zmc2V0OiBgLSR7dGhpcy5uekdhcERlZ3JlZSAvIDJ9cHhgLFxuICAgICAgdHJhbnNpdGlvbiAgICAgIDogJ3N0cm9rZS1kYXNob2Zmc2V0IC4zcyBlYXNlIDBzLCBzdHJva2UtZGFzaGFycmF5IC4zcyBlYXNlIDBzLCBzdHJva2UgLjNzJ1xuICAgIH07XG4gICAgdGhpcy5zdHJva2VQYXRoU3R5bGUgPSB7XG4gICAgICBzdHJva2VEYXNoYXJyYXkgOiBgJHsodGhpcy5uelBlcmNlbnQgLyAxMDApICogKGxlbiAtIHRoaXMubnpHYXBEZWdyZWUpfXB4ICR7bGVufXB4YCxcbiAgICAgIHN0cm9rZURhc2hvZmZzZXQ6IGAtJHt0aGlzLm56R2FwRGVncmVlIC8gMn1weGAsXG4gICAgICB0cmFuc2l0aW9uICAgICAgOiAnc3Ryb2tlLWRhc2hvZmZzZXQgLjNzIGVhc2UgMHMsIHN0cm9rZS1kYXNoYXJyYXkgLjNzIGVhc2UgMHMsIHN0cm9rZSAuM3MsIHN0cm9rZS13aWR0aCAuMDZzIGVhc2UgLjNzJyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZUljb25DbGFzc01hcCgpOiB2b2lkIHtcbiAgICBjb25zdCBpc0NpcmNsZSA9ICh0aGlzLm56VHlwZSA9PT0gJ2NpcmNsZScgfHwgdGhpcy5uelR5cGUgPT09ICdkYXNoYm9hcmQnKTtcbiAgICB0aGlzLmljb25DbGFzc01hcCA9IHtcbiAgICAgICdhbnRpY29uLWNoZWNrJyAgICAgICA6ICh0aGlzLm56U3RhdHVzID09PSAnc3VjY2VzcycpICYmIGlzQ2lyY2xlLFxuICAgICAgJ2FudGljb24tY3Jvc3MnICAgICAgIDogKHRoaXMubnpTdGF0dXMgPT09ICdleGNlcHRpb24nKSAmJiBpc0NpcmNsZSxcbiAgICAgICdhbnRpY29uLWNoZWNrLWNpcmNsZSc6ICh0aGlzLm56U3RhdHVzID09PSAnc3VjY2VzcycpICYmICFpc0NpcmNsZSxcbiAgICAgICdhbnRpY29uLWNyb3NzLWNpcmNsZSc6ICh0aGlzLm56U3RhdHVzID09PSAnZXhjZXB0aW9uJykgJiYgIWlzQ2lyY2xlXG4gICAgfTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlUGF0aFN0eWxlcygpO1xuICAgIHRoaXMudXBkYXRlSWNvbkNsYXNzTWFwKCk7XG4gIH1cblxufVxuIl19