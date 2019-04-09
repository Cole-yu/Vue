<template>
    <div class="wrapper">
        <section>
            <label for="" class="title">名 称</label><span class="value">：{{appName}}</span>
        </section>
        <section>
            <label for="" class="title">类 型</label><span class="value">：{{appType}}</span>
        </section>
        <section>
            <label for="" class="title">作 者</label><span class="value">：{{author}}</span>
        </section>
        <section>
            <label for="" class="title">创 建 日 期</label><span class="value">：{{createDate}}</span>
        </section>
    </div>
</template>
<script>
export default {
    name:"AppItem",
    props:['app'],
    data(){
        return {
            appName:"",
            appType:"",
            author:"",
            createDate:""
        }
    },
    methods:{
        init(){
            this.appName = this.app.appName;
            this.appType = this.app.appType;
            this.author = this.app.author;
            this.createDate = this.app.createDate;
        }
    },
    mounted(){
        this.init();
    }
}
</script>
<style scoped>
    .wrapper{
        display: inline-block;
        width: 250px;
        border-radius: 5px;
        padding:15px;
        margin: 15px;
        border:1px solid #ddd;
        background-color: white;        
    }
    section{
        height: 32px;
    }
    .title{
        width: 80px;
        height: 100%;
        float: left;
        line-height: 32px;
        text-align:justify;
    }
    .title::after{
        content: '';
        display: inline-block;
        width:100%;
    }
    .value{
        float: left;
        height: 100%;
        line-height: 32px;
    }
</style>