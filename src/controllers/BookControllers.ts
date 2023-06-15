import { NextFunction, Request, Response } from "express";
import * as BookServices from "../services/BookServices";

// as únicas funções do controller são para receber a requisição, chamar o service e retornar a resposta

// função para buscar todos os livros
export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await BookServices.getAllBooks();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// função para criar um novo livro
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, description } = req.body;
  const { user_id } = req;
  const coverBook = req.file;
  try {
    const result = await BookServices.create({
      title,
      author,
      description,
      user_id,
      coverBook,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// função para editar um livro
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { newTitle, newAuthor, newDescription } = req.body;
  const { user_id } = req;
  const newCoverBook = req.file;
  try {
    await BookServices.update({
      id,
      newTitle,
      newAuthor,
      newDescription,
      newCoverBook,
      user_id,
    });
    return res.status(200).json({ message: "Livro atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
};

// função para remover um livro
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { user_id } = req;
  try {
    await BookServices.remove(id, user_id);
    return res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};
