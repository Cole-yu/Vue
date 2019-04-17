<template>   
	<div>
		<div class="item_bock head_p">
			<div class="head_img">
				<img :src="userInfo.avatar"/>
			</div>
			<div class="setting_right" @click.stop="uploadHeadImg">
				<div class="caption">更改头像</div>
			</div>
			<input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
		</div> 
		<br/>
		<hr/>
		<br/>	
		<div>
			<!-- <Table/> -->
			<Form/>
		</div>		
	</div>	
</template>

<script>
import Form from '@/components/Form'
import avatar from '@/assets/images/avatar.jpg';
import Table from '@/components/table'

export default {
  data(){
    return {
      	userInfo: {
        	avatar: avatar
        	// 初始图片
      	}
    }    
  },
  components:{
	  Table,
	  Form
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: function () {
      	this.$el.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handleFile: function (e) {
      	let $target = e.target || e.srcElement
      	let file = $target.files[0]
      	var reader = new FileReader()
      	reader.onload = (data) => {
        	let res = data.target || data.srcElement
        	this.userInfo.avatar = res.result
      	}
      	reader.readAsDataURL(file)
    },
  }
}
</script>

<style scoped>
    .item_bock {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height:94px;
        width: 300px;
        padding:0px 24px 0px 38px;
        border-bottom: 1px solid #f7f7f7;
        background: #fff;
    }
    .head_p {
        height:132px;
    }
    .head_img{
        height: 90px;
    }
    .head_img img{
        width:90px;
        height:90px;
        border-radius:50px
    }
    .setting_right{
        display: flex;
        height: 37px;
        justify-content: flex-end;
        align-items: center;
    }
    .hiddenInput{
        display: none;
    }
    .caption {
        color: #8F8F8F;
        font-size: 26px;
        height: 37px;
    }
</style>

