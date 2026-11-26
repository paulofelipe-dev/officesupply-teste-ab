
// ========================================
// OFFICESUPPLY ONLINE
// MONITORAMENTO DO TESTE A/B
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Identifica a versão atual
    const versao = window.location.pathname.includes("variant")
        ? "B"
        : "A";

    // Recupera os dados armazenados
    let dados = JSON.parse(localStorage.getItem("ab_metrics")) || {
        A: {
            visualizacoes: 0,
            cliques: 0
        },
        B: {
            visualizacoes: 0,
            cliques: 0
        }
    };

    // Registra uma visualização
    dados[versao].visualizacoes++;

    localStorage.setItem("ab_metrics", JSON.stringify(dados));

    console.log("Versão atual:", versao);
    console.log("Visualização registrada.");

    // Seleciona o botão principal
    const botao = document.querySelector(".add-to-cart-btn");

    // Evita contar vários cliques na mesma visualização
    let clicou = false;

    if (botao) {

        botao.addEventListener("click", function () {

            if (!clicou) {

                dados = JSON.parse(
                    localStorage.getItem("ab_metrics")
                ) || dados;

                dados[versao].cliques++;

                localStorage.setItem(
                    "ab_metrics",
                    JSON.stringify(dados)
                );

                clicou = true;

                console.log("Clique registrado na versão:", versao);
            }

            alert("Intenção de compra registrada com sucesso!");

        });

    }

    // Função para consultar os resultados
    window.resultadosAB = function () {

        const resultados = JSON.parse(
            localStorage.getItem("ab_metrics")
        );

        const tabela = ["A", "B"].map(function (v) {

            const visualizacoes = resultados[v].visualizacoes;
            const cliques = resultados[v].cliques;

            const taxa = visualizacoes > 0
                ? (cliques / visualizacoes) * 100
                : 0;

            return {
                Versao: v,
                Visualizacoes: visualizacoes,
                Cliques: cliques,
                TaxaDeCliques: taxa.toFixed(2) + "%"
            };

        });

        console.table(tabela);

    };

    // Função para limpar os resultados locais
    window.resetarAB = function () {

        localStorage.removeItem("ab_metrics");
        localStorage.removeItem("ab_version");

        window.location.href = "index.html";

    };

});
