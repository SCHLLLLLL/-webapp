// components/task/task.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    hidden:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotodetail: function (params) {
      var id = params.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        
        url: '/pages/order/order?id='+id
      })
    }
  }
})
