<style lang="scss" scoped>
  .chart1{
    height: 100%;
  }
</style>
<template>

    <div class="chart1" v-bind:id=id v-bind:data=data></div>

</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartPie: null
    }
  },
  created () {
  },
  props: ['id', 'data'],
  //  深度监听 父组件刚开始没有值，只有图标的配置项
  //  父组件ajax请求后改变数据的值，传递过来，图标已生成，监听传过来的值的改变

  watch: {
    data: {
      handler (newVal, oldVal) {
        // console.log(this.data)
        this.drawPie(this.id, newVal)
      }
    },
    deep: true
  },
  methods: {
    drawPie (id, data) {
      let myChart = echarts.init(document.getElementById(id))
      let option = data
      this.chartPie = myChart.setOption(option, true)
    }
  },
  mounted () {
    // let myChart = echarts.init(document.getElementById('chart1'))
    // let option = {
    //   tooltip: {
    //     trigger: 'item',
    //     formatter: '{a} <br/>{b} : {c} ({d}%)'
    //   },
    //   legend: {
    //     orient: 'vertical',
    //     left: 'left',
    //     textStyle: {
    //       color: '#CCE2FB'
    //     },
    //     data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    //   },
    //   color: ['#14C6CA', '#6996F3', '#DA6C75', '#FEAB67', '#41A8F2', '#AB90DF'],
    //   series: [
    //     {
    //       name: '访问来源',
    //       type: 'pie',
    //       radius: ['24%', '50%'],
    //       center: ['50%', '40%'],
    //       data: [
    //         { value: 335, name: '直接访问' },
    //         { value: 310, name: '邮件营销' },
    //         { value: 234, name: '联盟广告' },
    //         { value: 135, name: '视频广告' },
    //         { value: 1548, name: '搜索引擎' }
    //       ],
    //       itemStyle: {
    //         emphasis: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)'
    //         }
    //       }
    //     }
    //   ]
    // }
    // myChart.setOption(option)
    // window.addEventListener('resize', function () {
    //   myChart.resize()
    // })
  },
  beforeDestroy () {
    if (this.chartPie) {
      this.chartPie.clear()
    }
  }

}
</script>
