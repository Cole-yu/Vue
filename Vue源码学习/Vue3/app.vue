<template>
  <div class="test-container">
    <div v-cloak>test demo {{ msg }}</div>
    <div v-cloak>test demo {{ msgMore }}</div>
  </div>
</template>

<script setup>
// export default {
//   data() {
//     return {
//       msg: "Hello",
//     };
//   },
//   computed: {
//     msgMore() {
//       return this.msg + " world";
//     },
//   },
//   created() {},
// };

const msg = ref("Hello");
const msgMore = computed(() => msg.value + " world");

const count = ref(0);
const state = reactive({
  count,
});

console.log(state.count); // 0

state.count = 1;
console.log(count.value); // 1

count.value = 2;
console.log(state.count); // 2
</script>
