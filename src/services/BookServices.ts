import { s3 } from "../config/aws";
import { ICreate, IUpdate } from "../interfaces/BookInterfaces";
import { v4 as uuid } from "uuid";
import * as BookRepositories from "../repositories/BookRepositories";
import * as UserRepositories from "../repositories/UserRepositories";

// Service fazer todo o trabalho pesado, como por exemplo, validar os dados, verificar se o usuário existe, etc.

// função para listar todos os livros
export const getAllBooks = async () => {
  return await BookRepositories.getAll();
};

// função para criar um novo livro
export const create = async ({
  title,
  author,
  description,
  user_id,
  coverBook,
}: ICreate) => {
  if (!title || !author || !description || !coverBook)
    throw new Error("Está faltando Informações");

  const findUser = await UserRepositories.findUserById(user_id);

  if (!findUser) throw new Error("Usuário não encontrado");

  const uploadImg = coverBook.buffer;
  const uploadS3 = await s3
    .upload({
      Bucket: "avatar-user-scheduling",
      Key: `${uuid()}-${coverBook.originalname}`,
      Body: uploadImg,
    })
    .promise();
  const result = await BookRepositories.create(
    title,
    author,
    description,
    uploadS3.Location,
    user_id
  );
  return result;
};

// função para editar um livro
export const update = async ({
  id,
  newTitle,
  newAuthor,
  newDescription,
  newCoverBook,
  user_id,
}: IUpdate) => {
  const findUser = await UserRepositories.findUserById(user_id);
  if (!findUser) throw new Error("Usuário não encontrado");

  const findBook = await BookRepositories.findBookById(id);
  if (!findBook) throw new Error("Livro não encontrado");

  if (findBook.userId !== user_id)
    throw new Error("Você não pode editar esse livro");
  if (newCoverBook) {
    const uploadImg = newCoverBook.buffer;
    const uploadS3 = await s3
      .upload({
        Bucket: "avatar-user-scheduling",
        Key: `${uuid()}-${newCoverBook.originalname}`,
        Body: uploadImg,
      })
      .promise();
    await BookRepositories.updateImage(uploadS3.Location, id);
  }
  const result = await BookRepositories.update(
    id,
    newTitle,
    newAuthor,
    newDescription
  );
  return result;
};

// função para deletar um livro
export const remove = async (id: string, user_id: string) => {
  const findUser = await UserRepositories.findUserById(user_id);
  if (!findUser) throw new Error("Usuário não encontrado");

  const findBook = await BookRepositories.findBookById(id);
  if (!findBook) throw new Error("Livro não encontrado");

  if (findBook.userId !== user_id)
    throw new Error("Você não pode deletar esse livro");

  const result = await BookRepositories.remove(id);
  return result;
};
