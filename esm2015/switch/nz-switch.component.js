/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { forwardRef, Component, ElementRef, HostListener, Input, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../core/util/convert';
export class NzSwitchComponent {
    constructor() {
        this._disabled = false;
        this._loading = false;
        this._control = false;
        this.prefixCls = 'ant-switch';
        this.checked = false;
        this.onChange = () => null;
        this.onTouched = () => null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzControl(value) {
        this._control = toBoolean(value);
    }
    /**
     * @return {?}
     */
    get nzControl() {
        return this._control;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzCheckedChildren(value) {
        this.isCheckedChildrenString = !(value instanceof TemplateRef);
        this._checkedChildren = value;
    }
    /**
     * @return {?}
     */
    get nzCheckedChildren() {
        return this._checkedChildren;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzUnCheckedChildren(value) {
        this.isUnCheckedChildrenString = !(value instanceof TemplateRef);
        this._unCheckedChildren = value;
    }
    /**
     * @return {?}
     */
    get nzUnCheckedChildren() {
        return this._unCheckedChildren;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzSize(value) {
        this._size = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzSize() {
        return this._size;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzLoading(value) {
        this._loading = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzLoading() {
        return this._loading;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nzDisabled(value) {
        this._disabled = toBoolean(value);
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get nzDisabled() {
        return this._disabled;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onClick(e) {
        e.preventDefault();
        if ((!this.nzDisabled) && (!this.nzLoading) && (!this.nzControl)) {
            this.updateValue(!this.checked, true);
        }
    }
    /**
     * @param {?} value
     * @param {?} emit
     * @return {?}
     */
    updateValue(value, emit) {
        if (this.checked === value) {
            return;
        }
        this.checked = value;
        this.setClassMap();
        if (emit) {
            this.onChange(this.checked);
        }
    }
    /**
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            [this.prefixCls]: true,
            [`${this.prefixCls}-checked`]: this.checked,
            [`${this.prefixCls}-loading`]: this.nzLoading,
            [`${this.prefixCls}-disabled`]: this.nzDisabled,
            [`${this.prefixCls}-small`]: this.nzSize === 'small'
        };
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        if (!this.nzControl) {
            if (e.keyCode === 37) { // Left
                // Left
                this.updateValue(false, true);
                e.preventDefault();
            }
            else if (e.keyCode === 39) { // Right
                // Right
                this.updateValue(true, true);
                e.preventDefault();
            }
            else if (e.keyCode === 32 || e.keyCode === 13) { // Space, Enter
                // Space, Enter
                this.updateValue(!this.checked, true);
                e.preventDefault();
            }
        }
    }
    /**
     * @return {?}
     */
    focus() {
        this.switchElement.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    blur() {
        this.switchElement.nativeElement.blur();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.updateValue(value, false);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.nzDisabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.setClassMap();
    }
}
NzSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-switch',
                preserveWhitespaces: false,
                template: "<span nz-wave [nzWaveExtraNode]=\"true\" [ngClass]=\"classMap\" [tabindex]=\"nzDisabled?-1:0\" #switchElement (keydown)=\"onKeyDown($event)\">\n  <span class=\"ant-switch-inner\">\n    <span *ngIf=\"checked\">\n      <ng-container *ngIf=\"isCheckedChildrenString; else checkedChildrenTemplate\">{{ nzCheckedChildren }}</ng-container>\n      <ng-template #checkedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n    <span *ngIf=\"!checked\">\n      <ng-container *ngIf=\"isUnCheckedChildrenString; else unCheckedChildrenTemplate\">{{ nzUnCheckedChildren }}</ng-container>\n      <ng-template #unCheckedChildrenTemplate>\n        <ng-template [ngTemplateOutlet]=\"nzUnCheckedChildren\"></ng-template>\n      </ng-template>\n    </span>\n  </span>\n</span>",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => NzSwitchComponent),
                        multi: true
                    }
                ],
                styles: [`
    :host {
      display: inline-block;
    }
  `]
            }] }
];
NzSwitchComponent.propDecorators = {
    switchElement: [{ type: ViewChild, args: ['switchElement',] }],
    nzControl: [{ type: Input }],
    nzCheckedChildren: [{ type: Input }],
    nzUnCheckedChildren: [{ type: Input }],
    nzSize: [{ type: Input }],
    nzLoading: [{ type: Input }],
    nzDisabled: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};
function NzSwitchComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NzSwitchComponent.prototype._disabled;
    /** @type {?} */
    NzSwitchComponent.prototype._size;
    /** @type {?} */
    NzSwitchComponent.prototype._loading;
    /** @type {?} */
    NzSwitchComponent.prototype._control;
    /** @type {?} */
    NzSwitchComponent.prototype._checkedChildren;
    /** @type {?} */
    NzSwitchComponent.prototype._unCheckedChildren;
    /** @type {?} */
    NzSwitchComponent.prototype.prefixCls;
    /** @type {?} */
    NzSwitchComponent.prototype.classMap;
    /** @type {?} */
    NzSwitchComponent.prototype.checked;
    /** @type {?} */
    NzSwitchComponent.prototype.isCheckedChildrenString;
    /** @type {?} */
    NzSwitchComponent.prototype.isUnCheckedChildrenString;
    /** @type {?} */
    NzSwitchComponent.prototype.switchElement;
    /** @type {?} */
    NzSwitchComponent.prototype.onChange;
    /** @type {?} */
    NzSwitchComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvIiwic291cmNlcyI6WyJzd2l0Y2gvbnotc3dpdGNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsV0FBVyxFQUNYLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBcUJqRCxNQUFNOzt5QkFDZ0IsS0FBSzt3QkFFTixLQUFLO3dCQUNMLEtBQUs7eUJBR1osWUFBWTt1QkFFZCxLQUFLO3dCQUtzQixHQUFHLEVBQUUsQ0FBQyxJQUFJO3lCQUN2QixHQUFHLEVBQUUsQ0FBQyxJQUFJOzs7Ozs7SUFFbEMsSUFDSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQzs7OztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7Ozs7SUFFRCxJQUNJLGlCQUFpQixDQUFDLEtBQWlDO1FBQ3JELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7S0FDL0I7Ozs7SUFFRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxJQUNJLG1CQUFtQixDQUFDLEtBQWlDO1FBQ3ZELElBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsS0FBSyxZQUFZLFdBQVcsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7S0FDakM7Ozs7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztLQUNoQzs7Ozs7SUFFRCxJQUNJLE1BQU0sQ0FBQyxLQUF1QjtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7Ozs7O0lBRUQsSUFDSSxTQUFTLENBQUMsS0FBYztRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFDSSxVQUFVLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7Ozs7O0lBR0QsT0FBTyxDQUFDLENBQWE7UUFDbkIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkM7S0FDRjs7Ozs7O0lBRUQsV0FBVyxDQUFDLEtBQWMsRUFBRSxJQUFhO1FBQ3ZDLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDMUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7S0FDRjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2QsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLEVBQWdCLElBQUk7WUFDdEMsQ0FBRSxHQUFHLElBQUksQ0FBQyxTQUFTLFVBQVUsQ0FBRSxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQzlDLENBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxVQUFVLENBQUUsRUFBRyxJQUFJLENBQUMsU0FBUztZQUNoRCxDQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsV0FBVyxDQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDakQsQ0FBRSxHQUFHLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBRSxFQUFLLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTztTQUMxRCxDQUFDO0tBQ0g7Ozs7O0lBRUQsU0FBUyxDQUFDLENBQWdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUUsRUFBRSxPQUFPOztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUNwQjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFLEVBQUUsUUFBUTs7Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDcEI7aUJBQU0sSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRSxFQUFFLGVBQWU7O2dCQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3BCO1NBQ0Y7S0FDRjs7OztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUMxQzs7OztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6Qzs7Ozs7SUFFRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNoQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUF3QjtRQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztLQUNwQjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFjO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3JCOzs7OztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0tBQzlCOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQjs7O1lBbktGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQWEsV0FBVztnQkFDaEMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZzFCQUFpRDtnQkFNakQsU0FBUyxFQUFZO29CQUNuQjt3QkFDRSxPQUFPLEVBQU0saUJBQWlCO3dCQUM5QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3dCQUNoRCxLQUFLLEVBQVEsSUFBSTtxQkFDbEI7aUJBQ0Y7eUJBWHNCOzs7O0dBSXRCO2FBUUY7Ozs0QkFhRSxTQUFTLFNBQUMsZUFBZTt3QkFLekIsS0FBSztnQ0FTTCxLQUFLO2tDQVVMLEtBQUs7cUJBVUwsS0FBSzt3QkFVTCxLQUFLO3lCQVVMLEtBQUs7c0JBVUwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFFLFFBQVEsQ0FBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGZvcndhcmRSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyB0b0Jvb2xlYW4gfSBmcm9tICcuLi9jb3JlL3V0aWwvY29udmVydCc7XG5cbmV4cG9ydCB0eXBlIE56U3dpdGNoU2l6ZVR5cGUgPSAnZGVmYXVsdCcgfCAnc21hbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3IgICAgICAgICAgIDogJ256LXN3aXRjaCcsXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICB0ZW1wbGF0ZVVybCAgICAgICAgOiAnLi9uei1zd2l0Y2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZXMgICAgICAgICAgICAgOiBbIGBcbiAgICA6aG9zdCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgfVxuICBgIF0sXG4gIHByb3ZpZGVycyAgICAgICAgICA6IFtcbiAgICB7XG4gICAgICBwcm92aWRlICAgIDogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOelN3aXRjaENvbXBvbmVudCksXG4gICAgICBtdWx0aSAgICAgIDogdHJ1ZVxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOelN3aXRjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zaXplOiBOelN3aXRjaFNpemVUeXBlO1xuICBwcml2YXRlIF9sb2FkaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2NvbnRyb2wgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hlY2tlZENoaWxkcmVuOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPjtcbiAgcHJpdmF0ZSBfdW5DaGVja2VkQ2hpbGRyZW46IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+O1xuICBwcmVmaXhDbHMgPSAnYW50LXN3aXRjaCc7XG4gIGNsYXNzTWFwO1xuICBjaGVja2VkID0gZmFsc2U7XG4gIGlzQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBpc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nOiBib29sZWFuO1xuICBAVmlld0NoaWxkKCdzd2l0Y2hFbGVtZW50JylcbiAgcHJpdmF0ZSBzd2l0Y2hFbGVtZW50OiBFbGVtZW50UmVmO1xuICBvbkNoYW5nZTogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcbiAgb25Ub3VjaGVkOiAoKSA9PiB2b2lkID0gKCkgPT4gbnVsbDtcblxuICBASW5wdXQoKVxuICBzZXQgbnpDb250cm9sKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29udHJvbCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBnZXQgbnpDb250cm9sKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56Q2hlY2tlZENoaWxkcmVuKHZhbHVlOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx2b2lkPikge1xuICAgIHRoaXMuaXNDaGVja2VkQ2hpbGRyZW5TdHJpbmcgPSAhKHZhbHVlIGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpO1xuICAgIHRoaXMuX2NoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56Q2hlY2tlZENoaWxkcmVuKCk6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hlY2tlZENoaWxkcmVuO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56VW5DaGVja2VkQ2hpbGRyZW4odmFsdWU6IHN0cmluZyB8IFRlbXBsYXRlUmVmPHZvaWQ+KSB7XG4gICAgdGhpcy5pc1VuQ2hlY2tlZENoaWxkcmVuU3RyaW5nID0gISh2YWx1ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IG56VW5DaGVja2VkQ2hpbGRyZW4oKTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl91bkNoZWNrZWRDaGlsZHJlbjtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuelNpemUodmFsdWU6IE56U3dpdGNoU2l6ZVR5cGUpIHtcbiAgICB0aGlzLl9zaXplID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56U2l6ZSgpOiBOelN3aXRjaFNpemVUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuekxvYWRpbmcodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9sb2FkaW5nID0gdG9Cb29sZWFuKHZhbHVlKTtcbiAgICB0aGlzLnNldENsYXNzTWFwKCk7XG4gIH1cblxuICBnZXQgbnpMb2FkaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkaW5nO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG56RGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRvQm9vbGVhbih2YWx1ZSk7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG5cbiAgZ2V0IG56RGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbICckZXZlbnQnIF0pXG4gIG9uQ2xpY2soZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoKCF0aGlzLm56RGlzYWJsZWQpICYmICghdGhpcy5uekxvYWRpbmcpICYmICghdGhpcy5uekNvbnRyb2wpKSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlKCF0aGlzLmNoZWNrZWQsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZhbHVlKHZhbHVlOiBib29sZWFuLCBlbWl0OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2hlY2tlZCA9PT0gdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICAgIGlmIChlbWl0KSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgc2V0Q2xhc3NNYXAoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc01hcCA9IHtcbiAgICAgIFsgdGhpcy5wcmVmaXhDbHMgXSAgICAgICAgICAgICAgOiB0cnVlLFxuICAgICAgWyBgJHt0aGlzLnByZWZpeENsc30tY2hlY2tlZGAgXSA6IHRoaXMuY2hlY2tlZCxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWxvYWRpbmdgIF0gOiB0aGlzLm56TG9hZGluZyxcbiAgICAgIFsgYCR7dGhpcy5wcmVmaXhDbHN9LWRpc2FibGVkYCBdOiB0aGlzLm56RGlzYWJsZWQsXG4gICAgICBbIGAke3RoaXMucHJlZml4Q2xzfS1zbWFsbGAgXSAgIDogdGhpcy5uelNpemUgPT09ICdzbWFsbCdcbiAgICB9O1xuICB9XG5cbiAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubnpDb250cm9sKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAzNykgeyAvLyBMZWZ0XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZmFsc2UsIHRydWUpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHsgLy8gUmlnaHRcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZSh0cnVlLCB0cnVlKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IDMyIHx8IGUua2V5Q29kZSA9PT0gMTMpIHsgLy8gU3BhY2UsIEVudGVyXG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWUoIXRoaXMuY2hlY2tlZCwgdHJ1ZSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICB0aGlzLnN3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICB9XG5cbiAgYmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLnN3aXRjaEVsZW1lbnQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGVWYWx1ZSh2YWx1ZSwgZmFsc2UpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGJvb2xlYW4pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLm56RGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRDbGFzc01hcCgpO1xuICB9XG59XG4iXX0=