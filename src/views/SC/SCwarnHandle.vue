<!-- 预警处理页面 -->
<style scoped lang="less">
  .form{
    width: 8rem;
    .title{
      display: flex;
      h3{
        margin-bottom: .2rem;
      }
    }
  }
</style>
<template>
  <div class="scpage">
    <div @click="go()" class="road-back"></div>
    <div class="form">
      <div class="title">
        <h3>预警详情：</h3>
        <p class="dec">从后端传过来的数据</p>
      </div>
      <h3>预警处理方案：</h3>
    <Form>
      <FormItem>
        <Input
          v-model="textarea"
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
      textarea: ''
    }
  },
  mounted () {

  },
  methods: {
    go () {
      this.$router.push('/sc/SCwarn')
    },
    submit () {
      console.log(this.$route.query.id)
    }
  }
}
</script>
