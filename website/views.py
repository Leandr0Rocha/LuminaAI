from flask import Blueprint, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import User, Curso, Contato
from . import db
from .utils import validar_email, validar_senha, validar_nome, validar_usuario, validar_contato
import re

views = Blueprint('views', __name__)

# Mensagens de erro e sucesso
MSG_CAMPOS_OBRIGATORIOS = 'Todos os campos são obrigatórios.'
MSG_NOME_CURTO = 'O nome deve ter pelo menos 2 caracteres.'
MSG_USUARIO_CURTO = 'O nome de usuário deve ter pelo menos 3 caracteres.'
MSG_EMAIL_INVALIDO = 'E-mail inválido.'
MSG_SENHAS_NAO_COINCIDEM = 'As senhas não coincidem.'
MSG_SENHA_CURTA = 'A senha deve ter pelo menos 8 caracteres.'
MSG_SENHA_NUMERO = 'A senha deve conter pelo menos um número.'
MSG_SENHA_MAIUSCULA = 'A senha deve conter pelo menos uma letra maiúscula.'
MSG_EMAIL_CADASTRADO = 'E-mail já cadastrado.'
MSG_USUARIO_CADASTRADO = 'Nome de usuário já cadastrado.'
MSG_LOGIN_SUCESSO = 'Login realizado com sucesso!'
MSG_SENHA_INCORRETA = 'Senha incorreta. Tente novamente.'
MSG_EMAIL_NAO_ENCONTRADO = 'E-mail não encontrado.'
MSG_LOGOUT = 'Você saiu da sua conta.'
MSG_CONTA_EXCLUIDA = 'Sua conta foi excluída com sucesso.'
MSG_CURSO_NAO_ENCONTRADO = 'Curso não encontrado.'
MSG_JA_INSCRITO = 'Você já está inscrito neste curso.'
MSG_INSCRICAO_SUCESSO = 'Você se inscreveu no curso "{titulo}"!'
MSG_NOME_OBRIGATORIO = 'O campo "Nome" é obrigatório.'
MSG_EMAIL_OBRIGATORIO = 'O campo "E-mail" é obrigatório.'
MSG_MENSAGEM_OBRIGATORIA = 'O campo "Mensagem" é obrigatório.'
MSG_MENSAGEM_CURTA = 'A mensagem deve ter pelo menos 10 caracteres.'
MSG_MENSAGEM_ENVIADA = 'Mensagem enviada com sucesso! Entraremos em contato em breve.'


@views.route('/')
def index():
    """Renderiza a página inicial com a lista de cursos."""
    cursos = Curso.query.all()  # Busca todos os cursos do banco de dados
    return render_template('index.html', user=current_user, cursos=cursos)

@views.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    """Renderiza e processa o formulário de cadastro de usuário."""
    cadastro_sucesso = False

    if request.method == 'POST':
        nome_completo = request.form.get('nome_completo')
        nome_usuario = request.form.get('nome_usuario')
        email = request.form.get('email')
        senha = request.form.get('senha')
        repetir_senha = request.form.get('repetir_senha')

        if not all([nome_completo, nome_usuario, email, senha, repetir_senha]):
            flash(MSG_CAMPOS_OBRIGATORIOS, category='error')
        elif (erro_nome := validar_nome(nome_completo)):
            flash(MSG_NOME_CURTO, category='error')
        elif (erro_usuario := validar_usuario(nome_usuario)):
            flash(MSG_USUARIO_CURTO, category='error')
        elif (erro_email := not validar_email(email)):
            flash(MSG_EMAIL_INVALIDO, category='error')
        elif (erro_senha := validar_senha(senha, repetir_senha)):
            if erro_senha == MSG_SENHAS_NAO_COINCIDEM:
                flash(MSG_SENHAS_NAO_COINCIDEM, category='error')
            elif erro_senha == MSG_SENHA_CURTA:
                flash(MSG_SENHA_CURTA, category='error')
            elif erro_senha == MSG_SENHA_NUMERO:
                flash(MSG_SENHA_NUMERO, category='error')
            elif erro_senha == MSG_SENHA_MAIUSCULA:
                flash(MSG_SENHA_MAIUSCULA, category='error')
            else:
                flash(erro_senha, category='error')
        elif User.query.filter_by(email=email).first():
            flash(MSG_EMAIL_CADASTRADO, category='error')
        elif User.query.filter_by(username=nome_usuario).first():
            flash(MSG_USUARIO_CADASTRADO, category='error')
        else:
            novo_usuario = User(
                email=email,
                name=nome_completo,
                username=nome_usuario,
                password=generate_password_hash(senha, method='pbkdf2:sha256')
            )
            db.session.add(novo_usuario)
            db.session.commit()
            cadastro_sucesso = True

    return render_template('cadastro.html', user=current_user, cadastro_sucesso=cadastro_sucesso)

