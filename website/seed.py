import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from website import create_app, db
from website.models import Curso

def seed_data():
    cursos = [
        Curso(titulo="Introdução à IA generativa", descricao="Aprenda os conceitos básicos de IA generativa e suas aplicações. Descubra como essa tecnologia está revolucionando áreas como criação de conteúdo, design, programação e muito mais."),
        Curso(titulo="IA no marketing e vendas", descricao="Descubra como a IA pode transformar estratégias de marketing. Aprenda a usar ferramentas inteligentes para análise de dados, personalização de campanhas e aumento de conversões em vendas."),
        Curso(titulo="Uso consciente e ético da IA", descricao="Entenda a importância da ética no uso de tecnologias de IA. Explore práticas responsáveis para evitar vieses, proteger dados e promover a inclusão em soluções baseadas em inteligência artificial."),
        Curso(titulo="Aumente sua produtividade", descricao="Ferramentas de IA para otimizar seu trabalho diário. Descubra como automatizar tarefas repetitivas, organizar fluxos de trabalho e melhorar a eficiência em projetos pessoais e profissionais."),
        Curso(titulo="Tecnologias emergentes", descricao="Explore as tendências mais recentes em inteligência artificial. Conheça inovações como aprendizado profundo, visão computacional e processamento de linguagem natural para se manter à frente no mercado."),
        Curso(titulo="Chatbots e Assistentes Virtuais", descricao="Aprenda a criar chatbots e assistentes virtuais utilizando IA. Descubra como implementar soluções que automatizam interações e melhoram a experiência do usuário.")
    ]
    db.session.bulk_save_objects(cursos)
    db.session.commit()

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        seed_data()