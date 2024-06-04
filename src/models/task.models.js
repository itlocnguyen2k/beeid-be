import mongoose from "mongoose";

const { Schema } = mongoose;

const Task = new Schema(
  {
    taskTitle: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    about: { type: String },
    estimate: { type: String },
    avatar: { type: String },
    categories: { type: Schema.Types.ObjectId, ref: "Categories" },
    labels: { type: Schema.Types.ObjectId, ref: "Labels" },
    priorities: { type: Schema.Types.ObjectId, ref: "Priorities" },
    document: { type: String },
    progress: { type: Number, default: 0 },
    members: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    subtasks: [{ type: Schema.Types.ObjectId, ref: "SubTasks" }],
    sprints: { type: Schema.Types.ObjectId, ref: "Sprints" },
    files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
    logs: [{ type: Schema.Types.ObjectId, ref: "Logs" }],
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Tasks = mongoose.model("Tasks", Task, "tasks");

export default Tasks;
