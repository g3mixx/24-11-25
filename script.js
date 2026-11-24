'use strict';
const intro = document.querySelector('#intro');
const letter = document.querySelector('#letter');
const open = document.querySelector('#open');
const close = document.querySelector('#close');
const song = document.querySelector('#song');
const toggle = document.querySelector('#toggle');
let opening = false;
function syncMusic() {
  toggle.textContent = song.paused ? '▶' : 'Ⅱ';
  toggle.setAttribute('aria-label', song.paused ? 'Reproducir música' : 'Pausar música');
}
function play() { song.play().catch(syncMusic); }
open.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  // Start synchronously in the tap handler for iOS Safari autoplay policies.
  play();
  open.classList.add('opening');
  window.setTimeout(() => {
    intro.hidden = true;
    letter.hidden = false;
    window.scrollTo(0, 0);
    document.querySelector('#heading').focus({preventScroll:true});
    syncMusic();
  }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 30 : 1050);
});
toggle.addEventListener('click', () => { if (song.paused) play(); else song.pause(); });
for (const event of ['play','pause','ended','error']) song.addEventListener(event, syncMusic);
close.addEventListener('click', () => {
  song.pause(); song.currentTime = 0;
  letter.hidden = true; intro.hidden = false;
  open.classList.remove('opening'); opening = false;
  window.scrollTo(0,0); open.focus({preventScroll:true});
});
