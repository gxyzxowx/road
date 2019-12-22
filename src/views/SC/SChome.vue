<!-- 实时信息 -->
<style lang="less" scoped>
  .schome{
    display: flex;
    background: #fff;
    height: 100%;
    width: 100%;
    padding-right:.30rem;
    width: 16.2rem;
    .left{
      flex: 1;
    }
    .right{
      width: 11rem;
      padding-left: .2rem;
      padding-top: .4rem;
      .list{
        .table{
          width:10.8rem;
        }

      }
      .list2{
        width: auto;
        .table{
          width: 3.5rem;
          height: 2.5rem;
          overflow: auto;
        }

        }
      .curves {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .curve{
          width: 3.5rem;
          height: 2.5rem;
          // border:2px solid #333;
            }
      }
    }
  }
</style>
<template>
  <div class="schome">
  <div class="left">
    <!-- 地图（） -->
    <Map class="map" :data="datas.DevData"  :colorType='1'></Map>
  </div>
  <div class="right">
    <!-- 列表 -->
    <div class="list">
      <Table class="table" :loading="loading"  border :columns="listTitle" :data="datalist" size="small"  stripe></Table>
    </div>
    <!-- 图表 -->
    <div class="curves">
      <div class="curve">
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve2'" :data="datacurve2" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve3'" :data="datacurve3" class = "chart"></CurveChart>
      </div>
      <div class="curve">
        <CurveChart :id="'curve4'" :data="datacurve4" class = "chart"></CurveChart>
      </div>
      <div class="curve" ref="curve">
        <CurveChart :id="'curve5'" :data="datacurve5" class = "chart"></CurveChart>
      </div>
      <div class="curve list2">
        <!-- 预警信息列表 -->
        <Table class="table"  :height="curve.H" :width="curve.W" :loading="loading" border :columns="listTitle2" :data="datalist2" size="small"  stripe></Table>
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
      curve: { H: '', W: '' },
      mUserID: '',
      mItemID: '',
      loading: true,
      // 温度曲线
      datacurve1: null,
      // 油石比曲线
      datacurve2: null,
      // 级配曲线
      datacurve3: null,
      // 关键筛孔率曲线
      datacurve4: null,
      // 拌和周期曲线
      datacurve5: null,
      str: 'cdfsadfcc',
      datas: {
        DevData: []
      },
      listTitle: [
        {
          title: '实时信息',
          key: 'title',
          width: 90
        },
        {
          title: '骨料1',
          key: 'n1'
        },
        {
          title: '骨料2',
          key: 'n2'
        },
        {
          title: '骨料3',
          key: 'n3'
        },
        {
          title: '骨料4',
          key: 'n4'
        },
        {
          title: '骨料5',
          key: 'n5'
        },
        {
          title: '骨料6',
          key: 'n6'
        },
        {
          title: '矿粉1',
          key: 'n7'
        },
        {
          title: '矿粉2',
          key: 'n8'
        },
        {
          title: '矿粉3',
          key: 'n9'
        },
        {
          title: '沥青',
          key: 'n10'
        }
      ],
      listTitle2: [
        {
          title: '预警时间',
          key: 'mDateTime',
          ellipsis: true,
          width: 90
        },
        {
          title: '预警等级',
          width: 90,
          key: 'mAlarmLevel'
        }, {
          title: '拌合楼名称',
          key: 'mDevName',
          width: 100
        }, {
          title: '预警内容',
          key: 'mAlarmDec',
          ellipsis: true,
          width: 90
        }, {
          title: '处理状态',
          key: 'ClStatus',
          width: 90
        }],
      datalist: [
        { 'title': '目标(kg)', 'n1': '...' },
        { 'title': '实际(kg)' },
        { 'title': '误差(%)' }
      ],
      datalist2: [
      ]
    }
  },
  created () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
  },
  mounted () {
    // this.display()
    this.getData()
    // 1分钟刷新一次
    setTimeout(() => {
      this.getData()
    }, 60000)
    this.$nextTick(() => { // 页面渲染完成后的回调
      this.curve.W = this.$refs.curve.offsetWidth
      this.curve.H = this.$refs.curve.offsetHeight
    })
  },
  methods: {
    getData () {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID
      }
      // console.log(JSON.stringify(obj))
      // 实时信息
      this.comFun.post('/Produce_J_G/realTimeInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理头部列表数据
          let datalist = rs.data.NewestInfo
          // 目标值
          let Recipe = []
          // 实际值
          let Actual = []
          // 误差百分比
          let Rep = []
          for (let item in datalist) {
            if (item.indexOf('Recipe') !== -1) {
              Recipe.push(datalist[item])
            }
            if (item.indexOf('Actual') !== -1) {
              Actual.push(datalist[item])
            }
            if (item.indexOf('Rep') !== -1) {
              Rep.push((datalist[item] * 100).toFixed(2) + '%')
            }
          }
          Recipe.map((item, index, arr) => {
            this.datalist[0]['n' + (index + 1)] = item
          })
          Actual.map((item, index, arr) => {
            this.datalist[1]['n' + (index + 1)] = item
          })
          Rep.map((item, index, arr) => {
            this.datalist[2]['n' + (index + 1)] = item
          })
          // 处理头部列表数据结束
          // 处理温度曲线
          this.dataTemp(rs.data.TempData)

          // 处理油石比曲线
          this.dataYSB(rs.data.ScYSBData)

          // 处理级配曲线
          this.dataJP(rs.data.ScJpData)

          // 处理关键筛孔率曲线
          this.dataSKL(rs.data.SKLData)

          // 处理dataPeroid拌和周期曲线
          this.dataPeroid(rs.data.PeroidData)

          // 处理地图
          this.datas.DevData = rs.data.DevData

          // 处理预警数据
          this.datalist2 = rs.data.AlarmData
          // 油石比曲线
          // this.dataCurve2 = this.handleCurveData(rs.data, 'mBhDateTime', 'mBnYSB', '%', '油石比曲线图')
          // // 级配曲线9
          // this.dataCurve3 = this.handleCurveData2(rs.repice_data, '', '', '%', '级配曲线图')
        }
      }, (err) => { console.log(err) })
    },
    // 处理温度曲线数据
    dataTemp (data) {
      let xdata = []
      // 三条曲线arr
      let arr1 = []
      let arr2 = []
      let arr3 = []
      data.map((item, index, arr) => {
        xdata.push(item['mBhDateTime'])
        arr1.push(item['mClTemp_Up1'])
        arr2.push(item['mBhItemTemp'])
        arr3.push(item['mClTemp_Down1'])
      })
      let arr = [arr1, arr2, arr3]
      this.datacurve1 = this.handleCurveData(arr, xdata, '出料温度曲线图', '', '℃')
    },
    // 处理油石比曲线
    dataYSB (data) {
      let xdata = []
      // 三条曲线arr
      let arr1 = []
      let arr2 = []
      let arr3 = []
      data.map((item, index, arr) => {
        xdata.push(item['mBhDateTime'])
        arr1.push(item['mClYSB_Up1'])
        arr2.push(item['mBnYSB'])
        arr3.push(item['mClYSB_Down1'])
      })
      let arr = [arr1, arr2, arr3]
      this.datacurve2 = this.handleCurveData(arr, xdata, '油石比曲线图', '', '%')
    },
    // 处理级配曲线
    dataJP (data) {
      let xdata = []
      // 三条曲线arr
      let arr1 = []
      let arr2 = []
      let arr3 = []
      data.map((item, index, arr) => {
        xdata.push(item['mBhSKL'])
        arr1.push(item['Up'])
        arr2.push(item['Aver'])
        arr3.push(item['Down'])
      })
      let arr = [arr1, arr2, arr3]
      this.datacurve3 = this.handleCurveData(arr, xdata, '级配曲线图', '', '%')
    },
    // 处理关键塞孔率曲线
    dataSKL (data) {
      let xdata = []
      // 三条曲线arr
      let arr1 = []
      let arr2 = []
      let arr3 = []
      data.map((item, index, arr) => {
        xdata.push(item['mBhDateTime'])
        arr1.push(item['mBhSKL0475'])
        arr2.push(item['mBhSKL0236'])
        arr3.push(item['mBhSKL00075'])
      })
      let arr = [arr1, arr2, arr3]
      this.datacurve4 = this.handleCurveData(arr, xdata, '关键塞孔率曲线图', 1, '%')
    },
    // 拌和周期曲线
    dataPeroid (data) {
      let xdata = []
      // 三条曲线arr
      let arr1 = []
      let arr2 = []
      let arr3 = []
      data.map((item, index, arr) => {
        xdata.push(item['mBhDateTime'])
        arr1.push(item['mClBHPeriod_Up1'])
        arr2.push(item['mBhScPeriod'])
        arr3.push(item['mClBHPeriod_Down1'])
      })
      let arr = [arr1, arr2, arr3]
      this.datacurve5 = this.handleCurveData(arr, xdata, '拌和周期曲线图')
    },
    // 处理曲线数据
    handleCurveData (arr, xdata, title, type, sign) {
      let legendData
      if (type) {
        legendData = ['0475', '0236', '00075']
      } else {
        legendData = ['上限', '实际值', '下限']
      }
      let option = {
        title: {
          text: title,
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: legendData,
          padding: [25, 0, 0, 0]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xdata
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (arr, sign) {
              if (sign) {
                return arr + sign
              } else {
                return arr
              }
            }
          }
        },
        series: [
          {
            name: legendData[0],
            type: 'line',
            data: arr[0]
          },
          {
            name: legendData[1],
            type: 'line',
            data: arr[1]
          },
          {
            name: legendData[2],
            type: 'line',
            data: arr[2]
          }
        ]
      }
      return option
    }
  },
  components: {
    Map,
    CurveChart
  }
}
</script>
