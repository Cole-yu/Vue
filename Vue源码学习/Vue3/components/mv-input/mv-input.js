import { ref, watch, onWatcherCleanup } from 'vue';

export default {
  setup() {
    const question = ref("");
    const answer = ref("Questions usually contain a question mark. ;-)");
    const loading = ref(false);

    // 可以直接侦听一个 ref
    watch(question, async (newQuestion, oldQuestion, onCleanup) => {
      if (newQuestion.includes("?")) {
        loading.value = true;
        answer.value = "Thinking...";
        try {
          const controller = new AbortController();
          fetch("https://yesno.wtf/api", {
            signal: controller.signal,
          }).then(res => {
            answer.value = res.json().answer;
          });

          // 在上一个请求还未完成，question又有变化触发回调，老接口响应已经过时会触发
          // onCleanup 与侦听器实例相绑定，因此不受 onWatcherCleanup 的同步限制
          // onCleanup(() => {
          //   controller.abort(); // 终止过期请求
          // });

          // 使用 onWatcherCleanup()  API 来注册一个清理函数，当侦听器失效并准备重新运行时会被调用
          // onWatcherCleanup 仅在 Vue 3.5+ 中支持，并且必须在 watchEffect 效果函数或 watch 回调函数的同步执行期间调用：你不能在异步函数的 await 语句之后调用它
          onWatcherCleanup(() => {
            controller.abort();
          });
        } catch (error) {
          answer.value = "Error! Could not reach the API. " + error;
        } finally {
          loading.value = false;
        }
      } else {
        answer.value = "Questions usually contain a question mark. ;-)";
      }
    });

    return {
      question,
      answer,
      loading,
    }
  },
  template: `
    <div class="component-card mv-input-wrap">
      <p>
        Ask a yes/no question:
        <input v-model="question" :disabled="loading" />
      </p>
      <p>{{ answer }}</p>
    </div>
  `,
}