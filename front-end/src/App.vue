<template>
  <div class="app">
    <!-- HEADER -->
    <AppHeader :title="currentTitle" @open-settings="settingsOpen = true" />

    <main class="app-main">
      <router-view />
    </main>

    <!-- FOOTER -->
    <BottomNav />

    <!-- 設定パネル -->
    <SettingsPanel v-model="settingsOpen" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SettingsPanel from './components/SettingsPanel.vue'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
const titles = {
  home: 'ホーム',
  groupRegister: 'グループ登録',
  search: '探',
  messages: 'メッセージ',
  mypage: 'マイページ',
}
const currentTitle = computed(() => titles[route.name] ?? 'ホーム')

const settingsOpen = ref(false)
watch(() => route.fullPath, () => { settingsOpen.value = false })
</script>

<style scoped>
.app { min-height: 100svh; display: grid; grid-template-rows: auto 1fr; background: #fff; }
.app-header { position: sticky; top: 0; background:#ffffffcc; backdrop-filter: blur(6px); border-bottom:1px solid #eee; padding:12px 16px; }
.app-main{
  padding: 12px 12px calc(var(--bottom-nav-total-height, 76px) + env(safe-area-inset-bottom));
}
</style>
