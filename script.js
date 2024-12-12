document.getElementById('conversorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    let val = document.getElementById("valor").value.trim();
    const moedaOrigem = document.getElementById('moedaOrigem').value;
    const moedaDestino = document.getElementById('moedaDestino').value;


    // Substitui a vírgula por ponto, se houver
    val = val.replace(",", ".");

    // Convertendo o valor para número
    let valorConvertido = parseFloat(val);

    // Verificar se o valor é válido
    if (isNaN(valorConvertido) || valorConvertido <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
        
    }

    // Formatar a URL da API com base nas seleções
    const url = `https://economia.awesomeapi.com.br/json/last/${moedaOrigem}-${moedaDestino}`;

    // Requisição para a API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verificar se a resposta contém as informações necessárias
            if (data[`${moedaOrigem}${moedaDestino}`]) {
                const taxa = data[`${moedaOrigem}${moedaDestino}`].ask;
                const resultado = valorConvertido * parseFloat(taxa);

                // Exibir o resultado na página
                document.getElementById('resultado').innerHTML = `
                    <p>${valorConvertido} ${moedaOrigem} é igual a ${resultado.toFixed(2)} ${moedaDestino}</p>
                    <p>Taxa de câmbio: ${taxa}</p>
                `;
            } else {
                document.getElementById('resultado').innerHTML = "<p>Não foi possível obter os dados da conversão.</p>";
            }
        })
        .catch(error => {
            console.error('Erro ao consultar a API:', error);
            document.getElementById('resultado').innerHTML = "<p>Erro ao consultar a API.</p>";
        });
});
