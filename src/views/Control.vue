<style lang="less" scoped>
// 首页.项目总览
.control {
  margin: 0 .40rem;
  display: flex;
  .left,
  .right {
    width: 4.30rem;
    height: 100%;
  }
  .left{
    .des,.pie{
      .content{
        .body{
          .name{
            font-size: .18rem;
            margin-bottom: .12rem;
            span{
              color:#FEAB67;
            }
          }
        }
      }
    }
  }
  .mid {
    flex: 1;
    margin: 0 .15rem;
    .map{
      height:8.03rem;
    }
  }
  .col {
    position: relative;
    width: 4.30rem;
    height: 3.94rem;
    box-sizing: border-box;
    padding:.36rem .38rem;
    border: 0.02rem solid rgba(32, 64, 129, .71);
    box-shadow: 0rem 0rem .30rem rgb(54, 100, 134) inset;
    margin-bottom: .15rem;
    .content{
       color:#9FC9F7;
        .title{
          margin-bottom: .18rem;
          font-size: .24rem;
        }
        .chart {
          height:2.50rem;
        }
    }
    .L{
      position: absolute;
      background-size: 100% 100%;
      width: .20rem;
      height: .20rem;
    }
    .L:nth-child(1){
      background-image: url(~@/assets/img/top-left.png);
      top:-.04rem;
      left: -.04rem
    }
    .L:nth-child(2){
      background-image: url(~@/assets/img/top-right.png);
      top:-.04rem;
      right: -.04rem;
    }
    .L:nth-child(3){
      background-image: url(~@/assets/img/bot-left.png);
      bottom: -.04rem;
      left: -.04rem;
    }
    .L:nth-child(4){
      background-image: url(~@/assets/img/bot-rig.png);
      bottom:-.04rem;
      right: -.04rem;
    }

  }
}
</style>
<template>
  <!-- 项目总览--重要 -->
  <div class="control">
    <div class="left">
      <div class="des col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">项目基本信息展示</div>
          <div class="body">
            <!-- 名称 -->
            <div class="name">项目名称：<span> {{itemName}}</span></div>
            <div class="name">项目状态：<span> {{datas.ItemData.mItemActive===1 ? '进行中' : '已完结'}}</span></div>
            <div class="name">建设单位：<span> {{datas.ItemData.mItemSGUint}}</span></div>
            <div class="name">咨询单位：<span> {{datas.ItemData.mItemJGUint}}</span></div>
            <div class="name">最大标段数：<span> {{datas.ItemData.mItemBidSun}}</span></div>
            <div class="name">总的里程数（km）：<span> {{datas.ItemData.mItemTotalLength}}</span></div>

          </div>
        </div>
      </div>
      <div class="pie col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">预警按类型分类统计</div>
          <PieChart :id="'pie1'" :data="dataPie1" class = "chart"></PieChart>
        </div>

      </div>
      <!-- <div class="pie col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">预警按预警级别分类统计</div>
          <PieChart :id="'pie2'" :data="dataPie2" class = "chart"></PieChart>
        </div>
      </div> -->
    </div>
    <div class="mid">
      <Map class="map" :data="datas.DevData" :colorType="0"></Map>
    </div>
    <div class="right">
      <div class="columnar col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">总体进度</div>
          <BarChart :id="'bar1'" :data="dataBar1" class = "chart"></BarChart>
        </div>
      </div>
      <div class="curve col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">每日生产总量统计（kg）</div>
          <CurveChart :id="'curve1'" :data="dataCurve1" class = "chart"></CurveChart>
        </div>
      </div>
      <!-- <div class="columnar col">
        <div class="kuang">
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
          <div class="L"></div>
        </div>
        <div class="content">
          <div class="title">摊铺和碾压里程统计（km）</div>
          <CurveChart :id="'bar2'" :data="dataBar2" class = "chart"></CurveChart>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart.vue'
