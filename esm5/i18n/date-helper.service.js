/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var DateHelperService = /** @class */ (function () {
    function DateHelperService(i18n, config) {
        this.i18n = i18n;
        this.config = config;
        this.relyOnDatePipe = this instanceof DateHelperByDatePipe;
        this.config = mergeDateConfig(this.config);
    }
    /**
     * @param {?} text
     * @return {?}
     */
    DateHelperService.prototype.parseDate = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (!text) {
            return;
        }
        return fnsParse(text);
    };
    /**
     * @param {?} text
     * @return {?}
     */
    DateHelperService.prototype.parseTime = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        if (!text) {
            return;
        }
        return fnsParse("1970-01-01 " + text);
    };
    DateHelperService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                    useFactory: DATE_HELPER_SERVICE_FACTORY,
                    deps: [NzI18nService, [new Optional(), NZ_DATE_CONFIG], DatePipe]
                },] }
    ];
    /** @nocollapse */
    DateHelperService.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_DATE_CONFIG,] }] }
    ]; };
    /** @nocollapse */ DateHelperService.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperService_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperService, providedIn: "root" });
    return DateHelperService;
}());
export { DateHelperService };
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
var DateHelperByDateFns = /** @class */ (function (_super) {
    tslib_1.__extends(DateHelperByDateFns, _super);
    function DateHelperByDateFns() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateHelperByDateFns.prototype.getISOWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return fnsGetISOWeek(date);
    };
    // TODO: Use date-fns's "weekStartsOn" to support different locale when "config.firstDayOfWeek" is null
    // when v2.0 is ready: https://github.com/date-fns/date-fns/blob/v2.0.0-alpha.27/src/locale/en-US/index.js#L23
    /**
     * @return {?}
     */
    DateHelperByDateFns.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this.config.firstDayOfWeek == null ? 1 : this.config.firstDayOfWeek;
    };
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param date Date
     * @param formatStr format string
     */
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param {?} date Date
     * @param {?} formatStr format string
     * @return {?}
     */
    DateHelperByDateFns.prototype.format = /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param {?} date Date
     * @param {?} formatStr format string
     * @return {?}
     */
    function (date, formatStr) {
        return fnsFormat(date, formatStr, { locale: this.i18n.getDateLocale() });
    };
    /** @nocollapse */ DateHelperByDateFns.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperByDateFns_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperByDateFns, providedIn: "root" });
    return DateHelperByDateFns;
}(DateHelperService));
export { DateHelperByDateFns };
/**
 * DateHelper that handles date formats with angular's date-pipe
 * [BUG] Use DatePipe may cause non-standard week bug, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406
 *
 * @deprecated Maybe removed in next major version due to this serious bug
 */
