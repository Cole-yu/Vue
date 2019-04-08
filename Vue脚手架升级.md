# Vue脚手架升级指导
	Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。

1. 卸载之前旧版本的脚手架
```
	npm uninstall vue-cli -g
```

2. 安装新的包
```
	npm install vue/cli -g
```

### 快速原型开发
```
	npm install -g @vue/cli-service-global
```
### 创建一个项目
```
	vue create hello-world
```

### 创建项目的帮助
```
	vue create --help
```

### 使用图形化界面
```
	vue ui
```	

### 拉取 2.x 模板(旧版本)
```	
	Vue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。
	如果仍然需要使用旧版本的 vue init 功能，可以全局安装一个桥接工具：
	
	npm install -g @vue/cli-init
	// `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
	vue init webpack my-project
```	