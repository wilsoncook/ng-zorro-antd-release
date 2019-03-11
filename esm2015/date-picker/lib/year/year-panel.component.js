/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CandyDate } from '../candy-date';
/** @type {?} */
const MAX_ROW = 4;
/** @type {?} */
const MAX_COL = 3;
export class YearPanelComponent {
    constructor() {
        this.valueChange = new EventEmitter();
        this.decadePanelShow = new EventEmitter();
        this.prefixCls = 'ant-calendar-year-panel';
    }
    /**
     * @return {?}
     */
    get currentYear() {
        return this.value.getYear();
    }
    /**
     * @return {?}
     */
    get startYear() {
        return parseInt(`${this.currentYear / 10}`, 10) * 10;
    }
    /**
     * @return {?}
     */
    get endYear() {
        return this.startYear + 9;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["value"] || changes["disabledDate"]) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    previousDecade() {
        this.gotoYear(-10);
    }
    /**
     * @return {?}
     */
    nextDecade() {
        this.gotoYear(10);
    }
    /**
     * @param {?} index
     * @param {?} yearData
     * @return {?}
     */
    trackPanelYear(index, yearData) {
        return yearData.content;
    }
    /**
     * @return {?}
     */
    render() {
        if (this.value) {
            this.panelYears = this.makePanelYears();
        }
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    gotoYear(amount) {
        this.value = this.value.addYears(amount);
        // this.valueChange.emit(this.value); // Do not trigger final value change
        this.render();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    chooseYear(year) {
        this.value = this.value.setYear(year);
        this.valueChange.emit(this.value);
        this.render();
    }
    /**
     * @return {?}
     */
    makePanelYears() {
        /** @type {?} */
        const years = [];
        /** @type {?} */
        const currentYear = this.currentYear;
        /** @type {?} */
        const startYear = this.startYear;
        /** @type {?} */
        const endYear = this.endYear;
        /** @type {?} */
        const previousYear = startYear - 1;
        /** @type {?} */
        let index = 0;
        for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
            years[rowIndex] = [];
            for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
                /** @type {?} */
                const year = previousYear + index;
                /** @type {?} */
                const content = String(year);
                /** @type {?} */
                const disabled = this.disabledDate ? this.disabledDate(this.value.setYear(year).nativeDate) : false;
                /** @type {?} */
                const cell = years[rowIndex][colIndex] = {
                    disabled,
                    content,
                    year,
                    title: content,
                    isCurrent: year === currentYear,
                    isLowerThanStart: year < startYear,
                    isBiggerThanEnd: year > endYear,
                    classMap: null,
                    onClick: null
                };
                cell.classMap = {
                    [`${this.prefixCls}-cell`]: true,
                    [`${this.prefixCls}-selected-cell`]: cell.isCurrent,
                    [`${this.prefixCls}-cell-disabled`]: disabled,
                    [`${this.prefixCls}-last-decade-cell`]: cell.isLowerThanStart,
                    [`${this.prefixCls}-next-decade-cell`]: cell.isBiggerThanEnd
                };
                if (cell.isLowerThanStart) {
                    cell.onClick = () => this.previousDecade();
                }
                else if (cell.isBiggerThanEnd) {
                    cell.onClick = () => this.nextDecade();
                }
                else {
                    cell.onClick = () => this.chooseYear(cell.year);
                }
                index++;
            }
        }
        return years;
    }
}
YearPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'year-panel',
                template: "<div class=\"{{ prefixCls }}\">\n  <div>\n    <div class=\"{{ prefixCls }}-header\">\n      <a\n        class=\"{{ prefixCls }}-prev-decade-btn\"\n        role=\"button\"\n        (click)=\"previousDecade()\"\n        title=\"{{ locale.previousDecade }}\"\n      ></a>\n      <a\n        class=\"{{ prefixCls }}-decade-select\"\n        role=\"button\"\n        (click)=\"decadePanelShow.emit()\"\n        title=\"{{ locale.decadeSelect }}\"\n      >\n        <span class=\"{{ prefixCls }}-decade-select-content\">\n          {{ startYear }}-{{ endYear }}\n        </span>\n        <span class=\"{{ prefixCls }}-decade-select-arrow\">x</span>\n      </a>\n\n      <a class=\"{{ prefixCls }}-next-decade-btn\" (click)=\"nextDecade()\" title=\"{{ locale.nextDecade }}\" role=\"button\"></a>\n    </div>\n    <div class=\"{{ prefixCls }}-body\">\n      <table class=\"{{ prefixCls }}-table\" cellSpacing=\"0\" role=\"grid\">\n        <tbody class=\"{{ prefixCls }}-tbody\">\n          <tr *ngFor=\"let row of panelYears\" role=\"row\">\n            <td *ngFor=\"let yearCell of row; trackBy: trackPanelYear\"\n              role=\"gridcell\"\n              title=\"{{ yearCell.title }}\"\n              (click)=\"yearCell.disabled ? null : yearCell.onClick()\"\n              [ngClass]=\"yearCell.classMap\"\n            >\n              <a class=\"{{ prefixCls }}-year\">{{ yearCell.content }}</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>",
                styles: [`
      .ant-calendar-year-panel-cell-disabled .ant-calendar-year-panel-year, .ant-calendar-year-panel-cell-disabled .ant-calendar-year-panel-year:hover {
        color: rgba(0,0,0,0.25);
        background: #f5f5f5;
        cursor: not-allowed;
      }
    `]
            }] }
];
/** @nocollapse */
YearPanelComponent.ctorParameters = () => [];
YearPanelComponent.propDecorators = {
    locale: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    disabledDate: [{ type: Input }],
    decadePanelShow: [{ type: Output }]
};
function YearPanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    YearPanelComponent.prototype.locale;
    /** @type {?} */
    YearPanelComponent.prototype.value;
    /** @type {?} */
    YearPanelComponent.prototype.valueChange;
    /** @type {?} */
    YearPanelComponent.prototype.disabledDate;
    /** @type {?} */
    YearPanelComponent.prototype.decadePanelShow;
    /** @type {?} */
    YearPanelComponent.prototype.prefixCls;
    /** @type {?} */
    YearPanelComponent.prototype.panelYears;
}
/**
 * @record
 */
