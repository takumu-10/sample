<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="modelValue" class="overlay" @click.self="close" />
    </transition>

    <transition name="slide-in">
      <aside v-if="modelValue" class="panel" role="dialog" aria-modal="true" aria-label="設定">
        <header class="panel-hd">
          <h2>設定</h2>
          <button class="close" @click="close" aria-label="閉じる">×</button>
        </header>

        <div class="panel-bd">
          <!-- 設定項目の例。必要に応じて差し替え -->
          <section class="item">
            <label class="row">
              <span>通知</span>
              <input type="checkbox" />
            </label>
          </section>
          <section class="item">
            <button class="row link" @click="$router.push({ name:'mypage' })">
              プロフィール編集へ
            </button>
          </section>
          <section class="item">
            <button class="row link" @click="logout">サインアウト</button>
          </section>
        </div>
      </aside>
    </transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

function close () { emit('update:modelValue', false) }

// ダミー：あなたの実装に合わせて差し替え
async function logout(){
  close()
  // 例: location.href = '#/'
}
</script>

<style scoped>
.overlay{
  position: fixed; inset: 0; background: rgba(0,0,0,.24);
  z-index: 48;
}
.panel{
  position: fixed; top: env(safe-area-inset-top); right: 8px;
  width: min(92vw, 360px); max-height: calc(100vh - 16px - env(safe-area-inset-top));
  background: #fff; border: 1px solid #eaeaea; border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,.12); z-index: 50; overflow: hidden;
  display: flex; flex-direction: column;
}
.panel-hd{ display:flex; align-items:center; justify-content:space-between; padding:12px 12px; border-bottom:1px solid #f0f0f0; }
.panel-hd h2{ margin:0; font-size:16px; }
.close{ width:32px; height:32px; border-radius:8px; border:1px solid #eee; background:#fff; cursor:pointer; }
.panel-bd{ padding:8px; overflow:auto; }
.item{ border-bottom:1px solid #f6f6f6; }
.row{ display:flex; align-items:center; justify-content:space-between; gap:12px; width:100%; padding:14px 10px; font-size:15px; }
.link{ background:none; border:none; text-align:left; cursor:pointer; width:100%; }
.fade-enter-active,.fade-leave-active{ transition: opacity .18s ease; }
.fade-enter-from,.fade-leave-to{ opacity: 0; }
.slide-in-enter-active,.slide-in-leave-active{ transition: transform .18s ease, opacity .18s ease; }
.slide-in-enter-from,.slide-in-leave-to{ transform: translateY(-6px); opacity: 0; }
</style>
