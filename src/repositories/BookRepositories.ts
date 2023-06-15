import { prisma } from "../database/prisma";

// Repositories são responsáveis por fazer a comunicação com o banco de dados
// Aqui é onde fazemos as queries no banco de dados


// função para buscar todos os livros do banco de dados e retornar um array com todos os livros
export const getAll = async () => {
  const result = await prisma.books.findMany();
  return result;
};

// função para criar um novo livro no banco de dados e retornar o livro criado
export const create = async (
  title: string,
  author: string,
  description: string,
  coverBook: string,
  user_id: string
) => {
  const result = await prisma.books.create({
    data: {
      title,
      author,
      description,
      coverBook,
      userId: user_id,
    },
  });
  return result;
};

// função para buscar um livro pelo id e retornar o livro encontrado
export const findBookById = async (id: string) => {
  const result = await prisma.books.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// função para fazer o upload do link da imagem do livro e retornar o livro atualizado
export const updateImage = async (coverBook: string, id: string) => {
  const result = await prisma.books.update({
    where: {
      id,
    },
    data: {
      coverBook,
    },
  });
  return result;
}

// função para atualizar um livro e retornar o livro atualizado
export const update = async (id:string,
  title:string,
  author:string,
  description:string,) => {
  const result = await prisma.books.update({
    where: {
      id,
    },
    data: {
      title,
      author,
      description,
    },
  });
  return result;
}

// função para deletar um livro e retornar o livro deletado
export const remove = async (id: string) => {
  const result = await prisma.books.delete({
    where: {
      id,
    },
  });
  return result;
};
