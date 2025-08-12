# API接口文档

## 基础信息

- 接口地址：[http://oursite.com/api]
- 请求方式：POST
- 返回格式：JSON

## 接口列表

### 1. 用户登录

#### 1.1 接口概述

用于用户通过微信一键登录小程序，前端发送 code 后，后端返回openid。openid作为后端和前端识别用户的唯一标识。

#### 1.2 请求信息

- 接口地址：/user/login
- 请求参数：
  - code : string

#### 1.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
  - openid : string

#### 1.4 注意

后端服务器获得code后，通过微信小程序提供的接口，获取用户的openid和session_key。openid是微信官方提供的用户唯一标识，session_key是用户登录态的会话密钥，用于解密用户敏感数据。openid作为后端和前端识别用户的唯一标识。详情见小程序开发文档。

### 2. 用户登出（待定，可能不需要）

#### 2.1 接口概述

用于用户退出登录，前端发送请求后，后端清除用户登录状态。

#### 2.2 请求信息

- 接口地址：/user/logout
- 请求参数：
  - 无

#### 2.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
    -  success : boolean
    -  message : string

### 3. 获取历史记录

#### 3.1 接口概述

用于获取用户的历史记录，前端发送请求后，后端返回用户的历史记录。前端发送openid，后端根据openid查询数据库，返回用户的历史记录。后端只需要存储用户的风险等级，健康指导根据风险等级动态生成。

#### 3.2 请求信息

- 接口地址：/user/screening
- 请求参数：
  - openid : string

#### 3.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
  - riskLevel : string(high, low)

### 4. 更新历史记录

#### 4.1 接口概述

用于更新用户的历史记录，前端发送请求后，后端更新用户的历史记录。前端发送openid和riskLevel，后端根据openid查询数据库，更新数据库。

#### 4.2 请求信息

- 接口地址：/user/screening
- 请求参数：
  - openid : string
  - riskLevel : string(high, low)

#### 4.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
    -  success : boolean
    -  message : string

