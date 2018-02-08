package com.happyelements.ambari.auth;


import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.GeneralSecurityException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.happyelements.ambari.auth.util.UserCookie;
import com.happyelements.rdcenter.commons.util.Base64;
import net.sf.json.JSONObject;
import org.apache.ambari.server.orm.dao.UserDAO;
import org.apache.ambari.server.orm.entities.UserEntity;
import org.apache.log4j.Logger;

public class PaymentAuthInteceptor {
    /*
    callbackurl : http://111.230.175.232:8080/views/ADMIN_VIEW/2.6.1.0/INSTANCE/#
key : 59cbe156db08bd96a7285b3567f160c2
appId : ambari_prod
     */
    private final String ssoAppId = "ambari_prod";
    private final String ssoAppKey= "59cbe156db08bd96a7285b3567f160c2";
    private final String ssoServerUrl="https://innersso.happyelements.com";
    private final String ssoTokenValidSeconds="600";

    static Logger logger = Logger.getLogger(PaymentAuthInteceptor.class);
    String ip = "127.0.0.1";

    //sso退出&logoff=true
    //logIn ----check logIn
    public  String logIn(HttpServletRequest request,HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String token = request.getParameter("rsptoken");
        ip=request.getRemoteAddr();
        //校验token
        if (token==null || token.length() ==0){
            //跳转sso登录页面
            SsoRequest sr = new SsoRequest(System.currentTimeMillis(), ip,request.getRequestURL().toString());
            jsonObject.put("url", ssoServerUrl + "/?appid="+ssoAppId+"&reqtoken=" + URLEncoder.encode(sr.toEncryptString(ssoAppKey), "UTF-8"));
        }else{
            //获取token
            SsoResponse ssoRsp = SsoResponse.fromEncryptToken(ssoAppKey, token);
            //校验IP&是否超时
            if (!ssoRsp.checkClientIP(ip) || !ssoRsp.checkTime(Integer.valueOf(ssoTokenValidSeconds))){
                response.setStatus(400);
                jsonObject.put("error", "sso --- IP is error or timeout");
            }
            else{
                //认证成功
                String userName = ssoRsp.getUserName();
                UserCookie.saveUserCookie(userName, response);
                jsonObject.put("name", userName);
                return  "name:"+userName;
//                UserDAO userDAO = new UserDAO();
//                UserEntity userEntity = userDAO.findSingleUserByName(userName);
//                String password = userEntity.getUserPassword();
//                String basicStr = Base64.encode(userName+":"+userEntity.getUserPassword());

//                jsonObject.put("basic", basicStr);
//                response.sendRedirect("http://111.230.175.232:8080/#/login?name="+userName+"&key="+basicStr);
            }
        }
        return jsonObject.toString();
    }
    public void logOut(HttpServletRequest request,HttpServletResponse response, String logout)throws Exception{

        if(null!=logout&&(!"".equals("logout"))){
            request.getSession().removeAttribute("userName");
            SsoRequest sr = new SsoRequest(System.currentTimeMillis(), ip,request.getRequestURL().toString());
            response.sendRedirect(ssoServerUrl + "/?appid="+ssoAppId+"&reqtoken=" + URLEncoder.encode(sr.toEncryptString(ssoAppKey), "UTF-8")+"&logoff=true");


        }
    }

    public static void main(String[] args) {
        SsoRequest sr = new SsoRequest(System.currentTimeMillis(), "127.0.0.1","http://111.230.175.232:8080/views/ADMIN_VIEW/2.6.1.0/INSTANCE/#");
        try {
            System.out.println(URLEncoder.encode(sr.toEncryptString("59cbe156db08bd96a7285b3567f160c2"), "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (FormatException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (GeneralSecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

