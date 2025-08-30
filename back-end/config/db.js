const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 't-97.c9gu22q6829g.ap-northeast-1.rds.amazonaws.com', // 画像のエンドポイント
  user: 'takumukun97', // AWS RDSで設定したユーザー名
  password: 'T062y102', // AWS RDSで設定したパスワード
  database: 'tkm01', // AWS RDSで作成したデータベース名
  port: 3306 // 画像のポート番号
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Successfully connected to the database.');
});

module.exports = connection;