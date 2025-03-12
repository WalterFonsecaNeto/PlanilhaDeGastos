function gerarExcel() {
  // Recupera os dados do LocalStorage
  let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

  // Verifica se há dados para exportar
  if (gastos.length === 0) {
    alert("Nenhum dado encontrado para exportar.");
    return;
  }

  // Estrutura inicial do XML para o Excel
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <?mso-application progid="Excel.Sheet"?>
    <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
              xmlns:o="urn:schemas-microsoft-com:office:office"
              xmlns:x="urn:schemas-microsoft-com:office:excel"
              xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
              xmlns:html="http://www.w3.org/TR/REC-html40">
        <Styles>
            <!-- Estilo para o cabeçalho -->
            <Style ss:ID="cabecalho">
                <Font ss:Bold="1" ss:Size="14" ss:Color="#FFFFFF"/>
                <Interior ss:Color="#4F81BD" ss:Pattern="Solid"/>
                <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                <Borders>
                    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#1F497D"/>
                    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#1F497D"/>
                    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#1F497D"/>
                    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#1F497D"/>
                </Borders>
            </Style>
            <!-- Estilo para as células de dados -->
            <Style ss:ID="dados">
                <Font ss:Size="12" ss:Color="#333333"/>
                <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                <Borders>
                    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                </Borders>
            </Style>
            <!-- Estilo para células de valores monetários -->
            <Style ss:ID="dinheiro">
                <NumberFormat ss:Format="&quot;R$&quot;#,##0.00"/>
                <Font ss:Size="12" ss:Color="#009933"/>
                <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>
                <Borders>
                    <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                    <Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#D3D3D3"/>
                </Borders>
            </Style>
        </Styles>
        <Worksheet ss:Name="Gastos">
            <Table>
                <!-- Definição da largura das colunas -->
                <Column ss:Width="150"/>
                <Column ss:Width="250"/>
                <Column ss:Width="150"/>
                <Column ss:Width="100"/>
                <Column ss:Width="100"/>

                <!-- Cabeçalho da Tabela -->
                <Row>
                    <Cell ss:StyleID="cabecalho"><Data ss:Type="String">Data</Data></Cell>
                    <Cell ss:StyleID="cabecalho"><Data ss:Type="String">Descrição</Data></Cell>
                    <Cell ss:StyleID="cabecalho"><Data ss:Type="String">Categoria</Data></Cell>
                    <Cell ss:StyleID="cabecalho"><Data ss:Type="String">Valor (R$)</Data></Cell>
                    <Cell ss:StyleID="cabecalho"><Data ss:Type="String">Tipo</Data></Cell>
                </Row>`;

  // Adiciona os dados da tabela no XML
  gastos.forEach((gasto) => {
    // Garante que os valores de texto não tenham caracteres inválidos
    let descricao = gasto.descricao
      ? gasto.descricao.replace(/&/g, "&amp;")
      : "";
    let categoria = gasto.categoria
      ? gasto.categoria.replace(/&/g, "&amp;")
      : "";
    let tipo = gasto.tipo ? gasto.tipo.replace(/&/g, "&amp;") : "";

    xml += `
                <Row>
                    <Cell ss:StyleID="dados"><Data ss:Type="String">${
                      gasto.data
                    }</Data></Cell>
                    <Cell ss:StyleID="dados"><Data ss:Type="String">${descricao}</Data></Cell>
                    <Cell ss:StyleID="dados"><Data ss:Type="String">${categoria}</Data></Cell>
                    <Cell ss:StyleID="dinheiro"><Data ss:Type="Number">${parseFloat(
                      gasto.valor
                    ).toFixed(2)}</Data></Cell>
                    <Cell ss:StyleID="dados"><Data ss:Type="String">${tipo}</Data></Cell>
                </Row>`;
  });

  // Fecha as tags do XML
  xml += `
            </Table>
        </Worksheet>
    </Workbook>`;

  try {
    // Criando um Blob com os dados em XML (formato correto)
    let blob = new Blob([xml], { type: "application/vnd.ms-excel" });

    // Criando o link para download
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "PlanilhaDeGastos.xls";

    // Adiciona o link ao corpo e clica nele automaticamente
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Erro ao gerar o arquivo Excel:", error);
    alert("Erro ao gerar o arquivo. Verifique o console para mais detalhes.");
  }
}
