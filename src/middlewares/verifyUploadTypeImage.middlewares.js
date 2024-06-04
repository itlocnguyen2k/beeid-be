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

const validateUploadTypeImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      res.status(422).json({
        code: 422,
        message: "Định dạng file không đúng. Vui lòng tải lên định dạng .png, .jpg, .jpeg !",
      });
      next();
    }
  },
});

export default validateUploadTypeImage;
