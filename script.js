/* ============================================================
   ROMANTIC APOLOGY WEBSITE — JAVASCRIPT
   ============================================================

   CUSTOMIZATION SECTION
   Edit the CONFIG object below to personalize your website.
   ============================================================ */

const CONFIG = {
  // --- Colors (applied as CSS custom properties) ---
  colors: {
    deepRed: '#8b1538',
    romanticRed: '#c41e3a',
    softPink: '#f4a7b9',
    blush: '#ffd6e0',
    dark: '#0d0a0b',
  },

  // --- Opening screen text ---
  opening: {
    title: "I'm Sorry ❤️",
    subtitle: 'For hurting you, for the moments I wish I could change...',
    buttonText: 'Open My Heart ❤️',
  },

  // --- Section 2: Apology lines (revealed one at a time) ---
  apologyLines: [
    "I'm sorry for hurting you.",
    'I know I made a mistake.',
    'I wish I could take back the moments that hurt you.',
    "I won't do it again.",
    "I'll keep my promise.",
    'And I will never intentionally hurt you again.',
  ],

  // --- Section 3: Photo gallery ---
  // Add or remove photo paths here. The gallery adapts automatically.
  photos: [
  'images/photo1.jpeg',
  'images/photo2.jpeg',
  'images/photo3.jpeg',
  'images/photo4.jpeg',
  'images/photo5.jpeg',
  'images/photo6.jpeg',
  'images/photo7.jpeg',
  'images/photo8.jpeg',
  'images/photo9.jpeg',
  'images/photo10.jpeg',
  'images/photo11.jpeg',
  'images/photo12.jpeg',
],

  // --- Section 4: Video gallery ---
  // Add more entries here whenever you add video files to the videos folder.
  videos: [
  { src: 'videos/video1.mp4', title: 'Video 1' },
  { src: 'videos/video2.mp4', title: 'Video 2' },
  { src: 'videos/video3.mp4', title: 'Video 3' },
  { src: 'videos/video4.mp4', title: 'Video 4' },
  { src: 'videos/video5.mp4', title: 'Video 5' },
  { src: 'videos/video6.mp4', title: 'Video 6' },
],

  placeholderText: 'Your Memory ❤️',

  // --- Section 5: Memory message ---
  memoryMessage: {
    line1: 'Every memory with you means more to me than I can explain.',
    line2: "Even the smallest moments became memories I'll always carry with me.",
  },

  // --- Section 6: Promise text ---
  promiseText: [
    "I can't change what happened,",
    'but I can change what happens next.',
    'I promise to learn from my mistakes.',
    'I promise to be more careful with your heart.',
    'I promise to communicate instead of hurting.',
    'I promise to think before I act.',
    'I promise to keep my word.',
    'And most importantly...',
    'I promise I will never intentionally hurt you again.',
  ],

  // --- Section 7: Deep apology lines ---
  deepApologyLines: [
    "I'm sorry for the moments I made you feel hurt.",
    "I'm sorry for the things I wish I could take back.",
    "I'm sorry for not realizing the impact of my actions.",
    "I can't erase the past.",
    'But I can make sure I learn from it.',
  ],

  // --- Section 8: Final message ---
  finalTitle: "I Don't Want To Hurt You Again ❤️",
  finalText: [
    "I don't expect everything to be fixed with a webpage or a few words.",
    'I just wanted you to know that I truly mean my apology.',
    "I'm sorry for hurting you.",
    "I'm sorry for making you feel bad.",
    'I promise to learn.',
    'I promise to do better.',
    'And I promise...',
    'I will never intentionally hurt you again.',
  ],

  // --- Section 9: One more thing message ---
  oneMoreMessage: [
    'Thank you for reading this.',
    "Whatever happens, I'll always be grateful for the memories we've shared.",
    "I'm sorry.",
    'And I mean it. ❤️',
  ],

  // --- Background music path ---
  musicPath: 'audio/background-music.mp3',

  // --- Animation timing (milliseconds) ---
  timing: {
    apologyLineDelay: 1200,
    deepApologyDelay: 1000,
    finalTextDelay: 800,
    promiseLineDelay: 400,
  },

  // --- Floating hearts emojis ---
  heartEmojis: ['❤️', '💕', '💗', '💖', '💓'],
};

