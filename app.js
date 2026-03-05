/* ============================================
   Incluam este script em TODAS as páginas
   ============================================ */

// -------- NAVBAR: scroll effect + hamburger --------
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu?.classList.toggle('open');
  });

  navMenu?.querySelectorAll('.navbar__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navMenu?.querySelectorAll('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      navMenu.querySelectorAll('.navbar__link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
})();

// -------- PIZZASTORE: gerencia carrinho e pedidos --------
const PizzaStore = {

  // --- CARRINHO ---
  getCart() {
    return JSON.parse(localStorage.getItem('bellaPizzaCart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('bellaPizzaCart', JSON.stringify(cart));
  },
  addToCart(item) {
    const cart = this.getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantidade += item.quantidade || 1;
    } else {
      cart.push({ ...item, quantidade: item.quantidade || 1 });
    }
    this.saveCart(cart);
    this.updateCartBadge();
  },
  removeFromCart(itemId) {
    const cart = this.getCart().filter(i => i.id !== itemId);
    this.saveCart(cart);
    this.updateCartBadge();
  },
  clearCart() {
    localStorage.removeItem('bellaPizzaCart');
    this.updateCartBadge();
  },
  getCartTotal() {
    return this.getCart().reduce((sum, i) => sum + (i.preco * i.quantidade), 0);
  },
  updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      const count = this.getCart().reduce((sum, i) => sum + i.quantidade, 0);
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  },

  // --- PEDIDOS ---
  getPedidos() {
    return JSON.parse(localStorage.getItem('bellaPizzaPedidos') || '[]');
  },
  savePedido(pedido) {
    const pedidos = this.getPedidos();
    pedido.id = 'PED-' + Date.now();
    pedido.dataCriacao = new Date().toISOString();
    pedido.status = 'Aguardando confirmação';
    pedido.previsaoEntrega = this.calcularPrevisao();
    pedidos.unshift(pedido);
    localStorage.setItem('bellaPizzaPedidos', JSON.stringify(pedidos));
    this.clearCart();
    return pedido;
  },
  calcularPrevisao() {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 35 + Math.floor(Math.random() * 10));
    return agora.toISOString();
  }
};

// -------- FORMATTERS: formatação de dados --------
const Formatters = {
  moeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  },
  dataHora(isoString) {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short'
    }).format(new Date(isoString));
  },
  horaSimples(isoString) {
    return new Intl.DateTimeFormat('pt-BR', {
      timeStyle: 'short'
    }).format(new Date(isoString));
  }
};

// Expõe globalmente para todas as telas usarem
window.PizzaStore = PizzaStore;
window.Formatters = Formatters;


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

