var app = getApp()
Component({
  data: {
    itemlist: [{
        itemname: "approve",
        itemtitle: "成为认证用户",
        itemimage: "/images/approve.png",
      },
      {
        itemname: "myput",
        itemtitle: "我的发布",
        itemimage: "/images/issue.png",
      },
      {
        itemname: "myorder",
        itemtitle: "我的接单",
        itemimage: "/images/order.png",
      },
      {
        itemname: "wallet",
        itemtitle: "钱包",
        itemimage: "/images/wallet.png",
      }

    ],
    userInfo: {},
    hasUserInfo: false
  },

  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },
  methods: {

    navTo: function(e) {
      var target = e.currentTarget.dataset.target
      var targeturl
      if (target == 'approve') {
        targeturl = '/pages/approve/approve'
      }
      if (target == 'myput') {
        targeturl = '/pages/myput/myput'
      }
      if (target == 'myorder') {
        targeturl = '/pages/myorder/myorder'
      }
      if (target == 'wallet') {
        targeturl = '/pages/wallet/wallet'
      }
      if (target == 'user') {
        targeturl = '/pages/user/user'
      }
      if (target == 'about') {
        targeturl = '/pages/about/about'
      }

      wx.navigateTo({
        url: targeturl+"?openId="+e.currentTarget.dataset.openid
      });
    },

    toedit: function(params) {
      wx.navigateTo({
        url: "/pages/user/user"
      })
    },

    navNotTo: function(e) {

      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    },

    login: function(event) {
      var that = this
      wx.request({
        url: 'http://localhost:8080/helpe/login', //服务接口地址
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
        },
        data: {
          encryptedData: event.detail.encryptedData,
          iv: event.detail.iv,
          openId: wx.getStorageSync("openId"),
          session_key: wx.getStorageSync("session_key")
        },
        success: function (res) {
          console.log(res)

          if (!res.data.userInfo.bind) {

            //未注册，跳转到注册页面
            if (res.data.status == 1) {
              app.globalData.userInfo = res.data.userInfo
              app.globalData.hasUserInfo = false
              that.setData({
                userInfo: app.globalData.userInfo,
              })

            } else {
              console.log(res.data.msg)
              app.globalData.error = res.msg
              wx.navigateTo({
                url: '/pages/error/error',
              })
            }
            wx.redirectTo({
              url: '/pages/register/register',
            })
          } else {
            //注册过了 重定向进me页面
            app.globalData.userInfo = res.data.userInfo
            app.globalData.hasUserInfo = true

            wx.redirectTo({
              url: '/pages/index/index?choose_index=2',
            })
          }


        },
        fail: function () {
          console.log('请求服务器错误')
        }
      })
    }



  }


})