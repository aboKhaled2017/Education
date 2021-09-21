export const Routes = {
    base: location.origin,
    get adminArea() {
        return `${this.base}/Admin`
    },
    get AdminApi() {
        return `${this.base}/AdminApi`
    },
    get UpdateAccountName() {
        return `${this.adminArea}/UpdateName`
    },
    get UpdateAccount() {
        return `${this.adminArea}/UpdateAccount`;
    },
    makeUrlQuery(base: string, ...routeValues: { prop: string, val: any }[]) {
        let str = `${base}`;
        for (let prop of routeValues)
            str += `?${prop.prop}=${prop.val}`
        return str;
    }
}

