import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'guide', noCache: true }
      }
    ]
  },

  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: 'teacherInfo',
        name: 'Teacher',
        component: () => import('@/views/form/teacherInfo'),
        meta: { title: '教师信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '课程信息', icon: 'example' },
    children: [
      {
        path: 'courseAdd',
        name: 'Course1',
        component: () => import('@/views/form/addCourse'),
        meta: { title: '添加课程', icon: 'table' }
      },
      {
        path: 'courseAll',
        name: 'Course2',
        component: () => import('@/views/table/course'),
        meta: { title: '当前课程', icon: 'tree' }
      },
      {
        path: 'signHistory/:id',
        name: 'Course3',
        component: () => import('@/views/table/signInList'),
        meta: { title: '签到历史', icon: 'tree' },
        hidden: true
      },
      {
        path: 'student/:courseId/:signId',
        name: 'Student',
        component: () => import('@/views/table/studentStatus'),
        meta: { title: '学生出勤', icon: 'tree' },
        hidden: true
      },
      {
        path: 'studentList/:courseId',
        name: 'student1',
        component: () => import('@/views/table/studentList'),
        meta: { title: '学生名单', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://jwc.usst.edu.cn/',
        meta: { title: '教务链接', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
