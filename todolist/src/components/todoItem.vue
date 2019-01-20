<template>
  <li @click="handlerDelete">{{content}}</li>
</template>

<script>
export default {
  props:["content","index"],
  methods:{
    handlerDelete:function(){
      this.$emit("delete",this.index);
    }
  }
}
</script>

<style scoped>

</style>
