<template>
  <section class="search">
    <!-- タブ -->
    <nav class="tabs" role="tablist" aria-label="探すタブ">
      <button
        class="tab"
        :class="{ active: currentTab === 'map' }"
        role="tab"
        aria-selected="currentTab === 'map'"
        @click="currentTab = 'map'"
      >
        地図
      </button>
      <button
        class="tab"
        :class="{ active: currentTab === 'profile' }"
        role="tab"
        aria-selected="currentTab === 'profile'"
        @click="currentTab = 'profile'"
      >
        プロフィール
      </button>
    </nav>

    <!-- タブ内容 -->
    <div class="panel" v-show="currentTab === 'map'" role="tabpanel">
      <MapTab />
    </div>

    <div class="panel" v-show="currentTab === 'profile'" role="tabpanel">
      <ProfileTab
        :groups="groups"
        @message="goToMessage"
      />
    </div>
  </section>
</template>

<script>
import MapTab from '../components/MapTab.vue'
import ProfileTab from '../components/ProfileTab.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchView',
  components: { MapTab, ProfileTab },
  setup() {
    const router = useRouter()

    // ★ サンプルデータ（後でAPI連携に差し替え可）
    const groups = [
      { id: 'g1', name: '東京大学サッカー部', members: 4, area: '千代田区', note: '今日は丸の内で飲み！' },
      { id: 'g2', name: 'カフェ巡り女子', members: 3, area: '渋谷区', note: '渋谷周辺でまったり' },
      { id: 'g3', name: '関西旅行メンズ', members: 5, area: '新宿区', note: '明日から関西行きます' },
    ]

    const goToMessage = (group) => {
      // ルーティングがある場合はこちら（例: /messages/g1）
      // router.push({ name: 'messages', params: { groupId: group.id } })
      // まだ未定なら暫定アラート
      alert(`「${group.name}」にメッセージします（ルート接続はあとで）`)
    }

    return {
      currentTab: 'map',
      groups,
      goToMessage,
    }
  },
}
</script>

<style scoped>
.search {
  padding: 12px;
}

/* タブ */
.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.tab {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 600;
}
.tab.active {
  background: #7c3aed; /* 紫 */
  color: #fff;
  border-color: #7c3aed;
}

/* パネル */
.panel {
  background: #fff;
}
</style>
