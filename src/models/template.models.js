import mongoose from "mongoose";

const { Schema } = mongoose;

const Template = new Schema(
  {
    templateName: { type: String },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Templates = mongoose.model("Templates", Template, "templates");

export default Templates;
