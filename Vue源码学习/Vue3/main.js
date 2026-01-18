import { createApp } from 'vue';
import MvInput from './components/mv-input/mv-input.js';
import MvCount from './components/mv-count/mv-count.js';
import App from './app.js';

const app = createApp(App);

// 注册全局组件
app.component("MvInput", MvInput);
app.component("MvCount", MvCount);

app.mount("#app");