import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    translations: {
      fr: {
        type: Map,
        of: String,
      },
      es: {
        type: Map,
        of: String,
      },
      de: {
        type: Map,
        of: String,
      },
      zh: {
        type: Map,
        of: String,
      },
      hi: {
        type: Map,
        of: String,
      },
      // Add more languages as needed
    },
  },
  { timestamps: true }
);

const Translation = mongoose.model("Translation", translationSchema);

export { Translation };
