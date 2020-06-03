var app = getApp()
Page({
  data: {
    user:null,
    choose_index: 0,
    tabbar: {
      "color": "#999999",
      "selectedColor": "#7788dd",
      "borderStyle": "#dcdcdc",
      "backgroundColor": "#ffffff",
      "list": [{
          "key": "home",
          "iconPath": "/images/icon_home.png",
          "selectedIconPath": "/images/icon_home_active.png",
          "text": "首页"
        },
        {
          "key": "new",
          "iconPath": "/images/icon_plus_big.png",
          "iconType": "big overflow circle shadow",
          "choose": "disable"
        },
        {
          "key": "me",
          "iconPath": "/images/icon_me.png",
          "selectedIconPath": "/images/icon_me_active.png",
          "text": "我"
        }
      ]
    },

  },
  tabChange: function(e) {
    var key = e.detail.key
    if (key == 'new') {
      wx.navigateTo({
        url: '/pages/new/new',
      })
    } else {
      this.setData({
        choose_index: e.detail.index
      })
    }
  },
  
  onLoad: function (options) {
    if (options.choose_index!=null){
      this.setData({
        choose_index: options.choose_index
      })
      
    }
    
    
  }
})