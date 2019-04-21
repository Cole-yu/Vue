<template>
	<div>
		<input type="file" ref="file" id="file">
		<button @click="submitFile">提交</button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	methods:{
		submitFile(){
			this.init();
		},
		init(){
			/* 前端使用 axios */
			var fd = new FormData(); 						 			//实例formdata
			// console.log(this.refs.file.files[0]);
			var file = document.querySelector("#file").files[0];
			console.log(file);
			fd.append('file', file); 									//添加要上传的文件  无关类型
			console.log(fd.get("file"));
			var config = {
				headers: {
					'Content-Type' : "multipart/form-data"  //之前说的以表单传数据的格式来传递fromdata 
				}
			}
			axios.post('http://localhost:3000/file', fd, config)  	//接口post 发送请求 附送 上传文件 file			
            .then((res)=>{
                console.log(res.data)  // 上传成功返回
            })
            .catch(err => {
                console.log(err)  // 上传失败 错误 返回
            })
		}
	},
	mounted(){
		
	}
}
</script>
