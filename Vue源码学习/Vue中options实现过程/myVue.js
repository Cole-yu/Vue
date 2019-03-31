(function(global, factory){
	global.Vue = factory();
})(this, function(){
	var noop = function(){};	

	function defineProperty(obj, key, value, def){
		if(value == undefined){
			obj[key] = def;
		}
		else{
			obj[key] = value;
		}
	}

	var Vue = function(options){
		this.$options = options = options || {};
		var data = this._data = options.data;
		var _this = this;
		Object.keys(data).forEach(function(key){
			_this._proxy(key);			// 代理数据
		});
		this.init();
	};

	Vue.prototype._proxy = function(key){
		Object.defineProperty(this, key, {
			get : function(){
				return this._data[key];
			},
			set : function(newValue){
				this._data[key] = newValue;
			}
		});
	};

	Vue.prototype.init = function(){
		var el = this.$options.el;
		if(el != undefined){
			this.$mount(el);
		}
	};

	Vue.prototype.$mount = function(el){
		this.$el = typeof el === "string" ? document.querySelector(el) : document.body;
		console.log(this.$el);
		if(this.$el == null){
			console.error(this.$options.el + "not found");	
		}
		// 检测某个对象的属性 初始化赋值
		defineProperty(this, "template", {
			get : function(){

			}
		});

		/*
		  obj 对象			2: 扩展obj[key]
		  key 属性 			
		  value 属性值    	1: 检测值是否存在
		  define 默认值
		*/
		defineProperty(this, 'template', this.$options.template, this.$el.outerHTML);
		console.log(this.template);
		if(this.render == noop){
			this.render = Vue.compile(this.template);
		}
	};

	// ...compile  编译函数 词法分析 句法分析 ......
	return Vue;
});

// 初始化 - 挂载 - compile 渲染函数 - AST(抽象语法树) - generate 变成目标平台所需要的代码