var app = getApp()
Page({

  data: {
    user: {}
  },

  formSubmit: function(event) {
    console.log('form发生了submit事件，携带数据为：', event.detail.value)
  },

  onLoad: function() {
    this.setData({
      user: app.globalData.userInfo
    });
  },

  //未点完成失去焦点复原（change优先于blur触发）
  blurName: function(e) {
    this.setData({
      name: wx.getStorageSync('name')
    });
  },

  changeName: function(e) {
    var name = e.detail.value.trim();

    if (name) {
      wx.setStorageSync('name', name);
    }

  },

  changeAvatar: function(e) {

    var that = this;

    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res) {
            var savedFilePath = res.savedFilePath;
            wx.setStorageSync('avatar', savedFilePath);
            that.setData({
              avatar: savedFilePath
            });
          }
        });
      }
    })
  }
})