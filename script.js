/* =============================================
   script.js — Animated Portfolio JavaScript
   ============================================= */

'use strict';

// ─── 1. Custom Cursor ─────────────────────────
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth trail
function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hover effect on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .skill-card, .project-card, .social-link');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovering'); cursorTrail.classList.add('hovering'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovering'); cursorTrail.classList.remove('hovering'); });
});

// ─── 2. Particle Canvas ───────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let W, H;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', () => { resize(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 2 + 0.5;
    this.vx   = (Math.random() - 0.5) * 0.4;
    this.vy   = (Math.random() - 0.5) * 0.4;
    this.alpha= Math.random() * 0.5 + 0.1;
    this.color= Math.random() > 0.5
      ? `hsla(255, 85%, 75%, ${this.alpha})`
      : `hsla(195, 100%, 70%, ${this.alpha})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.floor((W * H) / 12000);
  particles = Array.from({ length: count }, () => new Particle());
}
initParticles();

function connectParticles() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(255, 85%, 75%, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Mouse interaction with particles
document.addEventListener('mousemove', e => {
  particles.forEach(p => {
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.vx -= dx / dist * 0.3;
      p.vy -= dy / dist * 0.3;
    }
  });
});

// ─── 3. Navbar scroll effect ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
  handleBackToTop();
});

// ─── 4. Active nav link on scroll ─────────────
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

// ─── 5. Hamburger Menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ─── 6. Typewriter Effect ─────────────────────
const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Creative Coder',
  'Open Source Contributor',
  'Problem Solver',
];
const roleEl = document.getElementById('role-text');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  if (deleting) {
    roleEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
    setTimeout(typeRole, 60);
  } else {
    roleEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    setTimeout(typeRole, 80);
  }
}
typeRole();

// ─── 7. Counter Animation ─────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let count = 0;
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = Math.floor(count);
    if (count >= target) clearInterval(timer);
  }, 16);
}

// ─── 8. Scroll Animations (AOS-lite) ──────────
const aosEls = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosEls.forEach(el => aosObserver.observe(el));

// ─── 9. Skill Bar Animation ───────────────────
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

// ─── 10. Counter Observer ─────────────────────
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ─── 11. Dark / Light Theme Toggle ───────────
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'ph ph-sun' : 'ph ph-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Restore saved theme
const saved = localStorage.getItem('theme');
if (saved === 'light') {
  isDark = false;
  document.documentElement.setAttribute('data-theme', 'light');
  themeIcon.className = 'ph ph-moon';
}

// ─── 12. Contact Form ─────────────────────────
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.querySelector('span').textContent = 'Sending…';
  submitBtn.disabled = true;
  setTimeout(() => {
    success.classList.add('show');
    form.reset();
    submitBtn.querySelector('span').textContent = 'Send Message';
    submitBtn.disabled = false;
    setTimeout(() => success.classList.remove('show'), 4000);
  }, 1500);
});

// ─── 13. Back To Top ──────────────────────────
const backToTop = document.getElementById('back-to-top');
function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── 14. Tilt effect on project cards ─────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ─── 15. Ripple effect on buttons ─────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top  - size / 2}px;
      background: white;
      border-radius: 50%;
      opacity: 0.25;
      transform: scale(0);
      animation: ripple-anim 0.6s ease-out forwards;
      pointer-events: none;
    `;
    const style = document.createElement('style');
    style.textContent = `@keyframes ripple-anim { to { transform: scale(3); opacity: 0; } }`;
    document.head.appendChild(style);
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});
