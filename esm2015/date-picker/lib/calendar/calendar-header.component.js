/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateHelperService } from '../../../i18n/date-helper.service';
import { CandyDate } from '../candy-date';
export class CalendarHeaderComponent {
    /**
     * @param {?} dateHelper
     */
    constructor(dateHelper) {
        this.dateHelper = dateHelper;
        this.enablePrev = true;
        this.enableNext = true;
        this.showTimePicker = false;
        this.valueChange = new EventEmitter();
        this.panelModeChange = new EventEmitter();
        this.chooseDecade = new EventEmitter();
        this.chooseYear = new EventEmitter();
        this.chooseMonth = new EventEmitter();
        this.prefixCls = 'ant-calendar';
        this.yearToMonth = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.value) {
            this.value = new CandyDate(); // Show today by default
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["value"] || changes["showTimePicker"] || changes["panelMode"]) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    previousYear() {
        this.gotoYear(-1);
    }
    /**
     * @return {?}
     */
    nextYear() {
        this.gotoYear(1);
    }
    /**
     * @return {?}
     */
    previousMonth() {
        this.gotoMonth(-1);
    }
    /**
     * @return {?}
     */
    nextMonth() {
        this.gotoMonth(1);
    }
    /**
     * @param {?} mode
     * @param {?=} value
     * @return {?}
     */
    changePanel(mode, value) {
        this.panelModeChange.emit(mode);
        if (value) {
            this.changeValueFromInside(value);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseDecade(value) {
        this.changePanel('year', value);
        this.chooseDecade.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseYear(value) {
        this.changePanel(this.yearToMonth ? 'month' : 'date', value);
        this.yearToMonth = false; // Clear
        this.chooseYear.emit(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChooseMonth(value) {
        this.changePanel('date', value);
        this.yearToMonth = false; // Clear
        this.chooseMonth.emit(value);
    }
    /**
     * @return {?}
     */
    changeToMonthPanel() {
        this.changePanel('month');
        this.yearToMonth = true;
    }
    /**
     * @return {?}
     */
    render() {
        if (this.value) {
            this.yearMonthDaySelectors = this.createYearMonthDaySelectors();
        }
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    gotoMonth(amount) {
        this.changeValueFromInside(this.value.addMonths(amount));
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    gotoYear(amount) {
        this.changeValueFromInside(this.value.addYears(amount));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    changeValueFromInside(value) {
        if (this.value !== value) {
            this.value = value;
            this.valueChange.emit(this.value);
            this.render();
        }
    }
    /**
     * @param {?} localeFormat
     * @return {?}
     */
    formatDateTime(localeFormat) {
        return this.dateHelper.format(this.value.nativeDate, localeFormat);
    }
    /**
     * @return {?}
     */
    createYearMonthDaySelectors() {
        /** @type {?} */
        let year;
        /** @type {?} */
        let month;
        /** @type {?} */
        let day;
        /** @type {?} */
        let yearFormat = this.locale.yearFormat;
        if (this.dateHelper.relyOnDatePipe) {
            yearFormat = (/** @type {?} */ (this.dateHelper)).transCompatFormat(yearFormat);
        }
        year = {
            className: `${this.prefixCls}-year-select`,
            title: this.locale.yearSelect,
            onClick: () => this.showTimePicker ? null : this.changePanel('year'),
            label: this.formatDateTime(yearFormat)
        };
        month = {
            className: `${this.prefixCls}-month-select`,
            title: this.locale.monthSelect,
            onClick: () => this.showTimePicker ? null : this.changeToMonthPanel(),
            label: this.formatDateTime(this.locale.monthFormat || 'MMM')
        };
        /** @type {?} */
        let dayFormat = this.locale.dayFormat;
        if (this.dateHelper.relyOnDatePipe) {
            dayFormat = (/** @type {?} */ (this.dateHelper)).transCompatFormat(dayFormat);
        }
        if (this.showTimePicker) {
            day = {
                className: `${this.prefixCls}-day-select`,
                label: this.formatDateTime(dayFormat)
            };
        }
        /** @type {?} */
        let result;
        if (this.locale.monthBeforeYear) {
            result = [month, day, year];
        }
        else {
            result = [year, month, day];
        }
        return result.filter(selector => !!selector);
    }
}
CalendarHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'calendar-header',
                template: "<div class=\"{{ prefixCls }}-header\">\n  <div style=\"position: relative;\">\n    <a *ngIf=\"enablePrev && !showTimePicker\"\n      class=\"{{ prefixCls }}-prev-year-btn\"\n      role=\"button\"\n      (click)=\"previousYear()\"\n      title=\"{{ locale.previousYear }}\"\n    ></a>\n    <a *ngIf=\"enablePrev && !showTimePicker\"\n      class=\"{{ prefixCls }}-prev-month-btn\"\n      role=\"button\"\n      (click)=\"previousMonth()\"\n      title=\"{{ locale.previousMonth }}\"\n    ></a>\n\n    <span class=\"{{ prefixCls }}-{{ locale.monthBeforeYear ? 'my-select' : 'ym-select' }}\">\n      <ng-container *ngFor=\"let selector of yearMonthDaySelectors\">\n        <a class=\"{{ selector.className }}\"\n          role=\"button\"\n          (click)=\"selector.onClick ? selector.onClick() : null\"\n          title=\"{{ selector.title || null }}\"\n        >\n          {{ selector.label }}\n        </a>\n      </ng-container>\n    </span>\n\n    <a *ngIf=\"enableNext && !showTimePicker\"\n      class=\"{{ prefixCls }}-next-month-btn\"\n      role=\"button\"\n      (click)=\"nextMonth()\"\n      title=\"{{ locale.nextMonth }}\"\n    ></a>\n    <a *ngIf=\"enableNext && !showTimePicker\"\n      class=\"{{ prefixCls }}-next-year-btn\"\n      role=\"button\"\n      (click)=\"nextYear()\"\n      title=\"{{ locale.nextYear }}\"\n    ></a>\n  </div>\n\n  <ng-container [ngSwitch]=\"panelMode\">\n    <ng-container *ngSwitchCase=\"'decade'\">\n      <decade-panel\n        [locale]=\"locale\"\n        [value]=\"value\"\n        (valueChange)=\"onChooseDecade($event)\"\n      ></decade-panel>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'year'\">\n      <year-panel\n        [locale]=\"locale\"\n        [value]=\"value\"\n        [disabledDate]=\"disabledYear\"\n        (valueChange)=\"onChooseYear($event)\"\n        (decadePanelShow)=\"changePanel('decade')\"\n      ></year-panel>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'month'\">\n      <month-panel\n        [locale]=\"locale\"\n        [value]=\"value\"\n        [disabledDate]=\"disabledMonth\"\n        (valueChange)=\"onChooseMonth($event)\"\n        (yearPanelShow)=\"changePanel('year')\"\n      ></month-panel>\n    </ng-container>\n  </ng-container>\n</div>"
            }] }
];
/** @nocollapse */
CalendarHeaderComponent.ctorParameters = () => [
    { type: DateHelperService }
];
CalendarHeaderComponent.propDecorators = {
    locale: [{ type: Input }],
    enablePrev: [{ type: Input }],
    enableNext: [{ type: Input }],
    disabledMonth: [{ type: Input }],
    disabledYear: [{ type: Input }],
    showTimePicker: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    panelMode: [{ type: Input }],
    panelModeChange: [{ type: Output }],
    chooseDecade: [{ type: Output }],
    chooseYear: [{ type: Output }],
    chooseMonth: [{ type: Output }]
};
function CalendarHeaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    CalendarHeaderComponent.prototype.locale;
    /** @type {?} */
    CalendarHeaderComponent.prototype.enablePrev;
    /** @type {?} */
    CalendarHeaderComponent.prototype.enableNext;
    /** @type {?} */
    CalendarHeaderComponent.prototype.disabledMonth;
    /** @type {?} */
    CalendarHeaderComponent.prototype.disabledYear;
    /** @type {?} */
    CalendarHeaderComponent.prototype.showTimePicker;
    /** @type {?} */
    CalendarHeaderComponent.prototype.value;
    /** @type {?} */
    CalendarHeaderComponent.prototype.valueChange;
    /** @type {?} */
    CalendarHeaderComponent.prototype.panelMode;
    /** @type {?} */
    CalendarHeaderComponent.prototype.panelModeChange;
    /** @type {?} */
    CalendarHeaderComponent.prototype.chooseDecade;
    /** @type {?} */
    CalendarHeaderComponent.prototype.chooseYear;
    /** @type {?} */
    CalendarHeaderComponent.prototype.chooseMonth;
    /** @type {?} */
    CalendarHeaderComponent.prototype.prefixCls;
    /** @type {?} */
    CalendarHeaderComponent.prototype.yearMonthDaySelectors;
    /** @type {?} */
    CalendarHeaderComponent.prototype.yearToMonth;
    /** @type {?} */
    CalendarHeaderComponent.prototype.dateHelper;
}
/**
 * @record
 */
export function YearMonthDaySelector() { }
function YearMonthDaySelector_tsickle_Closure_declarations() {
    /** @type {?} */
    YearMonthDaySelector.prototype.className;
    /** @type {?|undefined} */
    YearMonthDaySelector.prototype.title;
    /** @type {?} */
    YearMonthDaySelector.prototype.label;
    /** @type {?|undefined} */
    YearMonthDaySelector.prototype.onClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJkYXRlLXBpY2tlci9saWIvY2FsZW5kYXIvY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXpHLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUc1RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzFDLE1BQU07Ozs7SUF1QkosWUFBb0IsVUFBNkI7UUFBN0IsZUFBVSxHQUFWLFVBQVUsQ0FBbUI7MEJBckJsQixJQUFJOzBCQUNKLElBQUk7OEJBR0EsS0FBSzsyQkFHaEIsSUFBSSxZQUFZLEVBQWE7K0JBR3pCLElBQUksWUFBWSxFQUFhOzRCQUVoQyxJQUFJLFlBQVksRUFBYTswQkFDL0IsSUFBSSxZQUFZLEVBQWE7MkJBQzVCLElBQUksWUFBWSxFQUFhO3lCQUVqQyxjQUFjOzJCQUdILEtBQUs7S0FFa0I7Ozs7SUFFdEQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1NBQzlCO0tBQ0Y7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxhQUFVLE9BQU8sa0JBQWUsSUFBSSxPQUFPLGFBQVUsRUFBRTtZQUNoRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtLQUNGOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLENB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QjtRQUVuQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFO1lBQy9CLE1BQU0sR0FBRyxDQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUM7U0FDL0I7YUFBTTtZQUNMLE1BQU0sR0FBRyxDQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFFLENBQUM7U0FDL0I7UUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7WUE3SmhELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQiw4dEVBQTZDO2FBQzlDOzs7O1lBUjhCLGlCQUFpQjs7O3FCQVc3QyxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLEtBQUs7NkJBQ0wsS0FBSztvQkFFTCxLQUFLOzBCQUNMLE1BQU07d0JBRU4sS0FBSzs4QkFDTCxNQUFNOzJCQUVOLE1BQU07eUJBQ04sTUFBTTswQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGVIZWxwZXJCeURhdGVQaXBlLCBEYXRlSGVscGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vZGF0ZS1oZWxwZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOekNhbGVuZGFySTE4bkludGVyZmFjZSB9IGZyb20gJy4uLy4uLy4uL2kxOG4vbnotaTE4bi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUGFuZWxNb2RlIH0gZnJvbSAnLi4vLi4vc3RhbmRhcmQtdHlwZXMnO1xuaW1wb3J0IHsgQ2FuZHlEYXRlIH0gZnJvbSAnLi4vY2FuZHktZGF0ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NhbGVuZGFyLWhlYWRlcicsXG4gIHRlbXBsYXRlVXJsOiAnY2FsZW5kYXItaGVhZGVyLmNvbXBvbmVudC5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIENhbGVuZGFySGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsb2NhbGU6IE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBlbmFibGVQcmV2OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5hYmxlTmV4dDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGRpc2FibGVkTW9udGg6IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBkaXNhYmxlZFllYXI6IChkYXRlOiBEYXRlKSA9PiBib29sZWFuO1xuICBASW5wdXQoKSBzaG93VGltZVBpY2tlcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIHZhbHVlOiBDYW5keURhdGU7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuXG4gIEBJbnB1dCgpIHBhbmVsTW9kZTogUGFuZWxNb2RlO1xuICBAT3V0cHV0KCkgcGFuZWxNb2RlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxQYW5lbE1vZGU+KCk7XG5cbiAgQE91dHB1dCgpIGNob29zZURlY2FkZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuICBAT3V0cHV0KCkgY2hvb3NlWWVhciA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuICBAT3V0cHV0KCkgY2hvb3NlTW9udGggPSBuZXcgRXZlbnRFbWl0dGVyPENhbmR5RGF0ZT4oKTtcblxuICBwcmVmaXhDbHM6IHN0cmluZyA9ICdhbnQtY2FsZW5kYXInO1xuICB5ZWFyTW9udGhEYXlTZWxlY3RvcnM6IFllYXJNb250aERheVNlbGVjdG9yW107XG5cbiAgcHJpdmF0ZSB5ZWFyVG9Nb250aDogYm9vbGVhbiA9IGZhbHNlOyAvLyBJbmRpY2F0ZSB3aGV0aGVyIHNob3VsZCBjaGFuZ2UgdG8gbW9udGggcGFuZWwgd2hlbiBjdXJyZW50IGlzIHllYXIgcGFuZWwgKGlmIHJlZmVyZXI9bW9udGgsIGl0IHNob3VsZCBzaG93IG1vbnRoIHBhbmVsIHdoZW4gY2hvb3NlZCBhIHllYXIpXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkYXRlSGVscGVyOiBEYXRlSGVscGVyU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICB0aGlzLnZhbHVlID0gbmV3IENhbmR5RGF0ZSgpOyAvLyBTaG93IHRvZGF5IGJ5IGRlZmF1bHRcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXMudmFsdWUgfHwgY2hhbmdlcy5zaG93VGltZVBpY2tlciB8fCBjaGFuZ2VzLnBhbmVsTW9kZSkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcmV2aW91c1llYXIoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvWWVhcigtMSk7XG4gIH1cblxuICBuZXh0WWVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG9ZZWFyKDEpO1xuICB9XG5cbiAgcHJldmlvdXNNb250aCgpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG9Nb250aCgtMSk7XG4gIH1cblxuICBuZXh0TW9udGgoKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvTW9udGgoMSk7XG4gIH1cblxuICBjaGFuZ2VQYW5lbChtb2RlOiBQYW5lbE1vZGUsIHZhbHVlPzogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5wYW5lbE1vZGVDaGFuZ2UuZW1pdChtb2RlKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuY2hhbmdlVmFsdWVGcm9tSW5zaWRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBvbkNob29zZURlY2FkZSh2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VQYW5lbCgneWVhcicsIHZhbHVlKTtcbiAgICB0aGlzLmNob29zZURlY2FkZS5lbWl0KHZhbHVlKTtcbiAgfVxuXG4gIG9uQ2hvb3NlWWVhcih2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VQYW5lbCh0aGlzLnllYXJUb01vbnRoID8gJ21vbnRoJyA6ICdkYXRlJywgdmFsdWUpO1xuICAgIHRoaXMueWVhclRvTW9udGggPSBmYWxzZTsgLy8gQ2xlYXJcbiAgICB0aGlzLmNob29zZVllYXIuZW1pdCh2YWx1ZSk7XG4gIH1cblxuICBvbkNob29zZU1vbnRoKHZhbHVlOiBDYW5keURhdGUpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZVBhbmVsKCdkYXRlJywgdmFsdWUpO1xuICAgIHRoaXMueWVhclRvTW9udGggPSBmYWxzZTsgLy8gQ2xlYXJcbiAgICB0aGlzLmNob29zZU1vbnRoLmVtaXQodmFsdWUpO1xuICB9XG5cbiAgY2hhbmdlVG9Nb250aFBhbmVsKCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlUGFuZWwoJ21vbnRoJyk7XG4gICAgdGhpcy55ZWFyVG9Nb250aCA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgdGhpcy55ZWFyTW9udGhEYXlTZWxlY3RvcnMgPSB0aGlzLmNyZWF0ZVllYXJNb250aERheVNlbGVjdG9ycygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ290b01vbnRoKGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZUZyb21JbnNpZGUodGhpcy52YWx1ZS5hZGRNb250aHMoYW1vdW50KSk7XG4gIH1cblxuICBwcml2YXRlIGdvdG9ZZWFyKGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGFuZ2VWYWx1ZUZyb21JbnNpZGUodGhpcy52YWx1ZS5hZGRZZWFycyhhbW91bnQpKTtcbiAgfVxuXG4gIHByaXZhdGUgY2hhbmdlVmFsdWVGcm9tSW5zaWRlKHZhbHVlOiBDYW5keURhdGUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXREYXRlVGltZShsb2NhbGVGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0ZUhlbHBlci5mb3JtYXQodGhpcy52YWx1ZS5uYXRpdmVEYXRlLCBsb2NhbGVGb3JtYXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVZZWFyTW9udGhEYXlTZWxlY3RvcnMoKTogWWVhck1vbnRoRGF5U2VsZWN0b3JbXSB7XG4gICAgbGV0IHllYXI6IFllYXJNb250aERheVNlbGVjdG9yO1xuICAgIGxldCBtb250aDogWWVhck1vbnRoRGF5U2VsZWN0b3I7XG4gICAgbGV0IGRheTogWWVhck1vbnRoRGF5U2VsZWN0b3I7XG5cbiAgICAvLyBOT1RFOiBDb21wYXQgZm9yIERhdGVQaXBlIGZvcm1hdHRpbmcgcnVsZXNcbiAgICBsZXQgeWVhckZvcm1hdDogc3RyaW5nID0gdGhpcy5sb2NhbGUueWVhckZvcm1hdDtcbiAgICBpZiAodGhpcy5kYXRlSGVscGVyLnJlbHlPbkRhdGVQaXBlKSB7XG4gICAgICB5ZWFyRm9ybWF0ID0gKHRoaXMuZGF0ZUhlbHBlciBhcyBEYXRlSGVscGVyQnlEYXRlUGlwZSkudHJhbnNDb21wYXRGb3JtYXQoeWVhckZvcm1hdCk7XG4gICAgfVxuICAgIHllYXIgPSB7XG4gICAgICBjbGFzc05hbWU6IGAke3RoaXMucHJlZml4Q2xzfS15ZWFyLXNlbGVjdGAsXG4gICAgICB0aXRsZTogdGhpcy5sb2NhbGUueWVhclNlbGVjdCxcbiAgICAgIG9uQ2xpY2s6ICgpID0+IHRoaXMuc2hvd1RpbWVQaWNrZXIgPyBudWxsIDogdGhpcy5jaGFuZ2VQYW5lbCgneWVhcicpLFxuICAgICAgbGFiZWw6IHRoaXMuZm9ybWF0RGF0ZVRpbWUoeWVhckZvcm1hdClcbiAgICB9O1xuXG4gICAgbW9udGggPSB7XG4gICAgICBjbGFzc05hbWU6IGAke3RoaXMucHJlZml4Q2xzfS1tb250aC1zZWxlY3RgLFxuICAgICAgdGl0bGU6IHRoaXMubG9jYWxlLm1vbnRoU2VsZWN0LFxuICAgICAgb25DbGljazogKCkgPT4gdGhpcy5zaG93VGltZVBpY2tlciA/IG51bGwgOiB0aGlzLmNoYW5nZVRvTW9udGhQYW5lbCgpLFxuICAgICAgbGFiZWw6IHRoaXMuZm9ybWF0RGF0ZVRpbWUodGhpcy5sb2NhbGUubW9udGhGb3JtYXQgfHwgJ01NTScpXG4gICAgfTtcblxuICAgIC8vIE5PVEU6IENvbXBhdCBmb3IgRGF0ZVBpcGUgZm9ybWF0dGluZyBydWxlc1xuICAgIGxldCBkYXlGb3JtYXQ6IHN0cmluZyA9IHRoaXMubG9jYWxlLmRheUZvcm1hdDtcbiAgICBpZiAodGhpcy5kYXRlSGVscGVyLnJlbHlPbkRhdGVQaXBlKSB7XG4gICAgICBkYXlGb3JtYXQgPSAodGhpcy5kYXRlSGVscGVyIGFzIERhdGVIZWxwZXJCeURhdGVQaXBlKS50cmFuc0NvbXBhdEZvcm1hdChkYXlGb3JtYXQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG93VGltZVBpY2tlcikge1xuICAgICAgZGF5ID0ge1xuICAgICAgICBjbGFzc05hbWU6IGAke3RoaXMucHJlZml4Q2xzfS1kYXktc2VsZWN0YCxcbiAgICAgICAgbGFiZWw6IHRoaXMuZm9ybWF0RGF0ZVRpbWUoZGF5Rm9ybWF0KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiBZZWFyTW9udGhEYXlTZWxlY3RvcltdO1xuXG4gICAgaWYgKHRoaXMubG9jYWxlLm1vbnRoQmVmb3JlWWVhcikge1xuICAgICAgcmVzdWx0ID0gWyBtb250aCwgZGF5LCB5ZWFyIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IFsgeWVhciwgbW9udGgsIGRheSBdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQuZmlsdGVyKHNlbGVjdG9yID0+ICEhc2VsZWN0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgWWVhck1vbnRoRGF5U2VsZWN0b3Ige1xuICBjbGFzc05hbWU6IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG9uQ2xpY2s/KCk6IHZvaWQ7XG59XG4iXX0=