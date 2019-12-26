<style lang="less" scoped>

.content{
  padding:.2rem .4rem;
}

  .move{
    height: 5.5rem;
  }
</style>
<template>
<!-- 施工--摊铺--轨迹 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <Search v-on:getData="getData"></Search>
    </div>
    <div class="content">
       <Move class="move" :id="'move2'" :data="movedata"></Move>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/WarnSearch.vue'
import Move from '@/components/Move2.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      movedata: null,
      emitobj: {}
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
    this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        // 碾压1，摊铺2
        devType: 2
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }
      console.log(obj)
      this.comFun.post('/Locus/nyData', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 包括碾压和道路坐标
          this.movedata = rs
        } else {
        }
      }, (err) => { console.log(err) })
    }
  },
  components: {
    Search,
    Move
  }
}
</script>
