var app = getApp()
Page({
  data:{

  },

//林航辉
//13016352863
//南门
//榕三
//1
//今天下午5点送达
  formSubmit: function (event) {
    
    if(app.globalData.userInfo!=null){

      console.log('form发生了submit事件，携带数据为：', event.detail.value)
      wx.request({
        url: 'http://localhost:8080/helpe/addorder',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',//默认值
          "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
        },
        data: {
          openId: app.globalData.userInfo.openId,
          telephone: event.detail.value.phone,
          name: event.detail.value.name,
          takeAdd: event.detail.value.takeadd,
          sendAdd: event.detail.value.sendadd,
          count: event.detail.value.count,
          remark: event.detail.value.remark
        },
        success(res) {
          if (res.data.status == 1) {
            console.log('访问服务器下单接口成功')
            app.globalData.orderList = res.data.orderList
            wx.redirectTo({
              url: '/pages/index/index'
            })
          } else {
            console.log('服务器出错')
          }
        },
        fail(err) {
          console.log(err)
        }

      })
      
    } else{
      wx.showToast({
        title: '请先登录',
        success: function (res) {
          console.log(res)
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/index/index?choose_index=2'
            })
          }, 1000)
        },
      })
    }
    
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})