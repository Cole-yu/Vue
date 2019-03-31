(function(global, factory){
	global.Vue = factory();
})(this, function(){
	var ASSET_TYPES = [
		'component',
		'directive',
		'filter'
	];

	var config = {
		optionMergeStrategies : Object.create(null)
	}

	var strats = config.optionMergeStrategies;

	// 默认处理策略
	var defaultStrat = function(parentVal, childVal){
		return childVal === undefined ? parentVal: childVal;
	}	

	strats.el = strats.propsData = function(parent, child, vm, key){
		if(!vm){
			console.error("el 只能用在vue的根实例上，不能用在其他上面")
		}
		return defaultStrat(parent, child);					// Vue.options.el    options.el
	}

	function hasOwn(obj, key){					// parent el data
		return hasOwnProperty.call(obj, key);
	}

	function extend(to, _form){
		for(var key in _form){
			to[key] = _form[key];
		}
		return to;
	}

	var noop = function(){};

	function resolveConstructorOptions(Ctor){	// Ctor:Vue
		var options = Ctor.options;
		console.log(options);
		if(Ctor.super){							// Vue.super => 子类 Vue.extend 创建子类
			var superOptions = resolveConstructorOptions(Ctor.super);
			var cachedSuperOptions = Ctor.superOptions;
			if(superOptions !== cachedSuperOptions){
				Ctor.superOptions = superOptions;
				var modifiedOptions = resolveModifiedOptions(Ctor);
				if(modifiedOptions){
					extend(Ctor.extendOptions, modefiedOptions);
				}
				options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
				if(options.name){
					options.components[options.name] = Ctor;
				}
			}
		}
		return options;
	}	

	function mergeOptions(parent, child, vm){
		// 规范检测
		// {
		// 	checkComponents(child);
		// }

		var options = {};
		var key;
		for(key in parent){			// Vue.options 'component' 'directive' 'filter'
			mergeField(key);
		}
		for(key in child){
			if(!hasOwn(parent, key)){	// parent el data ...
				mergeField(key);
			}
		}
		// 确定最终的选项 策略处理
		function mergeField(key){
			var strat = strats[key] || defaultStrat;
			options[key] = strat(parent[key], child[key], vm, key);		// strats.el = strats.propsData = function(parent, child, vm, key){
		}
		return options;
	}

	var uid$3 = 0;	

	function initMixin(Vue){
		Vue.prototype._init = function(options){
			var vm = this;
			// vm._uid = uid$3++; // 每次创建vue的实例，就加1			
			
			// 进行性能追踪的代码
			// if(config.performance && mark){
			// 	startTag = "vue-perf-start" + (vm._uid);	
			// 	endTag = "vue-perf-end" +(vm._uid);
			// 	mark(startTag);
			// }

			// vm._isVue = true;	// 表示对象是不是Vue的一个实例；在响应式系统中，如果是Vue的一个实例，就会停止对他的观测。
			
			// options._isComponent 判断是否是vue的一个组件，在创建一个组件时，对组件实例进行扩张这个属性，来标示是一个组件实例

			vm.$options = mergeOptions(
				resolveConstructorOptions(vm.constructor),
				options || {},
				vm
			);
		}
	}

	// function defineProperty(obj, key, value, def){
	// 	if(value == undefined){
	// 		obj[key] = def;
	// 	}
	// 	else{
	// 		obj[key] = value;
	// 	}
	// }

	function Vue(options){
		if(!(this instanceof Vue)){
			console.error("Vue is a constructor and should be called with the `new` keyword");
		}
		this._init(options);
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

	// Vue.prototype.init = function(){
	// 	var el = this.$options.el;
	// 	if(el != undefined){
	// 		this.$mount(el);
	// 	}
	// };

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

	initMixin(Vue);
	Vue.options = Object.create(null);
	var builtInComponents = {
 		// KeepAlive : KeepAlive	// 内置的组件
 		KeepAlive : {}	// 内置的组件
 	};
 	var platformDirectives = {
 		// model : derective,
 		// show : show
 		model : {},
 		show : {}
 	}

 	var platformComponents = {
 		// Transition : Transition,
 		// TransitionGroup : TransitionGroup
 		Transition : {},
 		TransitionGroup : {}
 	}

	ASSET_TYPES.forEach(function(type){
		Vue.options[type + "s"] = Object.create(null);
	});
	 
	Vue.options._base = Vue;

 	extend(Vue.options.components, builtInComponents);
	extend(Vue.options.directives, platformDirectives);
	extend(Vue.options.components, platformComponents);

	// ...compile  编译函数 词法分析 句法分析 ......
	return Vue;
});

// 初始化 - 挂载 - compile 渲染函数 - AST(抽象语法树) - generate 变成目标平台所需要的代码