/* ============================================================
   END CUSTOMIZATION — Do not edit below unless you know JS
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Apply custom colors
function applyColors() {
  const root = document.documentElement;
  root.style.setProperty('--color-deep-red', CONFIG.colors.deepRed);
  root.style.setProperty('--color-romantic-red', CONFIG.colors.romanticRed);
  root.style.setProperty('--color-soft-pink', CONFIG.colors.softPink);
  root.style.setProperty('--color-blush', CONFIG.colors.blush);
  root.style.setProperty('--color-dark', CONFIG.colors.dark);
}

// --- Utility ---
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

/* ============================================================
   OPENING SCREEN
   ============================================================ */
function initOpeningScreen() {
  const openingScreen = document.getElementById('opening-screen');
  const mainContent = document.getElementById('main-content');
  const openBtn = document.getElementById('open-heart-btn');
  const openingHearts = document.getElementById('opening-hearts');

  // Floating hearts around opening
  if (!prefersReducedMotion) {
    const emojis = CONFIG.heartEmojis;
    for (let i = 0; i < 12; i++) {
      const heart = createElement('span', 'opening-heart-float', emojis[i % emojis.length]);
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.setProperty('--size', `${14 + Math.random() * 16}px`);
      heart.style.setProperty('--dur', `${4 + Math.random() * 4}s`);
      heart.style.setProperty('--del', `${Math.random() * 3}s`);
      openingHearts.appendChild(heart);
    }
  }

  // Opening particles canvas
  initParticlesCanvas('opening-particles');

  openBtn.addEventListener('click', () => {
    openingScreen.classList.add('fade-out');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('visible');
    document.body.style.overflow = '';
    initApologyLines();

    setTimeout(() => {
      openingScreen.style.display = 'none';
    }, prefersReducedMotion ? 100 : 1200);
  });

  document.body.style.overflow = 'hidden';
}

/* ============================================================
   PARTICLE CANVAS (Opening & Memory sections)
   ============================================================ */
function initParticlesCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function createParticles(count) {
    particles = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function animate() {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.02;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(244, 167, 185, ${alpha})`;
      ctx.fill();
    });

    animationId = requestAnimationFrame(animate);
  }

  resize();
  createParticles(60);
  animate();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animationId);
    resize();
    createParticles(60);
    animate();
  });
}

/* ============================================================
   SECTION 2: APOLOGY LINES
   ============================================================ */
async function initApologyLines() {
  const container = document.getElementById('apology-lines');
  if (!container || container.dataset.initialized) return;
  container.dataset.initialized = 'true';

  CONFIG.apologyLines.forEach((text) => {
    container.appendChild(createElement('p', 'apology-line', text));
  });

  const lines = container.querySelectorAll('.apology-line');
  const delayMs = prefersReducedMotion ? 0 : CONFIG.timing.apologyLineDelay;

  for (const line of lines) {
    await delay(delayMs);
    line.classList.add('visible');
  }
}

/* ============================================================
   SECTION 3: PHOTO GALLERY
   ============================================================ */
const galleryState = {
  photos: [],
  currentIndex: 0,
};

// Masonry layout patterns for varied sizes
const layoutPatterns = [
  { span: 4, row: 2, rotation: -1 },
  { span: 4, row: 1, rotation: 1 },
  { span: 4, row: 2, rotation: -0.5 },
  { span: 5, row: 1, rotation: 0.5 },
  { span: 3, row: 2, rotation: 1 },
  { span: 4, row: 1, rotation: -1 },
  { span: 5, row: 2, rotation: 0.5 },
  { span: 3, row: 1, rotation: -0.5 },
  { span: 4, row: 2, rotation: 1 },
  { span: 4, row: 1, rotation: -1 },
  { span: 4, row: 2, rotation: 0.5 },
  { span: 4, row: 1, rotation: -0.5 },
];

function initPhotoGallery() {
  const gallery = document.getElementById('photo-gallery');
  if (!gallery) return;

  galleryState.photos = CONFIG.photos.map((src, index) => ({
    src,
    index,
    loaded: false,
    failed: false,
  }));

  CONFIG.photos.forEach((src, index) => {
    const pattern = layoutPatterns[index % layoutPatterns.length];
    const item = createElement('div', 'gallery-item');
    item.setAttribute('role', 'listitem');
    item.style.setProperty('--rotation', `${pattern.rotation}deg`);

    if (pattern.span <= 4) item.classList.add(`gallery-item--span-${pattern.span}`);
    else if (pattern.span === 5) item.classList.add('gallery-item--span-5');
    else item.classList.add(`gallery-item--span-${Math.min(pattern.span, 8)}`);

    if (pattern.row === 2) item.classList.add('gallery-item--row-2');
    if (pattern.row === 3) item.classList.add('gallery-item--row-3');

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Memory ${index + 1}`;
    img.loading = 'lazy';

    img.addEventListener('load', () => {
      galleryState.photos[index].loaded = true;
    });

    img.addEventListener('error', () => {
      galleryState.photos[index].failed = true;
      img.remove();
      item.classList.add('gallery-item--placeholder');
      item.innerHTML = `
        <span class="placeholder-icon">❤️</span>
        <span class="placeholder-text">${CONFIG.placeholderText}</span>
      `;
    });

    if (!item.classList.contains('gallery-item--placeholder')) {
      item.appendChild(img);
    }

    item.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(item);
  });
}

/* ============================================================
   SECTION 4: VIDEO GALLERY
   ============================================================ */
function initVideoGallery() {
  const gallery = document.getElementById('video-gallery');
  if (!gallery) return;

  gallery.innerHTML = '';

  CONFIG.videos.forEach((video, index) => {
    const card = createElement('div', 'video-card');
    card.setAttribute('role', 'listitem');

    const mediaWrap = createElement('div', 'video-media-wrap');
    const videoEl = document.createElement('video');
    const title = video.title || `Video ${index + 1}`;

    videoEl.src = video.src;
    videoEl.title = title;
    videoEl.autoplay = true;
    videoEl.controls = true;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('autoplay', 'true');
    videoEl.setAttribute('playsinline', 'true');
    videoEl.setAttribute('webkit-playsinline', 'true');
    videoEl.setAttribute('muted', 'true');
    videoEl.setAttribute('controls', 'true');
    videoEl.preload = 'auto';
    videoEl.volume = 0;
    videoEl.controlsList = 'nodownload noplaybackrate';

    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.volume = 0;

    videoEl.addEventListener('loadedmetadata', () => {
      videoEl.muted = true;
      videoEl.volume = 0;
    });

    videoEl.addEventListener('volumechange', () => {
      if (!videoEl.muted || videoEl.volume !== 0) {
        videoEl.muted = true;
        videoEl.volume = 0;
      }
    });

    videoEl.addEventListener('play', () => {
      videoEl.muted = true;
      videoEl.volume = 0;
    });

    const playBadge = createElement('div', 'video-play-badge', '▶');
    mediaWrap.appendChild(videoEl);
    mediaWrap.appendChild(playBadge);

    card.appendChild(mediaWrap);
    gallery.appendChild(card);
  });

  initVideoAutoplay();
}

