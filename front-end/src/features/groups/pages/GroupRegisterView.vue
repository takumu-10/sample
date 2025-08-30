<template>
  <section class="group-register">
    <!-- Tabs -->
    <div class="tabs">
      <button
        class="tab"
        :class="{ active: activeTab === 'group' }"
        @click="activeTab = 'group'"
      >
        グループ登録
      </button>
      <button
        class="tab"
        :class="{ active: activeTab === 'friends' }"
        @click="activeTab = 'friends'"
      >
        友達を登録
      </button>
    </div>

    <!-- Subtitle -->
    <p class="subtitle" v-if="activeTab === 'group'">
      グループ登録する友達を招待してください
    </p>
    <p class="subtitle" v-else>
      登録済みの友達を管理できます。検索や招待が可能です。
    </p>

    <!-- ===== Tabs Content ===== -->
    <GroupTab
      v-if="activeTab === 'group'"
      :member-slots="memberSlots"
      :is-registered="isRegistered"
      :group-invitations="groupInvitations"
      @invite-click="inviteOpen = true"
      @unregister-click="confirmOpen = true"
      @accept-group-invite="acceptGroupInvite"
      @decline-group-invite="declineGroupInvite"
    />

    <FriendsTab
      v-else
      :friends="filteredFriends"
      :friend-query="friendQuery"
      :friend-invitations="friendInvitations"
      @update:friend-query="friendQuery = $event"
      @add-friend="addFriend"
      @accept-friend-invite="acceptFriendInvite"
      @decline-friend-invite="declineFriendInvite"
      @open-invite="inviteOpen = true"
    />

    <!-- ===== Shared Modals ===== -->
    <!-- 招待モーダル（簡易） -->
    <div v-if="inviteOpen" class="backdrop" @click.self="inviteOpen = false">
      <div class="sheet">
        <h3>招待を送る</h3>
        <p class="desc">ユーザーID または メールアドレスを入力してください。</p>
        <form @submit.prevent="onSendInvite">
          <input
            type="text"
            v-model.trim="inviteIdentifier"
            placeholder="例: takumi_123 / sample@example.com"
            required
            class="input"
          />
          <div class="sheet-actions">
            <button type="button" class="btn ghost" @click="inviteOpen = false">キャンセル</button>
            <button type="submit" class="btn primary">招待を送信</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 解除確認モーダル（中央） -->
    <div v-if="confirmOpen" class="backdrop" @click.self="confirmOpen = false">
      <div class="modal">
        <h3 class="modal-title">グループ登録を解除しますか？</h3>
        <p class="message">解除すると、現在のグループメンバーとの紐付けがなくなります。</p>
        <div class="actions row end">
          <button class="btn ghost" @click="confirmOpen = false">キャンセル</button>
          <button class="btn danger" @click="unregister">解除する</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import GroupTab from '../components/GroupTab.vue'
import FriendsTab from '../components/FriendsTab.vue'

/** タブ状態 */
const activeTab = ref('group') // 'group' | 'friends'

/** 現在ユーザー（ダミー） */
const currentUser = ref({ id: 'me_001', name: 'あなた', imageUrl: null })

/** メンバー4枠（0番は自分） */
const members = ref([
  { id: currentUser.value.id, name: currentUser.value.name, imageUrl: null },
  { id: 'u_002', name: 'たくみ', imageUrl: null },
  null,
  null,
])

/** 表示用4枠 */
const memberSlots = computed(() => members.value.slice(0, 4))

/** 登録判定：自分以外に1人でもいれば登録扱い */
const isRegistered = computed(() => members.value.slice(1).some(Boolean))

/** グループ招待（ダミー） */
const groupInvitations = ref([
  // { id: 'ginv_001', fromName: 'ゆうた', fromAvatarUrl: null },
])

/** 友達リスト（ダミー） */
const friends = ref([
  { id: 'f_001', name: 'ゆうた', avatarUrl: null },
  { id: 'f_002', name: 'みき', avatarUrl: null },
  { id: 'f_003', name: 'さとし', avatarUrl: null },
])
const friendQuery = ref('')
const filteredFriends = computed(() => {
  const q = friendQuery.value.toLowerCase()
  if (!q) return friends.value
  return friends.value.filter(f => f.name.toLowerCase().includes(q))
})

/** 友達からの招待（ダミー） */
const friendInvitations = ref([
  // { id: 'finv_001', fromName: 'けんた', fromAvatarUrl: null },
])

/** モーダル状態 */
const inviteOpen = ref(false)
const confirmOpen = ref(false)
const inviteIdentifier = ref('')

/** 招待送信（ダミー） */
function onSendInvite() {
  if (!inviteIdentifier.value) return
  const id = inviteIdentifier.value
  inviteIdentifier.value = ''
  inviteOpen.value = false
  alert(`「${id}」に招待を送信しました。`)
}

