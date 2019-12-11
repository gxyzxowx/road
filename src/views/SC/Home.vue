
<template>
  <div class="scmain">
    <div class="nav">
      <div class="title">拌合站总监管</div>
      <ul>
        <li v-for="(item, index) in items" :key="index" :class="{actived :item.isActive}" @click="handler(index, item.routePath )">
          <div class="left">
            <span class="icon"><img :src="item.iconpath" alt=""></span>
            <span>{{item.name}}</span>
          </div>
          <div class="right">
            <span>
              <img src="@/assets/img/sc/rig.png" alt />
            </span>
          </div>
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
          routePath: '/sc/home',
          iconpath: require('@/assets/img/sc/home.png'),
          name: '总览',
          isActive: true
        },
        {
          routePath: '/sc/SCdata',
          iconpath: require('@/assets/img/sc/sc.png'),
          name: '生产数据',
          isActive: false
        },
        {
          routePath: '/sc/SCquality',
          iconpath: require('@/assets/img/sc/zl.png'),
          name: '生产质量',
          isActive: false
        },
        {
          routePath: '/sc/SCgrade',
          iconpath: require('@/assets/img/sc/jp.png'),
          name: '级配统计',
          isActive: false
        },
        {
          routePath: '/sc/SCwarn',
          iconpath: require('@/assets/img/sc/yj.png'),
          name: '预警统计',
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
