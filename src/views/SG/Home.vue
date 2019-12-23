<!-- 施工总监管 -->
<style scoped>

</style>
<template>
   <div class="scmain">
    <div class="nav">
      <!-- <div class="title">施工总监管</div> -->
      <ul>
        <li v-for="(item, index) in items" :key="index" :class="{actived :item.isActive}" @click="handler(index, item.routePath )">
            <span class="icon sc"></span>
            <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="content" style="background:#fff">
      <router-view/>
    </div>
  </div>
</template>
<script>
import '@/assets/css/itemlist.css'
export default {
  data () {
    return {
      items: [
        {
          routePath: '/sg/SGnianya',
          name: '碾压轨迹',
          isActive: true
        },
        {
          routePath: '/sg/SGtanpu',
          name: '摊铺轨迹',
          isActive: false
        }
      ],
      oldIndex: 0
    }
  },
  mounted () {
    this.$router.push(this.items[0].routePath)
  },
  methods: {
    handler (index, path) {
      // console.log('index' + index + 'status:' + isActive)
      // 切换样式
      if (index === this.oldIndex) return
      this.items[index].isActive = true
      this.items[this.oldIndex].isActive = false
      this.oldIndex = index
      // 路由切换
      this.$router.push(path)
    }
  }
}
</script>
