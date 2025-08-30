<template>
  <!-- <Authenticator>
    <template #default="{ user, signOut }">
      <main style="padding:24px">
        <h1>Hi, 長袖をください{{ user?.username }}</h1>
        <button @click="signOut">Sign out</button>
      </main>
    </template>
  </Authenticator> -->
  <div class="app">
    <header class="app-header">
      <h1>{{ currentTitle }}</h1>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const titles = {
  home: 'ホーム',
  groupRegister: 'グループ登録',
  search: '探',
  messages: 'メッセージ',
  mypage: 'マイページ',
}
const currentTitle = computed(() => titles[route.name || 'home'] ?? 'ホーム')
</script>

<style scoped>
.app { min-height: 100svh; display: grid; grid-template-rows: auto 1fr; background: #fff; }
.app-header { position: sticky; top: 0; background:#ffffffcc; backdrop-filter: blur(6px); border-bottom:1px solid #eee; padding:12px 16px; }
.app-main { padding: 12px 12px calc(var(--bottom-nav-total-height)); }
</style>
