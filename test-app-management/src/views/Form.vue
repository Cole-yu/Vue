<template>
	<div style="margin:30px;">
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="应用名" prop="appName">
				<el-input type="text" v-model="ruleForm.appName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-input type="text" v-model="ruleForm.author" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="文件上传" prop="fileList">
				<el-upload
					class="upload-demo"
					ref="upload"
					action="http://localhost:3000/upload"
					:before-upload="beforeUpload"
					:on-change="handleChange"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="ruleForm.fileList"
					:auto-upload="false">
					<el-button slot="trigger" size="small" type="primary">选取文件</el-button>					
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>				

				 <!-- <form action="http://localhost:3000/upload" enctype="multipart/form-data" method="post">
					<p>附件：<input type="file" name="myfile" style=""></p>
					<p>
						<input type="submit">
					</p> -->
				<!-- </form> -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>	
	</div>	
</template>

<script>
import axios from 'axios';
export default {
    data() {
      	var validateAppName = (rule, value, callback) => {
       		if (value === '') {
          		callback(new Error('请输入应用名'));
			}
			callback();
      	};
      	var validateAuthor = (rule, value, callback) => {
        	if (value === '') {
          		callback(new Error('请输入作者'));
			}
			callback();
      	};
      	return {
        	ruleForm: {
          		appName: '',
          		author: '',
          		fileList: []
        	},
			rules: {
				appName: [
					{
						validator: validateAppName, trigger: 'blur' 
					}
				],
				author: [
					{
						validator: validateAuthor, trigger: 'blur' 
					}
				]         
			},
			headers:{
				"Content-Type":"multipart/form-data"
			}
      	};
    },
    methods: {
      	submitForm(formName) {			
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.ruleForm);					

					// 【测试成功】
					// 使用FormData对象+Ajax发送
					// var formData = new FormData();
					// formData.append("appName", this.ruleForm.appName);
					// formData.append("author", this.ruleForm.author);
					// formData.append("file", this.ruleForm.fileList[0].raw);  // raw才是上传的文件对象
					// console.log(formData);
					// var xhr = new XMLHttpRequest();
					// xhr.open("POST", "http://localhost:3000/upload");
					// xhr.send(formData);
					

					//【测试成功】
					// axios.defaults.baseURL = 'http://localhost:3000';
					// var formData = new FormData();
					// formData.append("file", this.ruleForm.fileList[0].raw);  // raw才是上传的文件对象	
					// formData.append("appName", "aaaaa");  // raw才是上传的文件对象					
					// axios.post('/upload', formData, {
					// 	headers: {
					// 		'Content-Type' : "multipart/form-data"  //之前说的以表单传数据的格式来传递fromdata 
					// 	}
					// })


					// 【测试成功】
					axios.defaults.baseURL = 'http://localhost:3000';
					var formData = new FormData();
					formData.append("file", this.ruleForm.fileList[0].raw);  // raw才是上传的文件对象
					formData.append("appName", "aaaaa");
					
					console.log(formData);		// 显示{}，需要使用formDate.get("key")来获取某个字段

					axios({
						url: "/upload",
						method: "POST",						
						headers: {
							'Content-Type': 'multipart/form-data;'
						},
						data:formData				// 只能是单一的FormData对象
					})

				} else {
					console.log('error submit!!');
					return false;
				}
			});		
      	},
	    resetForm(formName) {
        	this.$refs[formName].resetFields();
	  	},
	  	//	 
      	handleRemove(file, fileList) {
			console.log("取消一个上传文件");
			// 从this.ruleForm.fileList中删除对应的元素对象
        	console.log(file);
      	},
      	handlePreview(file) {			
        	console.log(file);
	  	},
	  	handleChange(file, fileList) {
			console.log(fileList);
			console.log("添加一个上传文件");
        	this.ruleForm.fileList.push(file);
      	},
	  	beforeUpload(file){
		// 上传前校验文件格式		
		const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }	  
    }
  }
</script>