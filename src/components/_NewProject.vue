<style scoped>

</style>
<template>
  <div class="newform">
    <h2 style="margin-bottom: .10rem;">{{type? '修改' : '新建'}}项目</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
      <FormItem label="项目描述" prop="mItemDes">
        <Input v-model="formValidate.mItemDes" placeholder="请输入您项目的名称"></Input>
      </FormItem>
      <FormItem label="最大标段数" prop="mItemBidSun">
        <Input v-model.number="formValidate.mItemBidSun" placeholder="请输入您项目的最大标段数"></Input>
      </FormItem>
      <FormItem label="预计项目总长度" prop="mItemTotalLength">
        <Input v-model.number="formValidate.mItemTotalLength" placeholder="请输入项目总长度"></Input>
      </FormItem>
      <FormItem label="项目状态" prop="mItemActive">
        <RadioGroup v-model="formValidate.mItemActive">
          <Radio label="1">施工中</Radio>
          <Radio label="0">已完结</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="项目负责人" prop="mItemAdmin">
        <Input v-model="formValidate.mItemAdmin" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="项目联系电话" prop="mItemPhoneNo">
        <Input v-model.number="formValidate.mItemPhoneNo" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="施工单位" prop="mItemSGUint">
        <Input v-model="formValidate.mItemSGUint" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="监管单位" prop="mItemJGUint">
        <Input v-model="formValidate.mItemJGUint" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="一级预警联系人" prop="mAlarmLev1Name">
        <Input v-model="formValidate.mAlarmLev1Name" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="一级预警联系电话" prop="mAlarmLev1PhoneNo">
        <Input v-model.number="formValidate.mAlarmLev1PhoneNo" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="二级预警联系人" prop="mAlarmLev2Name">
        <Input v-model="formValidate.mAlarmLev2Name" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="二级预警联系电话" prop="mAlarmLev2PhoneNo">
        <Input v-model.number="formValidate.mAlarmLev2PhoneNo" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="三级预警联系人" prop="mAlarmLev3Name">
        <Input v-model="formValidate.mAlarmLev3Name" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="三级预警联系电话" prop="mAlarmLev3PhoneNo">
        <Input v-model.number="formValidate.mAlarmLev3PhoneNo" placeholder="请输入..."></Input>
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
      // 0新增项目；1修改项目
      type: 0,
      selectItemID: '',
      formValidate: {
        // name: '',
        mItemBidSun: '',
        mItemTotalLength: '',
        mItemActive: 1,
        mItemDes: '',
        mItemAdmin: '',
        mItemPhoneNo: '',
        mItemSGUint: '',
        mItemJGUint: '',
        mAlarmLev1Name: '',
        mAlarmLev1PhoneNo: '',
        mAlarmLev2Name: '',
        mAlarmLev2PhoneNo: '',
        mAlarmLev3Name: '',
        mAlarmLev3PhoneNo: ''
      },
      ruleValidate: {
        mItemDes: [
          {
            required: true,
            message: '项目描述不能为空',
            trigger: 'blur'
          }
        ],
        mItemBidSun: [
          { required: true, type: 'number', message: '最大标段数不能为空', trigger: 'blur' }
        ],
        mItemTotalLength: [
          { required: true, type: 'number', message: '总长度不能为空', trigger: 'blur' }
        ],
        mItemActive: [
          { required: false, message: '请选择项目状态', trigger: 'change' }
        ],
        mItemPhoneNo: [
          { required: false, type: 'number', message: '格式不正确', trigger: 'blur' }
        ],
        mAlarmLev1PhoneNo: [
          { required: false, type: 'number', message: '格式不正确', trigger: 'blur' }
        ],
        mAlarmLev2PhoneNo: [
          { required: false, type: 'number', message: '格式不正确', trigger: 'blur' }
        ],
        mAlarmLev3PhoneNo: [
          { required: false, type: 'number', message: '格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 确定是修改项目还是新增项目
    this.selectItemID = this.$store.state.selectItemID
    if (this.selectItemID) {
      // 编辑
      this.type = 1
      console.log('是修改' + this.selectItemID)
      this.getItemInfo()
    }
  },
  methods: {
    handleSubmit (formValidate) {
      this.$refs[formValidate].validate(valid => {
        let obj = this.formValidate
        obj['mUserID'] = this.comFun.getCookie('roadmUserID')

        if (valid) {
          // 判断是新增还是修改
          if (this.type === 1) {
            // 1是编辑 ，需要添加mItemID
            obj['mItemID'] = this.selectItemID
          }
          // console.log(obj)
          this.comFun.post('/Item/userCreateItem', obj, this).then((rs) => {
            console.log(rs)
            if (rs.code === 0) {
              console.log('修改或者新增项目成功')
              // 成功,提示后返回并刷新
              this.$Message.success(rs.message)
              this.$store.commit('setModalState', false)
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
        mItemID: this.selectItemID
      }
      this.comFun.post('/Item/getItemInfo', obj, this).then((rs) => {
        // console.log(rs)
        if (rs.code === 0) {
          // 处理数据呈现
          rs.data.mItemActive = rs.data.mItemActive + ''
          if (rs.data.mItemPhoneNo) rs.data.mItemPhoneNo = parseInt(rs.data.mItemPhoneNo)
          if (rs.data.mAlarmLev1PhoneNo) rs.data.mAlarmLev1PhoneNo = parseInt(rs.data.mAlarmLev1PhoneNo)
          if (rs.data.mAlarmLev2PhoneNo) rs.data.mAlarmLev2PhoneNo = parseInt(rs.data.mAlarmLev2PhoneNo)
          if (rs.data.mAlarmLev3PhoneNo) rs.data.mAlarmLev3PhoneNo = parseInt(rs.data.mAlarmLev3PhoneNo)
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
