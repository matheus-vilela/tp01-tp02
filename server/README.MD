## Para executar o projeto

Siga os passos abaixo para configurar o ambiente.

---
## Backend

\
Considerando que já tenha o Docker instalado previamente em sua máquina:

1) Crie um container no Docker utilizando o código abaixo:
```
docker run --name 'blood-donation' -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```
2) Execute o codigo abaixo para garantir que o container foi inicializado:
```
docker start 'blood-donation'
```
3) Abra o console do container:
```
docker exec -it 'blood-donation' bash
```
4) Logue no postgress:
```
psql -U root
```
5) Execute o comando abaixo para criar o banco de dados:
```
CREATE DATABASE blooddonation;
```
\
Pronto DATABASE criado!


6) Para sair do banco de dados:

```
\q
```
7) Para voltar ao console do sistema padrao:
```
exit
```
\
Após criado o banco de dados,


8) No console, navegue até a pasta backend do projeto, e execute o código abaixo para instalar as dependências:
```
yarn
```
9) Após finalizar execute para iniciar o servidor:
```
yarn dev
```
Se tudo ocorreu da forma esperada, deverá aparecer a mensagem abaixo no terminal:
```
🚀 ==> Servidor rodando na porta 3002 (http://localhost:3002/)
```

---
---

## FRONTEND

\
No console, navegue até a pasta web do projeto, e execute o código abaixo para instalar as dependências:
```
yarn
```
Após finalizar execute para iniciar o servidor:
```
yarn dev
```


---
---
by Matheus Vilela

---
---