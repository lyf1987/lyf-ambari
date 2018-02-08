package com.happyelements.ambari.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class SsoAppCookie extends SsoFormat {
	public SsoAppCookie() { }
	
	public static SsoAppCookie fromEncryptToken(String key,String token) throws FormatException, GeneralSecurityException, IOException {
		SsoAppCookie sac = new SsoAppCookie();
		sac.initEncryptString(key, token);
		return sac;
	}
    public SsoAppCookie(long ts,String clientIp, String userName){
        super(ts,clientIp,new String[]{userName});
    }

    public String getUserName(){
       return extInfos[0];
    }
}
