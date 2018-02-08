package com.happyelements.ambari.auth.util;

import static com.happyelements.ambari.auth.util.CookieManager.*;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.happyelements.rdcenter.commons.util.ArrayUtil;
import com.happyelements.rdcenter.commons.util.Base64;
import com.happyelements.rdcenter.commons.util.MathUtil;
import com.happyelements.rdcenter.commons.util.StringUtil;
import com.happyelements.rdcenter.commons.util.tuple.TwoTuple;

public class UserCookie {

	private String name;
	private long time;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	private static final String USER_KEY = "t";
	private static final String USER_ENC_KEY = "_)Phj1d8GFyt$%^uvb+";
	private static final TwoTuple<byte[], byte[]> USER_ENC_KEY_IV;
	private static final long USER_OPERATE_EXPIRE = TimeUnit.HOURS.toMillis(24);

	static {
		USER_ENC_KEY_IV = ConfigMathUtil.createKeyAndIv(USER_ENC_KEY);
	}

	private static String encryptToUserCookie(String userName) throws GeneralSecurityException {
		long sec = System.currentTimeMillis();
		String str = sec + "," + userName;
		byte[] buf;
		try {
			buf = str.getBytes("UTF-8");
		} catch (UnsupportedEncodingException ex) {
			return null;
		}
		byte[] md5 = MathUtil.md5Bytes(buf);
		byte[] srcBuf = new byte[md5.length + buf.length];
		System.arraycopy(md5, 0, srcBuf, 0, md5.length);
		System.arraycopy(buf, 0, srcBuf, md5.length, buf.length);
		buf = MathUtil.tripleDesCBCEncrypt(USER_ENC_KEY_IV, srcBuf);
		return new String(Base64.encode(buf));
	}

	private static UserCookie decryptFromCookie(String cookie) throws GeneralSecurityException {
		byte[] buf = Base64.decode(cookie.getBytes());
		buf = MathUtil.tripleDesCBCDecrypt(USER_ENC_KEY_IV, buf);
		byte[] md5 = new byte[16];
		System.arraycopy(buf, 0, md5, 0, 16);
		byte[] md5Now = MathUtil.md5Bytes(buf, 16, buf.length - 16);
		if (!ArrayUtil.sameArray(md5, md5Now)) {
			return null;
		}
		String str;
		try {
			str = new String(buf, 16, buf.length - 16, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return null;
		}
		String[] ss = str.split(",");
		if (ss.length < 2) {
			return null;
		}
		long time = Long.parseLong(ss[0]);
		if (System.currentTimeMillis() - time > USER_OPERATE_EXPIRE) {
			return null;
		}
		UserCookie uc = new UserCookie();
		uc.setTime(time);
		uc.setName(ss[1]);
		return uc;
	}

	public static String getUserNameFromCookie(HttpServletRequest request) {
		String cookie = getCookie(request, USER_KEY);
		if (!StringUtil.isEmpty(cookie)) {
			try {
				UserCookie uc = decryptFromCookie(cookie);
				return uc != null ? uc.getName() : null;
			} catch (GeneralSecurityException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static void saveUserCookie(String userName, HttpServletResponse response) {
		try {
			saveCookie(response, USER_KEY, encryptToUserCookie(userName));
		} catch (GeneralSecurityException e) {
			e.printStackTrace();
		}
	}

	public static void clearUserCookie(HttpServletResponse response) {
		clearCookie(response, USER_KEY);
	}

}
