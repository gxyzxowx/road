<!-- 新建修改用户页面 -->
<style lang="less" scoped>
.newuser{
  position: relative;
  width: 100%;
  padding: 0.3rem 0.39rem;
  height: 100%;
   .cel{
    display: flex;
    height: 0.4rem;
    line-height: 0.4rem;
    border-bottom: 1px solid #999;
  }
  .content {
      .info {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #999;
        .info-cel {
          width: 50%;
          .info-cel-title {
            width: 2rem;
            height: 100%;
            background: #f0f4fe;
            padding-left: 0.2rem;
          }
          .linkway{
            width:50%;
            display: flex;
            justify-content: space-around;
  }
        }
      }
  }

  .savebtn{
    margin:.5rem auto;
  }
}
</style>
<template>
  <div class="newuser">
    <div @click="go()" class="road-back"></div>
    <main>
      <h3>用户详情页</h3>
      <div class="content">
          <div class="info">
            <div class="info-cel cel">
              <div class="info-cel-title">管理项目</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">标段</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">用户名</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">密码</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">权限级别</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">用户单位</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">姓名</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">电话</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">预警等级</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">通信方式</div>
              <div class="info-cel-input linkway">
                <Checkbox v-model="single">短信</Checkbox>
                <Checkbox v-model="single">微信</Checkbox>
              </div>
            </div>
          </div>
      </div>
    </main>
    <Button class="savebtn" type="primary" size="large">保存</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      single: false
    }
  },
  methods: {
    go () {
      this.$router.push('/manage/user')
    }
  }
}
</script>
