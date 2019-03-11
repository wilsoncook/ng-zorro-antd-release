/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DatePipe } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import fnsFormat from 'date-fns/format';
import fnsGetISOWeek from 'date-fns/get_iso_week';
import fnsParse from 'date-fns/parse';
import { mergeDateConfig, NZ_DATE_CONFIG } from './date-config';
import { NzI18nService } from './nz-i18n.service';
import * as i0 from "@angular/core";
import * as i1 from "./public-api";
import * as i2 from "@angular/common";
/**
 * @param {?} i18n
 * @param {?} config
 * @param {?} datePipe
 * @return {?}
 */
export function DATE_HELPER_SERVICE_FACTORY(i18n, config, datePipe) {
    return i18n.getDateLocale() ? new DateHelperByDateFns(i18n, config) : new DateHelperByDatePipe(i18n, config, datePipe);
}
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 * @abstract
 */
export class DateHelperService {
    /**
     * @param {?} i18n
     * @param {?} config
     */
    constructor(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.relyOnDatePipe = this instanceof DateHelperByDatePipe;
        this.config = mergeDateConfig(this.config);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    parseDate(text) {
        if (!text) {
            return;
        }
        return fnsParse(text);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    parseTime(text) {
        if (!text) {
            return;
        }
        return fnsParse(`1970-01-01 ${text}`);
    }
}
DateHelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
                useFactory: DATE_HELPER_SERVICE_FACTORY,
                deps: [NzI18nService, [new Optional(), NZ_DATE_CONFIG], DatePipe]
            },] }
];
/** @nocollapse */
DateHelperService.ctorParameters = () => [
    { type: NzI18nService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_DATE_CONFIG,] }] }
];
/** @nocollapse */ DateHelperService.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperService_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperService, providedIn: "root" });
function DateHelperService_tsickle_Closure_declarations() {
    /** @type {?} */
    DateHelperService.prototype.relyOnDatePipe;
    /** @type {?} */
    DateHelperService.prototype.i18n;
    /** @type {?} */
    DateHelperService.prototype.config;
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DateHelperService.prototype.getISOWeek = function (date) { };
    /**
     * @abstract
     * @return {?}
     */
    DateHelperService.prototype.getFirstDayOfWeek = function () { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} formatStr
     * @return {?}
     */
    DateHelperService.prototype.format = function (date, formatStr) { };
}
/**
 * DateHelper that handles date formats with date-fns
 */
export class DateHelperByDateFns extends DateHelperService {
    /**
     * @param {?} date
     * @return {?}
     */
    getISOWeek(date) {
        return fnsGetISOWeek(date);
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        return this.config.firstDayOfWeek == null ? 1 : this.config.firstDayOfWeek;
    }
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param {?} date Date
     * @param {?} formatStr format string
     * @return {?}
     */
    format(date, formatStr) {
        return fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() });
    }
}
/** @nocollapse */ DateHelperByDateFns.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperByDateFns_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperByDateFns, providedIn: "root" });
/**
 * DateHelper that handles date formats with angular's date-pipe
 * [BUG] Use DatePipe may cause non-standard week bug, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406
 *
 * @deprecated Maybe removed in next major version due to this serious bug
 */
