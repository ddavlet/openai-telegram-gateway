// load environment
require('dotenv').config({path: '/run/secrets/app_env'});

// require('dotenv').config();
// import packages
const TelegramBot = require('node-telegram-bot-api');
const markups = require('./replys.js');
const {User} = require('./User.js');
const handlers = require('./handlers');
const LanguageLoader = require('./Language.js');
const fs = require('fs').promises;
const mongoose = require('mongoose');

// setup telegram tocken and listening
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const cwd = process.cwd();


console.log("Started");

// setup variables

let active_users = [];

// async function loadLanguage(lang) {
//   let lang_texts = {};
//   try {
//     lang_texts.language_options = await fs.readFile(`${cwd}/languages/${lang}/language_options.txt`, 'utf8');
//     lang_texts.main_message = await fs.readFile(`${cwd}/languages/${lang}/main_message.txt`, 'utf8');
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(lang_texts);
//   return lang_texts;
// }

// load language module

mongoose.connect(`mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASS}@mongo:27017/app_db?authSource=admin`, {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

async function init() {
  await LanguageLoader.loadLanguage('en', cwd);

  bot.on('message', (msg) => handleIncomingMessage(msg));
  bot.on('callback_query', (callbackQuery) => handleIncomingQuery(callbackQuery))
}

async function findActiveUser(chat_id) {
  let user = active_users.find(user => user.chat_id === chat_id);

  if (!user) {
    user = await User.findOrCreate(chat_id);
    active_users.push(user);
  }

  return user
}

async function handleIncomingMessage(msg) {
  const chatId = msg.chat.id;
  const message = msg.text;

  let user = await findActiveUser(chatId);
  let texts = LanguageLoader.getLanguage(user.language);


  if (message.length == '/start'.length && message.startsWith('/start')) {
    let text = texts.language_options;
    let markup = markups.language_options;
    bot.sendMessage(msg.chat.id, text, markup);
  } else if (message.length == '/settings'.length && message.startsWith('/settings')) {
    let text = texts.settings_menu;
    let markup = markups.settings_menu;
    bot.sendMessage(msg.chat.id, text, markup);
  } else {
    bot.sendMessage(msg.chat.id, 'other text');
  }

};

async function handleIncomingQuery(callbackQuery) {
  console.log(callbackQuery);

  const chat_id = callbackQuery.from.id;
  const id = callbackQuery.id;
  const message_id = callbackQuery.message.message_id;
  const data = callbackQuery.data;

  let user = await findActiveUser(chat_id);
  let texts = LanguageLoader.getLanguage(user.language);

  if (data.startsWith('lang_')) {
    let lang = data.substr(5);

    handlers.lang_handler(user, {lang, chat_id, message_id, id}, bot);
  } else if (data.startsWith('sett_')) {
    let sett = data.substr(5);

    handlers.sett_handler(user, {sett, chat_id, message_id, id}, bot)
  }
};

init()

bot.on('polling_error', (err) => {
  console.log(err);
})
