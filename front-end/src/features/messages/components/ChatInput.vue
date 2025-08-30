<template>
  <div class="chat-input" :style="safeArea">
    <textarea
      v-model="text"
      class="input"
      placeholder="メッセージを入力…"
      rows="1"
      @keydown.enter.exact.prevent="send"
      @keydown.enter.shift.exact="newline"
      @input="autoGrow"
      ref="ta"
    />
    <button class="send" :disabled="!text.trim()" @click="send">送信</button>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',
  data() {
    return { text: '' }
  },
  computed: {
    safeArea() {
      // iOSのセーフエリア対応
      return { paddingBottom: `max(8px, env(safe-area-inset-bottom))` }
    },
  },
  mounted() {
    this.autoGrow()
  },
  methods: {
    newline() {
      // Shift+Enter は改行
      this.text += '\n'
    },
    autoGrow() {
      const el = this.$refs.ta
      if (!el) return
      el.style.height = 'auto'
      el.style.height = Math.min(el.scrollHeight, 160) + 'px'
    },
    send() {
      const t = this.text.trim()
      if (!t) return
      this.$emit('send', t)
      this.text = ''
      this.$nextTick(this.autoGrow)
    },
  },
}
</script>

<style scoped>
.chat-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
}
.input {
  resize: none;
  width: 100%;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  outline: none;
}
.send {
  padding: 0 14px;
  border: none;
  border-radius: 12px;
  background: var(--brand, #7c3aed);
  color: #fff;
  font-weight: 600;
}
.send:disabled { opacity: .4; }
</style>
