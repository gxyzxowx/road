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
        <Select v-model="select.mDevID" class="box" :placeholder="devTypeName">
          <Option v-for="item in show.devList" :value="item.mDevID" :key="item.mDevID">{{ item.mDevName }}</Option>
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
        mDevID: '',
        mItemBid: ''
      },
      devTypeName: '',
      show: {
        mItemBidList: [],
        devList: []
      }
    }
  },
  props: ['devType'],
  mounted () {
    // console.log(this.devType)
    // 碾压机211，摊铺机210
    if (this.devType === '211') {
      this.devTypeName = '选择碾压机'
    } else if (this.devType === '210') {
      this.devTypeName = '选择摊铺机'
    }
    // 得到设备列表
    // 得到标段列表
    let obj = {
      mUserID: this.comFun.getCookie('roadmUserID'),
      mItemID: this.$store.state.itemInfo.id
    }
    let getBd = new Promise((resolve, reject) => {
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
      // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          resolve(rs.data)
        }
      }, (err) => {
        reject(err)
      })
    })

    let getDev = new Promise((resolve, reject) => {
      obj['mDevType'] = this.devType
      this.comFun.post('/Dev/getDevList', obj, this).then((rs) => {
      // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          resolve(rs.data)
        }
      }, (err) => {
        reject(err)
      })
    })
    Promise.all([getBd, getDev]).then((reslut) => {
      let bd = reslut[0]
      let dev = reslut[1]
      this.show.mItemBidList = bd
      this.select.mItemBid = bd[0]['mItemBid']
      this.show.mItemBidList.unshift({ mItemBDJC: '全部', mItemBid: '' })

      this.show.devList = dev
      this.select.mDevID = dev[0]['mDevID']
      let obj = {
        // 选择的设备ID
        mDevID: this.select.mDevID,
        // 选择的标段
        mItemBid: this.select.mItemBid,
        start_time: this.select.start_time,
        end_time: this.select.end_time
      }
      console.log(JSON.stringify(obj))
      this.$emit('getData', obj)
    })
      .catch((err) => {
        console.log(err)
      })

    // this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
    //   // console.log(JSON.stringify(rs))
    //   if (rs.code === 0) {
    //     this.show.mItemBidList = rs.data
    //     this.show.mItemBidList.unshift({ mItemBDJC: '全部', mItemBid: '' })
    //   }
    // }, (err) => { console.log(err) })

    // obj['mDevType'] = this.devType
    // this.comFun.post('/Dev/getDevList', obj, this).then((rs) => {
    //   // console.log(JSON.stringify(rs))
    //   if (rs.code === 0) {
    //     this.show.devList = rs.data
    //     this.select.mDevID = rs.data[0]['mDevID']
    //     this.$emit('mDevID', rs.data[0]['mDevID'])
    //   }
    // }, (err) => { console.log(err) })
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
        // 选择的设备ID
        mDevID: this.select.mDevID,
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
