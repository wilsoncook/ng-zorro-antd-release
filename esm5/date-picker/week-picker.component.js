/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { forwardRef, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateRangePickerComponent } from './date-range-picker.component';
var NzWeekPickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NzWeekPickerComponent, _super);
    function NzWeekPickerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showWeek = true;
        return _this;
    }
    NzWeekPickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-week-picker',
                    template: "<nz-picker\n  [isRange]=\"isRange\"\n  [value]=\"nzValue\"\n  (valueChange)=\"onValueChange($event)\"\n  [open]=\"nzOpen\"\n  [disabled]=\"nzDisabled\"\n  [format]=\"nzFormat\"\n  [allowClear]=\"nzAllowClear\"\n  [autoFocus]=\"nzAutoFocus\"\n  [className]=\"nzClassName\"\n  [placeholder]=\"nzPlaceHolder\"\n  [size]=\"nzSize\"\n  [style]=\"nzStyle\"\n  (openChange)=\"onOpenChange($event)\"\n>\n  <date-range-popup *ngIf=\"realOpenState\"\n    [isRange]=\"isRange\"\n    [showWeek]=\"showWeek\"\n    [panelMode]=\"nzMode\"\n    (panelModeChange)=\"nzOnPanelChange.emit($event)\"\n    [value]=\"nzValue\"\n    (valueChange)=\"onValueChange($event)\"\n    [locale]=\"nzLocale?.lang\"\n    [showToday]=\"realShowToday\"\n    [showTime]=\"nzShowTime\"\n    [format]=\"nzFormat\"\n    [dateRender]=\"nzDateRender\"\n    [disabledDate]=\"nzDisabledDate\"\n    [disabledTime]=\"nzDisabledTime\"\n    [placeholder]=\"nzPlaceHolder\"\n    [dropdownClassName]=\"nzDropdownClassName\"\n    [popupStyle]=\"nzPopupStyle\"\n    [extraFooter]=\"extraFooter\"\n    [ranges]=\"nzRanges\"\n    (resultOk)=\"onResultOk()\"\n    (closePicker)=\"closeOverlay()\"\n  ></date-range-popup>\n</nz-picker>",
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: forwardRef(function () { return NzWeekPickerComponent; })
                        }],
                    host: {
                        '[class.ant-calendar-picker]': 'true'
                    }
                }] }
    ];
    return NzWeekPickerComponent;
}(DateRangePickerComponent));
export { NzWeekPickerComponent };
function NzWeekPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzWeekPickerComponent.prototype.showWeek;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vlay1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImRhdGUtcGlja2VyL3dlZWstcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRW5ELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQWU5QixpREFBd0I7Ozt5QkFDN0MsSUFBSTs7OztnQkFkekIsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBSyxnQkFBZ0I7b0JBQzdCLHdxQ0FBaUQ7b0JBQ2pELFNBQVMsRUFBSSxDQUFFOzRCQUNiLE9BQU8sRUFBTSxpQkFBaUI7NEJBQzlCLEtBQUssRUFBUSxJQUFJOzRCQUNqQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQzt5QkFDckQsQ0FBRTtvQkFDSCxJQUFJLEVBQVM7d0JBQ1gsNkJBQTZCLEVBQUUsTUFBTTtxQkFDdEM7aUJBQ0Y7O2dDQWhCRDtFQWtCMkMsd0JBQXdCO1NBQXRELHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZvcndhcmRSZWYsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERhdGVSYW5nZVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vZGF0ZS1yYW5nZS1waWNrZXIuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yICAgOiAnbnotd2Vlay1waWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZGF0ZS1yYW5nZS1waWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnMgIDogWyB7XG4gICAgcHJvdmlkZSAgICA6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIG11bHRpICAgICAgOiB0cnVlLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE56V2Vla1BpY2tlckNvbXBvbmVudClcbiAgfSBdLFxuICBob3N0ICAgICAgIDoge1xuICAgICdbY2xhc3MuYW50LWNhbGVuZGFyLXBpY2tlcl0nOiAndHJ1ZSdcbiAgfVxufSlcblxuZXhwb3J0IGNsYXNzIE56V2Vla1BpY2tlckNvbXBvbmVudCBleHRlbmRzIERhdGVSYW5nZVBpY2tlckNvbXBvbmVudCB7XG4gIHNob3dXZWVrOiBib29sZWFuID0gdHJ1ZTtcbn1cbiJdfQ==