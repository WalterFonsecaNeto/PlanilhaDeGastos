// Variáveis globais para armazenar os dados
let gastos = JSON.parse(localStorage.getItem("gastos")) || []; // Lista de gastos
let despesa = parseFloat(localStorage.getItem("despesa")) || 0; // Total de despesas
let receita = parseFloat(localStorage.getItem("receita")) || 0; // Total de receitas

// Função para carregar os valores iniciais na tela
function carregarValoresIniciais() {
  document.getElementById("receita-total").textContent = receita.toFixed(2); // Atualiza a receita total
  document.getElementById("total-gastos").textContent = despesa.toFixed(2); // Atualiza o total de gastos
  atualizarSaldo(); // Atualiza o saldo restante
  atualizarTabela(); // Atualiza a tabela de gastos
}

// Função para atualizar o saldo restante
function atualizarSaldo() {
  const saldoRestante = document.getElementById("saldo-restante");
  const saldo = (receita - despesa).toFixed(2); // Calcula o saldo (receita - despesa)
  saldoRestante.textContent = saldo; // Atualiza o valor na tela
}

// Função para atualizar a tabela de gastos
function atualizarTabela() {
  const tabela = document.getElementById("tabela-gastos");
  tabela.innerHTML = ""; // Limpa a tabela

  // Ordena os gastos por data (do mais antigo para o mais recente)
  gastos.sort((a, b) => {
    const dataA = new Date(a.data.split('/').reverse().join('-')); // Converte "DD/MM/AAAA" para "AAAA-MM-DD"
    const dataB = new Date(b.data.split('/').reverse().join('-')); // Converte "DD/MM/AAAA" para "AAAA-MM-DD"
    return dataA - dataB;
  });

  // Adiciona os gastos ordenados à tabela
  gastos.forEach((gasto, index) => {
    const classeBotao =
      gasto.tipo === "Despesa" ? "botao-despesa" : "botao-receita";

    tabela.innerHTML += `
      <tr>
        <td>${gasto.data}</td>
        <td>${gasto.descricao}</td>
        <td>${gasto.categoria}</td>
        <td>R$ ${gasto.valor.toFixed(2)}</td>
        <td>
          <button class="botao-alterar-tipo ${classeBotao}" onclick="alternarTipo(${index})">
            ${gasto.tipo}
          </button>
        </td>
        <td>
          <button class="botao-remover" onclick="removerGasto(${index})">
            <i class="icone-remover" data-lucide="trash-2"></i>
          </button>
        </td>
      </tr>`;
  });

  lucide.createIcons(); // Atualiza os ícones
  document.getElementById("total-gastos").textContent = despesa.toFixed(2); // Atualiza o total de gastos
  atualizarSaldo(); // Atualiza o saldo restante
}

// Função para remover um gasto
function removerGasto(index) {
  const gastoRemovido = gastos[index];

  // Subtrai o valor da receita ou despesa
  if (gastoRemovido.tipo === "Despesa") {
    despesa -= gastoRemovido.valor;
    localStorage.setItem("despesa", despesa.toFixed(2));
  } else if (gastoRemovido.tipo === "Receita") {
    receita -= gastoRemovido.valor;
    localStorage.setItem("receita", receita.toFixed(2));
  }

  // Remove o gasto da lista
  gastos.splice(index, 1);
  localStorage.setItem("gastos", JSON.stringify(gastos));

  // Atualiza a interface
  atualizarInterface();
}

// Função para atualizar a interface
function atualizarInterface() {
  // Atualiza os valores totais na interface
  document.getElementById("receita-total").textContent = receita.toFixed(2);
  document.getElementById("total-gastos").textContent = despesa.toFixed(2);
  atualizarSaldo(); // Atualiza o saldo restante
  atualizarTabela(); // Atualiza a tabela de gastos
}

// Função para adicionar uma nova entrada (receita ou despesa)
function adicionarEntrada() {
  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;
  const categoria = document.getElementById("categoria").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const tipo = document.getElementById("tipo").value;

  // Cria um novo objeto de gasto
  const novoGasto = {
    data: data.split("-").reverse().join("/"), // Formata a data para dd/mm/aaaa
    descricao,
    categoria,
    valor,
    tipo,
  };

  // Verifica se os dados estão preenchidos corretamente
  if (!verificarDadosAntesDeAdicionarEntrada(novoGasto)) {
    return;
  }

  // Atualiza o total de receita ou despesa
  if (tipo === "Despesa") {
    despesa += valor;
    localStorage.setItem("despesa", despesa.toFixed(2));
  } else if (tipo === "Receita") {
    receita += valor;
    localStorage.setItem("receita", receita.toFixed(2));
  }

  gastos.push(novoGasto); // Adiciona o novo gasto à lista
  localStorage.setItem("gastos", JSON.stringify(gastos)); // Atualiza o localStorage

  // Atualiza a interface
  document.getElementById("receita-total").textContent = receita.toFixed(2); // Atualiza a receita total
  atualizarTabela(); // Atualiza a tabela

  // Fecha o modal e limpa os campos
  document.getElementById("modal-gasto").style.display = "none";
  document.getElementById("data").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("tipo").value = "";
}

function verificarDadosAntesDeAdicionarEntrada(entrada) {
  // Valida se os dados necessários estão preenchidos
  if (entrada.data == "") {
    alert("Por favor, preencha a data.");
    return false;
  }

  if (entrada.descricao == "") {
    alert("Por favor, preencha a descrição.");
    return false;
  }

  if (entrada.categoria == "") {
    alert("Por favor, preencha a categoria.");
    return false;
  }

  if (isNaN(entrada.valor) || entrada.valor <= 0) {
    alert("Por favor, insira um valor válido.");
    return false;
  }

  if (entrada.tipo == "") {
    alert("Por favor, selecione o tipo (receita ou despesa).");
    return false;
  }
  return true;
}

// Função para alterar o tipo de uma entrada
function alternarTipo(index) {
  const gasto = gastos[index];

  // Altera o tipo da entrada
  if (gasto.tipo === "Receita") {
    gasto.tipo = "Despesa";
  } else {
    gasto.tipo = "Receita";
  }

  // Recalcula os totais
  recalcularTotais();

  // Atualiza o localStorage
  localStorage.setItem("gastos", JSON.stringify(gastos));

  // Atualiza a tabela
  atualizarTabela();
}
// Função para recalcular os totais de Receita e Despesa
function recalcularTotais() {
  receita = 0;
  despesa = 0;

  gastos.forEach((gasto) => {
    if (gasto.tipo === "Receita") {
      receita += gasto.valor;
    } else if (gasto.tipo === "Despesa") {
      despesa += gasto.valor;
    }
  });

  // Atualiza os valores no localStorage
  localStorage.setItem("receita", receita.toFixed(2));
  localStorage.setItem("despesa", despesa.toFixed(2));

  // Atualiza a interface
  document.getElementById("receita-total").textContent = receita.toFixed(2);
  document.getElementById("total-gastos").textContent = despesa.toFixed(2);
  atualizarSaldo(); // Atualiza o saldo restante
}

// Inicializa a aplicação
carregarValoresIniciais();
