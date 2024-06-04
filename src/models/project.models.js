import mongoose from "mongoose";

const { Schema } = mongoose;

const Project = new Schema(
  {
    projectName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    about: { type: String },
    avatar: { type: String },
    mode: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    category: { type: String },
    status: { type: String },
    userCreated: { type: Schema.Types.ObjectId, ref: "Accounts" },
    userUpdated: { type: Schema.Types.ObjectId, ref: "Accounts" },
    sprints: [{ type: Schema.Types.ObjectId, ref: "Sprints" }],
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Projects = mongoose.model("Projects", Project, "projects");

export default Projects;
