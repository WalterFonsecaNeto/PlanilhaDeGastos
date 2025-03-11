// Função para abrir o modal
document.getElementById("abrir-modal").addEventListener("click", () => {
  document.getElementById("modal-gasto").style.display = "flex"; // Muda para flex para centralizar corretamente o modal no centro
});

// Função para fechar o modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("modal-gasto").style.display = "none";

  // Limpar os campos do formulário
  document.getElementById("data").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("tipo").value = "";
});



// Fechar o modal ao clicar fora dele
/*
window.addEventListener("click", (event) => {
  const modal = document.getElementById("modal-gasto");
  if (event.target === modal) {
    modal.style.display = "none";

    // Limpar os campos do formulário
    document.getElementById("data").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo").value = "";
  }
});
*/
