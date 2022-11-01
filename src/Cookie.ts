enum BrowserCookies {
  ConvertTabs = "ConvertTabs",
  WrapLength = "WrapLength",
  SliceLength = "SliceLength",
}

class Cookie {
  constructor() {
    Cookie.setupCookies();
  }

  static ConvertTabs = true;
  static WrapLength = 80;
  static SliceLength = 10;

  static setupCookies() {
    for (const cookie in BrowserCookies) {
      if (!Cookie.getCookie(cookie)) {
        Cookie.setCookie(cookie, String(Cookie[cookie]));
      }
    }
  }

  static setCookie(cookie: string, value: string) {
    document.cookie = `${cookie}=${value};samesite=strict`;
  }

  static getCookie(cookie: string) {
    var cookies: Array<string> = document.cookie.split("; ");
    var foundCookie = cookies.find((row) => row.startsWith(`${cookie}`));

    if (!foundCookie) {
      return undefined;
    } else {
      return foundCookie.split("=")[1];
    }
  }
}
