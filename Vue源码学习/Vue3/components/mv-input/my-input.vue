<template>
  <div class="mv-input-wrap">
    <p>
      Ask a yes/no question:
      <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>
  </div>
</template>

<script>
export default {
  name: "MyInput",
  data() {
    return {
      question: "",
      answer: "Questions usually contain a question mark. ;-)",
      loading: false,
    };
  },
  watch: {
    question: {
      handler: async (newQuestion, oldQuestion) => {
        if (newQuestion.includes("?")) {
          this.loading = true;
          this.answer = "Thinking...";
          try {
            const res = await fetch("https://yesno.wtf/api");
            this.answer = (await res.json()).answer;
          } catch (error) {
            this.answer = "Error! Could not reach the API. " + error;
          } finally {
            this.loading = false;
          }
        }
      },
    },
  },
  methods: {},
};
</script>