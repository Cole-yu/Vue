<template>
  <div class="appList">
      <AppItem v-for="item in appList" :key="item.index" :app="item"></AppItem>
  </div>
</template>

<script>
import AppItem from '@/components/AppItem'
export default {
  name: 'AppList',
  props: [],
  data(){
    return {
      appList:[
        {
          index:1,          
          appName:"app1",
          appType:"类型A",
          author:"admin",
          createDate:"2019 - 04 - 09"
        },
        {
          index:2,
          appName:"app2",
          appType:"类型B",
          author:"admin",
          createDate:"2019 - 04 - 07"
        },
        {
          index:3,
          appName:"app3",
          appType:"类型B",
          author:"admin",
          createDate:"2019 - 04 - 14"
        },
        {
          index:4,
          appName:"app4",
          appType:"类型C",
          author:"admin",
          createDate:"2019 - 05 - 01"
        },
        {
          index:5,
          appName:"app5",
          appType:"类型D",
          author:"admin",
          createDate:"2019 - 03 - 29"
        },
        {
          index:6,
          appName:"app6",
          appType:"类型E",
          author:"admin",
          createDate:"2018 - 08 - 24"
        },
      ]
    }
  },
  components:{
    AppItem    
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
