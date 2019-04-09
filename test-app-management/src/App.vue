<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    
    <div id="nav">
      <Navi/>
    </div>

    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navi from '@/components/Navi'
export default {
  name:"App",
  data(){
    return {
      
    }
  },
  components:{
    Navi
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  color: #2c3e50;
  width:100%;
  height:100%;
  overflow: hidden;
}
#nav {
  padding-top:30px;
  width: 200px;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
  background-color: #545c64;
  box-sizing: border-box;
}
.main{
  width: 100%;
  height: 100%;
  padding-left:200px;
  background-color: #ddd;
  box-sizing: border-box;
}
</style>
