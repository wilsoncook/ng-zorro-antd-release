/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { valueFunctionProp } from '../core/util/convert';
import { DateHelperService } from '../i18n/date-helper.service';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { AbstractPickerComponent } from './abstract-picker.component';
import { CandyDate } from './lib/candy-date';
/**
 * The base picker for header panels, current support: Year/Month
 */
export class HeaderPickerComponent extends AbstractPickerComponent {
    /**
     * @param {?} i18n
     * @param {?} cdr
     * @param {?} dateHelper
     */
    constructor(i18n, cdr, dateHelper) {
        super(i18n, cdr, dateHelper);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.panelMode = this.endPanelMode;
        /** @type {?} */
        const allHeaderPanels = ['decade', 'year', 'month'];
        this.supportPanels = allHeaderPanels.slice(0, allHeaderPanels.indexOf(this.endPanelMode) + 1);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (changes["nzRenderExtraFooter"]) {
            this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
        }
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    onPanelModeChange(mode) {
        if (this.supportPanels.indexOf(mode) > -1) {
            this.panelMode = mode;
        }
        else { // Since the default "click year" logic can be "year panel" -> "date panel", we need force to the end panel otherwise
            // Since the default "click year" logic can be "year panel" -> "date panel", we need force to the end panel otherwise
            this.panelMode = this.endPanelMode;
        }
    }
    /**
     * @param {?} mode
     * @param {?} value
     * @return {?}
     */
    onChooseValue(mode, value) {
        if (this.endPanelMode === mode) {
            super.onValueChange(value);
            this.closeOverlay();
        }
    }
    /**
     * @param {?} open
     * @return {?}
     */
    onOpenChange(open) {
        if (!open) {
            this.cleanUp();
        }
        this.nzOnOpenChange.emit(open);
    }
    /**
     * @return {?}
     */
    cleanUp() {
        this.panelMode = this.endPanelMode;
    }
}
HeaderPickerComponent.decorators = [
    { type: Component, args: [{
                template: ``
            }] }
];
/** @nocollapse */
HeaderPickerComponent.ctorParameters = () => [
    { type: NzI18nService },
    { type: ChangeDetectorRef },
    { type: DateHelperService }
];
HeaderPickerComponent.propDecorators = {
    nzPlaceHolder: [{ type: Input }],
    nzRenderExtraFooter: [{ type: Input }],
    nzDefaultValue: [{ type: Input }],
    nzFormat: [{ type: Input }]
};
function HeaderPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    HeaderPickerComponent.prototype.nzPlaceHolder;
    /** @type {?} */
    HeaderPickerComponent.prototype.nzRenderExtraFooter;
    /** @type {?} */
    HeaderPickerComponent.prototype.nzDefaultValue;
    /** @type {?} */
    HeaderPickerComponent.prototype.nzFormat;
    /** @type {?} */
    HeaderPickerComponent.prototype.endPanelMode;
    /** @type {?} */
    HeaderPickerComponent.prototype.panelMode;
    /** @type {?} */
    HeaderPickerComponent.prototype.extraFooter;
    /** @type {?} */
    HeaderPickerComponent.prototype.supportPanels;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiZGF0ZS1waWNrZXIvaGVhZGVyLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFpRCxNQUFNLGVBQWUsQ0FBQztBQUduSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBVTdDLE1BQU0sNEJBQTZCLFNBQVEsdUJBQXVCOzs7Ozs7SUFhaEUsWUFBWSxJQUFtQixFQUFFLEdBQXNCLEVBQUUsVUFBNkI7UUFDcEYsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDOUI7Ozs7SUFFRCxRQUFRO1FBQ04sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7UUFFbkMsTUFBTSxlQUFlLEdBQWdCLENBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQy9GOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNCLElBQUksT0FBTyx5QkFBc0I7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNoRTtLQUNGOzs7OztJQUVELGlCQUFpQixDQUFDLElBQWU7UUFDL0IsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjthQUFNLEVBQUUscUhBQXFIOztZQUM1SCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDcEM7S0FDRjs7Ozs7O0lBRUQsYUFBYSxDQUFDLElBQXdCLEVBQUUsS0FBZ0I7UUFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQjtLQUNGOzs7OztJQUVELFlBQVksQ0FBQyxJQUFhO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNoQzs7OztJQUdPLE9BQU87UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7WUE5RHRDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsRUFBRTthQUNiOzs7O1lBWFEsYUFBYTtZQUxiLGlCQUFpQjtZQUlqQixpQkFBaUI7Ozs0QkFjdkIsS0FBSztrQ0FFTCxLQUFLOzZCQUNMLEtBQUs7dUJBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnVuY3Rpb25Qcm9wIH0gZnJvbSAnLi4vY29yZS90eXBlcy9jb21tb24td3JhcCc7XG5pbXBvcnQgeyB2YWx1ZUZ1bmN0aW9uUHJvcCB9IGZyb20gJy4uL2NvcmUvdXRpbC9jb252ZXJ0JztcbmltcG9ydCB7IERhdGVIZWxwZXJTZXJ2aWNlIH0gZnJvbSAnLi4vaTE4bi9kYXRlLWhlbHBlci5zZXJ2aWNlJztcbmltcG9ydCB7IE56STE4blNlcnZpY2UgfSBmcm9tICcuLi9pMThuL256LWkxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBBYnN0cmFjdFBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vYWJzdHJhY3QtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYW5keURhdGUgfSBmcm9tICcuL2xpYi9jYW5keS1kYXRlJztcbmltcG9ydCB7IFBhbmVsTW9kZSB9IGZyb20gJy4vc3RhbmRhcmQtdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIHBpY2tlciBmb3IgaGVhZGVyIHBhbmVscywgY3VycmVudCBzdXBwb3J0OiBZZWFyL01vbnRoXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgYFxufSlcbmV4cG9ydCBjbGFzcyBIZWFkZXJQaWNrZXJDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbnpQbGFjZUhvbGRlcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG56UmVuZGVyRXh0cmFGb290ZXI6IEZ1bmN0aW9uUHJvcDxUZW1wbGF0ZVJlZjx2b2lkPiB8IHN0cmluZz47XG4gIEBJbnB1dCgpIG56RGVmYXVsdFZhbHVlOiBDYW5keURhdGU7XG4gIEBJbnB1dCgpIG56Rm9ybWF0OiBzdHJpbmc7IC8vIFtDYW5tcGxlbWVudGVkIGJ5IHN1YiBjbGFzc10gVGhlIG91dHB1dCBmb3JtYXRcblxuICBlbmRQYW5lbE1vZGU6IFN1cHBvcnRIZWFkZXJQYW5lbDsgLy8gW0ltcGxlbWVudGVkIGJ5IHN1YiBjbGFzc10gVGhlIGZpbmFsIHBhbmVsIGZvciBwaWNraW5nIGEgZGF0ZVxuICBwYW5lbE1vZGU6IFBhbmVsTW9kZTsgLy8gQ3VycmVudCBwYW5lbCBtb2RlXG4gIGV4dHJhRm9vdGVyOiBUZW1wbGF0ZVJlZjx2b2lkPiB8IHN0cmluZztcblxuICBwcml2YXRlIHN1cHBvcnRQYW5lbHM6IFBhbmVsTW9kZVtdO1xuXG4gIGNvbnN0cnVjdG9yKGkxOG46IE56STE4blNlcnZpY2UsIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGRhdGVIZWxwZXI6IERhdGVIZWxwZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoaTE4biwgY2RyLCBkYXRlSGVscGVyKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLnBhbmVsTW9kZSA9IHRoaXMuZW5kUGFuZWxNb2RlO1xuXG4gICAgY29uc3QgYWxsSGVhZGVyUGFuZWxzOiBQYW5lbE1vZGVbXSA9IFsgJ2RlY2FkZScsICd5ZWFyJywgJ21vbnRoJyBdO1xuICAgIHRoaXMuc3VwcG9ydFBhbmVscyA9IGFsbEhlYWRlclBhbmVscy5zbGljZSgwLCBhbGxIZWFkZXJQYW5lbHMuaW5kZXhPZih0aGlzLmVuZFBhbmVsTW9kZSkgKyAxKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uQ2hhbmdlcyhjaGFuZ2VzKTtcblxuICAgIGlmIChjaGFuZ2VzLm56UmVuZGVyRXh0cmFGb290ZXIpIHtcbiAgICAgIHRoaXMuZXh0cmFGb290ZXIgPSB2YWx1ZUZ1bmN0aW9uUHJvcCh0aGlzLm56UmVuZGVyRXh0cmFGb290ZXIpO1xuICAgIH1cbiAgfVxuXG4gIG9uUGFuZWxNb2RlQ2hhbmdlKG1vZGU6IFBhbmVsTW9kZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1cHBvcnRQYW5lbHMuaW5kZXhPZihtb2RlKSA+IC0xKSB7XG4gICAgICB0aGlzLnBhbmVsTW9kZSA9IG1vZGU7XG4gICAgfSBlbHNlIHsgLy8gU2luY2UgdGhlIGRlZmF1bHQgXCJjbGljayB5ZWFyXCIgbG9naWMgY2FuIGJlIFwieWVhciBwYW5lbFwiIC0+IFwiZGF0ZSBwYW5lbFwiLCB3ZSBuZWVkIGZvcmNlIHRvIHRoZSBlbmQgcGFuZWwgb3RoZXJ3aXNlXG4gICAgICB0aGlzLnBhbmVsTW9kZSA9IHRoaXMuZW5kUGFuZWxNb2RlO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hvb3NlVmFsdWUobW9kZTogU3VwcG9ydEhlYWRlclBhbmVsLCB2YWx1ZTogQ2FuZHlEYXRlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW5kUGFuZWxNb2RlID09PSBtb2RlKSB7XG4gICAgICBzdXBlci5vblZhbHVlQ2hhbmdlKHZhbHVlKTtcblxuICAgICAgdGhpcy5jbG9zZU92ZXJsYXkoKTtcbiAgICB9XG4gIH1cblxuICBvbk9wZW5DaGFuZ2Uob3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghb3Blbikge1xuICAgICAgdGhpcy5jbGVhblVwKCk7XG4gICAgfVxuICAgIHRoaXMubnpPbk9wZW5DaGFuZ2UuZW1pdChvcGVuKTtcbiAgfVxuXG4gIC8vIFJlc3RvcmUgc29tZSBpbml0aWFsIHByb3BzIHRvIGxldCBvcGVuIGFzIG5ldyBpbiBuZXh0IHRpbWVcbiAgcHJpdmF0ZSBjbGVhblVwKCk6IHZvaWQge1xuICAgIHRoaXMucGFuZWxNb2RlID0gdGhpcy5lbmRQYW5lbE1vZGU7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3VwcG9ydEhlYWRlclBhbmVsID0gJ3llYXInIHwgJ21vbnRoJztcbiJdfQ==