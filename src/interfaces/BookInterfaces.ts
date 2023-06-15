export interface ICreate {
    title: string;
    author: string;
    description: string;
    user_id: string;
    coverBook?: FileUpload;
  }

  interface FileUpload {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  }
  export interface IUpdate {
    id: string;
    newTitle: string;
    newAuthor: string;
    newDescription: string;
    newCoverBook?: FileUpload;
    user_id: string;
  }

  // types para o BookServices