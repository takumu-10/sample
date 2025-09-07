const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors'); 

// 新しく作成したルートファイルをインポート
const messageRoutes = require('./routes/messageRoutes');

// ミドルウェアの適用
app.use(express.json());
app.use(cors());

// /apiパスに、メッセージ関連のルートを適用
app.use('/api', messageRoutes);

// サーバーの起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});