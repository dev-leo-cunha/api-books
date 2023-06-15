import { Router } from "express";
import * as BookController from "../controllers/BookControllers";
import { UserAuth } from "../middlewares/UserAuth";
import { upload } from "../config/multer";

const router = Router();

// Rota para buscar todos os livros
// Utilizando o UserAuth para verificar se o usuário está logado
router.get("/books", UserAuth, BookController.getAll);

// Rota para criar um novo livro
// Utilizando o UserAuth para verificar se o usuário está logado
// Utilizando o multer para fazer o upload da imagem do livro
router.post(
  "/books",
  UserAuth,
  upload.single("coverBook"),
  BookController.create
);

// Rota para buscar um livro pelo id
// Utilizando o UserAuth para verificar se o usuário está logado
// Utilizando o multer para fazer o upload da imagem do livro
router.put(
  "/books/:id",
  UserAuth,
  upload.single("newCoverBook"),
  BookController.update
);

// Rota para deletar um livro pelo id
// Utilizando o UserAuth para verificar se o usuário está logado
router.delete("/books/:id", UserAuth, BookController.remove);

export default router;
