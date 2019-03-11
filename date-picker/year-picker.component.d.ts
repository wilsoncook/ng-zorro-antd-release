import { ChangeDetectorRef } from '@angular/core';
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';
export declare class NzYearPickerComponent extends HeaderPickerComponent {
    nzFormat: string;
    endPanelMode: SupportHeaderPanel;
    constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, dateHelper: DateHelperService);
}
