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
                <input type="text" v-model="dataobj.mItemID"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">标段</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mItemBid"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">设备类型</div>
              <div class="info-cel-input">
                <input type="text"  v-model="dataobj.mDevType"/>
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
            <div class="info-cel cel">
              <div class="info-cel-title">设备宽度</div>
              <div class="info-cel-input">
               <input type="text"  v-model="dataobj.mDevWidth"/>
              </div>
            </div>
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
      mItemID: this.$route.query.mItemID,
      mUserID: 0,
      mDevID: this.$route.query.id,
      text: '新建',
      single: false,
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
        }
      }, (err) => { console.log(err) })
    },
    // 保存修改 or 保存新建
    saveBtn () {
      let obj = this.dataobj
      obj['mItemID'] = this.mItemID
      obj['mUserID'] = this.mUserID
      if (this.mDevID !== 0) {
        obj['mDevID'] = this.mDevID
      }
      this.comFun.post('/Dev/createDev', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.$Message.success(rs.message)
        } else {
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
