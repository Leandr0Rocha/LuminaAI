// Popup de Login
const botaoLogin = document.querySelector('.botao[href="#"]'); // Botão de login
const popupLogin = document.getElementById('popup-login');
const botaoFecharLogin = document.querySelector('.botao-fechar');

botaoLogin.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o comportamento padrão do link
    popupLogin.style.display = 'flex'; // Mostra o popup
});

// Fecha o popup ao clicar no botão de fechar
botaoFecharLogin.addEventListener('click', () => {
    popupLogin.style.display = 'none'; // Esconde o popup
});

// Fecha o popup ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === popupLogin) {
        popupLogin.style.display = 'none'; // Esconde o popup
    }
});

// Remove o aviso de login
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todas as mensagens flash
    const flashMessages = document.querySelectorAll('.flash-message');

    // Define um tempo para ocultar as mensagens automaticamente
    flashMessages.forEach((message) => {
        // Remove a mensagem após 5 segundos
        setTimeout(() => {
            message.style.opacity = '0'; // Adiciona uma transição suave
            setTimeout(() => message.remove(), 500); // Remove o elemento após a transição
        }, 5000);

        // Permite que o usuário clique para fechar a mensagem imediatamente
        message.addEventListener('click', () => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        });
    });
});

// Animações ao Rolar
const elementosAnimados = document.querySelectorAll('.animar-ao-rolar');

// Configura o IntersectionObserver
const observador = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel'); // Adiciona a classe 'visivel' quando o elemento entra na área visível
        } else {
            entry.target.classList.remove('visivel'); // Remove a classe 'visivel' quando o elemento sai da área visível (opcional)
        }
    });
});

// Observa cada elemento
elementosAnimados.forEach(elemento => observador.observe(elemento));

// Carrossel de Depoimentos
let depoimentoAtual = 0;
const depoimentos = document.querySelectorAll('.cartao-depoimento');
const totalDepoimentos = depoimentos.length;

function mostrarDepoimento(indice) {
    depoimentos.forEach((depoimento, i) => {
        depoimento.style.display = i === indice ? 'block' : 'none';
    });
}

document.querySelector('.proximo-depoimento').addEventListener('click', () => {
    depoimentoAtual = (depoimentoAtual + 1) % totalDepoimentos;
    mostrarDepoimento(depoimentoAtual);
});

document.querySelector('.depoimento-anterior').addEventListener('click', () => {
    depoimentoAtual = (depoimentoAtual - 1 + totalDepoimentos) % totalDepoimentos;
    mostrarDepoimento(depoimentoAtual);
});

mostrarDepoimento(depoimentoAtual);

// Botão "Voltar ao Topo"
const botaoVoltarTopo = document.createElement('button');
botaoVoltarTopo.textContent = '↑';
botaoVoltarTopo.classList.add('voltar-ao-topo');
document.body.appendChild(botaoVoltarTopo);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        botaoVoltarTopo.style.display = 'block';
    } else {
        botaoVoltarTopo.style.display = 'none';
    }
});

botaoVoltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Formulário de Contato e Popup de Confirmação
const formularioContato = document.querySelector('.formulario-contato');
const popupConfirmacao = document.getElementById('popup-confirmacao');
const botaoFecharConfirmacao = popupConfirmacao.querySelector('.botao-fechar');
const formularioCadastro = document.querySelector('.formulario-cadastro'); // Seleciona o formulário de cadastro
const botaoFecharCadastro = document.querySelector('.botao-fechar-cadastro'); // Seleciona o botão de fechar do popup de cadastro

// Exibe o popup ao enviar o formulário
formularioContato.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio real do formulário
    popupConfirmacao.style.display = 'flex'; // Mostra o popup
    formularioContato.reset(); // Limpa o formulário
});

// Fecha o popup ao clicar no botão de fechar
botaoFecharConfirmacao.addEventListener('click', () => {
    popupConfirmacao.style.display = 'none'; // Esconde o popup
});

// Fecha o popup ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === popupConfirmacao) {
        popupConfirmacao.style.display = 'none'; // Esconde o popup
    }
});

// Formulário de Cadastro e Popup de Cadastro
document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    const cadastroSucesso = body.getAttribute('data-cadastro-sucesso') === 'true';

    if (cadastroSucesso) {
        document.getElementById('popup-cadastro').style.display = 'flex';
    }

    // Fecha o popup ao clicar no botão de fechar
    document.querySelector('#popup-cadastro .botao-fechar').addEventListener('click', () => {
        document.getElementById('popup-cadastro').style.display = 'none';
    });
});

// Aviso de autenticação para inscrição
document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = document.body.getAttribute('data-authenticated') === 'true';
    const mensagemAviso = document.getElementById('mensagem-aviso');

    // Seleciona todos os botões de inscrição
    const botoesInscrever = document.querySelectorAll('.botao-inscrever');

    botoesInscrever.forEach(botao => {
        botao.addEventListener('click', () => {
            if (!isAuthenticated) {
                // Exibe a mensagem de aviso
                mensagemAviso.style.display = 'block';

                // Oculta a mensagem após 3 segundos
                setTimeout(() => {
                    mensagemAviso.style.display = 'none';
                }, 3000);
            } else {
                // Submete o formulário se o usuário estiver autenticado
                botao.closest('form').submit();
            }
        });
    });
});