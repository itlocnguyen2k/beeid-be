import mongoose from "mongoose";

const { Schema } = mongoose;

const Meeting = new Schema(
  {
    time: { type: Date },
    projects: { type: Schema.Types.ObjectId, ref: "Projects" },
    owners: { type: Schema.Types.ObjectId, ref: "Accounts" },
  },
  { timestamps: true },
);

const Meetings = mongoose.model("Meetings", Meeting, "meetings");

export default Meetings;
