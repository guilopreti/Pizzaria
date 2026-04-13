# 🍕 Vuota Pizzaria

Site estático de pizzaria desenvolvido como projeto acadêmico com HTML, CSS e JavaScript puro.

## 👥 Equipe

| Membro            | Responsabilidade                 |
| ----------------- | -------------------------------- |
| Julia Martins     | Página inicial e base do projeto |
| Ana Carolina      | Página sobre a pizzaria          |
| Gustavo Toledo    | Página de cardápio e produtos    |
| Luiz Pimentel     | Página de finalização do pedido  |
| Guilherme Lopreti | Página de confirmação do pedido  |

## 📄 O Projeto e Divisão de Tarefas

### 🏠 Página Inicial e Estrutura Base — Julia Martins

Desenvolvimento da arquitetura inicial do repositório. Criação dos arquivos globais consumidos por todas as telas: `styles.css` (Design System, paletas de cores, botões), `icons.svg` (banco de ícones) e `app.js` (lógica da navbar e rotinas de carrinho centralizadas). A página `index.html` apresenta responsividade, seção hero, destaques, mais pedidas e footer completo.

### ℹ️ Informações da Pizzaria — Ana Carolina

Desenvolvimento da página `informacoes.html`, integrando os componentes básicos do Design System para exibir a seção institucional da Vuota Pizzaria, horários de funcionamento, localização geográfica e meios de contato.

### 🍕 Cardápio — Gustavo Toledo

Elaboração da interface `cardapio.html`. Responsável por apresentar dinamicamente os produtos do catálogo com opções de filtro, botões para inserção no carrinho e modais. Durante sua integração, conduziu também a resolução dos conflitos de merge referentes aos diretórios das imagens (SVGs globais).

### 🛒 Carrinho — Luiz Pimentel

Desenvolvimento da lógica e página `carrinho.html` (`feat/cart--luiz`). Manipulação de sessão via `localStorage` para ler os itens de compra, calcular o total geral dos produtos somando quantidades, checar interações e fechar pedidos.

### 📦 Confirmação e Tracking ("Meus Pedidos") — Guilherme Lopreti

Desenvolvimento da página `pedidos.html` (`Confirmacao-Pedido---Guilherme`), uma tela rica em lógicas de estado e tempo. Entre suas implementações estão: atualização automática de "Preparando" para "A caminho" ao ultrapassar 20 minutos de criação; navegação cruzada por múltiplos pedidos simultâneos num select interativo; rastreio visual avançado (rastreamento reverso de histórico) e sistema inteligente das "notificações laranjas" (badges de acompanhamento) diretamente na navbar de forma dinâmica.

## 🌿 Metodologia e Fluxo Git

O time implementou excelentes práticas de simulação de workflow real:

- **Branches Identificáveis:** Trabalho atrelado a ramificações com o nome da _feature_ e nome do desenvolvedor (ex: `Pagina-Informacoes-Ana`, `cardapio--gustavo`).
- **Proteção da Main e Code Review:** Todo código entrou em próspera via **Pull Requests**, bloqueando _commits_ diretos na master-branch, requerendo revisão cruzada entre os membros.
- **Merge Conflict Activo:** Resolução de conflitos do Git envolvendo refatoração de apontamentos de diretórios (_paths_ dos SVGs conflitantes vs repositório enraizado localmente).

## 🚀 Como rodar

1. Clone o repositório
2. Abra no VSCode
3. Rode com a extensão **Live Server**

## 🛠️ Tecnologias

- HTML5, CSS3, JavaScript ES6+
- Git + GitHub
- GitHub Pages
