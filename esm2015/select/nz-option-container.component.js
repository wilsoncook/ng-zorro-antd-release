/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzOptionComponent } from './nz-option.component';
import { merge, Subject } from 'rxjs';
import { NzOptionLiComponent } from './nz-option-li.component';
import { defaultFilterOption, NzOptionPipe } from './nz-option.pipe';
export class NzOptionContainerComponent {
    constructor() {
        this.isInit = false;
        this.isAddTagOptionDisplay = false;
        this.listOfAllTemplateOption = [];
        this.listOfTagOption = [];
        this.listOfFilterOption = [];
        // tslint:disable-next-line:no-any
        this.nzListOfSelectedValueChange = new EventEmitter();
        this.nzListOfTemplateOptionChange = new EventEmitter();
        this.nzClickOption = new EventEmitter();
        this.nzScrollToBottom = new EventEmitter();
        this.nzMode = 'default';
        this.nzServerSearch = false;
        this.nzFilterOption = defaultFilterOption;
        this.nzMaxMultipleCount = Infinity;
        // tslint:disable-next-line:no-any
        this.compareWith = (o1, o2) => o1 === o2;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSearchValue(value) {
        this._searchValue = value;
        this.updateAddTagOptionDisplay();
        this.updateListOfFilterOption();
    }
    /**
     * @return {?}
     */
    get nzSearchValue() {
        return this._searchValue;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzListOfSelectedValue(value) {
        if (this._listOfSelectedValue !== value) {
            this._listOfSelectedValue = value;
            /** should clear activedOption when listOfSelectedValue change **/
            this.clearActivatedOption();
            this.refreshAllOptionStatus(false);
        }
    }
    /**
     * @return {?}
     */
    get nzListOfSelectedValue() {
        return this._listOfSelectedValue;
    }
    /**
     * @return {?}
     */
    addTagOption() {
        if (this.nzListOfSelectedValue.length < this.nzMaxMultipleCount) {
            this.nzListOfSelectedValue = [...this.nzListOfSelectedValue, this.nzSearchValue];
            this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
        }
    }
    /**
     * @param {?} option
     * @param {?} isPressEnter
     * @return {?}
     */
    clickOption(option, isPressEnter) {
        this.updateSelectedOption(option, isPressEnter);
        this.nzClickOption.emit();
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDownUl(e) {
        if ([38, 40, 13].indexOf(e.keyCode) > -1) {
            e.preventDefault();
            /** @type {?} */
            const activeIndex = this.listOfFilterOption.findIndex(item => item === this.activatedOption);
            if (e.keyCode === 38) {
                /** @type {?} */
                const preIndex = activeIndex > 0 ? (activeIndex - 1) : (this.listOfFilterOption.length - 1);
                this.setActiveOption(this.listOfFilterOption[preIndex]);
            }
            else if (e.keyCode === 40) {
                /** @type {?} */
                const nextIndex = activeIndex < this.listOfFilterOption.length - 1 ? (activeIndex + 1) : 0;
                this.setActiveOption(this.listOfFilterOption[nextIndex]);
            }
            else if (e.keyCode === 13) {
                // enter
                if (this.isTagsMode) {
                    if (!this.isAddTagOptionDisplay) {
                        this.clickOption(this.activatedOption, true);
                    }
                    else {
                        this.addTagOption();
                        this.nzClickOption.emit();
                    }
                }
                else {
                    this.clickOption(this.activatedOption, true);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    resetActiveOption() {
        /** @type {?} */
        const firstActiveOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).find(item => this.compareWith(item.nzValue, this.nzListOfSelectedValue[0]));
        this.setActiveOption(firstActiveOption);
    }
    /**
     * @return {?}
     */
    clearActivatedOption() {
        this.setActiveOption(null);
    }
    /**
     * @param {?} option
     * @param {?=} scroll
     * @return {?}
     */
    setActiveOption(option, scroll = true) {
        this.activatedOption = option;
        if (scroll) {
            this.scrollIntoView();
        }
    }
    /**
     * @return {?}
     */
    scrollIntoView() {
        if (this.listOfNzOptionLiComponent && this.listOfNzOptionLiComponent.length) {
            /** @type {?} */
            const targetOption = this.listOfNzOptionLiComponent.find(o => o.nzOption === this.activatedOption);
            /* tslint:disable-next-line:no-string-literal */
            if (targetOption && targetOption.el && targetOption.el['scrollIntoViewIfNeeded']) {
                /* tslint:disable-next-line:no-string-literal */
                setTimeout(() => targetOption.el['scrollIntoViewIfNeeded'](false), 150);
            }
        }
    }
    /**
     * @param {?} option
     * @param {?} isPressEnter
     * @return {?}
     */
    updateSelectedOption(option, isPressEnter) {
        /** update listOfSelectedOption -> update nzListOfSelectedValue -> emit nzListOfSelectedValueChange **/
        if (option && !option.nzDisabled) {
            /** @type {?} */
            let changed = false;
            this.setActiveOption(option);
            /** @type {?} */
            let listOfSelectedValue = [...this.nzListOfSelectedValue];
            if (this.isMultipleOrTags) {
                /** @type {?} */
                const targetValue = listOfSelectedValue.find(o => this.compareWith(o, option.nzValue));
                if (isNotNil(targetValue)) {
                    if (!isPressEnter) {
                        /** should not toggle option when press enter **/
                        listOfSelectedValue.splice(listOfSelectedValue.indexOf(targetValue), 1);
                        changed = true;
                    }
                }
                else if (this.nzListOfSelectedValue.length < this.nzMaxMultipleCount) {
                    listOfSelectedValue.push(option.nzValue);
                    changed = true;
                }
            }
            else if (!this.compareWith(listOfSelectedValue[0], option.nzValue)) {
                listOfSelectedValue = [option.nzValue];
                changed = true;
            }
            /** update selectedValues when click option **/
            if (changed) {
                this._listOfSelectedValue = listOfSelectedValue;
                this.nzListOfSelectedValueChange.emit(this.nzListOfSelectedValue);
                if (this.isTagsMode) {
                    this.refreshAllOptionStatus(false);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    refreshListOfTagOption() {
        if (this.isTagsMode) {
            /** *
             * refresh tags option *
              @type {?} */
            const listOfTagsOption = [];
            this.nzListOfSelectedValue.forEach(value => {
                /** @type {?} */
                const existedOption = this.listOfAllTemplateOption.find(o => this.compareWith(o.nzValue, value));
                if (!existedOption) {
                    /** @type {?} */
                    const nzOptionComponent = new NzOptionComponent();
                    nzOptionComponent.nzValue = value;
                    nzOptionComponent.nzLabel = value;
                    listOfTagsOption.push(nzOptionComponent);
                }
            });
            this.listOfTagOption = listOfTagsOption;
        }
    }
    /**
     * @return {?}
     */
    refreshListOfAllTemplateOption() {
        this.listOfAllTemplateOption = this.listOfNzOptionComponent.toArray().concat(this.listOfNzOptionGroupComponent.toArray().reduce((pre, cur) => [...pre, ...cur.listOfNzOptionComponent.toArray()], []));
        Promise.resolve().then(() => this.nzListOfTemplateOptionChange.emit(this.listOfAllTemplateOption));
    }
    /**
     * @param {?} isTemplateOptionChange
     * @return {?}
     */
    refreshAllOptionStatus(isTemplateOptionChange) {
        /** update nzListOfSelectedValue | update option list -> update listOfAllTemplateOption -> update listOfSelectedOption -> update activatedOption **/
        if (this.isInit) {
            if (isTemplateOptionChange) {
                this.refreshListOfAllTemplateOption();
            }
            this.refreshListOfTagOption();
            this.updateListOfFilterOption();
            this.updateAddTagOptionDisplay();
        }
    }
    /**
     * @return {?}
     */
    updateListOfFilterOption() {
        this.listOfFilterOption = /** @type {?} */ (new NzOptionPipe().transform(this.listOfAllTemplateOption.concat(this.listOfTagOption), this.nzSearchValue, this.nzFilterOption, this.nzServerSearch));
        if (this.nzSearchValue) {
            this.setActiveOption(this.listOfFilterOption[0]);
        }
    }
    /**
     * watch options change in option group *
     * @return {?}
     */
    watchSubOptionChanges() {
        this.unsubscribeOption();
        /** @type {?} */
        let optionChanges$ = merge(new Subject().asObservable(), this.listOfNzOptionGroupComponent.changes, this.listOfNzOptionComponent.changes);
        if (this.listOfNzOptionGroupComponent.length) {
            this.listOfNzOptionGroupComponent.forEach(group => optionChanges$ = group.listOfNzOptionComponent ? merge(group.listOfNzOptionComponent.changes, optionChanges$) : optionChanges$);
        }
        this.optionSubscription = optionChanges$.subscribe(() => this.refreshAllOptionStatus(true));
    }
    /**
     * @return {?}
     */
    unsubscribeGroup() {
        if (this.groupSubscription) {
            this.groupSubscription.unsubscribe();
            this.groupSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    unsubscribeOption() {
        if (this.optionSubscription) {
            this.optionSubscription.unsubscribe();
            this.optionSubscription = null;
        }
    }
    /**
     * @return {?}
     */
    get isTagsMode() {
        return this.nzMode === 'tags';
    }
    /**
     * @return {?}
     */
    get isMultipleOrTags() {
        return this.nzMode === 'tags' || this.nzMode === 'multiple';
    }
    /**
     * @return {?}
     */
    get isNotFoundDisplay() {
        return (!this.isTagsMode) && (!this.listOfFilterOption.length);
    }
    /**
     * @return {?}
     */
    updateAddTagOptionDisplay() {
        /** @type {?} */
        const listOfAllOption = this.listOfAllTemplateOption.concat(this.listOfTagOption).map(item => item.nzLabel);
        /** @type {?} */
        const isMatch = listOfAllOption.indexOf(this.nzSearchValue) > -1;
        this.isAddTagOptionDisplay = this.isTagsMode && this.nzSearchValue && (!isMatch);
    }
    /**
     * @param {?} e
     * @param {?} ul
     * @return {?}
     */
    dropDownScroll(e, ul) {
        e.preventDefault();
        e.stopPropagation();
        if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
            this.nzScrollToBottom.emit();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.isInit = true;
        this.refreshAllOptionStatus(true);
        this.watchSubOptionChanges();
        this.groupSubscription = this.listOfNzOptionGroupComponent.changes.subscribe(() => this.watchSubOptionChanges());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.unsubscribeGroup();
        this.unsubscribeOption();
    }
}
NzOptionContainerComponent.decorators = [
    { type: Component, args: [{
                selector: '[nz-option-container]',
                preserveWhitespaces: false,
                template: "<ul\n  #dropdownUl\n  class=\"ant-select-dropdown-menu ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical\"\n  role=\"menu\"\n  (keydown)=\"onKeyDownUl($event)\"\n  (scroll)=\"dropDownScroll($event,dropdownUl)\"\n  tabindex=\"0\">\n  <li\n    *ngIf=\"isNotFoundDisplay\"\n    nz-select-unselectable\n    class=\"ant-select-dropdown-menu-item ant-select-dropdown-menu-item-disabled\">\n    {{ nzNotFoundContent ? nzNotFoundContent : ('Select.notFoundContent' | nzI18n) }}\n  </li>\n  <li\n    *ngIf=\"isAddTagOptionDisplay\"\n    nz-select-unselectable\n    (click)=\"addTagOption()\"\n    class=\"ant-select-dropdown-menu-item ant-select-dropdown-menu-item-active\">\n    {{ nzSearchValue }}\n  </li>\n  <li\n    nz-option-li\n    [compareWith]=\"compareWith\"\n    *ngFor=\"let option of listOfNzOptionComponent | nzFilterOptionPipe : nzSearchValue : nzFilterOption : nzServerSearch \"\n    (click)=\"clickOption(option,false)\"\n    [nzActiveOption]=\"activatedOption\"\n    [nzOption]=\"option\"\n    [nzListOfSelectedValue]=\"nzListOfSelectedValue\">\n  </li>\n  <li\n    *ngFor=\"let group of listOfNzOptionGroupComponent | nzSubFilterOptionPipe : nzSearchValue : nzFilterOption : nzServerSearch\"\n    class=\"ant-select-dropdown-menu-item-group\">\n    <div\n      class=\"ant-select-dropdown-menu-item-group-title\"\n      [attr.title]=\"group.isLabelString ? group.nzLabel : ''\">\n      <ng-container *ngIf=\"group.isLabelString; else labelTemplate\">{{ group.nzLabel }}</ng-container>\n      <ng-template #labelTemplate>\n        <ng-template [ngTemplateOutlet]=\"group.nzLabel\"></ng-template>\n      </ng-template>\n    </div>\n    <ul class=\"ant-select-dropdown-menu-item-group-list\">\n      <li\n        nz-option-li\n        [compareWith]=\"compareWith\"\n        *ngFor=\"let option of group.listOfNzOptionComponent | nzFilterOptionPipe : nzSearchValue : nzFilterOption : nzServerSearch\"\n        (click)=\"clickOption(option,false)\"\n        [nzActiveOption]=\"activatedOption\"\n        [nzShowActive]=\"!isAddTagOptionDisplay\"\n        [nzOption]=\"option\"\n        [nzListOfSelectedValue]=\"nzListOfSelectedValue\">\n      </li>\n    </ul>\n  </li>\n  <li\n    nz-option-li\n    [compareWith]=\"compareWith\"\n    *ngFor=\"let option of listOfTagOption | nzFilterOptionPipe : nzSearchValue : nzFilterOption : nzServerSearch \"\n    (click)=\"clickOption(option,false)\"\n    [nzActiveOption]=\"activatedOption\"\n    [nzShowActive]=\"!isAddTagOptionDisplay\"\n    [nzOption]=\"option\"\n    [nzListOfSelectedValue]=\"nzListOfSelectedValue\">\n  </li>\n</ul>"
            }] }
];
NzOptionContainerComponent.propDecorators = {
    listOfNzOptionLiComponent: [{ type: ViewChildren, args: [NzOptionLiComponent,] }],
    listOfNzOptionComponent: [{ type: Input }],
    listOfNzOptionGroupComponent: [{ type: Input }],
    nzListOfSelectedValueChange: [{ type: Output }],
    nzListOfTemplateOptionChange: [{ type: Output }],
    nzClickOption: [{ type: Output }],
    nzScrollToBottom: [{ type: Output }],
    nzMode: [{ type: Input }],
    nzServerSearch: [{ type: Input }],
    nzFilterOption: [{ type: Input }],
    nzMaxMultipleCount: [{ type: Input }],
    nzNotFoundContent: [{ type: Input }],
    compareWith: [{ type: Input }],
    nzSearchValue: [{ type: Input }],
    nzListOfSelectedValue: [{ type: Input }]
};
function NzOptionContainerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzOptionContainerComponent.prototype._listOfSelectedValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype._searchValue;
    /** @type {?} */
    NzOptionContainerComponent.prototype.isInit;
    /** @type {?} */
    NzOptionContainerComponent.prototype.isAddTagOptionDisplay;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfAllTemplateOption;
    /** @type {?} */
    NzOptionContainerComponent.prototype.optionSubscription;
    /** @type {?} */
    NzOptionContainerComponent.prototype.groupSubscription;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfTagOption;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfFilterOption;
    /** @type {?} */
    NzOptionContainerComponent.prototype.activatedOption;
    /**
     * can not use ViewChild since it will match sub options in option group *
     * @type {?}
     */
    NzOptionContainerComponent.prototype.listOfNzOptionLiComponent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfNzOptionComponent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.listOfNzOptionGroupComponent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzListOfSelectedValueChange;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzListOfTemplateOptionChange;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzClickOption;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzScrollToBottom;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzMode;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzServerSearch;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzFilterOption;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzMaxMultipleCount;
    /** @type {?} */
    NzOptionContainerComponent.prototype.nzNotFoundContent;
    /** @type {?} */
    NzOptionContainerComponent.prototype.compareWith;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotb3B0aW9uLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsic2VsZWN0L256LW9wdGlvbi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTFELE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFpQixNQUFNLGtCQUFrQixDQUFDO0FBT3BGLE1BQU07O3NCQUlLLEtBQUs7cUNBQ1UsS0FBSzt1Q0FDa0IsRUFBRTsrQkFHVixFQUFFO2tDQUNDLEVBQUU7OzJDQU9KLElBQUksWUFBWSxFQUFTOzRDQUN4QixJQUFJLFlBQVksRUFBdUI7NkJBQ3RELElBQUksWUFBWSxFQUFRO2dDQUNyQixJQUFJLFlBQVksRUFBUTtzQkFDbkMsU0FBUzs4QkFDRCxLQUFLOzhCQUNVLG1CQUFtQjtrQ0FDOUIsUUFBUTs7MkJBR2YsQ0FBQyxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTs7Ozs7O0lBRXRELElBQ0ksYUFBYSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7S0FD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SSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDMUI7OztZQTNRRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFhLHVCQUF1QjtnQkFDNUMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsaWpGQUEyRDthQUM1RDs7O3dDQWNFLFlBQVksU0FBQyxtQkFBbUI7c0NBQ2hDLEtBQUs7MkNBQ0wsS0FBSzswQ0FFTCxNQUFNOzJDQUNOLE1BQU07NEJBQ04sTUFBTTsrQkFDTixNQUFNO3FCQUNOLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2lDQUNMLEtBQUs7Z0NBQ0wsS0FBSzswQkFFTCxLQUFLOzRCQUVMLEtBQUs7b0NBV0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi9jb3JlL3V0aWwvY2hlY2snO1xuaW1wb3J0IHsgTnpPcHRpb25Hcm91cENvbXBvbmVudCB9IGZyb20gJy4vbnotb3B0aW9uLWdyb3VwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vbnotb3B0aW9uLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE56T3B0aW9uTGlDb21wb25lbnQgfSBmcm9tICcuL256LW9wdGlvbi1saS5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEZpbHRlck9wdGlvbiwgTnpPcHRpb25QaXBlLCBURmlsdGVyT3B0aW9uIH0gZnJvbSAnLi9uei1vcHRpb24ucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvciAgICAgICAgICAgOiAnW256LW9wdGlvbi1jb250YWluZXJdJyxcbiAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gIHRlbXBsYXRlVXJsICAgICAgICA6ICcuL256LW9wdGlvbi1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE56T3B0aW9uQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBwcml2YXRlIF9saXN0T2ZTZWxlY3RlZFZhbHVlOiBhbnlbXTtcbiAgcHJpdmF0ZSBfc2VhcmNoVmFsdWU6IHN0cmluZztcbiAgaXNJbml0ID0gZmFsc2U7XG4gIGlzQWRkVGFnT3B0aW9uRGlzcGxheSA9IGZhbHNlO1xuICBsaXN0T2ZBbGxUZW1wbGF0ZU9wdGlvbjogTnpPcHRpb25Db21wb25lbnRbXSA9IFtdO1xuICBvcHRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgZ3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgbGlzdE9mVGFnT3B0aW9uOiBOek9wdGlvbkNvbXBvbmVudFtdID0gW107XG4gIGxpc3RPZkZpbHRlck9wdGlvbjogTnpPcHRpb25Db21wb25lbnRbXSA9IFtdO1xuICBhY3RpdmF0ZWRPcHRpb246IE56T3B0aW9uQ29tcG9uZW50O1xuICAvKiogY2FuIG5vdCB1c2UgVmlld0NoaWxkIHNpbmNlIGl0IHdpbGwgbWF0Y2ggc3ViIG9wdGlvbnMgaW4gb3B0aW9uIGdyb3VwICoqL1xuICBAVmlld0NoaWxkcmVuKE56T3B0aW9uTGlDb21wb25lbnQpIGxpc3RPZk56T3B0aW9uTGlDb21wb25lbnQ6IFF1ZXJ5TGlzdDxOek9wdGlvbkxpQ29tcG9uZW50PjtcbiAgQElucHV0KCkgbGlzdE9mTnpPcHRpb25Db21wb25lbnQ6IFF1ZXJ5TGlzdDxOek9wdGlvbkNvbXBvbmVudD47XG4gIEBJbnB1dCgpIGxpc3RPZk56T3B0aW9uR3JvdXBDb21wb25lbnQ6IFF1ZXJ5TGlzdDxOek9wdGlvbkdyb3VwQ29tcG9uZW50PjtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBAT3V0cHV0KCkgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcbiAgQE91dHB1dCgpIG56TGlzdE9mVGVtcGxhdGVPcHRpb25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPE56T3B0aW9uQ29tcG9uZW50W10+KCk7XG4gIEBPdXRwdXQoKSBuekNsaWNrT3B0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgbnpTY3JvbGxUb0JvdHRvbSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQElucHV0KCkgbnpNb2RlID0gJ2RlZmF1bHQnO1xuICBASW5wdXQoKSBuelNlcnZlclNlYXJjaCA9IGZhbHNlO1xuICBASW5wdXQoKSBuekZpbHRlck9wdGlvbjogVEZpbHRlck9wdGlvbiA9IGRlZmF1bHRGaWx0ZXJPcHRpb247XG4gIEBJbnB1dCgpIG56TWF4TXVsdGlwbGVDb3VudCA9IEluZmluaXR5O1xuICBASW5wdXQoKSBuek5vdEZvdW5kQ29udGVudDogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIEBJbnB1dCgpIGNvbXBhcmVXaXRoID0gKG8xOiBhbnksIG8yOiBhbnkpID0+IG8xID09PSBvMjtcblxuICBASW5wdXQoKVxuICBzZXQgbnpTZWFyY2hWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fc2VhcmNoVmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLnVwZGF0ZUFkZFRhZ09wdGlvbkRpc3BsYXkoKTtcbiAgICB0aGlzLnVwZGF0ZUxpc3RPZkZpbHRlck9wdGlvbigpO1xuICB9XG5cbiAgZ2V0IG56U2VhcmNoVmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoVmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHNldCBuekxpc3RPZlNlbGVjdGVkVmFsdWUodmFsdWU6IGFueVtdKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RPZlNlbGVjdGVkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9saXN0T2ZTZWxlY3RlZFZhbHVlID0gdmFsdWU7XG4gICAgICAvKiogc2hvdWxkIGNsZWFyIGFjdGl2ZWRPcHRpb24gd2hlbiBsaXN0T2ZTZWxlY3RlZFZhbHVlIGNoYW5nZSAqKi9cbiAgICAgIHRoaXMuY2xlYXJBY3RpdmF0ZWRPcHRpb24oKTtcbiAgICAgIHRoaXMucmVmcmVzaEFsbE9wdGlvblN0YXR1cyhmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICBnZXQgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlKCk6IGFueVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdE9mU2VsZWN0ZWRWYWx1ZTtcbiAgfVxuXG4gIGFkZFRhZ09wdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uekxpc3RPZlNlbGVjdGVkVmFsdWUubGVuZ3RoIDwgdGhpcy5uek1heE11bHRpcGxlQ291bnQpIHtcbiAgICAgIHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlID0gWyAuLi50aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZSwgdGhpcy5uelNlYXJjaFZhbHVlIF07XG4gICAgICB0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZUNoYW5nZS5lbWl0KHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBjbGlja09wdGlvbihvcHRpb246IE56T3B0aW9uQ29tcG9uZW50LCBpc1ByZXNzRW50ZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkT3B0aW9uKG9wdGlvbiwgaXNQcmVzc0VudGVyKTtcbiAgICB0aGlzLm56Q2xpY2tPcHRpb24uZW1pdCgpO1xuICB9XG5cbiAgb25LZXlEb3duVWwoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChbIDM4LCA0MCwgMTMgXS5pbmRleE9mKGUua2V5Q29kZSkgPiAtMSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgYWN0aXZlSW5kZXggPSB0aGlzLmxpc3RPZkZpbHRlck9wdGlvbi5maW5kSW5kZXgoaXRlbSA9PiBpdGVtID09PSB0aGlzLmFjdGl2YXRlZE9wdGlvbik7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzOCkge1xuICAgICAgICAvLyBhcnJvdyB1cFxuICAgICAgICBjb25zdCBwcmVJbmRleCA9IGFjdGl2ZUluZGV4ID4gMCA/IChhY3RpdmVJbmRleCAtIDEpIDogKHRoaXMubGlzdE9mRmlsdGVyT3B0aW9uLmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbih0aGlzLmxpc3RPZkZpbHRlck9wdGlvblsgcHJlSW5kZXggXSk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gNDApIHtcbiAgICAgICAgLy8gYXJyb3cgZG93blxuICAgICAgICBjb25zdCBuZXh0SW5kZXggPSBhY3RpdmVJbmRleCA8IHRoaXMubGlzdE9mRmlsdGVyT3B0aW9uLmxlbmd0aCAtIDEgPyAoYWN0aXZlSW5kZXggKyAxKSA6IDA7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlT3B0aW9uKHRoaXMubGlzdE9mRmlsdGVyT3B0aW9uWyBuZXh0SW5kZXggXSk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgLy8gZW50ZXJcbiAgICAgICAgaWYgKHRoaXMuaXNUYWdzTW9kZSkge1xuICAgICAgICAgIGlmICghdGhpcy5pc0FkZFRhZ09wdGlvbkRpc3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpY2tPcHRpb24odGhpcy5hY3RpdmF0ZWRPcHRpb24sIHRydWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRhZ09wdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5uekNsaWNrT3B0aW9uLmVtaXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbGlja09wdGlvbih0aGlzLmFjdGl2YXRlZE9wdGlvbiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldEFjdGl2ZU9wdGlvbigpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdEFjdGl2ZU9wdGlvbiA9IHRoaXMubGlzdE9mQWxsVGVtcGxhdGVPcHRpb24uY29uY2F0KHRoaXMubGlzdE9mVGFnT3B0aW9uKS5maW5kKGl0ZW0gPT4gdGhpcy5jb21wYXJlV2l0aChpdGVtLm56VmFsdWUsIHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlWyAwIF0pKTtcbiAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihmaXJzdEFjdGl2ZU9wdGlvbik7XG4gIH1cblxuICBjbGVhckFjdGl2YXRlZE9wdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbihudWxsKTtcbiAgfVxuXG4gIHNldEFjdGl2ZU9wdGlvbihvcHRpb246IE56T3B0aW9uQ29tcG9uZW50LCBzY3JvbGw6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZWRPcHRpb24gPSBvcHRpb247XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgdGhpcy5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RPZk56T3B0aW9uTGlDb21wb25lbnQgJiYgdGhpcy5saXN0T2ZOek9wdGlvbkxpQ29tcG9uZW50Lmxlbmd0aCkge1xuICAgICAgY29uc3QgdGFyZ2V0T3B0aW9uID0gdGhpcy5saXN0T2ZOek9wdGlvbkxpQ29tcG9uZW50LmZpbmQobyA9PiBvLm56T3B0aW9uID09PSB0aGlzLmFjdGl2YXRlZE9wdGlvbik7XG4gICAgICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc3RyaW5nLWxpdGVyYWwgKi9cbiAgICAgIGlmICh0YXJnZXRPcHRpb24gJiYgdGFyZ2V0T3B0aW9uLmVsICYmIHRhcmdldE9wdGlvbi5lbFsgJ3Njcm9sbEludG9WaWV3SWZOZWVkZWQnIF0pIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsICovXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0T3B0aW9uLmVsWyAnc2Nyb2xsSW50b1ZpZXdJZk5lZWRlZCcgXShmYWxzZSksIDE1MCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2VsZWN0ZWRPcHRpb24ob3B0aW9uOiBOek9wdGlvbkNvbXBvbmVudCwgaXNQcmVzc0VudGVyOiBib29sZWFuKTogdm9pZCB7XG4gICAgLyoqIHVwZGF0ZSBsaXN0T2ZTZWxlY3RlZE9wdGlvbiAtPiB1cGRhdGUgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlIC0+IGVtaXQgbnpMaXN0T2ZTZWxlY3RlZFZhbHVlQ2hhbmdlICoqL1xuICAgIGlmIChvcHRpb24gJiYgIW9wdGlvbi5uekRpc2FibGVkKSB7XG4gICAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zZXRBY3RpdmVPcHRpb24ob3B0aW9uKTtcbiAgICAgIGxldCBsaXN0T2ZTZWxlY3RlZFZhbHVlID0gWyAuLi50aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZSBdO1xuICAgICAgaWYgKHRoaXMuaXNNdWx0aXBsZU9yVGFncykge1xuICAgICAgICBjb25zdCB0YXJnZXRWYWx1ZSA9IGxpc3RPZlNlbGVjdGVkVmFsdWUuZmluZChvID0+IHRoaXMuY29tcGFyZVdpdGgobywgb3B0aW9uLm56VmFsdWUpKTtcbiAgICAgICAgaWYgKGlzTm90TmlsKHRhcmdldFZhbHVlKSkge1xuICAgICAgICAgIGlmICghaXNQcmVzc0VudGVyKSB7XG4gICAgICAgICAgICAvKiogc2hvdWxkIG5vdCB0b2dnbGUgb3B0aW9uIHdoZW4gcHJlc3MgZW50ZXIgKiovXG4gICAgICAgICAgICBsaXN0T2ZTZWxlY3RlZFZhbHVlLnNwbGljZShsaXN0T2ZTZWxlY3RlZFZhbHVlLmluZGV4T2YodGFyZ2V0VmFsdWUpLCAxKTtcbiAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZS5sZW5ndGggPCB0aGlzLm56TWF4TXVsdGlwbGVDb3VudCkge1xuICAgICAgICAgIGxpc3RPZlNlbGVjdGVkVmFsdWUucHVzaChvcHRpb24ubnpWYWx1ZSk7XG4gICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuY29tcGFyZVdpdGgobGlzdE9mU2VsZWN0ZWRWYWx1ZVsgMCBdLCBvcHRpb24ubnpWYWx1ZSkpIHtcbiAgICAgICAgbGlzdE9mU2VsZWN0ZWRWYWx1ZSA9IFsgb3B0aW9uLm56VmFsdWUgXTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICAvKiogdXBkYXRlIHNlbGVjdGVkVmFsdWVzIHdoZW4gY2xpY2sgb3B0aW9uICoqL1xuICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgdGhpcy5fbGlzdE9mU2VsZWN0ZWRWYWx1ZSA9IGxpc3RPZlNlbGVjdGVkVmFsdWU7XG4gICAgICAgIHRoaXMubnpMaXN0T2ZTZWxlY3RlZFZhbHVlQ2hhbmdlLmVtaXQodGhpcy5uekxpc3RPZlNlbGVjdGVkVmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5pc1RhZ3NNb2RlKSB7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoQWxsT3B0aW9uU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZnJlc2hMaXN0T2ZUYWdPcHRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNUYWdzTW9kZSkge1xuICAgICAgLyoqIHJlZnJlc2ggdGFncyBvcHRpb24gKiovXG4gICAgICBjb25zdCBsaXN0T2ZUYWdzT3B0aW9uID0gW107XG4gICAgICB0aGlzLm56TGlzdE9mU2VsZWN0ZWRWYWx1ZS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgZXhpc3RlZE9wdGlvbiA9IHRoaXMubGlzdE9mQWxsVGVtcGxhdGVPcHRpb24uZmluZChvID0+IHRoaXMuY29tcGFyZVdpdGgoby5uelZhbHVlLCB2YWx1ZSkpO1xuICAgICAgICBpZiAoIWV4aXN0ZWRPcHRpb24pIHtcbiAgICAgICAgICBjb25zdCBuek9wdGlvbkNvbXBvbmVudCA9IG5ldyBOek9wdGlvbkNvbXBvbmVudCgpO1xuICAgICAgICAgIG56T3B0aW9uQ29tcG9uZW50Lm56VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICBuek9wdGlvbkNvbXBvbmVudC5uekxhYmVsID0gdmFsdWU7XG4gICAgICAgICAgbGlzdE9mVGFnc09wdGlvbi5wdXNoKG56T3B0aW9uQ29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLmxpc3RPZlRhZ09wdGlvbiA9IGxpc3RPZlRhZ3NPcHRpb247XG4gICAgfVxuXG4gIH1cblxuICByZWZyZXNoTGlzdE9mQWxsVGVtcGxhdGVPcHRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5saXN0T2ZBbGxUZW1wbGF0ZU9wdGlvbiA9IHRoaXMubGlzdE9mTnpPcHRpb25Db21wb25lbnQudG9BcnJheSgpLmNvbmNhdCh0aGlzLmxpc3RPZk56T3B0aW9uR3JvdXBDb21wb25lbnQudG9BcnJheSgpLnJlZHVjZSgocHJlLCBjdXIpID0+IFsgLi4ucHJlLCAuLi5jdXIubGlzdE9mTnpPcHRpb25Db21wb25lbnQudG9BcnJheSgpIF0sIFtdKSk7XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB0aGlzLm56TGlzdE9mVGVtcGxhdGVPcHRpb25DaGFuZ2UuZW1pdCh0aGlzLmxpc3RPZkFsbFRlbXBsYXRlT3B0aW9uKSk7XG4gIH1cblxuICByZWZyZXNoQWxsT3B0aW9uU3RhdHVzKGlzVGVtcGxhdGVPcHRpb25DaGFuZ2U6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAvKiogdXBkYXRlIG56TGlzdE9mU2VsZWN0ZWRWYWx1ZSB8IHVwZGF0ZSBvcHRpb24gbGlzdCAtPiB1cGRhdGUgbGlzdE9mQWxsVGVtcGxhdGVPcHRpb24gLT4gdXBkYXRlIGxpc3RPZlNlbGVjdGVkT3B0aW9uIC0+IHVwZGF0ZSBhY3RpdmF0ZWRPcHRpb24gKiovXG4gICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICBpZiAoaXNUZW1wbGF0ZU9wdGlvbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnJlZnJlc2hMaXN0T2ZBbGxUZW1wbGF0ZU9wdGlvbigpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWZyZXNoTGlzdE9mVGFnT3B0aW9uKCk7XG4gICAgICB0aGlzLnVwZGF0ZUxpc3RPZkZpbHRlck9wdGlvbigpO1xuICAgICAgdGhpcy51cGRhdGVBZGRUYWdPcHRpb25EaXNwbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlTGlzdE9mRmlsdGVyT3B0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMubGlzdE9mRmlsdGVyT3B0aW9uID0gbmV3IE56T3B0aW9uUGlwZSgpLnRyYW5zZm9ybSh0aGlzLmxpc3RPZkFsbFRlbXBsYXRlT3B0aW9uLmNvbmNhdCh0aGlzLmxpc3RPZlRhZ09wdGlvbiksIHRoaXMubnpTZWFyY2hWYWx1ZSwgdGhpcy5uekZpbHRlck9wdGlvbiwgdGhpcy5uelNlcnZlclNlYXJjaCkgYXMgTnpPcHRpb25Db21wb25lbnRbXTtcbiAgICBpZiAodGhpcy5uelNlYXJjaFZhbHVlKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZU9wdGlvbih0aGlzLmxpc3RPZkZpbHRlck9wdGlvblsgMCBdKTtcbiAgICB9XG4gIH1cblxuICAvKiogd2F0Y2ggb3B0aW9ucyBjaGFuZ2UgaW4gb3B0aW9uIGdyb3VwICoqL1xuICB3YXRjaFN1Yk9wdGlvbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy51bnN1YnNjcmliZU9wdGlvbigpO1xuICAgIGxldCBvcHRpb25DaGFuZ2VzJCA9IG1lcmdlKFxuICAgICAgbmV3IFN1YmplY3QoKS5hc09ic2VydmFibGUoKSxcbiAgICAgIHRoaXMubGlzdE9mTnpPcHRpb25Hcm91cENvbXBvbmVudC5jaGFuZ2VzLFxuICAgICAgdGhpcy5saXN0T2ZOek9wdGlvbkNvbXBvbmVudC5jaGFuZ2VzXG4gICAgKTtcbiAgICBpZiAodGhpcy5saXN0T2ZOek9wdGlvbkdyb3VwQ29tcG9uZW50Lmxlbmd0aCkge1xuICAgICAgdGhpcy5saXN0T2ZOek9wdGlvbkdyb3VwQ29tcG9uZW50LmZvckVhY2goZ3JvdXAgPT4gb3B0aW9uQ2hhbmdlcyQgPSBncm91cC5saXN0T2ZOek9wdGlvbkNvbXBvbmVudCA/IG1lcmdlKGdyb3VwLmxpc3RPZk56T3B0aW9uQ29tcG9uZW50LmNoYW5nZXMsIG9wdGlvbkNoYW5nZXMkKSA6IG9wdGlvbkNoYW5nZXMkKTtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25TdWJzY3JpcHRpb24gPSBvcHRpb25DaGFuZ2VzJC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZWZyZXNoQWxsT3B0aW9uU3RhdHVzKHRydWUpKTtcbiAgfVxuXG4gIHVuc3Vic2NyaWJlR3JvdXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JvdXBTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZ3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMuZ3JvdXBTdWJzY3JpcHRpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHVuc3Vic2NyaWJlT3B0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vcHRpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIHRoaXMub3B0aW9uU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBnZXQgaXNUYWdzTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5uek1vZGUgPT09ICd0YWdzJztcbiAgfVxuXG4gIGdldCBpc011bHRpcGxlT3JUYWdzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm56TW9kZSA9PT0gJ3RhZ3MnIHx8IHRoaXMubnpNb2RlID09PSAnbXVsdGlwbGUnO1xuICB9XG5cbiAgZ2V0IGlzTm90Rm91bmREaXNwbGF5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoIXRoaXMuaXNUYWdzTW9kZSkgJiYgKCF0aGlzLmxpc3RPZkZpbHRlck9wdGlvbi5sZW5ndGgpO1xuICB9XG5cbiAgdXBkYXRlQWRkVGFnT3B0aW9uRGlzcGxheSgpOiB2b2lkIHtcbiAgICBjb25zdCBsaXN0T2ZBbGxPcHRpb24gPSB0aGlzLmxpc3RPZkFsbFRlbXBsYXRlT3B0aW9uLmNvbmNhdCh0aGlzLmxpc3RPZlRhZ09wdGlvbikubWFwKGl0ZW0gPT4gaXRlbS5uekxhYmVsKTtcbiAgICBjb25zdCBpc01hdGNoID0gbGlzdE9mQWxsT3B0aW9uLmluZGV4T2YodGhpcy5uelNlYXJjaFZhbHVlKSA+IC0xO1xuICAgIHRoaXMuaXNBZGRUYWdPcHRpb25EaXNwbGF5ID0gdGhpcy5pc1RhZ3NNb2RlICYmIHRoaXMubnpTZWFyY2hWYWx1ZSAmJiAoIWlzTWF0Y2gpO1xuICB9XG5cbiAgZHJvcERvd25TY3JvbGwoZTogTW91c2VFdmVudCwgdWw6IEhUTUxVTGlzdEVsZW1lbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodWwgJiYgKHVsLnNjcm9sbEhlaWdodCAtIHVsLnNjcm9sbFRvcCA9PT0gdWwuY2xpZW50SGVpZ2h0KSkge1xuICAgICAgdGhpcy5uelNjcm9sbFRvQm90dG9tLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc0luaXQgPSB0cnVlO1xuICAgIHRoaXMucmVmcmVzaEFsbE9wdGlvblN0YXR1cyh0cnVlKTtcbiAgICB0aGlzLndhdGNoU3ViT3B0aW9uQ2hhbmdlcygpO1xuICAgIHRoaXMuZ3JvdXBTdWJzY3JpcHRpb24gPSB0aGlzLmxpc3RPZk56T3B0aW9uR3JvdXBDb21wb25lbnQuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy53YXRjaFN1Yk9wdGlvbkNoYW5nZXMoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlR3JvdXAoKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlT3B0aW9uKCk7XG4gIH1cbn1cbiJdfQ==