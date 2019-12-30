
<!-- 施工总监管 -->
<template>
   <div class="scmain">
    <Tab2 :items = items classStr='sc'></Tab2>
    <div class="content" style="background:#fff">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Tab2 from '@/components/Tab2.vue'
import '@/assets/css/itemlist.css'
export default {
  data () {
    return {
      items: [
        {
          routePath: '/sg/SGnianya',
          name: '碾压管理'
        },
        {
          routePath: '/sg/SGtanpu',
          name: '摊铺管理'
        }
      ]
    }
  },
  components: {
    Tab2
  }
}
</script>
