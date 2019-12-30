
<!-- 二级页面的tab -->
<template>
<div class="nav">
      <!-- <div class="title">管理</div> -->
      <ul>
        <li v-for="(item, index) in items" :key="index" :class="{actived :index == activeIndex}" @click="handler(index, item.routePath )">
            <span class="icon" :class="classStr"></span>
            <span class="name">{{item.name}}</span>
        </li>
      </ul>
    </div>
</template>
<script>
// import '@/assets/css/itemlist.css'
export default {
  data () {
    return {
      activeIndex: 0
    }
  },
  props: ['items', 'classStr'],
  mounted () {
    this.$router.push(this.items[0].routePath)
  },
  methods: {
    handler (index, path) {
      // 点击切换样式
      this.activeIndex = index
      // 路由切换
      this.$router.push(path)
    }
  }
}
</script>
