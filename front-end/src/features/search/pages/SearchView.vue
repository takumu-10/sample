<!-- <template>
  <section class="p">
    <h2>探す</h2>
    <p>検索UIなど</p>
  </section>
</template>
<style scoped>.p{padding:12px}</style> -->

<template>
  <section class="p">
    <h2>探す</h2>
    <p>検索UIなど</p>
    <div id="map"></div>
  </section>
</template>

<script>
export default {
  name: 'MapComponent',
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // APIキーを環境変数から取得
      const apiKey = import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY;

      // Google Maps JavaScript APIを動的にロード
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = this.renderMap; // グローバル関数として設定
      document.head.appendChild(script);
    },
    renderMap() {
      const location = { lat: 35.681236, lng: 139.767125 }; // 東京駅の座標例

      // マップの表示
      new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
      });
    },
  },
};
</script>

<style scoped>
.p {
  padding: 12px;
}
#map {
  height: 400px; /* マップの表示サイズ */
  width: 100%;
}
</style>