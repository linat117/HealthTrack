// src/models/HealthEntry.js
import mongoose from "mongoose";

const healthEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    weight: { type: Number, required: true },
    bloodPressure: { type: String },
    steps: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

const HealthEntry = mongoose.model("HealthEntry", healthEntrySchema);
export default HealthEntry;
