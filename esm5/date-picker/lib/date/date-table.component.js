/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isNonEmptyString, isTemplateRef } from '../../../core/util/check';
import { valueFunctionProp } from '../../../core/util/convert';
import { DateHelperService } from '../../../i18n/date-helper.service';
import { NzI18nService } from '../../../i18n/nz-i18n.service';
import { CandyDate } from '../candy-date';
/** @type {?} */
var DATE_ROW_NUM = 6;
/** @type {?} */
var DATE_COL_NUM = 7;
var DateTableComponent = /** @class */ (function () {
    function DateTableComponent(i18n, dateHelper) {
        this.i18n = i18n;
        this.dateHelper = dateHelper;
        this.valueChange = new EventEmitter();
        this.dayHover = new EventEmitter();
        this.prefixCls = 'ant-calendar';
        this.isTemplateRef = isTemplateRef;
        this.isNonEmptyString = isNonEmptyString;
    }
    /**
     * @return {?}
     */
    DateTableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @param {?} changes
     * @return {?}
     */
    DateTableComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.isDateRealChange(changes["value"]) ||
            this.isDateRealChange(changes["selectedValue"]) ||
            this.isDateRealChange(changes["hoverValue"])) {
            this.render();
        }
    };
    /**
     * @param {?} change
     * @return {?}
     */
    DateTableComponent.prototype.isDateRealChange = /**
     * @param {?} change
     * @return {?}
     */
    function (change) {
        var _this = this;
        if (change) {
            /** @type {?} */
            var previousValue_1 = change.previousValue;
            /** @type {?} */
            var currentValue = change.currentValue;
            if (Array.isArray(currentValue)) {
                return !Array.isArray(previousValue_1) ||
                    currentValue.length !== previousValue_1.length ||
                    currentValue.some(function (value, index) { return !_this.isSameDate(previousValue_1[index], value); });
            }
            else {
                return !this.isSameDate(/** @type {?} */ (previousValue_1), currentValue);
            }
        }
        return false;
    };
    /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    DateTableComponent.prototype.isSameDate = /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    function (left, right) {
        return (!left && !right) || (left && right && right.isSame(left, 'day'));
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        if (this.value) {
            this.headWeekDays = this.makeHeadWeekDays();
            this.weekRows = this.makeWeekRows();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateTableComponent.prototype.changeValueFromInside = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.value !== value) {
            // this.value = value;
            // this.valueChange.emit(this.value);
            // this.render();
            this.valueChange.emit(value);
        }
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.makeHeadWeekDays = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var weekDays = [];
        /** @type {?} */
        var firstDayOfWeek = this.dateHelper.getFirstDayOfWeek();
        for (var colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
            /** @type {?} */
            var day = (firstDayOfWeek + colIndex) % DATE_COL_NUM;
            /** @type {?} */
            var tempDate = this.value.setDay(day);
            weekDays[colIndex] = {
                short: this.dateHelper.format(tempDate.nativeDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'),
                // eg. Tue
                veryShort: this.dateHelper.format(tempDate.nativeDate, this.getVeryShortWeekFormat()) // eg. Tu
            };
        }
        return weekDays;
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.getVeryShortWeekFormat = /**
     * @return {?}
     */
    function () {
        if (this.dateHelper.relyOnDatePipe) {
            return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
        }
        return 'dd';
    };
    /**
     * @return {?}
     */
    DateTableComponent.prototype.makeWeekRows = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a;
        /** @type {?} */
        var weekRows = [];
        /** @type {?} */
        var firstDayOfWeek = this.dateHelper.getFirstDayOfWeek();
        /** @type {?} */
        var firstDateOfMonth = this.value.setDate(1);
        /** @type {?} */
        var firstDateOffset = (firstDateOfMonth.getDay() + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        var firstDateToShow = firstDateOfMonth.addDays(0 - firstDateOffset);
        /** @type {?} */
        var increased = 0;
        for (var rowIndex = 0; rowIndex < DATE_ROW_NUM; rowIndex++) {
            /** @type {?} */
            var week = weekRows[rowIndex] = {
                isActive: false,
                isCurrent: false,
                dateCells: []
            };
            var _loop_1 = function (colIndex) {
                var _a;
                /** @type {?} */
                var current = firstDateToShow.addDays(increased++);
                /** @type {?} */
                var isBeforeMonthYear = this_1.isBeforeMonthYear(current, this_1.value);
                /** @type {?} */
                var isAfterMonthYear = this_1.isAfterMonthYear(current, this_1.value);
                /** @type {?} */
                var cell = {
                    value: current,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: this_1.getDateTitle(current),
                    customContent: valueFunctionProp(this_1.dateRender, current),
                    // Customized content
                    content: "" + current.getDate(),
                    onClick: function () { return _this.changeValueFromInside(current); },
                    onMouseEnter: function () { return _this.dayHover.emit(cell.value); }
                };
                if (this_1.showWeek && !week.weekNum) {
                    week.weekNum = this_1.getWeekNum(current);
                }
                if (current.isToday()) {
                    cell.isToday = true;
                    week.isCurrent = true;
                }
                if (Array.isArray(this_1.selectedValue) && !isBeforeMonthYear && !isAfterMonthYear) { // Range selections
                    /** @type {?} */
                    var rangeValue = this_1.hoverValue && this_1.hoverValue.length ? this_1.hoverValue : this_1.selectedValue;
                    /** @type {?} */
                    var start = rangeValue[0];
                    /** @type {?} */
                    var end = rangeValue[1];
                    if (start) {
                        if (current.isSame(start, 'day')) {
                            cell.isSelectedStartDate = true;
                            cell.isSelected = true;
                            week.isActive = true;
                        }
                        if (end) {
                            if (current.isSame(end, 'day')) {
                                cell.isSelectedEndDate = true;
                                cell.isSelected = true;
                                week.isActive = true;
                            }
                            else if (current.isAfter(start, 'day') && current.isBefore(end, 'day')) {
                                cell.isInRange = true;
                            }
                        }
                    }
                }
                else if (current.isSame(this_1.value, 'day')) {
                    cell.isSelected = true;
                    week.isActive = true;
                }
                if (this_1.disabledDate && this_1.disabledDate(current.nativeDate)) {
                    cell.isDisabled = true;
                }
                cell.classMap = (_a = {},
                    _a[this_1.prefixCls + "-cell"] = true,
                    // [`${this.prefixCls}-selected-date`]: false,
                    _a[this_1.prefixCls + "-today"] = cell.isToday,
                    _a[this_1.prefixCls + "-last-month-cell"] = isBeforeMonthYear,
                    _a[this_1.prefixCls + "-next-month-btn-day"] = isAfterMonthYear,
                    _a[this_1.prefixCls + "-selected-day"] = cell.isSelected,
                    _a[this_1.prefixCls + "-disabled-cell"] = cell.isDisabled,
                    _a[this_1.prefixCls + "-selected-start-date"] = !!cell.isSelectedStartDate,
                    _a[this_1.prefixCls + "-selected-end-date"] = !!cell.isSelectedEndDate,
                    _a[this_1.prefixCls + "-in-range-cell"] = !!cell.isInRange,
                    _a);
                week.dateCells.push(cell);
            };
            var this_1 = this;
            for (var colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
                _loop_1(colIndex);
            }
            week.classMap = (_a = {},
                _a[this.prefixCls + "-current-week"] = week.isCurrent,
                _a[this.prefixCls + "-active-week"] = week.isActive,
                _a);
        }
        return weekRows;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateTableComponent.prototype.getDateTitle = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var dateFormat = (this.locale && this.locale.dateFormat) || 'YYYY-MM-DD';
        if (this.dateHelper.relyOnDatePipe) {
            dateFormat = (/** @type {?} */ (this.dateHelper)).transCompatFormat(dateFormat);
        }
        return this.dateHelper.format(date.nativeDate, dateFormat);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DateTableComponent.prototype.getWeekNum = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.dateHelper.getISOWeek(date.nativeDate);
    };
    /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    DateTableComponent.prototype.isBeforeMonthYear = /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    function (current, target) {
        if (current.getYear() < target.getYear()) {
            return true;
        }
        return current.getYear() === target.getYear() && current.getMonth() < target.getMonth();
    };
    /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    DateTableComponent.prototype.isAfterMonthYear = /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    function (current, target) {
        if (current.getYear() > target.getYear()) {
            return true;
        }
        return current.getYear() === target.getYear() && current.getMonth() > target.getMonth();
    };
    DateTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'date-table',
                    template: "<table class=\"{{ prefixCls }}-table\" cellSpacing=\"0\" role=\"grid\">\n  <thead>\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\" class=\"{{ prefixCls }}-column-header {{ prefixCls }}-week-number-header\">\n        <span class=\"{{ prefixCls }}-column-header-inner\">x</span>\n      </th>\n      <th *ngFor=\"let cell of headWeekDays\"\n        role=\"columnheader\"\n        title=\"{{ cell.short }}\"\n        class=\"{{ prefixCls }}-column-header\"\n      >\n        <span class=\"{{ prefixCls }}-column-header-inner\">{{ cell.veryShort }}</span>\n      </th>\n    </tr>\n  </thead>\n  <tbody class=\"{{ prefixCls }}-tbody\">\n    <tr *ngFor=\"let row of weekRows\" [ngClass]=\"row.classMap\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-week-number-cell\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.isDisabled ? null : cell.onMouseEnter()\"\n        title=\"{{ cell.title }}\"\n        [ngClass]=\"cell.classMap\"\n        role=\"gridcell\"\n      >\n\n        <ng-container [ngSwitch]=\"true\">\n          <ng-container *ngSwitchCase=\"isTemplateRef(cell.customContent)\">\n            <ng-container *ngTemplateOutlet=\"cell.customContent; context: { $implicit: cell.value }\"></ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"isNonEmptyString(cell.customContent)\">\n            <span [innerHTML]=\"cell.customContent\"></span>\n          </ng-container>\n          <ng-container *ngSwitchDefault>\n            <div\n              class=\"{{ prefixCls }}-date\"\n              [attr.aria-selected]=\"cell.isSelected\"\n              [attr.aria-disabled]=\"cell.isDisabled\"\n            >\n              {{ cell.content }}\n            </div>\n          </ng-container>\n        </ng-container>\n\n      </td>\n    </tr>\n  </tbody>\n</table>"
                }] }
    ];
    /** @nocollapse */
    DateTableComponent.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: DateHelperService }
    ]; };
    DateTableComponent.propDecorators = {
        locale: [{ type: Input }],
        selectedValue: [{ type: Input }],
        hoverValue: [{ type: Input }],
        value: [{ type: Input }],
        valueChange: [{ type: Output }],
        showWeek: [{ type: Input }],
        disabledDate: [{ type: Input }],
        dateRender: [{ type: Input }],
        dayHover: [{ type: Output }]
    };
    return DateTableComponent;
}());
export { DateTableComponent };
function DateTableComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DateTableComponent.prototype.locale;
    /** @type {?} */
    DateTableComponent.prototype.selectedValue;
    /** @type {?} */
    DateTableComponent.prototype.hoverValue;
    /** @type {?} */
    DateTableComponent.prototype.value;
    /** @type {?} */
    DateTableComponent.prototype.valueChange;
    /** @type {?} */
    DateTableComponent.prototype.showWeek;
    /** @type {?} */
    DateTableComponent.prototype.disabledDate;
    /** @type {?} */
    DateTableComponent.prototype.dateRender;
    /** @type {?} */
    DateTableComponent.prototype.dayHover;
    /** @type {?} */
    DateTableComponent.prototype.prefixCls;
    /** @type {?} */
    DateTableComponent.prototype.headWeekDays;
    /** @type {?} */
    DateTableComponent.prototype.weekRows;
    /** @type {?} */
    DateTableComponent.prototype.isTemplateRef;
    /** @type {?} */
    DateTableComponent.prototype.isNonEmptyString;
    /** @type {?} */
    DateTableComponent.prototype.i18n;
    /** @type {?} */
    DateTableComponent.prototype.dateHelper;
}
/**
 * @record
 */
