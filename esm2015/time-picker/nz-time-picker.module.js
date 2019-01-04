/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzTimePickerPanelComponent } from './nz-time-picker-panel.component';
import { NzTimePickerComponent } from './nz-time-picker.component';
import { NzTimeValueAccessorDirective } from './nz-time-value-accessor.directive';
export class NzTimePickerModule {
}
NzTimePickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NzTimePickerComponent,
                    NzTimePickerPanelComponent,
                    NzTimeValueAccessorDirective
                ],
                exports: [
                    NzTimePickerPanelComponent,
                    NzTimePickerComponent
                ],
                imports: [CommonModule, FormsModule, NzI18nModule, OverlayModule],
                entryComponents: []
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbInRpbWUtcGlja2VyL256LXRpbWUtcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFlbEYsTUFBTTs7O1lBYkwsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBSztvQkFDZixxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIsNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQVU7b0JBQ2YsMEJBQTBCO29CQUMxQixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBVSxDQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBRTtnQkFDM0UsZUFBZSxFQUFFLEVBQUU7YUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJy4uL2kxOG4vbnotaTE4bi5tb2R1bGUnO1xuaW1wb3J0IHsgTnpUaW1lUGlja2VyUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL256LXRpbWUtcGlja2VyLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRpbWVQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL256LXRpbWUtcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRpbWVWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlIH0gZnJvbSAnLi9uei10aW1lLXZhbHVlLWFjY2Vzc29yLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9ucyAgIDogW1xuICAgIE56VGltZVBpY2tlckNvbXBvbmVudCxcbiAgICBOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudCxcbiAgICBOelRpbWVWYWx1ZUFjY2Vzc29yRGlyZWN0aXZlXG4gIF0sXG4gIGV4cG9ydHMgICAgICAgIDogW1xuICAgIE56VGltZVBpY2tlclBhbmVsQ29tcG9uZW50LFxuICAgIE56VGltZVBpY2tlckNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzICAgICAgICA6IFsgQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgTnpJMThuTW9kdWxlLCBPdmVybGF5TW9kdWxlIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW11cbn0pXG5leHBvcnQgY2xhc3MgTnpUaW1lUGlja2VyTW9kdWxlIHtcbn1cbiJdfQ==