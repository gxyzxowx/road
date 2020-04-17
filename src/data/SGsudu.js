/*
 * @Date         : 2020-04-14 09:57:52
 * @LastEditors  : 曾迪
 * @LastEditTime : 2020-04-14 09:59:57
 * @FilePath     : \road\src\data\SGsudu.js
 */

export default {
  data () {
    return {
      loading: false,
      mUserID: '',
      mItemID: '',
      tableWidth2: '1200',
      datacurve1: null,
      firstDevID: null,
      listTitle1: [
        {
          title: '平均值km/h',
          key: 'SpeedAver'
        },
        {
          title: '上限km/h',
          key: 'mDevSDSX'
        },
        {
          title: '下限km/h',
          key: 'mDevSDXX'
        }
      ],
      datalist1: []
    }
  },
  methods: {
    getDevID (e) {
      console.log(e)
      this.firstDevID = e
    },
    getData (emitobj) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID
      }
      // 有emitobj是子组件点击搜索的时候
      if (emitobj) {
        this.emitobj = emitobj
        console.log('是emit过来的参数:' + JSON.stringify(emitobj))
        obj = { ...obj, ...this.emitobj }
      }
      console.log(obj)
      this.comFun.post('/Locus/getDevTempSpeedData', obj, this).then((rs) => {
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
            xdata.push(item['datetime'])
            arr1.push(item['mDevSDSX'])
            arr2.push(item['Speed'])
            arr3.push(item['mDevSDXX'])
          })
          let arr = [arr1, arr2, arr3]
          this.datacurve1 = this.handleCurveData(arr, xdata)

          // 处理list1
          let listArr1 = []
          listArr1.push(rs.data.static_data)
          this.datalist1 = listArr1
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 处理曲线图
    handleCurveData (arr, xdata) {
      let legendData = ['上限', '实际值', '下限']
      let option = {
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
          type: 'value',
          axisLabel: {
            formatter: function (arr) {
              return arr + 'km/h'
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
  }
}
