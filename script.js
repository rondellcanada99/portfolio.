/* ===== Mobile menu ===== */
const links = document.getElementById('links');
document.getElementById('burger').addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ===== Highlight current section in navbar ===== */
const navAnchors = [...links.querySelectorAll('a')];
const spy = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
navAnchors.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

/* ===== Skill cards: the hovered / tapped card turns orange ===== */
const skills = document.querySelectorAll('.skill');
skills.forEach(c => ['mouseenter', 'click'].forEach(ev => c.addEventListener(ev, () => {
  skills.forEach(x => x.classList.remove('active'));
  c.classList.add('active');
})));




/* ===== Copy email ===== */
document.getElementById('copyEmail').addEventListener('click', e => {
  navigator.clipboard.writeText(document.getElementById('email').textContent).then(() => {
    e.target.textContent = 'Copied!';
    setTimeout(() => e.target.textContent = 'Copy', 1500);
  });
});

/* ===== Contact form: opens the visitor's email app ===== */
const MY_EMAIL = 'youremail@gmail.com';   // <-- change this
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\n\n${f.get('message')}`;
  location.href = `mailto:${MY_EMAIL}?subject=${encodeURIComponent(f.get('subject'))}&body=${encodeURIComponent(body)}`;
});

document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Soft reveal on scroll ===== */
const els = document.querySelectorAll('.skill, .shot, .log, .cert, .q');
els.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(en => en.forEach(x => {
  if (x.isIntersecting) { x.target.classList.add('show'); io.unobserve(x.target); }
}), { threshold: .1 });
els.forEach(el => io.observe(el));
