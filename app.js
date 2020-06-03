//app.js
App({
  globalData:{
    header: {
       'Cookie': 'JSESSION=***' 
       },
    appid:null,
    appIconUrl:"/images/user.jpg",
    userInfo:null,
    hasUserInfo:false,
    advs: [
      {
        img: "/images/adv.jpg"
      },
      {
        img: "/images/adv2.png"
      }
    ],
    orderList: []
  },
  getSession: function () {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: 'http://localhost:8080/helpe/login',
            method: "GET",
            data: {
              code: res.code
            },
            success(res) {
              console.log(res)
              wx.setStorageSync("openId", res.data.openId)
              wx.setStorageSync("sessionId", res.data.sessionId)
              wx.setStorageSync("session_key", res.data.session_key)
            },
            fail(err) {
              console.log('appjs请求服务器失败')
            }
          })
        }
      },
      fail(err) {
        console.log('请检查网络，微信授权失败')
      }
    })
  },
  refresh: function () {
    var that = this
    setInterval(that.getSession, 20 * 60 * 1000);
  },
  onLaunch: function(e){
    this.getSession();
    this.refresh();
    console.log('appOnLaunchsessionId:' + wx.getStorageSync("sessionId"))
  },

  
  
})