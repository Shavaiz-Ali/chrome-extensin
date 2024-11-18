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

//update translations

export const updateTranslations = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({
        success: false,
        message: "Translation ID is required",
        status: 400,
      });
    }

    const updatedTranslation = req.body;
    console.log(updatedTranslation);
    if (!updatedTranslation) {
      return res.json({
        success: false,
        message: "Translation data is required",
        status: 400,
      });
    }

    const { text, translatedText } = updatedTranslation;
    console.log(text, translatedText);

    const sanitizedKey = text.replace(/\./g, ""); // Replace dots with underscores

    const translation = await Translation.findByIdAndUpdate(
      id,
      {
        $set: {
          [`translations.${sanitizedKey}`]: translatedText,
        },
      },
      {
        new: true, // Return updated document
        runValidators: true, // Validate before saving
        upsert: true, // Create document if it doesn't exist
      }
    );

    console.log("Updated Translation:", translation);

    console.log("Updated translation:", translation);

    if (!translation) {
      return res.json({
        success: false,
        message: "Failed to update translation",
        status: 404,
      });
    }

    return res.json({
      success: true,
      message: "Translation updated successfully",
      status: 200,
      translation,
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
