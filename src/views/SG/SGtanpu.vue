<!-- 施工监管--摊铺 -->
<style scoped>
  .move{
    width: 100%;
    height: 100%;
    /* background: red; */
    border:#999 solid 3px;
  }
</style>
<template>
  <div>
    <Move class="move" :id="'move1'" :data="chartsdata"></Move>

  </div>
</template>
<script>

import Move from '@/components/Move1.vue'
export default {
  data () {
    return {
      chartsdata: null
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.itemInfo.id,
        mDevSn: 2019000002
      }
      this.comFun.post('/Locus/nyData', obj, this).then((rs) => {
        // console.log('我是施工页面' + JSON.stringify(rs))
        console.log(rs)
        // this.chartsdata = this.handleChartsData(rs.data)

        if (rs.code === 0) {
          // 处理数据
          // 包括碾压和道路坐标
          this.chartsdata = this.handleChartsData(rs)
        } else {
          // this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    handleChartsData (data) {
      return data
    }
  },
  components: {
    Move
  }
}
</script>
