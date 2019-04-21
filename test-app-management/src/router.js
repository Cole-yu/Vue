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
	},
	{
		path: '/upload',
		name: 'upload',      
		component: () => import(/* webpackChunkName: "form" */ './views/NativeUpload.vue')
	}	
  ]
})
