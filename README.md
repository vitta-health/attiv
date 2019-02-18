# Attiv Node Framework

###### [Tutorial em construção, ainda pode ter alguns erros que serão corrigidos nas proximas atualizações]

#### Framework em constante evolução e construção.

### Pré condições

Para este tutorial funcionar, é necessario já estar com uma base de dados mysql pré instalado configurada e um banco de dados criado.

Alem disso, é necessario ter o npm e node instalado nas versões mais recentes

### Instalação

1 - Clone o repositorio

2 - Acesse o projeto que você acabou e clonar

3 - Execute os seguintes comandos no diretorio raiz da aplicação

```shell
npm install
npm run postinstall
```

Nesta etapa o framework já esta configurado e agora já é possivel referenciar seus arquivos usando o alias `vitta-api`

4 - Acesse o diretorio `example` e execute os comandos abaixo

```shell
npm install
```

5 - Altere o nome do arquivo `.env.example` para `.env`

6 - Altere as configurações do banco de dados no `.env`

7 - Execute os seguintes comandos para criar as tabelas no mysql

```shell
node_modules/.bin/sequelize db:migrate
```

- Se algum erro acontecer nesta etapa, revise a configuração do banco de dados

8 - Execute agora o comando `npm run dev` para executar a aplicação, se tudo correu bem sua api está no ar, usando o framework da Vitta.