import BarChart from '@/components/BarChart.vue'
import CurveChart from '@/components/CurveChart.vue'
import Map from '@/components/Map.vue'
export default {
  data () {
    return {
      ifdisplayItem: false,
      itemName: '',
      // itemId页面生成时取得，没有取到就监听，直到取到了再ajax再呈现页面信息
      itemId: 1,
      // hello: this.isF
      datas: {
        // 项目信息
        ItemData: {},
        // 地图-设备状态
        DevData: []
      },
      dataPie1: null,
      dataPie2: null,
      dataBar1: null,
      dataCurve1: null,
      dataBar2: null,
      timer: null
    }
  },
  mounted () {
    if (!this.ifdisplayItem) {
    // 得到项目详情
      this.displayItem()
      this.ifdisplayItem = true
    }
    this.timer = setInterval(() => {
      // console.log('请求了')
      this.displayItem()
    }, 60000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  computed: {
    itemInfo () {
      return this.$store.state.itemInfo.id
    }
  },
  watch: {
    itemInfo: function (newVal, oldVal) {
      console.log('watch到了,项目' + oldVal + '变成：项目' + newVal)
      // 切换项目时得到项目详情
      this.displayItem()
    },
    immediate: true
  },
  methods: {
    // 得到项目数据
    displayItem () {
      this.itemId = this.$store.state.itemInfo.id
      this.itemName = this.$store.state.itemInfo.des
      // console.log('control刷新了，当前项目是：' + this.itemId)
      // 取得数据
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.itemId
      }
      // console.log(obj)
      this.comFun.post('/Index/getHomePageData', obj, this).then(
        rs => {
          // console.log(JSON.stringify(rs.data))
          if (rs.code === 0) {
          //  项目信息
            this.datas.ItemData = rs.data.ItemData
            // 预警类型饼图
            this.dataPie1 = this.handlePieData(rs.data.AlarmData.data, 'type_name', 'rep', '预警类型分类统计')
            // 进度柱状图
            this.dataBar1 = this.handleBarData(rs.data.ScRate, 'name', 'rep')
            // 每日生产总量统计曲线图
            this.dataCurve1 = this.handleCurveData(rs.data.BhDayData.data, 'time', 'value')
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
    },
    // 处理饼图数据
    handlePieData (data, name, rep, title) {
      let legenddata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        legenddata.push(data[i][name])
        seriesdata.push({
          value: data[i][rep],
          name: data[i][name]
        })
      }
      // 给饼图赋值
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#9FC9F7'
          },
          data: legenddata
        },
        color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
        series: [
          {
            name: title,
            type: 'pie',
            label: {
              formatter: '{b}: ({d}%)'
            },
            // 饼图大小
            radius: ['24%', '50%'],
            // 饼图位置左右/上下
            center: ['52%', '65%'],
            data: seriesdata,
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
    },
    // 处理柱状图数据
    handleBarData (data, name, val) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][name])
        seriesdata.push(data[i][val])
      }
      let option = {
        color: ['#6996F3'],
        textStyle: {
          color: '#9FC9F7'
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
            type: 'value',
            splitLine: { show: true, lineStyle: { color: ['#333'] } } // 网格线
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            }
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
    },
    // 处理曲线图
    handleCurveData (data, time, val) {
      let xAxisdata = []
      let seriesdata = []
      for (var i = 0; i < data.length; i++) {
        xAxisdata.push(data[i][time])
        seriesdata.push(data[i][val])
      }
      let option = {
        color: ['#6996F3'],
        textStyle: {
          color: '#9FC9F7'
        },
        xAxis: {
          type: 'category',
          data: xAxisdata
        },
        yAxis: {
          type: 'value',
          splitLine: { show: true, lineStyle: { color: ['#333'] } } // 网格线
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '0',
          bottom: '3%',
          containLabel: true
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
    PieChart,
    BarChart,
    CurveChart,
    Map
  }
}
</script>
