/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from '../button/nz-button.module';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropdownContextComponent } from './nz-dropdown-context.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
var NzDropDownModule = /** @class */ (function () {
    function NzDropDownModule() {
    }
    NzDropDownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, OverlayModule, FormsModule, NzButtonModule, NzMenuModule],
                    declarations: [NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective, NzDropdownContextComponent],
                    entryComponents: [NzDropdownContextComponent],
                    exports: [NzDropDownComponent, NzDropDownButtonComponent, NzDropDownDirective]
                },] }
    ];
    return NzDropDownModule;
}());
export { NzDropDownModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotZHJvcGRvd24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImRyb3Bkb3duL256LWRyb3Bkb3duLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztnQkFFN0QsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBVSxDQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxZQUFZLENBQUU7b0JBQzNGLFlBQVksRUFBSyxDQUFFLG1CQUFtQixFQUFFLHlCQUF5QixFQUFFLG1CQUFtQixFQUFFLDBCQUEwQixDQUFFO29CQUNwSCxlQUFlLEVBQUUsQ0FBRSwwQkFBMEIsQ0FBRTtvQkFDL0MsT0FBTyxFQUFVLENBQUUsbUJBQW1CLEVBQUUseUJBQXlCLEVBQUUsbUJBQW1CLENBQUU7aUJBQ3pGOzsyQkFsQkQ7O1NBbUJhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBOekJ1dHRvbk1vZHVsZSB9IGZyb20gJy4uL2J1dHRvbi9uei1idXR0b24ubW9kdWxlJztcbmltcG9ydCB7IE56TWVudU1vZHVsZSB9IGZyb20gJy4uL21lbnUvbnotbWVudS5tb2R1bGUnO1xuXG5pbXBvcnQgeyBOekRyb3BEb3duQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9uei1kcm9wZG93bi1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7IE56RHJvcGRvd25Db250ZXh0Q29tcG9uZW50IH0gZnJvbSAnLi9uei1kcm9wZG93bi1jb250ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOekRyb3BEb3duQ29tcG9uZW50IH0gZnJvbSAnLi9uei1kcm9wZG93bi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTnpEcm9wRG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vbnotZHJvcGRvd24uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0cyAgICAgICAgOiBbIENvbW1vbk1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgRm9ybXNNb2R1bGUsIE56QnV0dG9uTW9kdWxlLCBOek1lbnVNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zICAgOiBbIE56RHJvcERvd25Db21wb25lbnQsIE56RHJvcERvd25CdXR0b25Db21wb25lbnQsIE56RHJvcERvd25EaXJlY3RpdmUsIE56RHJvcGRvd25Db250ZXh0Q29tcG9uZW50IF0sXG4gIGVudHJ5Q29tcG9uZW50czogWyBOekRyb3Bkb3duQ29udGV4dENvbXBvbmVudCBdLFxuICBleHBvcnRzICAgICAgICA6IFsgTnpEcm9wRG93bkNvbXBvbmVudCwgTnpEcm9wRG93bkJ1dHRvbkNvbXBvbmVudCwgTnpEcm9wRG93bkRpcmVjdGl2ZSBdXG59KVxuZXhwb3J0IGNsYXNzIE56RHJvcERvd25Nb2R1bGUge1xufVxuIl19