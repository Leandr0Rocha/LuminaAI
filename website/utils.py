import re

def validar_email(email: str) -> bool:
    REGEX_EMAIL = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(REGEX_EMAIL, email) is not None

def validar_senha(senha1: str, senha2: str) -> str | None:
    if senha1 != senha2:
        return 'As senhas não coincidem.'
    if len(senha1) < 8:
        return 'A senha deve ter pelo menos 8 caracteres.'
    if not any(char.isdigit() for char in senha1):
        return 'A senha deve conter pelo menos um número.'
    if not any(char.isupper() for char in senha1):
        return 'A senha deve conter pelo menos uma letra maiúscula.'
    return None

def validar_nome(nome: str) -> str | None:
    if len(nome) < 2:
        return 'O nome deve ter pelo menos 2 caracteres.'
    return None

def validar_usuario(nome_usuario: str) -> str | None:
    if len(nome_usuario) < 3:
        return 'O nome de usuário deve ter pelo menos 3 caracteres.'
    return None

def validar_contato(nome: str, email: str, mensagem: str) -> str | None:
    if not nome:
        return 'O campo "Nome" é obrigatório.'
    if not email:
        return 'O campo "E-mail" é obrigatório.'
    if not validar_email(email):
        return 'Por favor, insira um e-mail válido.'
    if not mensagem:
        return 'O campo "Mensagem" é obrigatório.'
    if len(mensagem) < 10:
        return 'A mensagem deve ter pelo menos 10 caracteres.'
    return None 