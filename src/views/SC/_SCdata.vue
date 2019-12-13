<style scoped>
.content{
   margin-top: .30rem;
}
.bar1{
    margin-bottom: .25rem;
  }
  .scdata .content .title{
    margin-top: .40rem;
    margin-bottom: .20rem;
    font-size: .17rem;
    font-weight: 700;
  }
  .scdata .content .top .chart{
    height:2rem;
  }
</style>
<template>
  <div class='scdata'>
    <Search v-on:getData="getData"></Search>
    <div class="content">
      <div class="top">
         <div class="bar1">
<BarChart :id="'bar1'" :data="dataBar1" class = "chart"></BarChart>
        </div>
        <div class="bar2">
<BarChart :id="'bar2'" :data="dataBar2" class = "chart"></BarChart>
        </div>
      </div>
      <div class="bottom">
        <!-- 产量列表 -->
<div class="title">产量列表</div>
<Table :loading="loading" height="300" border :columns="listTitle" :data="datalist"></Table>
<Switch v-model="loading"></Switch>
<div style="margin: .10rem;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata"  :page-size="page.rows" :current.sync="page.current" @on-change="changePage"></Page>
        </div>
    </div>
      </div>

    </div>

  </div>
</template>
<script>
import Search from '@/components/Search.vue'
import BarChart from '@/components/BarChart.vue'
export default {
  data () {
    return {
      loading: true,
      // 各个总量统计柱状图
      dataBar1: null,
      dataBar2: null,
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 10
      },
      // 点击搜索产生的值暂存
      emitobj: {
        mClTypeValue: '',
        mItemBid: '',
        start_time: '',
        end_time: ''
      },
      listTitle: [
        {
          title: '生产日期',
          key: 'mBhDateTime',
          width: 180
        },
        {
          title: '材料类型',
          key: 'mClTypeName'
        },
        {
          title: '生产总量',
          key: 'mBhItemNO'
        },
        {
          title: '油石比',
          key: 'mBnYSB'
        },
        {
          title: '出料温度',
          key: 'mBhItemTemp'
        },
        {
          title: '合格',
          key: 'mBhScAlarm'
        },
        {
          title: '温度预警',
          key: 'mBhItemTempAlarm'
        },
        {
          title: '油石比预警',
          key: 'mBhYSBAlarm'
        },
        {
          title: '级配预警',
          key: 'SKLAlarm'
        }
      ],
      datalist: []
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
        mItemID: this.$store.state.itemInfo.id,
        page: this.page.current,
        rows: this.page.rows
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        // console.log('是emit过来的参数:' + JSON.stringify(emitobj))
      }
      obj = { ...obj, ...this.emitobj }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Produce_J_G/productData', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 总页数
          this.page.totaldata = rs.data.total

          // 列表 图
          // 处理列表数据
          rs.data.data_list.map((item, index, arr) => {
            arr[index].mBhItemTemp = item.mBhItemTemp + '℃'
            // 预警：0:无预警 1:产生预警
            arr[index].mBhScAlarm = item.mBhScAlarm ? '是' : '否'
            arr[index].mBhItemTempAlarm = item.mBhItemTempAlarm ? '是' : '否'
            arr[index].mBhYSBAlarm = item.mBhYSBAlarm ? '是' : '否'
            arr[index].SKLAlarm = item.SKLAlarm ? '是' : '否'
            arr[index].mBnYSB = item.mBnYSB + '%'
          })
          this.datalist = rs.data.data_list
          // 各个标段总量统计柱状图
          this.dataBar1 = this.handleBarData(rs.data.BhBidData, 'name', 'value', '拌合站产量按标段统计（kg）')
          // 各个材料总量统计柱状图
          this.dataBar2 = this.handleBarData(rs.data.BhClTypeData, 'name', 'value', '拌合站产量按材料类型统计（kg）', 1)
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
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    }
  },
  components: {
    Search,
    BarChart
  }
}
</script>
