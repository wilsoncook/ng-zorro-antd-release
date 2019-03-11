/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { forwardRef, Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import addDays from 'date-fns/add_days';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import endOfMonth from 'date-fns/end_of_month';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isSameYear from 'date-fns/is_same_year';
import isThisMonth from 'date-fns/is_this_month';
import isThisYear from 'date-fns/is_this_year';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import startOfYear from 'date-fns/start_of_year';
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { NzDateCellDirective as DateCell, NzDateFullCellDirective as DateFullCell, NzMonthCellDirective as MonthCell, NzMonthFullCellDirective as MonthFullCell } from './nz-calendar-cells';
var NzCalendarComponent = /** @class */ (function () {
    function NzCalendarComponent(i18n, cdr, dateHelper) {
        this.i18n = i18n;
        this.cdr = cdr;
        this.dateHelper = dateHelper;
        this.nzMode = 'month';
        this.nzModeChange = new EventEmitter();
        this.nzValueChange = new EventEmitter();
        this.fullscreen = true;
        this.daysInWeek = [];
        this.monthsInYear = [];
        this.dateMatrix = [];
        this.activeDate = new Date();
        this.currentDateRow = -1;
        this.currentDateCol = -1;
        this.activeDateRow = -1;
        this.activeDateCol = -1;
        this.currentMonthRow = -1;
        this.currentMonthCol = -1;
        this.activeMonthRow = -1;
        this.activeMonthCol = -1;
        this.dateCell = null;
        this.dateFullCell = null;
        this.monthCell = null;
        this.monthFullCell = null;
        this.prefixCls = 'ant-fullcalendar';
        this.currentDate = new Date();
        this.onChangeFn = function () { };
        this.onTouchFn = function () { };
    }
    Object.defineProperty(NzCalendarComponent.prototype, "nzValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.updateDate(value, false); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzDateCell", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.dateCell = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzDateFullCell", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.dateFullCell = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzMonthCell", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.monthCell = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzMonthFullCell", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.monthFullCell = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzFullscreen", {
        get: /**
         * @return {?}
         */
        function () { return this.fullscreen; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.fullscreen = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "nzCard", {
        get: /**
         * @return {?}
         */
        function () { return !this.fullscreen; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.fullscreen = !coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "dateCellChild", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { if (value) {
            this.dateCell = value;
        } },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "dateFullCellChild", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { if (value) {
            this.dateFullCell = value;
        } },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "monthCellChild", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { if (value) {
            this.monthCell = value;
        } },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "monthFullCellChild", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { if (value) {
            this.monthFullCell = value;
        } },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NzCalendarComponent.prototype, "calendarStart", {
        get: /**
         * @return {?}
         */
        function () {
            return startOfWeek(startOfMonth(this.activeDate), { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.setUpDaysInWeek();
        this.setUpMonthsInYear();
        this.setUpDateMatrix();
        this.calculateCurrentDate();
        this.calculateActiveDate();
        this.calculateCurrentMonth();
        this.calculateActiveMonth();
    };
    /**
     * @param {?} mode
     * @return {?}
     */
    NzCalendarComponent.prototype.onModeChange = /**
     * @param {?} mode
     * @return {?}
     */
    function (mode) {
        this.nzModeChange.emit(mode);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NzCalendarComponent.prototype.onDateSelect = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.updateDate(date);
    };
    /**
     * @param {?} year
     * @return {?}
     */
    NzCalendarComponent.prototype.onYearSelect = /**
     * @param {?} year
     * @return {?}
     */
    function (year) {
        /** @type {?} */
        var date = setYear(this.activeDate, year);
        this.updateDate(date);
    };
    /**
     * @param {?} month
     * @return {?}
     */
    NzCalendarComponent.prototype.onMonthSelect = /**
     * @param {?} month
     * @return {?}
     */
    function (month) {
        /** @type {?} */
        var date = setMonth(this.activeDate, month);
        this.updateDate(date);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NzCalendarComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.updateDate(value || new Date(), false);
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzCalendarComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeFn = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NzCalendarComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchFn = fn;
    };
    /**
     * @param {?} date
     * @param {?=} touched
     * @return {?}
     */
    NzCalendarComponent.prototype.updateDate = /**
     * @param {?} date
     * @param {?=} touched
     * @return {?}
     */
    function (date, touched) {
        if (touched === void 0) { touched = true; }
        /** @type {?} */
        var dayChanged = !isSameDay(date, this.activeDate);
        /** @type {?} */
        var monthChanged = !isSameMonth(date, this.activeDate);
        /** @type {?} */
        var yearChanged = !isSameYear(date, this.activeDate);
        this.activeDate = date;
        if (dayChanged) {
            this.calculateActiveDate();
        }
        if (monthChanged) {
            this.setUpDateMatrix();
            this.calculateCurrentDate();
            this.calculateActiveMonth();
        }
        if (yearChanged) {
            this.calculateCurrentMonth();
        }
        if (touched) {
            this.onChangeFn(date);
            this.onTouchFn();
            this.nzValueChange.emit(date);
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.setUpDaysInWeek = /**
     * @return {?}
     */
    function () {
        this.daysInWeek = [];
        /** @type {?} */
        var weekStart = startOfWeek(this.activeDate, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        for (var i = 0; i < 7; i++) {
            /** @type {?} */
            var date = addDays(weekStart, i);
            /** @type {?} */
            var title = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'E' : 'ddd');
            /** @type {?} */
            var label = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'EEEEEE' : 'dd');
            this.daysInWeek.push({ title: title, label: label });
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.setUpMonthsInYear = /**
     * @return {?}
     */
    function () {
        this.monthsInYear = [];
        for (var i = 0; i < 12; i++) {
            /** @type {?} */
            var date = setMonth(this.activeDate, i);
            /** @type {?} */
            var title = this.dateHelper.format(date, 'MMM');
            /** @type {?} */
            var label = this.dateHelper.format(date, 'MMM');
            /** @type {?} */
            var start = startOfMonth(date);
            this.monthsInYear.push({ title: title, label: label, start: start });
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.setUpDateMatrix = /**
     * @return {?}
     */
    function () {
        this.dateMatrix = [];
        /** @type {?} */
        var monthStart = startOfMonth(this.activeDate);
        /** @type {?} */
        var monthEnd = endOfMonth(this.activeDate);
        /** @type {?} */
        var weekDiff = differenceInCalendarWeeks(monthEnd, monthStart, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() }) + 2;
        for (var week = 0; week < weekDiff; week++) {
            /** @type {?} */
            var row = [];
            /** @type {?} */
            var weekStart = addDays(this.calendarStart, week * 7);
            for (var day = 0; day < 7; day++) {
                /** @type {?} */
                var date = addDays(weekStart, day);
                /** @type {?} */
                var monthDiff = differenceInCalendarMonths(date, this.activeDate);
                /** @type {?} */
                var dateFormat = this.dateHelper.relyOnDatePipe ? 'longDate' : this.i18n.getLocaleData('DatePicker.lang.dateFormat', 'YYYY-MM-DD');
                /** @type {?} */
                var title = this.dateHelper.format(date, dateFormat);
                /** @type {?} */
                var label = this.dateHelper.format(date, this.dateHelper.relyOnDatePipe ? 'dd' : 'DD');
                /** @type {?} */
                var rel = monthDiff === 0 ? 'current' : monthDiff < 0 ? 'last' : 'next';
                row.push({ title: title, label: label, rel: rel, value: date });
            }
            this.dateMatrix.push(row);
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.calculateCurrentDate = /**
     * @return {?}
     */
    function () {
        if (isThisMonth(this.activeDate)) {
            this.currentDateRow = differenceInCalendarWeeks(this.currentDate, this.calendarStart, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
            this.currentDateCol = differenceInCalendarDays(this.currentDate, addDays(this.calendarStart, this.currentDateRow * 7));
        }
        else {
            this.currentDateRow = -1;
            this.currentDateCol = -1;
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.calculateActiveDate = /**
     * @return {?}
     */
    function () {
        this.activeDateRow = differenceInCalendarWeeks(this.activeDate, this.calendarStart, { weekStartsOn: this.dateHelper.getFirstDayOfWeek() });
        this.activeDateCol = differenceInCalendarDays(this.activeDate, addDays(this.calendarStart, this.activeDateRow * 7));
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.calculateCurrentMonth = /**
     * @return {?}
     */
    function () {
        if (isThisYear(this.activeDate)) {
            /** @type {?} */
            var yearStart = startOfYear(this.currentDate);
            /** @type {?} */
            var monthDiff = differenceInCalendarMonths(this.currentDate, yearStart);
            this.currentMonthRow = Math.floor(monthDiff / 3);
            this.currentMonthCol = monthDiff % 3;
        }
        else {
            this.currentMonthRow = -1;
            this.currentMonthCol = -1;
        }
    };
    /**
     * @return {?}
     */
    NzCalendarComponent.prototype.calculateActiveMonth = /**
     * @return {?}
     */
    function () {
        this.activeMonthRow = Math.floor(this.activeDate.getMonth() / 3);
        this.activeMonthCol = this.activeDate.getMonth() % 3;
    };
    NzCalendarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-calendar',
                    template: "<nz-calendar-header [fullscreen]=\"fullscreen\" [activeDate]=\"activeDate\"\n                    [(mode)]=\"nzMode\" (modeChange)=\"onModeChange($event)\"\n                    (yearChange)=\"onYearSelect($event)\" (monthChange)=\"onMonthSelect($event)\">\n</nz-calendar-header>\n\n<div class=\"ant-fullcalendar ant-fullcalendar-full\" [ngClass]=\"fullscreen ? 'ant-fullcalendar-fullscreen' : ''\">\n  <div class=\"ant-fullcalendar-calendar-body\">\n    <ng-container *ngIf=\"nzMode === 'month' then monthModeTable else yearModeTable\"></ng-container>\n  </div>\n</div>\n\n<ng-template #monthModeTable>\n  <table class=\"ant-fullcalendar-table\" cellspacing=\"0\" role=\"grid\">\n    <thead>\n      <tr role=\"row\">\n        <th *ngFor=\"let day of daysInWeek\" class=\"ant-fullcalendar-column-header\" role=\"columnheader\" [title]=\"day.title\">\n          <span class=\"ant-fullcalendar-column-header-inner\">{{ day.label }}</span>\n        </th>\n      </tr>\n    </thead>\n    <tbody class=\"ant-fullcalendar-tbody\">\n      <tr *ngFor=\"let week of dateMatrix; index as row\"\n          [class.ant-fullcalendar-current-week]=\"row === currentDateRow\"\n          [class.ant-fullcalendar-active-week]=\"row === activeDateRow\">\n        <td *ngFor=\"let day of week; index as col\" role=\"gridcell\" class=\"ant-fullcalendar-cell\" [title]=\"day.title\"\n            [class.ant-fullcalendar-today]=\"row === currentDateRow && col === currentDateCol\"\n            [class.ant-fullcalendar-selected-day]=\"row === activeDateRow && col === activeDateCol\"\n            [class.ant-fullcalendar-last-month-cell]=\"day.rel === 'last'\"\n            [class.ant-fullcalendar-next-month-btn-day]=\"day.rel === 'next'\"\n            (click)=\"onDateSelect(day.value)\">\n            <div class=\"ant-fullcalendar-date\">\n              <ng-container *ngIf=\"dateFullCell else defaultCell\">\n                <ng-container *ngTemplateOutlet=\"dateFullCell; context: {$implicit: day.value}\"></ng-container>\n              </ng-container>\n              <ng-template #defaultCell>\n                <div class=\"ant-fullcalendar-value\">{{ day.label }}</div>\n                <div *ngIf=\"dateCell\" class=\"ant-fullcalendar-content\">\n                  <ng-container *ngTemplateOutlet=\"dateCell; context: {$implicit: day.value}\"></ng-container>\n                </div>\n              </ng-template>\n            </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</ng-template>\n\n<ng-template #yearModeTable>\n  <table class=\"ant-fullcalendar-month-panel-table\" cellspacing=\"0\" role=\"grid\">\n    <tbody class=\"ant-fullcalendar-month-panel-tbody\">\n      <tr *ngFor=\"let row of [0, 1, 2, 3]\" role=\"row\">\n        <td *ngFor=\"let col of [0, 1, 2]\" role=\"gridcell\" [title]=\"monthsInYear[row * 3 + col].title\"\n            class=\"ant-fullcalendar-month-panel-cell\"\n            [class.ant-fullcalendar-month-panel-current-cell]=\"row === currentMonthRow && col === currentMonthCol\"\n            [class.ant-fullcalendar-month-panel-selected-cell]=\"row === activeMonthRow && col === activeMonthCol\"\n            (click)=\"onMonthSelect(row * 3 + col)\">\n          <div class=\"ant-fullcalendar-month\">\n            <ng-container *ngIf=\"monthFullCell else defaultCell\">\n              <ng-container *ngTemplateOutlet=\"monthFullCell; context: {$implicit: monthsInYear[row * 3 + col].start}\"></ng-container>\n            </ng-container>\n            <ng-template #defaultCell>\n              <div class=\"ant-fullcalendar-value\">{{ monthsInYear[row * 3 + col].label }}</div>\n              <div *ngIf=\"monthCell\" class=\"ant-fullcalendar-content\">\n                <ng-container *ngTemplateOutlet=\"monthCell; context: {$implicit: monthsInYear[row * 3 + col].start}\"></ng-container>\n              </div>\n            </ng-template>\n          </div>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</ng-template>\n",
                    providers: [
                        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return NzCalendarComponent; }), multi: true }
                    ]
                }] }
    ];
    /** @nocollapse */
    NzCalendarComponent.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: ChangeDetectorRef },
        { type: DateHelperService }
    ]; };
    NzCalendarComponent.propDecorators = {
        nzMode: [{ type: Input }],
        nzModeChange: [{ type: Output }],
        nzValue: [{ type: Input }],
        nzValueChange: [{ type: Output }],
        nzDateCell: [{ type: Input }],
        nzDateFullCell: [{ type: Input }],
        nzMonthCell: [{ type: Input }],
        nzMonthFullCell: [{ type: Input }],
        nzFullscreen: [{ type: Input }],
        nzCard: [{ type: Input }],
        dateCellChild: [{ type: ContentChild, args: [DateCell, { read: TemplateRef },] }],
        dateFullCellChild: [{ type: ContentChild, args: [DateFullCell, { read: TemplateRef },] }],
        monthCellChild: [{ type: ContentChild, args: [MonthCell, { read: TemplateRef },] }],
        monthFullCellChild: [{ type: ContentChild, args: [MonthFullCell, { read: TemplateRef },] }],
        fullscreen: [{ type: HostBinding, args: ['class.ant-fullcalendar--fullscreen',] }]
    };
    return NzCalendarComponent;
}());
export { NzCalendarComponent };
function NzCalendarComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzCalendarComponent.prototype.nzMode;
    /** @type {?} */
    NzCalendarComponent.prototype.nzModeChange;
    /** @type {?} */
    NzCalendarComponent.prototype.nzValueChange;
    /** @type {?} */
    NzCalendarComponent.prototype.fullscreen;
    /** @type {?} */
    NzCalendarComponent.prototype.daysInWeek;
    /** @type {?} */
    NzCalendarComponent.prototype.monthsInYear;
    /** @type {?} */
    NzCalendarComponent.prototype.dateMatrix;
    /** @type {?} */
    NzCalendarComponent.prototype.activeDate;
    /** @type {?} */
    NzCalendarComponent.prototype.currentDateRow;
    /** @type {?} */
    NzCalendarComponent.prototype.currentDateCol;
    /** @type {?} */
    NzCalendarComponent.prototype.activeDateRow;
    /** @type {?} */
    NzCalendarComponent.prototype.activeDateCol;
    /** @type {?} */
    NzCalendarComponent.prototype.currentMonthRow;
    /** @type {?} */
    NzCalendarComponent.prototype.currentMonthCol;
    /** @type {?} */
    NzCalendarComponent.prototype.activeMonthRow;
    /** @type {?} */
    NzCalendarComponent.prototype.activeMonthCol;
    /** @type {?} */
    NzCalendarComponent.prototype.dateCell;
    /** @type {?} */
    NzCalendarComponent.prototype.dateFullCell;
    /** @type {?} */
    NzCalendarComponent.prototype.monthCell;
    /** @type {?} */
    NzCalendarComponent.prototype.monthFullCell;
    /** @type {?} */
    NzCalendarComponent.prototype.prefixCls;
    /** @type {?} */
    NzCalendarComponent.prototype.currentDate;
    /** @type {?} */
    NzCalendarComponent.prototype.onChangeFn;
    /** @type {?} */
    NzCalendarComponent.prototype.onTouchFn;
    /** @type {?} */
    NzCalendarComponent.prototype.i18n;
    /** @type {?} */
    NzCalendarComponent.prototype.cdr;
    /** @type {?} */
    NzCalendarComponent.prototype.dateHelper;
}
/**
 * @record
 */
export function DayCellContext() { }
function DayCellContext_tsickle_Closure_declarations() {
    /** @type {?} */
    DayCellContext.prototype.title;
    /** @type {?} */
    DayCellContext.prototype.label;
}
/**
 * @record
 */
export function MonthCellContext() { }
function MonthCellContext_tsickle_Closure_declarations() {
    /** @type {?} */
    MonthCellContext.prototype.title;
    /** @type {?} */
    MonthCellContext.prototype.label;
    /** @type {?} */
    MonthCellContext.prototype.start;
}
/**
 * @record
 */
export function DateCellContext() { }
function DateCellContext_tsickle_Closure_declarations() {
    /** @type {?} */
    DateCellContext.prototype.title;
    /** @type {?} */
    DateCellContext.prototype.label;
    /** @type {?} */
    DateCellContext.prototype.rel;
    /** @type {?} */
    DateCellContext.prototype.value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotY2FsZW5kYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImNhbGVuZGFyL256LWNhbGVuZGFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEosT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sd0JBQXdCLE1BQU0sc0NBQXNDLENBQUM7QUFDNUUsT0FBTywwQkFBMEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLHlCQUF5QixNQUFNLHVDQUF1QyxDQUFDO0FBQzlFLE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sU0FBUyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sUUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sWUFBWSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxN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LCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgYWRkRGF5cyBmcm9tICdkYXRlLWZucy9hZGRfZGF5cyc7XG5pbXBvcnQgZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzIGZyb20gJ2RhdGUtZm5zL2RpZmZlcmVuY2VfaW5fY2FsZW5kYXJfZGF5cyc7XG5pbXBvcnQgZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMgZnJvbSAnZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl9tb250aHMnO1xuaW1wb3J0IGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3MgZnJvbSAnZGF0ZS1mbnMvZGlmZmVyZW5jZV9pbl9jYWxlbmRhcl93ZWVrcyc7XG5pbXBvcnQgZW5kT2ZNb250aCBmcm9tICdkYXRlLWZucy9lbmRfb2ZfbW9udGgnO1xuaW1wb3J0IGlzU2FtZURheSBmcm9tICdkYXRlLWZucy9pc19zYW1lX2RheSc7XG5pbXBvcnQgaXNTYW1lTW9udGggZnJvbSAnZGF0ZS1mbnMvaXNfc2FtZV9tb250aCc7XG5pbXBvcnQgaXNTYW1lWWVhciBmcm9tICdkYXRlLWZucy9pc19zYW1lX3llYXInO1xuaW1wb3J0IGlzVGhpc01vbnRoIGZyb20gJ2RhdGUtZm5zL2lzX3RoaXNfbW9udGgnO1xuaW1wb3J0IGlzVGhpc1llYXIgZnJvbSAnZGF0ZS1mbnMvaXNfdGhpc195ZWFyJztcbmltcG9ydCBzZXRNb250aCBmcm9tICdkYXRlLWZucy9zZXRfbW9udGgnO1xuaW1wb3J0IHNldFllYXIgZnJvbSAnZGF0ZS1mbnMvc2V0X3llYXInO1xuaW1wb3J0IHN0YXJ0T2ZNb250aCBmcm9tICdkYXRlLWZucy9zdGFydF9vZl9tb250aCc7XG5pbXBvcnQgc3RhcnRPZldlZWsgZnJvbSAnZGF0ZS1mbnMvc3RhcnRfb2Zfd2Vlayc7XG5pbXBvcnQgc3RhcnRPZlllYXIgZnJvbSAnZGF0ZS1mbnMvc3RhcnRfb2ZfeWVhcic7XG5pbXBvcnQgeyBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJy4uL2kxOG4vZGF0ZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOekkxOG5TZXJ2aWNlIH0gZnJvbSAnLi4vaTE4bi9uei1pMThuLnNlcnZpY2UnO1xuaW1wb3J0IHsgTnpEYXRlQ2VsbERpcmVjdGl2ZSBhcyBEYXRlQ2VsbCwgTnpEYXRlRnVsbENlbGxEaXJlY3RpdmUgYXMgRGF0ZUZ1bGxDZWxsLCBOek1vbnRoQ2VsbERpcmVjdGl2ZSBhcyBNb250aENlbGwsIE56TW9udGhGdWxsQ2VsbERpcmVjdGl2ZSBhcyBNb250aEZ1bGxDZWxsIH0gZnJvbSAnLi9uei1jYWxlbmRhci1jZWxscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ256LWNhbGVuZGFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL256LWNhbGVuZGFyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUiwgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTnpDYWxlbmRhckNvbXBvbmVudCksIG11bHRpOiB0cnVlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOekNhbGVuZGFyQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG56TW9kZTogJ21vbnRoJ3wneWVhcicgPSAnbW9udGgnO1xuICBAT3V0cHV0KCkgbnpNb2RlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8J21vbnRoJ3wneWVhcic+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHNldCBuelZhbHVlKHZhbHVlOiBEYXRlKSB7IHRoaXMudXBkYXRlRGF0ZSh2YWx1ZSwgZmFsc2UpOyB9XG4gIEBPdXRwdXQoKSBuelZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGF0ZUNlbGwodmFsdWU6IFRlbXBsYXRlUmVmPHskaW1wbGljaXQ6IERhdGV9PikgeyB0aGlzLmRhdGVDZWxsID0gdmFsdWU7IH1cblxuICBASW5wdXQoKVxuICBzZXQgbnpEYXRlRnVsbENlbGwodmFsdWU6IFRlbXBsYXRlUmVmPHskaW1wbGljaXQ6IERhdGV9PikgeyB0aGlzLmRhdGVGdWxsQ2VsbCA9IHZhbHVlOyB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56TW9udGhDZWxsKHZhbHVlOiBUZW1wbGF0ZVJlZjx7JGltcGxpY2l0OiBEYXRlfT4pIHsgdGhpcy5tb250aENlbGwgPSB2YWx1ZTsgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuek1vbnRoRnVsbENlbGwodmFsdWU6IFRlbXBsYXRlUmVmPHskaW1wbGljaXQ6IERhdGV9PikgeyB0aGlzLm1vbnRoRnVsbENlbGwgPSB2YWx1ZTsgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekZ1bGxzY3JlZW4odmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5mdWxsc2NyZWVuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBnZXQgbnpGdWxsc2NyZWVuKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5mdWxsc2NyZWVuOyB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q2FyZCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLmZ1bGxzY3JlZW4gPSAhY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuICBnZXQgbnpDYXJkKCk6IGJvb2xlYW4geyByZXR1cm4gIXRoaXMuZnVsbHNjcmVlbjsgfVxuXG4gIEBDb250ZW50Q2hpbGQoRGF0ZUNlbGwsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pXG4gIHNldCBkYXRlQ2VsbENoaWxkKHZhbHVlOiBUZW1wbGF0ZVJlZjx7JGltcGxpY2l0OiBEYXRlfT4pIHsgaWYgKHZhbHVlKSB7IHRoaXMuZGF0ZUNlbGwgPSB2YWx1ZTsgfSB9XG5cbiAgQENvbnRlbnRDaGlsZChEYXRlRnVsbENlbGwsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pXG4gIHNldCBkYXRlRnVsbENlbGxDaGlsZCh2YWx1ZTogVGVtcGxhdGVSZWY8eyRpbXBsaWNpdDogRGF0ZX0+KSB7IGlmICh2YWx1ZSkgeyB0aGlzLmRhdGVGdWxsQ2VsbCA9IHZhbHVlOyB9IH1cblxuICBAQ29udGVudENoaWxkKE1vbnRoQ2VsbCwge3JlYWQ6IFRlbXBsYXRlUmVmfSlcbiAgc2V0IG1vbnRoQ2VsbENoaWxkKHZhbHVlOiBUZW1wbGF0ZVJlZjx7JGltcGxpY2l0OiBEYXRlfT4pIHsgaWYgKHZhbHVlKSB7IHRoaXMubW9udGhDZWxsID0gdmFsdWU7IH0gfVxuXG4gIEBDb250ZW50Q2hpbGQoTW9udGhGdWxsQ2VsbCwge3JlYWQ6IFRlbXBsYXRlUmVmfSlcbiAgc2V0IG1vbnRoRnVsbENlbGxDaGlsZCh2YWx1ZTogVGVtcGxhdGVSZWY8eyRpbXBsaWNpdDogRGF0ZX0+KSB7IGlmICh2YWx1ZSkgeyB0aGlzLm1vbnRoRnVsbENlbGwgPSB2YWx1ZTsgfSB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbnQtZnVsbGNhbGVuZGFyLS1mdWxsc2NyZWVuJylcbiAgZnVsbHNjcmVlbiA9IHRydWU7XG5cbiAgZGF5c0luV2VlazogRGF5Q2VsbENvbnRleHRbXSA9IFtdO1xuICBtb250aHNJblllYXI6IE1vbnRoQ2VsbENvbnRleHRbXSA9IFtdO1xuICBkYXRlTWF0cml4OiBEYXRlQ2VsbENvbnRleHRbXVtdID0gW107XG4gIGFjdGl2ZURhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBjdXJyZW50RGF0ZVJvdzogbnVtYmVyID0gLTE7XG4gIGN1cnJlbnREYXRlQ29sOiBudW1iZXIgPSAtMTtcbiAgYWN0aXZlRGF0ZVJvdzogbnVtYmVyID0gLTE7XG4gIGFjdGl2ZURhdGVDb2w6IG51bWJlciA9IC0xO1xuICBjdXJyZW50TW9udGhSb3c6IG51bWJlciA9IC0xO1xuICBjdXJyZW50TW9udGhDb2w6IG51bWJlciA9IC0xO1xuICBhY3RpdmVNb250aFJvdzogbnVtYmVyID0gLTE7XG4gIGFjdGl2ZU1vbnRoQ29sOiBudW1iZXIgPSAtMTtcbiAgZGF0ZUNlbGw6IFRlbXBsYXRlUmVmPHskaW1wbGljaXQ6IERhdGV9PnxudWxsID0gbnVsbDtcbiAgZGF0ZUZ1bGxDZWxsOiBUZW1wbGF0ZVJlZjx7JGltcGxpY2l0OiBEYXRlfT58bnVsbCA9IG51bGw7XG4gIG1vbnRoQ2VsbDogVGVtcGxhdGVSZWY8eyRpbXBsaWNpdDogRGF0ZX0+fG51bGwgPSBudWxsO1xuICBtb250aEZ1bGxDZWxsOiBUZW1wbGF0ZVJlZjx7JGltcGxpY2l0OiBEYXRlfT58bnVsbCA9IG51bGw7XG5cbiAgcHJpdmF0ZSBwcmVmaXhDbHMgPSAnYW50LWZ1bGxjYWxlbmRhcic7XG4gIHByaXZhdGUgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICBwcml2YXRlIG9uQ2hhbmdlRm46IChkYXRlOiBEYXRlKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIHByaXZhdGUgb25Ub3VjaEZuOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBnZXQgY2FsZW5kYXJTdGFydCgpOiBEYXRlIHtcbiAgICByZXR1cm4gc3RhcnRPZldlZWsoc3RhcnRPZk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIHsgd2Vla1N0YXJ0c09uOiB0aGlzLmRhdGVIZWxwZXIuZ2V0Rmlyc3REYXlPZldlZWsoKSB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaTE4bjogTnpJMThuU2VydmljZSwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIGRhdGVIZWxwZXI6IERhdGVIZWxwZXJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldFVwRGF5c0luV2VlaygpO1xuICAgIHRoaXMuc2V0VXBNb250aHNJblllYXIoKTtcbiAgICB0aGlzLnNldFVwRGF0ZU1hdHJpeCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudERhdGUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUFjdGl2ZURhdGUoKTtcbiAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRNb250aCgpO1xuICAgIHRoaXMuY2FsY3VsYXRlQWN0aXZlTW9udGgoKTtcbiAgfVxuXG4gIG9uTW9kZUNoYW5nZShtb2RlOiAnbW9udGgnfCd5ZWFyJyk6IHZvaWQge1xuICAgIHRoaXMubnpNb2RlQ2hhbmdlLmVtaXQobW9kZSk7XG4gIH1cblxuICBvbkRhdGVTZWxlY3QoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlRGF0ZShkYXRlKTtcbiAgfVxuXG4gIG9uWWVhclNlbGVjdCh5ZWFyOiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBkYXRlID0gc2V0WWVhcih0aGlzLmFjdGl2ZURhdGUsIHllYXIpO1xuICAgIHRoaXMudXBkYXRlRGF0ZShkYXRlKTtcbiAgfVxuXG4gIG9uTW9udGhTZWxlY3QobW9udGg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGRhdGUgPSBzZXRNb250aCh0aGlzLmFjdGl2ZURhdGUsIG1vbnRoKTtcbiAgICB0aGlzLnVwZGF0ZURhdGUoZGF0ZSk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBEYXRlfG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZURhdGUodmFsdWUgfHwgbmV3IERhdGUoKSwgZmFsc2UpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKGRhdGU6IERhdGUpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoRm4gPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRGF0ZShkYXRlOiBEYXRlLCB0b3VjaGVkOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGNvbnN0IGRheUNoYW5nZWQgPSAhaXNTYW1lRGF5KGRhdGUsIHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgbW9udGhDaGFuZ2VkID0gIWlzU2FtZU1vbnRoKGRhdGUsIHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgY29uc3QgeWVhckNoYW5nZWQgPSAhaXNTYW1lWWVhcihkYXRlLCB0aGlzLmFjdGl2ZURhdGUpO1xuXG4gICAgdGhpcy5hY3RpdmVEYXRlID0gZGF0ZTtcblxuICAgIGlmIChkYXlDaGFuZ2VkKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUFjdGl2ZURhdGUoKTtcbiAgICB9XG4gICAgaWYgKG1vbnRoQ2hhbmdlZCkge1xuICAgICAgdGhpcy5zZXRVcERhdGVNYXRyaXgoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQ3VycmVudERhdGUoKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlQWN0aXZlTW9udGgoKTtcbiAgICB9XG4gICAgaWYgKHllYXJDaGFuZ2VkKSB7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUN1cnJlbnRNb250aCgpO1xuICAgIH1cblxuICAgIGlmICh0b3VjaGVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlRm4oZGF0ZSk7XG4gICAgICB0aGlzLm9uVG91Y2hGbigpO1xuICAgICAgdGhpcy5uelZhbHVlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcERheXNJbldlZWsoKTogdm9pZCB7XG4gICAgdGhpcy5kYXlzSW5XZWVrID0gW107XG4gICAgY29uc3Qgd2Vla1N0YXJ0ID0gc3RhcnRPZldlZWsodGhpcy5hY3RpdmVEYXRlLCB7IHdlZWtTdGFydHNPbjogdGhpcy5kYXRlSGVscGVyLmdldEZpcnN0RGF5T2ZXZWVrKCkgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBhZGREYXlzKHdlZWtTdGFydCwgaSk7XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQoZGF0ZSwgdGhpcy5kYXRlSGVscGVyLnJlbHlPbkRhdGVQaXBlID8gJ0UnIDogJ2RkZCcpO1xuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KGRhdGUsIHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSA/ICdFRUVFRUUnIDogJ2RkJyk7XG4gICAgICB0aGlzLmRheXNJbldlZWsucHVzaCh7dGl0bGUsIGxhYmVsfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRVcE1vbnRoc0luWWVhcigpOiB2b2lkIHtcbiAgICB0aGlzLm1vbnRoc0luWWVhciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgICAgY29uc3QgZGF0ZSA9IHNldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSwgaSk7XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQoZGF0ZSwgJ01NTScpO1xuICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmRhdGVIZWxwZXIuZm9ybWF0KGRhdGUsICdNTU0nKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gc3RhcnRPZk1vbnRoKGRhdGUpO1xuICAgICAgdGhpcy5tb250aHNJblllYXIucHVzaCh7dGl0bGUsIGxhYmVsLCBzdGFydH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBEYXRlTWF0cml4KCk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZU1hdHJpeCA9IFtdO1xuICAgIGNvbnN0IG1vbnRoU3RhcnQgPSBzdGFydE9mTW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICBjb25zdCBtb250aEVuZCA9IGVuZE9mTW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICBjb25zdCB3ZWVrRGlmZiA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3MobW9udGhFbmQsIG1vbnRoU3RhcnQsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLmRhdGVIZWxwZXIuZ2V0Rmlyc3REYXlPZldlZWsoKSB9KSArIDI7XG5cbiAgICBmb3IgKGxldCB3ZWVrID0gMDsgd2VlayA8IHdlZWtEaWZmOyB3ZWVrKyspIHtcbiAgICAgIGNvbnN0IHJvdzogRGF0ZUNlbGxDb250ZXh0W10gPSBbXTtcbiAgICAgIGNvbnN0IHdlZWtTdGFydCA9IGFkZERheXModGhpcy5jYWxlbmRhclN0YXJ0LCB3ZWVrICogNyk7XG5cbiAgICAgIGZvciAobGV0IGRheSA9IDA7IGRheSA8IDc7IGRheSsrKSB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBhZGREYXlzKHdlZWtTdGFydCwgZGF5KTtcbiAgICAgICAgY29uc3QgbW9udGhEaWZmID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJNb250aHMoZGF0ZSwgdGhpcy5hY3RpdmVEYXRlKTtcbiAgICAgICAgY29uc3QgZGF0ZUZvcm1hdCA9IHRoaXMuZGF0ZUhlbHBlci5yZWx5T25EYXRlUGlwZSA/ICdsb25nRGF0ZScgOiB0aGlzLmkxOG4uZ2V0TG9jYWxlRGF0YSgnRGF0ZVBpY2tlci5sYW5nLmRhdGVGb3JtYXQnLCAnWVlZWS1NTS1ERCcpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQoZGF0ZSwgZGF0ZUZvcm1hdCk7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5kYXRlSGVscGVyLmZvcm1hdChkYXRlLCB0aGlzLmRhdGVIZWxwZXIucmVseU9uRGF0ZVBpcGUgPyAnZGQnIDogJ0REJyk7XG4gICAgICAgIGNvbnN0IHJlbCA9IG1vbnRoRGlmZiA9PT0gMCA/ICdjdXJyZW50JyA6IG1vbnRoRGlmZiA8IDAgPyAnbGFzdCcgOiAnbmV4dCc7XG4gICAgICAgIHJvdy5wdXNoKHt0aXRsZSwgbGFiZWwsIHJlbCwgdmFsdWU6IGRhdGV9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0ZU1hdHJpeC5wdXNoKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVDdXJyZW50RGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAoaXNUaGlzTW9udGgodGhpcy5hY3RpdmVEYXRlKSkge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZVJvdyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3ModGhpcy5jdXJyZW50RGF0ZSwgdGhpcy5jYWxlbmRhclN0YXJ0LCB7IHdlZWtTdGFydHNPbjogdGhpcy5kYXRlSGVscGVyLmdldEZpcnN0RGF5T2ZXZWVrKCkgfSk7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlQ29sID0gZGlmZmVyZW5jZUluQ2FsZW5kYXJEYXlzKHRoaXMuY3VycmVudERhdGUsIGFkZERheXModGhpcy5jYWxlbmRhclN0YXJ0LCB0aGlzLmN1cnJlbnREYXRlUm93ICogNykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlUm93ID0gLTE7XG4gICAgICB0aGlzLmN1cnJlbnREYXRlQ29sID0gLTE7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVBY3RpdmVEYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlRGF0ZVJvdyA9IGRpZmZlcmVuY2VJbkNhbGVuZGFyV2Vla3ModGhpcy5hY3RpdmVEYXRlLCB0aGlzLmNhbGVuZGFyU3RhcnQsIHsgd2Vla1N0YXJ0c09uOiB0aGlzLmRhdGVIZWxwZXIuZ2V0Rmlyc3REYXlPZldlZWsoKSB9KTtcbiAgICB0aGlzLmFjdGl2ZURhdGVDb2wgPSBkaWZmZXJlbmNlSW5DYWxlbmRhckRheXModGhpcy5hY3RpdmVEYXRlLCBhZGREYXlzKHRoaXMuY2FsZW5kYXJTdGFydCwgdGhpcy5hY3RpdmVEYXRlUm93ICogNykpO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxjdWxhdGVDdXJyZW50TW9udGgoKTogdm9pZCB7XG4gICAgaWYgKGlzVGhpc1llYXIodGhpcy5hY3RpdmVEYXRlKSkge1xuICAgICAgY29uc3QgeWVhclN0YXJ0ID0gc3RhcnRPZlllYXIodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgICBjb25zdCBtb250aERpZmYgPSBkaWZmZXJlbmNlSW5DYWxlbmRhck1vbnRocyh0aGlzLmN1cnJlbnREYXRlLCB5ZWFyU3RhcnQpO1xuICAgICAgdGhpcy5jdXJyZW50TW9udGhSb3cgPSBNYXRoLmZsb29yKG1vbnRoRGlmZiAvIDMpO1xuICAgICAgdGhpcy5jdXJyZW50TW9udGhDb2wgPSBtb250aERpZmYgJSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRNb250aFJvdyA9IC0xO1xuICAgICAgdGhpcy5jdXJyZW50TW9udGhDb2wgPSAtMTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZUFjdGl2ZU1vbnRoKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlTW9udGhSb3cgPSBNYXRoLmZsb29yKHRoaXMuYWN0aXZlRGF0ZS5nZXRNb250aCgpIC8gMyk7XG4gICAgdGhpcy5hY3RpdmVNb250aENvbCA9IHRoaXMuYWN0aXZlRGF0ZS5nZXRNb250aCgpICUgMztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERheUNlbGxDb250ZXh0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNb250aENlbGxDb250ZXh0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgc3RhcnQ6IERhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0ZUNlbGxDb250ZXh0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgcmVsOiAnbGFzdCd8J2N1cnJlbnQnfCduZXh0JztcbiAgdmFsdWU6IERhdGU7XG59XG4iXX0=