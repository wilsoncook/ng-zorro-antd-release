import { EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateHelperService } from '../../../i18n/date-helper.service';
import { CandyDate } from '../candy-date';
export declare class MonthTableComponent implements OnInit, OnChanges {
    private dateHelper;
    value: CandyDate;
    valueChange: EventEmitter<CandyDate>;
    disabledDate: (date: Date) => boolean;
    prefixCls: string;
    panelMonths: PanelMonthData[][];
    constructor(dateHelper: DateHelperService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    trackPanelMonth(index: number, monthData: PanelMonthData): number;
    private render;
    private makePanelMonths;
    private chooseMonth;
}
export interface PanelMonthData {
    disabled: boolean;
    content: string;
    month: number;
    title: string;
    classMap: object;
    onClick(): void;
}
