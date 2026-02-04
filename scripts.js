// Set current year in footer and initialize UI interactions
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Animate skill bars when they enter the viewport
  const skills = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const fill = el.dataset.fill || '70';
        el.style.width = fill + '%';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  skills.forEach(s => observer.observe(s));

  // Attach contact form handler
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', submitForm);
});

// Simple contact form handler — opens user's mail client as a friendly fallback
function submitForm(e){
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const msgEl = document.getElementById('formMsg');
  if(!name || !email || !message){
    msgEl.textContent = 'Please complete all fields.';
    return false;
  }
  const subject = encodeURIComponent('Contact from website: ' + name);
  const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
  window.location.href = `mailto:tejasai6655@gmail.com?subject=${subject}&body=${body}`;
  msgEl.textContent = 'Opening your email client...';
  form.reset();
  return false;
}