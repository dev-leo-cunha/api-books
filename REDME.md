# API de uma Biblioteca para Usuários
</br>

## 📖  Descrição

Este é um projeto feito em Nodejs + typescript de uma api para livros e usuários.



## 🛠️ Funcionalidades

- Usuário: Criação, autenticação e edição.
- Livros: Criação, Leitura, Edição, Remoção (CRUD)



## 📖 Aprendizado
- Organização do sistema com controllers, services e repositories para melhor manutenção futura.
- Configuração do Prisma.
- Upload de imagens no AWS utilizando o aws-sdk e o multer.
- Autenticação com JWT e criptografia de senha com Bcrypt.
- Middleware para o tratamento de erros de requisições feito no server.ts

## 🔎 Inicialização do Projeto
Para executar este projeto, você precisará adicionar as seguintes variáveis ​​de ambiente ao seu arquivo .env

- `DATABASE_URL="file:./dev.db"`

- `AWS_ACCESS_KEY_ID`

- `AWS_SECRET_ACCESS_KEY`

- `AWS_REGION`

- `ACCESS_KEY_TOKEN`

- `PORT`


## 🛠️ Implementação

```bash
  npm install
```

```bash
  npm run dev
```