function initVideoAutoplay() {
  const videos = [...document.querySelectorAll('#video-gallery video')];
  if (!videos.length) return;

  let activeVideo = null;

  function pauseVideo(video) {
    if (video && !video.paused) {
      video.pause();
    }
    video.muted = true;
    video.volume = 0;
  }

  function playVideo(video) {
    if (!video) return;

    if (activeVideo && activeVideo !== video) {
      pauseVideo(activeVideo);
    }

    activeVideo = video;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => {});
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        playVideo(video);
      } else {
        pauseVideo(video);
        if (activeVideo === video) {
          activeVideo = null;
        }
      }
    });
  }, {
    threshold: [0.2, 0.5],
    rootMargin: '0px 0px -5% 0px',
  });

  videos.forEach((video) => {
    video.setAttribute('autoplay', 'true');
    video.setAttribute('muted', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.muted = true;
    video.volume = 0;
    video.defaultMuted = true;

    observer.observe(video);
  });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxPlaceholder = document.getElementById('lightbox-placeholder');
  const counter = document.getElementById('lightbox-counter');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  function showPhoto(index) {
    galleryState.currentIndex = index;
    const photo = galleryState.photos[index];
    counter.textContent = `${index + 1} / ${galleryState.photos.length}`;

    if (photo.failed) {
      lightboxImg.classList.add('hidden');
      lightboxPlaceholder.classList.remove('hidden');
    } else {
      lightboxPlaceholder.classList.add('hidden');
      lightboxImg.classList.remove('hidden');
      lightboxImg.src = photo.src;
      lightboxImg.alt = `Memory ${index + 1}`;
    }
  }

  window.openLightbox = function (index) {
    showPhoto(index);
    lightbox.classList.remove('hidden');
    requestAnimationFrame(() => lightbox.classList.add('active'));
    document.body.style.overflow = 'hidden';
  };

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => lightbox.classList.add('hidden'), 400);
  }

  function navigate(direction) {
    let newIndex = galleryState.currentIndex + direction;
    if (newIndex < 0) newIndex = galleryState.photos.length - 1;
    if (newIndex >= galleryState.photos.length) newIndex = 0;
    showPhoto(newIndex);
  }

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

/* ============================================================
   FLOATING HEARTS (Global background)
   ============================================================ */
function initFloatingHearts() {
  if (prefersReducedMotion) return;

  const container = document.getElementById('floating-hearts');
  const emojis = CONFIG.heartEmojis;

  function spawnHeart() {
    const heart = createElement('span', 'floating-heart', emojis[Math.floor(Math.random() * emojis.length)]);
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--heart-size', `${12 + Math.random() * 14}px`);
    heart.style.setProperty('--duration', `${6 + Math.random() * 6}s`);
    heart.style.setProperty('--delay', `${Math.random() * 2}s`);
    heart.style.setProperty('--heart-opacity', `${0.3 + Math.random() * 0.4}`);
    heart.style.setProperty('--rotation', `${-30 + Math.random() * 60}deg`);
    container.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());
  }

  setInterval(spawnHeart, 800);
}

