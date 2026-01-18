import { ref, watch } from 'vue';

export default {
  setup() {
    const question = ref("");
    const answer = ref("Questions usually contain a question mark. ;-)");
    const loading = ref(false);

    // 可以直接侦听一个 ref
    watch(question, async (newQuestion, oldQuestion) => {
      if (newQuestion.includes("?")) {
        loading.value = true;
        answer.value = "Thinking...";
        try {
          const res = await fetch("https://yesno.wtf/api");
          answer.value = (await res.json()).answer;
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