# API接口文档

## 基础信息

- 接口地址：[http://oursite.com/api]
- 请求方式：POST
- 返回格式：JSON

## 接口列表

### 1. 用户登录

#### 1.1 接口概述

用于用户通过微信一键登录小程序，前端发送 code 后，后端返回相关数据，包括筛选表数据、健康指导数据及用户筛选历史数据。

#### 1.2 请求信息

- 接口地址：/user/login
- 请求参数：
  - code : string

#### 1.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
  - screeningTables : ObjectArray
  - healthGuidance : ObjectArray
  - screeningHistory : ObjectArray

#### 1.4 注意

后端服务器获得code后，通过微信小程序提供的接口，获取用户的openid和session_key。openid是微信官方提供的用户唯一标识，session_key是用户登录态的会话密钥，用于解密用户敏感数据。openid作为后端和前端识别用户的唯一标识。详情见小程序开发文档。

### 2. 用户登出

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

### 3. 发送用户筛选表

#### 3.1 接口概述

用于用户提交筛选表，前端发送筛选表数据后，后端进行分析后，保存筛选结果，并返回结果和健康指导，以及更新用户记录，并返回用户记录。

#### 3.2 请求信息

- 接口地址：/user/screening
- 请求参数：
  - screeningData : ObjectArray

#### 3.3 返回参数

- 响应状态码： 200(成功)
- 响应数据：
  - screeningResult : ObjectArray
  - healthGuidance : ObjectArray
  - screeningHistory : ObjectArray
