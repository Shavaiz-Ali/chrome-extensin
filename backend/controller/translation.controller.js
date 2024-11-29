import { Translation } from "../model/translation.model.js";

export const createTranslation = async (req, res) => {
  try {
    const { language, translations } = req.body;

    if (!language || !translations) {
      return res.status(400).json({
        success: false,
        message: "Language and translations are required.",
      });
    }

    // Find or create a new translation document
    let translationDoc = await Translation.findOne();
    if (!translationDoc) {
      translationDoc = new Translation();
    }

    // Ensure the specific language map exists
    if (!translationDoc.translations[language]) {
      translationDoc.translations[language] = new Map();
    }

    // Merge new translations with existing ones for the specified language
    const existingTranslations = new Map(translationDoc.translations[language]);
    for (const [key, value] of Object.entries(translations)) {
      existingTranslations.set(key, value);
    }

    // Set the merged translations back into the language-specific field
    translationDoc.translations[language] = existingTranslations;

    // Save the updated document
    await translationDoc.save();

    return res.status(201).json({
      success: true,
      message: `Translations for ${language} updated successfully.`,
      translation: translationDoc,
    });
  } catch (error) {
    console.error("Error creating/updating translation:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
