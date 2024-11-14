import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    translations: { type: Map, of: String },
  },
  { timestamps: true }
);

const Translation = mongoose.model("Translation", translationSchema);

export { Translation };
