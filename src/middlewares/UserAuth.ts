import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { TokenPayload } from "../interfaces/UserInterfaces";


// função para autenticar um usuário pelo token de acesso, enviado pelo header da requisição
export const UserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token Faltando!" });
  }
  const [, token] = authorization.split(" ");
  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token Expirado!" });
  }
};

