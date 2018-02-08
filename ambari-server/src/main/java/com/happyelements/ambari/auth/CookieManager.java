package com.happyelements.ambari.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;

import javax.servlet.http.*;

public class CookieManager {
	static final String ssoCookieKey="appuser";
	 public static void setSsoAppCookie(HttpServletResponse response, 
			 String ip, String userName,String ssoKey) throws FormatException, GeneralSecurityException{
		 SsoAppCookie ssc = new SsoAppCookie(System.currentTimeMillis(), ip, userName);
		 
         response.addCookie(new Cookie(ssoCookieKey, ssc.toEncryptString(ssoKey)));
     }
	 
     public static SsoAppCookie getSsoAppCookie(HttpServletRequest request,String ssoKey) throws FormatException, GeneralSecurityException, IOException{         
    	 String cookie = SsoUtil.getCookie(request,ssoCookieKey);
         if (cookie != null )
             return SsoAppCookie.fromEncryptToken(ssoKey, cookie);
         else
             return null;
     }
     
     public static void ClearSsoCookie(HttpServletResponse response){
         response.addCookie(new Cookie(ssoCookieKey, ""));
     }
}
