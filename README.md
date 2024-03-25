# Aplicação de Cadastro de Produtos

Este repositório contém uma aplicação web para gerenciar produtos, composta por uma API RESTful desenvolvida em Spring Boot com Java e um frontend em React.

### Tecnologias

- JDK 17
- Spring Boot com Maven
- Swagger
- PostgreSQL
- React
- Boostrap
- TypeScript
- Docker
- Docker compose

## Video da aplicação funcionando

https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/c9c9d892-d3cf-4a8b-8841-0918323e0341

## Requisitos

Antes de iniciar a instalação, certifique-se de ter as seguintes tecnologias instaladas em seu ambiente de desenvolvimento:

- Docker
- Docker Compose


## Instalação


Siga os passos abaixo para instalar e executar a aplicação:

1. Clone o repositorio do GitHub:


```shel
  git clone https://github.com/GabrielMorais2/spring-react-produtos-oak.git
```


2. Navegue até o diretorio da aplicação:


```shel
  cd spring-react-produtos-oak
```


3. Execute o docker compose para instalar iniciar a aplicação:


```shel
  docker-compose up -d
```


A aplicação estará disponivel em http://localhost:3000/ pelo frontend com React.


## Uso da API


A API oferece endpoints para realizar operações CRUD (Create, Read, Update, Delete) em produtos. Abaixo estão os principais endpoints disponíveis:

- POST /v1/products: Cria um novo produto.

![image](https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/a9ef0553-cdb6-44dc-a5b9-2c0f1df7ab40)


- GET /v1/products/${id}: Recupera os detalhes de um produto específico.

![image](https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/3ead3ad0-78b8-469f-9784-091542faf1e3)


- GET /v1/products: Lista todos os produtos podendo paginar os produtos.
- 
![image](https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/219bd56b-46f2-4a29-82ea-ff48e353941f)


- PUT /v1/products/${id}: Atualiza um produto existente.

![image](https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/36d12082-bcf2-43eb-9c82-1d468bcbee49)


- DELETE /v1/products/${id}: Exclui um produto existente.

![image](https://github.com/GabrielMorais2/spring-react-produtos-oak/assets/68476116/020c5927-9752-409e-8338-ac6ead0db3ea)


## Documentação da API

A documentação da API pode ser acessada via Swagger UI. Após iniciar o backend, abra seu navegador e acesse [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html) para visualizar e interagir com a documentação. Existe também na pasta docs, a collection de requisições do Postman.
