/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from '../button/nz-button.module';
import { NzCheckboxModule } from '../checkbox/nz-checkbox.module';
import { NzI18nModule } from '../i18n/nz-i18n.module';
import { NzInputModule } from '../input/nz-input.module';
import { NzTransferListComponent } from './nz-transfer-list.component';
import { NzTransferSearchComponent } from './nz-transfer-search.component';
import { NzTransferComponent } from './nz-transfer.component';
var NzTransferModule = /** @class */ (function () {
    function NzTransferModule() {
    }
    NzTransferModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule, NzCheckboxModule, NzButtonModule, NzInputModule, NzI18nModule],
                    declarations: [NzTransferComponent, NzTransferListComponent, NzTransferSearchComponent],
                    exports: [NzTransferComponent]
                },] }
    ];
    return NzTransferModule;
}());
export { NzTransferModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdHJhbnNmZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbInRyYW5zZmVyL256LXRyYW5zZmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXpELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7OztnQkFFN0QsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBTyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQ3hHLFlBQVksRUFBRSxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLHlCQUF5QixDQUFDO29CQUN2RixPQUFPLEVBQU8sQ0FBQyxtQkFBbUIsQ0FBQztpQkFDcEM7OzJCQWpCRDs7U0FrQmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgTnpCdXR0b25Nb2R1bGUgfSBmcm9tICcuLi9idXR0b24vbnotYnV0dG9uLm1vZHVsZSc7XG5pbXBvcnQgeyBOekNoZWNrYm94TW9kdWxlIH0gZnJvbSAnLi4vY2hlY2tib3gvbnotY2hlY2tib3gubW9kdWxlJztcbmltcG9ydCB7IE56STE4bk1vZHVsZSB9IGZyb20gJy4uL2kxOG4vbnotaTE4bi5tb2R1bGUnO1xuaW1wb3J0IHsgTnpJbnB1dE1vZHVsZSB9IGZyb20gJy4uL2lucHV0L256LWlucHV0Lm1vZHVsZSc7XG5cbmltcG9ydCB7IE56VHJhbnNmZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uei10cmFuc2Zlci1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRyYW5zZmVyU2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9uei10cmFuc2Zlci1zZWFyY2guY29tcG9uZW50JztcbmltcG9ydCB7IE56VHJhbnNmZXJDb21wb25lbnQgfSBmcm9tICcuL256LXRyYW5zZmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIE56Q2hlY2tib3hNb2R1bGUsIE56QnV0dG9uTW9kdWxlLCBOeklucHV0TW9kdWxlLCBOekkxOG5Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOelRyYW5zZmVyQ29tcG9uZW50LCBOelRyYW5zZmVyTGlzdENvbXBvbmVudCwgTnpUcmFuc2ZlclNlYXJjaENvbXBvbmVudF0sXG4gIGV4cG9ydHM6ICAgICAgW056VHJhbnNmZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE56VHJhbnNmZXJNb2R1bGUgeyB9XG4iXX0=