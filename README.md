Api Desafio das Taks

## Sobre o desafio

Tarefa 1: Configuração do ambiente

    • Configure um novo projeto React para o front-end e um projeto Node.js
    para o back-end.
    • Certifique-se de que ambos os projetos utilizem TypeScript.

Tarefa 2: CRUD de Tarefas

    • Crie um modelo de dados para um objeto chamado "Tarefa" (Task) com campos como
    "título", "descrição", "data de criação", "tags" e "responsável".

    • Implemente operações CRUD (Create, Read, Update, Delete) para as tarefas no back-
    end, incluindo a capacidade de adicionar e remover tags e associar um responsável a

    cada tarefa.
    • Crie páginas no front-end para listar, criar, editar e excluir tarefas. Os usuários devem
    poder adicionar e remover tags, selecionar um responsável ao criar ou editar tarefas.

Tarefa 3: Autenticação

    • Implemente um sistema de autenticação de usuário no front-end.
    • Os usuários devem ser capazes de se cadastrar e fazer login.
    • Crie uma rota protegida no front-end que exija autenticação para acessar.

Tarefa 4: Layout Responsivo

    • Crie um layout responsivo para a aplicação, garantindo que ela seja exibida de forma
    adequada em dispositivos de diferentes tamanhos, como desktops, tablets e
    smartphones.

Tarefa 5: Filtros

    • Adicione a capacidade de filtrar tarefas por data, título, descrição, responsável e tags
    com correspondência parcial.
    • Implemente opções de filtro no front-end que permitam aos usuários pesquisar tarefas
    com base em critérios de filtro, incluindo a seleção de tags para filtrar tarefas.

Tarefa 6: Testes

    • Escreva testes automatizados para as funcionalidades adicionadas, incluindo os filtros
    pelos campos das tags.

## Rodar a aplicação

## Installation


```bash
npm install
```

Execute os comandos:


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Acesse no browser http://localhost:3000/login. Use o arquivo `api.http` para testar o JWT.

