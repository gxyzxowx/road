<!-- 质量监管--级配 -->
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
<!-- 质量监管--级配 -->
  <div>
    <div class="search">
      <!-- 条件 -->
      <Search v-on:getData="getData"></Search>
    </div>
    <div class="content">
      <div class="curve">
        <!-- <h4>级配曲线图</h4> -->
        <!-- 级配曲线图 -->
        <CurveChart :id="'curve1'" :data="datacurve1" class = "chart"></CurveChart>
      </div>
      <div class="total">
        <!-- 汇总信息 -->
        <h4>标准</h4>
        <Table  border :columns="listTitle1" :data="datalist1" size="small"  :width="tableWidth2" stripe></Table>
      </div>
      <div class="desc">
        <h4>详细数据</h4>
        <!-- 详细信息 -->
        <Table  height="82" border :columns="listTitle2" :data="datalist2" size="small"  :width="tableWidth2" stripe></Table>
      </div>
    </div>

  </div>
</template>

<script>
// 0.075 ，0.15,0.3,0.6,1.18,2.36,4.75,9.5,19.0,26.5,31.5,37.5共12项
import Search from '@/components/SC/DataSearch.vue'
import CurveChart from '@/components/CurveChart.vue'
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      tableWidth2: '1200',
      datacurve1: null,
      listTitle1: [
        {
          'title': '0.075',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP00075',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP00075_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP00075_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '0.15',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP0015',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP0015_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP0015_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '0.3',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP003',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP003_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP003_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '0.6',
          key: 'mItemBid',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP006',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP006_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP006_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '1.18',
          key: 'mAlarmLevel',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP0118',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP0118_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP0118_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '2.36',
          key: 'title',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP0236',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP0236_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP0236_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '4.75',
          key: 'mDateTime',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP0475',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP0475_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP0475_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '9.5',
          key: 'mItemBid',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP095',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP095_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP095_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '19.0',
          key: 'mItemBid',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP190',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP190_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP190_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '26.5',
          key: 'mAlarmLevel',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP265',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP265_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP265_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '31.5',
          key: 'mItemBid',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP315',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP315_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP315_Down',
              'align': 'center',
              'width': 74
            }
          ]
        },
        {
          title: '37.5',
          'align': 'center',
          'children': [
            {
              'title': '目标值',
              'key': 'mClJP375',
              'align': 'center',
              'width': 74
            },
            {
              'title': '上限',
              'key': 'mClJP375_Up',
              'align': 'center',
              'width': 74
            },
            {
              'title': '下限',
              'key': 'mClJP375_Down',
              'align': 'center',
              'width': 74
            }
          ]
        }
      ],
      listTitle2: [
        {
          title: '0.075',
          key: 'mBhSKL00075'
        },
        {
          title: '0.15',
          key: 'mBhSKL0015'
        },
        {
          title: '0.3',
          key: 'mBhSKL003'
        },
        {
          title: '0.6',
          key: 'mBhSKL006'
        },
        {
          title: '1.18',
          key: 'mBhSKL0118'
        },
        {
          title: '2.36',
          key: 'mBhSKL0236'
        },
        {
          title: '4.75',
          key: 'mBhSKL0475'
        },
        {
          title: '9.5',
          key: 'mBhSKL095'
        },
        {
          title: '19.0',
          key: 'mBhSKL190'
        },
        {
          title: '26.5',
          key: 'mBhSKL265'
        },
        {
          title: '31.5',
          key: 'mBhSKL315'
        },
        {
          title: '37.5',
          key: 'mBhSKL375'
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
        type: 3
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
            xdata.push(item['mBhSKL'])
            arr1.push(item['Up'])
            arr2.push(item['Aver'])
            arr3.push(item['Down'])
          })
          let arr = [arr1, arr2, arr3]
          this.datacurve1 = this.handleCurveData(arr, xdata, '级配曲线图')

          // 处理list1
          let listArr1 = []
          listArr1.push(rs.data.standard)
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
