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
var NzI18nService = /** @class */ (function () {
    function NzI18nService(locale, dateLocale) {
        this._change = new BehaviorSubject(this._locale);
        this.setLocale(locale || zh_CN);
        this.setDateLocale(dateLocale || null);
    }
    Object.defineProperty(NzI18nService.prototype, "localeChange", {
        get: /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // [NOTE] Performance issue: this method may called by every change detections
    // TODO: cache more deeply paths for performance
    /* tslint:disable-next-line:no-any */
    /**
     * @param {?} path
     * @param {?=} data
     * @return {?}
     */
    NzI18nService.prototype.translate = /**
     * @param {?} path
     * @param {?=} data
     * @return {?}
     */
    function (path, data) {
        /** @type {?} */
        var content = /** @type {?} */ (this._getObjectPath(this._locale, path));
        if (typeof content === 'string') {
            if (data) {
                Object.keys(data).forEach(function (key) { return content = content.replace(new RegExp("%" + key + "%", 'g'), data[key]); });
            }
            return content;
        }
        return path;
    };
    /**
     * Set/Change current locale globally throughout the WHOLE application
     * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
     * @param locale The translating letters
     */
    /**
     * Set/Change current locale globally throughout the WHOLE application
     * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
     * @param {?} locale The translating letters
     * @return {?}
     */
    NzI18nService.prototype.setLocale = /**
     * Set/Change current locale globally throughout the WHOLE application
     * [NOTE] If called at runtime, rendered interface may not change along with the locale change (because this do not trigger another render schedule)
     * @param {?} locale The translating letters
     * @return {?}
     */
    function (locale) {
        if (this._locale && this._locale.locale === locale.locale) {
            return;
        }
        this._locale = locale;
        this._change.next(locale);
    };
    /**
     * @return {?}
     */
    NzI18nService.prototype.getLocale = /**
     * @return {?}
     */
    function () {
        return this._locale;
    };
    /**
     * @return {?}
     */
    NzI18nService.prototype.getLocaleId = /**
     * @return {?}
     */
    function () {
        return this._locale ? this._locale.locale : '';
    };
    /**
     * @param {?} dateLocale
     * @return {?}
     */
    NzI18nService.prototype.setDateLocale = /**
     * @param {?} dateLocale
     * @return {?}
     */
    function (dateLocale) {
        this.dateLocale = dateLocale;
    };
    /**
     * @return {?}
     */
    NzI18nService.prototype.getDateLocale = /**
     * @return {?}
     */
    function () {
        return this.dateLocale;
    };
    /**
     * Get locale data
     * @param path dot paths for finding exist value from locale data, eg. "a.b.c"
     * @param defaultValue default value if the result is not "truthy"
     */
    /**
     * Get locale data
     * @param {?=} path dot paths for finding exist value from locale data, eg. "a.b.c"
     * @param {?=} defaultValue default value if the result is not "truthy"
     * @return {?}
     */
    NzI18nService.prototype.getLocaleData = /**
     * Get locale data
     * @param {?=} path dot paths for finding exist value from locale data, eg. "a.b.c"
     * @param {?=} defaultValue default value if the result is not "truthy"
     * @return {?}
     */
    function (path, defaultValue) {
        /** @type {?} */
        var result = path ? this._getObjectPath(this._locale, path) : this._locale;
        return result || defaultValue;
    };
    /**
     * @param {?} obj
     * @param {?} path
     * @return {?}
     */
    NzI18nService.prototype._getObjectPath = /**
     * @param {?} obj
     * @param {?} path
     * @return {?}
     */
    function (obj, path) {
        /** @type {?} */
        var res = obj;
        /** @type {?} */
        var paths = path.split('.');
        /** @type {?} */
        var depth = paths.length;
        /** @type {?} */
        var index = 0;
        while (res && index < depth) {
            res = res[paths[index++]];
        }
        return index === depth ? res : null;
    };
    NzI18nService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NzI18nService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [NZ_I18N,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [NZ_DATE_LOCALE,] }] }
    ]; };
    /** @nocollapse */ NzI18nService.ngInjectableDef = i0.defineInjectable({ factory: function NzI18nService_Factory() { return new i1.NzI18nService(i0.inject(i1.NZ_I18N), i0.inject(i1.NZ_DATE_LOCALE)); }, token: i1.NzI18nService, providedIn: "root" });
    return NzI18nService;
}());
export { NzI18nService };
function NzI18nService_tsickle_Closure_declarations() {
    /** @type {?} */
    NzI18nService.prototype._locale;
    /** @type {?} */
    NzI18nService.prototype._change;
    /** @type {?} */
    NzI18nService.prototype.dateLocale;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnotaTE4bi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctem9ycm8tYW50ZC8iLCJzb3VyY2VzIjpbImkxOG4vbnotaTE4bi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sS0FBSyxNQUFNLG1CQUFtQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7SUFjeEQsdUJBQ21CLE1BQXVCLEVBQ2hCLFVBQXNCO3VCQVQ5QixJQUFJLGVBQWUsQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQVdsRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQztLQUN4QztJQVZELHNCQUFJLHVDQUFZOzs7O1FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3BDOzs7T0FBQTtJQVVELDhFQUE4RTtJQUM5RSxnREFBZ0Q7SUFDaEQscUNBQXFDOzs7Ozs7SUFDckMsaUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFZLEVBQUUsSUFBVTs7UUFFaEMsSUFBSSxPQUFPLHFCQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQVcsRUFBQztRQUNoRSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQUksR0FBRyxNQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDLEVBQW5FLENBQW1FLENBQUMsQ0FBQzthQUN6RztZQUNELE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCxpQ0FBUzs7Ozs7O0lBQVQsVUFBVSxNQUF1QjtRQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN6RCxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzQjs7OztJQUVELGlDQUFTOzs7SUFBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUNyQjs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNoRDs7Ozs7SUFFRCxxQ0FBYTs7OztJQUFiLFVBQWMsVUFBc0I7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDOUI7Ozs7SUFFRCxxQ0FBYTs7O0lBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFFRDs7OztPQUlHOzs7Ozs7O0lBQ0gscUNBQWE7Ozs7OztJQUFiLFVBQWMsSUFBYSxFQUFFLFlBQWtCOztRQUM3QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3RSxPQUFPLE1BQU0sSUFBSSxZQUFZLENBQUM7S0FDL0I7Ozs7OztJQUVPLHNDQUFjOzs7OztjQUFDLEdBQVcsRUFBRSxJQUFZOztRQUM5QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7O1FBQ2QsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFDOUIsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzs7UUFDM0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxHQUFHLElBQUksS0FBSyxHQUFHLEtBQUssRUFBRTtZQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFFLEtBQUssQ0FBRSxLQUFLLEVBQUUsQ0FBRSxDQUFFLENBQUM7U0FDL0I7UUFDRCxPQUFPLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzs7Z0JBbEZ2QyxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dEQVdJLE1BQU0sU0FBQyxPQUFPO2dEQUNkLE1BQU0sU0FBQyxjQUFjOzs7d0JBckIxQjs7U0FVYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHpoX0NOIGZyb20gJy4vbGFuZ3VhZ2VzL3poX0NOJztcbmltcG9ydCB7IERhdGVMb2NhbGUsIE56STE4bkludGVyZmFjZSB9IGZyb20gJy4vbnotaTE4bi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTlpfREFURV9MT0NBTEUsIE5aX0kxOE4gfSBmcm9tICcuL256LWkxOG4udG9rZW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOekkxOG5TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfbG9jYWxlOiBOekkxOG5JbnRlcmZhY2U7XG4gIHByaXZhdGUgX2NoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TnpJMThuSW50ZXJmYWNlPih0aGlzLl9sb2NhbGUpO1xuICBwcml2YXRlIGRhdGVMb2NhbGU6IERhdGVMb2NhbGU7XG5cbiAgZ2V0IGxvY2FsZUNoYW5nZSgpOiBPYnNlcnZhYmxlPE56STE4bkludGVyZmFjZT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KE5aX0kxOE4pIGxvY2FsZTogTnpJMThuSW50ZXJmYWNlLFxuICAgIEBJbmplY3QoTlpfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IERhdGVMb2NhbGUpIHtcblxuICAgIHRoaXMuc2V0TG9jYWxlKGxvY2FsZSB8fCB6aF9DTik7XG4gICAgdGhpcy5zZXREYXRlTG9jYWxlKGRhdGVMb2NhbGUgfHwgbnVsbCk7XG4gIH1cblxuICAvLyBbTk9URV0gUGVyZm9ybWFuY2UgaXNzdWU6IHRoaXMgbWV0aG9kIG1heSBjYWxsZWQgYnkgZXZlcnkgY2hhbmdlIGRldGVjdGlvbnNcbiAgLy8gVE9ETzogY2FjaGUgbW9yZSBkZWVwbHkgcGF0aHMgZm9yIHBlcmZvcm1hbmNlXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cbiAgdHJhbnNsYXRlKHBhdGg6IHN0cmluZywgZGF0YT86IGFueSk6IHN0cmluZyB7XG4gICAgLy8gdGhpcy5fbG9nZ2VyLmRlYnVnKGBbTnpJMThuU2VydmljZV0gVHJhbnNsYXRpbmcoJHt0aGlzLl9sb2NhbGUubG9jYWxlfSk6ICR7cGF0aH1gKTtcbiAgICBsZXQgY29udGVudCA9IHRoaXMuX2dldE9iamVjdFBhdGgodGhpcy5fbG9jYWxlLCBwYXRoKSBhcyBzdHJpbmc7XG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiBjb250ZW50ID0gY29udGVudC5yZXBsYWNlKG5ldyBSZWdFeHAoYCUke2tleX0lYCwgJ2cnKSwgZGF0YVsga2V5IF0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQvQ2hhbmdlIGN1cnJlbnQgbG9jYWxlIGdsb2JhbGx5IHRocm91Z2hvdXQgdGhlIFdIT0xFIGFwcGxpY2F0aW9uXG4gICAqIFtOT1RFXSBJZiBjYWxsZWQgYXQgcnVudGltZSwgcmVuZGVyZWQgaW50ZXJmYWNlIG1heSBub3QgY2hhbmdlIGFsb25nIHdpdGggdGhlIGxvY2FsZSBjaGFuZ2UgKGJlY2F1c2UgdGhpcyBkbyBub3QgdHJpZ2dlciBhbm90aGVyIHJlbmRlciBzY2hlZHVsZSlcbiAgICogQHBhcmFtIGxvY2FsZSBUaGUgdHJhbnNsYXRpbmcgbGV0dGVyc1xuICAgKi9cbiAgc2V0TG9jYWxlKGxvY2FsZTogTnpJMThuSW50ZXJmYWNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2xvY2FsZSAmJiB0aGlzLl9sb2NhbGUubG9jYWxlID09PSBsb2NhbGUubG9jYWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2xvY2FsZSA9IGxvY2FsZTtcbiAgICB0aGlzLl9jaGFuZ2UubmV4dChsb2NhbGUpO1xuICB9XG5cbiAgZ2V0TG9jYWxlKCk6IE56STE4bkludGVyZmFjZSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZTtcbiAgfVxuXG4gIGdldExvY2FsZUlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2FsZSA/IHRoaXMuX2xvY2FsZS5sb2NhbGUgOiAnJztcbiAgfVxuXG4gIHNldERhdGVMb2NhbGUoZGF0ZUxvY2FsZTogRGF0ZUxvY2FsZSk6IHZvaWQge1xuICAgIHRoaXMuZGF0ZUxvY2FsZSA9IGRhdGVMb2NhbGU7XG4gIH1cblxuICBnZXREYXRlTG9jYWxlKCk6IERhdGVMb2NhbGUge1xuICAgIHJldHVybiB0aGlzLmRhdGVMb2NhbGU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGxvY2FsZSBkYXRhXG4gICAqIEBwYXJhbSBwYXRoIGRvdCBwYXRocyBmb3IgZmluZGluZyBleGlzdCB2YWx1ZSBmcm9tIGxvY2FsZSBkYXRhLCBlZy4gXCJhLmIuY1wiXG4gICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgZGVmYXVsdCB2YWx1ZSBpZiB0aGUgcmVzdWx0IGlzIG5vdCBcInRydXRoeVwiXG4gICAqL1xuICBnZXRMb2NhbGVEYXRhKHBhdGg/OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSk6IGFueSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gICAgY29uc3QgcmVzdWx0ID0gcGF0aCA/IHRoaXMuX2dldE9iamVjdFBhdGgodGhpcy5fbG9jYWxlLCBwYXRoKSA6IHRoaXMuX2xvY2FsZTtcbiAgICByZXR1cm4gcmVzdWx0IHx8IGRlZmF1bHRWYWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE9iamVjdFBhdGgob2JqOiBvYmplY3QsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB8IG9iamVjdCB8IGFueSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gICAgbGV0IHJlcyA9IG9iajtcbiAgICBjb25zdCBwYXRocyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICBjb25zdCBkZXB0aCA9IHBhdGhzLmxlbmd0aDtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIHdoaWxlIChyZXMgJiYgaW5kZXggPCBkZXB0aCkge1xuICAgICAgcmVzID0gcmVzWyBwYXRoc1sgaW5kZXgrKyBdIF07XG4gICAgfVxuICAgIHJldHVybiBpbmRleCA9PT0gZGVwdGggPyByZXMgOiBudWxsO1xuICB9XG59XG4iXX0=