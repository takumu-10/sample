<template>
  <section class="profiles">
    <h2 class="sr-only">プロフィール一覧</h2>

    <!-- 将来の検索/フィルタUIを置くスペース -->
    <div class="toolbar">
      <input
        v-model="q"
        type="search"
        class="input"
        placeholder="グループ名・エリアで検索"
        @input="onSearch"
      />
    </div>

    <ul class="list">
      <li v-for="g in filtered" :key="g.id">
        <ProfileCard :group="g" @message="$emit('message', g)" />
      </li>
    </ul>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import ProfileCard from './ProfileCard.vue'

export default {
  name: 'ProfileTab',
  components: { ProfileCard },
  props: {
    groups: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const q = ref('')

    const filtered = computed(() => {
      if (!q.value) return props.groups
      const t = q.value.toLowerCase()
      return props.groups.filter(
        (g) =>
          (g.name || '').toLowerCase().includes(t) ||
          (g.area || '').toLowerCase().includes(t)
      )
    })

    const onSearch = () => {} // 必要になったらデバウンスなど追加

    return { q, filtered, onSearch }
  },
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
}
.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
}
.list {
  display: grid;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}
.sr-only {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0; padding: 0; margin: -1px;
}
</style>
