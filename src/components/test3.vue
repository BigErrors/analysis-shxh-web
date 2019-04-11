<template>
  <div id = 'test3'>
    <h1> {{ title }} </h1>
    <p v-for="(item,index) in arr" :key="index"> {{ item }} </p>
  </div>
</template>

<script>
export default {
  name: 'test3',
  props: {
    title: {
      type: String,
      default: ''
    },
    arr: {
      type: Array,
      default: () => [123, 456, 789]
    }
  }
}
</script>
