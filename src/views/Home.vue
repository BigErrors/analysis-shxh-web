<template>
 <div id="home"></div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  },
  created () {
    console.log('osm-url', process.env.VUE_APP_OSMURL)
  }
}
</script>

<style lang="less">

</style>
