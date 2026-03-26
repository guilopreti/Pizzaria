/* ============================================
   cardapio.js — Lógica da Tela de Cardápio
   ============================================ */

// -------- DADOS DE PIZZAS --------
const imagemPadrão = "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80";

const pizzas = [
  // FRANGO
  {
    id: 1,
    nome: "Frango com Catupiry",
    categoria: "frango",
    descricao: "Frango desfiado, catupiry cremoso e mussarela",
    preco: 38.90,
    imagem: imagemPadrão
  },
  {
    id: 2,
    nome: "Frango Completo",
    categoria: "frango",
    descricao: "Frango, bacon, milho, cebola e mussarela",
    preco: 42.90,
    imagem: imagemPadrão
  },
  {
    id: 3,
    nome: "Frango com Abacaxi",
    categoria: "frango",
    descricao: "Frango, abacaxi, cebola roxa e mussarela",
    preco: 41.90,
    imagem: imagemPadrão
  },
  {
    id: 4,
    nome: "Frango à Milanesa",
    categoria: "frango",
    descricao: "Peito de frango à milanesa, tomate e mussarela",
    preco: 45.90,
    imagem: imagemPadrão
  },

  // CARNES
  {
    id: 5,
    nome: "Calabresa Especial",
    categoria: "carnes",
    descricao: "Calabresa fatiada, cebola, azeitonas e mussarela",
    preco: 41.90,
    imagem: imagemPadrão
  },
  {
    id: 6,
    nome: "Bacon com Ovo",
    categoria: "carnes",
    descricao: "Bacon crocante, ovo, cebola e mussarela",
    preco: 43.90,
    imagem: imagemPadrão
  },
  {
    id: 7,
    nome: "Meia Lua",
    categoria: "carnes",
    descricao: "Calabresa, presunto, bacon, ovos e mussarela",
    preco: 46.90,
    imagem: imagemPadrão
  },
  {
    id: 8,
    nome: "Churrascaria",
    categoria: "carnes",
    descricao: "Carne seca, bacon, cebola roxa, molho BBQ e mussarela",
    preco: 48.90,
    imagem: imagemPadrão
  },

  // QUEIJO
  {
    id: 9,
    nome: "Margherita Clássica",
    categoria: "queijo",
    descricao: "Molho de tomate, mussarela fresca, manjericão e azeite",
    preco: 38.90,
    imagem: imagemPadrão
  },
  {
    id: 10,
    nome: "Quatro Queijos",
    categoria: "queijo",
    descricao: "Mussarela, parmesão, gorgonzola e catupiry",
    preco: 44.90,
    imagem: imagemPadrão
  },
  {
    id: 11,
    nome: "Queijo Derretido",
    categoria: "queijo",
    descricao: "Três tipos de queijo derretido com mel no final",
    preco: 45.90,
    imagem: imagemPadrão
  },
  {
    id: 12,
    nome: "Requeijão Derretido",
    categoria: "queijo",
    descricao: "Requeijão cremoso, mussarela e frango",
    preco: 42.90,
    imagem: imagemPadrão
  },

  // VEGANA
  {
    id: 13,
    nome: "Vegetariana",
    categoria: "vegana",
    descricao: "Brócolis, couve-flor, cebola, tomate e cogumelo",
    preco: 39.90,
    imagem: imagemPadrão
  },
  {
    id: 14,
    nome: "Cogumelos Selvagens",
    categoria: "vegana",
    descricao: "Cogumelos variados, cebola roxa, alho e azeite",
    preco: 40.90,
    imagem: imagemPadrão
  },
  {
    id: 15,
    nome: "Rúcula e Tomate Seco",
    categoria: "vegana",
    descricao: "Rúcula fresca, tomate seco, cebola roxa e azeitonas",
    preco: 41.90,
    imagem: imagemPadrão
  },
  {
    id: 16,
    nome: "Delícia Verde",
    categoria: "vegana",
    descricao: "Espinafre, couve, tomate, cogumelo e germinado",
    preco: 42.90,
    imagem: imagemPadrão
  },

  // ESPECIAL
  {
    id: 17,
    nome: "Premium",
    categoria: "especial",
    descricao: "Calabresa, bacon, frango, ovo, cebola e mussarela",
    preco: 49.90,
    imagem: imagemPadrão
  },
  {
    id: 18,
    nome: "Brotinhas da Casa",
    categoria: "especial",
    descricao: "Tiras de frango empanado com pasta de alho e catupiry",
    preco: 47.90,
    imagem: imagemPadrão
  },
  {
    id: 19,
    nome: "Cinco Queijos",
    categoria: "especial",
    descricao: "Mussarela, parmesão, gorgonzola, provolone e catupiry",
    preco: 50.90,
    imagem: imagemPadrão
  },
  {
    id: 20,
    nome: "Tropeiro",
    categoria: "especial",
    descricao: "Carne seca, linguiça, bacon, ovo e cebola caramelizada",
    preco: 51.90,
    imagem: imagemPadrão
  },

  // DOCE
  {
    id: 21,
    nome: "Chocolate com Banana",
    categoria: "doce",
    descricao: "Chocolate derretido, banana fatiada e canela",
    preco: 29.90,
    imagem: imagemPadrão
  },
  {
    id: 22,
    nome: "Doce de Leite",
    categoria: "doce",
    descricao: "Doce de leite cremoso com calda de caramelo",
    preco: 28.90,
    imagem: imagemPadrão
  },
  {
    id: 23,
    nome: "Crocante do Bem",
    categoria: "doce",
    descricao: "Chocolate, granola crocante e mel",
    preco: 32.90,
    imagem: imagemPadrão
  },
  {
    id: 24,
    nome: "Sensação",
    categoria: "doce",
    descricao: "Chocolate branco, morango fresco e calda de frutas vermelhas",
    preco: 34.90,
    imagem: imagemPadrão
  }
];

