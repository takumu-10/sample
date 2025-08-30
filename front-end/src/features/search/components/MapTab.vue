<template>
  <section class="map-wrap">
    <h2 class="sr-only">地図</h2>
    <div id="map" class="map"></div>
  </section>
</template>

<script>
export default {
  name: 'MapTab',
  mounted() {
    this.ensureGoogleMaps().then(this.renderMap).catch((e) => {
      console.error('Google Maps の読み込みに失敗:', e)
    })
  },
  methods: {
    ensureGoogleMaps() {
      return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
          resolve()
          return
        }
        const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
        if (!apiKey) {
          reject(new Error('VITE_APP_GOOGLE_MAPS_API_KEY が未設定です'))
          return
        }
        // すでにscript挿入済みなら待つ
        if (document.getElementById('gmaps-script')) {
          // onloadを拾えない場合用にポーリング
          const timer = setInterval(() => {
            if (window.google && window.google.maps) {
              clearInterval(timer)
              resolve()
            }
          }, 100)
          // 念のため10秒でタイムアウト
          setTimeout(() => {
            clearInterval(timer)
            if (!(window.google && window.google.maps)) {
              reject(new Error('Google Maps の初期化がタイムアウトしました'))
            }
          }, 10000)
          return
        }
        // 動的ロード
        const script = document.createElement('script')
        script.id = 'gmaps-script'
        // callback名を固有化（衝突回避）
        const cb = '__gmapsInit__' + Math.random().toString(36).slice(2)
        script.src =
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${cb}`
        script.async = true
        script.defer = true
        window[cb] = () => {
          resolve()
          // 一度呼んだら掃除
          try { delete window[cb] } catch {}
        }
        script.onerror = () => reject(new Error('Google Maps スクリプトの読み込みに失敗'))
        document.head.appendChild(script)
      })
    },
    renderMap() {
      const location = { lat: 35.681236, lng: 139.767125 } // 東京駅
      /* global google */
      new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        disableDefaultUI: true, // モバイル向けにUI簡素化
        gestureHandling: 'greedy',
      })
    },
  },
}
</script>

<style scoped>
.map-wrap { width: 100%; }
.map {
  width: 100%;
  height: 420px; /* モバイル表示に合わせて調整可 */
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
}
.sr-only {
  position: absolute; width: 1px; height: 1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0; padding: 0; margin: -1px;
}
</style>
