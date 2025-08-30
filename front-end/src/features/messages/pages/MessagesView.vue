<template>
  <section class="messages-page">
    <div v-if="mode === 'list'" class="list-screen">
      <ThreadList
        :threads="threads"
        :active-id="activeThreadId"
        @select="openThread"
      />
    </div>
    
    <!-- 詳細画面 -->
    <div v-else class="chat-screen">
      <header class="sticky-header">
        <ChatHeader
          :title="activeThread ? activeThread.name : ''"
          :members="activeThread ? activeThread.members : []"
          :avatar="activeThread ? activeThread.avatar : ''"
          :unread="activeThread ? activeThread.unread : 0"
          :mobile-has-back="true"
          :show-back="true"
          @back="closeThread"
        />
      </header>

      <main class="chat-main">
        <MessageList v-if="activeThread" :messages="activeThread.messages" />
      </main>

      <footer class="chat-footer">
        <ChatInput v-if="activeThread" @send="handleSend" />
      </footer>
    </div>
  </section>
</template>

<script>
import ThreadList from '../components/ThreadsList.vue'
import ChatHeader from '../components/ChatHeader.vue'
import MessageList from '../components/MessageList.vue'
import ChatInput from '../components/ChatInput.vue'

export default {
  name: 'MessagesView',
  components: { ThreadList, ChatHeader, MessageList, ChatInput },
  data() {
    return {
      mode: 'list',
      activeThreadId: null,
      // ダミーデータ（API置き換え想定）
      threads: [
        {
          id: 'g-001',
          name: '関西グルメ会 × フットサル',
          avatar: 'https://via.placeholder.com/56',
          members: ['ゆうた', 'カズ', 'さき'],
          unread: 2,
          lastMessageAt: '2025-08-30T10:22:00+09:00',
          messages: [
            { id: 'm1', sender: 'them', text: '今夜の集合どこにする？', at: '2025-08-30T10:00:00+09:00' },
            { id: 'm2', sender: 'me',   text: '梅田でどう？駅近がいい！', at: '2025-08-30T10:05:00+09:00' },
            { id: 'm3', sender: 'them', text: 'OK！19時で！', at: '2025-08-30T10:22:00+09:00' },
          ],
        },
        {
          id: 'g-002',
          name: '琵琶湖キャンプ同好会',
          avatar: 'https://via.placeholder.com/56',
          members: ['のぶ', 'まり', 'しゅん'],
          unread: 0,
          lastMessageAt: '2025-08-29T21:10:00+09:00',
          messages: [
            { id: 'm1', sender: 'them', text: 'テント足りる？', at: '2025-08-29T20:40:00+09:00' },
            { id: 'm2', sender: 'me',   text: '2張りあるよ！', at: '2025-08-29T20:50:00+09:00' },
            { id: 'm3', sender: 'them', text: '助かる〜', at: '2025-08-29T21:10:00+09:00' },
          ],
        },
      ],
    }
  },
  computed: {
    activeThread() {
      return this.threads.find(t => t.id === this.activeThreadId) || null
    },
  },
  created() {
    // 初期選択
 
  },
  methods: {
    openThread(id) {
      this.activeThreadId = id
      this.mode = 'chat'
    },
    closeThread() {
      this.mode = 'list'
    },
    handleSend(text) {
      if (!text?.trim() || !this.activeThread) return
      const now = new Date().toISOString()
      this.activeThread.messages.push({
        id: `m-${Math.random().toString(36).slice(2)}`,
        sender: 'me',
        text: text.trim(),
        at: now,
      })
      // lastMessageAt更新
      this.activeThread.lastMessageAt = now
    },
  },
}
</script>

<style scoped>
:root { --border: #e5e7eb; --bg: #ffffff; --muted: #f6f7f9; --text: #111827; --subtext: #6b7280; --brand: #7c3aed; }
.messages-page {
  height: 100dvh;
  background: var(--bg);
  color: var(--text);
  display: grid;
}
.list-screen,
.chat-screen {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  overflow: hidden; /* 画面内で完結 */
}
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
}
.chat-main {
  overflow: auto;  /* 本文だけスクロール */
  min-height: 0;
}
.chat-footer {
  border-top: 1px solid var(--border);
  background: #fff;
  position: sticky;
  bottom: 0;
}
</style>
