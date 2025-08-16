import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import GroupRegisterView from '../views/GroupRegisterView.vue'
import SearchView from '../views/SearchView.vue'
import MessagesView from '../views/MessagesView.vue'
import MyPageView from '../views/MyPageView.vue'
import '../style.css'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/groups/new', name: 'groupRegister', component: GroupRegisterView },
  { path: '/search', name: 'search', component: SearchView },
  { path: '/messages', name: 'messages', component: MessagesView },
  { path: '/mypage', name: 'mypage', component: MyPageView },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
