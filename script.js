let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let salario = parseFloat(localStorage.getItem("salario")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  const salarioInput = document.getElementById("salario");
  const salarioTotalSpan = document.getElementById("salario-total");
  const btnRemoverSalario = document.getElementById("remover-salario");

  if (salario) {
    salarioInput.value = salario.toFixed(2);
    salarioTotalSpan.textContent = salario.toFixed(2);
    salarioInput.disabled = true;
  }

  salarioInput.addEventListener("input", () => {
    const novoSalario = parseFloat(salarioInput.value) || 0;
    salarioTotalSpan.textContent = novoSalario.toFixed(2);
    localStorage.setItem("salario", novoSalario);
    atualizarSaldo();
  });

  btnRemoverSalario.addEventListener("click", removerSalario);

  atualizarTabela();
});

function removerSalario() {
  localStorage.removeItem("salario");
  const salarioInput = document.getElementById("salario");
  const salarioTotalSpan = document.getElementById("salario-total");

  salarioInput.value = "";
  salarioTotalSpan.textContent = "0";
  salarioInput.disabled = false;
  atualizarSaldo();
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
            <td><button class="botao-lixeira" onclick="removerGasto(${index})"> <i data-lucide="trash-2" /></button></td>
        </tr>`;
  });
  lucide.createIcons();

  document.getElementById("total-gastos").textContent = total.toFixed(2);
  atualizarSaldo();
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function adicionarGasto() {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);

  if (descricao && !isNaN(valor)) {
    gastos.push({ descricao, valor });
    atualizarTabela();
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
  }
}

function removerGasto(index) {
  gastos.splice(index, 1);
  atualizarTabela();
}

function atualizarSaldo() {
  const salario = parseFloat(localStorage.getItem("salario")) || 0;
  const totalGastos = parseFloat(
    document.getElementById("total-gastos").textContent
  );
  document.getElementById("saldo-restante").textContent = (
    salario - totalGastos
  ).toFixed(2);
}
