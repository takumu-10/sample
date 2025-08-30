<template>
  <header class="app-header">
    <router-link class="logo" :to="{ name: 'home' }" aria-label="ホームへ">
      <!-- 簡易ロゴ（置き換え可） -->
      <svg viewBox="0 0 24 24" class="logo-mark" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M7 12h10" stroke="white" stroke-width="2" stroke-linecap="round" />
      </svg>
      <span class="logo-text">App</span>
    </router-link>

    <h1 class="title" :title="title">{{ title }}</h1>

    <button class="icon-btn" type="button" @click="$emit('open-settings')" aria-label="設定を開く">
      <!-- 歯車アイコン -->
      <svg viewBox="0 0 24 24" class="icon" aria-hidden="true">
        <path d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm8.14 3.5c0-.37-.03-.74-.08-1.1l2.03-1.59a.7.7 0 0 0 .17-.9l-1.92-3.33a.7.7 0 0 0-.85-.32l-2.38.96a7.9 7.9 0 0 0-1.9-1.1l-.36-2.53A.7.7 0 0 0 14.95 1h-3.9a.7.7 0 0 0-.69.59l-.36 2.53c-.67.25-1.3.6-1.9 1.1l-2.38-.96a.7.7 0 0 0-.85.32L2.95 7.91a.7.7 0 0 0 .17.9l2.03 1.59c-.05.36-.08.73-.08 1.1s.03.74.08 1.1L3.12 14.8a.7.7 0 0 0-.17.9l1.92 3.33c.18.31.56.44.85.32l2.38-.96c.6.5 1.23.85 1.9 1.1l.36 2.53c.06.33.35.59.69.59h3.9c.34 0 .63-.26.69-.59l.36-2.53c.67-.25 1.3-.6 1.9-1.1l2.38.96c.3.12.67-.01.85-.32l1.92-3.33a.7.7 0 0 0-.17-.9l-2.03-1.59c.05-.36.08-.73.08-1.1Z"/>
      </svg>
    </button>
  </header>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true }
})

const emit = defineEmits(['open-settings'])
</script>

<style scoped>
.app-header{
  position: sticky; top: 0; z-index: 30;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  gap: 8px; padding: max(8px, env(safe-area-inset-top)) 12px 8px;
  background: #ffffffcc; backdrop-filter: blur(8px);
  border-bottom: 1px solid #eee;
}
.logo{ display: inline-flex; align-items: center; gap: 8px; text-decoration: none; color: inherit; min-width: 0; }
.logo-mark{ width: 28px; height: 28px; fill: #111; }
.logo-text{ font-weight: 700; font-size: clamp(14px, 2.5vw, 16px); letter-spacing: .2px; }
.title{
  grid-column: 2; text-align: center; margin: 0;
  font-size: clamp(16px, 4vw, 18px); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.icon-btn{
  justify-self: end; display: inline-grid; place-items: center;
  width: 36px; height: 36px; border-radius: 999px; border: 1px solid #eaeaea;
  background: #fff; cursor: pointer; touch-action: manipulation;
}
.icon{ width: 22px; height: 22px; fill: #111; }
@media (min-width: 768px){
  .app-header{ padding-left: 16px; padding-right: 16px; }
}
</style>
