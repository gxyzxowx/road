<style lang="less" scoped>
.content{
  margin-top: .30rem;
  .bar1{
    margin-bottom: .25rem;
  }
  .top {
    .chartbar {
      height:2rem;
    }
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    margin-top: .30rem;
    .chartpie{
      height:2.60rem;
      width:4.2rem;
    }
  }
}
</style>
<template>
  <!-- 生产监管总览 -->
  <div class="schome">
    <Search v-on:getData="getData"></Search>
    <div class="content">
      <div class="top">
        <div class="bar1">
<BarChart :id="'bar1'" :data="dataBar1" class="chartbar"></BarChart>
        </div>
        <div class="bar2">
<BarChart :id="'bar2'" :data="dataBar2" class="chartbar"></BarChart>
        </div>

      </div>
      <div class="bottom">

 <PieChart :id="'pie1'" :data="dataPie1" class="chartpie"></PieChart>
 <PieChart :id="'pie2'" :data="dataPie2" class="chartpie"></PieChart>
 <PieChart :id="'pie3'" :data="dataPie3" class="chartpie"></PieChart>

      </div>
    </div>
  </div>
</template>
<script>

import PieChart from '@/components/PieChart.vue'
import Search from '@/components/Search.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      select: {
        start_time: '',
        end_time: '',
        mClTypeValue: '',
        mItemBid: ''
      },
      // 各个标段总量统计柱状图
      dataBar1: null,
      dataBar2: null,
      // 预警类型饼图
      dataPie1: null,
      // 预警级别分类饼图
      dataPie2: null,
      // 质量，按合格率统计饼图
      dataPie3: null
    }
  },
  mounted () {
    // 得到总览数据
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
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...emitobj }
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/index', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 各个标段总量统计柱状图
          this.dataBar1 = this.handleBarData(rs.data.BhBidData, 'name', 'value', '拌合站产量按标段统计（kg）')
          // 各个材料总量统计柱状图
          this.dataBar2 = this.handleBarData(rs.data.BhClTypeData, 'name', 'value', '拌合站产量按材料类型统计', 1)
          // 预警类型饼图
          this.dataPie1 = this.handlePieData(rs.data.AlarmData.data, 'type_name', 'rep', '预警类型分类统计')
          // 预警级别分类饼图
          this.dataPie2 = this.handlePieData(rs.data.AlarmLevelData.data, 'level_name', 'rep', '预警级别分类统计')
          // 质量按合格率统计饼图
          this.dataPie3 = this.handlePieData(rs.data.BhStandardData, 'key', 'rep', '质量统计', 3)
        }
      }, (err) => { console.log(err) })
    },
    // 处理柱状图数据
    handleBarData (data, name, val, title, type) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][name])
        seriesdata.push(data[i][val])
      }
      let option = {
        title: {
          text: title,
          textVerticalAlign: 'top'
        },
        color: ['#333'],
        textStyle: {
          color: '#333'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '22%',
          left: '0%',
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
            splitLine: { show: true, lineStyle: { color: ['#ddd'] } } // 网格线
          }
        ],
        series: [
          {
            name: '产量',
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
            barWidth: '40px',
            data: seriesdata
          }
        ]
      }
      if (type) {
        // 是按材料类型的需要有滑动条
        option.dataZoom = [
          {
            show: true,
            start: 0,
            end: 40
          }
        ]
      }
      return option
    },
    // 处理饼图数据
    handlePieData (data, name, rep, title, type, val) {
      let legenddata = []
      let seriesdata = []
      for (let i = 0; i < data.length; i++) {
        legenddata.push(data[i][name])
        seriesdata.push({
          value: data[i][rep],
          name: data[i][name]
        })
      }
      if (type === 3) {
        seriesdata = [
          { value: data[1][rep], name: '不合格：' + data[1].value },
          { value: data[2][rep], name: '合格：' + data[2].value }
        ]
      }
      // 给饼图赋值
      let option = {
        title: {
          text: title,
          textVerticalAlign: 'top'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        legend: {
          orient: 'vertical',
          left: 'left',
          top: '29',
          textStyle: {
            color: '#333'
          },
          data: legenddata
        },
        color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['24%', '55%'],
            center: ['55%', '70%'],
            data: seriesdata,
            label: {
              formatter: '{b}({d}%)'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      return option
    }
  },
  components: {
    PieChart,
    BarChart,
    Search
  }
}
</script>
