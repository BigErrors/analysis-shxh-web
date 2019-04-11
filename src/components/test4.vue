<template>
  <div id = 'test4'>
    <test3 :arr='arr' ref="reftest3"> </test3>
    <div @click="testclick" class="hhh" v-html="htmlMsg">
      <h1>this is test4</h1>
    </div>
  </div>
</template>

<script>
import test3 from './test3.vue'
export default {
  name: 'test4',
  components: {
    test3
  },
  data () {
    return {
      arr: [789, 123, 456],
      htmlMsg: `<h1>this is test4</h1>`
    }
  },
  methods: {
    testclick () {
      // this.$refs.reftest3._props.title = 'hhh'
      // console.log(this.$refs.reftest3._props)
    }
  }
}
</script>
