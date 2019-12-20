<!-- 预警处理页面 -->
<style scoped lang="less">

  .form{
    width: 12rem;
    .title{
      margin-bottom: .15rem;
    }
     h3{
        margin-bottom: .05rem;
      }
  }
</style>
<template>
  <div class="scpage">
    <div @click="go()" class="road-back"></div>
    <div class="form">
      <div class="title">
        <h3>预警详情：</h3>
        <p class="dec">{{text}}</p>
      </div>
      <h3>预警处理方案：</h3>
    <Form>
      <FormItem>
        <Input
          v-model="mAlarmCLDec"
          type="textarea"
          :autosize="{minRows: 20,maxRows: 400}"
          placeholder="请输入预警处理方案..."
        ></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="submit()">提交</Button>
        <Button style="margin-left: 8px">返回</Button>
      </FormItem>
    </Form>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      mUserID: '',
      mItemID: '',
      mAlarmCLDec: '',
      text: this.$route.query.text,
      mAlarmID: this.$route.query.id
    }
  },
  mounted () {
    this.mAlarmCLDec = this.$route.query.result
    console.log(this.mAlarmCLDec)
    this.mUserID = this.comFun.getCookie('roadmUserID')
    this.mItemID = this.$store.state.itemInfo.id
  },
  methods: {
    go () {
      this.$router.push('/sc/SCwarn')
    },
    submit () {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID,
        mAlarmCLDec: this.mAlarmCLDec,
        mAlarmID: this.mAlarmID
      }
      this.comFun.post('/User/userClAlarm', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
          setTimeout(() => {
            this.$router.push('/sc/SCwarn')
          }, 1000)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
