import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/UserServices";

// as únicas funções do controller são para receber a requisição, chamar o service e retornar a resposta

// função para criar um novo usuário
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const result = await UserServices.create({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// função para autenticar um usuário
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const result = await UserServices.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//função para atualizar um usuário
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { newName, newPassword, oldPassword } = req.body;
  const { user_id } = req;

  try {
    const result = await UserServices.update({
      newName,
      newPassword,
      oldPassword,
      user_id,
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
