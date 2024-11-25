document.addEventListener('DOMContentLoaded', function () {
    const btnEnviarPergunta = document.getElementById('sendQuestion');
    const inputPergunta = document.getElementById('question');
    const listaPerguntasDiv = document.getElementById('questionsList');


    function salvarPergunta(pergunta) {
        const anoAtual = new Date().getFullYear();
        const novaPergunta = {
            pergunta: pergunta,
            perguntadoEm: anoAtual,
            respondido: false,  
            resposta: ''
        };


        let perguntas = JSON.parse(localStorage.getItem('questions')) || [];

        perguntas.push(novaPergunta);


        localStorage.setItem('questions', JSON.stringify(perguntas));


        inputPergunta.value = '';
        alert('Sua pergunta foi enviada ao futuro!');
        exibirPerguntas();
    }

    function exibirPerguntas() {
        const perguntas = JSON.parse(localStorage.getItem('questions')) || [];
        listaPerguntasDiv.innerHTML = '';

        perguntas.forEach((dadosPergunta, indice) => {
            const anoAtual = new Date().getFullYear();
            const diferencaAnos = anoAtual - dadosPergunta.perguntadoEm;

            let perguntaHTML = `
                <div class="item-pergunta">
                    <strong>Pergunta feita em ${dadosPergunta.perguntadoEm}:</strong>
                    <p>${dadosPergunta.pergunta}</p>
                    <p><em>${diferencaAnos} anos depois...</em></p>
            `;


            if (!dadosPergunta.respondido && diferencaAnos >= 1) {
                perguntaHTML += `
                    <textarea class="entrada-resposta" id="resposta${indice}" placeholder="Responda a pergunta..." rows="4"></textarea>
                    <button class="salvar-resposta" id="salvarResposta${indice}">Salvar Resposta</button>
                    <p><em>Você só pode responder depois de um ano!</em></p>
                `;
            } else if (dadosPergunta.respondido) {
                perguntaHTML += `
                    <strong>Resposta:</strong>
                    <p>${dadosPergunta.resposta}</p>
                `;
            } else {
                perguntaHTML += `<p><strong>Aguarde para responder após um ano.</strong></p>`;
            }


            perguntaHTML += `
                <button class="btn-excluir" id="excluir${indice}">Excluir Pergunta</button>
            `;

            perguntaHTML += '</div>';


            listaPerguntasDiv.innerHTML += perguntaHTML;

            const btnSalvarResposta = document.getElementById(`salvarResposta${indice}`);
            const entradaResposta = document.getElementById(`resposta${indice}`);
            const btnExcluir = document.getElementById(`excluir${indice}`);

            if (btnSalvarResposta) {
                btnSalvarResposta.addEventListener('click', function () {
                    const resposta = entradaResposta.value.trim();

                    if (resposta) {
                        
                        dadosPergunta.resposta = resposta;
                        dadosPergunta.respondido = true;

                       
                        const perguntas = JSON.parse(localStorage.getItem('questions'));
                        perguntas[indice] = dadosPergunta;
                        localStorage.setItem('questions', JSON.stringify(perguntas));

                        
                        exibirPerguntas();
                    } else {
                        alert('Por favor, digite uma resposta!');
                    }
                });
            }

        
            if (btnExcluir) {
                btnExcluir.addEventListener('click', function () {
                    const perguntas = JSON.parse(localStorage.getItem('questions'));
                    perguntas.splice(indice, 1); 

                   
                    localStorage.setItem('questions', JSON.stringify(perguntas));

                   
                    exibirPerguntas();
                });
            }
        });
    }

  
    btnEnviarPergunta.addEventListener('click', function () {
        const pergunta = inputPergunta.value.trim();
        if (pergunta) {
            salvarPergunta(pergunta);
        } else {
            alert('Por favor, digite uma pergunta!');
        }
    });

  
    exibirPerguntas();
});
