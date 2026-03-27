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

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').replace(/^\.\//, '');
  const allLinks = navMenu?.querySelectorAll('.navbar__link');
  if (allLinks) {
    allLinks.forEach(l => l.classList.remove('active'));
    allLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }
})();

// -------- PIZZASTORE: gerencia carrinho e pedidos --------
const PizzaStore = {

  // --- CARRINHO ---
  getCart() {
    return JSON.parse(localStorage.getItem('vuotaPizzaCart') || '[]');
  },
  saveCart(cart) {
    localStorage.setItem('vuotaPizzaCart', JSON.stringify(cart));
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
    localStorage.removeItem('vuotaPizzaCart');
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
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  },

  // --- PEDIDOS ---
  getPedidos() {
    return JSON.parse(localStorage.getItem('vuotaPizzaPedidos') || '[]');
  },
  savePedido(pedido) {
    const pedidos = this.getPedidos();
    pedido.id = pedidos.length === 0 ? 11 : Number(pedidos[0].id) + 1
    pedido.dataCriacao = new Date().toISOString();
    pedido.status = 'preparando';
    pedido.previsaoEntrega = this.calcularPrevisao();
    pedidos.unshift(pedido);
    localStorage.setItem('vuotaPizzaPedidos', JSON.stringify(pedidos));
    this.clearCart();
    this.updateOrdersBadge();
    return pedido;
  },
  calcularPrevisao() {
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() + 35 + Math.floor(Math.random() * 10));
    return agora.toISOString();
  },
  updatePedido(pedido) {
    let pedidos = this.getPedidos();
    const pedidoIndex = pedidos.findIndex(({id}) => id === pedido.id)
    if (pedidoIndex !== -1){
      pedidos[pedidoIndex] = pedido
      localStorage.setItem('vuotaPizzaPedidos', JSON.stringify(pedidos))
      this.updateOrdersBadge();
    }
  },
  updateOrdersBadge() {
    const badge = document.getElementById('ordersBadge');
    if (badge) {
      const count = this.getPedidos().filter(p => p.status !== 'entregue').length;
      if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
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

// Atualiza badge do carrinho em todas as páginas
document.addEventListener('DOMContentLoaded', () => {
  PizzaStore.updateCartBadge();
  PizzaStore.updateOrdersBadge();
});
