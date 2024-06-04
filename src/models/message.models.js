import mongoose from "mongoose";

const { Schema } = mongoose;

const Message = new Schema(
  {
    content: { type: String },
    senders: { type: Schema.Types.ObjectId, ref: "Accounts" },
    rooms: { type: Schema.Types.ObjectId, ref: "Rooms" },
    files: [{ type: Schema.Types.ObjectId, ref: "Files" }],
    flagEdit: { type: Number, default: 0 },
    replies: { type: Schema.Types.ObjectId, ref: "Messages" },
  },
  { timestamps: true },
);

const Messages = mongoose.model("Messages", Message, "messages");

export default Messages;
