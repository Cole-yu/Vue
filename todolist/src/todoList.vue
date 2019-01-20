<template>
  <div>
    <input v-model="inputValue"/>
    <button @click="handlerSubmit">提交</button>
    <ul>
      <todo-item v-for="(item,index) of items" 
                :content="item" 
                :key="index" 
                :index="index" 
                @delete="handlerDelete" >
      </todo-item>
    </ul>
  </div>
</template>

<script>
  import todoItem from './components/todoItem';

  export default {
    components:{
      "todo-item":todoItem
    },
    data:function(){
      return{
        inputValue:"",
        items:[]
      }
    },
    methods:{
        handlerSubmit:function(){
          this.items.push(this.inputValue);
          this.inputValue="";
        },
        handlerDelete(index){
          this.items.splice(index,1);
        }
    }
  }
</script>

<style>

</style>
