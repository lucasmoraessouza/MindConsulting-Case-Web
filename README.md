# MindConsulting-Case-Web

Sistema de web de controle de usuários, utilizando ReactJS. Feito para cadastrar e gerenciar usuários por nivel de acesso, utilizando autenticação e conexão com a base de dados MySQL.

- Nivel de acesso administrativo (999) - Tem acesso a listagem, desativação e alteraração dos usuarios cadastrados.
- Nivel de acesso Comum (1) - Tem acesso somente a seu perfil, podendo modifica-lo.
- Nivel de acesso desabilitado (0) - Não tem acesso a plataforma.

## Começando

- Instalação do [Backend](https://github.com/lucasmoraessouza/MindConsulting-Case-api.git)

```
$ cd MindConsulting-Case-api
```

```
$ yarn install
```

```
$ yarn dev
```

### Requisitos

- Node
- ReactJS
- Yarn
- [Backend](https://github.com/lucasmoraessouza/MindConsulting-Case-api.git)

### Iniciando

```
$ git clone https://github.com/lucasmoraessouza/MindConsulting-Case-Web.git
```

```
$ cd MindConsulting-Case-Web
```

```
$ yarn install
```

```
$ yarn start
```

### Configuração

- Baixar o Backend
- Iniciar o servidor
- Alterar o localhost no arquivo api.js

## Testes

- Realize o cadastro para acessar o seu dashboard.
- Visualize o seu perfil e clique no ícone de editar para habilitar a edição.
- Administradores podem ativar, desativar e excluir usuários através da tabela de listagem.
- Administradores podem escolher um usuário e clicando no ícone de editar, podem realizar alterações dos dados do usuário escolhido.

## Autores

- **Lucas de Moraes Souza**

## Agradecimentos

- Mind Consulting
