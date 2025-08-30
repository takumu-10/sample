// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
// import { createApp } from 'vue'
// import App from './App.vue'

// import { Amplify } from 'aws-amplify'
// // ルートの amplify_outputs.json を読み込む
// import outputs from '../../amplify_outputs.json'

// Amplify.configure(outputs)

// createApp(App).mount('#app')
// front-end/src/main.js
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import { Amplify } from 'aws-amplify'
// import outputs from '../../amplify_outputs.json'   // ← sample/front-end/src からの相対

// Amplify.configure(outputs)

// createApp(App).use(router).mount('#app')
// src/main.js
// front-end/src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Amplify } from 'aws-amplify'
import outputs from '../../amplify_outputs.json'   // ← sample/front-end/src からの相対
import './shared/style.css'

Amplify.configure(outputs)

createApp(App).use(router).mount('#app')
