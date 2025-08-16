const express = require('express');
const app = express();
const port = 3000;

// CORSを有効にする設定 (フロントエンドからのアクセスを許可するため)
const cors = require('cors');
app.use(cors());

// /api/message へのGETリクエストを処理するエンドポイント
app.get('/api/message', (req, res) => {
  res.json({ message: 'バックエンドから長袖が届きました！' });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました。`);
});