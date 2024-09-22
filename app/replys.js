const language_options = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Русский", callback_data: "lang_ru" }],
      [{ text: "O'zbek", callback_data: "lang_uz" }],
      [{ text: "English", callback_data: "lang_en" }]
    ]
  }
}

const settings_menu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "Select an AI model", callback_data: "sett_aimodel" }],
      [{ text: "Set instruction", callback_data: "sett_instruction" }],
      [{ text: "Context maintenance", callback_data: "sett_context" }],
      [{ text: "Language", callback_data: "sett_language" }]
    ]
  }
}

module.exports = {
  language_options,
}
