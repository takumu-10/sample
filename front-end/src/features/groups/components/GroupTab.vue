<template>
  <div>
    <!-- メンバー表示 -->
    <div class="members-block">
      <div class="members-inner">
        <div
          v-for="(slot, idx) in memberSlots"
          :key="idx"
          class="avatar"
          :class="{ self: idx === 0, empty: !slot && idx !== 0 }"
        >
          <div class="circle">
            <template v-if="slot && slot.imageUrl">
              <img :src="slot.imageUrl" :alt="slot.name" />
            </template>
            <template v-else-if="slot">
              <span class="initials">{{ slot.name?.[0] ?? '' }}</span>
            </template>
            <template v-else>
              <svg viewBox="0 0 24 24" class="icon">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </template>
          </div>
          <small class="label">{{ idx === 0 ? '自分' : (slot?.name || '未登録') }}</small>
        </div>
      </div>
      <small class="hint">最大4人 / 左端は自分です</small>
    </div>

    <!-- アクション（縦並び・中央寄せ） -->
    <div class="actions column center">
      <button class="btn primary wide" @click="$emit('invite-click')">友達を招待</button>
      <button
        v-if="isRegistered"
        class="btn danger outline wide"
        @click="$emit('unregister-click')"
      >
        グループ登録を解除
      </button>
    </div>

    <!-- 招待一覧（グループ） -->
    <div class="invitations">
      <h2 class="subheading">招待一覧</h2>
      <div v-if="groupInvitations.length === 0" class="empty">
        グループ登録の招待がありません
      </div>

      <ul v-else class="list">
        <li v-for="inv in groupInvitations" :key="inv.id" class="item">
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
            <button class="btn accept" @click="$emit('accept-group-invite', inv.id)">参加する</button>
            <button class="btn decline" @click="$emit('decline-group-invite', inv.id)">拒否する</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  memberSlots: { type: Array, required: true },
  isRegistered: { type: Boolean, default: false },
  groupInvitations: { type: Array, default: () => [] },
})
defineEmits([
  'invite-click',
  'unregister-click',
  'accept-group-invite',
  'decline-group-invite',
])
</script>

<style scoped>
.members-block {
  margin-top: 16px;
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}
.members-inner { display: flex; gap: 12px; justify-content: space-between; }
.hint { display: block; margin-top: 8px; font-size: 11px; color: #9ca3af; }

.avatar { width: 25%; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.circle {
  width: 62px; height: 62px; border-radius: 50%;
  background: #f3f4f6; display: grid; place-items: center; overflow: hidden;
  border: 2px solid transparent;
}
.self .circle { border-color: #2563eb; }
img { width: 100%; height: 100%; object-fit: cover; }
.initials { font-weight: 800; font-size: 18px; color: #374151; }
.icon { width: 28px; height: 28px; fill: none; stroke: #9ca3af; stroke-width: 1.8; }
.label { font-size: 11px; color: #6b7280; }
.empty .label { color: #9ca3af; }

.actions { margin-top: 16px; display: flex; gap: 12px; }
.actions.column { flex-direction: column; gap: 10px; }
.actions.center { align-items: center; justify-content: center; }
.wide { width: min(420px, 92%); }

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
.msg { font-size: 13px; color: #374151; }
.right { display: flex; gap: 8px; }
.btn { border: none; border-radius: 12px; padding: 12px 16px; font-weight: 700; font-size: 14px; }
.accept { background: #10b981; color: #fff; }
.decline { background: #f3f4f6; color: #111827; }
</style>
