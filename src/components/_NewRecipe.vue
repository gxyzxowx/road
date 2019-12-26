<style scoped>

.newform .select{
  width:1.50rem;
  margin-right:.10rem;
}
</style>
<template>
<!-- 新增/编辑材料 -->
  <div class="newform">
    <h2 style="margin-bottom: .10rem;">{{type? '修改' : '新建'}}材料</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="材料类型" prop="mClType">
        <Select v-model="formValidate.mClType" class="select" size="large" placeholder="请选择材料类型">
          <Option v-for="item in list.mClTypes" :value="item.mClTypeValue" :key="item.mClTypeValue">{{ item.mClTypeName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="材料名称" prop="mClName">
        <Input v-model.number="formValidate.mClName" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="所属项目" prop="mItemID">
        <Select v-model="formValidate.mItemID" class="select" size="large" placeholder="请选择所属项目">
          <Option v-for="item in list.items" :value="item.mItemID" :key="item.mItemID">{{ item.ItemDes }}</Option>
        </Select>
      </FormItem>
      <FormItem label="项目标段" prop="mItemBid">
        <Select v-model="formValidate.mItemBid" class="select" size="large" placeholder="请选择所属项目的标段">
          <Option v-for="item in list.mItemBids" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="油石比标准（%）" prop="mClYSB">
        <Input v-model="formValidate.mClYSB" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="温度标准（℃）" prop="mClTemp">
        <Input v-model.number="formValidate.mClTemp" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确认{{type? '修改' : '新建'}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: .08rem">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 0新增材料；1修改材料
      type: 0,
      // 修改的材料ID
      selectItemID: '',
      // 选择项目列表,选择标段列表
      list: {
        items: [{ 'mItemID': 1, 'ItemDes': '我是项目名字', 'mItemBidSun': 1 }],
        // 选择的项目ID
        selectItemID: '',
        mItemBids: [],
        // 选择的标段
        selectmItemBid: '',
        // 材料类型list
        mClTypes: []
      },
      formValidate: {

      },
      ruleValidate: {
        mItemDes: [
          {
            required: true,
            message: '项目描述不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    // this.list.selectItemID
    computedmItemID: function getBd () {
      this.getCurrentBd()
    }
  },
  mounted () {
    // 得到所有项目ID，所有材料ID
    this.getSelectData()
    // 确定是修改项目还是新增项目
    this.selectItemID = this.$store.state.selectItemID
    if (this.selectItemID) {
      // 编辑
      this.type = 1
      console.log('是修改' + this.selectItemID)
      this.getItemInfo()
    }
  },
  computed: {
    computedmItemID: function () {
      return this.formValidate.mItemID
    }
  },
  methods: {
    getCurrentBd () {
      // 根据不同的项目得到不同的标段
      // 得到项目的标段
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.formValidate.mItemID
      }
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          let bdArr = []
          for (let num = rs.data.mItemBidSun; num > 0; num--) {
            bdArr.push(num)
          }
          this.list.mItemBids = bdArr
        }
      }, (err) => { console.log(err) })
    },
    // 得到所有项目ID，所有材料类型
    getSelectData () {
      // 得到所有项目
      let obj1 = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      this.comFun.post('/User/getUserItem', obj1, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.list.items = rs.data
        }
      }, (err) => { console.log(err) })
      // 得到所有的材料类型
      let obj2 = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      this.comFun.post('/Cl/getClTypeList', obj2, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.list.mClTypes = rs.data
        }
      }, (err) => { console.log(err) })
    },
    handleSubmit (formValidate) {
      this.$refs[formValidate].validate(valid => {
        let obj = this.formValidate
        obj['mUserID'] = this.comFun.getCookie('roadmUserID')

        if (valid) {
          // 判断是新增还是修改
          if (this.type === 1) {
            // 1是编辑 ，需要添加mItemID
            obj['mClID'] = this.selectItemID
          }
          console.log(obj)
          this.comFun.post('/Cl/createBhCl', obj, this).then((rs) => {
            console.log(JSON.stringify(rs))
            if (rs.code === 0) {
              // 成功,提示后返回并刷新
              console.log('修改或者新增用户成功')
              this.$Message.success(rs.message)
              this.$store.commit('setModalState', false)
              return false
            } else {
              //  失败
              this.$Message.error(rs.message)
            }
          }, (err) => { console.log(err) })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (formValidate) {
      this.$refs[formValidate].resetFields()
    },
    getItemInfo () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mClID: this.selectItemID
      }
      this.comFun.post('/Cl/getBhClInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据呈现
          this.formValidate = rs.data
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    }
  }
}
</script>
