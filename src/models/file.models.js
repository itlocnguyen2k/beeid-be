import mongoose from "mongoose";

const { Schema } = mongoose;

const File = new Schema(
  {
    fileName: { type: String },
    fileSize: { type: String },
    filePath: { type: String },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Files = mongoose.model("Files", File, "files");

export default Files;
