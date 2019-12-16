<!-- 新建修改设备页面 -->
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
      <h3>设备详情页</h3>
      <div class="content">
          <div class="info">
            <div class="info-cel cel">
              <div class="info-cel-title">项目</div>
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
              <div class="info-cel-title">设备类型</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备名称</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备编号</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">物联卡号</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备品牌</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备型号</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">安装位置</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备宽度</div>
              <div class="info-cel-input">
               <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备描述</div>
              <div class="info-cel-input">
               <input type="text" />
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
      this.$router.push('/manage/equip')
    }
  }
}
</script>
