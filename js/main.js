document.addEventListener('DOMContentLoaded', function () {
    const gerarCombinacoesButton = document.getElementById('gerButton');
    const voosTextArea = document.getElementById('vTextArea');
    const aeronavesTextArea = document.getElementById('aTextArea');
    const combinacoesDiv = document.getElementById('combinacoes');
    const relatorioDiv = document.getElementById('relatorio');

    function lerLinhasDeTexto(textArea) {
        return textArea.value.split('\n').map(line => line.trim());
    }

    function lerVoos() {
        const voosText = lerLinhasDeTexto(voosTextArea);
        return voosText.map(line => line.split(';'));
    }

    function lerAeronaves() {
        const aeronavesText = lerLinhasDeTexto(aeronavesTextArea);
        return aeronavesText.map(line => line.split('-'));
    }

    function gerarCombinacoes() {
        const voos = lerVoos();
        const aeronaves = lerAeronaves();
        const combinacoes = [];

        for (const voo of voos) {
            const randomAeronave = aeronaves[Math.floor(Math.random() * aeronaves.length)];
            const [origemDestino, duracao] = voo;
            const [aeronaveCodigo, aeronaveModelo] = randomAeronave;
            combinacoes.push({ origemDestino, duracao, aeronaveCodigo, aeronaveModelo });
        }

        exibirCombinacoes(combinacoes);
        gerarRelatorio(combinacoes);
    }

    function exibirCombinacoes(combinacoes) {
        combinacoesDiv.innerHTML = '';

        combinacoes.forEach(combinacao => {
            const p = document.createElement('p');
            p.textContent = `${combinacao.origemDestino} - ${combinacao.duracao} minutos de duração - ${combinacao.aeronaveCodigo}-${combinacao.aeronaveModelo}`;
            combinacoesDiv.appendChild(p);
        });
    }

    function gerarRelatorio(combinacoes) {
        relatorioDiv.innerHTML = '';

        const relatorio = {};
        combinacoes.forEach(combinacao => {
            const { aeronaveCodigo, duracao } = combinacao;
            const tempo = parseInt(duracao);
            if (!relatorio[aeronaveCodigo]) {
                relatorio[aeronaveCodigo] = { voos: 0, tempoTotal: 0 };
            }
            relatorio[aeronaveCodigo].voos++;
            relatorio[aeronaveCodigo].tempoTotal += tempo;
        });

        for (const aeronave in relatorio) {
            const p = document.createElement('p');
            p.textContent = `${aeronave} - ${relatorio[aeronave].voos} voos - tempo total: ${relatorio[aeronave].tempoTotal} minutos`;
            relatorioDiv.appendChild(p);
        }
    }

    gerarCombinacoesButton.addEventListener('click', gerarCombinacoes);
});
