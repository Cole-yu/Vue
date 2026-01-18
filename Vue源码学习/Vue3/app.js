import { ref, reactive, computed } from 'vue';
// import MvInput from './components/mv-input/mv-input.js';
// import MvCount from './components/mv-count/mv-count.js';

export default {
  // components: {
  //   MvInput,
  //   MvCount,
  // },
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

    return {
      msg,
      msgMore,
      currentTotal,
      handleCountChange,
    }
  },
  template: `
    <div class="test-container">
        <div v-cloak>test demo {{msg}}</div>
        <div v-cloak>test demo {{msgMore}}</div>        
        <MvInput></MvInput>
        <div v-cloak>【mv-count currentTotal】：&nbsp;&nbsp;{{currentTotal}}</div>
        <MvCount :initialCount="0" @count-change="handleCountChange"></MvCount>
    </div>
  `
}