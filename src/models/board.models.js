import mongoose from "mongoose";

const { Schema } = mongoose;

const Board = new Schema(
  {
    boardTitle: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Tasks" }],
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Boards = mongoose.model("Boards", Board, "boards");

export default Boards;
