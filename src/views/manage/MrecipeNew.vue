<!-- 新增材料页面 -->
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
      .desc{
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #999;
        .desc-cel {
          width: 14.28%;
          .desc-cel-title {
            width: 2rem;
            height: 100%;
            background: #f0f4fe;
            text-indent: 0.2rem;
            // overflow-x: hidden;
          }
        }
      }
      .stand{
        border: 1px solid #999;
        .stand-title{
          display: flex;
          height: .4rem;
          line-height: .4rem;
          border-bottom: 1px solid #999;
          .stand-title-cel{
            width: 7.69%;
            height: 100%;
            border-right: 1px solid #999;
            background: #f0f4fe;
            text-align: center;
          }
        }
        .stand-content{
          display: flex;
          height: .35rem;
          line-height: .35rem;
          border-bottom: 1px solid #999;
          text-align: center;
          .stand-content-title{
            width: 7.69%;
            background: #f0f4fe;
            text-indent: 0.05rem;
          }
          .sand-content-con{
            display: flex;
            width: 92.31%;
            height: 100%;
            border-right: 1px solid #999;
            text-align: center;
            .stand-content-cel{
              width: 8.333%;
              border-left: 1px solid #999;
            }
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
      <!-- 材料表 -->
      <div class="top">
        <h3>材料表</h3>
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
          <!-- 材料表余下信息 -->
          <div class="desc">
            <div class="desc-cel cel">
              <div class="desc-cel-title">油石比标准</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">温度</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">拌和周期</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">二级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级上限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
            <div class="desc-cel cel">
              <div class="desc-cel-title">三级下限</div>
              <div class="desc-cel-input">
                <input type="text" />
              </div>
            </div>
          </div>
          <div class="stand">
            <div class="stand-title">
              <div class="stand-title-cel" v-for="item in jpArr" :key="item">{{item}}</div>
            </div>
            <div class="stand-content">
              <div class="stand-content-title">上限</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">目标值</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">下限</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">一级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">二级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>

            <div class="stand-content">
              <div class="stand-content-title">三级波动范围</div>
            <div class="sand-content-con">
              <div class="stand-content-cel" v-for="item in 12" :key="item">
                <input type="text">
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Button type="success" style="float:right;">添加配方</Button>
      <Button type="primary" style="float:right;">保存</Button>

      <div class="bottom">
        <h3>配方表</h3>
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
