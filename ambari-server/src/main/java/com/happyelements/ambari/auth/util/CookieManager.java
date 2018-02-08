package com.happyelements.ambari.auth.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieManager {

	public static String getCookie(HttpServletRequest request, String key) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null || cookies.length == 0)
			return null;
		for (int i = 0; i < cookies.length; i++) {
			if (cookies[i].getName().equals(key))
				return cookies[i].getValue();
		}
		return null;
	}

	public static void saveCookie(HttpServletResponse response, String key, String value) {
		saveCookie(response, key, value, null);
	}

	public static void saveCookie(HttpServletResponse response, String key, String value, String domain) {
		saveCookie(response, key, value, -1, domain);
	}

	public static void saveCookie(HttpServletResponse response, String key, String value, int second, String domain) {
		saveCookie(response, key, value, second, domain, "/");
	}

	public static void saveCookie(HttpServletResponse response, String key, String value, int second, String domain, String path) {
		Cookie cookie = new Cookie(key, value);
		cookie.setPath(path);
		cookie.setMaxAge(second);
		if (domain != null) {
			cookie.setDomain(domain);
		}
		response.addCookie(cookie);
	}

	public static void clearCookie(HttpServletResponse response, String key) {
		clearCookie(response, key, null, "/");
	}

	public static void clearCookie(HttpServletResponse response, String key, String domain, String path) {
		Cookie cookie = new Cookie(key, null);
		cookie.setPath(path);
		if (domain != null) {
			cookie.setDomain(domain);
		}
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

}
