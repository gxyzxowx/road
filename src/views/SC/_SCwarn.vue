<style scoped>
  .top{
    margin-top: .40rem;
    margin-bottom: .30rem;
    display:flex;
    justify-content: space-around;
  }
  .top .chart{
    height:2.50rem;
    width:5rem;
  }
</style>
<template>
  <div class="scwarn">
<Search v-on:getData="getData"></Search>
<div class="content">
  <div class="top">
    <div class="left">
      <!-- <div class="title">预警按类型分类统计</div> -->
          <PieChart :id="'pie1'" :data="dataPie1" class = "chart"></PieChart>
    </div>
    <div class="right">
      <!-- <div class="title">预警按预警级别分类统计</div> -->
          <PieChart :id="'pie2'" :data="dataPie2" class = "chart"></PieChart>
    </div>
  </div>
  <div class="bottom">
            <!-- 预警列表 -->
<div class="title">预警列表</div>
<Table :loading="loading" height="500" border :columns="listTitle" :data="datalist"></Table>
<Switch v-model="loading"></Switch>
<div style="margin: .1rem;overflow: hidden">
        <div style="float: right;">
            <Page :total="page.totaldata" :current.sync="page.current" :page-size="page.rows" @on-change="changePage"></Page>
        </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import Search from '@/components/Search.vue'
import PieChart from '@/components/PieChart.vue'
export default {
  data () {
    return {
      loading: true,
      dataPie1: null,
      dataPie2: null,
      page: {
        // 数据总条数
        totaldata: 1,
        // 当前页数
        current: 1,
        // 每页条数
        rows: 7
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
          title: '时间',
          key: 'mDateTime',
          width: 169
        },
        {
          title: '项目标段',
          key: 'mItemBid',
          width: 70
        },
        {
          title: '设备类型',
          key: 'mDevType',
          width: 130
        },
        {
          title: '预警等级',
          key: 'mAlarmLevel',
          width: 70
        },
        {
          title: '温度',
          key: 'mAlarmType_temp',
          width: 70
        },
        {
          title: '油石比',
          key: 'mAlarmType_ysb',
          width: 80
        },
        {
          title: '级配',
          key: 'mAlarmType_jp',
          width: 70
        },
        {
          title: '速度',
          key: 'mAlarmType_speed',
          width: 70
        },
        {
          title: '预警描述',
          key: 'mAlarmDec'
        }
      ],
      datalist: []
    }
  },
  mounted () {
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
      this.comFun.post('/Produce_J_G/getAlarmData', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 总页数
          this.page.totaldata = rs.total
          console.log(this.page.totaldata)
          // 处理单位(是否)
          rs.data.map((item, index, arr) => {
            arr[index].mAlarmType_temp = item.mAlarmType_temp ? '是' : '否'
            arr[index].mAlarmType_ysb = item.mAlarmType_ysb ? '是' : '否'
            arr[index].mAlarmType_jp = item.mAlarmType_jp ? '是' : '否'
            arr[index].mAlarmType_speed = item.mAlarmType_speed ? '是' : '否'
          })
          this.datalist = rs.data
          // 预警类型饼图
          this.dataPie1 = this.handlePieData(rs.result.AlarmData.data, 'type_name', 'rep', '预警类型分类统计')
          // 预警级别分类饼图
          this.dataPie2 = this.handlePieData(rs.result.AlarmLevelData.data, 'level_name', 'rep', '预警级别分类统计')
        }
      }, (err) => { console.log(err) })
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
          top: '30',
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
              formatter: '{b}: {@2012} ({d}%)'
            },
            radius: ['24%', '55%'],
            center: ['55%', '60%'],
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
    changePage () {
      // 更换页数
      this.getData()
      console.log('切换page:' + this.page.current)
    }
  },
  components: {
    Search,
    PieChart
  }
}
</script>
