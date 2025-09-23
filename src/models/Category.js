import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true }, // hex, rgb o nombre de color
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
