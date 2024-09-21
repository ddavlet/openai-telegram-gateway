const languageOptions = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Русский", callback_data: "lang_ru" }],
        [{ text: "O'zbek", callback_data: "lang_uz" }],
        [{ text: "English", callback_data: "lang_en" }]
      ]
    }
}

module.exports = {
  languageOptions,
}
