# Gallery AI

## Funcionalidades principais

- Construir uma galeria de fotos responsiva que permita aos usuários fazer:
[Done] upload, 
[Done] visualizar e 
[Missing] organizar imagens

- Implementar recursos básicos de IA, incluindo:
[Done] Marcação automática de imagens (ex: "pôr do sol", "montanha", "pessoa")
[Missing] Funcionalidade de busca inteligente usando essas tags
[Missing] Opções simples de aprimoramento de imagem (brilho, contraste, etc.)

- Construir considerando escalabilidade:
[Missing] Estruture o código pensando em um sistema que poderia lidar com milhões de imagens
[Missing] Defina uma estratégia para processamento assíncrono de tarefas intensivas

## Stack Tecnológica
- Frontend: Next.js
- Backend: Next.js e Python
- Integração de IA: AWS Rekognition
- Database: AWS DynamoDB
- CDN: AWS S3
- Deploy: Vercel

## Desenvolvimento

### Instruções de configuração/instalação
- AWS
1. Criar conta na AWS
2. Criar usuário
3. Definir permissões para o usuário (S3, Rekognition, DynamoDb)
4. Criar bucket no S3 com nome *galleryai* com permissão de acesso público
5. Criar tabela no DynamoDb com o nome *galleryai* com campos necessários (id,nome)

- Repositório
1. Clonar
2. Renomear o arquivo *.env-model* para *.env* e adicionar as chaves da AWS
2. Criar ambienve virtual com python
```bash
python3 -m venv venv
source venv/bin/activate
```
3. Instalar bibliotecas
```bash
npm install
```
4. Executar a aplicação
```bash
npm run dev
```
5. Abrir a aplicação no endereço indicado no terminal (normalmente [http://localhost:3000](http://localhost:3000) )


### Visão geral da abordagem
Estudar blogs, soluções, projetos prontos, avaliar o que seria mais rápido, me basear nos requisitos, realizar testes, iniciar a solução final.

### Tecnologias utilizadas e por quê
Next.js, FastAPI, e Vercel foram escolhidas por serem as mais tradicionais.
Apesar de não ter muito domínio em todas, a bagagem de JavaScript, Python, e MAMP ajudou muito. 
Seria possível ter mais funcionalidades apenas em Next.js, e talvez dispensar FastAPI, mas parecia mais fácil trabalhar com a AWS em Python.
AWS apresenta soluções para tudo, e váris foram utilizadas no Free Tier para apenas centrar tudo em um ambiente mais fácil para uso e evitar muitas chaves de acesso.

### Desafios enfrentados e soluções implementadas
O tempo e a falta de habilidade com o FrontEnd.
Os requisitos eram muito complexos para serem implementados em 6 horas.
Evitei ao máximo o uso de IA, pois gostaria de saber o que há em cada linha do código.
Integrar todas as soluções deu muito trabalho, e resolver as questões de permissões e configurações da AWS também.
A última parte implementada antes de escrever este documento foi a questão de atualizar a página após um upload bem sucedido.
Testes não foram implementados, nem muitas validações de erros por falta de vontade mesmo, mas nessa parte creio que a IA ajuda muito, pois ela sugeria o tempo inteiro.
Gostaria de implementar mais funcionalidades, mas não consigo pois trabalho e estudo, e virei a madruga para entregar ao menos esse mínimo.
No entanto, gostei do desafio porque foi divertido e deu para fazer comendo pizza com Sprite, já tá valendo.
Além disso, ficou um bom protótipo para aulas e explicações, pois a lógica e o código ficaram simples.

### Estratégia de escalabilidade (como sua solução se comportaria com milhões de imagens e usuários)
No momento, a parte que precisa de ajuste para escalabilidade é a listagem de imagens no DynamoDb, pois ela não está paginada.
Fora isso, todas as outras ferramentas são escaláveis dependendo da demanda.

### O que você melhoraria com mais tempo
Adicionaria uma nuvem de tags variando o tamanho da letra da tag dependendo da quantidade de imagens com a mesma tag.