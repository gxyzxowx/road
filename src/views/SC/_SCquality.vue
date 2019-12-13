<style scoped>
 .scquality .curve{
    margin-top: .30rem;
  }
  .scquality .curve .chart{
    height:3rem;
  }

</style>
<template>
  <div class="scquality">
    <Search v-on:getData="getData"></Search>
    <div class="content">
      <div class="curve">
<!-- 出料温度曲线 -->
<CurveChart :id="'curve1'" :data="dataCurve1" class = "chart"></CurveChart>
      </div>
      <div class="curve">
<!-- 油石比曲线 -->
<CurveChart :id="'curve2'" :data="dataCurve2" class = "chart"></CurveChart>
      </div>
      <div class="curve">
<!--级配曲线  -->
<CurveChart :id="'curve3'" :data="dataCurve3" class = "chart"></CurveChart>
      </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/Search.vue'
import CurveChart from '@/components/CurveChart.vue'
export default {
  data () {
    return {
      dataCurve1: null,
      dataCurve2: null,
      dataCurve3: null
    }
  },
  mounted () {
    this.getData()
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
          this.dataCurve2 = this.handleCurveData(rs.data, 'mBhDateTime', 'mBnYSB', '%', '油石比曲线图')
          // 级配曲线9
          this.dataCurve3 = this.handleCurveData2(rs.repice_data, '', '', '%', '级配曲线图')
        }
      }, (err) => { console.log(err) })
    },
    handleCurveData2 (data, time, val, Yname, title) {
      let xAxisdata = []
      let seriesdata = []

      for (let item in data) {
        let begIndex = item.indexOf('L') + 1
        let endIndex = item.indexOf('Standard_req')
        let str = item.slice(begIndex, endIndex)
        let arr = str.split('')
        arr.splice(2, 0, '.')
        let reslut = arr.join('')
        let datay = Number(data[item] * 100)
        reslut = Number(reslut)
        xAxisdata.push(reslut)
        seriesdata.push(datay)
      }
      let option = {
        title: {
          text: title,
          textVerticalAlign: 'top'
        },
        color: ['#6996F3'],
        grid: {
          top: '15%',
          left: '5%',
          right: '10%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisdata
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}' + Yname
          },
          splitLine: { show: true, lineStyle: { color: ['#ddd'] } } // 网格线
        },
        series: [{
          data: seriesdata,
          type: 'line',
          smooth: true
        }]
      }
      return option
    },
    // 处理曲线图
    handleCurveData (data, time, val, Yname, title) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][time])
        seriesdata.push(data[i][val])
      }
      let option = {
        title: {
          text: title,
          textVerticalAlign: 'top'
        },
        color: ['#6996F3'],
        grid: {
          top: '15%',
          left: '5%',
          right: '10%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisdata
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}' + Yname
          },
          splitLine: { show: true, lineStyle: { color: ['#ddd'] } } // 网格线
        },
        series: [{
          data: seriesdata,
          type: 'line',
          smooth: true
        }]
      }
      return option
    }
  },
  components: {
    Search,
    CurveChart
  }
}
</script>