export class DateHelperByDatePipe extends DateHelperService {
    /**
     * @param {?} i18n
     * @param {?} config
     * @param {?} datePipe
     */
    constructor(i18n, config, datePipe) {
        super(i18n, config);
        this.datePipe = datePipe;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getISOWeek(date) {
        return +this.format(date, 'w');
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        if (this.config.firstDayOfWeek == null) {
            /** @type {?} */
            const locale = this.i18n.getLocaleId();
            return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
        }
        return this.config.firstDayOfWeek;
    }
    /**
     * @param {?} date
     * @param {?} formatStr
     * @return {?}
     */
    format(date, formatStr) {
        return date ? this.datePipe.transform(date, formatStr, null, this.i18n.getLocaleId()) : '';
    }
    /**
     * Compatible translate the moment-like format pattern to angular's pattern
     * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
     *
     * TODO: compare and complete all format patterns
     * Each format docs as below:
     * @link https://momentjs.com/docs/#/displaying/format/
     * @link https://angular.io/api/common/DatePipe#description
     * @param {?} format input format pattern
     * @return {?}
     */
    transCompatFormat(format) {
        return format && format
            .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
            .replace(/D/g, 'd'); // d, dd represent of D, DD for momentjs, others are not support
    }
}
/** @nocollapse */
DateHelperByDatePipe.ctorParameters = () => [
    { type: NzI18nService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_DATE_CONFIG,] }] },
    { type: DatePipe }
];
/** @nocollapse */ DateHelperByDatePipe.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperByDatePipe_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperByDatePipe, providedIn: "root" });
function DateHelperByDatePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    DateHelperByDatePipe.prototype.datePipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJpMThuL2RhdGUtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxhQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEMsT0FBTyxFQUFFLGVBQWUsRUFBZ0IsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7Ozs7OztBQUVsRCxNQUFNLHNDQUFzQyxJQUFtQixFQUFFLE1BQW9CLEVBQUUsUUFBa0I7SUFDdkcsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Q0FDeEg7Ozs7OztBQVdELE1BQU07Ozs7O0lBR0osWUFBc0IsSUFBbUIsRUFBZ0QsTUFBb0I7UUFBdkYsU0FBSSxHQUFKLElBQUksQ0FBZTtRQUFnRCxXQUFNLEdBQU4sTUFBTSxDQUFjOzhCQUZuRixJQUFJLFlBQVksb0JBQW9CO1FBRzVELElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1Qzs7Ozs7SUFNRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTztTQUNSO1FBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7Ozs7O0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU87U0FDUjtRQUNELE9BQU8sUUFBUSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN2Qzs7O1lBNUJGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLDJCQUEyQjtnQkFDdkMsSUFBSSxFQUFFLENBQUUsYUFBYSxFQUFFLENBQUUsSUFBSSxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUUsRUFBRSxRQUFRLENBQUU7YUFDdEU7Ozs7WUFkUSxhQUFhOzRDQWtCd0IsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCL0UsTUFBTSwwQkFBMkIsU0FBUSxpQkFBaUI7Ozs7O0lBQ3hELFVBQVUsQ0FBQyxJQUFVO1FBQ25CLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCOzs7O0lBSUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FDNUU7Ozs7Ozs7O0lBUUQsTUFBTSxDQUFDLElBQVUsRUFBRSxTQUFpQjtRQUNsQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzFFOzs7Ozs7Ozs7QUFTSCxNQUFNLDJCQUE0QixTQUFRLGlCQUFpQjs7Ozs7O0lBQ3pELFlBQVksSUFBbUIsRUFBc0MsTUFBb0IsRUFBVSxRQUFrQjtRQUNuSCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRDZFLGFBQVEsR0FBUixRQUFRLENBQVU7S0FFcEg7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQVU7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ2hDOzs7O0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUU7O1lBQ3RDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsT0FBTyxNQUFNLElBQUksQ0FBRSxPQUFPLEVBQUUsT0FBTyxDQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7S0FDbkM7Ozs7OztJQUVELE1BQU0sQ0FBQyxJQUFVLEVBQUUsU0FBaUI7UUFDbEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQzVGOzs7Ozs7Ozs7Ozs7SUFZRCxpQkFBaUIsQ0FBQyxNQUFjO1FBQzlCLE9BQU8sTUFBTSxJQUFJLE1BQU07YUFDcEIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7YUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUN2Qjs7OztZQTNHTSxhQUFhOzRDQXlFYyxRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7WUEvRTVELFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZm5zRm9ybWF0IGZyb20gJ2RhdGUtZm5zL2Zvcm1hdCc7XG5pbXBvcnQgZm5zR2V0SVNPV2VlayBmcm9tICdkYXRlLWZucy9nZXRfaXNvX3dlZWsnO1xuaW1wb3J0IGZuc1BhcnNlIGZyb20gJ2RhdGUtZm5zL3BhcnNlJztcbmltcG9ydCB7IG1lcmdlRGF0ZUNvbmZpZywgTnpEYXRlQ29uZmlnLCBOWl9EQVRFX0NPTkZJRyB9IGZyb20gJy4vZGF0ZS1jb25maWcnO1xuaW1wb3J0IHsgTnpJMThuU2VydmljZSB9IGZyb20gJy4vbnotaTE4bi5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIERBVEVfSEVMUEVSX1NFUlZJQ0VfRkFDVE9SWShpMThuOiBOekkxOG5TZXJ2aWNlLCBjb25maWc6IE56RGF0ZUNvbmZpZywgZGF0ZVBpcGU6IERhdGVQaXBlKTogRGF0ZUhlbHBlclNlcnZpY2Uge1xuICByZXR1cm4gaTE4bi5nZXREYXRlTG9jYWxlKCkgPyBuZXcgRGF0ZUhlbHBlckJ5RGF0ZUZucyhpMThuLCBjb25maWcpIDogbmV3IERhdGVIZWxwZXJCeURhdGVQaXBlKGkxOG4sIGNvbmZpZywgZGF0ZVBpcGUpO1xufVxuXG4vKipcbiAqIEFic3RyYWN0IERhdGVIZWxwZXJTZXJ2aWNlKFRva2VuIHZpYSBDbGFzcylcbiAqIENvbXBhdGliaWxpdHk6IGNvbXBhY3QgZm9yIG9yaWdpbmFsIHVzYWdlIGJ5IGRlZmF1bHQgd2hpY2ggdXNpbmcgRGF0ZVBpcGVcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6IERBVEVfSEVMUEVSX1NFUlZJQ0VfRkFDVE9SWSxcbiAgZGVwczogWyBOekkxOG5TZXJ2aWNlLCBbIG5ldyBPcHRpb25hbCgpLCBOWl9EQVRFX0NPTkZJRyBdLCBEYXRlUGlwZSBdXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgcmVseU9uRGF0ZVBpcGU6IGJvb2xlYW4gPSB0aGlzIGluc3RhbmNlb2YgRGF0ZUhlbHBlckJ5RGF0ZVBpcGU7IC8vIEluZGljYXRlIHdoZXRoZXIgdGhpcyBzZXJ2aWNlIGlzIHJlbHkgb24gRGF0ZVBpcGVcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaTE4bjogTnpJMThuU2VydmljZSwgQE9wdGlvbmFsKCkgQEluamVjdChOWl9EQVRFX0NPTkZJRykgcHJvdGVjdGVkIGNvbmZpZzogTnpEYXRlQ29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBtZXJnZURhdGVDb25maWcodGhpcy5jb25maWcpO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyO1xuICBhYnN0cmFjdCBnZXRGaXJzdERheU9mV2VlaygpOiBXZWVrRGF5SW5kZXg7XG4gIGFic3RyYWN0IGZvcm1hdChkYXRlOiBEYXRlLCBmb3JtYXRTdHI6IHN0cmluZyk6IHN0cmluZztcblxuICBwYXJzZURhdGUodGV4dDogc3RyaW5nKTogRGF0ZSB7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBmbnNQYXJzZSh0ZXh0KTtcbiAgfVxuXG4gIHBhcnNlVGltZSh0ZXh0OiBzdHJpbmcpOiBEYXRlIHtcbiAgICBpZiAoIXRleHQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIGZuc1BhcnNlKGAxOTcwLTAxLTAxICR7dGV4dH1gKTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGVIZWxwZXIgdGhhdCBoYW5kbGVzIGRhdGUgZm9ybWF0cyB3aXRoIGRhdGUtZm5zXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlSGVscGVyQnlEYXRlRm5zIGV4dGVuZHMgRGF0ZUhlbHBlclNlcnZpY2Uge1xuICBnZXRJU09XZWVrKGRhdGU6IERhdGUpOiBudW1iZXIge1xuICAgIHJldHVybiBmbnNHZXRJU09XZWVrKGRhdGUpO1xuICB9XG5cbiAgLy8gVE9ETzogVXNlIGRhdGUtZm5zJ3MgXCJ3ZWVrU3RhcnRzT25cIiB0byBzdXBwb3J0IGRpZmZlcmVudCBsb2NhbGUgd2hlbiBcImNvbmZpZy5maXJzdERheU9mV2Vla1wiIGlzIG51bGxcbiAgLy8gd2hlbiB2Mi4wIGlzIHJlYWR5OiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi92Mi4wLjAtYWxwaGEuMjcvc3JjL2xvY2FsZS9lbi1VUy9pbmRleC5qcyNMMjNcbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrID09IG51bGwgPyAxIDogdGhpcy5jb25maWcuZmlyc3REYXlPZldlZWs7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgZGF0ZVxuICAgKiBAc2VlIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZm9ybWF0I2Rlc2NyaXB0aW9uXG4gICAqIEBwYXJhbSBkYXRlIERhdGVcbiAgICogQHBhcmFtIGZvcm1hdFN0ciBmb3JtYXQgc3RyaW5nXG4gICAqL1xuICBmb3JtYXQoZGF0ZTogRGF0ZSwgZm9ybWF0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBmbnNGb3JtYXQoZGF0ZSwgZm9ybWF0U3RyLCB7IGxvY2FsZTogdGhpcy5pMThuLmdldERhdGVMb2NhbGUoKSB9KTtcbiAgfVxufVxuXG4vKipcbiAqIERhdGVIZWxwZXIgdGhhdCBoYW5kbGVzIGRhdGUgZm9ybWF0cyB3aXRoIGFuZ3VsYXIncyBkYXRlLXBpcGVcbiAqIFtCVUddIFVzZSBEYXRlUGlwZSBtYXkgY2F1c2Ugbm9uLXN0YW5kYXJkIHdlZWsgYnVnLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9ORy1aT1JSTy9uZy16b3Jyby1hbnRkL2lzc3Vlcy8yNDA2XG4gKlxuICogQGRlcHJlY2F0ZWQgTWF5YmUgcmVtb3ZlZCBpbiBuZXh0IG1ham9yIHZlcnNpb24gZHVlIHRvIHRoaXMgc2VyaW91cyBidWdcbiAqL1xuZXhwb3J0IGNsYXNzIERhdGVIZWxwZXJCeURhdGVQaXBlIGV4dGVuZHMgRGF0ZUhlbHBlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihpMThuOiBOekkxOG5TZXJ2aWNlLCBAT3B0aW9uYWwoKSBASW5qZWN0KE5aX0RBVEVfQ09ORklHKSBjb25maWc6IE56RGF0ZUNvbmZpZywgcHJpdmF0ZSBkYXRlUGlwZTogRGF0ZVBpcGUpIHtcbiAgICBzdXBlcihpMThuLCBjb25maWcpO1xuICB9XG5cbiAgZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gK3RoaXMuZm9ybWF0KGRhdGUsICd3Jyk7XG4gIH1cblxuICBnZXRGaXJzdERheU9mV2VlaygpOiBXZWVrRGF5SW5kZXgge1xuICAgIGlmICh0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlayA9PSBudWxsKSB7XG4gICAgICBjb25zdCBsb2NhbGUgPSB0aGlzLmkxOG4uZ2V0TG9jYWxlSWQoKTtcbiAgICAgIHJldHVybiBsb2NhbGUgJiYgWyAnemgtY24nLCAnemgtdHcnIF0uaW5kZXhPZihsb2NhbGUudG9Mb3dlckNhc2UoKSkgPiAtMSA/IDEgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWcuZmlyc3REYXlPZldlZWs7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogRGF0ZSwgZm9ybWF0U3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBkYXRlID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oZGF0ZSwgZm9ybWF0U3RyLCBudWxsLCB0aGlzLmkxOG4uZ2V0TG9jYWxlSWQoKSkgOiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wYXRpYmxlIHRyYW5zbGF0ZSB0aGUgbW9tZW50LWxpa2UgZm9ybWF0IHBhdHRlcm4gdG8gYW5ndWxhcidzIHBhdHRlcm5cbiAgICogV2h5PyBGb3Igbm93LCB3ZSBuZWVkIHRvIHN1cHBvcnQgdGhlIGV4aXN0aW5nIGxhbmd1YWdlIGZvcm1hdHMgaW4gQW50RCwgYW5kIEFudEQgdXNlcyB0aGUgZGVmYXVsdCB0ZW1wb3JhbCBzeW50YXguXG4gICAqXG4gICAqIFRPRE86IGNvbXBhcmUgYW5kIGNvbXBsZXRlIGFsbCBmb3JtYXQgcGF0dGVybnNcbiAgICogRWFjaCBmb3JtYXQgZG9jcyBhcyBiZWxvdzpcbiAgICogQGxpbmsgaHR0cHM6Ly9tb21lbnRqcy5jb20vZG9jcy8jL2Rpc3BsYXlpbmcvZm9ybWF0L1xuICAgKiBAbGluayBodHRwczovL2FuZ3VsYXIuaW8vYXBpL2NvbW1vbi9EYXRlUGlwZSNkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0gZm9ybWF0IGlucHV0IGZvcm1hdCBwYXR0ZXJuXG4gICAqL1xuICB0cmFuc0NvbXBhdEZvcm1hdChmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZvcm1hdCAmJiBmb3JtYXRcbiAgICAgIC5yZXBsYWNlKC9ZL2csICd5JykgLy8gb25seSBzdXBwb3J0IHksIHl5LCB5eXksIHl5eXlcbiAgICAgIC5yZXBsYWNlKC9EL2csICdkJyk7IC8vIGQsIGRkIHJlcHJlc2VudCBvZiBELCBERCBmb3IgbW9tZW50anMsIG90aGVycyBhcmUgbm90IHN1cHBvcnRcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHR5cGUgV2Vla0RheUluZGV4ID0gMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNjtcbiJdfQ==