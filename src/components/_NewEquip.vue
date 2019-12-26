<style scoped>

.newform .select{
  width:1.50rem;
  margin-right:.10rem;
}
</style>
<template>
  <div class="newform">
    <h2 style="margin-bottom: .10rem;">{{type? '修改' : '新建'}}设备</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="240">
      <FormItem label="选择项目" >
        <Select v-model="formValidate.mItemID" class="select" size="large" placeholder="请选择项目">
          <Option v-for="item in selectlist.items" :value="item.mItemID" :key="item.mItemID">{{ item.ItemDes }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择的项目标段" prop="mItemBid">
        <Select v-model="formValidate.mItemBid" class="select" size="large" placeholder="请选择项目标段">
          <Option v-for="item in selectlist.mItemBid" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择的设备类型">
        <Select v-model="formValidate.mDevType" class="select" size="large" placeholder="请选择设备类型">
          <Option v-for="item in selectlist.mDevType" :value="item.mDevType" :key="item.mDevType">{{ item.mDevTypeName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="设备名称" prop="mDevName">
        <Input v-model="formValidate.mDevName" placeholder="请输入设备名称"></Input>
      </FormItem>
      <FormItem label="设备编号">
        <Input v-model="formValidate.mDevSn" placeholder="请输入设备编号"></Input>
      </FormItem>
      <FormItem label="设备电话卡号">
        <Input v-model.number="formValidate.mDevPhoneNo" placeholder="请输入设备电话卡号"></Input>
      </FormItem>
      <FormItem label="温度预警标准( ℃ )" prop="mTempStandard">
        <Input v-model="formValidate.mTempStandard" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="温度一级预警阈值( ℃ )" prop="mTempAL1Max">
        <Input v-model.number="formValidate.mTempAL1Max" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="温度二级预警阈值( ℃ )" prop="mTempAL2Max">
        <Input v-model="formValidate.mTempAL2Max" placeholder="请输入..."></Input>
      </FormItem>
      <FormItem label="温度三级预警阈值( ℃ )" prop="mTempAL3Max">
        <Input v-model="formValidate.mTempAL3Max" placeholder="请输入..."></Input>
      </FormItem>
      <!-- 速度预警，只有摊铺机和碾压机要填 -->
      <div v-if="!ifshow209">
        <FormItem label="速度预警标准（m/h）" prop="mSpeedStandard">
          <Input v-model="formValidate.mSpeedStandard" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="速度一级预警阈值（m/h）" prop="mSpeedAL1Max">
          <Input v-model.number="formValidate.mSpeedAL1Max" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="速度二级预警阈值（m/h）" prop="mSpeedAL2Max">
          <Input v-model="formValidate.mSpeedAL2Max" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="速度三级预警阈值（m/h）" prop="mSpeedAL3Max">
          <Input v-model="formValidate.mSpeedAL3Max" placeholder="请输入..."></Input>
        </FormItem>
      </div>
      <!-- 拌合站才有的石油比209 -->
      <div v-if="ifshow209">
        <FormItem v-for="(item, index) in newdev1" :key="index" :label="item.title + '（ % ）'" :prop="item.key">
          <Input v-model="formValidate[item.key]" :placeholder="'请输入'+ item.title"></Input>
        </FormItem>
      </div>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确认{{type? '修改' : '新建'}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: .08rem">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import newdev1 from '@/data/newdev1.json'
export default {
  data () {
    return {
      // 0新增设备；1修改设备
      type: 0,
      newdev1: newdev1,
      // ifshow209 是否显示拌合站的选项，false则显示碾压机和摊铺机
      ifshow209: false,
      equipUseItemID: '',
      selectlist: {
        items: [],
        mDevType: [],
        mItemBid: []

      },
      selectItemID: '',
      formValidate: {
        mItemID: '',
        mItemBid: ''
      },
      ruleValidate: {
        mItemID: [
          {
            required: true,
            message: '项目不能为空',
            trigger: 'blur'
          }
        ],
        mDevSn: [
          { required: false, message: '请输入设备编号', trigger: 'blur' }
        ],
        mDevType: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // formValidate.mItemID
    computedmItemID: function getBd () {
      console.log('得到了bd')
      this.getCurrentBd()
    },
    // formValidate.mDevType
    computedmDevType: function ifshow209 (newval, oldval) {
      if (newval === 209) {
        this.ifshow209 = true
      } else {
        this.ifshow209 = false
      }
    }
  },
  computed: {
    computedmItemID: function () {
      return this.formValidate.mItemID
    },
    computedmDevType: function () {
      return this.formValidate.mDevType
    }
  },
  mounted () {
    // 确定是修改项目还是新增项目
    this.selectItemID = this.$store.state.selectItemID
    if (this.selectItemID) {
      // 编辑
      this.type = 1
      console.log('是修改' + this.selectItemID)
      // 得到选择的项目id
      this.equipUseItemID = this.$store.state.equipUseItemID
      this.getItemInfo()
    }
    // 得到选择的项目和选择的设备类型值
    this.getSelectData()
  },
  methods: {
    getSelectData () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      // 得到所有项目
      this.comFun.post('/User/getUserItem', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.selectlist.items = rs.data
        }
      }, (err) => { console.log(err) })
      // 得到所有设备类型
      this.comFun.post('/Dev/getDevType', obj, this).then((rs) => {
        // console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          this.selectlist.mDevType = rs.data
        }
      }, (err) => { console.log(err) })
    },
    getCurrentBd () {
      // 根据不同的项目得到不同的标段
      // 得到项目的标段
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.formValidate.mItemID
      }
      this.comFun.post('/Item/getItemBid', obj, this).then((rs) => {
        if (rs.code === 0) {
          let bdArr = []
          for (let num = rs.data.mItemBidSun; num > 0; num--) {
            bdArr.push(num)
          }
          this.selectlist.mItemBid = bdArr
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
            // 1是编辑 ，需要添加mDevID
            obj['mDevID'] = this.selectItemID
          }
          // console.log(JSON.stringify(obj))
          this.comFun.post('/Dev/createDev', obj, this).then((rs) => {
            console.log(JSON.stringify(rs))
            console.log('操作设备成功')

            if (rs.code === 0) {
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
        mDevID: this.selectItemID,
        mItemID: this.equipUseItemID
      }
      console.log(JSON.stringify(obj))
      this.comFun.post('/Dev/getDevInfo', obj, this).then((rs) => {
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
