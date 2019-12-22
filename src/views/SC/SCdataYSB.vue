<!-- 质量监管--油石比 -->
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
</style>
<template>
<!-- 质量监管--油石比 -->
  <div>
    <div class="search">
     <!-- 条件 -->
      <Search v-on:getData="getData"></Search>
    </div>
    <div class="content">
      <div class="curve">
        <!-- <h4>油石比线图</h4> -->
        <!-- 油石比线图 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="total">
        <!-- 汇总信息 -->
        <h4>汇总信息</h4>
        <Table  border :columns="listTitle1" :data="datalist1" size="small"  :width="tableWidth2" stripe></Table>
      </div>
      <div class="desc">
        <h4>详细信息</h4>
        <!-- 详细信息 -->
        <Table  height="115" border :columns="listTitle2" :data="datalist2" size="small"  :width="tableWidth2" stripe></Table>
      </div>
    </div>

  </div>
</template>
<script>
import CurveChart from '@/components/CurveChart.vue'
import Search from '@/components/SC/DataSearch.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      tableWidth2: '1200',
      datacurve1: null,
      listTitle1: [
        {
          title: '平均值',
          key: 'Aver',
          width: 90
        },
        {
          title: '目标值',
          key: 'Data'
        },
        {
          title: '上限',
          key: 'Up'
        },
        {
          title: '下限',
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
          title: '油石比',
          key: 'data'
        },
        {
          title: '目标值',
          key: 'recipe_data'
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
    this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        // 温度1， 油石比2， 级配3
        type: 2
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
      }
      obj = { ...obj, ...this.emitobj }
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
            arr1.push(item['mClYSB_Up1'])
            arr2.push(item['mBnYSB'])
            arr3.push(item['mClYSB_Down1'])
          })
          let arr = [arr1, arr2, arr3]
          this.datacurve1 = this.handleCurveData(arr, xdata, '油石比曲线图')

          // 处理list1
          let listArr1 = []
          listArr1.push(rs.data.static_data)
          this.datalist1 = listArr1
          // 处理list2
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
          type: 'value'
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
