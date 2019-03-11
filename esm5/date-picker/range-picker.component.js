/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { forwardRef, ChangeDetectorRef, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { DateRangePickerComponent } from './date-range-picker.component';
var NzRangePickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NzRangePickerComponent, _super);
    function NzRangePickerComponent(i18n, cdr, dateHelper) {
        var _this = _super.call(this, i18n, cdr, dateHelper) || this;
        _this.isRange = true;
        return _this;
    }
    NzRangePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-range-picker',
                    template: "<nz-picker\n  [isRange]=\"isRange\"\n  [value]=\"nzValue\"\n  (valueChange)=\"onValueChange($event)\"\n  [open]=\"nzOpen\"\n  [disabled]=\"nzDisabled\"\n  [format]=\"nzFormat\"\n  [allowClear]=\"nzAllowClear\"\n  [autoFocus]=\"nzAutoFocus\"\n  [className]=\"nzClassName\"\n  [placeholder]=\"nzPlaceHolder\"\n  [size]=\"nzSize\"\n  [style]=\"nzStyle\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  <date-range-popup *ngIf=\"realOpenState\"\n    [isRange]=\"isRange\"\n    [showWeek]=\"showWeek\"\n    [panelMode]=\"nzMode\"\n    (panelModeChange)=\"nzOnPanelChange.emit($event)\"\n    [value]=\"nzValue\"\n    (valueChange)=\"onValueChange($event)\"\n    [locale]=\"nzLocale?.lang\"\n    [showToday]=\"realShowToday\"\n    [showTime]=\"nzShowTime\"\n    [format]=\"nzFormat\"\n    [dateRender]=\"nzDateRender\"\n    [disabledDate]=\"nzDisabledDate\"\n    [disabledTime]=\"nzDisabledTime\"\n    [placeholder]=\"nzPlaceHolder\"\n    [dropdownClassName]=\"nzDropdownClassName\"\n    [popupStyle]=\"nzPopupStyle\"\n    [extraFooter]=\"extraFooter\"\n    [ranges]=\"nzRanges\"\n    (resultOk)=\"onResultOk()\"\n    (closePicker)=\"closeOverlay()\"\n  ></date-range-popup>\n</nz-picker>",
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(function () { return NzRangePickerComponent; })
                        }],
                    host: {
                        '[class.ant-calendar-picker]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    NzRangePickerComponent.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: ChangeDetectorRef },
        { type: DateHelperService }
    ]; };
    return NzRangePickerComponent;
}(DateRangePickerComponent));
export { NzRangePickerComponent };
function NzRangePickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzRangePickerComponent.prototype.isRange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci9yYW5nZS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQWU3QixrREFBd0I7SUFHbEUsZ0NBQVksSUFBbUIsRUFBRSxHQUFzQixFQUFFLFVBQTZCO1FBQXRGLFlBQ0Usa0JBQU0sSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsU0FDN0I7d0JBSmtCLElBQUk7O0tBSXRCOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBSyxpQkFBaUI7b0JBQzlCLHdxQ0FBaUQ7b0JBQ2pELFNBQVMsRUFBSSxDQUFFOzRCQUNiLE9BQU8sRUFBTSxpQkFBaUI7NEJBQzlCLEtBQUssRUFBUSxJQUFJOzRCQUNqQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQzt5QkFDdEQsQ0FBRTtvQkFDSCxJQUFJLEVBQVM7d0JBQ1gsNkJBQTZCLEVBQUUsTUFBTTtxQkFDdEM7aUJBQ0Y7Ozs7Z0JBZFEsYUFBYTtnQkFKRCxpQkFBaUI7Z0JBRzdCLGlCQUFpQjs7aUNBSDFCO0VBb0I0Qyx3QkFBd0I7U0FBdkQsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9yd2FyZFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERhdGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaTE4bi9kYXRlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICcuLi9pMThuL256LWkxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBEYXRlUmFuZ2VQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL2RhdGUtcmFuZ2UtcGlja2VyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgIDogJ256LXJhbmdlLXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLXJhbmdlLXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVycyAgOiBbIHtcbiAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgbXVsdGkgICAgICA6IHRydWUsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpSYW5nZVBpY2tlckNvbXBvbmVudClcbiAgfSBdLFxuICBob3N0ICAgICAgIDoge1xuICAgICdbY2xhc3MuYW50LWNhbGVuZGFyLXBpY2tlcl0nOiAndHJ1ZSdcbiAgfVxufSlcblxuZXhwb3J0IGNsYXNzIE56UmFuZ2VQaWNrZXJDb21wb25lbnQgZXh0ZW5kcyBEYXRlUmFuZ2VQaWNrZXJDb21wb25lbnQge1xuICBpc1JhbmdlOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcihpMThuOiBOekkxOG5TZXJ2aWNlLCBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkge1xuICAgIHN1cGVyKGkxOG4sIGNkciwgZGF0ZUhlbHBlcik7XG4gIH1cbn1cbiJdfQ==