
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
          routePath: '/sc/home',
          name: '实时信息'
        },
        {
          routePath: '/sc/SCdata',
          name: '质量监管'
        },
        {
          routePath: '/sc/SCspeed',
          name: '进度监管'
        },
        {
          routePath: '/sc/SCwarn',
          name: '预警管理'
        },
        {
          routePath: '/sc/SCsearch',
          name: '综合查询'
        }
      ]
    }
  },
  components: {
    Tab2
  }
}
</script>
