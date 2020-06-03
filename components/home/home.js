// components/home/home.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    advs: [],
    orderList:{}
  },
  attached: function () {
    var that = this
    wx.request({
      url: 'http://localhost:8080/helpe/index',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',//默认值
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      success: function (res) {
        app.globalData.orderList = res.data.orderList
        
        that.setData({
          orderList: res.data.orderList,
          advs: app.globalData.advs
          // advs: res.data.orderList
        })
      },
      fail: function () {
        console.log('homejs请求服务器错误')
      }
    })
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
