import { compare, hash } from "bcrypt";
import { ICreate, IUpdate } from "../interfaces/UserInterfaces";
import * as UserRepositories from "../repositories/UserRepositories";
import { sign } from "jsonwebtoken";

// Services são responsáveis por fazer todo o trabalho pesado, como por exemplo, validar os dados, verificar se o usuário existe, etc.

// função para criar um novo usuário e fazer todas as verificações
// mandando para o repositório para salvar no banco de dados
export const create = async ({ name, email, password }: ICreate) => {
  if (!name || !email || !password) throw new Error("Preencha todos os campos");
  const findUser = await UserRepositories.findUserByEmail(email);
  if (findUser) throw new Error("Email já cadastrado");
  const passwordHash = await hash(password, 10);
  const result = await UserRepositories.create({
    name,
    email,
    password: passwordHash,
  });
  return result;
};

// função para fazer o login do usuário, verificando se o email existe, se a senha está correta e gerando um token para o usuário
// O token é gerado utilizando o JWT, que é uma biblioteca que gera tokens de autenticação
// Mandando para o repositório para salvar no banco de dados
export const login = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Preencha todos os campos");
  const findUser = await UserRepositories.findUserByEmail(email);
  if (!findUser) throw new Error("Email ou Senha inválidos");
  const passwordCompare = await compare(password, findUser.password);
  if (!passwordCompare) throw new Error("Email ou Senha inválidos");
  const token = sign({ email }, process.env.JWT_SECRET as string, {
    subject: findUser.id,
    expiresIn: 60 * 10,
  });
  return { token, user: { name: findUser.name, email: findUser.email } };
};

// função para editar um usuário, verificando se o usuário existe, se a senha antiga está correta
// Mandando para o repositório para salvar no banco de dados
export const update = async ({
  newName,
  newPassword,
  oldPassword,
  user_id,
}: IUpdate) => {
  if (!oldPassword) throw new Error("Preencha o campo de senha antiga");
  const findUser = await UserRepositories.findUserById(user_id);
  if (!findUser) throw new Error("Usuário não encontrado");
  const passwordCompare = await compare(oldPassword, findUser.password);
  if (!passwordCompare) throw new Error("Senha antiga incorreta");
  if (newName) {
    await UserRepositories.updateName(newName, user_id);
  }
  if (newPassword) {
    const passwordHash = await hash(newPassword, 10);
    await UserRepositories.updatePassword(passwordHash, user_id);
  }
  return { message: "Usuário atualizado com sucesso" };
};