export function WeekDayLabel() { }
function WeekDayLabel_tsickle_Closure_declarations() {
    /** @type {?} */
    WeekDayLabel.prototype.short;
    /** @type {?} */
    WeekDayLabel.prototype.veryShort;
}
/**
 * @record
 */
export function DateCell() { }
function DateCell_tsickle_Closure_declarations() {
    /** @type {?} */
    DateCell.prototype.value;
    /** @type {?} */
    DateCell.prototype.title;
    /** @type {?} */
    DateCell.prototype.customContent;
    /** @type {?} */
    DateCell.prototype.content;
    /** @type {?|undefined} */
    DateCell.prototype.isSelected;
    /** @type {?|undefined} */
    DateCell.prototype.isToday;
    /** @type {?|undefined} */
    DateCell.prototype.isDisabled;
    /** @type {?|undefined} */
    DateCell.prototype.isSelectedStartDate;
    /** @type {?|undefined} */
    DateCell.prototype.isSelectedEndDate;
    /** @type {?|undefined} */
    DateCell.prototype.isInRange;
    /** @type {?|undefined} */
    DateCell.prototype.classMap;
    /** @type {?} */
    DateCell.prototype.onClick;
    /** @type {?} */
    DateCell.prototype.onMouseEnter;
}
/**
 * @record
 */
