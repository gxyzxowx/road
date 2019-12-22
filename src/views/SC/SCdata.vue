<!-- 质量监管 -->
<style lang="less" scoped>
  .scdata{
    .ul{
      display: flex;
      height: .6rem;
      font-size: .24rem;
      text-align: center;
      a{
        height: 100%;
        color:#333;
      }
      .li{
        width: 2.22rem;
        height: .55rem;
        line-height: .55rem;

      }
      .router-link-active{
          background: #F0F4FE;
          span{
          border-bottom: 0.04rem solid rgba(105,150,243,1);
          padding: .25rem;
          color: rgba(105,150,243,1);
        }
        }
    }
  }
</style>
<template>

  <div class="scdata">
    <div class="ul">
      <router-link :to="{path: '/sc/SCdata/wd'}"><div class="li"><span>温度</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/ysb'}"><div class="li"><span>油石比</span></div></router-link>
      <router-link :to="{path: '/sc/SCdata/jp'}"><div class="li"><span>级配</span></div></router-link>
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
