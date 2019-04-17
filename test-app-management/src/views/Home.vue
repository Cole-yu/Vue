<template>
  <div class="home">
    <el-container>   
      <el-header id="header">
        <el-row>
          <el-col :span="5" :offset="1">
            <h1 style="color:white;font-size:28px;">{{slogan}}</h1>
          </el-col>
          <el-col :span="5" :offset="9">
            <el-input v-model="input" placeholder="请输入内容" @change='changeFilterParams'></el-input>
          </el-col>
          <el-col :span="1" :offset="1">
            <div id="logout"></div>
          </el-col>
          <el-col :span='1'>
            <div id="account">{{userName}}</div>
          </el-col>
        </el-row>      
      </el-header>    
      <el-main id="container">
        <AppList 
          :filterParams='filterParams'
          :currentPage='currentPage'
          :perPageNumber='perPageNumber'
          @changePaginationLength='changePaginationLength' />
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 12]"          
          :page-size="perPageNumber"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalLength">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import AppList from '@/components/AppList.vue'
import GlobalOption from "../globalOption.json"

export default {
  name: 'home',
  data(){
    return {
      input : '',
      userName : '',
      filterParams : '',
      currentPage : 1,
      perPageNumber : 12, 
      totalLength : 0,
      slogan : '测试脚本管理平台'
    }
  },
  components: {
    AppList
  },
  methods:{
    changeFilterParams(){
      this.filterParams = this.input;
    },
    changePaginationLength(paginationLength){
      this.totalLength = paginationLength;
    },
    handleSizeChange(val) {
      this.perPageNumber = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`显示当前所在页面:当前为第${val}页`);
    }
  },
  watch:{
    input(){
      this.filterParams = this.input;
    }
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
</style>