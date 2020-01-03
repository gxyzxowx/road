<template>
    <div class="load-status">
         <Col class="demo-spin-col" v-show="showLoading">
            <Spin fix>
                <Icon type="ios-loading"  class="demo-spin-icon-load"></Icon>
                <div>{{text}}</div>
            </Spin>
        </Col>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    showLoading: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>
