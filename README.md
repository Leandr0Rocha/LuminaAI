# Lumina AI
![image](https://github.com/user-attachments/assets/b0ee0e05-1134-425e-adcd-2e57cd742119)

Lumina AI é uma plataforma de aprendizado que oferece cursos e soluções em inteligência artificial para estudantes, profissionais e empresas. Este projeto combina uma interface web interativa com um backend robusto em Flask, integrando operações com banco de dados para gerenciar usuários, cursos e interações.

---

## 📋 Funcionalidades Principais

- **Interface do Usuário**:
  - Página inicial com informações sobre a plataforma e cursos disponíveis.
  - Página de cadastro e login para usuários.
  - Página de dúvidas frequentes e planos para empresas.
  - Popups interativos para "Política de Privacidade" e "Termos de Uso".
  - Mensagens flash para feedback ao usuário (sucesso, erro, informações).

- **Backend**:
  - Gerenciamento de rotas para navegação e operações do usuário.
  - Autenticação e autorização de usuários com `Flask-Login`.
  - Inscrição em cursos e gerenciamento de dados do usuário.

- **Banco de Dados**:
  - Integração com `Flask-SQLAlchemy` para persistência de dados.
  - Tabelas para usuários, cursos e associações entre eles.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**:
  - HTML5, CSS3
  - JavaScript para interatividade (popups e mensagens flash)

- **Backend**:
  - Flask
  - Flask-SQLAlchemy
  - Flask-Login

- **Banco de Dados**:
  - SQLite (pode ser substituído por outro banco de dados, como PostgreSQL ou MySQL)

---

## 🌐 Rotas do Backend

### Rotas Públicas
- **`/`**: Página inicial (index).
- **`/cadastro`**: Página de cadastro de novos usuários.
- **`/login`**: Processa o login do usuário.

### Rotas Protegidas (Requer Login)
- **`/home`**: Página inicial para usuários logados, exibindo cursos disponíveis.
- **`/logout`**: Faz logout do usuário.
- **`/inscrever/<int:curso_id>`**: Inscreve o usuário logado em um curso específico.

---

## 🖥️ Interface do Programa

### Páginas Principais
1. **Página Inicial (`/`)**:
   - Exibe informações sobre a Lumina AI e os cursos disponíveis.
   - Botões para navegação e login/cadastro.

3. **Página de Cadastro (`/cadastro`)**:
   - Formulário para criação de novos usuários.

4. **Página Home (`/home`)**:
   - Exibe cursos disponíveis para o usuário logado.
   - Permite inscrição em cursos.

5. **Página de Contato (`#contato`)**:
   - Formulário para envio de mensagens diretamente para a equipe da Lumina AI.

### Elementos Interativos
- **Popups**:
  - Confirmação de envio de mensagem no formulário de contato.
- **Mensagens Flash**:
  - Feedback visual para ações do usuário (ex.: sucesso no login, erro no cadastro).

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Python**: Certifique-se de ter o Python 3.8 ou superior instalado. [Baixe aqui](https://www.python.org/downloads/).
- **Pip**: O gerenciador de pacotes do Python (geralmente já vem com o Python).
- **Virtualenv (opcional)**: Para criar um ambiente virtual isolado.

### Instalação
1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/lumina-ai.git
   cd lumina-ai
   ```

2. **Crie um ambiente virtual (opcional, mas recomendado)**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Linux/Mac
   venv\Scripts\activate     # No Windows
   ```

3. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure o banco de dados**:
   - Crie o banco de dados SQLite e as tabelas necessárias:
     ```bash
     flask shell
     >>> from website import db
     >>> db.create_all()
     >>> exit()
     ```

5. **Execute o servidor Flask**:
   ```bash
   flask run
   ```

6. **Acesse o projeto no navegador**:
   - Abra o navegador e vá para: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

### Comandos Úteis

- **Criar um usuário administrador (opcional)**:
  Você pode criar um usuário diretamente no banco de dados para testes:
  ```bash
  flask shell
  >>> from website.models import User
  >>> from werkzeug.security import generate_password_hash
  >>> admin = User(name="Admin", email="admin@lumina.com", password=generate_password_hash("senha123", method='sha256'))
  >>> db.session.add(admin)
  >>> db.session.commit()
  >>> exit()
  ```

- **Resetar o banco de dados**:
  Caso precise limpar e recriar o banco de dados:
  ```bash
  flask shell
  >>> from website import db
  >>> db.drop_all()
  >>> db.create_all()
  >>> exit()
  ```

---

### Estrutura do Projeto

```
Lumina/
├── website/
│   ├── static/          # Arquivos estáticos (CSS, JS, imagens)
│   ├── templates/       # Templates HTML
│   ├── __init__.py      # Inicialização do app Flask
│   ├── models.py        # Definição das tabelas do banco de dados
│   ├── views.py         # Rotas e lógica do backend
├── requirements.txt     # Dependências do projeto
└── run.py               # Arquivo principal para rodar o app
```

---

Agora você está pronto para executar o projeto Lumina AI! 🎉
