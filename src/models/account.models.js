import mongoose from "mongoose";

const { Schema } = mongoose;

const Account = new Schema(
  {
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    loginCode: { type: String },
    passwordCode: { type: String },
    role: { type: String },
    fullName: { type: String },
    avatar: { type: String },
    position: { type: String },
    dob: { type: Date },
    gender: { type: String, default: "1" },
    status: { type: Number, default: 0 },
    about: { type: String },
    total: { type: Number },
    isLoginFirstTime: { type: Number, default: 1 },
    isLock: { type: Number, default: 0 },
    friends: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    followings: [{ type: Schema.Types.ObjectId, ref: "Accounts" }],
    permission: { type: Object },
    isDelete: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Accounts = mongoose.model("Accounts", Account, "accounts");

export default Accounts;
