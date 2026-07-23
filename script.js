function contatoAlert() {
  if (confirm('Site de demonstração! Entre em contato no WhatsApp do programador para mais informações.')) {
    window.open('https://wa.me/551162759260?text=' + encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.'), '_blank');
  }
}

function redirecionarWhatsApp() {
  if (confirm('Site de demonstração! Entre em contato no WhatsApp do programador para mais informações.')) {
    window.open('https://wa.me/5511962759260?text=' + encodeURIComponent('Olá! Vim pelo site e gostaria de mais informações.'), '_blank');
  }
}

/* Vídeos */
const sections = document.querySelectorAll('.video-section');
const totalSections = sections.length;
let currentSection = 0;
let startX = 0;
let isDragging = false;

function goToSection(index) {
  if (index < 0 || index >= totalSections) return;
  currentSection = index;
  wrapper.style.transform = `translateX(-${currentSection * 100}vw)`;
  updateArrows();
  updateTheme();
}

function updateArrows() {
  document.querySelector('.swipe-left').classList.toggle('hidden', currentSection === 0);
  document.querySelector('.swipe-right').classList.toggle('hidden', currentSection === totalSections - 1);
}

/* Cores por tema */
const themeColors = {
  pink: '#ff6b9d',
  gold: '#d4a5ff',
  lilac: '#b76eff',
  mint: '#6effd4',
  rose: '#ff9a9e'
};

function updateTheme() {
  const theme = sections[currentSection].dataset.theme;
  const color = themeColors[theme];
  const btn = document.querySelector('.contato-btn');
  btn.style.borderColor = color;
  btn.style.color = color;
  btn.onmouseover = function() { this.style.background = color; this.style.color = theme === 'mint' ? '#000' : '#fff'; };
  btn.onmouseout = function() { this.style.background = 'transparent'; this.style.color = color; };
}

/* Drag vídeos - move o wrapper inteiro */
const wrapper = document.getElementById('videosWrapper');
let dragOffset = 0;

wrapper.addEventListener('mousedown', e => {
  isDragging = true;
  startX = e.clientX;
  dragOffset = 0;
  wrapper.style.transition = 'none';
});
wrapper.addEventListener('mousemove', e => {
  if (!isDragging) return;
  dragOffset = e.clientX - startX;
  const percent = (dragOffset / window.innerWidth) * 100;
  wrapper.style.transform = `translateX(${-currentSection * 100 + percent}vw)`;
});
wrapper.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  wrapper.style.transition = 'transform 0.5s ease';
  if (Math.abs(dragOffset) > 80) {
    if (dragOffset < 0 && currentSection < totalSections - 1) currentSection++;
    else if (dragOffset > 0 && currentSection > 0) currentSection--;
  }
  goToSection(currentSection);
});
wrapper.addEventListener('mouseleave', () => {
  if (!isDragging) return;
  isDragging = false;
  wrapper.style.transition = 'transform 0.5s ease';
  goToSection(currentSection);
});

/* Touch drag vídeos */
wrapper.addEventListener('touchstart', e => {
  isDragging = true;
  startX = e.touches[0].clientX;
  dragOffset = 0;
  wrapper.style.transition = 'none';
}, { passive: true });
wrapper.addEventListener('touchmove', e => {
  if (!isDragging) return;
  dragOffset = e.touches[0].clientX - startX;
  const percent = (dragOffset / window.innerWidth) * 100;
  wrapper.style.transform = `translateX(${-currentSection * 100 + percent}vw)`;
}, { passive: true });
wrapper.addEventListener('touchend', e => {
  if (!isDragging) return;
  isDragging = false;
  wrapper.style.transition = 'transform 0.5s ease';
  if (Math.abs(dragOffset) > 50) {
    if (dragOffset < 0 && currentSection < totalSections - 1) currentSection++;
    else if (dragOffset > 0 && currentSection > 0) currentSection--;
  }
  goToSection(currentSection);
});

/* Galeria */
const galState = {};

