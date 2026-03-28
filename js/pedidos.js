/* ============================================
   CONFIRMAÇÃO DO PEDIDO - LÓGICA DA PÁGINA
   ============================================ */

let pedidosGlobais = [];
let pedidoAtual = null;

(function initConfirmacao() {
  pedidosGlobais = window.PizzaStore?.getPedidos() ?? [];
  pedidosGlobais = pedidosGlobais.map(atualizarStatusSeNecessario);
  pedidoAtual = pedidosGlobais[0] ?? null;

  window.PizzaStore?.updateOrdersBadge();

  if (pedidoAtual) {
    renderizarRastreio(pedidosGlobais);
    atualizarTelaDinamicamente(pedidoAtual);
    configurarSelectPedidos();

    // Botão "Confirmar Entrega"
    document
      .getElementById("btnConfirmDelivery")
      ?.addEventListener("click", () => {
        if (!pedidoAtual || pedidoAtual.status === "entregue") return;
        confirmarEntrega(pedidoAtual);
      });
  } else {
    document.querySelector(".confirmation").style.display = "none";
    document.querySelector(".tracking").style.display = "none";
    document.getElementById("emptyState").style.display = "block";
    document
      .querySelector("main")
      .classList.remove("page-wrapper--confirmation");
  }
})();

function atualizarTelaDinamicamente(pedido) {
  if (!pedido) return;
  pedido = atualizarStatusSeNecessario(pedido);
  renderizarNumero(pedido);
  renderizarItens(pedido);
  renderizarEndereco(pedido);
  renderizarAviso(pedido);
  atualizarEstadoBotao(pedido);
}

function atualizarStatusSeNecessario(pedido) {
  if (!pedido || pedido.status !== "preparando") return pedido;

  const valorData = pedido.data_pedido || pedido.dataCriacao;
  if (!valorData) return pedido;

  let dataPedido;

  if (typeof valorData === "string" && valorData.includes("/")) {
    const [data, hora = "00:00:00"] = valorData.split(" ");
    const [dia, mes, ano] = data.split("/").map(Number);
    const [h = 0, m = 0, s = 0] = hora.split(":").map(Number);
    dataPedido = new Date(ano, mes - 1, dia, h, m, s);
  } else {
    dataPedido = new Date(valorData);
  }

  if (Number.isNaN(dataPedido.getTime())) return pedido;

  const minutosPassados = (Date.now() - dataPedido.getTime()) / 60000;
  if (minutosPassados >= 20) {
    pedido.status = "a caminho";
    window.PizzaStore.updatePedido(pedido);
  }

  return pedido;
}

function configurarSelectPedidos() {
  const container = document.getElementById("otherOrdersContainer");
  const select = document.getElementById("orderSelect");
  if (!container || !select) return;

  if (pedidosGlobais.length <= 1) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  atualizarOpcoesOutrosPedidos();

  select.addEventListener("change", (event) => {
    const pedidoIdSelecionado = event.target.value;
    if (!pedidoIdSelecionado) return;

    const pedidoSelecionado = pedidosGlobais.find(
      (pedido) => String(pedido.id) === String(pedidoIdSelecionado),
    );

    if (!pedidoSelecionado) return;
    pedidoAtual = pedidoSelecionado;
    atualizarTelaDinamicamente(pedidoAtual);
    atualizarOpcoesOutrosPedidos();
  });
}

function atualizarOpcoesOutrosPedidos() {
  const select = document.getElementById("orderSelect");
  if (!select || !pedidoAtual) return;

  const opcoesOutrosPedidos = pedidosGlobais
    .filter((pedido) => String(pedido.id) !== String(pedidoAtual.id))
    .map(
      (pedido) => `<option value="${pedido.id}">Pedido ${pedido.id}</option>`,
    )
    .join("");

  select.innerHTML = `<option value="" selected>Ver outro pedido</option>${opcoesOutrosPedidos}`;
}

function atualizarEstadoBotao(pedido) {
  const btn = document.getElementById("btnConfirmDelivery");
  if (!btn) return;

  if (pedido.status === "entregue") {
    btn.textContent = "Entrega Confirmada ✓";
    btn.disabled = true;
    btn.classList.add("btn--secondary");
    btn.classList.remove("btn--outline");
    return;
  }

  btn.textContent = "✓ Confirmar Entrega";
  btn.disabled = false;
  btn.classList.remove("btn--secondary");
  btn.classList.add("btn--outline");
}

