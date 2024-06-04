import mongoose from "mongoose";

const { Schema } = mongoose;

const Label = new Schema(
  {
    labelName: { type: String },
    color: { type: String },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Labels = mongoose.model("Labels", Label, "labels");

export default Labels;
