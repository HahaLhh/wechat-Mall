// components/w-tab-control/w-tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleclick(event) {
      //1.取出index;
      const index = event.currentTarget.dataset.index
      // console.log(index)
      //修改currentIndex
      this.setData({
        currentIndex: index
      })
      this.triggerEvent("handleEvent",{index,title:this.properties.titles[index]},{});
    }
  }
})