@views.route('/login', methods=['POST'])
def login():
    """Processa o login do usuário."""
    email = request.form.get('email')
    senha = request.form.get('senha')

    usuario = User.query.filter_by(email=email).first()
    if usuario:
        if usuario.check_password(senha):
            flash(MSG_LOGIN_SUCESSO, category='success')
            login_user(usuario, remember=True)
            return redirect(url_for('views.home'))
        else:
            flash(MSG_SENHA_INCORRETA, category='error')
    else:
        flash(MSG_EMAIL_NAO_ENCONTRADO, category='error')

    return redirect(url_for('views.index'))


@views.route('/home')
@login_required
def home():
    """Renderiza a página inicial do usuário autenticado com a lista de cursos."""
    cursos = Curso.query.all()
    return render_template('home.html', user=current_user, cursos=cursos)


@views.route('/logout')
@login_required
def logout():
    """Realiza logout do usuário autenticado."""
    logout_user()
    flash(MSG_LOGOUT, category='success')
    return redirect(url_for('views.index'))


@views.route('/excluir-conta', methods=['POST'])
@login_required
def excluir_conta():
    """Exclui a conta do usuário logado."""
    user = current_user
    db.session.delete(user)
    db.session.commit()
    flash(MSG_CONTA_EXCLUIDA, category='success')
    return redirect(url_for('views.index'))


@views.route('/inscrever/<int:curso_id>', methods=['POST'])
@login_required
def inscrever(curso_id):
    """Inscreve o usuário no curso especificado."""
    curso = Curso.query.get(curso_id)
    if not curso:
        flash(MSG_CURSO_NAO_ENCONTRADO, category='error')
        return redirect(url_for('views.home'))  # Redireciona para a página home

    if curso in current_user.cursos:
        flash(MSG_JA_INSCRITO, category='info')
    else:
        current_user.cursos.append(curso)
        db.session.commit()
        flash(MSG_INSCRICAO_SUCESSO.format(titulo=curso.titulo), category='success')

    return redirect(url_for('views.home'))  # Redireciona para a página home


@views.route('/curso/<int:curso_id>')
@login_required
def curso(curso_id):
    """Renderiza a página de detalhes de um curso específico."""
    curso = Curso.query.get_or_404(curso_id)
    return render_template('curso.html', curso=curso, user=current_user)



@views.route('/contato', methods=['POST'])
def contato():
    """Processa o envio do formulário de contato."""
    nome = request.form.get('name')
    email = request.form.get('email')
    mensagem = request.form.get('message')

    erro = validar_contato(nome, email, mensagem)
    if erro:
        if erro == 'O campo "Nome" é obrigatório.':
            flash(MSG_NOME_OBRIGATORIO, category='error')
        elif erro == 'O campo "E-mail" é obrigatório.':
            flash(MSG_EMAIL_OBRIGATORIO, category='error')
        elif erro == 'Por favor, insira um e-mail válido.':
            flash(MSG_EMAIL_INVALIDO, category='error')
        elif erro == 'O campo "Mensagem" é obrigatório.':
            flash(MSG_MENSAGEM_OBRIGATORIA, category='error')
        elif erro == 'A mensagem deve ter pelo menos 10 caracteres.':
            flash(MSG_MENSAGEM_CURTA, category='error')
        else:
            flash(erro, category='error')
        return redirect(url_for('views.index'))

    # Salva a mensagem no banco de dados
    novo_contato = Contato(nome=nome, email=email, mensagem=mensagem)
    db.session.add(novo_contato)
    db.session.commit()

    flash(MSG_MENSAGEM_ENVIADA, category='success')
    return redirect(url_for('views.index'))