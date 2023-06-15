import * as UserController from "../controllers/UserControllers";
import { Router } from "express";
import { UserAuth } from "../middlewares/UserAuth";
const router = Router();

// rota para criar um novo usuário
router.post("/user", UserController.create);

// rota para autenticar um usuário
router.post("/user/auth", UserController.login);

// rota para atualizar um usuário
// utilizando o UserAuth para verificar se o usuário está logado
router.put("/user", UserAuth, UserController.update);

export default router;
