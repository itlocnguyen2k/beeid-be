import mongoose from "mongoose";

const { Schema } = mongoose;

const Log = new Schema(
  {
    type: { type: Number },
    logs: {
      event: { type: Number },
      taskName: { type: String },
      subTaskName: { type: String },
      newBoard: { type: Schema.Types.ObjectId, ref: "Boards" },
      oldBoard: { type: Schema.Types.ObjectId, ref: "Boards" },
      logList: [
        {
          field: { type: String },
          newValue: { type: String },
          oldValue: { type: String },
          newOwner: { type: Schema.Types.ObjectId, ref: "Accounts" },
          oldOwner: { type: Schema.Types.ObjectId, ref: "Accounts" },
          newMembers: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
          oldMembers: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
          newCategory: { type: Schema.Types.ObjectId, ref: "Categories" },
          oldCategory: { type: Schema.Types.ObjectId, ref: "Categories" },
          newLabel: { type: Schema.Types.ObjectId, ref: "Labels" },
          oldLabel: { type: Schema.Types.ObjectId, ref: "Labels" },
          newPriority: { type: Schema.Types.ObjectId, ref: "Priorities" },
          oldPriority: { type: Schema.Types.ObjectId, ref: "Priorities" },
        },
      ],
    },
    notes: { type: Schema.Types.ObjectId, ref: "Notes" },
    subTasks: { type: Schema.Types.ObjectId, ref: "SubTasks" },
    tasks: { type: Schema.Types.ObjectId, ref: "Tasks" },
    author: { type: Schema.Types.ObjectId, ref: "Accounts" },
  },
  { timestamps: true },
);

const Logs = mongoose.model("Logs", Log, "logs");

export default Logs;
