import { DatePipe } from '@angular/common';
import { NzDateConfig } from './date-config';
import { NzI18nService } from './nz-i18n.service';
export declare function DATE_HELPER_SERVICE_FACTORY(i18n: NzI18nService, config: NzDateConfig, datePipe: DatePipe): DateHelperService;
/**
 * Abstract DateHelperService(Token via Class)
 * Compatibility: compact for original usage by default which using DatePipe
 */
export declare abstract class DateHelperService {
    protected i18n: NzI18nService;
    protected config: NzDateConfig;
    relyOnDatePipe: boolean;
    constructor(i18n: NzI18nService, config: NzDateConfig);
    abstract getISOWeek(date: Date): number;
    abstract getFirstDayOfWeek(): WeekDayIndex;
    abstract format(date: Date, formatStr: string): string;
    parseDate(text: string): Date;
    parseTime(text: string): Date;
}
/**
 * DateHelper that handles date formats with date-fns
 */
export declare class DateHelperByDateFns extends DateHelperService {
    getISOWeek(date: Date): number;
    getFirstDayOfWeek(): 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Format a date
     * @see https://date-fns.org/docs/format#description
     * @param date Date
     * @param formatStr format string
     */
    format(date: Date, formatStr: string): string;
}
/**
 * DateHelper that handles date formats with angular's date-pipe
 * [BUG] Use DatePipe may cause non-standard week bug, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406
 *
 * @deprecated Maybe removed in next major version due to this serious bug
 */
export declare class DateHelperByDatePipe extends DateHelperService {
    private datePipe;
    constructor(i18n: NzI18nService, config: NzDateConfig, datePipe: DatePipe);
    getISOWeek(date: Date): number;
    getFirstDayOfWeek(): WeekDayIndex;
    format(date: Date, formatStr: string): string;
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
    transCompatFormat(format: string): string;
}
export declare type WeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
