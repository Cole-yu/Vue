import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',      
	//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
	  component: resolve => require(['./views/About.vue'], resolve)
	
	//   Vue.component('async-webpack-example', function (resolve, reject) {
	// 	// 这个特殊的 `require` 语法将会告诉 webpack
	// 	// 自动将你的构建代码切割成多个包，这些包
	// 	// 会通过 Ajax 请求加载
	// 	require(['./my-async-component'], resolve)
	//   })

    },
    {
      path: '/avatar',
      name: 'avatar',      
      component: () => import(/* webpackChunkName: "avatar" */ './views/Avatar.vue')
	},
	{
		path: '/form',
		name: 'form',      
		component: () => import(/* webpackChunkName: "form" */ './views/Form.vue')
	}	
  ]
})
