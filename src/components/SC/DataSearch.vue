<style lang="less" scoped>
  .title .selects{
    .box {
      width: 2rem;
      // height: 1rem;
    }
  }
</style>
<template>
<!-- 条件：层位，标段，开始时间， 结束时间-->
  <div class="title">
    <div class="selects">
      <Select v-model="select.mItemBid" class="box" placeholder="工程标段">
          <Option v-for="item in show.mItemBidList" :value="item.mItemBid" :key="item.mItemBid">{{ item.mItemBDJC }}</Option>
        </Select>
        <Select v-model="select.mClCW" class="box" placeholder="层位">
          <Option v-for="item in show.mClTypeValueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        mClCW: 1,
        mItemBid: ''
      },
      show: {
        mItemBidList: [],
        mClTypeValueList: [{
          value: 1,
          label: '上面层'
        }, {
          value: 2,
          label: '中面层'
        }, {
          value: 3,
          label: '下面层'
        }]
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
        this.select.mItemBid = rs.data[0]['mItemBid']
        this.show.mItemBidList.unshift({ mItemBDJC: '全部', mItemBid: '' })
        let obj = {
        // 选择的层位
          mClCW: this.select.mClCW,
          // 选择的标段
          mItemBid: this.select.mItemBid,
          start_time: this.select.start_time,
          end_time: this.select.end_time
        }
        this.$emit('getData', obj)
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
        // 选择的层位
        mClCW: this.select.mClCW,
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
