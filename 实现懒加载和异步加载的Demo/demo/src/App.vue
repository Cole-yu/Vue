<template>
  <div id="app">
    <img src="./assets/logo.png">
    <comp-a></comp-a>
    <comp-c></comp-c>
    <async-comp-d></async-comp-d>
    <router-view/>
  </div>
</template>

<script>
// import CompA from './components/CompA';

import Loading from '@/components/Loading'
import ErrorCom from '@/components/ErrorCom'
// 高级异步组件
const AsyncCompD = () => ({
  component : import(/*webpackChunkName : "AsyncCompD" */'@/components/CompD.vue'),
  loading : Loading,
  delay : 200,      // 延时
  timeout : 2000,   // 超时
  error : ErrorCom  // 报错时显示组件
})

export default {
  name: 'App',
  components:{
    CompA : function(resolve){
      require(['@/components/CompA.vue'], resolve)
    },
    CompB : () => import(/*webpackChunkName:"compB" */'@/components/CompB'),
    AsyncCompD : AsyncCompD
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
