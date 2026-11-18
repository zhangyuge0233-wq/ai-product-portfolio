(() => {
  const gallery = document.querySelector('#qianmian .media');
  const trigger = gallery.querySelector('button');
  const picture = trigger.querySelector('img');
  const caption = gallery.querySelector('figcaption');
  const slides = [
    {src:'assets/qianmian-home.jpg', alt:'千面创意中心首页，提供自然语言创意输入与参考图上传', caption:'千面创意中心 · 首页'},
    {src:'assets/qianmian-workspace-clean.png', alt:'基于重新截取的千面工作台优化海报：无黑边、绿色标题与按钮、文字无底板', caption:'工作台 · 海报排版优化示意'}
  ];
  let current = 0;
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  controls.innerHTML = '<button type="button" aria-label="上一张图片">‹</button><span aria-live="polite" class="gallery-count"></span><button type="button" aria-label="下一张图片">›</button>';
  const stage = document.createElement('div');
  stage.className = 'gallery-stage';
  trigger.before(stage);
  stage.append(trigger, controls);
  const buttons = controls.querySelectorAll('button');
  function show(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    picture.src = slide.src;
    picture.alt = slide.alt;
    picture.removeAttribute('width');
    picture.removeAttribute('height');
    caption.textContent = 'Demo版本，具体功能与体验以上线版本为准。';
    trigger.setAttribute('aria-label', '放大：' + slide.caption);
    controls.querySelector('span').textContent = (current + 1) + ' / ' + slides.length;
  }
  buttons[0].onclick = () => show(current - 1);
  buttons[1].onclick = () => show(current + 1);
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  show(0);
})();
