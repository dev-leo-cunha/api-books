declare namespace Express {
  export interface Request {
    user_id: string;
  }
}
// Criação de um type para o Request do Express, para que o TypeScript entenda que o user_id existe no Request.
// Tive que adiciona-lo no arquivo tsconfig.json, na propriedade "typeRoots", para que o TypeScript entenda que o arquivo existe.
// "typeRoots" : ["./src/@types"],