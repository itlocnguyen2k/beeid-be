import mongoose from "mongoose";

const { Schema } = mongoose;

const Note = new Schema(
  {
    note: { type: String },
    files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
    owners: { type: Schema.Types.ObjectId, ref: "Accounts" },
    notes: { type: Schema.Types.ObjectId, ref: "Notes" },
    flagEdit: { type: Number, default: 0 },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Notes = mongoose.model("Notes", Note, "notes");

export default Notes;
