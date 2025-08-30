const express = require('express');
const app = express();
const port = 3001; // フロントエンドとポートを分ける

// CORSを有効にするためのパッケージ
const cors = require('cors'); 
// ステップ2で作成したデータベース接続設定をインポート
const db = require('./config/db');

// ミドルウェアの適用
app.use(express.json());
app.use(cors()); // CORSミドルウェアを適用

// /api/messages エンドポイント
// フロントエンドの要求に合わせて、このエンドポイントでメッセージデータを返します。
app.get('/api/messages', (req, res) => {
  // ----------------------------------------------------
  const sql = 'SELECT text, sender FROM messages ORDER BY timestamp ASC';
  db.query(sql, (err, results) => {
    if (err) {
      // エラーが発生した場合
      console.error('Error fetching messages from database:', err);
      res.status(500).send('Error fetching data.');
      return;
    }
// 成功した場合、取得したデータをJSON形式で返します
    res.json(results);
  });
});

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});