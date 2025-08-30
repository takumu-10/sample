import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../features/home/pages/HomeView.vue'
import GroupRegisterView from '../features/groups/pages/GroupRegisterView.vue'
import SearchView from '../features/search/pages/SearchView.vue'
import MessagesView from '../features/messages/pages/MessagesView.vue'
import MyPageView from '../features/mypage/pages/MyPageView.vue'
import '../shared/style.css'

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
