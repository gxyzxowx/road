<!-- 施工--碾压管理 -->
<style lang="less" scoped>

</style>
<template>

  <div class="sgnianya">
    <div class="ul">
      <router-link :to="{path: '/sg/SGnianya/wd'}"><div class="li"><span>温度</span></div></router-link>
      <router-link :to="{path: '/sg/SGnianya/sd'}"><div class="li"><span>速度</span></div></router-link>
      <router-link :to="{path: '/sg/SGnianya/gj'}"><div class="li"><span>轨迹</span></div></router-link>
    </div>
    <router-view v-if="showView" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      showView: true
    }
  },
  mounted () {
    this.$router.push('/sg/SGnianya/wd')
  }
}
</script>
