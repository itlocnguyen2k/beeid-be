import multer from "multer";
const { v4: uuidv4 } = require("uuid");

const DIR = "./src/public/image";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "___" + fileName);
  },
});

const verifyUploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

export default verifyUploadFile;