export function WeekRow() { }
function WeekRow_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    WeekRow.prototype.isCurrent;
    /** @type {?|undefined} */
    WeekRow.prototype.isActive;
    /** @type {?|undefined} */
    WeekRow.prototype.weekNum;
    /** @type {?|undefined} */
    WeekRow.prototype.classMap;
    /** @type {?} */
    WeekRow.prototype.dateCells;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvbGliL2RhdGUvZGF0ZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUE0QyxNQUFNLGVBQWUsQ0FBQztBQUdwSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUxQyxJQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7O0FBQ3ZCLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQzs7SUE0QnJCLDRCQUFvQixJQUFtQixFQUFVLFVBQTZCO1FBQTFELFNBQUksR0FBSixJQUFJLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFtQjsyQkFmdEQsSUFBSSxZQUFZLEVBQWE7d0JBTWhDLElBQUksWUFBWSxFQUFhO3lCQUU5QixjQUFjOzZCQUlsQixhQUFhO2dDQUNWLGdCQUFnQjtLQUVnRDs7OztJQUVuRixxQ0FBUTs7O0lBQVIsZUFBb0I7Ozs7O0lBRXBCLHdDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLFVBQU87WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sa0JBQWU7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sZUFBWSxFQUFFO1lBRTdDLElB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c0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZ1bmN0aW9uUHJvcCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMvY29tbW9uLXdyYXAnO1xuaW1wb3J0IHsgaXNOb25FbXB0eVN0cmluZywgaXNUZW1wbGF0ZVJlZiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbC9jaGVjayc7XG5pbXBvcnQgeyB2YWx1ZUZ1bmN0aW9uUHJvcCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IERhdGVIZWxwZXJCeURhdGVQaXBlLCBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vZGF0ZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOekNhbGVuZGFySTE4bkludGVyZmFjZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vbnotaTE4bi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vbnotaTE4bi5zZXJ2aWNlJztcbmltcG9ydCB7IENhbmR5RGF0ZSB9IGZyb20gJy4uL2NhbmR5LWRhdGUnO1xuXG5jb25zdCBEQVRFX1JPV19OVU0gPSA2O1xuY29uc3QgREFURV9DT0xfTlVNID0gNztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZS10YWJsZS5jb21wb25lbnQuaHRtbCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRlVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxvY2FsZTogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IENhbmR5RGF0ZVtdOyAvLyBSYW5nZSBPTkxZXG4gIEBJbnB1dCgpIGhvdmVyVmFsdWU6IENhbmR5RGF0ZVtdOyAvLyBSYW5nZSBPTkxZXG5cbiAgQElucHV0KCkgdmFsdWU6IENhbmR5RGF0ZTtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7XG5cbiAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVkRGF0ZTogKGQ6IERhdGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRhdGVSZW5kZXI6IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZz47IC8vIEN1c3RvbWl6ZSBkYXRlIGNvbnRlbnQgd2hpbGUgcmVuZGVyaW5nXG5cbiAgQE91dHB1dCgpIGRheUhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7IC8vIEVtaXR0ZWQgd2hlbiBob3ZlciBvbiBhIGRheSBieSBtb3VzZSBlbnRlclxuXG4gIHByZWZpeENsczogc3RyaW5nID0gJ2FudC1jYWxlbmRhcic7XG4gIGhlYWRXZWVrRGF5czogV2Vla0RheUxhYmVsW107XG4gIHdlZWtSb3dzOiBXZWVrUm93W107XG5cbiAgaXNUZW1wbGF0ZVJlZiA9IGlzVGVtcGxhdGVSZWY7XG4gIGlzTm9uRW1wdHlTdHJpbmcgPSBpc05vbkVtcHR5U3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSwgcHJpdmF0ZSBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEYXRlUmVhbENoYW5nZShjaGFuZ2VzLnZhbHVlKSB8fFxuICAgICAgICB0aGlzLmlzRGF0ZVJlYWxDaGFuZ2UoY2hhbmdlcy5zZWxlY3RlZFZhbHVlKSB8fFxuICAgICAgICB0aGlzLmlzRGF0ZVJlYWxDaGFuZ2UoY2hhbmdlcy5ob3ZlclZhbHVlKSkge1xuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNEYXRlUmVhbENoYW5nZShjaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWU6IENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdID0gY2hhbmdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdID0gY2hhbmdlLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHByZXZpb3VzVmFsdWUpIHx8XG4gICAgICAgICAgY3VycmVudFZhbHVlLmxlbmd0aCAhPT0gcHJldmlvdXNWYWx1ZS5sZW5ndGggfHxcbiAgICAgICAgICBjdXJyZW50VmFsdWUuc29tZSgodmFsdWUsIGluZGV4KSA9PiAhdGhpcy5pc1NhbWVEYXRlKHByZXZpb3VzVmFsdWVbaW5kZXhdLCB2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzU2FtZURhdGUocHJldmlvdXNWYWx1ZSBhcyBDYW5keURhdGUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTYW1lRGF0ZShsZWZ0OiBDYW5keURhdGUsIHJpZ2h0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCFsZWZ0ICYmICFyaWdodCkgfHwgKGxlZnQgJiYgcmlnaHQgJiYgcmlnaHQuaXNTYW1lKGxlZnQsICdkYXknKSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5oZWFkV2Vla0RheXMgPSB0aGlzLm1ha2VIZWFkV2Vla0RheXMoKTtcbiAgICAgIHRoaXMud2Vla1Jvd3MgPSB0aGlzLm1ha2VXZWVrUm93cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlVmFsdWVGcm9tSW5zaWRlKHZhbHVlOiBDYW5keURhdGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIC8vIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWFrZUhlYWRXZWVrRGF5cygpOiBXZWVrRGF5TGFiZWxbXSB7XG4gICAgY29uc3Qgd2Vla0RheXM6IFdlZWtEYXlMYWJlbFtdID0gW107XG4gICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmRhdGVIZWxwZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgREFURV9DT0xfTlVNOyBjb2xJbmRleCArKykge1xuICAgICAgY29uc3QgZGF5ID0gKGZpcnN0RGF5T2ZXZWVrICsgY29sSW5kZXgpICUgREFURV9DT0xfTlVNO1xuICAgICAgY29uc3QgdGVtcERhdGUgPSB0aGlzLnZhbHVlLnNldERheShkYXkpO1xuICAgICAgd2Vla0RheXNbIGNvbEluZGV4IF0gPSB7XG4gICAgICAgIHNob3J0OiB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KHRlbXBEYXRlLm5hdGl2ZURhdGUsIHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSA/ICdFJyA6ICdkZGQnKSwgLy8gZWcuIFR1ZVxuICAgICAgICB2ZXJ5U2hvcnQ6IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQodGVtcERhdGUubmF0aXZlRGF0ZSwgdGhpcy5nZXRWZXJ5U2hvcnRXZWVrRm9ybWF0KCkpIC8vIGVnLiBUdVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtEYXlzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWZXJ5U2hvcnRXZWVrRm9ybWF0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaTE4bi5nZXRMb2NhbGVJZCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignemgnKSA9PT0gMCA/ICdFRUVFRScgOiAnRUVFRUVFJzsgLy8gVXNlIGV4dHJlbWUgc2hvcnQgZm9yIGNoaW5lc2VcbiAgICB9XG4gICAgcmV0dXJuICdkZCc7XG4gIH1cblxuICBwcml2YXRlIG1ha2VXZWVrUm93cygpOiBXZWVrUm93W10ge1xuICAgIC8vIGxldCBqdXN0UmVuZGVyZWQgPSB0cnVlO1xuICAgIGNvbnN0IHdlZWtSb3dzOiBXZWVrUm93W10gPSBbXTtcbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZGF0ZUhlbHBlci5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLnZhbHVlLnNldERhdGUoMSk7XG4gICAgLy8gY29uc3QgZmlyc3REYXRlVG9TaG93ID0gZmlyc3REYXRlT2ZNb250aC5zZXREYXkoZmlyc3REYXlPZldlZWssIHsgd2Vla1N0YXJ0c09uOiBmaXJzdERheU9mV2VlayB9KTtcbiAgICBjb25zdCBmaXJzdERhdGVPZmZzZXQgPSAoZmlyc3REYXRlT2ZNb250aC5nZXREYXkoKSArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xuICAgIGNvbnN0IGZpcnN0RGF0ZVRvU2hvdyA9IGZpcnN0RGF0ZU9mTW9udGguYWRkRGF5cygwIC0gZmlyc3REYXRlT2Zmc2V0KTtcblxuICAgIGxldCBpbmNyZWFzZWQgPSAwO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBEQVRFX1JPV19OVU07IHJvd0luZGV4ICsrKSB7XG4gICAgICBjb25zdCB3ZWVrOiBXZWVrUm93ID0gd2Vla1Jvd3Nbcm93SW5kZXhdID0ge1xuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGlzQ3VycmVudDogZmFsc2UsXG4gICAgICAgIGRhdGVDZWxsczogW11cbiAgICAgIH07XG5cbiAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBEQVRFX0NPTF9OVU07IGNvbEluZGV4ICsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBmaXJzdERhdGVUb1Nob3cuYWRkRGF5cyhpbmNyZWFzZWQgKyspO1xuICAgICAgICBjb25zdCBpc0JlZm9yZU1vbnRoWWVhciA9IHRoaXMuaXNCZWZvcmVNb250aFllYXIoY3VycmVudCwgdGhpcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGlzQWZ0ZXJNb250aFllYXIgPSB0aGlzLmlzQWZ0ZXJNb250aFllYXIoY3VycmVudCwgdGhpcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNlbGw6IERhdGVDZWxsID0ge1xuICAgICAgICAgIHZhbHVlOiBjdXJyZW50LFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzVG9kYXk6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiB0aGlzLmdldERhdGVUaXRsZShjdXJyZW50KSxcbiAgICAgICAgICBjdXN0b21Db250ZW50OiB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLmRhdGVSZW5kZXIsIGN1cnJlbnQpLCAvLyBDdXN0b21pemVkIGNvbnRlbnRcbiAgICAgICAgICBjb250ZW50OiBgJHtjdXJyZW50LmdldERhdGUoKX1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hhbmdlVmFsdWVGcm9tSW5zaWRlKGN1cnJlbnQpLFxuICAgICAgICAgIG9uTW91c2VFbnRlcjogKCkgPT4gdGhpcy5kYXlIb3Zlci5lbWl0KGNlbGwudmFsdWUpXG4gICAgICAgICAgLy8gb25Nb3VzZUVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiAoIWp1c3RSZW5kZXJlZCkgeyAvLyBbSGFja10gVG8gcHJldmVudCB0aGUgaW1tZWRpYXRlbHkgXCJtb3VzZWVudGVyXCIgZXZlbnQgd2hlbiBpdCBqdXN0IHJlbmRlcmVkLCBvciB0aGUgXCJob3ZlclZhbHVlXCIgbWF5IGFsd2F5cyBzYWlkIGFzIGNoYW5nZWRcbiAgICAgICAgICAgICAgLy8gdGhpcy5kYXlIb3Zlci5lbWl0KGNlbGwudmFsdWUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8ganVzdFJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrICYmICF3ZWVrLndlZWtOdW0pIHtcbiAgICAgICAgICB3ZWVrLndlZWtOdW0gPSB0aGlzLmdldFdlZWtOdW0oY3VycmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudC5pc1RvZGF5KCkpIHtcbiAgICAgICAgICBjZWxsLmlzVG9kYXkgPSB0cnVlO1xuICAgICAgICAgIHdlZWsuaXNDdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2VsZWN0ZWRWYWx1ZSkgJiYgIWlzQmVmb3JlTW9udGhZZWFyICYmICFpc0FmdGVyTW9udGhZZWFyKSB7IC8vIFJhbmdlIHNlbGVjdGlvbnNcbiAgICAgICAgICBjb25zdCByYW5nZVZhbHVlID0gdGhpcy5ob3ZlclZhbHVlICYmIHRoaXMuaG92ZXJWYWx1ZS5sZW5ndGggPyB0aGlzLmhvdmVyVmFsdWUgOiB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSByYW5nZVZhbHVlWzBdO1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHJhbmdlVmFsdWVbMV07XG4gICAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoc3RhcnQsICdkYXknKSkge1xuICAgICAgICAgICAgICBjZWxsLmlzU2VsZWN0ZWRTdGFydERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICBjZWxsLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB3ZWVrLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkRW5kRGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3ZWVrLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmlzQWZ0ZXIoc3RhcnQsICdkYXknKSAmJiBjdXJyZW50LmlzQmVmb3JlKGVuZCwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5pc0luUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnQuaXNTYW1lKHRoaXMudmFsdWUsICdkYXknKSkge1xuICAgICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgd2Vlay5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGUgJiYgdGhpcy5kaXNhYmxlZERhdGUoY3VycmVudC5uYXRpdmVEYXRlKSkge1xuICAgICAgICAgIGNlbGwuaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxsLmNsYXNzTWFwID0ge1xuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY2VsbGBdOiB0cnVlLFxuICAgICAgICAgIC8vIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtZGF0ZWBdOiBmYWxzZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LXRvZGF5YF06IGNlbGwuaXNUb2RheSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWxhc3QtbW9udGgtY2VsbGBdOiBpc0JlZm9yZU1vbnRoWWVhcixcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LW5leHQtbW9udGgtYnRuLWRheWBdOiBpc0FmdGVyTW9udGhZZWFyLFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtZGF5YF06IGNlbGwuaXNTZWxlY3RlZCxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkLWNlbGxgXTogY2VsbC5pc0Rpc2FibGVkLFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtc3RhcnQtZGF0ZWBdOiAhIWNlbGwuaXNTZWxlY3RlZFN0YXJ0RGF0ZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LXNlbGVjdGVkLWVuZC1kYXRlYF06ICEhY2VsbC5pc1NlbGVjdGVkRW5kRGF0ZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWluLXJhbmdlLWNlbGxgXTogISFjZWxsLmlzSW5SYW5nZVxuICAgICAgICB9O1xuXG4gICAgICAgIHdlZWsuZGF0ZUNlbGxzLnB1c2goY2VsbCk7XG4gICAgICB9XG5cbiAgICAgIHdlZWsuY2xhc3NNYXAgPSB7XG4gICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY3VycmVudC13ZWVrYF06IHdlZWsuaXNDdXJyZW50LFxuICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWFjdGl2ZS13ZWVrYF06IHdlZWsuaXNBY3RpdmVcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB3ZWVrUm93cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZVRpdGxlKGRhdGU6IENhbmR5RGF0ZSk6IHN0cmluZyB7XG4gICAgLy8gTk9URTogQ29tcGF0IGZvciBEYXRlUGlwZSBmb3JtYXR0aW5nIHJ1bGVzXG4gICAgbGV0IGRhdGVGb3JtYXQ6IHN0cmluZyA9ICh0aGlzLmxvY2FsZSAmJiB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0KSB8fCAnWVlZWS1NTS1ERCc7XG4gICAgaWYgKHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSkge1xuICAgICAgZGF0ZUZvcm1hdCA9ICh0aGlzLmRhdGVIZWxwZXIgYXMgRGF0ZUhlbHBlckJ5RGF0ZVBpcGUpLnRyYW5zQ29tcGF0Rm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRlSGVscGVyLmZvcm1hdChkYXRlLm5hdGl2ZURhdGUsIGRhdGVGb3JtYXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXZWVrTnVtKGRhdGU6IENhbmR5RGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUhlbHBlci5nZXRJU09XZWVrKGRhdGUubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIGlzQmVmb3JlTW9udGhZZWFyKGN1cnJlbnQ6IENhbmR5RGF0ZSwgdGFyZ2V0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoY3VycmVudC5nZXRZZWFyKCkgPCB0YXJnZXQuZ2V0WWVhcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQuZ2V0WWVhcigpID09PSB0YXJnZXQuZ2V0WWVhcigpICYmIGN1cnJlbnQuZ2V0TW9udGgoKSA8IHRhcmdldC5nZXRNb250aCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FmdGVyTW9udGhZZWFyKGN1cnJlbnQ6IENhbmR5RGF0ZSwgdGFyZ2V0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoY3VycmVudC5nZXRZZWFyKCkgPiB0YXJnZXQuZ2V0WWVhcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQuZ2V0WWVhcigpID09PSB0YXJnZXQuZ2V0WWVhcigpICYmIGN1cnJlbnQuZ2V0TW9udGgoKSA+IHRhcmdldC5nZXRNb250aCgpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2Vla0RheUxhYmVsIHtcbiAgc2hvcnQ6IHN0cmluZztcbiAgdmVyeVNob3J0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZUNlbGwge1xuICB2YWx1ZTogQ2FuZHlEYXRlO1xuICB0aXRsZTogc3RyaW5nO1xuICBjdXN0b21Db250ZW50OiBUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZztcbiAgY29udGVudDogc3RyaW5nO1xuICBpc1NlbGVjdGVkPzogYm9vbGVhbjtcbiAgaXNUb2RheT86IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuICBpc1NlbGVjdGVkU3RhcnREYXRlPzogYm9vbGVhbjtcbiAgaXNTZWxlY3RlZEVuZERhdGU/OiBib29sZWFuO1xuICBpc0luUmFuZ2U/OiBib29sZWFuO1xuICBjbGFzc01hcD86IG9iamVjdDtcbiAgb25DbGljayhkYXRlOiBDYW5keURhdGUpOiB2b2lkO1xuICBvbk1vdXNlRW50ZXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWVrUm93IHtcbiAgaXNDdXJyZW50PzogYm9vbGVhbjsgLy8gSXMgdGhlIHdlZWsgdGhhdCB0b2RheSBzdGF5cyBpblxuICBpc0FjdGl2ZT86IGJvb2xlYW47IC8vIElzIHRoZSB3ZWVrIHRoYXQgY3VycmVudCBzZXR0aW5nIGRhdGUgc3RheXMgaW5cbiAgd2Vla051bT86IG51bWJlcjtcbiAgY2xhc3NNYXA/OiBvYmplY3Q7XG4gIGRhdGVDZWxsczogRGF0ZUNlbGxbXTtcbn1cbiJdfQ==