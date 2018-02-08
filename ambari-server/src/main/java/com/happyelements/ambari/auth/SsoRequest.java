package com.happyelements.ambari.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class SsoRequest extends SsoFormat{
    public SsoRequest() { }
    public SsoRequest(long ts,String clientIp, String url){
        super(ts,clientIp,new String[]{url});
    }
    
    public static SsoRequest fromEncryptToken(String key,String token) throws FormatException, GeneralSecurityException, IOException {
    	SsoRequest sac = new SsoRequest();
		sac.initEncryptString(key, token);
		return sac;
	}

    public String getUrl(){
       return extInfos[0];
    }
}