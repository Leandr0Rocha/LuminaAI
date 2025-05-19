# Lumina AI
![image](https://github.com/user-attachments/assets/b0ee0e05-1134-425e-adcd-2e57cd742119)

Lumina AI é uma plataforma de aprendizado que oferece cursos e soluções em inteligência artificial para estudantes, profissionais e empresas. O projeto utiliza **Flask** como backend, **SQLite** como banco de dados e segue o padrão de APIs RESTful para comunicação e manipulação de dados.

---

## 📋 Funcionalidades Principais

- **Interface do Usuário**:
  - Página inicial com informações sobre a plataforma e cursos disponíveis.
  - Página de cadastro e login para usuários.
  - Mensagens flash para feedback ao usuário (sucesso, erro, informações).

- **Backend (API RESTful)**:
  - Rotas organizadas em Blueprints para melhor modularização.
  - Endpoints RESTful para cadastro, login, inscrição em cursos, consulta de cursos e envio de mensagens de contato.
  - Respostas e redirecionamentos em formato JSON ou HTML, conforme a necessidade da interface.

- **Banco de Dados**:
  - Integração com **Flask-SQLAlchemy** para persistência de dados.
  - Banco de dados **SQLite** para fácil configuração e portabilidade.
  - Tabelas para usuários, cursos (com campos como duração, instrutor, capítulos, imagem) e associações entre eles.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**:
  - HTML5, CSS3
  - JavaScript para interatividade (popups, mensagens flash, animações)

- **Backend**:
  - Flask (framework web Python)
  - Flask-SQLAlchemy (ORM)
  - Flask-Login (autenticação)
  - APIs RESTful para manipulação de dados

- **Banco de Dados**:
  - SQLite (padrão, fácil de usar e embutido)

---

## 🌐 Rotas RESTful do Backend

### Rotas Públicas
- **`GET /`**: Página inicial (index) e listagem de cursos.
- **`GET /cadastro`**: Página de cadastro de novos usuários.
- **`POST /cadastro`**: Criação de novo usuário.
- **`POST /login`**: Autenticação do usuário.
- **`POST /contato`**: Envio de mensagem de contato.

### Rotas Protegidas (Requer Login)
- **`GET /home`**: Página inicial para usuários logados, exibindo cursos disponíveis e área do aluno.
- **`POST /inscrever/<int:curso_id>`**: Inscreve o usuário logado em um curso específico.
- **`GET /curso/<int:curso_id>`**: Detalhes de um curso específico.
- **`POST /excluir-conta`**: Exclui a conta do usuário logado.
- **`GET /logout`**: Faz logout do usuário.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Python 3.8+**
- **Pip** (gerenciador de pacotes do Python)
- **Virtualenv** (opcional, mas recomendado)

### Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/lumina-ai.git
   cd lumina-ai
   ```

2. **Crie um ambiente virtual (opcional, mas recomendado)**:
   ```bash
   python -m venv venv
   venv\Scripts\activate     # No Windows
   # ou
   source venv/bin/activate  # No Linux/Mac
   ```

3. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure o banco de dados**:
   - Crie o banco de dados SQLite e as tabelas necessárias:
     ```bash
     python
     >>> from website import db, create_app
     >>> app = create_app()
     >>> with app.app_context():
     ...     db.create_all()
     ...     exit()
     ```

5. **(Opcional) Popule o banco com cursos iniciais**:
   ```bash
   python website/seed.py
   ```

6. **Execute o servidor Flask**:
   ```bash
   flask run
   ```

7. **Acesse o projeto no navegador**:
   - [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## 🗂️ Estrutura do Projeto

```
Lumina/
├── website/
│   ├── static/          # Arquivos estáticos (CSS, JS, imagens)
│   ├── templates/       # Templates HTML
│   ├── __init__.py      # Inicialização do app Flask
│   ├── models.py        # Definição das tabelas do banco de dados
│   ├── views.py         # Rotas e lógica do backend (APIs RESTful)
│   ├── seed.py          # Script para popular o banco de dados
├── requirements.txt     # Dependências do projeto
└── run.py               # Arquivo principal para rodar o app
```

---

## 📚 Observações

- O projeto segue o padrão RESTful para rotas e manipulação de dados.
- O backend Flask serve tanto páginas HTML quanto endpoints para manipulação de dados via formulários.
- O banco SQLite é usado por padrão para facilitar testes e desenvolvimento local.
- Para produção, recomenda-se trocar o banco para PostgreSQL ou MySQL e configurar variáveis de ambiente adequadas.

---

Agora você está pronto para executar e evoluir o Lumina AI! 🚀