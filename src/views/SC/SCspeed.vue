    <!-- 进度监管 -->
    <style lang="less" scoped>
    .scspeed{
      padding: .4rem;
    }
      .content{
        .bars{
          .bar{
            margin-top: .3rem;
            height: 3rem;
            // background: red
          }
        }
      }
    </style>
<template>
  <div class="scspeed">
    <!-- 条件 -->
      <Search :getData="getData"></Search>

    <div class="content">
      <div class="bars">
        <div class="bar">
          <h4>总量各层面产量柱状图</h4>
          <BarChart :id="'bar1'" :data="dataBar1" class = "chart"></BarChart>
        </div>
        <div class="bar">
          <h4>各种矿料总柱状图</h4>
          <BarChart :id="'bar2'" :data="dataBar2" class = "chart"></BarChart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Search from '@/components/SC/WarnSearch.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      mUserID: 0,
      mItemID: this.$store.state.itemInfo.id,
      dataBar1: null,
      dataBar2: null,
      // 点击搜索产生的值暂存
      emitobj: {
        mItemBid: 1,
        start_time: '',
        end_time: ''
      }
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.getData()
  },
  methods: {
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        mItemBid: this.emitobj.mItemBid,
        start_time: this.emitobj.start_time,
        end_time: this.emitobj.end_time
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
      }
      this.comFun.post('/Produce_J_G/rateStatic', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 进度柱状图
          this.dataBar1 = this.handleBarData(rs.data.ScRate, 'name', 'rep')
          this.dataBar2 = this.handleBarData(rs.data.SNData, '', '')
        } else {
        }
      }, (err) => { console.log(err) })
    },
    // 处理柱状图数据
    handleBarData (data, name, val) {
      let xAxisdata = []
      let seriesdata = []
      if (!name || !val) {
        for (var j in data) {
          seriesdata.push(data[j])
        }
        xAxisdata = ['骨料1', '骨料2', '骨料3', '骨料4', '骨料5', '骨料6', '矿粉1', '矿粉2', '矿粉3', '沥青']
      } else {
        for (var i = 0; i < data.length; i++) {
          xAxisdata.push(data[i][name])
          seriesdata.push(data[i][val])
        }
      }

      let option = {
        color: ['#6996F3'],
        textStyle: {
          color: '#666'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: true, lineStyle: { color: ['#aaa'], type: 'dashed' } } // 网格线
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            itemStyle: {
              normal: {
                // 这里是重点
                color: function (params) {
                // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF']
                  return colorList[params.dataIndex]
                }
              }
            },
            barWidth: '60%',
            data: seriesdata
          }
        ]
      }
      return option
    }
  },
  components: {
    Search,
    BarChart
  }
}
</script>
