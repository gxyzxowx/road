<style scoped lang="less">
.canvas {
  background: #fff;
}
  .warp{
    position: relative;
    .out-canvas{
      position: relative;
      width: 100%;
      height: 100%;
      border:5px solid #F0F4FE;
      overflow-x:scroll;
      .mousemove{
        font-size: 16px;
        position: absolute;
      }
    }
  }
  .warp .colors{
    position: absolute;
    z-index: 9;
    right: .3rem;
    top: .8rem;
  }
  .warp .colors ul{
    list-style: none;
    border:1px solid #666;
    margin: 0;
  }
  .warp .colors li{
    width: 1rem;
    height: .5rem;
    font-size: .15rem;
    text-align: center;
    line-height: .5rem;
  }

</style>
<template>
  <div class="warp" ref = "move">
    <div class="button">
      <div class="info">
        <Button @click = "handleScale(1)">放大</Button>
        <Button @click = "handleScale(-1)">缩小</Button>
      </div>
      <div class="colors">
      <ul>
        <li v-for="(item, index) in colors" :style="'background: ' + item.col" :key = "index">{{item.str}}</li>
      </ul>
      </div>
    </div>
    <div class="out-canvas">
        <canvas
          class="canvas"
          id="myCanvas"
          :width="canvasW"
          :height="canvasH"
          style="border:1px solid #ccc;"
        ></canvas>
    </div>

  </div>
