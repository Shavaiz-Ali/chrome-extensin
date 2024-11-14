import { Translation } from "../model/translation.model.js";

export const createTranslation = async (req, res) => {
  try {
    const translation = req.body;
    console.log(translation);
    if (!translation) {
      return res.json({
        success: false,
        message: "Translation data is required",
        status: 400,
      });
    }

    const newTranslation = new Translation({
      translations: translation,
    });

    await newTranslation.save();

    if (!newTranslation) {
      return {
        success: false,
        message: "Failed to create translation",
        status: 500,
      };
    }

    return res.json({
      success: true,
      message: "Translation created successfully",
      status: 201,
      translation: newTranslation,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};

// get translations
export const getTranslations = async (req, res) => {
  console.log("route hit by front-end");
  try {
    const translations = await Translation.find();
    if (!translations) {
      return res.json({
        success: false,
        message: "No translations found",
        status: 404,
      });
    }
    return res.json({
      success: true,
      message: "Translations retrieved successfully",
      status: 200,
      translations,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
};
