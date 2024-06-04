import mongoose from "mongoose";

const { Schema } = mongoose;

const Sprint = new Schema(
  {
    sprintName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    avatar: { type: String },
    description: { type: String },
    about: { type: String },
    projects: { type: Schema.Types.ObjectId, ref: "Projects" },
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    labels: [{ type: Schema.Types.ObjectId, ref: "Labels" }],
    priorities: [{ type: Schema.Types.ObjectId, ref: "Priorities" }],
    members: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    userCreated: { type: Schema.Types.ObjectId, ref: "Accounts" },
    userUpdated: { type: Schema.Types.ObjectId, ref: "Accounts" },
    boards: [{ type: Schema.Types.ObjectId, ref: "Boards" }],
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Sprints = mongoose.model("Sprints", Sprint, "sprints");

export default Sprints;
