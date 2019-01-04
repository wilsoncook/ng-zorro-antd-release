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
var NzTimePickerModule = /** @class */ (function () {
    function NzTimePickerModule() {
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
    return NzTimePickerModule;
}());
export { NzTimePickerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGltZS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbInRpbWUtcGlja2VyL256LXRpbWUtcGlja2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7O2dCQUVqRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFLO3dCQUNmLHFCQUFxQjt3QkFDckIsMEJBQTBCO3dCQUMxQiw0QkFBNEI7cUJBQzdCO29CQUNELE9BQU8sRUFBVTt3QkFDZiwwQkFBMEI7d0JBQzFCLHFCQUFxQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFVLENBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFFO29CQUMzRSxlQUFlLEVBQUUsRUFBRTtpQkFDcEI7OzZCQXJCRDs7U0FzQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOekkxOG5Nb2R1bGUgfSBmcm9tICcuLi9pMThuL256LWkxOG4ubW9kdWxlJztcbmltcG9ydCB7IE56VGltZVBpY2tlclBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi9uei10aW1lLXBpY2tlci1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUaW1lUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9uei10aW1lLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpUaW1lVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZSB9IGZyb20gJy4vbnotdGltZS12YWx1ZS1hY2Nlc3Nvci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnMgICA6IFtcbiAgICBOelRpbWVQaWNrZXJDb21wb25lbnQsXG4gICAgTnpUaW1lUGlja2VyUGFuZWxDb21wb25lbnQsXG4gICAgTnpUaW1lVmFsdWVBY2Nlc3NvckRpcmVjdGl2ZVxuICBdLFxuICBleHBvcnRzICAgICAgICA6IFtcbiAgICBOelRpbWVQaWNrZXJQYW5lbENvbXBvbmVudCxcbiAgICBOelRpbWVQaWNrZXJDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0cyAgICAgICAgOiBbIENvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE56STE4bk1vZHVsZSwgT3ZlcmxheU1vZHVsZSBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE56VGltZVBpY2tlck1vZHVsZSB7XG59XG4iXX0=