<style scoped>

</style>
<template>
  <div class="newform">
    <h2 style="margin-bottom: .10rem;">{{type? '修改' : '新建'}}矿料</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
      <FormItem label="选择矿料">
        <Select v-model="formValidate.mKlID" style="width: 1.80rem;margin-right: .10rem;" size="large" placeholder="请选择矿料ID">
          <Option v-for="item in selectlist" :value="item.mKlID" :key="item.mKlID">{{ item.tBhKlTable }}</Option>
        </Select>
      </FormItem>
      <FormItem v-for="(item, index) in kltablelist" :key="index" :label="item.title + '(%)'" :prop="item.key">
        <Input v-model="formValidate[item.key]" :placeholder="'请输入' + item.title + '（输入0-100之间的数,不用输入%)'"></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">确认{{type? '修改' : '新建'}}</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: .08rem">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import kltablelist from '@/data/recipeKl.json'
export default {
  data () {
    return {
      kltablelist: kltablelist,
      // 0新增项目；1修改项目
      type: 0,
      // 选择矿料ID列表
      selectlist: [],
      // 选择操作的材料ID，从store中selectItemID获取
      selectmClID: '',
      // 编辑时才有：选择操作的矿料，项目ID,标段，从store中klUse获取
      klUse: {
        bd: '',
        itemID: '',
        // 选择操作的矿料ID，从store.klUse.mKlID中获取
        mKlID: ''
      },
      formValidate: {
        // 选择矿料的ID，修改矿料时默认为当时矿料ID
        mKlID: ''
      },
      ruleValidate: {
        mItemDes: [
          {
            required: true,
            message: '',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.klUse = this.$store.state.klUse

    // 取得某个材料中选择矿料ID的数据
    this.getSelectlist()

    // 确定是修改矿料还是新增矿料
    if (this.klUse.mKlID) {
      // 是修改矿料
      this.type = 1
      console.log('是修改')
      this.getItemInfo()
    }
  },
  methods: {
    getSelectlist () {
      this.selectmClID = this.$store.state.selectItemID
      let obj = {
        mClID: this.selectmClID,
        mUserID: this.comFun.getCookie('roadmUserID')
      }
      // console.log(JSON.stringify(obj))
      this.comFun.post('/Cl/getAvailableKlList', obj, this).then((rs) => {
        console.log(rs)
        if (rs.code === 0) {
          rs.data.push({
            mKlID: this.klUse.mKlID,
            tBhKlTable: '#' + this.klUse.mKlID
          })
          this.selectlist = rs.data
        } else {
          //  失败
          this.$Message.error(rs.message)
        }
      }, (err) => { console.log(err) })
    },
    handleSubmit (formValidate) {
      let obj = this.formValidate
      obj['mUserID'] = this.comFun.getCookie('roadmUserID')
      obj['mClID'] = this.selectmClID

      // 判断是新增还是修改
      if (this.type === 1) {
        // 1是编辑修改矿料 ，需要额外添加项目ID,标段,原矿料的值和更新矿料的值

        obj['mItemID'] = this.klUse.itemID
        obj['mItemBid'] = this.klUse.bd
        // 更新的值为表格的矿料ID
        obj['update_mKlID'] = this.formValidate.mKlID
        // 原矿料的ID
        obj['mKlID'] = this.klUse.mKlID
        console.log(JSON.stringify(obj))
        this.comFun.post('/Cl/updateRepiceRecord', obj, this).then((rs) => {
          console.log(JSON.stringify(rs))
          if (rs.code === 0) {
            /// 成功,提示后返回并刷新
            console.log('修改或者新增矿料成功')
            this.$Message.success(rs.message)
            this.$store.commit('setModalStateKl', false)
          } else {
            //  失败
            this.$Message.error(rs.message)
          }
        }, (err) => { console.log(err) })
      } else {
        // 0是新增矿料
        console.log(obj)
        this.comFun.post('/Cl/addRepice', obj, this).then((rs) => {
          console.log(rs)
          if (rs.code === 0) {
            // 成功,提示后返回并刷新
            console.log('修改或者新增矿料成功')
            this.$Message.success(rs.message)
            this.$store.commit('setModalStateKl', false)
          } else {
            //  失败
            this.$Message.error(rs.message)
          }
        }, (err) => { console.log(err) })
      }
    },
    handleReset (formValidate) {
      this.$refs[formValidate].resetFields()
    },
    // 修改矿料需要显示矿料的info
    getItemInfo () {
      let obj = {
        mUserID: this.comFun.getCookie('roadmUserID'),
        mItemID: this.klUse.itemID,
        mItemBid: this.klUse.bd,
        mClID: this.selectmClID,
        mKlID: this.klUse.mKlID
      }
      // console.log(JSON.stringify(obj))
      this.comFun.post('/Cl/getBhClRepiceInfo', obj, this).then((rs) => {
        console.log(JSON.stringify(rs))
        if (rs.code === 0) {
          // 处理数据呈现
          // rs.data.mItemActive = rs.data.mItemActive + ''
          // if (rs.data.mItemPhoneNo) rs.data.mItemPhoneNo = parseInt(rs.data.mItemPhoneNo)
          // if (rs.data.mAlarmLev1PhoneNo) rs.data.mAlarmLev1PhoneNo = parseInt(rs.data.mAlarmLev1PhoneNo)
          // if (rs.data.mAlarmLev2PhoneNo) rs.data.mAlarmLev2PhoneNo = parseInt(rs.data.mAlarmLev2PhoneNo)
          // if (rs.data.mAlarmLev3PhoneNo) rs.data.mAlarmLev3PhoneNo = parseInt(rs.data.mAlarmLev3PhoneNo)
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
