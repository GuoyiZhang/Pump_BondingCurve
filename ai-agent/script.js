/* ================================================
   AI Agent 策略广场 · 共享脚本
   鼠标视差光球 + 3D 机器人跟随 + 导航高亮
   ================================================ */

// === 鼠标视差光球（4 个光球不同强度模拟景深）===
const ambientOrbs = document.querySelectorAll('.ambient .orb');
const strengths = [80, 60, 45, 35];
const eases = [0.05, 0.04, 0.03, 0.025];
let ambTX = [], ambTY = [], ambCX = [], ambCY = [];
ambientOrbs.forEach(() => { ambTX.push(0); ambTY.push(0); ambCX.push(0); ambCY.push(0); });

window.addEventListener('mousemove', e => {
  const nx = (e.clientX / window.innerWidth - 0.5) * 2;
  const ny = (e.clientY / window.innerHeight - 0.5) * 2;
  ambientOrbs.forEach((_, i) => { ambTX[i] = nx; ambTY[i] = ny; });
});

function tickAmbient() {
  ambientOrbs.forEach((orb, i) => {
    ambCX[i] += (ambTX[i] - ambCX[i]) * eases[i];
    ambCY[i] += (ambTY[i] - ambCY[i]) * eases[i];
    orb.style.setProperty('--mx', (ambCX[i] * strengths[i]) + 'px');
    orb.style.setProperty('--my', (ambCY[i] * strengths[i]) + 'px');
  });
  requestAnimationFrame(tickAmbient);
}
tickAmbient();

// === 3D 机器人头部跟随鼠标转动（只控制封面大机器人，不控制导航 logo）===
const robotHead = document.querySelector('.robot-head');
let robTX = 0, robTY = 0, robCX = 0, robCY = 0;

window.addEventListener('mousemove', e => {
  robTX = (e.clientX / window.innerWidth - 0.5) * 2;
  robTY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function tickRobot() {
  robCX += (robTX - robCX) * 0.06;
  robCY += (robTY - robCY) * 0.06;
  if (robotHead) {
    const rotY = robCX * 25;
    const rotX = -15 + robCY * 15;
    robotHead.style.animation = 'none';
    robotHead.style.transform = 'translate(-50%,-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
  }
  requestAnimationFrame(tickRobot);
}
tickRobot();

// === 导航高亮（根据当前页面）===
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
