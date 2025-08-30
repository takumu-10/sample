<template>
  <div class="profile-page">
    <div class="tabs-container">
      <button
        :class="{ active: currentTab === 'edit' }"
        @click="currentTab = 'edit'"
      >
        プロフィール編集
      </button>
      <button
        :class="{ active: currentTab === 'preview' }"
        @click="currentTab = 'preview'"
      >
        プレビュー
      </button>
    </div>

    <div class="tab-content" v-show="currentTab === 'edit'">
      <div
        class="profile-icon"
        style="background-image: url(https://profile.yoshimoto.co.jp/assets/data/profile/175/90a670062224a6bb9e241705db075c18d31481da.jpg);"
      ></div>
      <button class="upgrade-button">アップグレード</button>
      <label for="bio" class="bio-label">自己紹介文</label>
      <textarea id="bio" class="bio-textarea" placeholder="自己紹介文を入力してください"></textarea>
      <!-- <section class="p">
      </section> -->
    </div>

    <div class="tab-content" v-show="currentTab === 'preview'">
      <section class="p">
        <h2>プレビュー</h2>
        <p>編集内容のプレビューが表示されます。</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  // export default { ... }: この行は、このファイル全体がJavaScriptモジュールとして公開されることを示す構文です。この構文があることで、import文を使って他のファイル（例えば、main.jsや親コンポーネント）からこのコンポーネントを読み込むことが可能になります。
  data() {
    // data() { ... }: Vue.jsのコンポーネントには、そのコンポーネント専用のデータを管理するためのdataプロパティがあります。これは関数として定義されており、必ずreturn { ... }の形式で返す必要があります。
    // 簡単に言うと、コンポーネントが「記憶しておくべき情報」を入れるための箱のようなもの

    return {
      currentTab: 'edit'
    };
  }
};
</script>

---

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center; /* ページ全体を中央寄せ */
}

.tabs-container {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
}

.tabs-container button {
  padding: 10px 20px;
  border: none;
  background-color: white;
  color: #6a0dad;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  flex-grow: 1; /* ボタンが利用可能なスペースを均等に埋める */
  flex-basis: 0; /* 追加 */
}

.tabs-container button.active {
  background-color: #6a0dad;
  color: white;
}

.tab-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* コンテンツ内の要素を中央に配置 */
}

.profile-icon {
  width: 120px;
  height: 120px;
  margin: 0 0 10px 0; /* マージンを調整 */
  border-radius: 50%;
  border: 3px solid #6a0dad;
  background-size: cover;
  background-position: center;
}

.upgrade-button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #e0b0ff;
  color: black;
  text-align: center;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 90%;
  margin-bottom: 20px;
}

.upgrade-button:hover {
  background-color: #d090f0;
}

/* 自己紹介文のテキストエリアのスタイル */
.bio-textarea {
  width: 90%;
  height: 100px; /* 適当な高さを設定 */
  padding: 10px;
  margin: 5px 0 20px 0; /* ラベルとの間隔を調整 */
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical; /* 縦方向のみリサイズ可能にする */
}

/* 自己紹介文のラベルのスタイルを追加 */
.bio-label {
  width: 90%;
  text-align: left; /* テキストを左寄せに */
  margin-top: 20px; /* アップグレードボタンとの間隔を調整 */
}

.p {
  padding: 12px;
}
</style>