export function PanelYearData() { }
function PanelYearData_tsickle_Closure_declarations() {
    /** @type {?} */
    PanelYearData.prototype.disabled;
    /** @type {?} */
    PanelYearData.prototype.content;
    /** @type {?} */
    PanelYearData.prototype.year;
    /** @type {?} */
    PanelYearData.prototype.title;
    /** @type {?} */
    PanelYearData.prototype.isCurrent;
    /** @type {?} */
    PanelYearData.prototype.isLowerThanStart;
    /** @type {?} */
    PanelYearData.prototype.isBiggerThanEnd;
    /** @type {?} */
    PanelYearData.prototype.classMap;
    /** @type {?} */
    PanelYearData.prototype.onClick;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWVhci1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvbGliL3llYXIveWVhci1wYW5lbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR2pHLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTFDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQzs7QUFDbEIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBaUJsQixNQUFNO0lBdUJKOzJCQW5Cd0IsSUFBSSxZQUFZLEVBQWE7K0JBSWhCLElBQUksWUFBWSxFQUFRO3lCQVl6Qyx5QkFBeUI7S0FHNUI7Ozs7SUFiakIsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzdCOzs7O0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUN0RDs7OztJQUNELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBT0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxhQUFVLE9BQU8sZ0JBQWEsRUFBRTtZQUN6QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDZjtLQUNGOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNwQjs7OztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ25COzs7Ozs7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QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDNUM7cUJBQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO29CQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDakQ7Z0JBRUQsS0FBSyxFQUFHLENBQUM7YUFDVjtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUM7Ozs7WUExSGhCLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsbStDQUF3Qzt5QkFHdEM7Ozs7OztLQU1DO2FBRUo7Ozs7O3FCQUdFLEtBQUs7b0JBRUwsS0FBSzswQkFDTCxNQUFNOzJCQUVOLEtBQUs7OEJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpDYWxlbmRhckkxOG5JbnRlcmZhY2UgfSBmcm9tICcuLi8uLi8uLi9pMThuL256LWkxOG4uaW50ZXJmYWNlJztcbmltcG9ydCB7IENhbmR5RGF0ZSB9IGZyb20gJy4uL2NhbmR5LWRhdGUnO1xuXG5jb25zdCBNQVhfUk9XID0gNDtcbmNvbnN0IE1BWF9DT0wgPSAzO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd5ZWFyLXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICd5ZWFyLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgLy8gU3VwcG9ydCBkaXNhYmxlZERhdGVcbiAgICBgXG4gICAgICAuYW50LWNhbGVuZGFyLXllYXItcGFuZWwtY2VsbC1kaXNhYmxlZCAuYW50LWNhbGVuZGFyLXllYXItcGFuZWwteWVhciwgLmFudC1jYWxlbmRhci15ZWFyLXBhbmVsLWNlbGwtZGlzYWJsZWQgLmFudC1jYWxlbmRhci15ZWFyLXBhbmVsLXllYXI6aG92ZXIge1xuICAgICAgICBjb2xvcjogcmdiYSgwLDAsMCwwLjI1KTtcbiAgICAgICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBZZWFyUGFuZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBsb2NhbGU6IE56Q2FsZW5kYXJJMThuSW50ZXJmYWNlO1xuXG4gIEBJbnB1dCgpIHZhbHVlOiBDYW5keURhdGU7XG4gIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FuZHlEYXRlPigpO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkRGF0ZTogKGRhdGU6IERhdGUpID0+IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIHJlYWRvbmx5IGRlY2FkZVBhbmVsU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBnZXQgY3VycmVudFllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZS5nZXRZZWFyKCk7XG4gIH1cbiAgZ2V0IHN0YXJ0WWVhcigpOiBudW1iZXIge1xuICAgIHJldHVybiBwYXJzZUludChgJHt0aGlzLmN1cnJlbnRZZWFyIC8gMTB9YCwgMTApICogMTA7XG4gIH1cbiAgZ2V0IGVuZFllYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFllYXIgKyA5O1xuICB9XG5cbiAgcHJlZml4Q2xzOiBzdHJpbmcgPSAnYW50LWNhbGVuZGFyLXllYXItcGFuZWwnO1xuICBwYW5lbFllYXJzOiBQYW5lbFllYXJEYXRhW11bXTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlcy52YWx1ZSB8fCBjaGFuZ2VzLmRpc2FibGVkRGF0ZSkge1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBwcmV2aW91c0RlY2FkZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdvdG9ZZWFyKC0xMCk7XG4gIH1cblxuICBuZXh0RGVjYWRlKCk6IHZvaWQge1xuICAgIHRoaXMuZ290b1llYXIoMTApO1xuICB9XG5cbiAgdHJhY2tQYW5lbFllYXIoaW5kZXg6IG51bWJlciwgeWVhckRhdGE6IFBhbmVsWWVhckRhdGEpOiBzdHJpbmcge1xuICAgIHJldHVybiB5ZWFyRGF0YS5jb250ZW50O1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMucGFuZWxZZWFycyA9IHRoaXMubWFrZVBhbmVsWWVhcnMoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZS1yZW5kZXIgcGFuZWwgY29udGVudCBieSB0aGUgaGVhZGVyJ3MgYnV0dG9ucyAoTk9URTogRG8gbm90IHRyeSB0byB0cmlnZ2VyIGZpbmFsIHZhbHVlIGNoYW5nZSlcbiAgcHJpdmF0ZSBnb3RvWWVhcihhbW91bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLmFkZFllYXJzKGFtb3VudCk7XG4gICAgLy8gdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpOyAvLyBEbyBub3QgdHJpZ2dlciBmaW5hbCB2YWx1ZSBjaGFuZ2VcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaG9vc2VZZWFyKHllYXI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLnNldFllYXIoeWVhcik7XG4gICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VQYW5lbFllYXJzKCk6IFBhbmVsWWVhckRhdGFbXVtdIHtcbiAgICBjb25zdCB5ZWFyczogUGFuZWxZZWFyRGF0YVtdW10gPSBbXTtcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IHRoaXMuY3VycmVudFllYXI7XG4gICAgY29uc3Qgc3RhcnRZZWFyID0gdGhpcy5zdGFydFllYXI7XG4gICAgY29uc3QgZW5kWWVhciA9IHRoaXMuZW5kWWVhcjtcbiAgICBjb25zdCBwcmV2aW91c1llYXIgPSBzdGFydFllYXIgLSAxO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChsZXQgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IE1BWF9ST1c7IHJvd0luZGV4ICsrKSB7XG4gICAgICB5ZWFyc1tyb3dJbmRleF0gPSBbXTtcbiAgICAgIGZvciAobGV0IGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBNQVhfQ09MOyBjb2xJbmRleCArKykge1xuICAgICAgICBjb25zdCB5ZWFyID0gcHJldmlvdXNZZWFyICsgaW5kZXg7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBTdHJpbmcoeWVhcik7XG4gICAgICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5kaXNhYmxlZERhdGUgPyB0aGlzLmRpc2FibGVkRGF0ZSh0aGlzLnZhbHVlLnNldFllYXIoeWVhcikubmF0aXZlRGF0ZSkgOiBmYWxzZTtcblxuICAgICAgICBjb25zdCBjZWxsID0geWVhcnNbcm93SW5kZXhdW2NvbEluZGV4XSA9IHtcbiAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIHllYXIsXG4gICAgICAgICAgdGl0bGU6IGNvbnRlbnQsXG4gICAgICAgICAgaXNDdXJyZW50OiB5ZWFyID09PSBjdXJyZW50WWVhcixcbiAgICAgICAgICBpc0xvd2VyVGhhblN0YXJ0OiB5ZWFyIDwgc3RhcnRZZWFyLFxuICAgICAgICAgIGlzQmlnZ2VyVGhhbkVuZDogeWVhciA+IGVuZFllYXIsXG4gICAgICAgICAgY2xhc3NNYXA6IG51bGwsXG4gICAgICAgICAgb25DbGljazogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGNlbGwuY2xhc3NNYXAgPSB7XG4gICAgICAgICAgW2Ake3RoaXMucHJlZml4Q2xzfS1jZWxsYF06IHRydWUsXG4gICAgICAgICAgW2Ake3RoaXMucHJlZml4Q2xzfS1zZWxlY3RlZC1jZWxsYF06IGNlbGwuaXNDdXJyZW50LFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tY2VsbC1kaXNhYmxlZGBdOiBkaXNhYmxlZCxcbiAgICAgICAgICBbYCR7dGhpcy5wcmVmaXhDbHN9LWxhc3QtZGVjYWRlLWNlbGxgXTogY2VsbC5pc0xvd2VyVGhhblN0YXJ0LFxuICAgICAgICAgIFtgJHt0aGlzLnByZWZpeENsc30tbmV4dC1kZWNhZGUtY2VsbGBdOiBjZWxsLmlzQmlnZ2VyVGhhbkVuZFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjZWxsLmlzTG93ZXJUaGFuU3RhcnQpIHtcbiAgICAgICAgICBjZWxsLm9uQ2xpY2sgPSAoKSA9PiB0aGlzLnByZXZpb3VzRGVjYWRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2VsbC5pc0JpZ2dlclRoYW5FbmQpIHtcbiAgICAgICAgICBjZWxsLm9uQ2xpY2sgPSAoKSA9PiB0aGlzLm5leHREZWNhZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsLm9uQ2xpY2sgPSAoKSA9PiB0aGlzLmNob29zZVllYXIoY2VsbC55ZWFyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4ICsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geWVhcnM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYW5lbFllYXJEYXRhIHtcbiAgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgeWVhcjogbnVtYmVyO1xuICB0aXRsZTogc3RyaW5nO1xuICBpc0N1cnJlbnQ6IGJvb2xlYW47XG4gIGlzTG93ZXJUaGFuU3RhcnQ6IGJvb2xlYW47XG4gIGlzQmlnZ2VyVGhhbkVuZDogYm9vbGVhbjtcbiAgY2xhc3NNYXA6IG9iamVjdDtcbiAgb25DbGljaygpOiB2b2lkO1xufVxuIl19