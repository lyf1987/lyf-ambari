package com.happyelements.ambari.auth.util;

import java.io.UnsupportedEncodingException;

import com.happyelements.rdcenter.commons.util.tuple.Tuple;
import com.happyelements.rdcenter.commons.util.tuple.TwoTuple;

public class ConfigMathUtil {


    public static TwoTuple<byte[], byte[]> createKeyAndIv(byte[] src) {
        byte[] md5 = com.happyelements.rdcenter.commons.util.MathUtil.md5Bytes(src);
        byte[] sha1 = com.happyelements.rdcenter.commons.util.MathUtil.sha1Bytes(src);
        byte[] encKey = new byte[24];
        byte[] encIv = new byte[8];
        System.arraycopy(md5, 0, encKey, 0, md5.length);
        System.arraycopy(sha1, 0, encKey, 16, 8);
        System.arraycopy(sha1, 8, encIv, 0, 8);
        return Tuple.tuple(encKey, encIv);
    }

    public static TwoTuple<byte[], byte[]> createKeyAndIv(String src) {
        try {
            return createKeyAndIv(src.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }
}
