<!-- 施工--摊铺管理 -->
<style lang="less" scoped>

</style>
<template>

  <div class="sgtanpu">
    <div class="ul">
      <router-link :to="{path: '/sg/SGtanpu/wd'}"><div class="li"><span>温度</span></div></router-link>
      <router-link :to="{path: '/sg/SGtanpu/sd'}"><div class="li"><span>速度</span></div></router-link>
      <router-link :to="{path: '/sg/SGtanpu/lc'}"><div class="li"><span>里程</span></div></router-link>
      <router-link :to="{path: '/sg/SGtanpu/gj'}"><div class="li"><span>轨迹</span></div></router-link>
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
    this.$router.push('/sg/SGtanpu/wd')
  }
}
</script>
