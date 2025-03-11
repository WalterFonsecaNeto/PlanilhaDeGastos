document
  .getElementById("bitcoin-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("BTCUSDT", "BTCBRL", "priceDolarBTC", "priceRealBTC")
  );
document
  .getElementById("ethereum-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("ETHUSDT", "ETHBRL", "priceDolarETH", "priceRealETH")
  );
document
  .getElementById("dogecoin-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("DOGEUSDT", "DOGEBRL", "priceDolarDOGE", "priceRealDOGE")
  );
document
  .getElementById("usdt-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("USDTBRL", "USDTBRL", "priceRealUSDT", "priceRealUSDT")
  );
document
  .getElementById("solana-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("SOLUSDT", "SOLBRL", "priceDolarSOL", "priceRealSOL")
  );
document
  .getElementById("shiba-card")
  .addEventListener("mouseenter", () =>
    buscarPreco("SHIBUSDT", "SHIBBRL", "priceDolarSHIB", "priceRealSHIB")
  );

async function buscarPreco(symbolDolar, symbolReal, dolarId, realId) {
  try {
    const responseDolar = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbolDolar}`
    );
    const responseReal = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbolReal}`
    );
    const dataDolar = await responseDolar.json();
    const dataReal = await responseReal.json();

    let dolarPrice = parseFloat(dataDolar.price);
    let realPrice = parseFloat(dataReal.price);

    // Verifica se é a Shiba Inu (com ID 'shiba-card')
    if (dolarId.includes("SHIB") || dolarId.includes("DOGE") ){
      // Se for Shiba Inu, usa 8 casas decimais
      dolarPrice = dolarPrice.toFixed(8);
      realPrice = realPrice.toFixed(8);
    } else {
      // Para as outras criptos, usa 2 casas decimais
      dolarPrice = dolarPrice.toFixed(2);
      realPrice = realPrice.toFixed(2);
    }

    // Atualiza o valor no HTML
    document.getElementById(dolarId).textContent = `$${dolarPrice}`;
    document.getElementById(realId).textContent = `R$${realPrice}`;
  } catch (error) {
    document.getElementById(dolarId).textContent = "Erro ao carregar";
    document.getElementById(realId).textContent = "Erro ao carregar";
  }
}
