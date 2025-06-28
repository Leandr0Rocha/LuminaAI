document.addEventListener("DOMContentLoaded", () => {
    // Popup de Login
    const botaoLogin = document.querySelector('.botao[href="#"]');
    const popupLogin = document.getElementById('popup-login');
    const botaoFecharLogin = document.querySelector('.botao-fechar');

    if (botaoLogin && popupLogin && botaoFecharLogin) {
        botaoLogin.addEventListener('click', (event) => {
            event.preventDefault();
            popupLogin.style.display = 'flex';
        });

        botaoFecharLogin.addEventListener('click', () => {
            popupLogin.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === popupLogin) {
                popupLogin.style.display = 'none';
            }
        });
    }

    // Remove o aviso de login
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach((message) => {
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 5000);

        message.addEventListener('click', () => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        });
    });

    // Animações ao Rolar
    const elementosAnimados = document.querySelectorAll('.animar-ao-rolar');
    if (elementosAnimados.length > 0) {
        const observador = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        });

        elementosAnimados.forEach(elemento => observador.observe(elemento));
    }

    // Carrossel de Depoimentos
    const depoimentos = document.querySelectorAll('.cartao-depoimento');
    const totalDepoimentos = depoimentos.length;
    let depoimentoAtual = 0;

    function mostrarDepoimento(indice) {
        depoimentos.forEach((depoimento, i) => {
            depoimento.style.display = i === indice ? 'block' : 'none';
        });
    }

    const botaoProximo = document.querySelector('.proximo-depoimento');
    const botaoAnterior = document.querySelector('.depoimento-anterior');

    if (botaoProximo && botaoAnterior && depoimentos.length > 0) {
        botaoProximo.addEventListener('click', () => {
            depoimentoAtual = (depoimentoAtual + 1) % totalDepoimentos;
            mostrarDepoimento(depoimentoAtual);
        });

        botaoAnterior.addEventListener('click', () => {
            depoimentoAtual = (depoimentoAtual - 1 + totalDepoimentos) % totalDepoimentos;
            mostrarDepoimento(depoimentoAtual);
        });

        mostrarDepoimento(depoimentoAtual);
    }

    // Botão "Voltar ao Topo"
    const botaoVoltarTopo = document.createElement('button');
    botaoVoltarTopo.textContent = '⬆';
    botaoVoltarTopo.classList.add('voltar-ao-topo');
    document.body.appendChild(botaoVoltarTopo);

    window.addEventListener('scroll', () => {
        botaoVoltarTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    botaoVoltarTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Formulário de Cadastro e Popup de Cadastro
    const body = document.querySelector('body');
    const cadastroSucesso = body.getAttribute('data-cadastro-sucesso') === 'true';

    if (cadastroSucesso) {
        const popupCadastro = document.getElementById('popup-cadastro');
        if (popupCadastro) {
            popupCadastro.style.display = 'flex';
        }
    }

    const formularioCadastro = document.querySelector('.formulario-cadastro');
    if (formularioCadastro) {
        formularioCadastro.addEventListener('submit', (event) => {
            // Remova qualquer validação JS de senha aqui!
            // Apenas deixe o backend cuidar da validação e das mensagens flash.
        });
    }

    // Aviso de autenticação para inscrição
    const isAuthenticated = body.getAttribute('data-authenticated') === 'true';
    const mensagemAviso = document.getElementById('mensagem-aviso');
    const botoesInscrever = document.querySelectorAll('.botao-inscrever');

    botoesInscrever.forEach(botao => {
        botao.addEventListener('click', () => {
            if (!isAuthenticated) {
                if (mensagemAviso) {
                    mensagemAviso.style.display = 'block';
                    setTimeout(() => {
                        mensagemAviso.style.display = 'none';
                    }, 3000);
                }
            } else {
                botao.closest('form').submit();
            }
        });
    });

    // Formulário de Contato - Validação e Popup de Confirmação
    const formularioContato = document.querySelector('.formulario-contato');
    if (formularioContato) {
        formularioContato.addEventListener('submit', (event) => {
            // Deixe o backend lidar com a validação e flash messages
        });
    }

    const botaoExcluir = document.getElementById("botao-excluir");
    const modalConfirmacao = document.getElementById("modal-confirmacao");
    const botaoConfirmar = document.getElementById("confirmar-exclusao");
    const botaoCancelar = document.getElementById("cancelar-exclusao");
    const formExcluirConta = document.getElementById("form-excluir-conta");

    if (botaoExcluir && modalConfirmacao && botaoConfirmar && botaoCancelar) {
        // Exibe o modal ao clicar no botão "Excluir Conta"
        botaoExcluir.addEventListener("click", (event) => {
            event.preventDefault();
            modalConfirmacao.style.display = "flex";
        });

        // Confirma a exclusão e envia o formulário
        botaoConfirmar.addEventListener("click", () => {
            if (formExcluirConta) {
                formExcluirConta.submit();
            }
        });

        // Cancela a exclusão e fecha o modal
        botaoCancelar.addEventListener("click", () => {
            modalConfirmacao.style.display = "none";
        });

        // Fecha o modal ao clicar fora do conteúdo
        window.addEventListener("click", (event) => {
            if (event.target === modalConfirmacao) {
                modalConfirmacao.style.display = "none";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sectionIds = ['sobre', 'duvidas', 'planos', 'contato', 'area-aluno'];
    const mainContent = document.getElementById('main-content');

    function hideAllSections() {
        if (mainContent) mainContent.style.display = 'none';
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    function showSection(sectionId) {
        hideAllSections();
        const el = document.getElementById(sectionId);
        if (el) el.style.display = '';
    }

    function showMainContent() {
        if (mainContent) mainContent.style.display = '';
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            showSection(this.dataset.section);
        });
    });

    const logo = document.getElementById('logo-header');
    if (logo) {
        logo.addEventListener('click', function () {
            showMainContent();
        });
    }

    // Exibe a seção se houver hash na URL
    const hash = window.location.hash.replace('#', '');
    if (sectionIds.includes(hash)) {
        showSection(hash);
    } else {
        showMainContent();
    }
});