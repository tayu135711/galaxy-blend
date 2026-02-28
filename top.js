// フェードイン
function initScrollAnimation() {
  const items = document.querySelectorAll('.fadein');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(item => {
      if (item.isIntersecting) {
        item.target.classList.add('active');
        observer.unobserve(item.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => observer.observe(item));
}

// 星の背景
function initStarBackground() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];

    for (let i = 0; i < 800; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
      });
    }

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  resize();
  window.addEventListener('resize', resize);
}
// カーソルエフェクト
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.id = 'star-cursor';
  cursor.textContent = '🌍';
  document.body.appendChild(cursor);
  let last = 0;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    const now = Date.now();
    if (now - last < 60) return;
    last = now;

    const trail = document.createElement('div');
    trail.className = 'star-cursor';
    trail.textContent = '🌍';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
        }, 300);
  });
}


// スムーススクロール
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimation();
  initStarBackground();
  initCursorEffect();
  initSmoothScroll();
});






