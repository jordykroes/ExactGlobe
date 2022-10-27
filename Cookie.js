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
    static convertSpaces = true;
    static sliceLength = 10;
    static wrapLength = 80;

    static jar = ['convertSpaces', 'wrapLength', 'sliceLength'];

    static setCookie(cookie, value) {
        document.cookie = `${cookie}=${value};samesite=strict`;
    }

    static getCookie(cookie) {
        var cookies = document.cookie.split("; ");
        var foundCookie = cookies.find((row) => row.startsWith(`${cookie}`));
        
        if (!foundCookie) {
            return undefined
        }
        else {
            return foundCookie.split("=")[1];
        }
    }
}