<!-- front-end/src/views/SignupView.vue -->
<template>
  <div class="page">
    <div class="panel">
      <h1 class="title">新規登録</h1>
      <label class="label">メール（ユーザー名）</label>
      <input v-model.trim="username" class="input" type="email" placeholder="you@example.com" />
      <label class="label">パスワード</label>
      <input v-model="password" class="input" type="password" placeholder="8文字以上" />
      <button class="cta" :disabled="loading" @click="onSignUp">{{ loading ? '作成中...' : 'アカウント作成' }}</button>
      <p v-if="msg" class="ok">{{ msg }}</p>
      <p v-if="error" class="error">{{ error }}</p>
      <button class="link" @click="$router.push({ name: 'login' })">ログインへ戻る</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { signUp } from 'aws-amplify/auth'
const username = ref(''); const password = ref(''); const loading = ref(false)
const msg = ref(''); const error = ref('')

const onSignUp = async () => {
  error.value=''; msg.value=''; loading.value=true
  try { await signUp({ username: username.value, password: password.value })
        msg.value='確認コードをメールで送信しました。案内に従って有効化してください。' }
  catch(e){ console.error(e); error.value='登録に失敗しました。入力内容をご確認ください。' }
  finally{ loading.value=false }
}
</script>

<style scoped>
/* LoginView と同スタイルでOK（省略可） */
</style>
