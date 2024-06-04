import mongoose from "mongoose";

const { Schema } = mongoose;

const Notification = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Accounts" },
    reciever: { type: Schema.Types.ObjectId, ref: "Accounts" },
    read: { type: Number, default: 0 },
    type: { type: Number },
  },
  { timestamps: true },
);

const Notifications = mongoose.model("Notification", Notification, "notifications");

export default Notifications;
