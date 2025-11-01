const mongoose = require("mongoose");

const advisorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    description: {
      type: String,
      required: [true, "please add a description."],
    },
    category: {
      type: String,
      enum: ["Health tip", "Outbreak Alert", "Vaccination Update", "General"],
      default: "General",
    },
    localtion: {
      type: String,
      defaut: "Community",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisory", advisorySchema);
