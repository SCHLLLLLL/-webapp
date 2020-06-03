var app = getApp()
Page({
  data: {
    user:{}
  },

  onLoad: function(options) {
    var that = this
    that.setData({
      user: app.globalData.userInfo
    })
    console.log(that.user)
  },

  //13016352863
  //吉林大学珠海学院
  formSubmit: function(event) {
    console.log(event.detail.value)
    wx.request({
      url: 'http://localhost:8080/helpe/register',
      header: { "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")},
      data: {
        openId: event.detail.value.openId,
        telephone: event.detail.value.phone,
        school: event.detail.value.school
      },
      success(res) {
        console.log(res)
        if(res.data.flag) {
          app.globalData.userInfo = res.data.userInfo
          app.globalData.hasUserInfo = true
          wx.showToast({
            title: '注册成功',
          }),
          wx.redirectTo({
            url: '/pages/index/index?choose_index=2',
          })
        }else{
          wx.showToast({
            title: '注册失败',
          })
        }
      },
      fail(){
        console.log("请求注册服务器出错")
      }
    })
  }
})