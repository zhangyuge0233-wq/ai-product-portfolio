(() => {
  const gallery = document.querySelector('#qiju .media');
  const trigger = gallery.querySelector('button');
  const image = trigger.querySelector('img');
  const slides = [
    ['assets/qiju-home.jpg','栖居首页',''],
    ['assets/qiju-room-original.jpg','房间原始照片','原始照片'],
    ['assets/qiju-room-reference.jpg','房间软装效果参考，来自外部工具','效果参考 · 外部工具示例']
  ];
  let index = 0;
  const stage = document.createElement('div'); stage.className = 'gallery-stage qiju-gallery';
  trigger.before(stage); stage.append(trigger);
  const controls = document.createElement('div'); controls.className = 'gallery-controls';
  controls.innerHTML = '<button type="button" aria-label="栖居上一张图片">‹</button><span class="gallery-count" aria-live="polite"></span><button type="button" aria-label="栖居下一张图片">›</button>';
  stage.append(controls);
  const caption = document.createElement('figcaption'); gallery.append(caption);
  function show(next) {
    index = (next + slides.length) % slides.length;
    image.src = slides[index][0]; image.alt = slides[index][1];
    trigger.setAttribute('aria-label','放大：' + slides[index][1]);
    caption.textContent = slides[index][2]; caption.hidden = !slides[index][2];
    controls.querySelector('span').textContent = (index + 1) + ' / ' + slides.length;
  }
  const buttons = controls.querySelectorAll('button');
  buttons[0].onclick = () => show(index - 1); buttons[1].onclick = () => show(index + 1);
  stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(index+(e.key==='ArrowLeft'?-1:1))}});
  show(0);
})();
