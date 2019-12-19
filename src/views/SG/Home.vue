<style scoped>
  .move{
    width: 100%;
    height: 700px;
    /* background: red; */
    border:#999 solid 1px;
  }
</style>
<template>
  <div>
施工监管
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
        // console.log(rs)
        this.chartsdata = this.handleChartsData(rs.data)

        if (rs.code === 0) {
          // 处理数据
          this.chartsdata = this.handleChartsData(rs.data)
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
