<!-- front-end/src/views/LoginView.vue -->
<template>
  <div class="page">
    <div class="panel">
      <div class="brand">❤ Matchy</div>
      <h1 class="title">ログイン</h1>

      <label class="label">ログインID</label>
      <input v-model.trim="username" class="input" type="text" placeholder="メール or ユーザー名" />

      <label class="label">パスワード</label>
      <input v-model="password" class="input" type="password" placeholder="********" />

      <button class="cta" :disabled="loading" @click="onSignIn">
        {{ loading ? 'サインイン中...' : 'ログイン' }}
      </button>

      <button class="link" @click="$router.push({ name: 'signup' })">新規登録</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signIn } from 'aws-amplify/auth'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const username = ref('')   // メール or ユーザー名
const password = ref('')
const loading  = ref(false)
const error    = ref('')

const onSignIn = async () => {
  error.value = ''; loading.value = true
  try {
    await signIn({ username: username.value, password: password.value })
    const nextPath = typeof route.query.next === 'string' ? route.query.next : '/'
    router.replace(nextPath)
  } catch (e) {
    console.error(e)
    error.value = 'ログインに失敗しました。ID/パスワードをご確認ください。'
  } finally { loading.value = false }
}
</script>

<style scoped>
:root { --pink:#ff5c8a; --pinkDark:#e84e79; --bg:#fff0f4; --text:#2b2b2b; }
.page { min-height:100vh; display:grid; place-items:center; background:linear-gradient(180deg,var(--bg),#fff); }
.panel {
  width:min(420px,90vw); background:#fff; border-radius:24px; padding:28px 24px 20px;
  box-shadow:0 20px 50px rgba(255,92,138,.25); border:1px solid #ffe0ea;
}
.brand { width:64px;height:64px;border-radius:16px;background:var(--pink);color:#fff;
  display:grid;place-items:center;font-weight:800;margin:2px auto 16px; }
.title { text-align:center; margin:0 0 18px; color:var(--text); }

.label { display:block; margin:12px 2px 6px; font-size:13px; color:#666; }
.input { width:100%; height:44px; padding:10px 14px; border:1.5px solid #ffd0df; border-radius:12px; }
.input:focus { border-color:var(--pink); box-shadow:0 0 0 3px rgba(255,92,138,.15); outline:none; }

.cta { width:100%; height:48px; margin-top:18px; border:none; border-radius:14px;
  background:var(--pink); color:#fff; font-weight:800; cursor:pointer; }
.cta:hover { background:var(--pinkDark); }
.link { width:100%; margin-top:10px; background:transparent; border:none; color:var(--pink); font-weight:700; cursor:pointer; }
.error { color:#d93025; margin-top:10px; font-size:14px; }
</style>
