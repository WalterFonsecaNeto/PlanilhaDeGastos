// Função para abrir o modal
document.getElementById("abrir-modal").addEventListener("click", () => {
  document.getElementById("modal-gasto").style.display = "block";
});

// Função para fechar o modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("modal-gasto").style.display = "none";
});

// Fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal-gasto");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Função para adicionar gasto
function adicionarGasto() {
  const data = document.getElementById("data").value;
  const descricao = document.getElementById("descricao").value;
  const categoria = document.getElementById("categoria").value;
  const valor = document.getElementById("valor").value;
  const tipo = document.getElementById("tipo").value;

  // Exibir os dados no console (pode ser substituído por uma lógica de salvar no banco de dados, etc.)
  console.log({ data, descricao, categoria, valor, tipo });

  // Exibir mensagem de sucesso
  alert("Gasto adicionado com sucesso!");

  // Fechar o modal após adicionar o gasto
  document.getElementById("modal-gasto").style.display = "none";
}