</template>
<script>
import mockdata from '@/data/mockdata.json'
export default {
  data () {
    return {
      canvasW: 1200,
      canvasH: 1200,
      canvas: null,
      colors: [],
      // 放大缩小的倍数
      size: 1,
      currentTimes: 0,
      Xlocation: 0,
      Ylocation: 0,
      ctx: null,
      // 碾压坐标信息
      XYdata: [],
      // 道路坐标信息
      road_data: [],
      // 单层的透明度（0-255)
      step: 25.5,
      // 坐标点
      // 测试
      // testarr: [[{ 'x': '10.80', 'y': '100' }, { 'x': '10.80', 'y': '200' }, { 'x': '20.70', 'y': '223.00' }, { 'x': '20.70', 'y': '100' }],
      //   [{ 'x': '11.70', 'y': '223.00' }, { 'x': '11.70', 'y': '336.00' }, { 'x': '58.70', 'y': '213.80' }, { 'x': '58.70', 'y': '326.80' }]],
      testarr: mockdata,
      // 4中区间颜色rgb值
      colorArr: [
        [250, 228, 35],
        [213, 250, 35],
        [64, 224, 102],
        [2, 166, 104]
      ],
      flag: true,
      // 25中颜色各有多少像素点 的百分数 数组
      colorsPersent: []
    }
  },
  props: ['id', 'data'],
  watch: {
    data: {
      handler (newVal, oldVal) {
        this.XYdata = newVal.data
        this.road_data = newVal.road_data
        // 遍历road_data数据，找到最大X和最大Y
        let [xArr, yArr] = [[], []]

        this.road_data.map((item, index, arr) => {
          xArr.push(item[0]['x'], item[1]['x'])
          yArr.push(item[2]['y'], item[3]['y'])
        })
        // canvas自适应最大坐标
        this.canvasW = Math.max(...xArr) + 100
        this.canvasH = Math.max(...yArr) + 80
        console.log(JSON.stringify(this.road_data[0]))
        console.log(this.canvasW)
        console.log(this.canvasH)
        if (this.ctx) {
          // 有ctx时是点搜索的时候，清理画布
          this.ctx.clearRect(0, 0, 32766, 32766)
        }
        this.$nextTick(() => {
          this.canvas = document.getElementById('myCanvas')
          this.ctx = this.canvas.getContext('2d')
          // 真实数据
          this.initCanvas()

          // 画道路
          this.initRoad()
        })
      }
    },
    deep: true
  },
  created () {
    // console.log(123)
  },
  mounted () {
    // 测试时打开
    // this.initCanvas()

    // 处理颜色条样式
    this.handlerColorsBar()
  },
  methods: {
    initRoad () {
      let ctx = this.ctx
      let road = this.road_data
      // ctx.globalAlpha = this.step / 255
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0,0,0,1)'
      ctx.lineWidth = 0.1
      ctx.moveTo(road[0][3]['x'], road[0][3]['y'])
      // ctx.lineTo(road[0][1]['x'], road[0][1]['y'])
      for (var i = 0; i < road.length; i++) {
        // ctx.fillStyle = 'rgba(228,162,251,1)'

        // 真实数据

        ctx.lineTo(road[i][3]['x'], road[i][3]['y'])
        ctx.lineTo(road[i][1]['x'], road[i][1]['y'])
        // 为道路添加桩号
        // 设置字体
        ctx.font = '10px bold 黑体'
        // 设置颜色
        ctx.fillStyle = '#666'
        if (i % 400 === 0) {
          ctx.fillText(road[i][0]['mZHName'], road[i][0]['x'], road[i][0]['y'])
        }
      }
      for (var j = road.length - 1; j > 0; j--) {
        ctx.lineTo(road[j][0]['x'], road[j][0]['y'])
        ctx.lineTo(road[j][2]['x'], road[j][2]['y'])
      }
      ctx.lineTo(road[0][3]['x'], road[0][3]['y'])
      // ctx.closePath()
      ctx.stroke()
      this.ctx = ctx
    },
    initCanvas () {
      // 测试数据obj是一个数组
      // let obj = this.testarr
      // 真实坐标数据data
      let obj = this.XYdata
      // obj = obj.concat(obj)
      // obj = obj.concat(obj)
      // obj = obj.concat(obj)
      // console.log(JSON.stringify(obj, null, 2))

      let ctx = this.ctx
      // ctx.globalAlpha = this.step / 255
      for (var i = 0; i < obj.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(0,0,0,0)'
        ctx.lineWidth = 0.1
        ctx.fillStyle = this.handleColors(obj[i][0]['Temp'])

        // 真实数据
        ctx.moveTo(obj[i][0]['x'], obj[i][0]['y'])
        ctx.lineTo(obj[i][1]['x'], obj[i][1]['y'])
        ctx.lineTo(obj[i][3]['x'], obj[i][3]['y'])
        ctx.lineTo(obj[i][2]['x'], obj[i][2]['y'])

        ctx.fill()
        ctx.closePath()
        ctx.stroke()
      }
      this.ctx = ctx

      // console.log(ctx)
      // this.changeColor(this.canvas, ctx)
    },
    handleColors (temp) {
      let arr = this.colorArr
      let fn = (c) => {
        let colorStr = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ')'
        return colorStr
      }
      if (temp < 130) {
        // 黄色
        return fn(arr[0])
      } else if (temp >= 130 && temp < 140) {
        // 浅绿色
        return fn(arr[1])
      } else if (temp >= 140 && temp < 150) {
        // 绿色
        return fn(arr[2])
      } else if (temp >= 150) {
        // 深绿色
        return fn(arr[3])
      }
    },
    // 处理颜色条样式
    handlerColorsBar () {
      for (let i = 0; i < 4; i++) {
        let str = ''
        switch (i) {
          case 0:
            str = '小于130℃'
            break
          case 1:
            str = '130℃~140℃'
            break
          case 2:
            str = '140℃~150℃'
            break
          default:
            str = '大于150℃'
            break
        }
        this.colors.push({
          str: str,
          col: 'rgb(' + this.colorArr[i][0] + ',' + this.colorArr[i][1] + ',' + this.colorArr[i][2] + ')'
        })
      }
    },
    waitTime () {
      setTimeout(() => {
        this.flag = true
      }, 300)
    },
    handleScale (scale) {
      if (!this.flag) {
        console.log('go')
        return
      }
      this.flag = false
      this.waitTime()
      if (scale > 0) {
        console.log('放大')
        this.canvasW = this.canvasW * 1.2
        this.canvasH = this.canvasH * 1.2
        this.$nextTick(() => {
          this.size = this.size * 1.2
          this.ctx.scale(this.size, this.size)
          this.ctx.clearRect(0, 0, 32766, 32766)
          // 真实数据
          this.initCanvas()

          // 画道路
          this.initRoad()
        })
      } else {
        console.log('缩小')
        this.canvasW = this.canvasW * 0.8
        this.canvasH = this.canvasH * 0.8
        this.$nextTick(() => {
          this.size = this.size * 0.8
          this.ctx.scale(this.size, this.size)
          this.ctx.clearRect(0, 0, 32766, 32766)
          // 真实数据
          this.initCanvas()

          // 画道路
          this.initRoad()
        })
      }
    }
  }
}
</script>
