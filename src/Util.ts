export module Util {

    export function isUndefined(x: any) {
        return !this.isDefined(x);
    }

    export function isDefined(x: any): boolean {
        return x !== null && x !== undefined;
    }

    export function first<T>(x: T[]): T {
        return x[0];
    }

}
