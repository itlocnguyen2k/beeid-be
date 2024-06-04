import mongoose from "mongoose";

const { Schema } = mongoose;

const Report = new Schema(
  {
    fileName: { type: String },
    filePath: { type: String },
  },
  { timestamps: true },
);

const Reports = mongoose.model("Reports", Report, "reports");

export default Reports;
