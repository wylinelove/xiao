// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[], //查询电影列表
    imgs:[], //轮播图图片
    txt:[
      {title:"正在上映的电影"},
      {title:"即将上映的电影"},
      {title:"最受好评电影"}
      ]   //地点列表
  },
  loadMore:function(){
    // 功能：当组件创建成功调用云函数
    // 获取云函数返回结果并显示
    // start：参数 0 10 20 30
    // 1：调用云函数
    wx.cloud.callFunction({
      name:"movielist1906a", //云函数名
      data:{start:this.data.list.length} //参数
    })
    .then(res=>{    //成功回调函数
      var rows=JSON.parse(res.result);
      rows=this.data.list.concat(rows.subjects);
      var img=rows.slice(0,4)
      console.log(img)
      this.setData({
        list:rows,
        imgs:img
      })
    })
    .catch(err=>{   //失败回调函数
      console.log(err) 
    })
    // 2：传递start
    // 3：获取云函数返回结果并保存list
  },
  jumpComment:function(event){
    // 1：添加参数event事件对象
    // 2：依据event获取自定义属性id
    var id=event.target.dataset.id;
    console.log(id);
    // 3：跳转pages/comment/comment参数id
    var url="/pages/comment/comment?id="+id
    wx.navigateTo({
      url:url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(123)
    // 加载下一页数据
    this.loadMore()
  }, 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})