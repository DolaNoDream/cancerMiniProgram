package com.cancerProgram.controller;


import com.alibaba.fastjson.JSONObject;
import com.cancerProgram.utils.HttpClientUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import java.util.Map;

@WebServlet("/user/login")
public class Login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        String code = req.getParameter("code");
        String openId = getUserOpenId(code);
        resp.setContentType("application/json;charset=UTF-8");
        resp.setStatus(HttpServletResponse.SC_OK);
        JSONObject responseJson = new JSONObject();
        responseJson.put("openId", openId);
        PrintWriter out = resp.getWriter();
        out.print(responseJson.toJSONString());
        out.flush();
    }

    public String getUserOpenId(String code) {
            Map<String, String> buildParams = buildParams(code);
            String url = "https://api.weixin.qq.com/sns/jscode2session";
            String result = HttpClientUtil.sendPost(url, buildParams);
            if (result == null) {
                throw new RuntimeException("获取openId失败");
            }
            System.out.println("post请求获取结果:"+result);

            // 解析出openId
            JSONObject jsonObject = JSONObject.parseObject(result);
            String openid = jsonObject.getString("openid");
            return openid;
        }
        private Map<String, String> buildParams(String code) {
            Map<String, String> paramsMap = new HashMap<>();
            paramsMap.put("appid", "wx0751a6fb21e26b37");
            paramsMap.put("secret", "f2654014abd5650f9349790ff7beb736");
            paramsMap.put("js_code", code);
            paramsMap.put("grant_type", "authorization_code");
            return paramsMap;
        }
}
