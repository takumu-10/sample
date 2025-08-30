<template>
  <div ref="scroller" class="message-window">
    <!-- 日付ごとのセクション -->
    <div v-for="(section, si) in sections" :key="'sec-' + si" class="date-section">
      <div class="date-sep">{{ section.label }}</div>

      <!-- 時間段落（同一送信者かつ5分以内で束ねる） -->
      <div
        v-for="(grp, gi) in section.groups"
        :key="'grp-' + si + '-' + gi"
        :class="['msg-group', grp.sender === 'me' ? 'right' : 'left']"
      >
        <div class="bubbles">
          <div v-for="m in grp.items" :key="m.id" class="bubble">
            <p class="text">{{ m.text }}</p>
          </div>
        </div>
        <time class="stamp">{{ timeOnly(grp.items[grp.items.length-1].at) }}</time>
      </div>
    </div>
    <div class="bottom-pad" />
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messages: { type: Array, default: () => [] },
  },
  computed: {
    sections() {
      // 1) 日付で分割 → 2) 同一送信者＆5分以内でグルーピング
      const byDate = {}
      for (const m of this.messages) {
        const d = new Date(m.at)
        const key = d.toDateString()
        if (!byDate[key]) byDate[key] = []
        byDate[key].push(m)
      }
      const out = []
      for (const key of Object.keys(byDate)) {
        const items = byDate[key]
        // 時系列保証（念のため）
        items.sort((a, b) => new Date(a.at) - new Date(b.at))

        const groups = []
        const TH = 5 * 60 * 1000 // 5分
        let cur = null
        for (const m of items) {
          const t = new Date(m.at).getTime()
          if (!cur) {
            cur = { sender: m.sender, items: [m], lastAt: t }
          } else {
            const sameSender = cur.sender === m.sender
            const close = Math.abs(t - cur.lastAt) <= TH
            if (sameSender && close) {
              cur.items.push(m)
              cur.lastAt = t
            } else {
              groups.push(cur)
              cur = { sender: m.sender, items: [m], lastAt: t }
            }
          }
        }
        if (cur) groups.push(cur)

        const label = this.prettyDate(new Date(items[0].at))
        out.push({ label, groups })
      }
      // 日付順で並べ替え（過去→未来）
      out.sort((a, b) => {
        const da = new Date(a.groups?.[0]?.items?.[0]?.at || 0)
        const db = new Date(b.groups?.[0]?.items?.[0]?.at || 0)
        return da - db
      })
      return out
    },
  },
  watch: {
    messages: {
      deep: true,
      handler() {
        this.$nextTick(this.scrollToBottom)
      },
    },
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    scrollToBottom() {
      const el = this.$refs.scroller
      if (!el) return
      el.scrollTop = el.scrollHeight
    },
    timeOnly(iso) {
      const d = new Date(iso)
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    prettyDate(d) {
      const today = new Date()
      const yest = new Date(); yest.setDate(today.getDate() - 1)
      if (d.toDateString() === today.toDateString()) return '今日'
      if (d.toDateString() === yest.toDateString()) return '昨日'
      return `${d.getMonth() + 1}月${d.getDate()}日`
    },
  },
}
</script>

<style scoped>
.message-window {
  height: 100%;
  overflow: auto;
  padding: 12px 12px 0;
  background: #fff;
  display: grid;
  align-content: start;
  gap: 10px;
}
.date-section { display: grid; gap: 10px; }
.date-sep {
  justify-self: center;
  font-size: 11px;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 999px;
  padding: 4px 10px;
  margin: 8px 0;
}
.msg-group {
  display: grid;
  justify-content: start;
  gap: 4px;
}
.msg-group.right { justify-content: end; }
.bubbles {
  display: grid;
  gap: 4px;
}
.bubble {
  max-width: 78%;
  padding: 10px 12px;
  border-radius: 14px;
  word-break: break-word;
  background: #f3f4f6;              /* 受信デフォルト */
  color: #111827;
}
.right .bubble {
  background: var(--brand, #7c3aed); /* 送信は紫 */
  color: #fff;
}
.text { margin: 0; font-size: 14px; line-height: 1.5; }
.stamp {
  font-size: 11px;
  color: #9ca3af;
  justify-self: end;
}
.left .stamp { justify-self: start; }
.bottom-pad { height: 8px; }
</style>
