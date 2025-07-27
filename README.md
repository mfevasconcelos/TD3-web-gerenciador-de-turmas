# Gerenciador de Turmas - Full Stack com React, C# e Docker
Este repositório armazena o terceiro projeto prático da disciplina de Desenvolvimento de Software para Web, focado na construção de um Web Service em C# com .NET para uma Single Page Application (SPA) em React, com a aplicação inteira conteinerizada via Docker.

## Sobre a aplicação:
Sistema de gerenciamento de turmas que permite o cadastro e a manipulação de Alunos, Professores, Disciplinas e Turmas, substituindo a persistência de dados local (localStorage) por uma API RESTful robusta.

## Principais Funcionalidades
### Dashboard Inicial
- Apresenta um resumo com a quantidade total de alunos, professores, disciplinas e turmas cadastradas, com dados consumidos em tempo real da API.
### Gerenciamento Completo (CRUD)
- Alunos: Cadastro, edição e exclusão de alunos, com associação a uma turma.
- Professores: Cadastro, edição e exclusão de professores, com associação a uma disciplina.
- Disciplinas: Cadastro, edição e exclusão de disciplinas.
- Turmas: Cadastro, edição e exclusão de turmas, permitindo a associação de múltiplos alunos, professores e disciplinas.
### API RESTful
- Backend construído em C# e .NET que serve os dados para a aplicação React.
### Conteinerização
- A aplicação full stack (Frontend e Backend) é empacotada em uma única imagem Docker, pronta para ser executada em qualquer ambiente.

## Demonstração da Aplicação
A seguir, alguns screenshots da aplicação em funcionamento, servida a partir do container Docker:

### Dashboard Inicial com Dados da API
![Dashboard Inicial](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/dashboard-inicial.png)

### Gerenciamento de Alunos
![Page Alunos](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/page-alunos.png)

### Formulário de Criação de Novo Aluno (puxando dados da entidade Turmas)
![Formulário de Alunos](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/forms-alunos.png)

### Gerenciamento de Professores
![Page Professores](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/page-professores.png)

### Gerenciamento de Disciplinas
![Page Disciplinas](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/page-disciplinas.png)

### Visualização de Turmas
![Page Turmas](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/page-turmas.png)

### Formulário de Criação de Turma (com dados da API)
![Formulário de Turmas](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/forms-trumas.png)

### Requisições à API Monitoradas na Rede
Depois de algumas navegações na aplicação, é possível ver as requisições feitas à API:
![Requisições API](https://github.com/mfevasconcelos/TD3-web-gerenciador-de-turmas/blob/main/prints/requisi%C3%A7%C3%B5es-api.png)

## Tecnologias Utilizadas
### Frontend
- React 19
- Vite como ferramenta de build e servidor de desenvolvimento
- React Router DOM para gerenciamento de rotas
### Backend
- C# e .NET 8
- ASP.NET Core Web API para a construção dos endpoints RESTful.
- Banco de Dados In-Memory para persistência de dados durante a execução.
### Arquitetura & DevOps
- Princípios SOLID: A lógica de negócio do backend foi separada dos controllers em uma camada de Services, aplicando o Princípio da Responsabilidade Única (SRP).
- Docker: Um Dockerfile multi-stage utilizado para compilar o frontend, publicar o backend e unir os dois em uma imagem final otimizada.

## Como Executar o Projeto
Com Docker é possível executar a aplicação completa (Frontend + Backend) em um único container.

### Pré-requisitos:
Docker Desktop instalado e em execução.

### Passos:
1. Clone o repositório.
2. Pelo terminal, navegue até a pasta raiz do projeto.
3. Cosntrua a imagem Docker: **`docker build -t gerenciador-turmas .`**
5. Execute o container: **`docker run -p 8080:8080 gerenciador-turmas`**
7. Abra o navegador e acesse: **http://localhost:8080**
