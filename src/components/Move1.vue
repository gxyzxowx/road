<style scoped lang="less">
.canvas {
  background: #fff;
}
  .warp{
    position: relative;
    .button{
      .info{
        display: flex;
        .tex{
          height: .4rem;
          line-height: .4rem;
          display: flex;
          width: 7rem;
          justify-content: space-between;
          p:first-of-type{
            margin-left: .2rem;
          }
        }
      }
    }
    .out-canvas{
      position: relative;
      width: 16rem;
      height: 7.5rem;
      // border:1px solid red;
      overflow-x:scroll;
      .mousemove{
        position: absolute;
      }
    }
  }
  .warp .colors{
    position: absolute;
    right: .6rem;
    top: .35rem;
  }
  .warp .colors ul{
    list-style: none;
    margin: 0;
  }
  .warp .colors li{
    width: .5rem;
    height: .3rem;
    border:1px solid #000;
    text-align: center;
    line-height: .25rem;
  }
</style>
<template>
  <div class="warp" ref = "move">
    <div class="button">
      <div class="info">
        <Button @click = "handleScale(1)">放大</Button>
        <Button @click = "handleScale(-1)">缩小</Button>
        <div class="tex">
          <p slot="title">当前点击坐标遍数： {{currentTimes}}</p>
          <p>当前坐标 X：{{Xlocation}}， Y:{{Ylocation}}</p>
        </div>
      </div>
      <div class="colors">
      <ul>
        <li v-for="(item, index) in colors" :style="'background: ' + item.col" :key = "index">{{item.index}}遍</li>
      </ul>
      </div>
    </div>
    <div class="out-canvas">
        <canvas
          class="canvas"
          id="myCanvas"
          width="3500"
          height="3500"
          style="border:1px solid #999;"
          @mousemove="getXY"
        ></canvas>
        <div class="mousemove" :style=" {left: this.Xlocation + 'px', top: this.Ylocation + 'px' }">
          <div class="top">x:{{Xlocation}},y:{{Ylocation}}</div>
          <div class="botm">{{currentTimes}}遍</div>
        </div>
    </div>

  </div>
