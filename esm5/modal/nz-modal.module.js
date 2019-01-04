/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from '../button/nz-button.module';
import { LoggerModule } from '../core/util/logger/logger.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { CssUnitPipe } from './css-unit.pipe';
import { NzModalControlService } from './nz-modal-control.service';
import { NzModalComponent } from './nz-modal.component';
import { NzModalService } from './nz-modal.service';
var NzModalModule = /** @class */ (function () {
    function NzModalModule() {
    }
    NzModalModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule, NzI18nModule, NzButtonModule, LoggerModule],
                    exports: [NzModalComponent],
                    declarations: [NzModalComponent, CssUnitPipe],
                    entryComponents: [NzModalComponent],
                    providers: [NzModalControlService, NzModalService]
                },] }
    ];
    return NzModalModule;
}());
export { NzModalModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotbW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbIm1vZGFsL256LW1vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O2dCQUVuRCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLFlBQVksQ0FBRTtvQkFDcEYsT0FBTyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7b0JBQzdCLFlBQVksRUFBRSxDQUFFLGdCQUFnQixFQUFFLFdBQVcsQ0FBRTtvQkFDL0MsZUFBZSxFQUFFLENBQUUsZ0JBQWdCLENBQUU7b0JBQ3JDLFNBQVMsRUFBRSxDQUFFLHFCQUFxQixFQUFFLGNBQWMsQ0FBRTtpQkFDckQ7O3dCQW5CRDs7U0FvQmEsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vbnotYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBMb2dnZXJNb2R1bGUgfSBmcm9tICcuLi9jb3JlL3V0aWwvbG9nZ2VyL2xvZ2dlci5tb2R1bGUnO1xuaW1wb3J0IHsgTnpJMThuTW9kdWxlIH0gZnJvbSAnLi4vaTE4bi9uei1pMThuLm1vZHVsZSc7XG5cbmltcG9ydCB7IENzc1VuaXRQaXBlIH0gZnJvbSAnLi9jc3MtdW5pdC5waXBlJztcbmltcG9ydCB7IE56TW9kYWxDb250cm9sU2VydmljZSB9IGZyb20gJy4vbnotbW9kYWwtY29udHJvbC5zZXJ2aWNlJztcbmltcG9ydCB7IE56TW9kYWxDb21wb25lbnQgfSBmcm9tICcuL256LW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOek1vZGFsU2VydmljZSB9IGZyb20gJy4vbnotbW9kYWwuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBPdmVybGF5TW9kdWxlLCBOekkxOG5Nb2R1bGUsIE56QnV0dG9uTW9kdWxlLCBMb2dnZXJNb2R1bGUgXSxcbiAgZXhwb3J0czogWyBOek1vZGFsQ29tcG9uZW50IF0sXG4gIGRlY2xhcmF0aW9uczogWyBOek1vZGFsQ29tcG9uZW50LCBDc3NVbml0UGlwZSBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgTnpNb2RhbENvbXBvbmVudCBdLFxuICBwcm92aWRlcnM6IFsgTnpNb2RhbENvbnRyb2xTZXJ2aWNlLCBOek1vZGFsU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIE56TW9kYWxNb2R1bGUgeyB9XG4iXX0=