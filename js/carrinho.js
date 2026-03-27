const Carrinho = {

  init() {
    this.setupListeners();
    this.render();
    PizzaStore.updateCartBadge();
  },

  setupListeners() {
    document.getElementById('finalizarBtn')?.addEventListener('click', () => this.finalizarPedido());

    const cepInput = document.getElementById('endCep');
    cepInput?.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 5) {
        val = val.slice(0, 5) + '-' + val.slice(5, 8);
      }
      e.target.value = val;
    });
  },

  render() {
    const cart = PizzaStore.getCart();
    const emptyEl = document.getElementById('carrinhoEmpty');
    const contentEl = document.getElementById('carrinhoContent');

    if (cart.length === 0) {
      emptyEl.style.display = 'block';
      contentEl.style.display = 'none';
    } else {
      emptyEl.style.display = 'none';
      contentEl.style.display = 'block';
      this.renderItems(cart);
      this.renderSummary(cart);
    }
  },

  renderItems(cart) {
    const listEl = document.getElementById('carrinhoList');
    const countEl = document.getElementById('itemCount');
    const totalItems = cart.reduce((sum, i) => sum + i.quantidade, 0);
    countEl.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;

    const tamanhoLabel = {
      'pequena': 'Pequena (25cm)',
      'media': 'Média (30cm)',
      'grande': 'Grande (35cm)'
    };

    listEl.innerHTML = cart.map(item => `
      <div class="cart-item" data-item-id="${item.id}">
        <img class="cart-item__image" src="${item.imagem}" alt="${item.nome}" />
        <div class="cart-item__info">
          <span class="cart-item__name">${item.nome}</span>
          <div class="cart-item__details">
            <span>${tamanhoLabel[item.tamanho] || item.tamanho}</span>
            <span>${Formatters.moeda(item.preco)} un.</span>
          </div>
          ${item.observacoes ? `<span class="cart-item__obs">Obs: ${item.observacoes}</span>` : ''}
        </div>
        <div class="cart-item__actions">
          <span class="cart-item__price">${Formatters.moeda(item.preco * item.quantidade)}</span>
          <div class="cart-item__controls">
            <button class="cart-qty-btn" data-action="minus" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
            <span class="cart-qty-value">${item.quantidade}</span>
            <button class="cart-qty-btn" data-action="plus" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
            <button class="cart-remove-btn" data-action="remove" data-id="${item.id}" aria-label="Remover item">
              <svg width="16" height="16"><use href="icons.svg#icon-trash"/></svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Event delegation para botões
    listEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        const id = target.dataset.id;
        const action = target.dataset.action;

        if (action === 'minus') this.updateQuantity(id, -1);
        else if (action === 'plus') this.updateQuantity(id, 1);
        else if (action === 'remove') this.removeItem(id);
      });
    });
  },

  renderSummary(cart) {
    const linesEl = document.getElementById('summaryLines');
    const totalEl = document.getElementById('summaryTotal');

    const subtotal = cart.reduce((sum, i) => sum + (i.preco * i.quantidade), 0);
    const totalItems = cart.reduce((sum, i) => sum + i.quantidade, 0);

    linesEl.innerHTML = `
      <div class="summary-line">
        <span>Itens (${totalItems})</span>
        <span class="summary-line__value">${Formatters.moeda(subtotal)}</span>
      </div>
      <div class="summary-line">
        <span>Entrega</span>
        <span class="summary-line__value" style="color: #27AE60">Grátis</span>
      </div>
    `;

    totalEl.textContent = Formatters.moeda(subtotal);
  },

  updateQuantity(itemId, delta) {
    const cart = PizzaStore.getCart();
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantidade += delta;
    if (item.quantidade <= 0) {
      this.removeItem(itemId);
      return;
    }

    PizzaStore.saveCart(cart);
    PizzaStore.updateCartBadge();
    this.render();
  },

  removeItem(itemId) {
    PizzaStore.removeFromCart(itemId);
    this.showToast('Item removido do carrinho');
    this.render();
  },

  finalizarPedido() {
    document.querySelectorAll('.form-input.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.form-error').forEach(el => el.remove());

    const rua = document.getElementById('endRua').value.trim();
    const numero = document.getElementById('endNumero').value.trim();
    const bairro = document.getElementById('endBairro').value.trim();
    const cep = document.getElementById('endCep').value.trim();

    // Validação
    let valid = true;
    const campos = [
      { id: 'endRua', valor: rua, msg: 'Informe a rua' },
      { id: 'endNumero', valor: numero, msg: 'Informe o número' },
      { id: 'endBairro', valor: bairro, msg: 'Informe o bairro' },
      { id: 'endCep', valor: cep, msg: 'Informe o CEP' }
    ];

    campos.forEach(c => {
      if (!c.valor) {
        valid = false;
        const input = document.getElementById(c.id);
        input.classList.add('error');
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = c.msg;
        input.parentNode.appendChild(errorEl);
      }
    });

    if (!valid) {
      this.showToast('Preencha todos os campos de endereço', true);
      return;
    }

    const cart = PizzaStore.getCart();
    if (cart.length === 0) return;

    const endereco = {
      rua: rua,
      numero: numero,
      Bairro: bairro,
      CEP: cep.replace(/\D/g, '')
    };

    const agora = new Date();
    const dataPedido = agora.toLocaleDateString('pt-BR') + ' ' +
      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const total = cart.reduce((sum, i) => sum + (i.preco * i.quantidade), 0);

    const pedido = {
      items: cart.map(item => ({
        nome: item.nome,
        valor: item.preco,
        quantidade: item.quantidade,
        tamanho: item.tamanho,
        observacoes: item.observacoes || '',
      })),
      endereco: endereco,
      data_pedido: dataPedido,
      total: total.toFixed(2)
    };

    PizzaStore.savePedido(pedido);
    this.showToast('Pedido realizado com sucesso!');

    setTimeout(() => {
      window.location.href = 'pedidos.html';
    }, 1500);
  },

  // UTILS
  showToast(message, isError = false) {
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) {
      toast.style.backgroundColor = '#e74c3c';
    }
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
  }
};

// START
document.addEventListener('DOMContentLoaded', () => {
  Carrinho.init();
});
