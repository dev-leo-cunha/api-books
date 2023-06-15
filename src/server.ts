import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import BooksRoutes from "./routes/BookRoutes";

// criando a variavel server para iniciar o servidor
const server: Application = express();

// configurando o cors para aceitar requisições de qualquer origem
server.use(cors());

// configurando o express para aceitar requisições com o corpo em json e urlencoded
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// configurando as rotas do servidor
server.use(UserRoutes);
server.use(BooksRoutes);

// middleware para tratar erros de requisição
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Erro interno do server.",
  });
});

// iniciando o servidor na porta que está na variavel de ambiente PORT em .env
server.listen(process.env.PORT, () =>
  console.log(`rodando em http://localhost:${process.env.PORT}/`)
);
