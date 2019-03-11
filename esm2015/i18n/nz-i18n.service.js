/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import zh_CN from './languages/zh_CN';
import { NZ_DATE_LOCALE, NZ_I18N } from './nz-i18n.token';
import * as i0 from "@angular/core";
import * as i1 from "./public-api";
export class NzI18nService {
    /**
     * @param {?} locale
     * @param {?} dateLocale
     */
    constructor(locale, dateLocale) {
        this._change = new BehaviorSubject(this._locale);
        this.setLocale(locale || zh_CN);
        this.setDateLocale(dateLocale || null);
    }
    /**
     * @return {?}
     */
    get localeChange() {
        return this._change.asObservable();
    }
    /**
     * @param {?} path
     * @param {?=} data
     * @return {?}
     */
    translate(path, data) {
        /** @type {?} */
        let content = /** @type {?} */ (this._getObjectPath(this._locale, path));
        if (typeof content === 'string') {
            if (data) {
                Object.keys(data).forEach((key) => content = content.replace(new RegExp(`%${key}%`, 'g'), data[key]));
            }
            return content;
        }
        return path;
    }
    /**
     * Set/Change current locale globally throughout the WHOLE application
     * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
     * @param {?} locale The translating letters
     * @return {?}
     */
    setLocale(locale) {
        if (this._locale && this._locale.locale === locale.locale) {
            return;
        }
        this._locale = locale;
        this._change.next(locale);
    }
    /**
     * @return {?}
     */
    getLocale() {
        return this._locale;
    }
    /**
     * @return {?}
     */
    getLocaleId() {
        return this._locale ? this._locale.locale : '';
    }
    /**
     * @param {?} dateLocale
     * @return {?}
     */
    setDateLocale(dateLocale) {
        this.dateLocale = dateLocale;
    }
    /**
     * @return {?}
     */
    getDateLocale() {
        return this.dateLocale;
    }
    /**
     * Get locale data
     * @param {?=} path dot paths for finding exist value from locale data, eg. "a.b.c"
     * @param {?=} defaultValue default value if the result is not "truthy"
     * @return {?}
     */
    getLocaleData(path, defaultValue) {
        /** @type {?} */
        const result = path ? this._getObjectPath(this._locale, path) : this._locale;
        return result || defaultValue;
    }
    /**
     * @param {?} obj
     * @param {?} path
     * @return {?}
     */
    _getObjectPath(obj, path) {
        /** @type {?} */
        let res = obj;
        /** @type {?} */
        const paths = path.split('.');
        /** @type {?} */
        const depth = paths.length;
        /** @type {?} */
        let index = 0;
        while (res && index < depth) {
            res = res[paths[index++]];
        }
        return index === depth ? res : null;
    }
}
NzI18nService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NzI18nService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [NZ_I18N,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [NZ_DATE_LOCALE,] }] }
];
/** @nocollapse */ NzI18nService.ngInjectableDef = i0.defineInjectable({ factory: function NzI18nService_Factory() { return new i1.NzI18nService(i0.inject(i1.NZ_I18N), i0.inject(i1.NZ_DATE_LOCALE)); }, token: i1.NzI18nService, providedIn: "root" });
function NzI18nService_tsickle_Closure_declarations() {
    /** @type {?} */
    NzI18nService.prototype._locale;
    /** @type {?} */
    NzI18nService.prototype._change;
    /** @type {?} */
    NzI18nService.prototype.dateLocale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImkxOG4vbnotaTE4bi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUsxRCxNQUFNOzs7OztJQVNKLFlBQ21CLE1BQXVCLEVBQ2hCLFVBQXNCO3VCQVQ5QixJQUFJLGVBQWUsQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQVdsRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQztLQUN4Qzs7OztJQVZELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUNwQzs7Ozs7O0lBYUQsU0FBUyxDQUFDLElBQVksRUFBRSxJQUFVOztRQUVoQyxJQUFJLE9BQU8scUJBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBVyxFQUFDO1FBQ2hFLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksSUFBSSxFQUFFO2dCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekc7WUFDRCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7SUFPRCxTQUFTLENBQUMsTUFBdUI7UUFDL0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDekQsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0I7Ozs7SUFFRCxTQUFTO1FBQ1AsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQ3JCOzs7O0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNoRDs7Ozs7SUFFRCxhQUFhLENBQUMsVUFBc0I7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7SUFFRCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7Ozs7O0lBT0QsYUFBYSxDQUFDLElBQWEsRUFBRSxZQUFrQjs7UUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0UsT0FBTyxNQUFNLElBQUksWUFBWSxDQUFDO0tBQy9COzs7Ozs7SUFFTyxjQUFjLENBQUMsR0FBVyxFQUFFLElBQVk7O1FBQzlDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQzs7UUFDZCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUM5QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDOztRQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxPQUFPLEdBQUcsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUFFO1lBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUUsS0FBSyxDQUFFLEtBQUssRUFBRSxDQUFFLENBQUUsQ0FBQztTQUMvQjtRQUNELE9BQU8sS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Ozs7WUFsRnZDLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs0Q0FXSSxNQUFNLFNBQUMsT0FBTzs0Q0FDZCxNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB6aF9DTiBmcm9tICcuL2xhbmd1YWdlcy96aF9DTic7XG5pbXBvcnQgeyBEYXRlTG9jYWxlLCBOekkxOG5JbnRlcmZhY2UgfSBmcm9tICcuL256LWkxOG4uaW50ZXJmYWNlJztcbmltcG9ydCB7IE5aX0RBVEVfTE9DQUxFLCBOWl9JMThOIH0gZnJvbSAnLi9uei1pMThuLnRva2VuJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTnpJMThuU2VydmljZSB7XG4gIHByaXZhdGUgX2xvY2FsZTogTnpJMThuSW50ZXJmYWNlO1xuICBwcml2YXRlIF9jaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE56STE4bkludGVyZmFjZT4odGhpcy5fbG9jYWxlKTtcbiAgcHJpdmF0ZSBkYXRlTG9jYWxlOiBEYXRlTG9jYWxlO1xuXG4gIGdldCBsb2NhbGVDaGFuZ2UoKTogT2JzZXJ2YWJsZTxOekkxOG5JbnRlcmZhY2U+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChOWl9JMThOKSBsb2NhbGU6IE56STE4bkludGVyZmFjZSxcbiAgICBASW5qZWN0KE5aX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBEYXRlTG9jYWxlKSB7XG5cbiAgICB0aGlzLnNldExvY2FsZShsb2NhbGUgfHwgemhfQ04pO1xuICAgIHRoaXMuc2V0RGF0ZUxvY2FsZShkYXRlTG9jYWxlIHx8IG51bGwpO1xuICB9XG5cbiAgLy8gW05PVEVdIFBlcmZvcm1hbmNlIGlzc3VlOiB0aGlzIG1ldGhvZCBtYXkgY2FsbGVkIGJ5IGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb25zXG4gIC8vIFRPRE86IGNhY2hlIG1vcmUgZGVlcGx5IHBhdGhzIGZvciBwZXJmb3JtYW5jZVxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXG4gIHRyYW5zbGF0ZShwYXRoOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBzdHJpbmcge1xuICAgIC8vIHRoaXMuX2xvZ2dlci5kZWJ1ZyhgW056STE4blNlcnZpY2VdIFRyYW5zbGF0aW5nKCR7dGhpcy5fbG9jYWxlLmxvY2FsZX0pOiAke3BhdGh9YCk7XG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLl9nZXRPYmplY3RQYXRoKHRoaXMuX2xvY2FsZSwgcGF0aCkgYXMgc3RyaW5nO1xuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4gY29udGVudCA9IGNvbnRlbnQucmVwbGFjZShuZXcgUmVnRXhwKGAlJHtrZXl9JWAsICdnJyksIGRhdGFbIGtleSBdKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICAvKipcbiAgICogU2V0L0NoYW5nZSBjdXJyZW50IGxvY2FsZSBnbG9iYWxseSB0aHJvdWdob3V0IHRoZSBXSE9MRSBhcHBsaWNhdGlvblxuICAgKiBbTk9URV0gSWYgY2FsbGVkIGF0IHJ1bnRpbWUsIHJlbmRlcmVkIGludGVyZmFjZSBtYXkgbm90IGNoYW5nZSBhbG9uZyB3aXRoIHRoZSBsb2NhbGUgY2hhbmdlIChiZWNhdXNlIHRoaXMgZG8gbm90IHRyaWdnZXIgYW5vdGhlciByZW5kZXIgc2NoZWR1bGUpXG4gICAqIEBwYXJhbSBsb2NhbGUgVGhlIHRyYW5zbGF0aW5nIGxldHRlcnNcbiAgICovXG4gIHNldExvY2FsZShsb2NhbGU6IE56STE4bkludGVyZmFjZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9sb2NhbGUgJiYgdGhpcy5fbG9jYWxlLmxvY2FsZSA9PT0gbG9jYWxlLmxvY2FsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9sb2NhbGUgPSBsb2NhbGU7XG4gICAgdGhpcy5fY2hhbmdlLm5leHQobG9jYWxlKTtcbiAgfVxuXG4gIGdldExvY2FsZSgpOiBOekkxOG5JbnRlcmZhY2Uge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XG4gIH1cblxuICBnZXRMb2NhbGVJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9sb2NhbGUgPyB0aGlzLl9sb2NhbGUubG9jYWxlIDogJyc7XG4gIH1cblxuICBzZXREYXRlTG9jYWxlKGRhdGVMb2NhbGU6IERhdGVMb2NhbGUpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVMb2NhbGUgPSBkYXRlTG9jYWxlO1xuICB9XG5cbiAgZ2V0RGF0ZUxvY2FsZSgpOiBEYXRlTG9jYWxlIHtcbiAgICByZXR1cm4gdGhpcy5kYXRlTG9jYWxlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBsb2NhbGUgZGF0YVxuICAgKiBAcGFyYW0gcGF0aCBkb3QgcGF0aHMgZm9yIGZpbmRpbmcgZXhpc3QgdmFsdWUgZnJvbSBsb2NhbGUgZGF0YSwgZWcuIFwiYS5iLmNcIlxuICAgKiBAcGFyYW0gZGVmYXVsdFZhbHVlIGRlZmF1bHQgdmFsdWUgaWYgdGhlIHJlc3VsdCBpcyBub3QgXCJ0cnV0aHlcIlxuICAgKi9cbiAgZ2V0TG9jYWxlRGF0YShwYXRoPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpOiBhbnkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgIGNvbnN0IHJlc3VsdCA9IHBhdGggPyB0aGlzLl9nZXRPYmplY3RQYXRoKHRoaXMuX2xvY2FsZSwgcGF0aCkgOiB0aGlzLl9sb2NhbGU7XG4gICAgcmV0dXJuIHJlc3VsdCB8fCBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPYmplY3RQYXRoKG9iajogb2JqZWN0LCBwYXRoOiBzdHJpbmcpOiBzdHJpbmcgfCBvYmplY3QgfCBhbnkgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgIGxldCByZXMgPSBvYmo7XG4gICAgY29uc3QgcGF0aHMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZGVwdGggPSBwYXRocy5sZW5ndGg7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAocmVzICYmIGluZGV4IDwgZGVwdGgpIHtcbiAgICAgIHJlcyA9IHJlc1sgcGF0aHNbIGluZGV4KysgXSBdO1xuICAgIH1cbiAgICByZXR1cm4gaW5kZXggPT09IGRlcHRoID8gcmVzIDogbnVsbDtcbiAgfVxufVxuIl19