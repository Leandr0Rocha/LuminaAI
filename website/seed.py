import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from website import create_app, db
from website.models import Curso

def seed_data():
    cursos = [
        Curso(
            titulo="Introdução à IA generativa",
            descricao="Aprenda os conceitos básicos de IA generativa e suas aplicações. Descubra como essa tecnologia está revolucionando áreas como criação de conteúdo, design, programação e muito mais.",
            duracao="4h 30min",
            instrutor="Marie Maitre",
            capitulos="O que é IA generativa;Aplicações práticas;Ferramentas populares;Exemplos de uso"
        ),
        Curso(
            titulo="IA no marketing e vendas",
            descricao="Descubra como a IA pode transformar estratégias de marketing. Aprenda a usar ferramentas inteligentes para análise de dados, personalização de campanhas e aumento de conversões em vendas.",
            duracao="3h",
            instrutor="João Souza",
            capitulos="Fundamentos de IA no marketing;Ferramentas de automação;Estudos de caso;Tendências futuras"
        ),
        Curso(
            titulo="Uso consciente e ético da IA",
            descricao="Entenda a importância da ética no uso de tecnologias de IA. Explore práticas responsáveis para evitar vieses, proteger dados e promover a inclusão em soluções baseadas em inteligência artificial.",
            duracao="2h 45min",
            instrutor="Ana Julia",
            capitulos="Ética em IA;Vieses e riscos;Proteção de dados;Inclusão e diversidade"
        ),
        Curso(
            titulo="Aumente sua produtividade",
            descricao="Ferramentas de IA para otimizar seu trabalho diário. Descubra como automatizar tarefas repetitivas, organizar fluxos de trabalho e melhorar a eficiência em projetos pessoais e profissionais.",
            duracao="2h",
            instrutor="Carla Abrantes",
            capitulos="Automação de tarefas;Organização com IA;Dicas de produtividade;Ferramentas recomendadas"
        ),
        Curso(
            titulo="Tecnologias emergentes",
            descricao="Explore as tendências mais recentes em inteligência artificial. Conheça inovações como aprendizado profundo, visão computacional e processamento de linguagem natural para se manter à frente no mercado.",
            duracao="5h",
            instrutor="Fernanda Lopes",
            capitulos="Aprendizado profundo;Visão computacional;PLN;Inovações do mercado"
        ),
        Curso(
            titulo="Chatbots e Assistentes Virtuais",
            descricao="Aprenda a criar chatbots e assistentes virtuais utilizando IA. Descubra como implementar soluções que automatizam interações e melhoram a experiência do usuário.",
            duracao="3h 30min",
            instrutor="Ricardo Moreira",
            capitulos="Introdução a chatbots;Ferramentas de criação;Boas práticas;Exemplos reais"        )
    ]
    db.session.bulk_save_objects(cursos)
    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_data()