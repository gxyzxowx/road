<style scoped lang="less">
.canvas {
  background: #fff;
}
  .warp{
    position: relative;
    .button{
      .info{
        // display: flex;
        .tex{
          height: .8rem;
          line-height: .3rem;
          // display: flex;
          // width: 7rem;
          justify-content: space-between;
          p:first-of-type{
            margin-left: .2rem;
          }
          .bian{
            div{
              display: inline-block;
              width: 1.3rem;
            }
          }
        }
      }
    }
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
    top: .5rem;
  }
  .warp .colors ul{
    list-style: none;
    border:1px solid #666;
    margin: 0;
  }
  .warp .colors li{
    width: .7rem;
    height: .3rem;

    // color:#fff;
    font-size: .1rem;
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
        <!-- <div class="tex">
          <div class="bian">
            <div v-for="(item, index) in colorsPersent" :key="index">{{index + 1}}遍:{{item}}；</div>
          </div>
        </div> -->
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
          :width="canvasW"
          :height="canvasH"
          style="border:1px solid #ccc;"
          @mousemove="getXY"
        ></canvas>
        <div class="mousemove" :style=" {left: this.Xlocation + 'px', top: this.Ylocation + 15 + 'px' }">
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
      canvasH: 1200,
      canvas: null,
      ifFirst: true,
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
      // 25遍颜色rgb值
      colorArr: [
        [250, 228, 35],
        [213, 250, 35],
        [64, 224, 102],
        [2, 166, 104]
      ],
      flag: true,
      maxTimes: 25,
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
        let xArr = []
        let yArr = []

        this.road_data.map((item, index, arr) => {
          xArr.push(item[0]['x'], item[1]['x'])
          yArr.push(item[2]['y'], item[3]['y'])
        })

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

    for (let i = 0; i < this.maxTimes; i++) {
      this.colors.push({
        index: i + 1,

        col: 'rgb(' + this.colorArr[i][0] + ',' + this.colorArr[i][1] + ',' + this.colorArr[i][2] + ')'
      })
    }

    // canvans宽度自适应
    // this.canvasW = this.$refs.move.offsetWidth - 50
    // this.canvasH = this.$refs.move.offsetHeight - 200
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
      if (temp < 130) {
        // 黄色
        return 'rgba(250,228,35,1)'
      } else if (temp >= 130 && temp < 140) {
        // 浅绿色
        return 'rgba(213,250,35,1)'
      } else if (temp >= 140 && temp < 150) {
        // 绿色
        return 'rgba(33,252,38,1)'
      } else if (temp >= 150) {
        // 深绿色
        return 'rgba(2,196,104,1)'
      }
    },
    // 处理透明度的值
    handleTimesAlphaData () {
      // 碾压最大遍数
      let maxTimes = this.maxTimes
      // 从0-25遍 前一次叠加透明度的值（0-255）
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
      let colorsNum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < imgData.data.length; i += 4) {
        let alpha = imgData.data[i + 3]

        for (let j = 0; j < aArr.length; j++) {
          let mixinBegin = 2
          let mixinEnd = 2
          // 对不同边线的模糊值处理
          // 处理第一个颜色
          if (j === 0) {
            mixinBegin = 16
          }

          // 处理其他所有有透明度值的点
          if (alpha >= aArr[j] - mixinBegin && alpha <= aArr[j + 1] - mixinEnd) {
            imgData.data[i] = colorArr[j][0]
            imgData.data[i + 1] = colorArr[j][1]
            imgData.data[i + 2] = colorArr[j][2]
            imgData.data[i + 3] = 255
            if (j !== 24) {
              colorsNum[j]++
            }
          }
          // 处理最后一个颜色
          if (alpha >= 235 && alpha <= 255) {
            imgData.data[i] = 108
            imgData.data[i + 3] = 255
            colorsNum[24]++
          }
        }
      }
      ctx.putImageData(imgData, 0, 0)
      // console.log(imgData)
      // 处理各个遍数的比例
      if (this.ifFirst) {
        this.persentBian(colorsNum)
      }

      // console.log(colorsNum)
    },
    // 第一次会算遍数的百分比，后就不在算
    persentBian (_data) {
      let sum = 0
      for (let i = 0; i < _data.length; i++) {
        sum += _data[i]
      }
      for (let i = 0; i < _data.length; i++) {
        this.colorsPersent.push(parseFloat(((_data[i] / sum) * 100).toFixed(3)))
      }
      this.$emit('updata-barchart', this.colorsPersent)
      // console.log(this.colorsPersent)
      this.ifFirst = false
    },
    // 鼠标事件，得到坐标,得到像素颜色，判断遍数
    getXY (e) {
      let x = e.offsetX
      let y = e.offsetY
      // console.log('x:' + x + ';y:' + y)
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
      // let alpha = parseInt(colorData.data[3])
      // let rgba = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha / 255 + ')'
      // console.log(rgba)
      // console.log(alpha)
      // 对应颜色找到遍数   遍历colorArr
      let currentTimes = 0
      for (let i = 0; i < this.maxTimes; i++) {
        if (red === this.colorArr[i][0] && green === this.colorArr[i][1] && blue === this.colorArr[i][2]) {
          currentTimes = i + 1
        }
      }
      this.currentTimes = currentTimes
      // this.currentTimes = alpha
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
