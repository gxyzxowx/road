<style lang="less" scoped>

</style>
<template>

  <div class="excelstyle">

            <Upload
        ref="upload"
        action="/api/Item/importExcel"
        name="file"
        :data="data"
        :show-upload-list="true"
        :on-format-error="handleFormatError"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format ="['xlsx','xls']">
            <Button type="info" icon="ios-cloud-upload-outline">向ID为{{data.mItemID}}项目导入数据</Button>
    </Upload>

  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.data = {
      mUserID: this.comFun.getCookie('roadmUserID'),
      mItemID: this.$store.state.selectItemID
    }
  },
  watch: {
    '$store.state.selectItemID': function (newVal, oldVal) {
      this.data.mItemID = newVal
    }
  },
  methods: {
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
      })
    },
    handleSuccess (res, file) {
      console.log(JSON.stringify(res))
      console.log(file)
      console.log('成功了')
      if (res.code === 0) {
        this.dialoLead = false
        this.$Message.success('数据导入成功！')
        this.$refs.upload.clearFiles()
      } else {
        this.$Message.error(res.message)
      }
    },
    handleError (error, file) {
      console.log(error)
      console.log(file)
      console.log('失败了')
      this.$Message.error('数据导入失败！请联系管理员')
    }
  }
}
</script>
