<style lang="less" scoped>
  .title .selects{
    width: 82%;
    .box {
      width: 2.5rem;
      // height: 1rem;
      &:nth-of-type(n+4){
        width: 2rem;
      }
    }
  }
</style>
<template>
<!-- 条件：面层，拌合楼，标段，开始时间， 结束时间-->
  <div class="title">
    <div class="selects">
      <Select v-model="select.mItemBid" class="box" placeholder="工程标段" @on-change="changeBid">
          <Option v-for="item in show.mItemBidList" :value="item.mItemBid" :key="item.mItemBid">{{ item.mItemBDJC }}</Option>
        </Select>
        <Select v-model="select.mDevID" class="box" placeholder="拌合站">
          <Option v-for="item in show.dev_list" :value="item.mDevID" :key="item.mDevID">{{ item.mDevName }}</Option>
        </Select>
        <Select v-model="select.mClType" class="box" placeholder="层位">
          <Option v-for="item in show.cl_list" :value="item.mClType" :key="item.mClType">{{ item.mClName }}</Option>
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
        // 选择的标段
        mItemBid: '',
        // 选择的材料
        mClType: '',
        // 选择的拌合楼
        mDevID: ''
      },
      show: {
        mItemBidList: [],
        cl_list: [],
        // 拌合楼筛选条件
        dev_list: []
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
    let getBd = new Promise((resolve, reject) => {
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.show.mItemBidList = rs.data
          this.select.mItemBid = rs.data[0]['mItemBid']
          this.show.mItemBidList.unshift({ mItemBDJC: '全部', mItemBid: '' })

          resolve()
        }
      }, (err) => { console.log(err) })
    })
    // 根据得到的标段得到拌合楼和材料
    getBd.then(() => {
      this.getClDevList()
    })
  },
  methods: {
    // 根据项目ID 和标段ID 获取拌和楼列表和材料列表
    getClDevList () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.itemInfo.id,
        mItemBid: this.select.mItemBid
      }
      this.comFun.post('/Produce_J_G/getSelectConditionList', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.show.dev_list = rs.data.dev_list
          this.show.cl_list = rs.data.cl_list
          this.select.mDevID = rs.data.dev_list[0] ? rs.data.dev_list[0]['mDevID'] : ''
          this.select.mClType = rs.data.cl_list[0] ? rs.data.cl_list[0]['mClType'] : ''
          console.log(this.select.mDevID)
          console.log(this.select.mClType)
          this.getData()
        }
      }, (err) => { console.log(err) })
    },
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
        // 选择的层位（材料）
        mClType: this.select.mClType,
        // 选择的拌合楼
        mDevID: this.select.mDevID,
        start_time: this.select.start_time,
        end_time: this.select.end_time
      }
      this.$emit('getData', obj)
    },
    // 更改标段时
    changeBid (val) {
      console.log(val)
      this.select.mItemBid = val
      this.getClDevList()
    }
  }

}
</script>
