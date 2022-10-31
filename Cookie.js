var BrowserCookies;
(function (BrowserCookies) {
    BrowserCookies["ConvertTabs"] = "ConvertTabs";
    BrowserCookies["WrapLength"] = "WrapLength";
    BrowserCookies["SliceLength"] = "SliceLength";
})(BrowserCookies || (BrowserCookies = {}));
class Cookie {
    constructor() {
        Cookie.setupCookies();
    }
    static setupCookies() {
        for (const cookie in BrowserCookies) {
            if (!Cookie.getCookie(cookie)) {
                Cookie.setCookie(cookie, String(Cookie[cookie]));
            }
        }
    }
    static setCookie(cookie, value) {
        document.cookie = `${cookie}=${value};samesite=strict`;
    }
    static getCookie(cookie) {
        var cookies = document.cookie.split("; ");
        var foundCookie = cookies.find((row) => row.startsWith(`${cookie}`));
        if (!foundCookie) {
            return undefined;
        }
        else {
            return foundCookie.split("=")[1];
        }
    }
}
Cookie.ConvertTabs = true;
Cookie.WrapLength = 80;
Cookie.SliceLength = 10;
