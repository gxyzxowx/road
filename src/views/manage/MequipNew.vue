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
        // border-bottom: none;
        .info-cel {
          width: 50%;
          .info-cel-title {
            width: 2rem;
            height: 100%;
            background: #f0f4fe;
            padding-left: 0.2rem;
          }
          &:last-of-type{
            border-bottom: none;
          }
          &:nth-of-type(even){
            border-left: 1px solid #999;
          }
        }
      }
  }

  .savebtn{
    margin:.5rem auto;
    float: right;
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
                <Select v-model="dataobj.mItemID" @on-change="getItemBid(dataobj.mItemID)" style="width:200px" size="small">
                    <Option v-for="item in itemlist" :value="item.mItemID" :key="item.mItemID">{{ item.mItemJC }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">标段</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mItemBid" style="width:200px" size="small">
                    <Option v-for="item in bdlist" :value="item.mItemBid" :key="item.mItemBid">{{ item.mItemBDJC }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备类型</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mDevType" style="width:200px" size="small" @on-change="changeDev">
                    <Option v-for="item in devTypeList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备名称</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevName"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备编号</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevSn"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">物联卡号</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevPhoneNo"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备品牌</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevPP"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备型号</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mDevXH" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">安装位置</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevAZWZ"/>
              </div>
            </div>
            <!-- 以下只有碾压和摊铺机有 -->
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">设备宽度</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevWidth"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">速度标准</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevSDBZ"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">速度上限</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevSDSX"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">速度下限</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevSDXX"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">温度标准</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevWDBZ"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">温度上限</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevWDSX"/>
              </div>
            </div>
            <div class="info-cel cel" v-if="ifNianya">
              <div class="info-cel-title">温度下限</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevWDXX"/>
              </div>
            </div>
            <!-- 以上只有碾压和摊铺机有 -->
            <div class="info-cel cel">
              <div class="info-cel-title">设备描述</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDecMS"/>
              </div>
            </div>
          </div>
      </div>
    </main>
    <Button class="savebtn" type="primary" size="large" @click="saveBtn()">保存{{text}}</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 碾压和摊铺显示设备宽度，速度标准，上下限，温度标准，上下限。一共7项目
      ifNianya: false,
      mItemID: this.$route.query.mItemID,
      mUserID: 0,
      mDevID: this.$route.query.id,
      itemlist: [],
      bdlist: [],
      text: '新建',
      single: false,
      // 设备类型下拉框列表// 拌和站209，碾压机211，摊铺机210
      devTypeList: [
        { value: 209, label: '拌和站' }, { value: 211, label: '碾压机' }, { value: 210, label: '摊铺机' }
      ],
      // v-model的数据
      dataobj: {
        'mDevID': '',
        'mDevSn': '',
        'mDevType': '',
        'mDevName': '',
        'mDevPhoneNo': '',
        'mDevGpsX': null,
        'mDevGpsY': null,
        'mDevStatus': '',
        'mItemID': '',
        'mItemJC': '',
        'mItemBid': '',
        'mItemBDJC': null,
        'mDevWidth': null,
        'mDevPP': null,
        'mDevXH': null,
        'mDevAZWZ': null,
        'mDecMS': null,
        'mDevTypeName': ''
      }
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    if (this.mDevID !== -1) {
      this.text = '修改'
    }
    this.getData()
    // 获得该用户所有项目，便于下拉选项修改项目
    this.getUserItem()
  },
  methods: {
    go () {
      this.$router.push('/manage/equip')
    },
    getData () {
      let obj = {
        mItemID: this.mItemID,
        mUserID: this.mUserID,
        mDevID: this.mDevID
      }
      this.comFun.post('/Dev/getDevInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.dataobj = rs.data
          // 得到该项目所有标段
          this.getItemBid(rs.data.mItemID)
        }
      }, (err) => { console.log(err) })
    },
    // 得到某个项目的所有标段
    getItemBid (mItemID) {
      let obj = {
        mUserID: this.mUserID,
        mItemID: mItemID
      }
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.bdlist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 得到所有项目
    getUserItem () {
      let obj = {
        mUserID: this.mUserID
      }
      this.comFun.post('/User/getItemList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.itemlist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 保存修改 or 保存新建
    saveBtn () {
      let obj = this.dataobj
      obj['mItemID'] = this.mItemID
      obj['mUserID'] = this.mUserID
      if (this.mDevID !== -1) {
        obj['mDevID'] = this.mDevID
      }
      console.log(obj)
      this.comFun.post('/Dev/createDev', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    // 更换设备类型时
    changeDev (type) {
      // 拌和站209，碾压机211，摊铺机210
      if (type === 209) {
        this.ifNianya = false
      } else {
        this.ifNianya = true
      }
    }
  }
}
</script>
