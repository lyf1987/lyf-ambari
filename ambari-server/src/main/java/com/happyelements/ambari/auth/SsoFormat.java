package com.happyelements.ambari.auth;

import java.io.IOException;
import java.security.GeneralSecurityException;

public class SsoFormat {
	 static boolean checkIP = false;
     
     public long timeStamp;
     public String clientIP;
     public String[] extInfos;

     public SsoFormat() { }
     public SsoFormat(long ts, String clientIp, String[] exts)
     {
         this.clientIP = clientIp;
         this.timeStamp = ts;
         this.extInfos = exts;
     }
     
     protected void initEncryptString(String key,String encstr) throws FormatException, GeneralSecurityException, IOException{
         String str = SsoUtil.desDecryptAndCheckToString(key, encstr);
         String[] ss = str.split(",");
         if (ss.length < 3) throw new FormatException("Cookie format error");
         String[] exts = new String[ss.length - 2];
         for (int i = 2; i < ss.length; i++)
             exts[i-2] = ss[i];
         this.timeStamp = Long.parseLong(ss[0])*1000;
         this.clientIP = ss[1];
         this.extInfos = exts;            
     }
  

     public String toEncryptString(String key) throws FormatException, GeneralSecurityException
     {
    	 long tsShort = timeStamp /1000;
         return SsoUtil.hashAndDesEncrypt(key,tsShort+ "," + clientIP + "," + SsoUtil.join(",",extInfos));
     }

     public boolean checkTime(long utms, int validSeconds)
     {
         if (utms - timeStamp > validSeconds*1000l) return false;
         else return true;
     }

     public boolean checkTime(int validSeconds)
     {
         return checkTime(System.currentTimeMillis(), validSeconds);
     }

     public boolean checkClientIP(String ip)
     {
         if (!checkIP) return true;
         return this.clientIP == ip;
            
     }
}
