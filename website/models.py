from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class User(db.Model, UserMixin):
    """Modelo para armazenar informações dos usuários."""
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    username = db.Column(db.String(150), unique=True, nullable=False)  # Nome de usuário único
    email = db.Column(db.String(150), unique=True, nullable=False)  # E-mail único
    password = db.Column(db.String(150), nullable=False)  # Senha do usuário
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())  # Data de criação do usuário
    cursos = db.relationship('Curso', secondary='user_curso', backref='alunos')  # Relacionamento com cursos

class Curso(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<Curso {self.titulo}>'

# Tabela de associação para o relacionamento muitos-para-muitos
user_curso = db.Table(
    'user_curso',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('curso_id', db.Integer, db.ForeignKey('curso.id'))
)