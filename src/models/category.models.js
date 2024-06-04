import mongoose from "mongoose";

const { Schema } = mongoose;

const Category = new Schema(
  {
    categoryName: { type: String },
    color: { type: String },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Categories = mongoose.model("Categories", Category, "categories");

export default Categories;
