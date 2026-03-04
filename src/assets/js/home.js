import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Home extends BasePage {
    onReady() {
        this.initFeaturedTabs();
    }

    /**
     * used in views/components/home/featured-products-style*.twig
     */
    initFeaturedTabs() {
        app.all('.tab-trigger', el => {
            el.addEventListener('click', ({ currentTarget: btn }) => {
                let id = btn.dataset.componentId;
                // btn.setAttribute('fill', 'solid');
                app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'is-active opacity-0 translate-y-3', 'inactive', tab => tab.id == btn.dataset.target)
                    .toggleClassIf(`#${id} .tab-trigger`, 'is-active', 'inactive', tabBtn => tabBtn == btn);

                // fadeIn active tabe
                setTimeout(() => app.toggleClassIf(`#${id} .tabs-wrapper>div`, 'opacity-100 translate-y-0', 'opacity-0 translate-y-3', tab => tab.id == btn.dataset.target), 100);
            })
        });
        document.querySelectorAll('.s-block-tabs').forEach(block => block.classList.add('tabs-initialized'));
    }
}

Home.initiateWhenReady(['index']);
/* ══════════════════════
   RPP HERO SLIDER
══════════════════════ */
(function(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const progressBar = document.getElementById('heroProgress');
  const counterEl = document.getElementById('slideCurrentNum');
  if (!slides.length) return;
  let current = 0, timer = null;
  const DURATION = 5000;

  function goTo(i) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    if (counterEl) counterEl.textContent = String(current + 1).padStart(2,'0');
    resetProgress();
  }

  function resetProgress() {
    if (!progressBar) return;
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      progressBar.style.transition = `width ${DURATION}ms linear`;
      progressBar.style.width = '100%';
    }));
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), DURATION);
    resetProgress();
  }

  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if (prevBtn) prevBtn.onclick = () => { clearInterval(timer); goTo(current - 1); startAuto(); };
  if (nextBtn) nextBtn.onclick = () => { clearInterval(timer); goTo(current + 1); startAuto(); };
  dots.forEach((d, i) => d.onclick = () => { clearInterval(timer); goTo(i); startAuto(); });

  const heroEl = document.getElementById('heroSlides');
  if (heroEl) {
    let tx = 0;
    heroEl.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
    heroEl.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) { clearInterval(timer); dx > 0 ? goTo(current - 1) : goTo(current + 1); startAuto(); }
    }, {passive:true});
  }

  startAuto();
})();

/* ══════════════════════
   SCROLL REVEAL
══════════════════════ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.08});
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ══════════════════════
   SCROLL TO TOP
══════════════════════ */
const scrollBtn = document.getElementById('scrollTop');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  }, {passive:true});
}
