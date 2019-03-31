import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
// import  TestA from '@/components/TestA'
// import  TestB from '@/components/TestB'

// 懒加载方式一
const TestA = () => import(/*webpackChunkName : "testA" */'@/components/TestA');
// const TestB = () => import(/*webpackChunkName : "testB" */'@/components/TestB');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/a',
      name: 'TestA',
      component: TestA
    },
    {
      path: '/b',
      name: 'TestB',
      // 懒加载方式二
      component: () => import(/*webpackChunkName : "testB" */'@/components/TestB')
    }
  ]
})
