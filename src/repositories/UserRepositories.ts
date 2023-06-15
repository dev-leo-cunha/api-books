import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/UserInterfaces";

// Repositories são responsáveis por fazer a comunicação com o banco de dados
// Aqui é onde fazemos as queries no banco de dados


// função para criar um novo usuário no banco de dados e retornar o usuário criado
export const create = async ({ name, email, password }: ICreate) => {
  const result = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
  return result;
};

// função para buscar um usuário pelo email e retornar o usuário encontrado
export const findUserByEmail = async (email: string) => {
  const result = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return result;
};

// função para buscar um usuário pelo id e retornar o usuário encontrado
export const findUserById = async (id: string) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// função para atualizar o nome do usuário e retornar o usuário atualizado
export const updateName = async (name: string, user_id: string) => {
  const result = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      name,
    },
  });
  return result;
};

// função para atualizar o password do usuário e retornar o usuário atualizado
export const updatePassword = async (password: string, user_id: string) => {
  const result = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      password,
    },
  });
  return result;
};