// -------- GERENCIAMENTO DO CARDÁPIO --------
const Cardapio = {
  filtroAtual: 'todos',

  init() {
    this.setupEventListeners();
    this.renderPizzas();
  },

  setupEventListeners() {
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
        e.target.closest('.filter-btn').classList.add('filter-btn--active');
        this.filtroAtual = e.target.closest('.filter-btn').dataset.category;
        this.renderPizzas();
      });
    });

    // Modal
    const modal = document.getElementById('pizzaModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCancelBtn = document.getElementById('modalCancelBtn');

    modalClose?.addEventListener('click', () => this.closeModal());
    modalOverlay?.addEventListener('click', () => this.closeModal());
    modalCancelBtn?.addEventListener('click', () => this.closeModal());

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });

    // Quantidade
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyInput = document.getElementById('qtyInput');

    qtyMinus?.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      qtyInput.value = Math.max(1, val - 1);
    });

    qtyPlus?.addEventListener('click', () => {
      const val = parseInt(qtyInput.value) || 1;
      qtyInput.value = Math.min(99, val + 1);
    });

    qtyInput?.addEventListener('change', () => {
      const val = parseInt(qtyInput.value) || 1;
      qtyInput.value = Math.max(1, Math.min(99, val));
    });

    // Adicionar ao carrinho
    document.getElementById('addCartBtn')?.addEventListener('click', () => this.addToCart());
  },

  renderPizzas() {
    const grid = document.getElementById('pizzasGrid');
    let filtered = pizzas;

    if (this.filtroAtual !== 'todos') {
      filtered = pizzas.filter(p => p.categoria === this.filtroAtual);
    }

    grid.innerHTML = filtered.map(pizza => `
      <div class="pizza-card" data-pizza-id="${pizza.id}">
        <div class="pizza-card__image-wrapper">
          <img class="pizza-card__image" src="${pizza.imagem}" alt="${pizza.nome}" />
          <span class="pizza-card__badge badge badge--secondary">Promoção</span>
        </div>
        <div class="pizza-card__body">
          <span class="pizza-card__category">${this.getCategoryLabel(pizza.categoria)}</span>
          <h3 class="pizza-card__title">${pizza.nome}</h3>
          <p class="pizza-card__description">${pizza.descricao}</p>
          <div class="pizza-card__footer">
            <span class="pizza-card__price">R$ ${pizza.preco.toFixed(2)}</span>
            <button class="btn btn--primary btn--sm pizza-card__btn" data-pizza-id="${pizza.id}">
              Pedir
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Evento dos botões de pedir
    grid.querySelectorAll('.pizza-card__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pizzaId = parseInt(e.target.dataset.pizzaId);
        const pizza = pizzas.find(p => p.id === pizzaId);
        this.openModal(pizza);
      });
    });
  },

  getCategoryLabel(categoria) {
    const labels = {
      'frango': 'Frango',
      'carnes': 'Carnes',
      'queijo': 'Queijo',
      'vegana': 'Vegana',
      'especial': 'Especial',
      'doce': 'Doce'
    };
    return labels[categoria] || categoria;
  },

  openModal(pizza) {
    document.getElementById('modalImage').src = pizza.imagem;
    document.getElementById('modalTitle').textContent = pizza.nome;
    document.getElementById('modalDescription').textContent = pizza.descricao;
    document.getElementById('modalPrice').textContent = `R$ ${pizza.preco.toFixed(2)}`;
    document.getElementById('pizzaModal').dataset.pizzaId = pizza.id;
    document.getElementById('qtyInput').value = 1;
    document.getElementById('observacoes').value = '';
    document.querySelector('input[name="tamanho"][value="pequena"]').checked = true;

    document.getElementById('pizzaModal').classList.add('modal--active');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    document.getElementById('pizzaModal').classList.remove('modal--active');
    document.body.style.overflow = 'auto';
  },

  addToCart() {
    const modal = document.getElementById('pizzaModal');
    const pizzaId = parseInt(modal.dataset.pizzaId);
    const pizza = pizzas.find(p => p.id === pizzaId);

    const tamanho = document.querySelector('input[name="tamanho"]:checked').value;
    const quantidade = parseInt(document.getElementById('qtyInput').value) || 1;
    const observacoes = document.getElementById('observacoes').value.trim();

    const item = {
      id: `${pizzaId}-${tamanho}`,
      pizzaId: pizzaId,
      nome: pizza.nome,
      tamanho: tamanho,
      preco: pizza.preco,
      imagem: pizza.imagem,
      descricao: pizza.descricao,
      observacoes: observacoes,
      quantidade: quantidade
    };

    // Usar o PizzaStore do app.js
    if (typeof PizzaStore !== 'undefined') {
      PizzaStore.addToCart(item);
      
      // Feedback visual
      const btn = document.getElementById('addCartBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Adicionado ao Carrinho!';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        this.closeModal();
      }, 1500);
    }
  }
};

// -------- INICIALIZAÇÃO --------
document.addEventListener('DOMContentLoaded', () => {
  Cardapio.init();
});
