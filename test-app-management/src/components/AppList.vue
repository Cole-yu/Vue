<template>
  <div class="appList">
      <AppItem v-for="item in lists" :key="item.index" :app="item"></AppItem>
  </div>
</template>

<script>
import AppItem from '@/components/AppItem'
import Mock from 'mockjs'
import GlobalOption from '../globalOption.json'
import axios from 'axios';
import _ from 'lodash';

export default {
  name: 'AppList',
  props: ['currentPage', 'filterParams', 'perPageNumber'],
  data(){
    return {
      lists:[],
      appList:[]      
    }
  },  
  components:{
    AppItem    
  },
  watch:{    
    filterParams(){
      // console.log(this.filterParams);
      if(this.filterParams == ''){        
        var paginationLenth = this.appList.length;
        this.$emit('changePaginationLength', paginationLenth);

        var start = 0;
        var end = this.perPageNumber * 1;
        this.lists = this.appList.filter((value, index) => {
          return index >= start && index < end;
        });
      }
      else{
        var tempArr = this.appList.filter( value => {
          var appNameFlag = value.appName.indexOf(this.filterParams) != -1;
          var appTypeFlag = value.appType.indexOf(this.filterParams) != -1;   // 区分大小写
          var authorFlag = value.author.indexOf(this.filterParams) != -1;    // 区分大小写          
          return appNameFlag || appTypeFlag || authorFlag;
        });

        var paginationLenth = tempArr.length;
        this.$emit('changePaginationLength', paginationLenth);
    
        var start = 0;
        var end = this.perPageNumber * 1;
        this.lists = tempArr.filter((value, index) => {
          return index >= start && index < end;
        });
      }
    },
    perPageNumber(){
      var start = this.perPageNumber * (this.currentPage - 1);
      var end = this.perPageNumber * this.currentPage;
      this.lists = this.appList.filter((value, index) => {
        return index >= start && index < end;
      });
    },
    currentPage(){
      var start = this.perPageNumber * (this.currentPage - 1);
      var end = this.perPageNumber * this.currentPage;

      // ES5 语法
      // this.lists = this.appList.filter((value, index) => {
      //   return index >= start && index < end;
      // });
      
      // 使用 lodash 的 filter 方法
      this.lists = _.filter(this.appList, (value, index) => {
        return index >= start && index < end;
      })
    },

  },
  methods:{
    init(){
      var baseUrl = GlobalOption.baseUrl;            
      var url = baseUrl + "/appList";

      axios.get(url)
        .then( res => {
          // res对象 = {
          //   data:'',
          //   config:{},
          //   header:{},
          //   request:{},
          //   status:200,
          //   statusText:'ok'
          // }
          console.log(res); // res.data
        })
        .catch(err => {
          console.log(err)
        })
    }    
  },
  mounted(){
    this.init();
    // 将时间戳格式改为 'yyyy-MM-dd' 格式
    function formatDate(timeStamp){
      var date = new Date(timeStamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      month = ('0'+month).substr(-2, 2);
      var day = date.getDate();
      day = ('0' + day).substr(-2, 2);
      
      return  year + ' - ' + month + ' - ' + day;
    }
    var Random = Mock.random;
    var appTypeArr = ['类型A', '类型B', '类型C', '类型D', '类型E'];
    var authorArr = ['Admin', 'userA', 'userB', 'userC', 'userD'];

    var data = Mock.mock({
      'list|100': [{          
          'index|+1' : 1,
          'appName' : "app",
          'appType|1' : appTypeArr,
          'author|1' : authorArr,
          'createDate|1454896399587-1554896399587' : 1
      }]
    })
    // 输出结果
    // console.log(JSON.stringify(data, null, 4));

    data.list.forEach( value => {
      value.appName = 'App' + value.index;
      value.createDate = formatDate(value.createDate);
    });

    // 后台获取到的原始数据，不允许修改，filter() 不会改变原始数组，返回一个新的数组
    this.appList = data.list;

    var paginationLenth = this.appList.length;
    this.$emit('changePaginationLength', paginationLenth);
    
    var start = this.perPageNumber * (this.currentPage - 1);
    var end = this.perPageNumber * this.currentPage;
    this.lists = this.appList.filter((value, index) => {
      return index >= start && index < end;
    });
  }
}
</script>

<style scoped lang="scss">
  .appList{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
  }
</style>
