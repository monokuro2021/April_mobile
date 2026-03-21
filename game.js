// BGM制御変数
let bgmAudio = null;
let isBGMPlaying = false;

// DOM要素
const bgm = document.getElementById('bgm');
const startBtn = document.getElementById('start-btn');

// BGM再生関数
function playBGM() {
  try {
    if (bgm && !isBGMPlaying) {
      bgm.volume = 0.5;
      bgm.play().then(() => {
        isBGMPlaying = true;
        console.log('BGM再生開始');
      }).catch(error => {
        console.log('BGMの再生に失敗しました:', error);
      });
    }
  } catch (error) {
    console.log('BGMの再生に失敗しました:', error);
  }
}

// BGM停止関数
function stopBGM() {
  try {
    if (bgm && isBGMPlaying) {
      bgm.pause();
      bgm.currentTime = 0;
      isBGMPlaying = false;
      console.log('BGM停止');
    }
  } catch (error) {
    console.log('BGMの停止に失敗しました:', error);
  }
}

// ゲームスタートボタンイベント
startBtn.addEventListener('click', function() {
  console.log('ゲームスタートボタンがクリックされました');
  
  // ボタンを無効化して再度クリックできないようにする
  startBtn.disabled = true;
  startBtn.style.cursor = 'not-allowed';
  
  // すぐにBGMを再生
  playBGM();
  
  // ローディング状態に変更
  startBtn.classList.add('loading');
  startBtn.querySelector('span').textContent = 'ロード中';
  
  // 15秒後にエラー表示
  setTimeout(function() {
    // ローディング完了、エラー表示（色を赤色に瞬時に変更）
    startBtn.classList.remove('loading');
    startBtn.style.transition = 'none';
    startBtn.style.background = '#ff4444';
    startBtn.style.borderColor = '#cc0000';
    startBtn.style.color = 'white';
    startBtn.querySelector('span').textContent = 'エラー';
    
    // 少し後にtransitionを元に戻す
    setTimeout(function() {
      startBtn.style.transition = 'all 0.3s ease';
    }, 100);
    
    // 5秒後に次の画面に遷移
    setTimeout(function() {
      // 真っ白な背景の次の画面に遷移
      document.body.style.background = 'white';
      document.body.innerHTML = `
        <style>
          @font-face {
            font-family: 'JF-Dot-K12';
            src: url('./fonts/JF-Dot-K12.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          
          body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            min-height: 100vh;
            background: white;
            margin: 0;
            padding: 0;
            position: relative;
            overflow-x: hidden;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }
          
          .error-image {
            width: clamp(40%, 55vw, 65%);
            height: clamp(35%, 45vh, 65%);
            object-fit: contain;
            position: absolute;
            top: clamp(20%, 30vh, 30%);
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: none;
            max-height: none;
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            pointer-events: none;
          }
          
          .error-message {
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            font-family: 'JF-Dot-K12', monospace;
            font-size: clamp(1.2rem, 3.5vw, 1.6rem);
            color: black;
            line-height: 1.8;
            max-width: 90vw;
            width: auto;
            white-space: nowrap;
          }
          
          .resolve-btn {
            position: absolute;
            bottom: 10%;
            background: white;
            color: black;
            border: 2px solid black;
            padding: clamp(1rem, 3vw, 1.5rem) clamp(2rem, 6vw, 3rem);
            font-size: clamp(1.2rem, 4vw, 1.5rem);
            font-weight: bold;
            font-family: 'JF-Dot-K12', monospace !important;
            border-radius: 0;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            min-width: clamp(120px, 30vw, 160px);
            min-height: clamp(50px, 12vh, 70px);
            transform: none !important;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          
          .resolve-btn:hover {
            background: black;
            color: white;
          }
          
          .dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 2px solid black;
            padding: clamp(1rem, 3vw, 2rem);
            font-family: 'JF-Dot-K12', monospace;
            font-size: clamp(1.4rem, 4vw, 1.8rem);
            z-index: 99999;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin: 0;
            max-width: 90vw;
            width: auto;
          }
          
          .dialog p {
            margin: 0 0 1rem 0;
            white-space: nowrap;
          }
          
          .dialog-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
          }
          
          .dialog-btn {
            padding: 0.5rem 1rem;
            border: 1px solid black;
            background: white;
            cursor: pointer;
            font-family: 'JF-Dot-K12', monospace;
          }
          
          .dialog-btn:hover {
            background: black;
            color: white;
          }
        </style>
        
        <img src="./images/401.png" alt="401 Error" class="error-image">
        <div class="error-message">このページは、ウソツキなので<br>承認できません<br>ゲームは、アナタがはじめられる<br>ようにしてください</div>
        <button id="resolve-btn" class="resolve-btn">RESOLVE</button>
      `;
      
      // RESOLVEボタンのイベントリスナー
      const resolveBtn = document.getElementById('resolve-btn');
      resolveBtn.addEventListener('click', function() {
        console.log('RESOLVEボタンがクリックされました');
        
        // ボタンを無効化
        resolveBtn.disabled = true;
        resolveBtn.style.opacity = '0.5';
        resolveBtn.style.cursor = 'not-allowed';
        
        // 確認ダイアログを表示
        const dialog = document.createElement('div');
        dialog.className = 'dialog';
        dialog.innerHTML = `
          <p>問題を解決しますか？</p>
          <div class="dialog-buttons">
            <button class="dialog-btn" id="yes-btn">はい</button>
            <button class="dialog-btn" id="no-btn">いいえ</button>
          </div>
        `;
        
        document.body.appendChild(dialog);
        
        // はいボタンのイベント
        document.getElementById('yes-btn').addEventListener('click', function() {
          document.body.removeChild(dialog);
          // 3ページ目に遷移（2ページ目と同じデザイン）
          document.body.innerHTML = `
            <style>
              @font-face {
                font-family: 'JF-Dot-K12';
                src: url('./fonts/JF-Dot-K12.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
              }
              
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                min-height: 100vh;
                background: white;
                margin: 0;
                padding: 0;
                position: relative;
                overflow-x: hidden;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
              }
              
              .error-image {
                width: clamp(40%, 55vw, 65%);
                height: clamp(35%, 45vh, 65%);
                object-fit: contain;
                position: absolute;
                top: clamp(20%, 30vh, 30%);
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: none;
                max-height: none;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                pointer-events: none;
              }
              
              .error-message {
                position: absolute;
                top: 55%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                font-family: 'JF-Dot-K12', monospace;
                font-size: clamp(1.2rem, 3.5vw, 1.6rem);
                color: black;
                line-height: 1.8;
                max-width: 90vw;
                width: auto;
                white-space: nowrap;
              }
              
              .button-container {
                position: absolute;
                bottom: clamp(4rem, 10vh, 5rem);
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: clamp(1.5rem, 4vw, 3rem);
                justify-content: center;
                max-width: 90vw;
                flex-wrap: wrap;
                flex-direction: row;
              }
              
              .number-btn {
                background: white;
                color: black;
                border: 2px solid black;
                padding: clamp(1rem, 2.5vw, 1.5rem);
                font-size: clamp(1.4rem, 4.5vw, 1.8rem);
                font-weight: bold;
                font-family: 'JF-Dot-K12', monospace !important;
                border-radius: 0;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                width: clamp(60px, 15vw, 90px);
                height: clamp(60px, 15vw, 90px);
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                min-width: 55px;
                min-height: 55px;
              }
              
              .number-btn:hover {
                background: black;
                color: white;
              }
            </style>
            <img src="./images/401.png" alt="401 Error" class="error-image">
            <div class="error-message">ご自身で解決できない場合は、<br>こちらをご覧ください</div>
            <div class="button-container">
              <button id="btn-1" class="number-btn">1</button>
              <button id="btn-2" class="number-btn">2</button>
              <button id="btn-3" class="number-btn">3</button>
              <button id="btn-4" class="number-btn">4</button>
            </div>
          `;
          
          // 3ページ目のボタンのイベントリスナー
          function showSolutionDialog(buttonNumber) {
            // オーバーレイを作成してボタンを無効化
            const overlay = document.createElement('div');
            overlay.style.cssText = `
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: transparent;
              z-index: 999998;
            `;
            
            // 確認ダイアログを表示
            const dialog = document.createElement('div');
            dialog.style.cssText = `
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              border: 2px solid black;
              padding: clamp(1rem, 3vw, 2rem);
              font-family: 'JF-Dot-K12', monospace;
              font-size: clamp(1.2rem, 4vw, 1.8rem);
              z-index: 999999;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              margin: 0;
              max-width: 90vw;
              width: auto;
            `;
            
            dialog.innerHTML = `
              <p style="margin: 0 0 1rem 0; white-space: nowrap;">解決方法を提示しますか？</p>
              <div style="display: flex; gap: clamp(0.5rem, 2vw, 1rem); justify-content: center; flex-wrap: wrap;">
                <button style="padding: 0.5rem 1rem; border: 1px solid black; background: white; cursor: pointer; font-family: 'JF-Dot-K12', monospace; font-size: clamp(1rem, 3vw, 1.2rem);" id="yes-btn-${buttonNumber}" onmouseover="this.style.background='black'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='black';">はい</button>
                <button style="padding: 0.5rem 1rem; border: 1px solid black; background: white; cursor: pointer; font-family: 'JF-Dot-K12', monospace; font-size: clamp(1rem, 3vw, 1.2rem);" id="no-btn-${buttonNumber}" onmouseover="this.style.background='black'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='black';">いいえ</button>
              </div>
            `;
            
            document.body.appendChild(overlay);
            document.body.appendChild(dialog);
            
            // はいボタンのイベント
            document.getElementById(`yes-btn-${buttonNumber}`).addEventListener('click', function() {
              document.body.removeChild(dialog);
              document.body.removeChild(overlay);
              
              let message = '';
              if (buttonNumber === 1) {
                message = 'ウソツキは承認できません<br>ウソを消してください';
              } else if (buttonNumber === 2) {
                message = 'どこからこのページに<br>入りましたか？<br>ウソがついていないか<br>確認してください';
              } else if (buttonNumber === 3) {
                message = 'ウソの言語を<br>変えてください<br>メインのドメインは<br>変えないでください';
              } else if (buttonNumber === 4) {
                message = 'もし解決できない場合は<br>遠慮なく直接開発者に<br>ご相談ください！';
              }
              
              // メッセージ表示用のオーバーレイを作成
              const messageOverlay = document.createElement('div');
              messageOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 999997;
              `;
              
              // メッセージを表示
              const messageDiv = document.createElement('div');
              messageDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 2px solid black;
                padding: clamp(1rem, 3vw, 2rem);
                font-family: 'JF-Dot-K12', monospace;
                font-size: clamp(1.2rem, 4vw, 1.8rem);
                z-index: 999998;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                text-align: center;
                line-height: 1.5;
                max-width: 90vw;
                width: auto;
                white-space: nowrap;
              `;
              messageDiv.innerHTML = message;
              
              document.body.appendChild(messageOverlay);
              document.body.appendChild(messageDiv);
              
              // 4秒後にメッセージを削除
              setTimeout(function() {
                document.body.removeChild(messageDiv);
                document.body.removeChild(messageOverlay);
              }, 4000);
              
              console.log(`${buttonNumber}ボタンで解決方法を提示します`);
            });
            
            // いいえボタンのイベント
            document.getElementById(`no-btn-${buttonNumber}`).addEventListener('click', function() {
              document.body.removeChild(dialog);
              document.body.removeChild(overlay);
              console.log(`${buttonNumber}ボタンで解決方法を提示しません`);
            });
          }
          
          document.getElementById('btn-1').addEventListener('click', function() {
            console.log('1ボタンがクリックされました');
            showSolutionDialog(1);
          });
          
          document.getElementById('btn-2').addEventListener('click', function() {
            console.log('2ボタンがクリックされました');
            showSolutionDialog(2);
          });
          
          document.getElementById('btn-3').addEventListener('click', function() {
            console.log('3ボタンがクリックされました');
            showSolutionDialog(3);
          });
          
          document.getElementById('btn-4').addEventListener('click', function() {
            console.log('4ボタンがクリックされました');
            showSolutionDialog(4);
          });
        });
        
        // いいえボタンのイベント
        document.getElementById('no-btn').addEventListener('click', function() {
          document.body.removeChild(dialog);
          // ボタンを再有効化
          resolveBtn.disabled = false;
          resolveBtn.style.opacity = '1';
          resolveBtn.style.cursor = 'pointer';
        });
      });
    }, 5000);
  }, 15000);
});

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  console.log('ページが読み込まれました');
  
  // BGMの準備
  if (bgm) {
    bgm.addEventListener('ended', function() {
      isBGMPlaying = false;
      console.log('BGMの再生が終了しました');
    });
  }
});

  
  
