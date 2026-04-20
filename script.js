// フェードインアニメーション（Intersection Observer）
document.addEventListener('DOMContentLoaded', () => {
  // フェードイン対象の要素にクラスを付与
  const sections = document.querySelectorAll('section > div');
  sections.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // カウンターアニメーション
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // FAQ アコーディオン
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      // 他のFAQを閉じる
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-toggle').forEach(b => b.setAttribute('aria-expanded', 'false'));
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('faq-open'));

      if (!isOpen) {
        content.classList.remove('hidden');
        icon.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        item.classList.add('faq-open');
      }
    });
  });

  // ナビゲーションのスクロール時スタイル
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});

// カウンターアニメーション関数
function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // イージング（ease-out）
    const eased = 1 - Math.pow(1 - progress, 3);
    const isDecimal = target % 1 !== 0;
    el.textContent = isDecimal ? (eased * target).toFixed(1) : Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      const isDecimal = target % 1 !== 0;
      el.textContent = isDecimal ? target.toFixed(1) : target;
    }
  }

  requestAnimationFrame(update);
}
