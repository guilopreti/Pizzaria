/* ============================================
   informacoes.js — Lógica específica da Página de Informações
   ============================================ */

// -------- HORÁRIOS: destaque do dia atual e banner de status --------
(function initHours() {
  // Índices de horário por dia da semana (0=Dom, 1=Seg, ..., 6=Sáb)
  // Cada entrada: [horaAbertura, horaFechamento] ou null (fechado)
  const schedule = {
    0: [17.5, 23],   // Domingo
    1: null,         // Segunda (fechado)
    2: [18, 23],     // Terça
    3: [18, 23],     // Quarta
    4: [18, 23],     // Quinta
    5: [18, 24],     // Sexta
    6: [17.5, 24.5], // Sábado
  };

  // Mapeamento: dia da semana JS (0=Dom) → índice da linha na tabela
  const rowIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };

  const now        = new Date();
  const dayOfWeek  = now.getDay();
  const hour       = now.getHours() + now.getMinutes() / 60;
  const sched      = schedule[dayOfWeek];

  // Destaca a linha do dia atual
  const rows = document.querySelectorAll('.hours-item');
  const todayRow = rows[rowIndex[dayOfWeek]];
  if (todayRow) {
    todayRow.classList.add('hours-item--today');
    const badge = todayRow.querySelector('.hours-badge');
    if (badge) badge.style.display = 'inline-block';
  }

  // Banner aberto / fechado
  const banner  = document.getElementById('status-banner');
  const isOpen  = sched !== null && hour >= sched[0] && hour < sched[1];

  if (banner) {
    if (isOpen) {
      banner.classList.add('status-banner--open');
      banner.textContent = '🟢 Estamos abertos agora! Faça seu pedido.';
    } else {
      banner.classList.add('status-banner--closed');
      banner.textContent = '🔴 Estamos fechados agora. Aguarde nosso horário de funcionamento.';
    }
  }
})();

// -------- FAQ ACCORDION --------
(function initFaq() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx    = btn.dataset.faq;
      const answer = document.querySelector(`[data-faq-answer="${idx}"]`);
      const isOpen = btn.classList.contains('open');

      // Fecha todos
      document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));

      // Abre o clicado (se não estava aberto)
      if (!isOpen) {
        btn.classList.add('open');
        answer?.classList.add('open');
      }
    });
  });
})();

// -------- SCROLL ANIMATIONS --------
(function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }),
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-up').forEach(el => observer.observe(el));
})();

