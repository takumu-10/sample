// front-end/src/main.js

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './shared/style.css'

// Amplify.configure(outputs) の代わりに、
// 独自のバックエンドAPIエンドポイントを設定することができます。
// 例:
// const API_BASE_URL = 'http://localhost:3001/api';
// export const apiEndpoints = {
//   messages: `${API_BASE_URL}/messages`,
//   // ... その他のエンドポイント
// };
// この設定を別のファイルに切り出して、各コンポーネントから利用すると良いでしょう。

createApp(App).use(router).mount('#app')