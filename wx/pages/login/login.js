// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    tipMessage: ''
  },

  handleLogin: function(){
    const that = this;

    //显示加载状态
    that.setData({
        loading: true,
        tipMessage: ''
    });

    
    
    //获取微信登录凭证code
    wx.login({
      success: (res) => {
        if(res.code){
            //调用后端接口，获取openid
            console.log(res.errMsg)
            that.requestOpenid(res.code);
        }else{
            //获取失败
            that.setData({
                loading: false,
                tipMessage: '登录失败' + res.errMsg
            });
            console.log('登录失败!'+ res.errMsg);
            console.log(res.code)
        }
        fail: (res) => {
            // 登录接口调用失败
        that.setData({
            loading: false,
            tipMessage: '登录失败：' + err.errMsg
          });
          console.error('登录接口调用失败！' + err.errMsg);
        }
      },
    })

  },

  requestOpenid: function(codeid){
      const that = this;


        wx.cloud.callFunction({
            name: 'myCloudFunction',
            data:{
                type:"getOpenId",
                code:codeid
            },
        }).then((resp) =>{
            //隐藏加载状态
            that.setData({
                loading: false
            });
                    //保存openid到本地存储
            wx.setStorageSync('openid', resp.result.openid)
            console.log(resp.result.openid)

                    //登录成功，跳转到用户须知界面
             wx.redirectTo({
                url: '/pages/disclaimer/disclaimer',
            })
        })

        /*
      //发送POST请求
      wx.request({
        url: apiUrl ,
        method: 'POST',
        data: {
            code: codeid
        },
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
            //隐藏加载状态
            that.setData({
                loading: false
            });

            //检查后端返回状态
            if(res.statusCode === 200 && res.data){
                if(res.data.data.openid && res.data.data){
                    //保存openid到本地存储
                    wx.setStorageSync('openid', res.data.data.openid)

                    //登录成功，跳转到用户须知界面
                    wx.redirectTo({
                      url: '/pages/disclaimer/disclaimer.wxml',
                    })
                }else{
                    //后端返回错误信息
                    that.setData({
                        tipMessage: res.data.message || '登录失败，请重试'
                    });
                }
            }else{
                that.setData({
                    tipMessage: '服务器异常，请稍后重试'
                });
                console.log('接口请求失败：', res);
            }
        },
        fail: function(err){
            //请求失败
            that.setData({
                loading: false,
                tipMessage: '网络异常，请检查网络后重试'
            });
            console.log('请求发送失败：', err);
        }
      });*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //检查是否已经登录，若登录，直接跳转到首页
    const openid = wx.getStorageSync('openid');
    if(openid){
        wx.redirectTo({
          url: '/pages/disclaimer/disclaimer.wxml',
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})