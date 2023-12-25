import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name:'allProductView',
    component: () => import('../views/AllProductView.vue'),
  },
  {
    path: '/order/:productid',
    name:'orderView',
    component: () => import('../views/OrderView.vue'),
  },
  {
    path: '/category',
    name:'categoryView',
    component: () => import('../views/CategoryView.vue'),
  },
  {
    path: '/product/:category',
    name:'productView',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path:'/ranksale',
    name:'rankView',
    component:() => import('../views/RankView.vue'),
  },
  {
    path:'/monthrank/:month',
    name:'monthRank',
    component:() => import('../views/MonthRank.vue')
  },
  {
    path:'/saleamount',
    name:'saleAmount',
    component:() => import('../views/SaleAmount.vue')
  },
  /*
  {
    path: '/',
    name: 'logInView',//注册登录页面
    component: () => import('../views/LogInView.vue'),
  },*/
  


  

  {
    path: '/:catchAll(.*)', // 匹配所有路径 
    
    //根据用户权限重定向
    redirect: to => {
      const role = localStorage.getItem('user_permission');
      
      if (role === 'player') {
        return { name: 'homeView' };
      } else if (role === 'admin') {
        return { name: 'announcementView' };
      } else {
        return { name: 'logInView' };
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userPermission = localStorage.getItem('user_Permission'); 

  if (to.matched.some(record => record.meta.requiresAuth)) {// 判断是否需要登录权限
    
    if (!token) {
      next({ name: 'logInView' }); // 未登录，跳转到登录页面
    } else {
      // 判断用户权限是否满足要求
      if ((to.meta.permission === 'player' && userPermission === 'player') ||
          (to.meta.permission === 'admin' && userPermission === 'admin')) {
        next(); // 用户权限满足，继续导航
      } else {
        // 用户权限不满足，根据身份进行重定向
        if (userPermission === 'player') {
          next({ name: 'homeView' }); 
        } else if (userPermission === 'admin') {
          next({ name: 'announcementView' }); 
        }
      }
    }
  } else {
    next(); // 不需要登录权限的页面，直接导航
  }
});

export default router