function abrirGaleria(id) {
  const modal = document.getElementById(id);
  modal.classList.add('active');
  if (!galState[id]) galState[id] = { index: 0 };
  updateGaleria(id);
}

function fecharGaleria(id) {
  document.getElementById(id).classList.remove('active');
}

function galNext(id) {
  const items = document.querySelectorAll(`#${id} .galeria-item`);
  galState[id].index = (galState[id].index + 1) % items.length;
  updateGaleria(id);
}

function galPrev(id) {
  const items = document.querySelectorAll(`#${id} .galeria-item`);
  galState[id].index = (galState[id].index - 1 + items.length) % items.length;
  updateGaleria(id);
}

function updateGaleria(id) {
  const modal = document.getElementById(id);
  const track = modal.querySelector('.galeria-track');
  const items = modal.querySelectorAll('.galeria-item');
  const counter = modal.querySelector('.galeria-counter');
  const gap = window.innerWidth * 0.6;
  const offset = galState[id].index * (items[0].offsetWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
  counter.textContent = `${galState[id].index + 1} / ${items.length}`;
  modal.querySelector('.swipe-left-gal').classList.toggle('hidden', galState[id].index === 0);
  modal.querySelector('.swipe-right-gal').classList.toggle('hidden', galState[id].index === items.length - 1);
}

/* Drag galeria */
document.querySelectorAll('.galeria-modal').forEach(modal => {
  const id = modal.id;
  let galStartX = 0;
  let galDragging = false;
  let galDragOffset = 0;
  const track = modal.querySelector('.galeria-track');

  modal.addEventListener('mousedown', e => {
    if (e.target.closest('.galeria-close') || e.target.closest('.swipe-arrow-gal')) return;
    galDragging = true;
    galStartX = e.clientX;
    galDragOffset = 0;
    track.style.transition = 'none';
  });
  modal.addEventListener('mousemove', e => {
    if (!galDragging) return;
    galDragOffset = e.clientX - galStartX;
    const gap = window.innerWidth * 0.6;
    const baseOffset = galState[id].index * (items[0].offsetWidth + gap);
    const offset = baseOffset - galDragOffset;
    track.style.transform = `translateX(-${offset}px)`;
  });
  modal.addEventListener('mouseup', e => {
    if (!galDragging) return;
    galDragging = false;
    track.style.transition = 'transform 0.4s ease';
    const items = modal.querySelectorAll('.galeria-item');
    if (Math.abs(galDragOffset) > 60) {
      if (galDragOffset < 0 && galState[id].index < items.length - 1) galState[id].index++;
      else if (galDragOffset > 0 && galState[id].index > 0) galState[id].index--;
    }
    updateGaleria(id);
  });
  modal.addEventListener('mouseleave', () => {
    if (!galDragging) return;
    galDragging = false;
    track.style.transition = 'transform 0.4s ease';
    updateGaleria(id);
  });

  modal.addEventListener('touchstart', e => {
    if (e.target.closest('.galeria-close') || e.target.closest('.swipe-arrow-gal')) return;
    galDragging = true;
    galStartX = e.touches[0].clientX;
    galDragOffset = 0;
    track.style.transition = 'none';
  }, { passive: true });
  modal.addEventListener('touchmove', e => {
    if (!galDragging) return;
    galDragOffset = e.touches[0].clientX - galStartX;
    const gap = window.innerWidth * 0.6;
    const baseOffset = galState[id].index * (items[0].offsetWidth + gap);
    const offset = baseOffset - galDragOffset;
    track.style.transform = `translateX(-${offset}px)`;
  }, { passive: true });
  modal.addEventListener('touchend', e => {
    if (!galDragging) return;
    galDragging = false;
    track.style.transition = 'transform 0.4s ease';
    const items = modal.querySelectorAll('.galeria-item');
    if (Math.abs(galDragOffset) > 50) {
      if (galDragOffset < 0 && galState[id].index < items.length - 1) galState[id].index++;
      else if (galDragOffset > 0 && galState[id].index > 0) galState[id].index--;
    }
    updateGaleria(id);
  });
});

/* Init */
updateArrows();
updateTheme();