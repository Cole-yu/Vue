import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  // 声明接收的 Props（父组件传递的初始值）
  props: {
    initialCount: {
      type: Number,
      required: false,
      default: 0
    }
  },
  // 组件内部状态管理（Vue3 组合式 API - setup）
  setup(props, { emit }) {
    const count = ref(props.initialCount);

    // 增加计数的方法
    const increment = () => {
      count.value++;
      // 触发自定义事件，向父组件传递当前计数
      emit("count-change", count.value);
    };

    // 减少计数的方法
    const decrement = () => {
      count.value--;
      // 触发自定义事件，向父组件传递当前计数
      emit("count-change", count.value);
    };

    // 挂载阶段
    onBeforeMount(() => {
      console.log("onBeforeMount：即将挂载 DOM");
    });

    onMounted(() => {
      console.log("onMounted：DOM 挂载完成，可操作 DOM");
    });

    // 更新阶段
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate：数据变化，即将更新 DOM");
    });

    onUpdated(() => {
      console.log("onUpdated：DOM 已更新完成");
    });

    // 卸载阶段
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount：组件即将卸载");
    });

    onUnmounted(() => {
      console.log("onUnmounted：组件已完全卸载，清理资源");
    });

    // 返回需要在模板中使用的状态和方法
    return {
      count,
      increment,
      decrement,
    };
  },
  // 组件模板
  template: `
    <div class="component-card mv-counter-wrap">
      <h2>Counter 组件</h2>
      <p>当前计数：{{ count }}</p>
      <div style="margin-top: 1rem; gap: 1rem; display: flex;">
        <button @click="decrement">- 减少</button>
        <button @click="increment">+ 增加</button>
      </div>
    </div>
  `
}