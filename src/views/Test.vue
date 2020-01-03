<style lang="less" scoped>
  body,html{
    height: 100%;
    background: #eee;
  }
</style>
<template>
  <div>
 hello {{msg}}

  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'wendy'
    }
  },
  created () {
    console.log('created过')
  },
  mounted () {
    console.log('mouted过')
    // this.$load.show()
  }
}
</script>
