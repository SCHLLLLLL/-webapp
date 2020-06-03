// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    isEmpty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openId = options.openId
    wx.request({
      url: 'http://localhost:8080/helpe/myOrder',
      header: { "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")},
      method:"GET",
      data: {
        openId: openId
      },
      success(res) {
        console.log(res)
        if(res.data.orderList==null) {
          that.setData({
            isEmpty: true
          })
        } else{
          that.setData({
            orderList: res.data.orderList
          })
        }
      }
    })
  },


})