import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

export { upload };
// configuração do multer para upload de imagens. 
// O multer irá armazenar a imagem em memória, e não em disco. 
// O limite de tamanho da imagem é de 2MB.