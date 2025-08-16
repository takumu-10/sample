<template>
  <nav class="bottom-nav" role="navigation" aria-label="Tab bar">
    <router-link
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="nav-item"
    >
      <span class="icon" aria-hidden="true" v-html="item.svg"></span>
      <span class="label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
const items = [
  { to: '/',            label: 'ホーム',
    svg: `<svg viewBox="0 0 24 24"><path d="M12 3 3 10h3v10h12V10h3z" /></svg>` },
  { to: '/groups/new',  label: 'グループ登録',
    svg: `<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-9 9a9 9 0 0 1 18 0z"/><path d="M19 8h3v2h-3v3h-2v-3h-3V8h3V5h2z"/></svg>` },
  { to: '/search',      label: '探す',
    svg: `<svg viewBox="0 0 24 24"><path d="M21 21l-4.35-4.35"/><circle cx="10.5" cy="10.5" r="6.5"/></svg>` },
  { to: '/messages',    label: 'メッセージ',
    svg: `<svg viewBox="0 0 24 24"><path d="M21 7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9l4-3h12a2 2 0 0 0 2-2z"/></svg>` },
  { to: '/mypage',      label: 'マイページ',
    svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>` },
]
</script>

<style scoped>
.bottom-nav {
  position: fixed; left: 0; right: 0; bottom: 0;
  padding: 8px max(8px, env(safe-area-inset-left)) max(8px, env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-right));
  height: var(--bottom-nav-height);
  background: #fff; border-top: 1px solid #eee;
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;
  z-index: 50;
}

/* 通常タブ（非アクティブ） */
.nav-item {
  --tab-radius: 14px;
  text-decoration: none;
  display: grid; place-items: center; gap: 4px;
  padding: 6px 0 4px;
  border-radius: var(--tab-radius);
  border: 1px solid var(--brand-purple);
  background: var(--tab-bg-inactive);
  color: var(--tab-fg-inactive);
  transition: background .15s ease, color .15s ease, transform .06s ease;
}
.nav-item:active { transform: translateY(1px); }
.nav-item .icon { width: 24px; height: 24px; display: grid; place-items: center; }
.nav-item .icon svg { width: 22px; height: 22px; stroke: currentColor; fill: none; stroke-width: 2; }
.nav-item .label { font-size: 11px; line-height: 1; }

/* アクティブ：Vue Router が自動で付けるクラスを利用 */
.nav-item.router-link-exact-active {
  background: var(--tab-bg-active);
  color: var(--tab-fg-active);
  border-color: var(--tab-bg-active);
}
</style>