function renderizarNumero(pedido) {
  const pedidoP = document.getElementById("orderNumber");
  if (!pedidoP) return;
  pedidoP.textContent = pedido ? `Pedido ${pedido.id}` : "Pedido #—";
}

function renderizarItens(pedido) {
  const pedidoLista = document.getElementById("listItems");
  const pedidoTotal = document.getElementById("orderTotal");

  if (!pedidoLista) return;

  if (!pedido || !pedido.items?.length) {
    pedidoLista.innerHTML = `
      <li class="confirmation__item">
        <span class="confirmation__item-name">Nenhum item encontrado</span>
      </li>`;
    return;
  }

  pedidoLista.innerHTML = pedido.items
    .map(
      (item) => `
    <li class="confirmation__item">
      <span class="confirmation__item-name">${item.nome}</span>
      <span class="confirmation__item-quantity">x${item.quantidade}</span>
      <span class="confirmation__item-price">
        ${window.Formatters.moeda(item.valor * item.quantidade)}
      </span>
    </li>`,
    )
    .join("");

  if (pedidoTotal) {
    // const total = pedido.itens.reduce(
    //   (soma, item) => soma + item.valor * item.quantidade,
    //   0,
    // );
    pedidoTotal.textContent = window.Formatters.moeda(Number(pedido.total));
  }
}

function renderizarEndereco(pedido) {
  const enderecoP = document.getElementById("deliveryAddress");

  if (!enderecoP) return;

  if (pedido?.endereco) {
    const endereco = pedido.endereco;
    enderecoP.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.Bairro} - CEP: ${endereco.CEP}`;
  } else {
    enderecoP.textContent = "Endereço não informado";
  }
}

function renderizarAviso(pedido) {
  const prazoEntrega = document.getElementById("deliveryForecast");
  if (!prazoEntrega) return;

  if (pedido?.data_pedido) {
    const [data, hora] = pedido.data_pedido.split(" ");
    const [dia, mes, ano] = data.split("/");
    const [horas, minutos, segundos] = hora.split(":");

    const dataPedido = new Date(ano, mes - 1, dia, horas, minutos, segundos);
    dataPedido.setMinutes(dataPedido.getMinutes() + 35);

    prazoEntrega.textContent = dataPedido.toLocaleTimeString("pt-BR", {
      timeStyle: "short",
    });
  }
}

function confirmarEntrega(pedido) {
  const btn = document.getElementById("btnConfirmDelivery");
  if (btn) {
    btn.textContent = "Entrega Confirmada ✓";
    btn.disabled = true;
    btn.classList.add("btn--secondary");
    btn.classList.remove("btn--outline");

    pedido.status = "entregue";
    window.PizzaStore.updatePedido(pedido);

    removerPedidoDoRastreio(pedido.id);
    adicionarPedidoLista(pedido.id, "delivered");
    atualizarEstadoBotao(pedido);
    pedidosGlobais = window.PizzaStore?.getPedidos() ?? pedidosGlobais;
    atualizarOpcoesOutrosPedidos();
  }
}

function removerPedidoDoRastreio(pedidoId) {
  const numeros = document.querySelectorAll(".tracking__number--client");
  numeros.forEach((numero) => {
    if (numero.textContent == pedidoId) {
      numero.remove();
    }
  });
}

function renderizarRastreio(pedidos) {
  if (!pedidos) {
    const orderElement = document.createElement("li");
    orderElement.classList.add("tracking__number", "tracking__number--client");
    orderElement.textContent = "11";

    const trackingList = document.querySelector(
      ".tracking__column--preparing ul",
    );
    trackingList.appendChild(orderElement);
  } else {
    const pedidosOrdenados = [...pedidos].reverse();

    pedidosOrdenados.forEach((pedido) => {
      switch (pedido.status) {
        case "preparando":
          adicionarPedidoLista(pedido.id, "preparing");
          break;
        case "a caminho":
          adicionarPedidoLista(pedido.id, "underway");
          break;
        case "entregue":
          adicionarPedidoLista(pedido.id, "delivered");
          break;
        default:
          break;
      }
    });
  }
}

function adicionarPedidoLista(pedidoId, status) {
  const orderElement = document.createElement("li");
  orderElement.classList.add("tracking__number", "tracking__number--client");
  orderElement.textContent = pedidoId;

  const trackingList = document.querySelector(
    `.tracking__column--${status} ul`,
  );
  trackingList.appendChild(orderElement);
}
