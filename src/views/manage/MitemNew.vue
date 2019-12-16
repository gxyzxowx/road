<!-- 项目管理增改页面 -->
<style lang="less" scoped>
.newrecipe {
  position: relative;
  width: 100%;
  padding: 0.2rem 0.39rem;
  height: 100%;

  .cel{
    display: flex;
    height: 0.4rem;
    line-height: 0.4rem;
    border-bottom: 1px solid #999;
  }
  .top {
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
  }
  .bottom{
    width: 15.5rem;
    height: 2rem;
    overflow-y: auto;
    overflow-x: auto;
    .content{
      // border: 1px solid #999;

      .content-title,.content-rep{
        display: flex;
        height: .4rem;
        line-height: .4rem;

        div,.content-rep-cel{
          flex-shrink: 0;
          width: 1.6rem;
          background: #f0f4fe;
          text-align: center;
          border-left: 1px solid #999;
          border-bottom: 1px solid #999;
          border-top: 1px solid #999;
        }
      }
      .content-rep{
        .content-rep-cel{
          background: #fff;
        }
      }
    }
  }
}
</style>
<template>
  <div class="newrecipe">
    <div @click="go()" class="road-back"></div>
    <main>
      <!-- 项目表 -->
      <div class="top">
        <h3>项目表</h3>
        <div class="content">
          <!-- 材料表6项基本信息 -->
          <div class="info">
            <div class="info-cel cel">
              <div class="info-cel-title">项目名称</div>
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
              <div class="info-cel-title">材料类型</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">材料名称</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">层位</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">预计产量</div>
              <div class="info-cel-input">
                <input type="text" />
              </div>
            </div>
          </div>

        </div>
      </div>
      <Button type="success" style="float:right;">添加配方</Button>
      <Button type="primary" style="float:right;">保存</Button>

      <div class="bottom">
        <h3>标段表</h3>
        <div class="content">
          <div class="content-title">
            <div v-for="item in pfArr" :key="item">{{item}}</div>
          </div>
          <!-- 内容一条（横） -->
          <div class="content-rep">
            <!-- 一条的子项 -->
            <div class="content-rep-cel">
              <Select v-model="model1" style="width:130px" size="small">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <input type="text" class="content-rep-cel">
            <div class="btns">
              <Button type="primary" size="small">保存</Button>
              <Button type="error" size="small">删除</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data () {
    return {
      jpArr: ['级配标准', 37.5, 31.5, 26.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075],
      pfArr: ['矿料ID', '矿料名称', '用量比', 37.5, 31.5, 26.5, 19.0, 9.5, 4.75, 2.36, 1.18, 0.6, 0.3, 0.15, 0.075, '操作']
    }
  },
  methods: {
    go () {
      this.$router.push('/manage/recipe')
    }
  }
}
</script>
