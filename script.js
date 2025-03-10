let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

function atualizarTabela() {
  const tabela = document.getElementById("tabela-gastos");
  tabela.innerHTML = "";
  let total = 0;

  gastos.forEach((gasto, index) => {
    total += gasto.valor;
    tabela.innerHTML += `<tr>
            <td>${gasto.descricao}</td>
            <td>R$ ${gasto.valor.toFixed(2)}</td>
            <td><button class="botao-lixeira" onclick="removerGasto(${index})"> <i data-lucide="trash-2" /></button></td>
        </tr>`;
  });

  document.getElementById("total-gastos").textContent = total.toFixed(2);
  atualizarSaldo();
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function atualizarTabela() {
  const tabela = document.getElementById("tabela-gastos");
  tabela.innerHTML = "";
  let total = 0;

  gastos.forEach((gasto, index) => {
    total += gasto.valor;
    tabela.innerHTML += `<tr>
              <td>${gasto.descricao}</td>
              <td>R$ ${gasto.valor.toFixed(2)}</td>
              <td><button class="botao-lixeira" onclick="removerGasto(${index})"> <i data-lucide="trash-2"></i></button></td>
          </tr>`;
  });

  document.getElementById("total-gastos").textContent = total.toFixed(2);
  localStorage.setItem("gastos", JSON.stringify(gastos));

  // Renderiza os ícones do Lucide novamente
  lucide.createIcons();
}

function removerGasto(index) {
  gastos.splice(index, 1);
  atualizarTabela();
}

function atualizarSaldo() {
  const salario = parseFloat(document.getElementById("salario").value) || 0;
  const totalGastos = parseFloat(
    document.getElementById("total-gastos").textContent
  );
  document.getElementById("saldo-restante").textContent = (
    salario - totalGastos
  ).toFixed(2);
  document.getElementById("salario-total").textContent = salario.toFixed(2);
}

document.getElementById("salario").addEventListener("input", atualizarSaldo);
atualizarTabela();
