// Função para exportar dados do Local Storage para um arquivo JSON
function exportData() {
    // Supondo que a chave no Local Storage seja 'gastos'
    const data = localStorage.getItem('gastos');

    if (!data) {
        alert('Nenhum dado encontrado no Local Storage!');
        return;
    }

    // Cria um Blob com os dados no formato JSON
    const blob = new Blob([data], { type: 'application/json' });

    // Cria um link para download do arquivo
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gastos.json'; // Nome do arquivo
    a.click();

    // Libera o objeto URL da memória
    URL.revokeObjectURL(url);

    alert('Dados exportados com sucesso!');
}

// Função para importar dados de um arquivo JSON para o Local Storage
function importData(event) {
    const file = event.target.files[0]; // Pega o arquivo selecionado

    if (!file) {
        alert('Nenhum arquivo selecionado!');
        return;
    }

    const reader = new FileReader();

    // Quando o arquivo for lido, salva os dados no Local Storage
    reader.onload = function (e) {
        const data = e.target.result;

        try {
            // Verifica se o conteúdo do arquivo é um JSON válido
            JSON.parse(data);

            // Salva os dados no Local Storage
            localStorage.setItem('gastos', data);

            // Atualiza as variáveis globais e a interface
            gastos = JSON.parse(data); // Atualiza a lista de gastos
            recalcularTotais(); // Recalcula os totais de receita e despesa
            carregarValoresIniciais(); // Atualiza a interface

            alert('Dados importados com sucesso!');
        } catch (error) {
            alert('Erro: O arquivo não contém um JSON válido!');
        }
    };

    // Lê o conteúdo do arquivo como texto
    reader.readAsText(file);
}