// db接続設定をインポート
const db = require('../config/db');

// メッセージを取得する関数をエクスポート
exports.getMessages = (req, res) => {
  const sql = 'SELECT text, sender FROM messages ORDER BY timestamp ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching messages from database:', err);
      return res.status(500).send('Error fetching data.');
    }
    res.json(results);
  });
};