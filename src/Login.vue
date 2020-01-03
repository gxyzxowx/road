<style scoped>
    .box{
        margin: 20px 0;
    }
    .item{
        display: flex;
        justify-content: space-between;
        align-items:center;
    }
    .item:first-child{
        margin-bottom: 20px;
    }
  .login .card{
  width:320px;
  height:250px;
  margin: 150px auto;
  }
  .login{
    background: url('./assets/img/logo.jpg');
    background-size: cover;
  }
</style>
<template>
    <div class="login" :style="{height:bodyH}">
        <!-- <div class="mclas">login我是登录大页面</div> -->
    <Row>
        <Col>
            <Card class="card">
                <p slot="title">欢迎登陆道路管控系统</p>
                <div class="box">
                    <div class="item">
                        <span>用户名：</span><Input v-model="username" placeholder="Enter something..." clearable style="width: 200px" />
                    </div>
                    <div class="item">
                        <span>密码：</span><Input type="password" v-model="password" placeholder="Enter something..." clearable style="width: 200px" />
                    </div>
                </div>
                <Button  @click="login()" type="primary" long>登陆</Button>
            </Card>
        </Col>
    </Row>
    <Row type="flex" justify="center" v-if="showmsg">
      <Col span="12">
      <Alert type="warning" show-icon>
        后台提示信息：
        <span slot="desc">{{adminmsg}}</span>
    </Alert>
    </Col>
    </Row>
    </div>
</template>
<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      adminmsg: '',
      showmsg: false,
      bodyH: ''
    }
  },
  mounted () {
    let W = document.body.clientWidth
    this.bodyH = W * (9 / 16) + 'px'
  },
  methods: {
    login () {
      //   通过axios发送请求到服务端，核对用户名和密码返回为true时，判断为登陆模式
      //   测试
      //   this.comFun.get('http://lianke.weirong100.com/index/index/getzaooplist').then((response) => {
      //     console.log(response)
      //   }, (err) => { console.log(err) })
      let obj = {
        username: this.username,
        password: this.password
      }
      this.$load.show('加载中...')
      this.comFun.post('/Login/doLogin', obj, this).then((rs) => {
        // console.log(rs)
        this.$load.hide()
        if (rs.code === 0) {
          //   存入cookie
          this.comFun.setCookie('roadmUserID', rs.data.mUserID, 30)
          this.comFun.setCookie('roadmUserName', rs.data.mUserName, 30)
          this.$router.push('/')
          return false
        } else {
          this.showmsg = true
          this.adminmsg = rs.message
          // 弹出提示信息(3S关闭)
          setTimeout(() => {
            this.showmsg = false
          }, 2500)
        }
      }, (err) => {
        console.log(err)
        this.$load.hide()
      })
    }
  }

}
</script>
