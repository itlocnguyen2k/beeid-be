import mongoose from "mongoose";

const { Schema } = mongoose;

const SubTask = new Schema(
  {
    subTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    module: { type: String },
    about: { type: String },
    avatar: { type: String },
    progress: { type: Number, default: 0 },
    estimate: { type: String, default: "0" },
    actual: { type: String, default: "0" },
    point: { type: Number, default: 0 },
    categories: { type: Schema.Types.ObjectId, ref: "Categories" },
    priorities: { type: Schema.Types.ObjectId, ref: "Priorities" },
    owners: { type: Schema.Types.ObjectId, ref: "Accounts" },
    tasks: { type: Schema.Types.ObjectId, ref: "Tasks" },
    logs: [{ type: Schema.Types.ObjectId, ref: "Logs" }],
    files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const SubTasks = mongoose.model("SubTasks", SubTask, "subtasks");

export default SubTasks;
