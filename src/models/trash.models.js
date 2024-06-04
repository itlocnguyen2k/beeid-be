import mongoose from "mongoose";

const { Schema } = mongoose;

const Trash = new Schema(
  {
    type: { type: Number },
    objects: { type: Schema.Types.ObjectId, refPath: "onModel" },
    authors: { type: Schema.Types.ObjectId, ref: "Accounts" },
    onModel: {
      type: String,
      enum: ["Accounts", "Projects", "Sprints", "Tasks", "SubTasks", "Files"],
    },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Trashs = mongoose.model("Trashs", Trash, "trashs");

export default Trashs;
