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
          &:nth-of-type(even){
            border-left: 1px solid #999;
          }
          &:last-of-type{
            border-bottom: none;
          }
        }
      }
      .chose-items{
        .checkbox{
          display: flex;
          flex-direction: column;
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
              <div class="info-cel-title">用户名</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserName"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">密码</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserPwd"/>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">权限级别</div>
              <div class="info-cel-input">
                <Select  v-model="dataobj.mUserLevel" style="width:200px" size="small">
                  <Option v-for="item in userLevelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">用户单位</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserDW" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">姓名</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserXM" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">电话</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserDHHM" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">微信</div>
              <div class="info-cel-input">
                <input type="text" v-model="dataobj.mUserWXHM" />
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">预警等级</div>
              <div class="info-cel-input">
                <Select v-model="dataobj.mUserYJDJ" style="width:200px" size="small">
                  <Option v-for="item in mUserYJDJList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="info-cel cel">
              <div class="info-cel-title">通信方式</div>
              <div class="info-cel-input linkway">
                <Checkbox v-model="dataobj.mUserDXTZ">短信</Checkbox>
                <Checkbox v-model="dataobj.mUserWXTZ">微信</Checkbox>
              </div>
            </div>
          </div>
          <div class="chose-items">
            <h4>选择管理项目：</h4>
              <CheckboxGroup class="checkbox" v-model="items">
                <Checkbox v-for="(item, index) in itemlist" :key="index" :label="item.mItemID">{{item.mItemJC}}</Checkbox>
                <!-- <Checkbox label="2">项目2</Checkbox>
                <Checkbox label="3">项目3</Checkbox> -->
            </CheckboxGroup>
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
      single: false,
      mItemID: this.$route.query.mItemID,
      mUserID: 0,
      // 内部选择要修改的用户id
      editUserID: this.$route.query.id,
      text: '新建',
      itemlist: [],
      // 被选中的id组合
      items: [],
      // 管理员权限列表
      userLevelList: [{ value: 0, label: '客户' }, { value: 1, label: '普通管理员' }],
      // 管理员预警等级列表
      mUserYJDJList: [{ value: 1, label: '一级预警' }, { value: 2, label: '二级预警' }, { value: 3, label: '三级预警' }],
      dataobj: {
        'mUserID': '',
        'mUserName': '',
        'mUserPwd': '',
        'mUserLevel': '',
        'mUserDW': null,
        'mUserXM': null,
        'mUserDHHM': null,
        'mUserYJDJ': null,
        'mUserDXTZ': null,
        'mUserWXTZ': null,
        'mUserWXHM': null
      }
    }
  },
  mounted () {
    this.mUserID = this.comFun.getCookie('roadmUserID')
    if (this.editUserID !== -1) {
      this.text = '修改'
      this.getData()
    }

    // 获取所有项目,以便为用户管理项目
    this.getItemlist()
  },
  methods: {
    go () {
      this.$router.push('/manage/user')
    },
    // 得到用户信息
    getData () {
      let obj = {
        mUserID: this.mUserID,
        editUserID: this.editUserID
      }
      // console.log(JSON.stringify(obj))
      this.comFun.post('/User/getAdminInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          for (let i in rs.data) {
            if (i === 'mUserDXTZ') {
              rs.data[i] = !!rs.data[i]
            }
            if (i === 'mUserWXTZ') {
              rs.data[i] = !!rs.data[i]
            }
          }
          this.dataobj = rs.data
          console.log(this.dataobj.mUserDXTZ)
          let _items = []
          rs.data.itemList.map((item, index, arr) => {
            _items.push(item.mItemID)
          })
          console.log(JSON.stringify(_items))
          this.items = _items
        }
      }, (err) => { console.log(err) })
    },
    // 获取有所项目
    getItemlist () {
      let obj = {
        mUserID: this.mUserID
      }
      this.comFun.post('/Item/getItemList', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.itemlist = rs.data
        }
      }, (err) => { console.log(err) })
    },
    // 保存修改 or 保存新建,0：客户 1:项目管理
    saveBtn () {
      let obj = this.dataobj
      obj['mItemID'] = this.mItemID
      obj['mUserID'] = this.mUserID
      // 注入项目集合
      obj['itemID'] = this.items.join(',')
      for (let i in obj) {
        if (i === 'mUserDXTZ') {
          obj[i] = obj[i] ? 1 : 0
        }
        if (i === 'mUserWXTZ') {
          obj[i] = obj[i] ? 1 : 0
        }
      }
      if (this.editUserID === -1) {
        // 新建用户
        console.log(JSON.stringify(obj))
        this.comFun.post('/User/addUser', obj, this).then((rs) => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            this.$Message.success(rs.message)
          } else {
            this.$Message.error(rs.message)
          }
        }, (err) => { console.log(err) })
      } else {
        // 编辑
        obj['editUserID'] = this.editUserID
        console.log(JSON.stringify(obj))
        this.comFun.post('/User/editAdminInfo', obj, this).then((rs) => {
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
}
</script>
