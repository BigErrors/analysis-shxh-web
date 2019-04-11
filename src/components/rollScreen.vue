<template>
  <div :style="{height:height*lineNum + 'px'}" class="rollScreen_container" id ="rollScreen_container">
    <div class="rollScreen_list" :style = {transform:transform} :class="{rollScreen_list_unanim:num===0}">
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key="index" :style="{height:height+'px',lineHeight:height+'px'}">
        <span>{{item}}</span>
      </li>
      <li class="rollScreen_once" v-for="(item,index) in contentArr" :key="index+contentArr.length" :style="{height:height+'px',lineHeight:height+'px'}">
        <span>{{item}}</span>
      </li>
      <slot name="slide"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    height: {
      default: 44,
      type: Number,
      required: true
    }, // 每行元素的高度
    lineNum: {
      default: 5,
      type: Number
    }, // 显示行数
    contentArr: {
      default: null,
      type: Array
    }, // 简单文本轮播
    dLength: {
      default: null,
      type: Number
    }, // 自定义插槽内容的时候必须传自定义内容的长度
    time: {
      default: 3000,
      type: Number // 定义轮播切换速度
    }
  },
  data: function () {
    return {
      translateY: 0,
      num: 0,
      loopTime: this.time,
      customTimer: null
    }
  },
  methods: {
    changeStyle1 () {
      this.translateY += 1
      if (this.translateY % this.height === 0) {
        clearInterval(this.customTimer)
      }
      if (this.translateY === this.height * this.dLength) {
        this.translateY = 0
      }
    }
  },
  computed: {
    transform () {
      return 'translateY(-' + this.translateY + 'px)'
    }
  },
  created: function () {
    // this.customTimer = setInterval(this.changeStyle1, 30)
    // let _this = this
    // if ((this.contentArr != null && this.contentArr.length < this.lineNum) || (this.dLength != null && this.dLength < this.lineNum)) {
    //   console.error('轮播显示行数不能超过数据总行数')
    // } else {
    //   // 先判断轮播切换速度，如果小于动画播放时间则提示切换速度过快
    //   if (_this.loopTime <= 1000) {
    //     console.warn('轮播切换速度过快，至少大于1s')
    //     _this.loopTime = 1000
    //   }
    //   // 两种轮播 第一种contentArr！= null 第二种自定义插槽
    //   if (_this.contentArr !== null) {
    //     setInterval(function () {
    //       if (_this.num !== _this.contentArr.length) {
    //         _this.num++
    //       } else {
    //         _this.num = 0
    //         setTimeout(function () {
    //           _this.num++
    //         }, 500)
    //       }
    //     }, _this.loopTime)
    //   } else if (_this.dLength !== null) {
    //     setInterval(() => {
    //       this.customTimer = setInterval(this.changeStyle1, 30)
    //     }, _this.loopTime)
    //   } else if (_this.dLength === null && _this.dLength === null) {
    //     console.error('contentArr 和 dLength 均为空，rollScreen组件运行出错')
    //   }
    // }
  },
  mounted () {
    this.customTimer = setInterval(this.changeStyle1, 20)
    setInterval(() => {
      this.customTimer = setInterval(this.changeStyle1, 20)
    }, 2000)
  }
}
</script>

<style>
  .rollScreen_container{
    display: inline-block;
    position:relative;
    overflow: hidden;
    width: 100%;
    color: white;
  }
  .rollScreen_list{
    transition: 1s linear;
    padding:0;
    margin:0;
    list-style: none;
  }
  .rollScreen_list_unanim{
  }
  .rollScreen_once{
    list-style: none;
  }
</style>
