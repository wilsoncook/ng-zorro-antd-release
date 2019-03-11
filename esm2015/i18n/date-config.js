/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { InjectionToken } from '@angular/core';
/** @type {?} */
export const NZ_DATE_CONFIG = new InjectionToken('date-config');
/** @type {?} */
export const NZ_DATE_CONFIG_DEFAULT = {
    firstDayOfWeek: null
};
/**
 * @param {?} config
 * @return {?}
 */
export function mergeDateConfig(config) {
    return Object.assign({}, NZ_DATE_CONFIG_DEFAULT, config);
}
/**
 * @record
 */
export function NzDateConfig() { }
function NzDateConfig_tsickle_Closure_declarations() {
    /**
     * Customize the first day of a week
     * @type {?|undefined}
     */
    NzDateConfig.prototype.firstDayOfWeek;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy16b3Jyby1hbnRkLyIsInNvdXJjZXMiOlsiaTE4bi9kYXRlLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFFL0MsYUFBYSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQWUsYUFBYSxDQUFDLENBQUM7O0FBRTlFLGFBQWEsc0JBQXNCLEdBQWlCO0lBQ2xELGNBQWMsRUFBRSxJQUFJO0NBQ3JCLENBQUM7Ozs7O0FBRUYsTUFBTSwwQkFBMEIsTUFBb0I7SUFDbEQseUJBQVksc0JBQXNCLEVBQUssTUFBTSxFQUFHO0NBQ2pEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE5aX0RBVEVfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE56RGF0ZUNvbmZpZz4oJ2RhdGUtY29uZmlnJyk7XG5cbmV4cG9ydCBjb25zdCBOWl9EQVRFX0NPTkZJR19ERUZBVUxUOiBOekRhdGVDb25maWcgPSB7XG4gIGZpcnN0RGF5T2ZXZWVrOiBudWxsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VEYXRlQ29uZmlnKGNvbmZpZzogTnpEYXRlQ29uZmlnKTogTnpEYXRlQ29uZmlnIHtcbiAgcmV0dXJuIHsgLi4uTlpfREFURV9DT05GSUdfREVGQVVMVCwgLi4uY29uZmlnIH07XG59XG5cbi8vLy8vLy8vLy8vL1xuXG5leHBvcnQgaW50ZXJmYWNlIE56RGF0ZUNvbmZpZyB7XG4gIC8qKiBDdXN0b21pemUgdGhlIGZpcnN0IGRheSBvZiBhIHdlZWsgKi9cbiAgZmlyc3REYXlPZldlZWs/OiAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2O1xufVxuIl19