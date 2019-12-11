<style lang="less" scoped>
  .newuser{
    .ivu-row{
      height: .40rem;
    }
  }
</style>
<template>
<div class="newuser">
  <h2 style="margin-bottom: .10rem;">{{type? '修改' : '新建'}}管理员</h2>
    <Form ref="formDynamic" :model="formDynamic" :label-width="120" style="width: 4rem">
      <FormItem label="用户名" prop="mUserName">
        <Input v-model="formDynamic.mUserName" placeholder="请输入新增的用户名" :disabled = disabled></Input>
      </FormItem>
      <FormItem label="密码" prop="mUserPwd">
        <Input type="password" v-model.number="formDynamic.mUserPwd" :placeholder="placeholder"></Input>
      </FormItem>
    <!-- 选择项目 -->
      <FormItem v-for="(item, index) in formDynamicItems"
      :key="index"
              :label="'添加项目'"
              :prop="'items.' + index + '.value'">
          <Row>
              <Col span="18">
                  <Select v-model="item.value" style="width: 2rem" placeholder="请选择项目">
                    <Option v-for="option in selectlist" :value="option.mItemID" :key="option.mItemID">{{ option.ItemDes }}</Option>
                  </Select>
              </Col>
              <Col span="4" offset="1">
                  <Button @click="handleRemove(index)">删除该项</Button>
              </Col>
          </Row>
      </FormItem>
      <FormItem>
          <Row  style="height: 2rem">
              <Col span="12">
                  <Button type="dashed" long @click="handleAdd" icon="md-add">加一项</Button>
              </Col>
          </Row>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
          <Button @click="handleReset('formDynamic')" style="margin-left: .08rem">重置</Button>
      </FormItem>
  </Form>
</div>
</template>
<script>
export default {
  data () {
    return {
      index: 1,
      // 0新增，1修改
      type: 0,
      disabled: false,
      // 要修改的用户的ID
      placeholder: '请输入新增用户的密码',
      selectItemID: '',
      selectlist: [],
      formDynamic: {
        mUserName: '',
        mUserPwd: '',
        items: [
          {
            value: '',
            index: 0,
            status: 1
          }
        ]
      }
    }
  },
  mounted () {
    // 确定是修改用户还是新增项目
    this.selectItemID = this.$store.state.selectItemID
    // 暂定此页只负责新增用户,以下判断是否为修改页面的代码注释开始
    // if (this.selectItemID) {
    //   // 是修改用户
    //   this.type = 1
    //   // console.log('是修改' + this.selectItemID)
    //   // 得到数据并陈列
    //   this.getUserData()
    //   // 用户名变为不可修改
    //   this.disabled = true
    //   // 改变placeholder的字样
    //   this.placeholder = '请输入需要修改的密码'
    // }
    // 暂定此页只负责新增用户,以下判断是否为修改页面的代码注释结束

    // 得到所有项目列表不分页
    this.getData()
  },
  computed: {
    formDynamicItems () {
      let valarr = this.formDynamic.items.filter((item, index, arr) => {
        return item.status === 1
      })
      return valarr
    }
  },
  methods: {
    // 修改状态下得到用户数据
    getUserData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        editUserID: this.selectItemID
      }
      this.comFun.post('/User/getAdminInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 数据呈现
          this.formDynamic.mUserName = rs.data.mUserName
          rs.data.itemList.map((item, index, arr) => {
            this.formDynamic.items.unshift({
              value: item['mItemID'],
              index: index + 1,
              status: 1
            })
          })
          // this.formDynamic.items = rs.data.itemList
        }
      }, (err) => { console.log(err) })
    },
    handleSubmit (name) {
      console.log(JSON.stringify(this.formDynamic.items))
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = this.formDynamic
          let itemarr = []
          data.items.map((item, index, arr) => {
            if (item.status && item.value) {
              itemarr.push(item.value)
            }
          })
          let itemID = itemarr.join(',')
          // 通过检验，新增/修改用户
          if (this.type === 0) {
            // 0是新增
            let obj = {
              mUserID: this.comFun.getCookie('roadmUserID'),
              mUserName: data.mUserName,
              mUserPwd: data.mUserPwd,
              itemID: itemID
            }
            // console.log(JSON.stringify(obj))
            this.comFun.post('/User/addUser', obj, this).then((rs) => {
              console.log(JSON.stringify(rs))
              if (rs.code === 0) {
                // 成功,提示后返回并刷新
                console.log('修改或者新增用户成功')
                this.$Message.success(rs.message)
                this.$store.commit('setModalState', false)
              } else {
                this.$Message.error(rs.message)
              }
            }, (err) => { console.log(err) })
          } else {
            // 1是修改
            let obj = {
              mUserID: this.comFun.getCookie('roadmUserID'),
              editUserID: this.selectItemID,
              mUserPwd: data.mUserPwd,
              itemID: itemID
            }
            console.log(JSON.stringify(obj))
            this.comFun.post('/User/editAdminInfo', obj, this).then((rs) => {
              console.log(JSON.stringify(rs))
              if (rs.code === 0) {
                // 成功,提示后返回并刷新
                console.log('修改或者新增用户成功')
                this.$Message.success(rs.message)
                this.$store.commit('setModalState', false)
              } else {
                this.$Message.error(rs.message)
              }
            }, (err) => { console.log(err) })
          }
        } else {
          this.$Message.error('操作失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleAdd () {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1
      })
    },
    handleRemove (index) {
      this.formDynamic.items[index].status = 0
    },
    getData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      this.comFun.post('/User/getUserItem', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.selectlist = rs.data
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
