import mongoose from "mongoose";

const { Schema } = mongoose;

const Priority = new Schema(
  {
    priorityName: { type: String },
    color: { type: String },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Priorities = mongoose.model("Priorities", Priority, "priorities");

export default Priorities;
