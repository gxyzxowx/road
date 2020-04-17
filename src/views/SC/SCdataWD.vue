<style lang="less" scoped>
.search{
  height: 1.05rem;
  background:rgba(240,244,254,1);
  padding: .25rem 0 0 .4rem;
}
.content{
  padding:.2rem .4rem;
}
  .curve{
    height: 2.88rem;
  }
  .desc{
    margin-top: .1rem;
  }
</style>
<template>
<!-- 质量监管--温度 -->
  <div class="scdatawd">
    <div class="search">
      <!-- 条件 -->
      <Search v-on:getData="getData"></Search>
    </div>
    <div class="content">
      <div class="curve">
        <!-- <h4>温度曲线图</h4> -->
        <!-- 温度曲线 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="total">
        <!-- 汇总信息 -->
        <h4>汇总信息</h4>
        <Table  border :columns="listTitle1" :data="datalist1" size="small" stripe></Table>
      </div>
      <div class="desc">
        <h4>详细信息</h4>
        <!-- 详细信息 -->
        <Table  max-height="125" border :columns="listTitle2" :data="datalist2" size="small" stripe></Table>
      </div>
    </div>

  </div>
</template>
<script>
import Search from '@/components/SC/DataSearch.vue'
import CurveChart from '@/components/CurveChart.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      datacurve1: null,
      listTitle1: [
        {
          title: '平均值℃',
          key: 'Aver'
        },
        {
          title: '上限℃',
          key: 'Up'
        },
        {
          title: '下限℃',
          key: 'Down'
        },
        {
          title: '合格率',
          key: 'rep'
        }
      ],
      listTitle2: [
        {
          title: '时间',
          key: 'mBhDateTime'
        },
        {
          title: '材料类型',
          key: 'mClTypeName'
        },
        {
          title: '温度℃',
          key: 'data'
        },
        {
          title: '上限',
          key: 'up'
        },
        {
          title: '下限',
          key: 'down'
        },
        {
          title: '合格',
          key: 'alarm'
        }
      ],
      datalist1: [],
      datalist2: []
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
    // this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        // 温度1， 油石比2， 级配3
        type: 1
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        // console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }
      console.log(obj)
      this.comFun.post('/Produce_J_G/qualityStatic', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理温度曲线图
          let data = rs.data.line_data
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
          this.datacurve1 = this.handleCurveData(arr, xdata, '温度曲线图')

          // 处理list1
          let listArr1 = []
          listArr1.push(rs.data.static_data)
          this.datalist1 = listArr1
          // 处理list2
          rs.data.data_list.map((item, index, arr) => {
            arr[index].alarm = item.alarm ? '否' : '是'
          })
          this.datalist2 = rs.data.data_list
        } else {
        }
      }, (err) => { console.log(err) })
    },
    // 处理曲线图
    handleCurveData (arr, xdata, title) {
      let legendData = ['上限', '实际值', '下限']
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
          left: '1%',
          right: '1%',
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
            formatter: function (arr) {
              return arr + '℃'
            }
          }
        },
        series: [
          {
            name: '上限',
            type: 'line',
            data: arr[0]
          },
          {
            name: '实际值',
            type: 'line',
            data: arr[1]
          },
          {
            name: '下限',
            type: 'line',
            data: arr[2]
          }
        ]
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
