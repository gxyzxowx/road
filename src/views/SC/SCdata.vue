<!-- 质量监管 -->
<template>

  <div class="scdata">
    <div class="ul">
      <router-link :to="{path: '/sc/SCdata/wd'}"><div class="li"><span>温度</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/ysb'}"><div class="li"><span>油石比</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/jp'}"><div class="li"><span>级配</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/sk'}"><div class="li"><span>关键筛孔</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/zq'}"><div class="li"><span>拌和周期</span></div></router-link>
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
    this.$router.push('/sc/SCdata/wd')
  }
}
</script>
