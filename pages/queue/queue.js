// pages/queue/queue.js
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hidden: true,
    item: [{
        "table": "6~8",
        "number": '5'
      },
      {
        "table": "4~6",
        "number": '5'
      },
      {
        "table": "4~6",
        "number": '5'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    that.queue_lst();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  queue_lst: function() {
    var that = this;
    wx: wx.request({
      url: getApp().globalData.domain + 'Queue/queue_lst',
      // method: 'GET',
      data: {
        shopid: getApp().globalData.shopid
      },
      // header: {
      //   'Accept': 'application/json'
      // },
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function(res) {
        that.setData({
          queue_lst: res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  takenum: function(e) {
    wx.redirectTo({
      url: './getcode?type',
    })

  },
  onShow: function() {

  },
  refresh: function() {
    wx.showLoading({
      title: '正在刷新..',
    })
    this.onLoad()
    setTimeout(function() {
      wx.hideLoading()
    }, 500)
  }
})