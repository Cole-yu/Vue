# Vue源码学习过程的笔记

	百度关键字 VUE源码分析
	http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/
	https://blog.csdn.net/Bonjourjw/article/details/80344368

### 从渲染函数解析模板入手
```
	// code 字符串 errors 错误信息
	function createFunction (code, errors) {
	  try {
	    return new Function(code)		// 渲染函数生成
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}
```

### 编译器的创建过程
```
	// 编译器的祖宗
	createCompilerCreator 创建一个编译器 => return createCompiler => return compile
	createCompiler
	compile

	function createCompilerCreator (baseCompile) {
	  return function createCompiler (baseOptions) {
	  	// 核心函数
	    function compile (
	      template, 		//模板
	      options
	    ) {
	      var finalOptions = Object.create(baseOptions);
	      var errors = [];
	      var tips = [];
	      finalOptions.warn = function (msg, tip) {
	        (tip ? tips : errors).push(msg);
	      };

	      if (options) {
	        // merge custom modules
	        if (options.modules) {
	          finalOptions.modules =
	            (baseOptions.modules || []).concat(options.modules);
	        }
	        // merge custom directives
	        if (options.directives) {
	          finalOptions.directives = extend(
	            Object.create(baseOptions.directives),
	            options.directives
	          );
	        }
	        // copy other options
	        for (var key in options) {
	          if (key !== 'modules' && key !== 'directives') {
	            finalOptions[key] = options[key];
	          }
	        }
	      }

	      var compiled = baseCompile(template, finalOptions);
	      {
	        errors.push.apply(errors, detectErrors(compiled.ast));
	      }
	      compiled.errors = errors;
	      compiled.tips = tips;
	      return compiled
	    }

	    return {
	      compile: compile,
	      compileToFunctions: createCompileToFunctionFn(compile)
	    }
	  }
	}

	创建一个编译器
	var ref$1 = createCompiler(baseOptions);
	var compile = ref$1.compile;
	var compileToFunctions = ref$1.compileToFunctions;

	ref$1的两个属性 对应 createCompiler方法返回的对象
	{
		compile:compile,
		compileToFunctions:createCompileToFunctions(compile)
	}
```