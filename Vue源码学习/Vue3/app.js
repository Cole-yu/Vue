import { ref, reactive, computed, watch, watchEffect, defineAsyncComponent } from 'vue';
// import MvInput from './components/mv-input/mv-input.js';
// import MvCount from './components/mv-count/mv-count.js';

export default {
  components: {
  //   MvInput,
    // MvCount,
    // MvCount: defineAsyncComponent(() => import("./components/mv-count/mv-count.js")), // defineAsyncComponent定义异步组件
    MvCount: defineAsyncComponent({
      loader: () => import("./components/mv-count/mv-count.js"),
      // loadingComponent: LoadingComponent, // 加载中组件
      delay: 200, // 展示加载组件(LoadingComponent)前的延迟时间，默认为 200ms
      timeout: 3000, // 超时显示配置的报错组件，默认值是：Infinity
      // errorComponent: ErrorComponent, // 加载失败后展示的组件
    }),
  },
  setup() {
    const msg = ref('Hello');
    const msgMore = computed(() => msg.value + ' world');

    const count = ref(0);
    const state = reactive({
      count
    })

    console.log(state.count) // 0

    state.count = 1
    console.log(count.value) // 1

    count.value = 2;
    console.log(state.count) // 2

    // 响应式数据：接收 Counter 组件传递的计数
    const currentTotal = ref(0);

    // 处理 Counter 组件的自定义事件
    const handleCountChange = (newCount) => {
      currentTotal.value = newCount;
    };

    const showCountFlag = ref(true);

    const countFlagChange = () => {
      showCountFlag.value = !showCountFlag.value;
    }

    const countDisplayValue = ref(null);
    watch(showCountFlag, () => {
      countDisplayValue.value = showCountFlag.value ? "展示" : "隐藏";
    }, {
      immediate: true,
    });
    // const unwatch = watchEffect(() => {
    //   countDisplayValue.value = showCountFlag.value ? "展示" : "隐藏";
    // });
    // unwatch();

    return {
      msg,
      msgMore,
      currentTotal,
      handleCountChange,
      showCountFlag,
      countFlagChange,
      countDisplayValue,
    }
  },
  template: `
    <div class="test-container">
        <div v-cloak>test demo {{msg}}</div>
        <div v-cloak>test demo {{msgMore}}</div>        
        <MvInput></MvInput>
        <div v-cloak>MvCount组件的currentTotal值：&nbsp;{{currentTotal}}</div>
        <MvCount :initialCount="0" @count-change="handleCountChange" v-if="showCountFlag"></MvCount>
        <button @click="countFlagChange">切换Count组件状态</button>
        <p>当前Count组件的显示状态：&nbsp;{{countDisplayValue}}</p>
    </div>
  `
}