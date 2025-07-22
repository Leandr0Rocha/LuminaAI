/**
 * Lumina AI - JavaScript Principal
 * Gerencia interações da interface, modais, animações e navegação
 */

// Configurações globais
const CONFIG = {
    ANIMATION_DELAY: 5000,
    SCROLL_THRESHOLD: 300,
    MESSAGE_TIMEOUT: 3000
};

// Classe para gerenciar o modal de login
class LoginModal {
    constructor() {
        this.modal = document.getElementById('popup-login');
        this.trigger = document.querySelector('.botao[href="#"]');
        this.closeBtn = document.querySelector('.botao-fechar');
        this.init();
    }

    init() {
        if (!this.modal || !this.trigger || !this.closeBtn) return;

        this.trigger.addEventListener('click', (e) => {
            e.preventDefault();
            this.show();
        });

        this.closeBtn.addEventListener('click', () => this.hide());
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.hide();
        });
    }

    show() {
        this.modal.style.display = 'flex';
        this.modal.setAttribute('aria-hidden', 'false');
    }

    hide() {
        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');
    }
}

// Classe para gerenciar mensagens flash
class FlashMessages {
    constructor() {
        this.messages = document.querySelectorAll('.flash-message');
        this.init();
    }

    init() {
        this.messages.forEach(message => {
            this.setupAutoHide(message);
            this.setupClickToHide(message);
        });
    }

    setupAutoHide(message) {
        setTimeout(() => {
            this.hideMessage(message);
        }, CONFIG.ANIMATION_DELAY);
    }

    setupClickToHide(message) {
        message.addEventListener('click', () => {
            this.hideMessage(message);
        });
    }

    hideMessage(message) {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 500);
    }
}

// Classe para animações de scroll
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animar-ao-rolar');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visivel');
                }
            });
        });

        this.elements.forEach(element => observer.observe(element));
    }
}

// Classe para o carrossel de depoimentos
class DepoimentosCarousel {
    constructor() {
        this.depoimentos = document.querySelectorAll('.cartao-depoimento');
        this.total = this.depoimentos.length;
        this.current = 0;
        this.nextBtn = document.querySelector('.proximo-depoimento');
        this.prevBtn = document.querySelector('.depoimento-anterior');
        this.init();
    }

    init() {
        if (this.total === 0 || !this.nextBtn || !this.prevBtn) return;

        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.showCurrent();
    }

    showCurrent() {
        this.depoimentos.forEach((depoimento, i) => {
            depoimento.style.display = i === this.current ? 'block' : 'none';
        });
    }

    next() {
        this.current = (this.current + 1) % this.total;
        this.showCurrent();
    }

    prev() {
        this.current = (this.current - 1 + this.total) % this.total;
        this.showCurrent();
    }
}

// Classe para o botão "Voltar ao Topo"
class BackToTop {
    constructor() {
        this.button = this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.textContent = '⬆';
        button.classList.add('voltar-ao-topo');
        button.setAttribute('aria-label', 'Voltar ao topo da página');
        document.body.appendChild(button);
        return button;
    }

    init() {
        window.addEventListener('scroll', () => {
            this.button.style.display = window.scrollY > CONFIG.SCROLL_THRESHOLD ? 'block' : 'none';
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Classe para gerenciar inscrições em cursos
class CourseEnrollment {
    constructor() {
        this.isAuthenticated = document.body.getAttribute('data-authenticated') === 'true';
        this.warningMessage = document.getElementById('mensagem-aviso');
        this.enrollButtons = document.querySelectorAll('.botao-inscrever');
        this.init();
    }

    init() {
        this.enrollButtons.forEach(button => {
            button.addEventListener('click', () => this.handleEnrollment(button));
        });
    }

    handleEnrollment(button) {
        if (!this.isAuthenticated) {
            this.showWarning();
        } else {
            button.closest('form').submit();
        }
    }

    showWarning() {
        if (this.warningMessage) {
            this.warningMessage.style.display = 'block';
                    setTimeout(() => {
                this.warningMessage.style.display = 'none';
            }, CONFIG.MESSAGE_TIMEOUT);
        }
    }
}

// Classe para gerenciar navegação entre seções
class SectionNavigation {
    constructor() {
        this.sectionIds = ['sobre', 'duvidas', 'planos', 'contato', 'area-aluno'];
        this.mainContent = document.getElementById('main-content');
        this.logo = document.getElementById('logo-header');
        this.init();
    }

    init() {
        this.setupNavLinks();
        this.setupLogoClick();
        this.handleInitialSection();
    }

    setupNavLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
            });
        });
    }

    setupLogoClick() {
        if (this.logo) {
            this.logo.addEventListener('click', () => this.showMainContent());
        }
    }

    handleInitialSection() {
        const hash = window.location.hash.replace('#', '');
        if (this.sectionIds.includes(hash)) {
            this.showSection(hash);
        } else {
            this.showMainContent();
        }
    }

    hideAllSections() {
        if (this.mainContent) this.mainContent.style.display = 'none';
        this.sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    showSection(sectionId) {
        this.hideAllSections();
        const el = document.getElementById(sectionId);
        if (el) el.style.display = '';
    }

    showMainContent() {
        if (this.mainContent) this.mainContent.style.display = '';
        this.sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }
}

// Classe para gerenciar modal de confirmação de exclusão
class DeleteConfirmationModal {
    constructor() {
        this.deleteBtn = document.getElementById("botao-excluir");
        this.modal = document.getElementById("modal-confirmacao");
        this.confirmBtn = document.getElementById("confirmar-exclusao");
        this.cancelBtn = document.getElementById("cancelar-exclusao");
        this.form = document.getElementById("form-excluir-conta");
        this.init();
    }

    init() {
        if (!this.deleteBtn || !this.modal || !this.confirmBtn || !this.cancelBtn) return;

        this.deleteBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.show();
        });

        this.confirmBtn.addEventListener("click", () => this.confirm());
        this.cancelBtn.addEventListener("click", () => this.hide());

        window.addEventListener("click", (e) => {
            if (e.target === this.modal) this.hide();
        });
    }

    show() {
        this.modal.style.display = "flex";
    }

    hide() {
        this.modal.style.display = "none";
    }

    confirm() {
        if (this.form) {
            this.form.submit();
        }
    }
}

// Inicialização da aplicação
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar todos os componentes
    new LoginModal();
    new FlashMessages();
    new ScrollAnimations();
    new DepoimentosCarousel();
    new BackToTop();
    new CourseEnrollment();
    new SectionNavigation();
    new DeleteConfirmationModal();

    // Verificar se há popup de cadastro para exibir
    const body = document.querySelector('body');
    const cadastroSucesso = body.getAttribute('data-cadastro-sucesso') === 'true';

    if (cadastroSucesso) {
        const popupCadastro = document.getElementById('popup-cadastro');
        if (popupCadastro) {
            popupCadastro.style.display = 'flex';
        }
    }
});