import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumb') {
      cb(null, path.join(__dirname, "../uploads/thumbs")); // Pasta para thumbs
    } else if (file.fieldname === 'authorProfileImg') {
      cb(null, path.join(__dirname, "../uploads/authorImgs")); // Pasta para blogImgs
    } else {
      cb(new Error("Tipo de arquivo não suportado"));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Apenas imagens são permitidas (jpeg, jpg, png, gif)"));
  },
});

// Exportar middleware para múltiplos arquivos
export const uploadImages = upload.fields([
  { name: 'thumb', maxCount: 1 },
  { name: 'authorProfileImg', maxCount: 1 },
]);