/* ============================================================
   INTERSECTION OBSERVER — Scroll animations
   ============================================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });

  // Memory message section
  const memorySection = document.getElementById('memory-message');
  if (memorySection) {
    const memoryObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          memoryObserver.unobserve(entry.target);
          initParticlesCanvas('memory-particles');

          const line1 = entry.target.querySelector('.memory-line--1');
          const line2 = entry.target.querySelector('.memory-line--2');

          if (line1) {
            line1.textContent = CONFIG.memoryMessage.line1;
            await delay(prefersReducedMotion ? 0 : 300);
            line1.classList.add('visible');
          }
          if (line2) {
            line2.textContent = CONFIG.memoryMessage.line2;
            await delay(prefersReducedMotion ? 0 : 1200);
            line2.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.3 });

    memoryObserver.observe(memorySection);
  }

  // Promise card
  const promiseSection = document.getElementById('my-promise');
  if (promiseSection) {
    const promiseObserver = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          promiseObserver.unobserve(entry.target);
          const card = entry.target.querySelector('.promise-card');
          const textContainer = document.getElementById('promise-text');

          if (textContainer && !textContainer.dataset.filled) {
            textContainer.dataset.filled = 'true';
            CONFIG.promiseText.forEach((text, i) => {
              const p = createElement('p', i >= CONFIG.promiseText.length - 2 ? 'emphasis' : '', text);
              textContainer.appendChild(p);
            });
          }

          await delay(prefersReducedMotion ? 0 : 200);
          card.classList.add('visible');

          const lines = textContainer.querySelectorAll('p');
          for (const line of lines) {
            await delay(prefersReducedMotion ? 0 : CONFIG.timing.promiseLineDelay);
            line.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.25 });

    promiseObserver.observe(promiseSection);
  }

  // Deep apology section
  const deepSection = document.getElementById('the-apology');
  if (deepSection) {
    const deepObserver = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          deepObserver.unobserve(entry.target);
          const container = document.getElementById('apology-deep-lines');

          if (container && !container.dataset.filled) {
            container.dataset.filled = 'true';
            CONFIG.deepApologyLines.forEach((text, i) => {
              const isEmphasis = i >= CONFIG.deepApologyLines.length - 2;
              container.appendChild(createElement('p', `apology-deep-line${isEmphasis ? ' emphasis' : ''}`, text));
            });
          }

          const lines = container.querySelectorAll('.apology-deep-line');
          for (const line of lines) {
            await delay(prefersReducedMotion ? 0 : CONFIG.timing.deepApologyDelay);
            line.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.3 });

    deepObserver.observe(deepSection);
  }

  // Final message section
  const finalSection = document.getElementById('final-message');
  if (finalSection) {
    const finalObserver = new IntersectionObserver(async (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          finalObserver.unobserve(entry.target);

          const title = entry.target.querySelector('.final-title');
          if (title) title.textContent = CONFIG.finalTitle;

          const textContainer = document.getElementById('final-text');
          if (textContainer && !textContainer.dataset.filled) {
            textContainer.dataset.filled = 'true';
            CONFIG.finalText.forEach((text, i) => {
              const isEmphasis = i >= CONFIG.finalText.length - 3;
              textContainer.appendChild(createElement('p', isEmphasis ? 'emphasis' : '', text));
            });
          }

          const lines = textContainer.querySelectorAll('p');
          for (const line of lines) {
            await delay(prefersReducedMotion ? 0 : CONFIG.timing.finalTextDelay);
            line.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.25 });

    finalObserver.observe(finalSection);
  }
}

/* ============================================================
   SECTION 9: ONE MORE THING
   ============================================================ */
function initOneMoreThing() {
  const btn = document.getElementById('one-more-btn');
  const message = document.getElementById('one-more-message');

  if (!btn || !message) return;

  // Populate message from config
  message.innerHTML = CONFIG.oneMoreMessage.map((text) => `<p>${text}</p>`).join('');

  btn.addEventListener('click', () => {
    message.classList.remove('hidden');
    requestAnimationFrame(() => message.classList.add('show'));
    btn.style.opacity = '0.5';
    btn.style.pointerEvents = 'none';
  });
}

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
function initMusic() {
  const musicBtn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  const playIcon = musicBtn.querySelector('.music-icon--play');
  const pauseIcon = musicBtn.querySelector('.music-icon--pause');

  audio.src = CONFIG.musicPath;
  audio.load();

  audio.addEventListener('error', () => {
    musicBtn.classList.add('unavailable');
    musicBtn.title = 'Add background-music.mp3 to the audio folder';
  });

  musicBtn.addEventListener('click', async () => {
    if (musicBtn.classList.contains('unavailable')) return;

    try {
      if (audio.paused) {
        await audio.play();
        musicBtn.classList.add('playing');
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
      } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      }
    } catch {
      musicBtn.classList.add('unavailable');
      musicBtn.title = 'Could not play music — add audio/background-music.mp3';
    }
  });
}

/* ============================================================
   INITIALIZE EVERYTHING
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  applyColors();
  initOpeningScreen();
  initPhotoGallery();
  initVideoGallery();
  initLightbox();
  initFloatingHearts();
  initScrollAnimations();
  initOneMoreThing();
  initMusic();
});
