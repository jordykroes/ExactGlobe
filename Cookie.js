

class Cookie {
    constructor()
    {
        Cookie.setupCookies();
    }

    static setupCookies() {
        for (const cookie of Cookie.jar) {
            if (!Cookie.getCookie(cookie))
            {
                Cookie.setCookie(cookie, Cookie[cookie]);
            }
        }
    }
    static sliceLength = 10;
    static wrapLength = 80;
    static jar = ['wrapLength', 'sliceLength'];

    static setCookie(cookie, value) {
        document.cookie = `${cookie}=${value}`;
    }

    static getCookie(cookie) {
        return document.cookie.split("; ").find((row) => row.startsWith(`${cookie}`)).split("=")[1];
    }
}