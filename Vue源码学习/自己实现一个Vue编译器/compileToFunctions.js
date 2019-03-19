// 编译器内置的配置选项
var baseOptions = {
  expectHTML: true,
  modules: {},
  directives: {},
  isPreTag: {},
  isUnaryTag: {},
  mustUseProp: {},
  canBeLeftOpenTag: {},
  isReservedTag: {},
  getTagNamespace: {},
  staticKeys: {}
};

var noop = function() {}                  // 空函数

// code 是字符串，errors为错误信息
function createFunction (code, errors) {
  try {
    return new Function(code);            // 创建一个函数，返回的是渲染函数
  } catch (err) {
    errors.push({ err, code });
    return noop;
  }
}


function createCompileToFunctionFn (compile) {
  // 存储最终编译的结果，优化性能
  var cache = Object.create(null);
                  // 渲染函数
  return function compileToFunctions (template, CompilerOptions, vm){
    // console.log(template);

    options = extend({}, options);        
    
    // 检测是否进行了内容安全策略(CSP)的限制
    try {
      new Function('return 1');           // 创建一个函数，渲染函数的字符串
    } catch (e) {
      console.error("编译器无法工作，请放宽你的内容安全策略");
    }

    // 检查是否修改过插入表达式，并进行检测是否已缓存 cache
    var key = options.delimiters ? String(options.delimiters) + template : template;
    if (cache[key]) {
      return cache[key];
    }

    // compile
    var compiled = compile(template, options);

    // 检查是否有错误信息
    if (compiled.errors && compiled.errors.length) {

    }
    
    // 检查是否有提示信息
    if (compiled.tips && compiled.tips.length) {
      
    }    

    var res = {};
    var fnGenErrors = [];

    // 将函数字符串转化为渲染函数
    res.render = createFunction(compiled.render, fnGenErrors) ;  

    return (cache[key] = res);
  }
}

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    // 核心函数
    function compile (template, options) {                  // options 为用户自定义的配置对象
      var finalOptions = Object.create(baseOptions);        // 将默认的配置选项作为原型创建一个配置对象
      var errors = [];
      var tips = [];

      // 错误和提示信息的存储
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {        
        
        // 合并自定义的模块
        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
        }

        // 合并自定义的指令
        if (options.directives) {
          finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
        }

        // 复制来扩展配置对象
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }      

      var compiled = baseCompile(template.trim(), finalOptions);        // baseCompile()返回的compiled对象一定提供了render属性
      {
        errors.push.apply(errors, detectErrors(compiled.ast))
      }
      compiled.errors = errors;
      compiled.tips = tips;

      return compiled;
    }

    return {
      compile : compile,
      compileToFunctions : createCompileToFunctionFn(compile)
    }
  }
}

// 编译器的祖宗 createCompilerCreator 返回一个创建编译器的方法 createCompiler()
var createCompiler = createCompilerCreator(function baseCompile (template, options) {
  // render 选项
  var ast = parse(template.trim(), options);      // 编译 词法分析 句法分析
  optimize(ast, options);                         // 标记静态节点
  var code = generate(ast, options);              // 根据目标平台生成所需要的代码，对于浏览器生成函数体字符串
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

// 上面都是创建一个编译器和编译器配置的封装
// ----------------------------------------------------------------------------------------
// 下面是提供给用户的接口

// 创建一个编译器
var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

// 模板编译 词法分析 句法分析
function parse(template){
  parseHTML(template);                          // 词法分析入口
}


function parseHTML(template){

}