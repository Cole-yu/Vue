<template>
  <div class="home">    
    <header id="header">
      <el-row>
        <el-col :span="5" :offset="1">
          <h1 style="color:white;font-size:28px;">{{slogan}}</h1>
        </el-col>
        <el-col :span="5" :offset="9">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <div id="logout" ></div>          
        </el-col>
        <el-col :span='1'>
          <div id="account">{{userName}}</div>
        </el-col>
      </el-row>      
    </header>
    <div id="container">
      <AppList/>
    </div>
  </div>
</template>

<script>
import AppList from '@/components/AppList.vue'
import GlobalOption from "../globalOption.json"

export default {
  name: 'home',
  data(){
    return {
      input:'',
      userName:'',      
      slogan:'测试脚本管理平台'
    }
  },
  components: {
    AppList
  },
  mounted(){
    // 用户信息
    this.userName = GlobalOption.account.userName;
  }
}
</script>

<style scoped>
  #header{
    padding:8px 0;
    background-color: #999;
  }
  #logout{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
  }
  #account{
    width:40px;
    line-height: 40px;
    color:white;
    font-size: 20px;
  }
  #container{
    padding: 30px;
  }  
</style>