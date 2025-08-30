<template>
  <header class="chat-header">
    <div class="left">
      <button v-if="showBack" class="back-btn" @click="$emit('back')" aria-label="戻る">戻る</button>
      <img v-if="avatar" :src="avatar" alt="" class="avatar" />
      <div class="title">
        <h1>{{ title || 'スレッド未選択' }}</h1>
        <p v-if="members && members.length" class="members">{{ members.join('・') }}</p>
      </div>
    </div>
    <!-- 右側は空（将来：通報・ミュート等のアクション置き場） -->
    <div />
  </header>
</template>

<script>
export default {
  name: 'ChatHeader',
  props: {
    title: { type: String, default: '' },
    members: { type: Array, default: () => [] },
    avatar: { type: String, default: '' },
    unread: { type: Number, default: 0 },
    mobileHasBack:{ type: Boolean, default: false },
    showBack: { type: Boolean, default: false },

  },
}
</script>

<style scoped>
.chat-header {
  display: grid;
  grid-template-columns: 1fr 24px;  /* 右は空だみー */
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}
.left { display: grid; grid-template-columns: auto auto 1fr; gap: 10px; align-items: center; }
.avatar { width: 36px; height: 36px; border-radius: 50%; }
.title h1 { font-size: 15px; margin: 0; font-weight: 700; }
.members { margin: 2px 0 0; font-size: 12px; color: #6b7280; }
.back-btn {
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
}
</style>
