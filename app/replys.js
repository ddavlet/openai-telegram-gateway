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
      [{ text: "Language", callback_data: "sett_language" }],
      [{ text: "Main page", callback_data: "sett_main" }]
    ]
  }
}


const ai_list = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "GPT-4o", callback_data: "ail_1" }],
      [{ text: "GPT-4o mini", callback_data: "ail_2" }],
      [{ text: "o1-preview and o1-mini", callback_data: "ail_3" }],
      [{ text: "GPT-4 Turbo and GPT-4", callback_data: "ail_4" }],
      [{ text: "GPT-3.5 Turbo", callback_data: "ail_5" }]
    ]
  }
}


module.exports = {
  language_options,
  settings_menu
}
