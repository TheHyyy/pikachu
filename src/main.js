let string = `
/* 先来配置一下基本的 */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
*::before,
*::after {
  box-sizing: border-box;
}
/* 给皮卡丘上个色 */
body {
  background-color: #ffe600;
  min-height: 100vh;
}

.skin {
  position: relative;
}
/* 画皮卡丘的鼻子 */
.nose {
  border: 10px solid black;
  border-color: black transparent transparent transparent;
  border-bottom: none;
  width: 0;
  height: 0;
  position: relative;
  left: 50%;
  margin-left: -10px;
  top: 141px;
  z-index: 3;
}

.nose:hover {
  transform-origin: center bottom;
  animation: wave 0.15s infinite linear;
}
/* 也是构成鼻子的一部分 */
.yuan {
  position: absolute;
  width: 20px;
  height: 6px;
  background-color: black;
  top: -16px;
  left: -10px;
  border-radius: 10px 10px 0 0;
}
/* 开始眼睛了 */
.eye {
  border: 2px solid black;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  left: 50%;
  position: absolute;
  margin-left: -32px;
  top: 100px;
  background-color: #2e2e2e;
}
.eye.left {
  left: 47.5%;
}
.eye.right {
  left: 52.5%;
}
.eye::before {
  content: '';
  border: 2px solid #000;
  height: 30px;
  width: 30px;
  display: block;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  left: 10px;
  top: 3px;
  box-shadow: white;
  animation: move 3s infinite;
}

.eye.left {
  transform: translateX(-100px);
}
.eye.right {
  transform: translateX(100px);
}
/* 开始嘴巴 */
.mouth {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 170px;
  margin-left: -100px;
}
.mouth .up {
  position: relative;
  top: -20px;
}
/* 这里步骤多一些 */
.mouth .up .lip {
  border: 3px solid black;
  height: 30px;
  width: 100px;
  border-top-color: transparent;

  border-right-color: transparent;
  position: relative;
  position: absolute;
  left: 50%;
  background-color: #ffe600;
  margin-left: -50px;
  z-index: 1;
}
.mouth .up .lip::before {
  content: '';
  display: block;
  width: 7px;
  height: 30px;
  position: absolute;
  bottom: 0;
  background-color: #ffe600;
}

.mouth .up .lip.right::before {
  left: -6px;
}
/* 开始画嘴巴的下半部分 */
.mouth .down {
  height: 160px;
  position: absolute;
  top: 8px;
  width: 100%;
  overflow: hidden;
}
.mouth .down .yuan1 {
  border: 3px solid black;
  width: 150px;
  height: 1000px;
  position: absolute;
  left: 50%;
  margin-left: -76px;
  bottom: 0;
  border-radius: 75px/300px;
  background-color: rgb(167, 16, 8);
  overflow: hidden;
}
.mouth .down .yuan1 .yuan2 {
  background-color: #ff485f;
  width: 200px;
  height: 287px;
  position: absolute;
  bottom: -160px;
  left: 50%;
  margin-left: -100px;
  border-radius: 100px;
  animation: 3s shetou infinite;
}
/* 上个小腮红 */
.face {
  position: absolute;
  left: 50%;
  border: 3px solid black;
  width: 88px;
  height: 88px;
  top: 200px;
  margin-left: -44px;
  z-index: 2;
  animation: saihong 5s infinite;
}

.face > img {
  position: absolute;
  top: 20%;
}
.face.left > img {
  left: 80%;
}
.face.right > img {
  left: 20%;
}
.face.left > img {
  transform: rotateY(180deg);
  transform-origin: 0 0;
}
.face.left {
  transform: translateX(-180px);
  background-color: #f00;
  border-radius: 50%;
}
.face.right {
  transform: translateX(180px);
  background-color: #f00;
  border-radius: 50%;
}
/* 谢谢你能看到这里
   这只皮卡丘送给你 */
`

const player = {
  id: undefined,
  time: 100,
  ui: {
    demo: document.querySelector('#demo'),
    demo2: document.querySelector('#demo2'),
  },
  events: {
    '#btnPause': 'pause',
    '#btnPlay': 'play',
    '#btnSlow': 'slow',
    '#btnNormal': 'normal',
    '#btnFast': 'fast',
  },
  n: 1,
  init: () => {
    player.ui.demo.innerText = string.substr(0, player.n)
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.bindEvents()
    player.play()
  },
  bindEvents: () => {
    for (let key in player.events) {
      if (player.events.hasOwnProperty(key)) {
        const value = player.events[key] // pause / play / slow
        document.querySelector(key).onclick = player[value]
      }
    }
  },
  run: () => {
    player.n += 1
    if (player.n > string.length) {
      window.clearInterval(player.id)
      return
    }
    player.ui.demo.innerText = string.substr(0, player.n)
    player.ui.demo2.innerHTML = string.substr(0, player.n)
    player.ui.demo.scrollTop = player.ui.demo.scrollHeight
  },
  play: () => {
    window.clearInterval(player.id)
    player.id = setInterval(player.run, player.time)
  },
  pause: () => {
    window.clearInterval(player.id)
  },
  slow: () => {
    player.pause()
    player.time = 70
    player.play()
  },
  normal: () => {
    player.pause()
    player.time = 30
    player.play()
  },
  fast: () => {
    player.pause()
    player.time = 0
    player.play()
  },
}

player.init()
