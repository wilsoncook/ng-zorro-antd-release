/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTabBodyComponent } from './nz-tab-body.component';
import { NzTabLabelDirective } from './nz-tab-label.directive';
import { NzTabComponent } from './nz-tab.component';
import { NzTabsInkBarDirective } from './nz-tabs-ink-bar.directive';
import { NzTabsNavComponent } from './nz-tabs-nav.component';
import { NzTabSetComponent } from './nz-tabset.component';
export class NzTabsModule {
}
NzTabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NzTabComponent, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent],
                exports: [NzTabComponent, NzTabSetComponent, NzTabsNavComponent, NzTabLabelDirective, NzTabsInkBarDirective, NzTabBodyComponent],
                imports: [CommonModule, ObserversModule]
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotdGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsidGFicy9uei10YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQU8xRCxNQUFNOzs7WUFMTCxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixDQUFFO2dCQUN2SSxPQUFPLEVBQU8sQ0FBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLENBQUU7Z0JBQ3ZJLE9BQU8sRUFBTyxDQUFFLFlBQVksRUFBRSxlQUFlLENBQUU7YUFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZlcnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb2JzZXJ2ZXJzJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOelRhYkJvZHlDb21wb25lbnQgfSBmcm9tICcuL256LXRhYi1ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYkxhYmVsRGlyZWN0aXZlIH0gZnJvbSAnLi9uei10YWItbGFiZWwuZGlyZWN0aXZlJztcbmltcG9ydCB7IE56VGFiQ29tcG9uZW50IH0gZnJvbSAnLi9uei10YWIuY29tcG9uZW50JztcbmltcG9ydCB7IE56VGFic0lua0JhckRpcmVjdGl2ZSB9IGZyb20gJy4vbnotdGFicy1pbmstYmFyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOelRhYnNOYXZDb21wb25lbnQgfSBmcm9tICcuL256LXRhYnMtbmF2LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOelRhYlNldENvbXBvbmVudCB9IGZyb20gJy4vbnotdGFic2V0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogWyBOelRhYkNvbXBvbmVudCwgTnpUYWJTZXRDb21wb25lbnQsIE56VGFic05hdkNvbXBvbmVudCwgTnpUYWJMYWJlbERpcmVjdGl2ZSwgTnpUYWJzSW5rQmFyRGlyZWN0aXZlLCBOelRhYkJvZHlDb21wb25lbnQgXSxcbiAgZXhwb3J0cyAgICAgOiBbIE56VGFiQ29tcG9uZW50LCBOelRhYlNldENvbXBvbmVudCwgTnpUYWJzTmF2Q29tcG9uZW50LCBOelRhYkxhYmVsRGlyZWN0aXZlLCBOelRhYnNJbmtCYXJEaXJlY3RpdmUsIE56VGFiQm9keUNvbXBvbmVudCBdLFxuICBpbXBvcnRzICAgICA6IFsgQ29tbW9uTW9kdWxlLCBPYnNlcnZlcnNNb2R1bGUgXVxufSlcbmV4cG9ydCBjbGFzcyBOelRhYnNNb2R1bGUge1xufVxuIl19