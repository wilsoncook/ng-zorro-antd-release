import { ChangeDetectorRef } from '@angular/core';
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { DateRangePickerComponent } from './date-range-picker.component';
export declare class NzRangePickerComponent extends DateRangePickerComponent {
    isRange: boolean;
    constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, dateHelper: DateHelperService);
}
