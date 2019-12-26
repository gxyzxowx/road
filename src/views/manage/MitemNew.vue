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
    margin-bottom: .2rem;
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
          .info-cel-input{
            width:60%;
          }
          &:last-of-type{
            border:none;
            width:100%;
          }
          &:nth-of-type(even){
            border-left: 1px solid #999;
          }
        }
      }

    }
  }
  .bottom{
    margin-top: .5rem;
    width: 15.5rem;
    height: 4rem;
    overflow-y: auto;
    overflow-x: auto;
    .content{
      border: 1px solid #999;

      .content-title,.content-rep{
        display: flex;
        height: .4rem;
        line-height: .4rem;
        border-bottom: 1px solid #999;

        div,.content-rep-cel{
          flex-shrink: 0;
          width: 2.5rem;
          background: #f0f4fe;
          text-align: center;
          border-left: 1px solid #999;
          &:nth-of-type(4){
            flex: 1;
          }
        }
      }
      .content-rep{
        .content-rep-cel{
          // border-bottom: 1px solid #999;
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
          <!-- 项目表11项基本信息 -->
          <div class="info">
            <div class="info-cel cel">
              <div class="info-cel-title">项目名称</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemMC"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">项目简称</div>
              <div class="info-cel-input">
                <input type="text"  v-model="itemobj.mItemJC"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">公路名称</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemGLMC" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">公路等级</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemGLDJ" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">建设单位</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemJSDW" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">监管单位</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemJGDW" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">里程（公里）</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemTotalLength" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">路宽（米）</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemLMKD" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">起止桩号</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemQZZH" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">项目状态</div>
              <div class="info-cel-input">
                <Select v-model="itemobj.mItemZT" style="width:200px" size="small">
                    <Option v-for="item in statuslist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">工程概况</div>
              <div class="info-cel-input">
                <input type="text" v-model="itemobj.mItemGCGK" />
              </div>
            </div>
          </div>

        </div>
        <Button type="success" size="small" style="float:left;" @click="importExcel()">导入excel表格</Button>
      </div>

      <Button type="success" style="float:right;" @click="newBd()">添加标段</Button>
      <Button type="primary" style="float:right;" @click="saveItem()">保存{{text}}</Button>

      <div class="bottom">
        <h3>标段表</h3>
        <div class="content">
          <div class="content-title">
            <div v-for="item in bdArr" :key="item">{{item}}</div>
          </div>
          <!-- 内容一条（横） -->
          <div class="content-rep" v-for="(item, index) in bdlist" :key="index">
            <!-- 一条的子项 -->
            <!-- 标段名称 -->
            <input type="text" class="content-rep-cel" v-model="item.mItemBDMC" >
            <!-- 标段简称 -->
            <input type="text" class="content-rep-cel" v-model="item.mItemBDJC" >
            <!-- 施工单位 -->
            <input type="text" class="content-rep-cel" v-model="item.mItemBDSGDW" >
            <!-- 标段描述 -->
            <input type="text" class="content-rep-cel" v-model="item.mItemBDMS" >
            <div class="btns content-rep-cel">
              <Button type="primary" size="small" @click="saveBd(index)">保存</Button>
              <Button type="error" size="small" @click="saveBd(index, true)">删除</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 导入数据模态框 -->
      <Modal
        v-model="showExcelModel"
        title="导入数据">
        <ImportExcel></ImportExcel>
    <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import ImportExcel from '@/components/ImportExcel.vue'
export default {
  data () {
    return {
      showExcelModel: false,
      // 当前操作的项目id,0是新建
      mItemID: this.$route.query.id,
      // 用户id
      mUserID: 0,
      // 项目基本信息
      itemobj:
        { 'mItemID': 0,
          'mItemMC': '',
          'mItemJC': '',
          'mItemTotalLength': '',
          'mItemLMKD': null,
          'mItemZT': 1,
          'mItemGLMC': null,
          'mItemGLDJ': null,
          'mItemJSDW': null,
          'mItemJGDW': null,
          'mItemQZZH': null,
          'mItemGCGK': null },
      text: '新建',
      bdArr: ['标段名称', '标段简称', '施工单位', '标段描述', '操作'],
      bdlist: [],
      statuslist: [
        {
          value: 1,
          label: '活动中'
        },
        {
          value: 0,
          label: '项目完结'
        }

      ]
    }
  },
  created () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
  },
  mounted () {
    // 判断是新建，还是修改
    if (this.mItemID === -1) {
      // 是新建
    } else {
      // 是修改
      this.text = '修改'
      // 取得原有项目信息
      this.getItemInfo()
    }
  },
  methods: {
    // 导入EXCEL数据表打开
    importExcel () {
      if (this.mItemID === -1) {
        this.$Message.success('请先新建一个项目')
        return
      }
      this.$store.commit('selectItemID', this.mItemID)
      this.showExcelModel = true
    },
    // 得到项目信息
    getItemInfo () {
      let obj = {
        mUserID: this.mUserID,
        mItemID: this.mItemID
      }
      console.log(obj.mUserID)
      this.comFun.post('/Item/getItemInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据呈现
          this.itemobj = rs.data
          this.bdlist = rs.bid_data
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    go () {
      this.$router.push('/manage/item')
    },
    // 添加标段
    newBd () {
      this.bdlist.push({
        mItemBDMC: '',
        mItemBDJC: '',
        mItemBDSGDW: '',
        mItemBDMS: ''
      })
    },
    saveBd (_index, isdelete) {
      // 某个标段的信息
      let obj = this.bdlist[_index]
      obj['mUserID'] = this.mUserID
      obj['mItemID'] = this.mItemID
      if (isdelete) {
        obj['is_delete'] = 1
      }
      // 保存标段分新建和修改，新建无mItemBid参数
      if (!this.bdlist[_index]['mItemBid']) {
        // 是新建

      } else {

      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Item/editItemBid', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
          // 删除时刷新页面
          if (isdelete) {
            this.getItemInfo()
          }
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 新建or修改项目信息
    saveItem () {
      let obj = this.itemobj
      obj['mUserID'] = this.mUserID
      if (this.mItemID === -1) {
        // 新建项目
      } else {
        // 2修改项目需要添加mItemID
        obj['mItemID'] = this.mItemID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Item/userCreateItem', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          console.log('修改或者新增项目成功')
          this.$Message.success(rs.message)
          this.mItemID = rs.data.mItemID
          // this.$store.commit('setModalState', false)
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  },
  components: {
    ImportExcel
  }
}
</script>
