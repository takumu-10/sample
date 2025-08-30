<template>
  <article class="card">
    <div class="row">
      <h3 class="name">{{ group.name }}</h3>
      <span class="pill">{{ group.members }}人</span>
    </div>
    <p class="area">🗺️ {{ group.area }}</p>
    <p class="note" v-if="group.note">{{ group.note }}</p>

    <div class="actions">
      <button class="btn primary" @click="$emit('message')">メッセージ</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    group: { type: Object, required: true },
  },
}
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.03);
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.name {
  font-size: 16px;
  font-weight: 700;
}
.pill {
  padding: 4px 8px;
  border-radius: 999px;
  background: #f3f4f6;
  font-size: 12px;
  font-weight: 600;
}
.area {
  margin: 6px 0 2px;
  color: #6b7280;
  font-size: 13px;
}
.note {
  margin: 0 0 10px;
  color: #374151;
  font-size: 14px;
}
.actions {
  display: flex;
  gap: 8px;
}
.btn {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 700;
  width: 100%;
}
.btn.primary {
  background: #7c3aed; /* 紫 */
  border-color: #7c3aed;
  color: #fff;
}
</style>
