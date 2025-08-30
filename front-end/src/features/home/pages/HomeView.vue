<template>
  <section class="home">
    <!-- 左上タイトル -->
    <h2 class="title">あなたへのおすすめ</h2>

    <!-- 画像カード（タップで左右切替／メンバー交互トグル） -->
    <div class="card">     <!-- @touchstart.prevent @mousedown.prevent> -->
      <!-- 画像 -->
      <img class="card-img" :src="currentImageSrc" :alt="groupTitle" />

      <!-- ストーリーバー風インジケータ -->
      <div class="indicators">
        <span
          v-for="(img, i) in images"
          :key="i"
          class="bar"
          :class="{ active: i === imageIndex }"
        />
      </div>

      <!-- 左右タップゾーン -->
      <button class="tap-zone left" @click="prevImage" aria-label="previous"></button>
      <button class="tap-zone right" @click="nextImage" aria-label="next"></button>

      <!-- 名前＆年齢（左下）-->
      <div class="name-badge">
        <span
          v-for="(m, i) in members"
          :key="m.name"
          :class="['name-chip', { active: i === activeMemberIndex }]">

          {{ m.name }} {{ m.age }}
          <span v-if="i < members.length - 1"> &nbsp;&amp;&nbsp;</span>
        </span>
      </div>
    </div>

    <!-- 個別プロフィールボタン -->
    <div class="profile-buttons">
      <button
        v-for="m in members"
        :key="m.name"
        class="profile-btn"
        @click="openProfile(m)"
      >
        {{ m.name }}のプロフィール
      </button>
    </div>

    <!-- プロフィール ポップアップ -->
    <div v-if="profileModal.open" class="modal-backdrop" @click.self="closeProfile">
      <div class="modal">
        <button class="modal-close" @click="closeProfile" aria-label="close">×</button>
        <img
          class="modal-img"
          :src="profileModal.image"
          :alt="profileModal.member ? profileModal.member.name : ''"
        />

        <!-- モーダルの表示名 -->
        <h3 class="modal-name">
          {{ profileModal.member ? profileModal.member.name : '' }}
        </h3>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * ★ ダミーデータ例
 *   実装時はAPIレスポンスに合わせて整形してください。
 *   画像は /src/assets/person1.png などに配置想定。
 */
const members = ref([
  { name: 'A子', age: 21, image: new URL('../../../assets/picture_test/person1.png', import.meta.url).href },
  { name: 'B子', age: 20, image: new URL('../../../assets/picture_test/person2.png', import.meta.url).href },
])

// グループの画像（複数）— 左右タップで切替
const images = ref([
  new URL('../../../assets/picture_test/person1.png', import.meta.url).href,
  new URL('../../../assets/picture_test/person2.png', import.meta.url).href,
  new URL('../../../assets/picture_test/person3.png', import.meta.url).href,
  new URL('../../../assets/picture_test/person4.png', import.meta.url).href,
])

// 現在表示中の画像インデックス
const imageIndex = ref(0)

// タップ毎にアクティブメンバーを交互に変更（要件「交互にタップされると出力」）
const activeMemberIndex = ref(0)

const groupTitle = computed(() =>
  members.value.map(m => `${m.name} ${m.age}`).join(' & ')
)

const currentImageSrc = computed(() => images.value[imageIndex.value])

function nextImage () {
  imageIndex.value = (imageIndex.value + 1) % images.value.length
  activeMemberIndex.value = (activeMemberIndex.value + 1) % members.value.length
}

function prevImage () {
  imageIndex.value = (imageIndex.value - 1 + images.value.length) % images.value.length
  activeMemberIndex.value = (activeMemberIndex.value + 1) % members.value.length
}

// プロフィール モーダル
const profileModal = ref({
  open: false,
  member: null,
  image: ''
})

function openProfile (member) {
  profileModal.value.open = true
  profileModal.value.member = member
  // メンバー個別画像があればそれを、なければ現在の画像を表示
  profileModal.value.image = member.image || currentImageSrc.value
}

function closeProfile () {
  profileModal.value.open = false
  profileModal.value.member = null
  profileModal.value.image = ''
}
</script>

<style scoped>
.home {
  padding: 12px 12px 24px;
  max-width: 520px;
  margin: 0 auto;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 6px 0 12px 4px;
}

/* 画像カード */
.card {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4; /* スマホ向け比率 */
  border-radius: 16px;
  overflow: hidden;
  background: #f3f3f3;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  user-select: none;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ストーリーバー風インジケータ */
.indicators {
  position: absolute;
  top: 8px;
  left: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
}

.bar {
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: rgba(255,255,255,0.35);
}
.bar.active {
  background: #ef4444;       /* ← ここを赤に */
  height: 5px;               /* 任意：太くして強調 */
  box-shadow: 0 0 0.5px #ef4444;
}

/* 左右タップゾーン（透明ボタン） */
.tap-zone {
  position: absolute;
  top: 0; bottom: 0;
  width: 50%;
  background: transparent;
  z-index: 2;
  pointer-events: auto;
  
  /* ボタンの規定スタイルリセット */
  border: 0;
  outline: none;
  appearance: none;
}
/* 画像を左右クリックで切り替えできるようにした時にボタンが重なり境界線に黒い線がでるため，少し被せる */
.tap-zone.left { left: 0; right: 50%;}
.tap-zone.right { left: calc(50% - 1px); right: 0; }

/* 名前バッジ（左下） */
.name-badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(0,0,0,0.35);
  color: #fff;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.name-chip {
  opacity: 0.9;
}
.name-chip.active {
  text-decoration: underline;
  opacity: 1;
}

/* プロフィールボタン */
.profile-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 14px;
}

.profile-btn {
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

/* モーダル */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17,24,39,0.45);
  display: grid;
  place-items: center;
  z-index: 50;
}

.modal {
  position: relative;
  width: min(92vw, 460px);
  border-radius: 16px;
  background: #fff;
  padding: 18px 16px 20px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.2);
}

.modal-close {
  position: absolute;
  right: 8px;
  top: 6px;
  font-size: 24px;
  line-height: 1;
  background: transparent;
}

.modal-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  background: #f3f4f6;
}

.modal-name {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}
</style>
