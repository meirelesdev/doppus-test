# Teste Doppus Gerenciador de Usuários

---

Este repositório foi criado para gerenciar o versionamento do código do projeto de teste para a empresa <a href="https://doppus.com/" >Doppus</a>

- [A API Gerenciador de Usuários esta OnLine está aqui.](https://api.danielmeireles.com/)
- [O Frontend Gerenciador de Usuários esta OnLine está aqui.](https://app-doppus.danielmeireles.com/)
  <p align="center">	
     <a href="https://www.linkedin.com/in/developer-danielmn/">
        <img alt="Daniel Meireles" src="https://img.shields.io/badge/-Daniel Meireles-0080000?style=flat&logo=Linkedin&logoColor=white" />
     </a>
    <img alt="Repository size" src="https://img.shields.io/github/languages/code-size/meirelesdev/doppus-test?color=0080000label=repo%20size">
    <a href="https://github.com/meirelesdev/doppus-test/commits/main">
      <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/meirelesdev/doppus-test?color=0080000">
  </p>

# :pushpin: Índice

- [Sobre](#sobre)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como rodar o projeto](#rodando-o-projeto)

<a id="sobre"></a>

## :bookmark: Sobre

O projeto **Gerenciador de Usuários** é composto por um frontend moderno desenvolvido em ReactJS e um backend robusto construído com Laravel. O objetivo deste projeto mostrar minhas habilidades nas tecnologias utilizadas.

### Backend

O backend foi desenvolvido utilizando o framework Laravel em PHP, seguindo os princípios de uma API RESTful para gerenciar um sistema de usuários. Ele é responsável por fornecer todas as funcionalidades necessárias para a manipulação de dados dos usuários assim como autenticação, comunicando-se com um banco de dados MySQL para armazenamento persistente. As principais funcionalidades do backend incluem:

- **Criar Usuário**
- **Listar Usuários**
- **Atualizar Usuário**
- **Deletar Usuário**
- **Login e Logout**

O backend também implementa testes unitários para garantir a qualidade e a estabilidade das funcionalidades principais.

### Frontend

O frontend da aplicação foi desenvolvido utilizando ReactJS, focando em proporcionar uma experiência de usuário fluida e responsiva. A aplicação se comunica com o backend utilizando Axios para realizar as chamadas de API. Para o design e a estilização da interface, utilizamos a biblioteca [Material UI](https://mui.com/), que oferece componentes estilizados e prontos para uso.

Funcionalidades principais do frontend:

- **Criar Usuário**
- **Listar Usuários**
- **Atualizar Usuário**
- **Deletar Usuário**
- **Login e Logout**

Este projeto demonstra a integração entre um backend eficiente e um frontend moderno, resultando em uma aplicação completa para gestão de usuários.

<a id="tecnologias-utilizadas"></a>

## :rocket: Tecnologias Utilizadas

O projeto aqui disposto foi desenvolvido utilizando as seguintes tecnologias:

- [PHP](https://www.php.net/)
- [Laravel 11.x](https://laravel.com/)
- [MySQL](https://dev.mysql.com/)
- [ReactJS](https://pt-br.reactjs.org/)
- [Axios](https://axios-http.com/docs/intro)
- [Material UI](https://mui.com/)

<a id="rodando-o-projeto"></a>

## :rocket: Como Rodar o projeto

1. Clone este repositório:

```sh
   git clone https://github.com/meirelesdev/doppus-test.git
```

2. Navegue até o diretório do projeto:

```sh
  cd doppus-test
```

3. Subindo os containers:
   Nesta etapa é necessario ter o docker e docker compose instaldos:

```sh
  docker-compose up -d
```

Este comando ira subir todos os containers

4. Com os container rodando vamos rodar o comando para atualizar as dependencias:

```sh
  docker-compose exec backend composer update
```

5. Depois de atualizar as dependencias vamos executar as migrations com o comando:

```sh
  docker-compose exec backend php artisan migrate
```

Com estes passos simples você deve encontrar o frontend rodando em `localhost:3000` e o backend rodando em `localhost:8080`

<h4 align="center">
    Feito com ❤️ by <a href="https://www.linkedin.com/in/developer-danielmn/" target="_blank">Daniel Meireles</a>
</h4>
