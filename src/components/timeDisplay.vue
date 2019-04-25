<template>
  <div id="timeDisplay" class="timeDisplay">
    {{ time }}
  </div>
</template>

<script>
import { getCustomDate } from '@/plugins/dateFormat'
export default {
  name: 'timeTest',
  data () {
    return {
      time: 0
    }
  },
  methods: {
    // 设置日期格式
    setTitleDate () {
      this.time = getCustomDate(new Date(), 'default')
    }
  },
  mounted () {
    setInterval(this.setTitleDate, 1000)
  }
}
</script>
