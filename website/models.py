from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    """Modelo para armazenar informações dos usuários."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    cursos = db.relationship('Curso', secondary='user_curso', backref='alunos')

class Curso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    duracao = db.Column(db.String(50), nullable=True)
    instrutor = db.Column(db.String(100), nullable=True)
    capitulos = db.Column(db.Text, nullable=True)
    imagem = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<Curso {self.titulo}>'

# Tabela de associação para o relacionamento muitos-para-muitos
user_curso = db.Table(
    'user_curso',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('curso_id', db.Integer, db.ForeignKey('curso.id'))
)

class Contato(db.Model):
    """Modelo para armazenar mensagens do formulário de contato."""
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    mensagem = db.Column(db.Text, nullable=False)
    data_envio = db.Column(db.DateTime(timezone=True), default=func.now())