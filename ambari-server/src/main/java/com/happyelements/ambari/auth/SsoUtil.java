package com.happyelements.ambari.auth;

import com.happyelements.rdcenter.commons.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.servlet.http.*;

import java.io.IOException;
import java.lang.reflect.Array;
import java.nio.charset.Charset;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.MessageDigest;


public class SsoUtil {
	static final int HASH_LEN = 16;
	static Charset utf8 ;
	static{
		utf8 = Charset.forName("utf-8");
	}
	
    static byte toBin(char c) throws FormatException
    {
        if (c >= 0x30 && c <= 0x39)
            return (byte)(c - 0x30);
        else if (c >= 'a' && c <= 'f')
            return (byte)(c - 'a' + 10);
        else if (c >= 'A' && c <= 'F')
            return (byte)(c - 'A' + 10);
        else
            throw new FormatException("'" + c + "' in hex string");

    }

    public static byte[] hexDecode(String msg) throws FormatException
    {
        if ((msg.length() & 1) != 0)
            throw new FormatException("decode length error");

        byte[] buf = new byte[msg.length() / 2];
        int j = 0;
        for (int i = 0; i < msg.length(); i += 2)
        {
            buf[j++] = (byte)((toBin(msg.charAt(i)) << 4) | toBin(msg.charAt(i + 1)));
        }
        return buf;
    }

    public static Object ArrayMerge(Class<?> cls,Object... bufs)
    {
        int len = 0;
        for (int i = 0; i < bufs.length; i++)
        {
            len += Array.getLength(bufs[i]);
        }

        Object newBuf = Array.newInstance(cls, len);
        int index = 0;
        for (int i = 0; i < bufs.length; i++)
        {
        	len = Array.getLength(bufs[i]);
            System.arraycopy(bufs[i], 0, newBuf, index, len);
            index += len;
        }
        return newBuf;
    }

    public static String join(String seperator,String[] strs){
    	StringBuilder builder=  new StringBuilder();
    	for(int i=0;i<strs.length;i++){
    		if(builder.length() >0) builder.append(seperator);
    		builder.append(strs[i]);
    	}
    	return builder.toString();
    }
    
    public static String hexEncode(byte[] encodedBytes)
    {
        StringBuilder builder = new StringBuilder(encodedBytes.length * 2);
        for (int i = 0; i < encodedBytes.length; i++){
            builder.append(String.format("%02x", encodedBytes[i]));
        }
        return builder.toString();
    }

    static class DesContext{
    	public byte[] desKey;
    	public byte[] desIV;
    	
    	public Key getKey(){
    		return new javax.crypto.spec.SecretKeySpec(desKey, "DES");
    	}
    	
    	public IvParameterSpec getIV(){
    		return new IvParameterSpec(desIV);
    	}
    }
    
    static DesContext decodeKeyIv(String key) throws FormatException
    {
    	DesContext dc = new DesContext();
    	
        String sk = key.substring(0, 16);
        String siv = key.substring(16);
        dc.desKey = hexDecode(sk);
        dc.desIV = hexDecode(siv);
        return dc;
    }
    
    
    public static byte[] md5(byte[] buf,int offset,int len){
    	try{
	    	MessageDigest md = MessageDigest.getInstance("md5");
	    	md.update(buf,offset,len);
	    	byte[] hash = new byte[16];
	    	md.digest(hash,0,16);
	    	return hash;
    	}catch(Exception ex){
    		return null;
    	}
    }
    public static byte[] md5(byte[] buf){
    	try{
	    	MessageDigest md = MessageDigest.getInstance("md5");
	    	return md.digest(buf);  
    	}catch(Exception ex){
    		return null;
    	}
    }

    public static String hashAndDesEncrypt(String key, byte[] buf) throws FormatException, GeneralSecurityException{
    	byte[] hash = md5(buf);
        byte[] newBuf = (byte[])ArrayMerge(Byte.TYPE,hash, buf);
        return desEncrypt(key, newBuf);
    }

    public static String hashAndDesEncrypt(String key, String str) throws FormatException, GeneralSecurityException
    {
        return hashAndDesEncrypt(key, str.getBytes(utf8));
    }

    public static String desEncrypt(String key, byte[] buf) throws FormatException, GeneralSecurityException{
    	if (key.length() < 32) throw new FormatException("key format not correct");
    	DesContext dc = decodeKeyIv(key);
    	
    	Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding"); 
    	cipher.init(Cipher.ENCRYPT_MODE, dc.getKey(),dc.getIV());
    	
    	return new String(Base64.encode(cipher.doFinal(buf)));
    	
    }

    public static byte[] desDecrypt(String key, String b64) throws FormatException, GeneralSecurityException, IOException{
    	if (key.length() < 32) throw new FormatException("key format not correct");
    	byte[] enc = Base64.decode(b64.getBytes());
    	
    	DesContext dc = decodeKeyIv(key);    	
    	Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding"); 
    	cipher.init(Cipher.DECRYPT_MODE, dc.getKey(),dc.getIV());
    	return cipher.doFinal(enc);
    }

    public static byte[] desDecryptAndCheck(String key, String b64) throws FormatException, GeneralSecurityException, IOException{
        byte[] dec = desDecrypt(key, b64);
        if (dec.length < HASH_LEN) throw new FormatException("Invalid format");
        byte[] ret = new byte[dec.length - HASH_LEN];
        System.arraycopy(dec, HASH_LEN, ret, 0, dec.length - HASH_LEN);
        
        byte[] hash = md5(ret);
        for(int i=0;i<hash.length;i++)
            if (hash[i] != dec[i]) throw new FormatException("Checksum not correct");

        return ret;
    }

    public static String desDecryptAndCheckToString(String key, String b64) throws FormatException, GeneralSecurityException, IOException
    {
        byte[] buf = desDecryptAndCheck(key,b64);
        return new String(buf,utf8);
    }

  

    public static String getIPAddress(HttpServletRequest req){
        return req.getRemoteAddr();
    }

    public static String getCookie(HttpServletRequest req,String name) {
    	//this is shit, need to use RequestContext to wrap HttpServletRequest
    	Cookie[] cookies = req.getCookies();
    	for(int i=0;i<cookies.length;i++){
    		if(cookies[i].getName().equals(name))
    			return cookies[i].getValue();
    	}
    	return null;
    }
}
