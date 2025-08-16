// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue'
import App from './App.vue'

import { Amplify } from 'aws-amplify'
// ルートの amplify_outputs.json を読み込む
import outputs from '../../amplify_outputs.json'

Amplify.configure(outputs)

createApp(App).mount('#app')
