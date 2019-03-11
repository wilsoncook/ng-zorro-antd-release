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
const DATE_ROW_NUM = 6;
/** @type {?} */
const DATE_COL_NUM = 7;
export class DateTableComponent {
    /**
     * @param {?} i18n
     * @param {?} dateHelper
     */
    constructor(i18n, dateHelper) {
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
    ngOnInit() { }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.isDateRealChange(changes["value"]) ||
            this.isDateRealChange(changes["selectedValue"]) ||
            this.isDateRealChange(changes["hoverValue"])) {
            this.render();
        }
    }
    /**
     * @param {?} change
     * @return {?}
     */
    isDateRealChange(change) {
        if (change) {
            /** @type {?} */
            const previousValue = change.previousValue;
            /** @type {?} */
            const currentValue = change.currentValue;
            if (Array.isArray(currentValue)) {
                return !Array.isArray(previousValue) ||
                    currentValue.length !== previousValue.length ||
                    currentValue.some((value, index) => !this.isSameDate(previousValue[index], value));
            }
            else {
                return !this.isSameDate(/** @type {?} */ (previousValue), currentValue);
            }
        }
        return false;
    }
    /**
     * @param {?} left
     * @param {?} right
     * @return {?}
     */
    isSameDate(left, right) {
        return (!left && !right) || (left && right && right.isSame(left, 'day'));
    }
    /**
     * @return {?}
     */
    render() {
        if (this.value) {
            this.headWeekDays = this.makeHeadWeekDays();
            this.weekRows = this.makeWeekRows();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeValueFromInside(value) {
        if (this.value !== value) {
            // this.value = value;
            // this.valueChange.emit(this.value);
            // this.render();
            this.valueChange.emit(value);
        }
    }
    /**
     * @return {?}
     */
    makeHeadWeekDays() {
        /** @type {?} */
        const weekDays = [];
        /** @type {?} */
        const firstDayOfWeek = this.dateHelper.getFirstDayOfWeek();
        for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
            /** @type {?} */
            const day = (firstDayOfWeek + colIndex) % DATE_COL_NUM;
            /** @type {?} */
            const tempDate = this.value.setDay(day);
            weekDays[colIndex] = {
                short: this.dateHelper.format(tempDate.nativeDate, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd'),
                // eg. Tue
                veryShort: this.dateHelper.format(tempDate.nativeDate, this.getVeryShortWeekFormat()) // eg. Tu
            };
        }
        return weekDays;
    }
    /**
     * @return {?}
     */
    getVeryShortWeekFormat() {
        if (this.dateHelper.relyOnDatePipe) {
            return this.i18n.getLocaleId().toLowerCase().indexOf('zh') === 0 ? 'EEEEE' : 'EEEEEE'; // Use extreme short for chinese
        }
        return 'dd';
    }
    /**
     * @return {?}
     */
    makeWeekRows() {
        /** @type {?} */
        const weekRows = [];
        /** @type {?} */
        const firstDayOfWeek = this.dateHelper.getFirstDayOfWeek();
        /** @type {?} */
        const firstDateOfMonth = this.value.setDate(1);
        /** @type {?} */
        const firstDateOffset = (firstDateOfMonth.getDay() + 7 - firstDayOfWeek) % 7;
        /** @type {?} */
        const firstDateToShow = firstDateOfMonth.addDays(0 - firstDateOffset);
        /** @type {?} */
        let increased = 0;
        for (let rowIndex = 0; rowIndex < DATE_ROW_NUM; rowIndex++) {
            /** @type {?} */
            const week = weekRows[rowIndex] = {
                isActive: false,
                isCurrent: false,
                dateCells: []
            };
            for (let colIndex = 0; colIndex < DATE_COL_NUM; colIndex++) {
                /** @type {?} */
                const current = firstDateToShow.addDays(increased++);
                /** @type {?} */
                const isBeforeMonthYear = this.isBeforeMonthYear(current, this.value);
                /** @type {?} */
                const isAfterMonthYear = this.isAfterMonthYear(current, this.value);
                /** @type {?} */
                const cell = {
                    value: current,
                    isSelected: false,
                    isDisabled: false,
                    isToday: false,
                    title: this.getDateTitle(current),
                    customContent: valueFunctionProp(this.dateRender, current),
                    // Customized content
                    content: `${current.getDate()}`,
                    onClick: () => this.changeValueFromInside(current),
                    onMouseEnter: () => this.dayHover.emit(cell.value)
                };
                if (this.showWeek && !week.weekNum) {
                    week.weekNum = this.getWeekNum(current);
                }
                if (current.isToday()) {
                    cell.isToday = true;
                    week.isCurrent = true;
                }
                if (Array.isArray(this.selectedValue) && !isBeforeMonthYear && !isAfterMonthYear) { // Range selections
                    /** @type {?} */
                    const rangeValue = this.hoverValue && this.hoverValue.length ? this.hoverValue : this.selectedValue;
                    /** @type {?} */
                    const start = rangeValue[0];
                    /** @type {?} */
                    const end = rangeValue[1];
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
                else if (current.isSame(this.value, 'day')) {
                    cell.isSelected = true;
                    week.isActive = true;
                }
                if (this.disabledDate && this.disabledDate(current.nativeDate)) {
                    cell.isDisabled = true;
                }
                cell.classMap = {
                    [`${this.prefixCls}-cell`]: true,
                    // [`${this.prefixCls}-selected-date`]: false,
                    [`${this.prefixCls}-today`]: cell.isToday,
                    [`${this.prefixCls}-last-month-cell`]: isBeforeMonthYear,
                    [`${this.prefixCls}-next-month-btn-day`]: isAfterMonthYear,
                    [`${this.prefixCls}-selected-day`]: cell.isSelected,
                    [`${this.prefixCls}-disabled-cell`]: cell.isDisabled,
                    [`${this.prefixCls}-selected-start-date`]: !!cell.isSelectedStartDate,
                    [`${this.prefixCls}-selected-end-date`]: !!cell.isSelectedEndDate,
                    [`${this.prefixCls}-in-range-cell`]: !!cell.isInRange
                };
                week.dateCells.push(cell);
            }
            week.classMap = {
                [`${this.prefixCls}-current-week`]: week.isCurrent,
                [`${this.prefixCls}-active-week`]: week.isActive
            };
        }
        return weekRows;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDateTitle(date) {
        /** @type {?} */
        let dateFormat = (this.locale && this.locale.dateFormat) || 'YYYY-MM-DD';
        if (this.dateHelper.relyOnDatePipe) {
            dateFormat = (/** @type {?} */ (this.dateHelper)).transCompatFormat(dateFormat);
        }
        return this.dateHelper.format(date.nativeDate, dateFormat);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getWeekNum(date) {
        return this.dateHelper.getISOWeek(date.nativeDate);
    }
    /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    isBeforeMonthYear(current, target) {
        if (current.getYear() < target.getYear()) {
            return true;
        }
        return current.getYear() === target.getYear() && current.getMonth() < target.getMonth();
    }
    /**
     * @param {?} current
     * @param {?} target
     * @return {?}
     */
    isAfterMonthYear(current, target) {
        if (current.getYear() > target.getYear()) {
            return true;
        }
        return current.getYear() === target.getYear() && current.getMonth() > target.getMonth();
    }
}
DateTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'date-table',
                template: "<table class=\"{{ prefixCls }}-table\" cellSpacing=\"0\" role=\"grid\">\n  <thead>\n    <tr role=\"row\">\n      <th *ngIf=\"showWeek\" role=\"columnheader\" class=\"{{ prefixCls }}-column-header {{ prefixCls }}-week-number-header\">\n        <span class=\"{{ prefixCls }}-column-header-inner\">x</span>\n      </th>\n      <th *ngFor=\"let cell of headWeekDays\"\n        role=\"columnheader\"\n        title=\"{{ cell.short }}\"\n        class=\"{{ prefixCls }}-column-header\"\n      >\n        <span class=\"{{ prefixCls }}-column-header-inner\">{{ cell.veryShort }}</span>\n      </th>\n    </tr>\n  </thead>\n  <tbody class=\"{{ prefixCls }}-tbody\">\n    <tr *ngFor=\"let row of weekRows\" [ngClass]=\"row.classMap\" role=\"row\">\n      <td *ngIf=\"row.weekNum\" role=\"gridcell\" class=\"{{ prefixCls }}-week-number-cell\">\n        {{ row.weekNum }}\n      </td>\n      <td\n        *ngFor=\"let cell of row.dateCells\"\n        (click)=\"cell.isDisabled ? null : cell.onClick()\"\n        (mouseenter)=\"cell.isDisabled ? null : cell.onMouseEnter()\"\n        title=\"{{ cell.title }}\"\n        [ngClass]=\"cell.classMap\"\n        role=\"gridcell\"\n      >\n\n        <ng-container [ngSwitch]=\"true\">\n          <ng-container *ngSwitchCase=\"isTemplateRef(cell.customContent)\">\n            <ng-container *ngTemplateOutlet=\"cell.customContent; context: { $implicit: cell.value }\"></ng-container>\n          </ng-container>\n          <ng-container *ngSwitchCase=\"isNonEmptyString(cell.customContent)\">\n            <span [innerHTML]=\"cell.customContent\"></span>\n          </ng-container>\n          <ng-container *ngSwitchDefault>\n            <div\n              class=\"{{ prefixCls }}-date\"\n              [attr.aria-selected]=\"cell.isSelected\"\n              [attr.aria-disabled]=\"cell.isDisabled\"\n            >\n              {{ cell.content }}\n            </div>\n          </ng-container>\n        </ng-container>\n\n      </td>\n    </tr>\n  </tbody>\n</table>"
            }] }
];
/** @nocollapse */
DateTableComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: DateHelperService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvbGliL2RhdGUvZGF0ZS10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUE0QyxNQUFNLGVBQWUsQ0FBQztBQUdwSSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBRTVGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUxQyxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7O0FBQ3ZCLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztBQU92QixNQUFNOzs7OztJQXFCSixZQUFvQixJQUFtQixFQUFVLFVBQTZCO1FBQTFELFNBQUksR0FBSixJQUFJLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFtQjsyQkFmdEQsSUFBSSxZQUFZLEVBQWE7d0JBTWhDLElBQUksWUFBWSxFQUFhO3lCQUU5QixjQUFjOzZCQUlsQixhQUFhO2dDQUNWLGdCQUFnQjtLQUVnRDs7OztJQUVuRixRQUFRLE1BQVk7Ozs7O0lBRXBCLFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLFVBQU87WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sa0JBQWU7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sZUFBWSxFQUFFO1lBRTdDLElBQUksQ0FB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QWlCOzs7cUJBYzdDLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO29CQUVMLEtBQUs7MEJBQ0wsTUFBTTt1QkFFTixLQUFLOzJCQUNMLEtBQUs7eUJBQ0wsS0FBSzt1QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgU2ltcGxlQ2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZ1bmN0aW9uUHJvcCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdHlwZXMvY29tbW9uLXdyYXAnO1xuaW1wb3J0IHsgaXNOb25FbXB0eVN0cmluZywgaXNUZW1wbGF0ZVJlZiB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbC9jaGVjayc7XG5pbXBvcnQgeyB2YWx1ZUZ1bmN0aW9uUHJvcCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IERhdGVIZWxwZXJCeURhdGVQaXBlLCBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vZGF0ZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOekNhbGVuZGFySTE4bkludGVyZmFjZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vbnotaTE4bi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vbnotaTE4bi5zZXJ2aWNlJztcbmltcG9ydCB7IENhbmR5RGF0ZSB9IGZyb20gJy4uL2NhbmR5LWRhdGUnO1xuXG5jb25zdCBEQVRFX1JPV19OVU0gPSA2O1xuY29uc3QgREFURV9DT0xfTlVNID0gNztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGF0ZS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnZGF0ZS10YWJsZS5jb21wb25lbnQuaHRtbCdcbn0pXG5cbmV4cG9ydCBjbGFzcyBEYXRlVGFibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGxvY2FsZTogTnpDYWxlbmRhckkxOG5JbnRlcmZhY2U7XG4gIEBJbnB1dCgpIHNlbGVjdGVkVmFsdWU6IENhbmR5RGF0ZVtdOyAvLyBSYW5nZSBPTkxZXG4gIEBJbnB1dCgpIGhvdmVyVmFsdWU6IENhbmR5RGF0ZVtdOyAvLyBSYW5nZSBPTkxZXG5cbiAgQElucHV0KCkgdmFsdWU6IENhbmR5RGF0ZTtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7XG5cbiAgQElucHV0KCkgc2hvd1dlZWs6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRpc2FibGVkRGF0ZTogKGQ6IERhdGUpID0+IGJvb2xlYW47XG4gIEBJbnB1dCgpIGRhdGVSZW5kZXI6IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZz47IC8vIEN1c3RvbWl6ZSBkYXRlIGNvbnRlbnQgd2hpbGUgcmVuZGVyaW5nXG5cbiAgQE91dHB1dCgpIGRheUhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxDYW5keURhdGU+KCk7IC8vIEVtaXR0ZWQgd2hlbiBob3ZlciBvbiBhIGRheSBieSBtb3VzZSBlbnRlclxuXG4gIHByZWZpeENsczogc3RyaW5nID0gJ2FudC1jYWxlbmRhcic7XG4gIGhlYWRXZWVrRGF5czogV2Vla0RheUxhYmVsW107XG4gIHdlZWtSb3dzOiBXZWVrUm93W107XG5cbiAgaXNUZW1wbGF0ZVJlZiA9IGlzVGVtcGxhdGVSZWY7XG4gIGlzTm9uRW1wdHlTdHJpbmcgPSBpc05vbkVtcHR5U3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSwgcHJpdmF0ZSBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7IH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNEYXRlUmVhbENoYW5nZShjaGFuZ2VzLnZhbHVlKSB8fFxuICAgICAgICB0aGlzLmlzRGF0ZVJlYWxDaGFuZ2UoY2hhbmdlcy5zZWxlY3RlZFZhbHVlKSB8fFxuICAgICAgICB0aGlzLmlzRGF0ZVJlYWxDaGFuZ2UoY2hhbmdlcy5ob3ZlclZhbHVlKSkge1xuXG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNEYXRlUmVhbENoYW5nZShjaGFuZ2U6IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjaGFuZ2UpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWU6IENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdID0gY2hhbmdlLnByZXZpb3VzVmFsdWU7XG4gICAgICBjb25zdCBjdXJyZW50VmFsdWU6IENhbmR5RGF0ZSB8IENhbmR5RGF0ZVtdID0gY2hhbmdlLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICFBcnJheS5pc0FycmF5KHByZXZpb3VzVmFsdWUpIHx8XG4gICAgICAgICAgY3VycmVudFZhbHVlLmxlbmd0aCAhPT0gcHJldmlvdXNWYWx1ZS5sZW5ndGggfHxcbiAgICAgICAgICBjdXJyZW50VmFsdWUuc29tZSgodmFsdWUsIGluZGV4KSA9PiAhdGhpcy5pc1NhbWVEYXRlKHByZXZpb3VzVmFsdWVbaW5kZXhdLCB2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzU2FtZURhdGUocHJldmlvdXNWYWx1ZSBhcyBDYW5keURhdGUsIGN1cnJlbnRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTYW1lRGF0ZShsZWZ0OiBDYW5keURhdGUsIHJpZ2h0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCFsZWZ0ICYmICFyaWdodCkgfHwgKGxlZnQgJiYgcmlnaHQgJiYgcmlnaHQuaXNTYW1lKGxlZnQsICdkYXknKSk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy5oZWFkV2Vla0RheXMgPSB0aGlzLm1ha2VIZWFkV2Vla0RheXMoKTtcbiAgICAgIHRoaXMud2Vla1Jvd3MgPSB0aGlzLm1ha2VXZWVrUm93cygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlVmFsdWVGcm9tSW5zaWRlKHZhbHVlOiBDYW5keURhdGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIC8vIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyKCk7XG4gICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWFrZUhlYWRXZWVrRGF5cygpOiBXZWVrRGF5TGFiZWxbXSB7XG4gICAgY29uc3Qgd2Vla0RheXM6IFdlZWtEYXlMYWJlbFtdID0gW107XG4gICAgY29uc3QgZmlyc3REYXlPZldlZWsgPSB0aGlzLmRhdGVIZWxwZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgICBmb3IgKGxldCBjb2xJbmRleCA9IDA7IGNvbEluZGV4IDwgREFURV9DT0xfTlVNOyBjb2xJbmRleCArKykge1xuICAgICAgY29uc3QgZGF5ID0gKGZpcnN0RGF5T2ZXZWVrICsgY29sSW5kZXgpICUgREFURV9DT0xfTlVNO1xuICAgICAgY29uc3QgdGVtcERhdGUgPSB0aGlzLnZhbHVlLnNldERheShkYXkpO1xuICAgICAgd2Vla0RheXNbIGNvbEluZGV4IF0gPSB7XG4gICAgICAgIHNob3J0OiB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KHRlbXBEYXRlLm5hdGl2ZURhdGUsIHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSA/ICdFJyA6ICdkZGQnKSwgLy8gZWcuIFR1ZVxuICAgICAgICB2ZXJ5U2hvcnQ6IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQodGVtcERhdGUubmF0aXZlRGF0ZSwgdGhpcy5nZXRWZXJ5U2hvcnRXZWVrRm9ybWF0KCkpIC8vIGVnLiBUdVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtEYXlzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWZXJ5U2hvcnRXZWVrRm9ybWF0KCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaTE4bi5nZXRMb2NhbGVJZCgpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignemgnKSA9PT0gMCA/ICdFRUVFRScgOiAnRUVFRUVFJzsgLy8gVXNlIGV4dHJlbWUgc2hvcnQgZm9yIGNoaW5lc2VcbiAgICB9XG4gICAgcmV0dXJuICdkZCc7XG4gIH1cblxuICBwcml2YXRlIG1ha2VXZWVrUm93cygpOiBXZWVrUm93W10ge1xuICAgIC8vIGxldCBqdXN0UmVuZGVyZWQgPSB0cnVlO1xuICAgIGNvbnN0IHdlZWtSb3dzOiBXZWVrUm93W10gPSBbXTtcbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuZGF0ZUhlbHBlci5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgIGNvbnN0IGZpcnN0RGF0ZU9mTW9udGggPSB0aGlzLnZhbHVlLnNldERhdGUoMSk7XG4gICAgLy8gY29uc3QgZmlyc3REYXRlVG9TaG93ID0gZmlyc3REYXRlT2ZNb250aC5zZXREYXkoZmlyc3REYXlPZldlZWssIHsgd2Vla1N0YXJ0c09uOiBmaXJzdERheU9mV2VlayB9KTtcbiAgICBjb25zdCBmaXJzdERhdGVPZmZzZXQgPSAoZmlyc3REYXRlT2ZNb250aC5nZXREYXkoKSArIDcgLSBmaXJzdERheU9mV2VlaykgJSA3O1xuICAgIGNvbnN0IGZpcnN0RGF0ZVRvU2hvdyA9IGZpcnN0RGF0ZU9mTW9udGguYWRkRGF5cygwIC0gZmlyc3REYXRlT2Zmc2V0KTtcblxuICAgIGxldCBpbmNyZWFzZWQgPSAwO1xuICAgIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBEQVRFX1JPV19OVU07IHJvd0luZGV4ICsrKSB7XG4gICAgICBjb25zdCB3ZWVrOiBXZWVrUm93ID0gd2Vla1Jvd3Nbcm93SW5kZXhdID0ge1xuICAgICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGlzQ3VycmVudDogZmFsc2UsXG4gICAgICAgIGRhdGVDZWxsczogW11cbiAgICAgIH07XG5cbiAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBEQVRFX0NPTF9OVU07IGNvbEluZGV4ICsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBmaXJzdERhdGVUb1Nob3cuYWRkRGF5cyhpbmNyZWFzZWQgKyspO1xuICAgICAgICBjb25zdCBpc0JlZm9yZU1vbnRoWWVhciA9IHRoaXMuaXNCZWZvcmVNb250aFllYXIoY3VycmVudCwgdGhpcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGlzQWZ0ZXJNb250aFllYXIgPSB0aGlzLmlzQWZ0ZXJNb250aFllYXIoY3VycmVudCwgdGhpcy52YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNlbGw6IERhdGVDZWxsID0ge1xuICAgICAgICAgIHZhbHVlOiBjdXJyZW50LFxuICAgICAgICAgIGlzU2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzVG9kYXk6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiB0aGlzLmdldERhdGVUaXRsZShjdXJyZW50KSxcbiAgICAgICAgICBjdXN0b21Db250ZW50OiB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLmRhdGVSZW5kZXIsIGN1cnJlbnQpLCAvLyBDdXN0b21pemVkIGNvbnRlbnRcbiAgICAgICAgICBjb250ZW50OiBgJHtjdXJyZW50LmdldERhdGUoKX1gLFxuICAgICAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuY2hhbmdlVmFsdWVGcm9tSW5zaWRlKGN1cnJlbnQpLFxuICAgICAgICAgIG9uTW91c2VFbnRlcjogKCkgPT4gdGhpcy5kYXlIb3Zlci5lbWl0KGNlbGwudmFsdWUpXG4gICAgICAgICAgLy8gb25Nb3VzZUVudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiAoIWp1c3RSZW5kZXJlZCkgeyAvLyBbSGFja10gVG8gcHJldmVudCB0aGUgaW1tZWRpYXRlbHkgXCJtb3VzZWVudGVyXCIgZXZlbnQgd2hlbiBpdCBqdXN0IHJlbmRlcmVkLCBvciB0aGUgXCJob3ZlclZhbHVlXCIgbWF5IGFsd2F5cyBzYWlkIGFzIGNoYW5nZWRcbiAgICAgICAgICAgICAgLy8gdGhpcy5kYXlIb3Zlci5lbWl0KGNlbGwudmFsdWUpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8ganVzdFJlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNob3dXZWVrICYmICF3ZWVrLndlZWtOdW0pIHtcbiAgICAgICAgICB3ZWVrLndlZWtOdW0gPSB0aGlzLmdldFdlZWtOdW0oY3VycmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudC5pc1RvZGF5KCkpIHtcbiAgICAgICAgICBjZWxsLmlzVG9kYXkgPSB0cnVlO1xuICAgICAgICAgIHdlZWsuaXNDdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuc2VsZWN0ZWRWYWx1ZSkgJiYgIWlzQmVmb3JlTW9udGhZZWFyICYmICFpc0FmdGVyTW9udGhZZWFyKSB7IC8vIFJhbmdlIHNlbGVjdGlvbnNcbiAgICAgICAgICBjb25zdCByYW5nZVZhbHVlID0gdGhpcy5ob3ZlclZhbHVlICYmIHRoaXMuaG92ZXJWYWx1ZS5sZW5ndGggPyB0aGlzLmhvdmVyVmFsdWUgOiB0aGlzLnNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSByYW5nZVZhbHVlWzBdO1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHJhbmdlVmFsdWVbMV07XG4gICAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudC5pc1NhbWUoc3RhcnQsICdkYXknKSkge1xuICAgICAgICAgICAgICBjZWxsLmlzU2VsZWN0ZWRTdGFydERhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICBjZWxsLmlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB3ZWVrLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuaXNTYW1lKGVuZCwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkRW5kRGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2VsbC5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB3ZWVrLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50LmlzQWZ0ZXIoc3RhcnQsICdkYXknKSAmJiBjdXJyZW50LmlzQmVmb3JlKGVuZCwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgY2VsbC5pc0luUmFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnQuaXNTYW1lKHRoaXMudmFsdWUsICdkYXknKSkge1xuICAgICAgICAgIGNlbGwuaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgd2Vlay5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGUgJiYgdGhpcy5kaXNhYmxlZERhdGUoY3VycmVudC5uYXRpdmVEYXRlKSkge1xuICAgICAgICAgIGNlbGwuaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxsLmNsYXNzTWFwID0ge1xuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY2VsbGBdOiB0cnVlLFxuICAgICAgICAgIC8vIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtZGF0ZWBdOiBmYWxzZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LXRvZGF5YF06IGNlbGwuaXNUb2RheSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWxhc3QtbW9udGgtY2VsbGBdOiBpc0JlZm9yZU1vbnRoWWVhcixcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LW5leHQtbW9udGgtYnRuLWRheWBdOiBpc0FmdGVyTW9udGhZZWFyLFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtZGF5YF06IGNlbGwuaXNTZWxlY3RlZCxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkLWNlbGxgXTogY2VsbC5pc0Rpc2FibGVkLFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tc2VsZWN0ZWQtc3RhcnQtZGF0ZWBdOiAhIWNlbGwuaXNTZWxlY3RlZFN0YXJ0RGF0ZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LXNlbGVjdGVkLWVuZC1kYXRlYF06ICEhY2VsbC5pc1NlbGVjdGVkRW5kRGF0ZSxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWluLXJhbmdlLWNlbGxgXTogISFjZWxsLmlzSW5SYW5nZVxuICAgICAgICB9O1xuXG4gICAgICAgIHdlZWsuZGF0ZUNlbGxzLnB1c2goY2VsbCk7XG4gICAgICB9XG5cbiAgICAgIHdlZWsuY2xhc3NNYXAgPSB7XG4gICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY3VycmVudC13ZWVrYF06IHdlZWsuaXNDdXJyZW50LFxuICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWFjdGl2ZS13ZWVrYF06IHdlZWsuaXNBY3RpdmVcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB3ZWVrUm93cztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZVRpdGxlKGRhdGU6IENhbmR5RGF0ZSk6IHN0cmluZyB7XG4gICAgLy8gTk9URTogQ29tcGF0IGZvciBEYXRlUGlwZSBmb3JtYXR0aW5nIHJ1bGVzXG4gICAgbGV0IGRhdGVGb3JtYXQ6IHN0cmluZyA9ICh0aGlzLmxvY2FsZSAmJiB0aGlzLmxvY2FsZS5kYXRlRm9ybWF0KSB8fCAnWVlZWS1NTS1ERCc7XG4gICAgaWYgKHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSkge1xuICAgICAgZGF0ZUZvcm1hdCA9ICh0aGlzLmRhdGVIZWxwZXIgYXMgRGF0ZUhlbHBlckJ5RGF0ZVBpcGUpLnRyYW5zQ29tcGF0Rm9ybWF0KGRhdGVGb3JtYXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRlSGVscGVyLmZvcm1hdChkYXRlLm5hdGl2ZURhdGUsIGRhdGVGb3JtYXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRXZWVrTnVtKGRhdGU6IENhbmR5RGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUhlbHBlci5nZXRJU09XZWVrKGRhdGUubmF0aXZlRGF0ZSk7XG4gIH1cblxuICBwcml2YXRlIGlzQmVmb3JlTW9udGhZZWFyKGN1cnJlbnQ6IENhbmR5RGF0ZSwgdGFyZ2V0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoY3VycmVudC5nZXRZZWFyKCkgPCB0YXJnZXQuZ2V0WWVhcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQuZ2V0WWVhcigpID09PSB0YXJnZXQuZ2V0WWVhcigpICYmIGN1cnJlbnQuZ2V0TW9udGgoKSA8IHRhcmdldC5nZXRNb250aCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FmdGVyTW9udGhZZWFyKGN1cnJlbnQ6IENhbmR5RGF0ZSwgdGFyZ2V0OiBDYW5keURhdGUpOiBib29sZWFuIHtcbiAgICBpZiAoY3VycmVudC5nZXRZZWFyKCkgPiB0YXJnZXQuZ2V0WWVhcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1cnJlbnQuZ2V0WWVhcigpID09PSB0YXJnZXQuZ2V0WWVhcigpICYmIGN1cnJlbnQuZ2V0TW9udGgoKSA+IHRhcmdldC5nZXRNb250aCgpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2Vla0RheUxhYmVsIHtcbiAgc2hvcnQ6IHN0cmluZztcbiAgdmVyeVNob3J0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZUNlbGwge1xuICB2YWx1ZTogQ2FuZHlEYXRlO1xuICB0aXRsZTogc3RyaW5nO1xuICBjdXN0b21Db250ZW50OiBUZW1wbGF0ZVJlZjxEYXRlPiB8IHN0cmluZztcbiAgY29udGVudDogc3RyaW5nO1xuICBpc1NlbGVjdGVkPzogYm9vbGVhbjtcbiAgaXNUb2RheT86IGJvb2xlYW47XG4gIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuICBpc1NlbGVjdGVkU3RhcnREYXRlPzogYm9vbGVhbjtcbiAgaXNTZWxlY3RlZEVuZERhdGU/OiBib29sZWFuO1xuICBpc0luUmFuZ2U/OiBib29sZWFuO1xuICBjbGFzc01hcD86IG9iamVjdDtcbiAgb25DbGljayhkYXRlOiBDYW5keURhdGUpOiB2b2lkO1xuICBvbk1vdXNlRW50ZXIoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXZWVrUm93IHtcbiAgaXNDdXJyZW50PzogYm9vbGVhbjsgLy8gSXMgdGhlIHdlZWsgdGhhdCB0b2RheSBzdGF5cyBpblxuICBpc0FjdGl2ZT86IGJvb2xlYW47IC8vIElzIHRoZSB3ZWVrIHRoYXQgY3VycmVudCBzZXR0aW5nIGRhdGUgc3RheXMgaW5cbiAgd2Vla051bT86IG51bWJlcjtcbiAgY2xhc3NNYXA/OiBvYmplY3Q7XG4gIGRhdGVDZWxsczogRGF0ZUNlbGxbXTtcbn1cbiJdfQ==