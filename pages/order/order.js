var items = ['取消订单']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    processData: [{
      name: '新发布',
      start: '#fff',
      end: '#EFF3F6',
      icon: '/images/process_1.png'
    },
    {
      name: '被接单',
      start: '#EFF3F6',
      end: '#EFF3F6',
      icon: '/images/process_1.png'
    },
    {
      name: '已完成',
      start: '#EFF3F6',
      end: '#fff',
      icon: '/images/process_1.png'
    }
    ],
    order:{},
    flag:1,
    actionSheetHidden: true,
    actionSheetItems: items

  },

  changeTap() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  clickitem1: function () {
    console.log("取消订单");
  },
  //13543021725
  //吉林大学珠海学院
  //进度条的状态
  setPeocessIcon: function () {
    
    var processArr = this.data.processData
    // console.log("progress", this.data.detailData.progress)
    var state = this.data.order.state
    for (var i = 0; i < state+1; i++) {  
      if (i == state) {
        processArr[i].icon = '/images/process_3.png'
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#EFF3F6"
      } else {
        processArr[i].icon = '/images/process_2.png'
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      }
    }
    
    processArr[0].start = "#fff"
    processArr[2].end = "#fff"
    this.setData({
      processData: processArr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    wx.request({
      url: 'http://localhost:8080/helpe/order',
      method: "GET",
      data : {
        orderId : id
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded',//默认值
        "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      success: function(res){
        console.log(res)
        that.setData({
          order: res.data.order,
          flag: res.data.flag
        })
        that.setPeocessIcon()
      }
    })
  
  },
  accOrder: function(e) {
    wx.request({
      url: 'http://localhost:8080/helpe/accOrder',
      method:"GET",
      header: {
         "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
      },
      data:{
        orderId: e.currentTarget.dataset.orderid
      },
      success(res) {
        console.log(res)
        if(!res.data.isLogin) {
          //未登录
          wx.showToast({
            title: '请先登录',
            success: function (res) {
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/index/index?choose_index=2'
                })
              }, 1000)
            },
          })
        } else{
          if(res.data.accResult) {
            wx.showToast({
              title: '接单成功',
              success: function (res) {
                setTimeout(function () {
                  wx.redirectTo({
                    url: '/pages/order/order?id=' + e.currentTarget.dataset.orderid
                  })
                }, 1000)
              },
            })
          }else{
            wx.showToast({
              title: '接单失败',
              success: function (res) {
                setTimeout(1000)
              },
            })
          }
        }
      }
    })
  },

  completeOrder: function(e) {
    var id = e.currentTarget.dataset.orderid
    wx.showModal({
      title: '提示',
      content: '确认已完成订单吗',
      success(sm) {
        if (sm.confirm) {
          //用户点击了确定，可以调用完成方法
          wx.request({
            url: 'http://localhost:8080/helpe/completeOrder',
            method: 'GET',
            header: {
              "Cookie": "JSESSIONID=" + wx.getStorageSync("sessionId")
            },
            data: {
              orderId: id
            },
            success(res) {
              console.log(res)
              if (res.data.comResult) {
                wx.showToast({
                  title: '提交成功',
                  success: function () {
                    setTimeout( function () {
                      wx.redirectTo({
                        url: '/pages/order/order?id=' + id
                      })
                    },1000)
                      
                  }
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  success: function (res) {
                    setTimeout(1000)
                  },
                })
              }
              
            }
          })
        } else if(sm.cancel) {

        }
      }
    })
    
  },

  call: function(e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.telephone,
    })
  }
  
})