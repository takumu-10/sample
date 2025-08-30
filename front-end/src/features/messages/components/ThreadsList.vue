<template>
  <div class="thread-list">
    <header class="list-header">
      <h2>メッセージ</h2>
    </header>

    <div class="search">
      <input v-model="q" type="search" placeholder="グループ名で検索" />
    </div>

    <ul>
      <li
        v-for="t in filtered"
        :key="t.id"
        :class="['item', { active: t.id === activeId }]"
        @click="$emit('select', t.id)"
      >
        <img :src="t.avatar" alt="" class="avatar" />
        <div class="meta">
          <div class="row">
            <span class="name">{{ t.name }}</span>
            <time class="time">{{ fmt(t.lastMessageAt) }}</time>
          </div>
          <div class="row">
            <span class="preview">{{ lastPreview(t) }}</span>
            <span v-if="t.unread" class="badge">{{ t.unread }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ThreadList',
  props: {
    threads: { type: Array, default: () => [] },
    activeId: { type: String, default: null },
  },
  data() {
    return { q: '' }
  },
  computed: {
    filtered() {
      const q = this.q.trim().toLowerCase()
      if (!q) return this.threads
      return this.threads.filter(t => t.name.toLowerCase().includes(q))
    },
  },
  methods: {
    lastPreview(t) {
      const m = t.messages?.[t.messages.length - 1]
      return m ? (m.sender === 'me' ? `あなた: ${m.text}` : m.text) : ''
    },
    fmt(iso) {
      if (!iso) return ''
      const d = new Date(iso)
      const now = new Date()
      const isToday = d.toDateString() === now.toDateString()
      return isToday
        ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : `${d.getMonth() + 1}/${d.getDate()}`
    },
  },
}
</script>

<style scoped>
.thread-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.search {
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
}
.search input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
}
ul { list-style: none; margin: 0; padding: 0; overflow: auto; }
.item {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
}
.item:hover { background: #fafafa; }
.item.active { background: #f3e8ff44; }
.avatar {
  width: 56px; height: 56px; border-radius: 50%;
}
.meta { display: grid; gap: 6px; }
.row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.name { font-weight: 600; font-size: 14px; }
.preview { color: #6b7280; font-size: 12px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.time { color: #9ca3af; font-size: 12px; }
.badge {
  background: var(--brand, #7c3aed);
  color: #fff; font-size: 11px;
  min-width: 18px; padding: 2px 6px; border-radius: 999px; text-align: center;
}
</style>
