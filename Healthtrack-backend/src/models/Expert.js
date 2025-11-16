import mongoose from "mongoose";

const expertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // manager
  },
  { timestamps: true }
);

export default mongoose.model("Expert", expertSchema);


