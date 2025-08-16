// バックエンドのサーバーからデータを取得する関数
async function fetchData() {
  try {
    // ローカルホストの3000番ポートにあるバックエンドにアクセス
    const response = await fetch('http://localhost:3000/api/message');
    const data = await response.json();

    // 取得したデータをHTMLに表示
    document.getElementById('message').textContent = data.message;
  } catch (error) {
    console.error('データの取得に失敗しました:', error);
    document.getElementById('message').textContent = 'データの取得に失敗しました。サーバーが起動しているか確認してください。';
  }
}

// ページが読み込まれたら fetchData 関数を実行
document.addEventListener('DOMContentLoaded', fetchData);