var DateHelperByDatePipe = /** @class */ (function (_super) {
    tslib_1.__extends(DateHelperByDatePipe, _super);
    function DateHelperByDatePipe(i18n, config, datePipe) {
        var _this = _super.call(this, i18n, config) || this;
        _this.datePipe = datePipe;
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    DateHelperByDatePipe.prototype.getISOWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return +this.format(date, 'w');
    };
    /**
     * @return {?}
     */
    DateHelperByDatePipe.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        if (this.config.firstDayOfWeek == null) {
            /** @type {?} */
            var locale = this.i18n.getLocaleId();
            return locale && ['zh-cn', 'zh-tw'].indexOf(locale.toLowerCase()) > -1 ? 1 : 0;
        }
        return this.config.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @param {?} formatStr
     * @return {?}
     */
    DateHelperByDatePipe.prototype.format = /**
     * @param {?} date
     * @param {?} formatStr
     * @return {?}
     */
    function (date, formatStr) {
        return date ? this.datePipe.transform(date, formatStr, null, this.i18n.getLocaleId()) : '';
    };
    /**
     * Compatible translate the moment-like format pattern to angular's pattern
     * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
     *
     * TODO: compare and complete all format patterns
     * Each format docs as below:
     * @link https://momentjs.com/docs/#/displaying/format/
     * @link https://angular.io/api/common/DatePipe#description
     * @param format input format pattern
     */
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
    DateHelperByDatePipe.prototype.transCompatFormat = /**
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
    function (format) {
        return format && format
            .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
            .replace(/D/g, 'd'); // d, dd represent of D, DD for momentjs, others are not support
    };
    /** @nocollapse */
    DateHelperByDatePipe.ctorParameters = function () { return [
        { type: NzI18nService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NZ_DATE_CONFIG,] }] },
        { type: DatePipe }
    ]; };
    /** @nocollapse */ DateHelperByDatePipe.ngInjectableDef = i0.defineInjectable({ factory: function DateHelperByDatePipe_Factory() { return DATE_HELPER_SERVICE_FACTORY(i0.inject(i1.NzI18nService), i0.inject(i1.NZ_DATE_CONFIG, 8), i0.inject(i2.DatePipe)); }, token: i1.DateHelperByDatePipe, providedIn: "root" });
    return DateHelperByDatePipe;
}(DateHelperService));
export { DateHelperByDatePipe };
function DateHelperByDatePipe_tsickle_Closure_declarations() {
    /** @type {?} */
    DateHelperByDatePipe.prototype.datePipe;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1oZWxwZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJpMThuL2RhdGUtaGVscGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sYUFBYSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sUUFBUSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxlQUFlLEVBQWdCLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7QUFFbEQsTUFBTSxzQ0FBc0MsSUFBbUIsRUFBRSxNQUFvQixFQUFFLFFBQWtCO0lBQ3ZHLE9BQU8sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0NBQ3hIOzs7Ozs7O0lBY0MsMkJBQXNCLElBQW1CLEVBQWdELE1BQW9CO1FBQXZGLFNBQUksR0FBSixJQUFJLENBQWU7UUFBZ0QsV0FBTSxHQUFOLE1BQU0sQ0FBYzs4QkFGbkYsSUFBSSxZQUFZLG9CQUFvQjtRQUc1RCxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDNUM7Ozs7O0lBTUQscUNBQVM7Ozs7SUFBVCxVQUFVLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNU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QUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztLQUN2Qjs7O2dCQTNHTSxhQUFhO2dEQXlFYyxRQUFRLFlBQUksTUFBTSxTQUFDLGNBQWM7Z0JBL0U1RCxRQUFROzs7K0JBQWpCO0VBOEUwQyxpQkFBaUI7U0FBOUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGZuc0Zvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xuaW1wb3J0IGZuc0dldElTT1dlZWsgZnJvbSAnZGF0ZS1mbnMvZ2V0X2lzb193ZWVrJztcbmltcG9ydCBmbnNQYXJzZSBmcm9tICdkYXRlLWZucy9wYXJzZSc7XG5pbXBvcnQgeyBtZXJnZURhdGVDb25maWcsIE56RGF0ZUNvbmZpZywgTlpfREFURV9DT05GSUcgfSBmcm9tICcuL2RhdGUtY29uZmlnJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICcuL256LWkxOG4uc2VydmljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBEQVRFX0hFTFBFUl9TRVJWSUNFX0ZBQ1RPUlkoaTE4bjogTnpJMThuU2VydmljZSwgY29uZmlnOiBOekRhdGVDb25maWcsIGRhdGVQaXBlOiBEYXRlUGlwZSk6IERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgcmV0dXJuIGkxOG4uZ2V0RGF0ZUxvY2FsZSgpID8gbmV3IERhdGVIZWxwZXJCeURhdGVGbnMoaTE4biwgY29uZmlnKSA6IG5ldyBEYXRlSGVscGVyQnlEYXRlUGlwZShpMThuLCBjb25maWcsIGRhdGVQaXBlKTtcbn1cblxuLyoqXG4gKiBBYnN0cmFjdCBEYXRlSGVscGVyU2VydmljZShUb2tlbiB2aWEgQ2xhc3MpXG4gKiBDb21wYXRpYmlsaXR5OiBjb21wYWN0IGZvciBvcmlnaW5hbCB1c2FnZSBieSBkZWZhdWx0IHdoaWNoIHVzaW5nIERhdGVQaXBlXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiBEQVRFX0hFTFBFUl9TRVJWSUNFX0ZBQ1RPUlksXG4gIGRlcHM6IFsgTnpJMThuU2VydmljZSwgWyBuZXcgT3B0aW9uYWwoKSwgTlpfREFURV9DT05GSUcgXSwgRGF0ZVBpcGUgXVxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRlSGVscGVyU2VydmljZSB7XG4gIHJlbHlPbkRhdGVQaXBlOiBib29sZWFuID0gdGhpcyBpbnN0YW5jZW9mIERhdGVIZWxwZXJCeURhdGVQaXBlOyAvLyBJbmRpY2F0ZSB3aGV0aGVyIHRoaXMgc2VydmljZSBpcyByZWx5IG9uIERhdGVQaXBlXG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGkxOG46IE56STE4blNlcnZpY2UsIEBPcHRpb25hbCgpIEBJbmplY3QoTlpfREFURV9DT05GSUcpIHByb3RlY3RlZCBjb25maWc6IE56RGF0ZUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gbWVyZ2VEYXRlQ29uZmlnKHRoaXMuY29uZmlnKTtcbiAgfVxuXG4gIGFic3RyYWN0IGdldElTT1dlZWsoZGF0ZTogRGF0ZSk6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0Rmlyc3REYXlPZldlZWsoKTogV2Vla0RheUluZGV4O1xuICBhYnN0cmFjdCBmb3JtYXQoZGF0ZTogRGF0ZSwgZm9ybWF0U3RyOiBzdHJpbmcpOiBzdHJpbmc7XG5cbiAgcGFyc2VEYXRlKHRleHQ6IHN0cmluZyk6IERhdGUge1xuICAgIGlmICghdGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXR1cm4gZm5zUGFyc2UodGV4dCk7XG4gIH1cblxuICBwYXJzZVRpbWUodGV4dDogc3RyaW5nKTogRGF0ZSB7XG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBmbnNQYXJzZShgMTk3MC0wMS0wMSAke3RleHR9YCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRlSGVscGVyIHRoYXQgaGFuZGxlcyBkYXRlIGZvcm1hdHMgd2l0aCBkYXRlLWZuc1xuICovXG5leHBvcnQgY2xhc3MgRGF0ZUhlbHBlckJ5RGF0ZUZucyBleHRlbmRzIERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgZ2V0SVNPV2VlayhkYXRlOiBEYXRlKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZm5zR2V0SVNPV2VlayhkYXRlKTtcbiAgfVxuXG4gIC8vIFRPRE86IFVzZSBkYXRlLWZucydzIFwid2Vla1N0YXJ0c09uXCIgdG8gc3VwcG9ydCBkaWZmZXJlbnQgbG9jYWxlIHdoZW4gXCJjb25maWcuZmlyc3REYXlPZldlZWtcIiBpcyBudWxsXG4gIC8vIHdoZW4gdjIuMCBpcyByZWFkeTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvdjIuMC4wLWFscGhhLjI3L3NyYy9sb2NhbGUvZW4tVVMvaW5kZXguanMjTDIzXG4gIGdldEZpcnN0RGF5T2ZXZWVrKCk6IDAgfCAxIHwgMiB8IDMgfCA0IHwgNSB8IDYge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5maXJzdERheU9mV2VlayA9PSBudWxsID8gMSA6IHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGRhdGVcbiAgICogQHNlZSBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL2Zvcm1hdCNkZXNjcmlwdGlvblxuICAgKiBAcGFyYW0gZGF0ZSBEYXRlXG4gICAqIEBwYXJhbSBmb3JtYXRTdHIgZm9ybWF0IHN0cmluZ1xuICAgKi9cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGZvcm1hdFN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm5zRm9ybWF0KGRhdGUsIGZvcm1hdFN0ciwgeyBsb2NhbGU6IHRoaXMuaTE4bi5nZXREYXRlTG9jYWxlKCkgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEYXRlSGVscGVyIHRoYXQgaGFuZGxlcyBkYXRlIGZvcm1hdHMgd2l0aCBhbmd1bGFyJ3MgZGF0ZS1waXBlXG4gKiBbQlVHXSBVc2UgRGF0ZVBpcGUgbWF5IGNhdXNlIG5vbi1zdGFuZGFyZCB3ZWVrIGJ1Zywgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vTkctWk9SUk8vbmctem9ycm8tYW50ZC9pc3N1ZXMvMjQwNlxuICpcbiAqIEBkZXByZWNhdGVkIE1heWJlIHJlbW92ZWQgaW4gbmV4dCBtYWpvciB2ZXJzaW9uIGR1ZSB0byB0aGlzIHNlcmlvdXMgYnVnXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRlSGVscGVyQnlEYXRlUGlwZSBleHRlbmRzIERhdGVIZWxwZXJTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoaTE4bjogTnpJMThuU2VydmljZSwgQE9wdGlvbmFsKCkgQEluamVjdChOWl9EQVRFX0NPTkZJRykgY29uZmlnOiBOekRhdGVDb25maWcsIHByaXZhdGUgZGF0ZVBpcGU6IERhdGVQaXBlKSB7XG4gICAgc3VwZXIoaTE4biwgY29uZmlnKTtcbiAgfVxuXG4gIGdldElTT1dlZWsoZGF0ZTogRGF0ZSk6IG51bWJlciB7XG4gICAgcmV0dXJuICt0aGlzLmZvcm1hdChkYXRlLCAndycpO1xuICB9XG5cbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogV2Vla0RheUluZGV4IHtcbiAgICBpZiAodGhpcy5jb25maWcuZmlyc3REYXlPZldlZWsgPT0gbnVsbCkge1xuICAgICAgY29uc3QgbG9jYWxlID0gdGhpcy5pMThuLmdldExvY2FsZUlkKCk7XG4gICAgICByZXR1cm4gbG9jYWxlICYmIFsgJ3poLWNuJywgJ3poLXR3JyBdLmluZGV4T2YobG9jYWxlLnRvTG93ZXJDYXNlKCkpID4gLTEgPyAxIDogMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrO1xuICB9XG5cbiAgZm9ybWF0KGRhdGU6IERhdGUsIGZvcm1hdFN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/IHRoaXMuZGF0ZVBpcGUudHJhbnNmb3JtKGRhdGUsIGZvcm1hdFN0ciwgbnVsbCwgdGhpcy5pMThuLmdldExvY2FsZUlkKCkpIDogJyc7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGF0aWJsZSB0cmFuc2xhdGUgdGhlIG1vbWVudC1saWtlIGZvcm1hdCBwYXR0ZXJuIHRvIGFuZ3VsYXIncyBwYXR0ZXJuXG4gICAqIFdoeT8gRm9yIG5vdywgd2UgbmVlZCB0byBzdXBwb3J0IHRoZSBleGlzdGluZyBsYW5ndWFnZSBmb3JtYXRzIGluIEFudEQsIGFuZCBBbnREIHVzZXMgdGhlIGRlZmF1bHQgdGVtcG9yYWwgc3ludGF4LlxuICAgKlxuICAgKiBUT0RPOiBjb21wYXJlIGFuZCBjb21wbGV0ZSBhbGwgZm9ybWF0IHBhdHRlcm5zXG4gICAqIEVhY2ggZm9ybWF0IGRvY3MgYXMgYmVsb3c6XG4gICAqIEBsaW5rIGh0dHBzOi8vbW9tZW50anMuY29tL2RvY3MvIy9kaXNwbGF5aW5nL2Zvcm1hdC9cbiAgICogQGxpbmsgaHR0cHM6Ly9hbmd1bGFyLmlvL2FwaS9jb21tb24vRGF0ZVBpcGUjZGVzY3JpcHRpb25cbiAgICogQHBhcmFtIGZvcm1hdCBpbnB1dCBmb3JtYXQgcGF0dGVyblxuICAgKi9cbiAgdHJhbnNDb21wYXRGb3JtYXQoZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXQgJiYgZm9ybWF0XG4gICAgICAucmVwbGFjZSgvWS9nLCAneScpIC8vIG9ubHkgc3VwcG9ydCB5LCB5eSwgeXl5LCB5eXl5XG4gICAgICAucmVwbGFjZSgvRC9nLCAnZCcpOyAvLyBkLCBkZCByZXByZXNlbnQgb2YgRCwgREQgZm9yIG1vbWVudGpzLCBvdGhlcnMgYXJlIG5vdCBzdXBwb3J0XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCB0eXBlIFdlZWtEYXlJbmRleCA9IDAgfCAxIHwgMiB8IDMgfCA0IHwgNSB8IDY7XG4iXX0=