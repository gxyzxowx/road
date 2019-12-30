<template>
  <div class="managemain">
    <Tab2 :items = items classStr='ma'></Tab2>
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
          routePath: '/manage/item',
          name: '项目管理'
        },
        {
          routePath: '/manage/equip',
          name: '设备管理'
        },
        {
          routePath: '/manage/recipe',
          name: '生产管理'
        },
        {
          routePath: '/manage/user',
          name: '用户管理'
        }
      ]
    }
  },
  components: {
    Tab2
  }
}
</script>