</template>
<script>
import mockdata from '@/data/mockdata.json'
export default {
  data () {
    return {
      canvasW: 1200,
      canvasH: 1000,
      colors: [],
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
      // 25遍颜色rgb值
      colorArr: [
        [196, 211, 244],
        [164, 188, 238],
        [131, 170, 243],
        [96, 148, 242],
        [63, 127, 241],
        [27, 102, 237],
        [8, 67, 173],
        [169, 227, 194],
        [76, 197, 130],
        [19, 169, 89],
        [2, 145, 2],
        [3, 130, 3],
        [3, 113, 3],
        [255, 238, 197],
        [255, 222, 142],
        [252, 201, 79],
        [252, 173, 79],
        [239, 149, 43],
        [239, 117, 43],
        [218, 93, 18],
        [202, 51, 17],
        [193, 0, 0],
        [180, 0, 0],
        [130, 0, 0],
        [108, 0, 0]
      ],
      flag: true,
      maxTimes: 25
    }
  },
  props: ['id', 'data'],
  watch: {
    data: {
      handler (newVal, oldVal) {
        this.XYdata = newVal.data
        this.road_data = newVal.road_data
        console.log(JSON.stringify(newVal))
        // 真实数据
        this.initCanvas()

        // 画道路
        this.initRoad()
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
    // window.addEventListener('mousewheel', this.handleScroll, false)

    // 处理颜色条样式

    for (let i = 0; i < this.maxTimes; i++) {
      this.colors.push({
        index: i + 1,

        col: 'rgb(' + this.colorArr[i][0] + ',' + this.colorArr[i][1] + ',' + this.colorArr[i][2] + ')'
      })
    }

    // canvans宽度自适应
    this.canvasW = this.$refs.move.offsetWidth - 50
    this.canvasH = this.$refs.move.offsetHeight - 200
  },
  methods: {
    initRoad () {
      let road = this.road_data
      let ctx = this.ctx
      // ctx.globalAlpha = this.step / 255
      for (var i = 0; i < road.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(209,123,238,1)'
        ctx.lineWidth = 0.1
        ctx.fillStyle = 'rgba(209,123,238,1)'

        // 真实数据
        ctx.moveTo(road[i][0]['x'], road[i][0]['y'])
        ctx.lineTo(road[i][1]['x'], road[i][1]['y'])
        ctx.lineTo(road[i][3]['x'], road[i][3]['y'])
        ctx.lineTo(road[i][2]['x'], road[i][2]['y'])

        ctx.fill()
        ctx.closePath()
        ctx.stroke()
        // 为道路添加桩号
        // 设置字体
        ctx.font = '18px bold 黑体'
        // 设置颜色
        ctx.fillStyle = '#ff0'
        ctx.fillText('要写的文字', 100, 100)
        this.ctx = ctx
      }
    },
    initCanvas () {
      // 测试数据obj是一个数组
      // let obj = this.testarr
      // 真实坐标数据data
      let obj = this.XYdata
      console.log(JSON.stringify(obj, null, 2))
      let canvas = document.getElementById('myCanvas')
      let ctx = canvas.getContext('2d')
      // ctx.globalAlpha = this.step / 255
      for (var i = 0; i < obj.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(0,0,0,0)'
        ctx.lineWidth = 0.1
        ctx.fillStyle = 'rgba(0,0,0,' + this.step / 255 + ')'

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
      this.canvas = canvas
      // console.log(ctx)
      this.changeColor(canvas, ctx)
    },
    // 处理透明度的值
    handleTimesAlphaData () {
      // 碾压最大遍数
      let maxTimes = this.maxTimes
      // 从0-20遍 前一次叠加透明度的值（0-255）
      var lastAlpha = 0
      // 单层的透明度值（透明度的值为0-255）
      let step = this.step
      // 透明度数组
      let aArr = []
      // console.log(step / 255)
      for (var i = 0; i < maxTimes; i++) {
        lastAlpha = (1 - (1 - lastAlpha) * (1 - step / 255))
        // lastAlpha = 255 - lastAlpha - step * lastAlpha / 255
        lastAlpha = parseFloat(lastAlpha)
        let newVal = parseFloat(lastAlpha * 255)
        aArr.push(newVal)
      }
      return aArr
    },
    // 根据遍数自定义颜色
    changeColor (canvas, ctx) {
      // 处理25遍碾压的各种数值，0绝对透明，255不透明
      let aArr = this.handleTimesAlphaData()
      console.log(aArr)
      // let aArr = [0, 51, 92, 125, 151, 172]
      // 获得画布所有数据(25遍)
      let colorArr = this.colorArr
      // 得到所有点信息
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < imgData.data.length; i += 4) {
        let alpha = imgData.data[i + 3]

        for (let j = 0; j < aArr.length; j++) {
          let mixinBegin = 2
          let mixinEnd = 2
          // 对不同边线的模糊值处理
          if (j === 0) { mixinBegin = 16 }// 第一个
          if (alpha > 234 && alpha <= 255) {
            imgData.data[i] = 108
            imgData.data[i + 3] = 255
          }// 处理最后一个颜色
          // 处理其他所有有透明度值的点
          if (alpha >= aArr[j] - mixinBegin && alpha <= aArr[j + 1] - mixinEnd) {
            imgData.data[i] = colorArr[j][0]
            imgData.data[i + 1] = colorArr[j][1]
            imgData.data[i + 2] = colorArr[j][2]
            imgData.data[i + 3] = 255
          }
        }
      }
      ctx.putImageData(imgData, 0, 0)
      // console.log(imgData)
    },
    // 鼠标事件，得到坐标,得到像素颜色，判断遍数
    getXY (e) {
      let x = e.offsetX
      let y = e.offsetY
      console.log('x:' + x + ';y:' + y)
      this.Xlocation = x
      this.Ylocation = y

      this.getXYColor(x, y)
    },
    getXYColor (x, y) {
      let colorData = this.ctx.getImageData(x, y, 1, 1)
      // console.log(colorData)
      let red = parseInt(colorData.data[0])
      let green = parseInt(colorData.data[1])
      let blue = parseInt(colorData.data[2])
      let alpha = parseInt(colorData.data[3])
      let rgba = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha / 255 + ')'
      console.log(rgba)
      console.log(alpha)
      // 对应颜色找到遍数   遍历colorArr
      let currentTimes = 0
      for (let i = 0; i < this.maxTimes; i++) {
        if (red === this.colorArr[i][0] && green === this.colorArr[i][1] && blue === this.colorArr[i][2]) {
          currentTimes = i + 1
        }
      }
      this.currentTimes = currentTimes
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
        this.ctx.scale(1.5, 1.5)
        this.ctx.clearRect(0, 0, 32766, 32766)
        this.initCanvas()
        this.initRoad()
      } else {
        console.log('缩小')
        this.ctx.scale(0.5, 0.5)
        this.ctx.clearRect(0, 0, 32766, 32766)
        this.initCanvas()
        this.initRoad()
      }
    }
  }
}
</script>
