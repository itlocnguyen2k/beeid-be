import mongoose from "mongoose";

const { Schema } = mongoose;

const Room = new Schema(
  {
    roomName: { type: String },
    description: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
  },
  { timestamps: true },
);

const Rooms = mongoose.model("Rooms", Room, "rooms");

export default Rooms;
