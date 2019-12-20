<style lang="less" scoped>
  .title .selects{
    .box {
      width: 2rem;
      // height: 1rem;
    }
  }
</style>
<template>
<!-- 条件：标段，开始时间， 结束时间-->
  <div class="title">
    <div class="selects">
        <Select v-model="select.mItemBid" class="box" placeholder="工程标段">
          <Option v-for="item in show.mItemBidList" :value="item.mItemBid" :key="item.mItemBid">{{ item.mItemBDJC }}</Option>
        </Select>
        <DatePicker type="date" placeholder="开始时间" class="box" v-model="select.start_time" @on-change="changeType0"></DatePicker>
        <DatePicker type="date" placeholder="结束时间" class="box" v-model="select.end_time" @on-change="changeType1"></DatePicker>
      </div>
      <div class="btn" @click="getData()">
        <span>
          <img src="@/assets/img/sc/search.png" alt />
        </span>
        <span>搜索</span>
      </div>
  </div>
</template>
<script>
import '@/assets/css/selects.css'
export default {
  data () {
    return {
      select: {
        start_time: '',
        end_time: '',
        mItemBid: ''
      },
      show: {
        mItemBidList: []
      }
    }
  },
  mounted () {
    // 得到材料列表
    // 得到标段列表
    let obj = {
      mUserID: this.comFun.getCookie('roadmUserID'),
      mItemID: this.$store.state.itemInfo.id
    }

    this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
      console.log(JSON.stringify(rs))
      if (rs.code === 0) {
        this.show.mItemBidList = rs.data

        this.show.mItemBidList.unshift({ mItemBDJC: '全部', mItemBid: '' })
      }
    }, (err) => { console.log(err) })
  },
  methods: {
    changeType0 (val) {
      console.log(val)
      this.select.start_time = val
    },
    changeType1 (val) {
      console.log(val)
      this.select.end_time = val
    },
    getData () {
      let obj = {
        // 选择的标段
        mItemBid: this.select.mItemBid,
        start_time: this.select.start_time,
        end_time: this.select.end_time
      }
      this.$emit('getData', obj)
    }
  }

}
</script>
