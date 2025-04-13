from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import User, Curso
from . import db

views = Blueprint('views', __name__)

@views.route('/')
def index():
    """Serve a página inicial."""
    cursos = Curso.query.all()  # Busca todos os cursos do banco de dados
    return render_template('index.html', user=current_user, cursos=cursos)

@views.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    """Serve a página de cadastro e processa o formulário."""
    cadastro_sucesso = False  # Variável para indicar se o cadastro foi bem-sucedido

    if request.method == 'POST':
        nome_completo = request.form.get('nome-completo')
        nome_usuario = request.form.get('nome-usuario')
        email = request.form.get('email')
        senha = request.form.get('senha')
        repetir_senha = request.form.get('repetir-senha')

        # Validação dos campos
        if not all([nome_completo, nome_usuario, email, senha, repetir_senha]):
            flash('Todos os campos são obrigatórios.', category='error')
        elif senha != repetir_senha:
            flash('As senhas não coincidem.', category='error')
        elif User.query.filter_by(email=email).first():
            flash('E-mail já cadastrado.', category='error')
        elif User.query.filter_by(username=nome_usuario).first():
            flash('Nome de usuário já cadastrado.', category='error')
        else:
            # Cria um novo usuário
            novo_usuario = User(
                email=email,
                name=nome_completo,
                username=nome_usuario,
                password=generate_password_hash(senha, method='pbkdf2:sha256')
            )
            db.session.add(novo_usuario)
            db.session.commit()
            cadastro_sucesso = True  # Define que o cadastro foi bem-sucedido

    return render_template('cadastro.html', user=current_user, cadastro_sucesso=cadastro_sucesso)

@views.route('/login', methods=['POST'])
def login():
    """Processa o login do usuário."""
    email = request.form.get('email')
    password = request.form.get('password')

    # Busca o usuário no banco de dados pelo e-mail
    user = User.query.filter_by(email=email).first()
    if user:
        # Verifica se a senha está correta
        if check_password_hash(user.password, password):
            flash('Login realizado com sucesso!', category='success')
            login_user(user, remember=True)
            return redirect(url_for('views.home'))  # Redireciona para a página home
        else:
            flash('Senha incorreta. Tente novamente.', category='error')
    else:
        flash('E-mail não encontrado.', category='error')

    return redirect(url_for('views.index'))  # Redireciona para a página inicial em caso de erro


@views.route('/home')
@login_required
def home():
    """Serve a página pós-login."""
    cursos = Curso.query.all()
    return render_template('home.html', user=current_user, cursos=cursos)


@views.route('/logout')
@login_required
def logout():
    """Faz logout do usuário."""
    logout_user()
    flash('Você saiu da sua conta.', category='success')
    return redirect(url_for('views.index'))


@views.route('/inscrever/<int:curso_id>', methods=['POST'])
@login_required
def inscrever(curso_id):
    """Inscreve o usuário no curso especificado."""
    curso = Curso.query.get(curso_id)
    if not curso:
        flash('Curso não encontrado.', category='error')
        return redirect(url_for('views.home'))  # Redireciona para a página home

    if curso in current_user.cursos:
        flash('Você já está inscrito neste curso.', category='info')
    else:
        current_user.cursos.append(curso)
        db.session.commit()
        flash(f'Você se inscreveu no curso "{curso.titulo}"!', category='success')

    return redirect(url_for('views.home'))  # Redireciona para a página home