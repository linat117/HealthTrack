import mongoose from "mongoose";
const healthSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  water: { type: Number, default: 0 }, // liters
  sleep: { type: Number, default: 0 }, // hours
  exercise: { type: Boolean, default: false },
  walked: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "manager", "expert", "user"],
      default: "user",
    },
    activity: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // reacted/commented posts
    ],
    health: { type: [healthSchema], default: [] },
    mustChangePassword: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
