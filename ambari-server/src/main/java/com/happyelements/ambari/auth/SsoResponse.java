package com.happyelements.ambari.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class SsoResponse extends SsoFormat{
	public SsoResponse() { }
    public SsoResponse(long ts,String clientIp, String userName){
        super(ts,clientIp,new String[]{userName});
    }

    public static SsoResponse fromEncryptToken(String key,String token) throws FormatException, GeneralSecurityException, IOException {
    	SsoResponse sac = new SsoResponse();
		sac.initEncryptString(key, token);
		return sac;
	}
    
    public String getUserName(){
       return extInfos[0];
    }
}
