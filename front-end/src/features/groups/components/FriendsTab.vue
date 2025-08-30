<template>
  <div>
    <!-- 友達一覧 + 検索 -->
    <div class="friends-block">
      <div class="search-row">
        <input
          type="search"
          :value="friendQuery"
          @input="$emit('update:friend-query', $event.target.value)"
          placeholder="友達を検索"
          class="input"
        />
        <button class="btn secondary" @click="$emit('update:friend-query', '')">クリア</button>
      </div>

      <ul class="friends-list" v-if="friends.length">
        <li v-for="f in friends" :key="f.id" class="friend-item">
          <div class="friend-left">
            <div class="avatar-mini">
              <template v-if="f.avatarUrl">
                <img :src="f.avatarUrl" :alt="f.name" />
              </template>
              <template v-else>
                <svg viewBox="0 0 24 24" class="icon">
                  <circle cx="12" cy="8" r="4"></circle>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </template>
            </div>
            <div class="friend-name">{{ f.name }}</div>
          </div>
          <div class="friend-right">
            <button class="btn slim" @click="$emit('add-friend', f.id)">
              追加
            </button>
          </div>
        </li>
      </ul>
      <div class="empty" v-else>該当する友達がいません</div>
    </div>

    <!-- 友達からの招待 -->
    <div class="invitations">
      <h2 class="subheading">友達からの招待</h2>
      <div v-if="friendInvitations.length === 0" class="empty">
        招待はありません
      </div>
      <ul v-else class="list">
        <li v-for="inv in friendInvitations" :key="inv.id" class="item">
          <div class="left">
            <div class="avatar-mini">
              <template v-if="inv.fromAvatarUrl">
                <img :src="inv.fromAvatarUrl" :alt="inv.fromName" />
              </template>
              <template v-else>
                <svg viewBox="0 0 24 24" class="icon">
                  <circle cx="12" cy="8" r="4"></circle>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </template>
            </div>
            <div class="text">
              <div class="msg"><strong>{{ inv.fromName }}</strong> さんからの招待が届きました！</div>
            </div>
          </div>
          <div class="right">
            <button class="btn accept" @click="$emit('accept-friend-invite', inv.id)">承諾</button>
            <button class="btn decline" @click="$emit('decline-friend-invite', inv.id)">拒否</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- 友人招待ボタン（縦並び・中央寄せ） -->
    <div class="actions column center">
      <button class="btn primary wide" @click="$emit('open-invite')">友人招待</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  friends: { type: Array, default: () => [] },
  friendQuery: { type: String, default: '' },
  friendInvitations: { type: Array, default: () => [] },
})
defineEmits([
  'update:friend-query',
  'add-friend',
  'accept-friend-invite',
  'decline-friend-invite',
  'open-invite',
])
</script>

<style scoped>
.friends-block {
  margin-top: 16px;
  border: 1.5px solid #e5e7eb; border-radius: 12px; padding: 12px;
}
.search-row { display: flex; gap: 8px; }
.input {
  flex: 1;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}
.input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.12); }

.friends-list { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.friend-item {
  display: flex; align-items: center; justify-content: space-between;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px;
}
.friend-left { display: flex; align-items: center; gap: 10px; }
.friend-name { font-size: 14px; }

/* 招待／リスト共通 */
.invitations { margin-top: 24px; }
.subheading { font-size: 16px; font-weight: 800; }
.empty { margin-top: 8px; font-size: 13px; color: #6b7280; }
.list { margin-top: 8px; display: flex; flex-direction: column; gap: 10px; }
.item {
  display: flex; align-items: center; justify-content: space-between;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 10px;
}
.left { display: flex; align-items: center; gap: 10px; }
.avatar-mini {
  width: 40px; height: 40px; border-radius: 50%; background: #f3f4f6;
  display: grid; place-items: center; overflow: hidden;
}
.avatar-mini img { width: 100%; height: 100%; object-fit: cover; }
.icon { width: 22px; height: 22px; fill: none; stroke: #9ca3af; stroke-width: 1.8; }
.msg { font-size: 13px; color: #374151; }
.right { display: flex; gap: 8px; }

.actions { margin-top: 16px; display: flex; gap: 12px; }
.actions.column { flex-direction: column; gap: 10px; }
.actions.center { align-items: center; justify-content: center; }
.wide { width: min(420px, 92%); }

.btn { border: none; border-radius: 12px; padding: 12px 16px; font-weight: 700; font-size: 14px; }
.primary { background: #2563eb; color: #fff; }
.secondary { background: #e5e7eb; color: #111827; }
.slim { padding: 8px 12px; }
.accept { background: #10b981; color: #fff; }
.decline { background: #f3f4f6; color: #111827; }
</style>