/** グループ招待：承諾／拒否（ダミー） */
function acceptGroupInvite(inviteId) {
  const inv = groupInvitations.value.find(i => i.id === inviteId)
  if (!inv) return
  const idx = members.value.findIndex((m, i) => i > 0 && !m)
  if (idx !== -1) {
    members.value[idx] = {
      id: `joined_${inviteId}`,
      name: inv.fromName,
      imageUrl: inv.fromAvatarUrl || null,
    }
  }
  groupInvitations.value = groupInvitations.value.filter(i => i.id !== inviteId)
  alert(`${inv.fromName} の招待を承諾しました。`)
}
function declineGroupInvite(inviteId) {
  const inv = groupInvitations.value.find(i => i.id === inviteId)
  groupInvitations.value = groupInvitations.value.filter(i => i.id !== inviteId)
  alert(`${inv?.fromName ?? '招待'} を拒否しました。`)
}

/** 友達：追加（ダミー） */
function addFriend(friendId) {
  const f = friends.value.find(x => x.id === friendId)
  if (f) alert(`${f.name} をグループに追加（ダミー）`)
}

/** 友達招待：承諾／拒否（ダミー＝承諾時は友達一覧に追加） */
function acceptFriendInvite(inviteId) {
  const inv = friendInvitations.value.find(i => i.id === inviteId)
  if (!inv) return
  if (!friends.value.some(f => f.name === inv.fromName)) {
    friends.value.push({ id: `friend_${inviteId}`, name: inv.fromName, avatarUrl: inv.fromAvatarUrl || null })
  }
  friendInvitations.value = friendInvitations.value.filter(i => i.id !== inviteId)
  alert(`${inv.fromName} の招待を承諾しました。`)
}
function declineFriendInvite(inviteId) {
  const inv = friendInvitations.value.find(i => i.id === inviteId)
  friendInvitations.value = friendInvitations.value.filter(i => i.id !== inviteId)
  alert(`${inv?.fromName ?? '招待'} を拒否しました。`)
}

/** 解除（ダミー） */
function unregister() {
  members.value = [members.value[0], null, null, null]
  confirmOpen.value = false
  alert('グループ登録を解除しました。')
}
</script>

<style scoped>
.group-register {
  padding: 16px 14px 32px;
  max-width: 720px;
  margin: 0 auto;
  background: #fff;
}

/* Tabs */
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}
.tab {
  -webkit-tap-highlight-color: transparent;
  padding: 12px 8px;
  font-weight: 700;
  font-size: 14px;
  background: #f9fafb;
  border: none;
}
.tab + .tab { border-left: 1.5px solid #e5e7eb; }
.tab.active {
  background: #ede9fe;          /* violet-100 */
  color: #6d28d9;               /* violet-700 */
  box-shadow: inset 0 0 0 2px #7c3aed; /* violet-600 */
}

.subtitle { margin-top: 8px; font-size: 12px; color: #6b7280; }

/* Shared buttons & inputs */
.btn {
  -webkit-tap-highlight-color: transparent;
  border: none; border-radius: 12px; padding: 12px 16px;
  font-weight: 700; font-size: 14px; letter-spacing: .02em;
  box-shadow: 0 1px 2px rgba(0,0,0,.04);
  transition: transform .03s ease;
}
.btn:active { transform: scale(0.98); }
.primary { background: #2563eb; color: #fff; }
.secondary { background: #e5e7eb; color: #111827; }
.danger { background: #ef4444; color: #fff; }
.outline { background: transparent; color: #ef4444; border: 1.5px solid #ef4444; }
.slim { padding: 8px 12px; }
.input {
  width: 100%;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
}
.input:focus { border-color: #7c3aed; box-shadow: 0 0 0 3px rgba(124,58,237,.12); }

/* Modals */
.backdrop {
  position: fixed; inset: 0; background: rgba(0,0,0,.38);
  display: grid; place-items: end center; z-index: 50;
}
.sheet {
  width: 100%; max-width: 720px; background: #fff;
  border-top-left-radius: 16px; border-top-right-radius: 16px;
  padding: 16px; box-shadow: 0 -8px 24px rgba(0,0,0,.12);
}
h3 { font-size: 18px; font-weight: 800; }
.desc { margin-top: 4px; font-size: 12px; color: #6b7280; }
form { margin-top: 12px; }
.sheet-actions { margin-top: 12px; display: flex; gap: 10px; justify-content: flex-end; }

.modal {
  width: min(92vw, 460px);
  background: #fff; border-radius: 14px; padding: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,.18);
  position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);
}
.modal-title { font-size: 16px; font-weight: 800; }
.message { margin-top: 8px; font-size: 13px; color: #4b5563; }

@media (max-width: 420px) {
  .btn { padding: 11px 14px; font-size: 13px; }
}
</style>
