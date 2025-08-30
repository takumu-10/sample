<template>
  <div class="message-layout">
    <aside class="thread-list">
      <div class="thread-item active">
        <img src="https://via.placeholder.com/50" alt="Profile" class="profile-pic" />
        <div class="thread-info">
          <span class="thread-name">ダイアン津田</span>
          <span class="last-message">芸人</span>
        </div>
      </div>
      <div class="thread-item">
        <img src="https://via.placeholder.com/50" alt="Profile" class="profile-pic" />
        <div class="thread-info">
          <span class="thread-name">佐藤 花子</span>
          <span class="last-message">マネージャー</span>
        </div>
      </div>
    </aside>

    <main class="chat-main">
      <div class="message-window">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          :class="['message-bubble', message.sender === 'me' ? 'sent' : 'received']"
        >
          <p>{{ message.text }}</p>
        </div>
      </div>

      <div class="chat-input">
        <input type="text" placeholder="メッセージを入力..." class="input-field" />
        <button class="send-button">送信</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [] // APIから取得したメッセージを格納する配列
    };
  },
  methods: {
    // APIを呼び出してメッセージを取得するメソッド
    async fetchMessages() {
      try {
        // バックエンドのAPIエンドポイント
        // 例: http://localhost:3001/api/messages
        const response = await fetch('http://localhost:3001/api/messages'); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // JSON形式でレスポンスをパース
        const data = await response.json();
        
        // 取得したデータを `messages` 配列に格納
        this.messages = data;
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  },
  mounted() {
    // コンポーネントがマウントされたときにAPIを呼び出す
    this.fetchMessages();
  }
};
</script>

<style scoped>
.message-layout {
  display: flex;
  height: 80vh; /* 画面の高さに応じて調整 */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  font-family: sans-serif;
}

/* スレッドリスト */
.thread-list {
  width: 300px;
  background-color: #f7f7f7;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
}

.thread-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.thread-item:hover {
  background-color: #ececec;
}

.thread-item.active {
  background-color: #e0e0e0;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.thread-info {
  display: flex;
  flex-direction: column;
}

.thread-name {
  font-weight: bold;
}

.last-message {
  font-size: 0.9em;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* メインチャットエリア */
.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.message-window {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  position: relative;
  word-wrap: break-word;
}

.message-bubble::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.received {
  background-color: #e0e0e0;
  align-self: flex-start;
}

.received::after {
  border-width: 10px 10px 0 0;
  border-color: transparent #e0e0e0 transparent transparent;
  top: 0;
  left: -9px;
}

.sent {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.sent::after {
  border-width: 10px 0 0 10px;
  border-color: transparent transparent transparent #007bff;
  top: 0;
  right: -9px;
}

/* 入力フォーム */
.chat-input {
  display: flex;
  padding: 10px 15px;
  background-color: #f7f7f7;
  border-top: 1px solid #e0e0e0;
}

.input-field {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
}

.send-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}
</style>