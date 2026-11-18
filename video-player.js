document.querySelectorAll('.video-player').forEach(player => {
  const video = player.querySelector('video');
  const button = player.querySelector('.video-toggle');
  const title = player.closest('#ledger') ? '记账' : '毛毛日记';
  const replay = document.createElement('button');
  replay.type = 'button';
  replay.className = 'video-replay';
  replay.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11a9 9 0 1 1 2.7 6.4"/><path d="M3 4v7h7"/></svg>';
  replay.setAttribute('aria-label', '从头重播' + title + '视频');
  const actions = document.createElement('div');
  actions.className = 'video-actions';
  player.append(actions);
  actions.append(button, replay);
  video.addEventListener('click', () => { if (!video.paused) video.pause(); });
  replay.addEventListener('click', async () => {
    video.currentTime = 0;
    try { await video.play(); } catch { sync(); }
  });
  const sync = () => {
    const playing = !video.paused && !video.ended;
    player.classList.toggle('is-playing', playing);
    button.setAttribute('aria-label', (playing ? '暂停' : '播放') + title + '视频');
    button.setAttribute('aria-pressed', String(playing));
  };
  button.addEventListener('click', async () => {
    if (video.paused || video.ended) {
      try { await video.play(); } catch { sync(); }
    } else video.pause();
  });
  ['play','pause','ended','error'].forEach(event => video.addEventListener(event, sync));
  sync();
});
