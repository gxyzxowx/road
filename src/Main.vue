<style lang="scss" scoped>
</style>
<style scoped lang="less">
.layout .header {
  height: 2.05rem;
  background-image: url(~@/assets/img/top.png);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 19.20rem .85rem;
}
.control-body {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  .jgcompany {
    width: 4.70rem;
    margin-top: .1rem;
    span{
      margin-left: 1.30rem;
      // background:rgba(24,56,98,1);
      // border:.01rem solid rgba(32, 64, 129, 1);
      // border-radius:.21rem;
    }
  }
  .mid {
    flex:1;
    .select {
      position: relative;
      margin:0 1.50rem;
      .beautiful {
        padding: .10rem .20rem;
        position: absolute;
        width: 100%;
        top: .05rem;
        text-align: center;
        background: #122a4e;
        pointer-events: none;
        span {

          font-size: .36rem;
          color:#E5F5FF;
          background-image: -webkit-linear-gradient(bottom, #93C2F5,  #E5F5FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 700;
        }

      }
    }
    // 中间3个按钮
    .btns {
      margin-top: .55rem;
      display: flex;
      justify-content: space-around;
      .btn {
        cursor: pointer;
        width:2.63rem;
        height:.73rem;
        background:linear-gradient(to right,rgba(54,94,165,0),rgba(34,136,214,.7),rgba(54,94,165,0));
        border:.02rem solid rgba(15, 93, 155, .71);
        .texts{
          margin-top: .10rem;
          text-align: center;
          span{
            font-family: "Hiragino Sans GB";
            font-size:.36rem;
            font-weight:500;
            background:linear-gradient(0deg,rgba(229,245,255,1) 0%, rgba(147,194,245,1) 100%);
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
            vertical-align:middle;
          }
          img{
            vertical-align:middle;
            width: .48rem;
            height: .48rem;
            margin-right: .06rem;
          }
        }
      }
      .btn.actived{
        background: #2288D6;
      }
    }
  }
  .jgcompany span,.time span{
      padding:.06rem .14rem;
      font-size:.16rem;
      font-family:Source Han Sans CN;
      font-weight:400;
      color: rgba(255,255,255,.71);
      line-height:.41rem;
      height:.41rem;
  }
  .right {
    .time{
     margin-top: .10rem;
    }
    .managebtn{
      width: 4.70rem;
     box-sizing: border-box;
     padding: 0 1.00rem;
     margin-top: .30rem;

    display: flex;
    justify-content: space-around;
    .exit,.manage{
      padding:.08rem .12rem;
      text-align: center;
      height:.41rem;
      background:rgba(24,56,97,1);
      border:.01rem solid rgba(32, 64, 129, 1);
      border-radius:.21rem;
      cursor: pointer;
    }
    }

    .texts{
      img{
        width: .20rem;
        height: .20rem;
        margin-right: .05rem;
         vertical-align:middle;
      }
      span{
        color:rgba(255,255,255,.71);
        font-size: .19rem;
         vertical-align:middle;
      }
    }
  }
}
</style>
<template>
  <div class="layout" :style="{height:bodyH}">
    <Layout style="height:100%; background: #050926;">
      <div class="header">
        <div class="jgcompany"><span>招商局集团重庆交通科研设计院有限公司</span></div>
        <div class="mid">
          <!-- 下拉框和选择按钮3个 -->
          <div class="select">
            <Select v-model="choseItem" style="margin-top:.20rem;" @on-change="choseItemFun(choseItem)">
              <Option
                v-for="item in items"
                :key="item.mItemID"
                :value="item.mItemID"
                :label="item.ItemDes"
              >
                <span>项目名称：{{item.ItemDes}}</span>
                <span style="float:right;color:#ccc">项目ID:{{item.mItemID}}</span>
              </Option>
            </Select>
            <div class="beautiful">
              <span>{{choseItemName}}</span>
            </div>
          </div>
          <div class="btns">
            <div class="btn" :class="{actived :actived[0]}" @click="linkTo('/control',0)"><div class="texts"><img src="~@/assets/img/zl.png" alt=""><span>项目总览</span></div></div>
            <div class="btn" :class="{actived :actived[1]}" @click="linkTo('/sc',1)"><div class="texts"><img src="~@/assets/img/sc.png" alt=""><span>生产监管</span></div></div>
            <div class="btn" :class="{actived :actived[2]}" @click="linkTo('/sg',2)"> <div class="texts"><img src="~@/assets/img/sg.png" alt=""><span>施工监管</span></div></div>
          </div>
        </div>
        <div class="right">
          <div class="time"><span>{{settime}}</span><span>管理员：{{manager}}</span></div>
          <div class="managebtn">
<!-- 进入管理和退出 -->
            <div class="manage" @click="manage()"><div class="texts"><img src="~@/assets/img/manage.png" alt=""><span>进入管理</span></div></div>
            <div class="exit" @click="exit()"><div class="texts"><img src="~@/assets/img/exit.png" alt=""><span>退出</span></div></div>
          </div>
        </div>
      </div>
      <router-view v-if="showView" />
    </Layout>
  </div>
</template>
<script>

export default {
  data () {
    return {
      bodyH: '',
      choseItem: '',
      choseItemName: '',
      choseItemJGUint: '监管单位',
      items: [],
      settime: '',
      showView: true,
      actived: [true, false, false],
      oldIndex: 0,
      manager: ''
    }
  },
  created () {
    this.$router.push('/control')
    // 测试
    // this.$router.push('/sg')
    // 测试完毕
    setInterval(() => {
      this.getCurrentDate()
    }, 1000)
  },
  mounted () {
    // 获得页面长宽
    // let H = document.body.scrollHeight
    let W = document.body.clientWidth
    this.bodyH = W * (9 / 16) + 'px'
    console.log(this.bodyH)
    // 得到当前用户名
    this.manager = this.comFun.getCookie('roadmUserName')
    // 获取用户拥有项目列表
    let obj = {
      mUserID: this.comFun.getCookie('roadmUserID')
    }
    this.comFun.post('/User/getUserItem', obj, this).then(
      rs => {
        // console.log(rs)
        if (rs.code === 0) {
          this.items = rs.data
          // 取第一个复制给select,且存入vuex
          this.choseItem = rs.data[0].mItemID
          this.choseItemName = rs.data[0].ItemDes
          this.choseItemJGUint = rs.data[0].mItemJGUint
          let itemInfo = {
            id: this.choseItem,
            des: this.choseItemName
          }
          // [this.choseItem, this.choseItemName]
          this.$store.commit('setItem', itemInfo)
          return false
        } else {
        }
      },
      err => {
        console.log(err)
      }
    )
  },
  computed: {},
  methods: {
    // 切换项目的时候
    choseItemFun (val) {
      // val为项目id
      // 更换项目名字的样式
      let choseName = this.items.filter((item, index, array) => {
        return item.mItemID === val
      })
      console.log(choseName)
      this.choseItemName = choseName[0].ItemDes
      this.choseItemJGUint = choseName[0].mItemJGUint
      // 刷新链入控制台并刷新
      this.showView = false // 通过v-if移除router-view节点
      this.$nextTick(() => {
        this.showView = true // DOM更新后再通过v-if添加router-view节点
      })
      this.$router.push({ path: '/control' })
      console.log(this.choseItemName + '切换项目了')

      // 存入vuex
      setTimeout(() => {
        let itemInfo = {
          id: this.choseItem,
          des: this.choseItemName
        }
        this.$store.commit('setItem', itemInfo)
      }, 50)

      return false
    },
    // 路由
    linkTo (path, index) {
      this.$router.push(path)
      // 变色
      if (index === this.oldIndex) {
        this.showView = false
        this.$nextTick(() => {
          this.showView = true
        })
        return
      }
      this.actived[index] = true
      this.actived[this.oldIndex] = false
      this.oldIndex = index
    },
    exit () {
      // 删除cookie数据并跳转到Login
      // console.log('exit')
      this.comFun.delectCookie('roadmUserID')
      this.$router.push({ name: 'login' })
    },
    manage () {
      this.$router.push('/manage')
    },
    // 获取今日时间
    getCurrentDate () {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      var day = now.getDay() // 得到周几
      var hour = now.getHours() // 得到小时
      var minu = now.getMinutes() // 得到分钟
      var sec = now.getSeconds() // 得到秒
      var MS = now.getMilliseconds() // 获取毫秒
      var week
      month = month + 1
      if (month < 10) month = '0' + month
      if (date < 10) date = '0' + date
      if (hour < 10) hour = '0' + hour
      if (minu < 10) minu = '0' + minu
      if (sec < 10) sec = '0' + sec
      if (MS < 100) MS = '0' + MS
      var arrWeek = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      week = arrWeek[day]
      var time = ''
      time =
        year +
        '年' +
        month +
        '月' +
        date +
        '日' +
        ' ' +
        hour +
        ':' +
        minu +
        ':' +
        sec +
        ' ' +
        week
      // 当前日期赋值给当前日期输入框中（jQuery easyUI）
      this.settime = time
      // 设置得到当前日期的函数的执行间隔时间，每1000毫秒刷新一次。
    }
  }
}
</script>
