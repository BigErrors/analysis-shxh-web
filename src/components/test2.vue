<template>
  <div id="test2" class="test2" >
    <div class="box">
      <span style="position:absolute; left:0; background: yellow">outer container</span>
      <test :height='40' :dLength=testData.length :time='2000' :lineNum='8' :width="'200px'">
        <div slot="slide">
          <div>
            <p v-for="(item,index) in testData" :key="index"> {{ item }} </p>
          </div>
          <div>
            <p v-for="(item,index) in testData" :key="'copy' + index"> {{ item }} </p>
          </div>
        </div>
      </test>
    </div>
  </div>
</template>

<script>
import test from './test.vue'
export default {
  name: 'test2',
  components: {
    test
  },
  data () {
    return {
      testData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      b: 'd',
      c: 'c'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style>
.box {
  position: relative;
  margin: 50px 100px;
  width: 600px;
  height: 450px;
  border: 1px rgb(189, 188, 188) solid;
  display: flex;
  justify-content: center;
}
p {
  margin: 0;
  line-height: 40px;
  text-align: center;
}
</style>
