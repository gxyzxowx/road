<!-- 实时信息 -->
<style lang="less" scoped>
  .schome{
    display: flex;
    background: #fff;
    height: 100%;
    width: 100%;
    padding-right:.40rem;
    width: 16.2rem;
    .left{
      flex: 1;
    }
    .right{
      width: 11rem;
      padding-left: .2rem;
      padding-top: .4rem;
      .list{

      }
      .curves {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .curve{
          width: 3.5rem;
          height: 2.5rem;
          border:2px solid #333;
            }
      }
    }
  }
</style>
<template>
  <div class="schome">
  <div class="left">
    <!-- 地图（） -->
    <Map class="map" :data="datas.DevData"></Map>
  </div>
  <div class="right" ref = "right">
    <!-- 列表 -->
    <div class="list">
      <Table :loading="loading" height="140" border :columns="listTitle" :data="datalist" size="small"  :width="tableWidth" stripe></Table>
    </div>
    <!-- 图表 -->
    <div class="curves">
      <div class="curve">
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve2'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve3'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve4'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve" ref = "tableheight2">
        <CurveChart :id="'curve5'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve list">
        <!-- 预警信息列表 -->
        <Table :loading="loading" :height="tableheight2" border :columns="listTitle2" :data="datalist2" size="small"  :width="tableWidth2" stripe></Table>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
import CurveChart from '@/components/CurveChart.vue'
import Map from '@/components/Map.vue'
export default {
  data () {
    return {
      loading: true,
      tableWidth: '1000',
      tableWidth2: '500',
      tableheight2: '160',
      datacurve1: null,
      datas: {
        DevData: []
      },
      listTitle: [
        {
          title: '生产数据',
          key: 'title',
          width: 90
        },
        {
          title: '骨料1',
          key: 'mDateTime'
        },
        {
          title: '骨料2',
          key: 'mItemBid'
        },
        {
          title: '骨料3',
          key: 'mItemBid'
        },
        {
          title: '骨料4',
          key: 'mAlarmLevel'
        },
        {
          title: '骨料5',
          key: 'mAlarmType_temp'
        },
        {
          title: '骨料6',
          key: 'mAlarmType_ysb'
        },
        {
          title: '矿粉1',
          key: 'mAlarmType_jp'
        },
        {
          title: '矿粉2',
          key: 'mAlarmDec'
        },
        {
          title: '矿粉3',
          key: 'status'
        },
        {
          title: '沥青',
          key: 'status'
        }
      ],
      listTitle2: [
        {
          title: '预警时间',
          key: 'title',
          width: 90
        },
        {
          title: '预警等级',
          key: 'mDateTime'
        }, {
          title: '拌合楼名称',
          key: 'title',
          width: 90
        }, {
          title: '预警内容',
          key: 'title',
          width: 90
        }, {
          title: '处理状态',
          key: 'title',
          width: 90
        }],
      datalist: [
        { 'title': '目标(kg)' },
        { 'title': '实际(kg)' },
        { 'title': '误差(%)' }
      ],
      datalist2: [
        { 'title': '目标(kg)' }
      ]
    }
  },
  mounted () {
    this.display()
    this.getData()
    this.$nextTick(() => {
      this.tableWidth = this.$refs.right.offsetWidth
      this.tableWidth2 = this.$refs.tableheight2.offsetWidth
      this.tableheight2 = this.$refs.tableheight2.offsetHeight
    })
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.$store.state.itemInfo.id
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        // console.log('是emit过来的参数:' + JSON.stringify(emitobj))
      }
      obj = { ...obj, ...this.emitobj }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/productQuality', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // rs.data.map((item, index, arr) => {
          //   arr[index].mBhItemTemp = item.mBhItemTemp + '℃'
          //   arr[index].mBnYSB = item.mBnYSB + '%'
          // })
          // 出料温度曲线
          this.dataCurve1 = this.handleCurveData(rs.data, 'mBhDateTime', 'mBhItemTemp', '℃', '出料温度曲线图')
          // 油石比曲线
          // this.dataCurve2 = this.handleCurveData(rs.data, 'mBhDateTime', 'mBnYSB', '%', '油石比曲线图')
          // // 级配曲线9
          // this.dataCurve3 = this.handleCurveData2(rs.repice_data, '', '', '%', '级配曲线图')
        }
      }, (err) => { console.log(err) })
    },
    display () {
      this.itemId = this.$store.state.itemInfo.id
      // 取得数据
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.itemId
      }
      // console.log(obj)
      this.comFun.post('/Index/getHomePageData', obj, this).then(
        rs => {
          // console.log(JSON.stringify(rs.data.DevData, null, 2))
          if (rs.code === 0) {
            // 设备状态（地图）
            this.datas.DevData = rs.data.DevData
            // console.log(JSON.stringify(rs.data))
          } else {
          }
        },
        err => {
          console.log(err)
        }
      )
    }
  },
  components: {
    Map,
    CurveChart
  }
}
</script>
