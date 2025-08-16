
<template>
  <Authenticator>
    <template #default="{ user, signOut }">
      <main style="padding:24px">
        <h1>Hi, {{ user?.username }}</h1>
        <button @click="signOut">Sign out</button>
      </main>
    </template>
  </Authenticator>
</template>

<script setup>
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
</script>
