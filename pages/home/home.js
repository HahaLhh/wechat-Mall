// pages/home/home.js
import {
  getMultiData,
  getProduct
} from '../../service/home.js'

const types = ['pop','new','sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabelValue: ["流行", "新款", "精选"],
    goods: {
      'new': {
        page: 0,
        list: []
      },
      'pop': {
        page: 0,
        list: []
      },
      'sell': {
        page: 0,
        list: []
      }
    },
    currentType : 'pop',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1.请求轮播图
    this._getMultiData()
    //请求商品数据
    this._getProductData('pop');
    this._getProductData('new');
    this._getProductData('sell');
  },
  _getProductData(type) {
    //获取页码  
    const page = this.data.goods[type].page + 1
    //发送网络请求
    getProduct(type, page).then(res => {
      // console.log(res)
      //取出数据
      const list = res.data.list
      //存放数据到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      //将数据设置到data中的goods中
      //字符串拼接 goods.type.list
      const typekey =`goods.${type}.list`;
      const pagekey = `goods.${type}.page`;
      this.setData({
        [typekey] : oldList,
        [pagekey] : page
      })
    })

  },
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.banner.list;
      const recommends = res.data.recommend.list;
      //存放数据
      this.setData({
        banners,
        recommends
      })
    })
  },
  //事件监听函数
  handleClick(e) {
    //获取tan点击选中type
    //点击后获取组件传递的数据
    const index = e.detail.index
    //设置currentType
    this.setData({
      currentType : types[index]
    })
  },

  //上拉加载更多
  onReachBottom(){
    this._getProductData(this.data.currentType)
  }

  
})