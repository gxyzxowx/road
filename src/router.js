import Vue from 'vue'
import Router from 'vue-router'
import comFun from './assets/js/comfun.js'
// 定义组件

Vue.use(Router)

// 定义路由
const routes = [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('./Login.vue')
},
// Main.vue(HeaderR + router-view)
{
  path: '/',
  name: 'main',
  component: () => import('./Main.vue'),
  // router-view
  children: [
    // 控制台control项目总览
    {
      path: '/control',
      name: 'control',
      component: () => import('./views/Control.vue')
    },
    // 生产监管大区
    {
      path: '/sc',
      name: 'sc',
      component: () => import('./views/SC/Home.vue'),
      children: [{
        // （一级）实时信息
        path: '/sc/home',
        component: () => import('./views/SC/SChome.vue')
      }, {
        // （一级）质量监管
        path: '/sc/SCdata',
        component: () => import('./views/SC/SCdata.vue'),
        children: [{
          // 质量 --- 温度
          path: '/sc/SCdata/wd',
          component: () => import('./views/SC/SCdataWD.vue')
        },
        {
          // 质量 --- 油石比
          path: '/sc/SCdata/ysb',
          component: () => import('./views/SC/SCdataYSB.vue')
        },
        {
          // 质量 --- 级配
          path: '/sc/SCdata/jp',
          component: () => import('./views/SC/SCdataJP.vue')
        }
        ]
      }, {
        // （一级）进度监管
        path: '/sc/SCspeed',
        component: () => import('./views/SC/SCspeed.vue')
      }, {
        // （一级）预警管理
        path: '/sc/SCwarn',
        component: () => import('./views/SC/SCwarn.vue')
      }, {
        // （二级）预警管理处理
        path: '/sc/SCwarnHandle',
        component: () => import('./views/SC/SCwarnHandle.vue')
      }, {
        // （一级）综合查询
        path: '/sc/SCsearch',
        component: () => import('./views/SC/SCsearch.vue')
      }

      ]
    },
    // 施工监管大区
    {
      path: '/sg',
      name: 'sg',
      component: () => import('./views/SG/Home.vue'),
      children: [
        {
          // （一级）摊铺轨迹
          path: '/sg/SGtanpu',
          component: () => import('./views/SG/SGtanpu.vue')
        }, {
          // （一级）压实轨迹
          path: '/sg/SGyashi',
          component: () => import('./views/SG/SGyashi.vue')
        }
      ]
    },
    // 管理大区
    {
      path: '/manage',
      name: 'manage',
      component: () => import('./views/manage/Home.vue'),
      children: [{
        // （一级）项目管理
        path: '/manage/item',
        component: () => import('./views/manage/Mitem.vue')
      },
      {
        // （二级）项目管理--新建项目
        path: '/manage/item/new',
        component: () => import('./views/manage/MitemNew.vue')
      },
      {
        // （一级）设备管理
        path: '/manage/equip',
        component: () => import('./views/manage/Mequip.vue')
      },
      {
        // （二级）设备管理 --新建设备
        path: '/manage/equip/new',
        component: () => import('./views/manage/MequipNew.vue')
      },
      {
        // （一级）生产管理
        path: '/manage/recipe',
        component: () => import('./views/manage/Mrecipe.vue')
      }, {
        // （二级）生产管理--新建材料/配方
        path: '/manage/recipe/new',
        component: () => import('./views/manage/MrecipeNew.vue')
      },
      {
        // （一级）用户管理
        path: '/manage/user',
        component: () => import('./views/manage/Muser.vue')
      },
      {
        // （二级）用户管理--新建用户
        path: '/manage/user/new',
        component: () => import('./views/manage/MuserNew.vue')
      }
      ]
    }
  ]
}

]

// new Router实例，传routes配置参数注入路由
// 输出以便main.js挂载根实例
var router = new Router({
  routes
})
// 设置跳转规则（管理员或者未登录状态）
router.beforeEach((to, from, next) => {
  // 取得用户数据
  let username = comFun.getCookie('roadmUserID')
  if (!username && to.path !== '/login') {
    // console.log('没有用户数据或者用户数据过期' + username)
    next('/login')
  } else if (to.name === 'control') {
    // console.log('有' + username)
    // window.location.reload()
    next()
  } else {
    next()
  }
})

// 为了注释报错（相同途径点击会报错）
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
