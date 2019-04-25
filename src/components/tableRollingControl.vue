<template>
  <div id="test" class="test">
    <div class="container" :style="{height: height * lineNum + 'px', width: width}">
      <div class="inBox" :style="{transform:transform}">
        <slot name="slide"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'test',
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
    },
    width: {
      default: '100%',
      type: String
    }
  },
  data () {
    return {
      translateY: 0,
      custonTimer: null
    }
  },
  computed: {
    transform () {
      return 'translateY(-' + this.translateY + 'px)'
    }
  },
  methods: {

    // 休眠 sleepTime 毫秒
    sleep: (sleepTime) => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, sleepTime)
    }),

    // 控制translateY 的值从而控制滚动
    control: async function (status) {
      let i = 1
      // 判断是否是当前页
      document.onvisibilitychange = function () {
        if (document.visibilityState === 'visible') {
          i = 1
        } else {
          i = 20
        }
      }
      while (status) {
        status = status && true
        await this.sleep(20)
        this.translateY += i
        if (this.translateY % this.height === 0) {
          await this.sleep(this.time)
        }
        if (this.translateY >= this.height * this.dLength) {
          this.translateY = 0
        }
      }
    }
  },
  mounted () {
    this.control(true)
  },
  destroyed () {
  }
}
</script>
<style>
.container {
  position: relative;
  /* border: 1px gray solid; */
  /* background: skyblue; */
  overflow: hidden;
}
.inBox {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>
