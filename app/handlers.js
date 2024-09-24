const LanguageLoader = require('./Language.js');
const markups = require('./replys.js');


function lang_handler(user, data, bot) {
    user.setLanguage(data.lang);
    user.setState('MAIN_MENU');

    user.save();
    texts = LanguageLoader.getLanguage(user.language);

    text = texts.main_message;

    bot.editMessageText(text, {chat_id:data.chat_id, message_id:data.message_id});

    bot.answerCallbackQuery(data.id);
}

function sett_handler(user, data, bot) {
    let text = "";
    let markup = {};
    switch (data.sett) {
        case "aimodel":
            text = LanguageLoader.getLanguage(user.language).ai_list
            console.log("text is:", LanguageLoader.getLanguage(user.language));
            break;
        case "instruction":
            break;
        case "context":
            break;
        case "language":
            break;
        case "main":
            break;
        default:
            break;
    }
    bot.editMessageText(text, {chat_id:data.chat_id, message_id:data.message_id, reply_markup: markup});
    bot.answerCallbackQuery(data.id);
}

module.exports = {
    lang_handler,
    sett_handler
}
