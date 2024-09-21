// load environment
// require('dotenv').config({path: '/run/secrets/app_env'});
require('dotenv').config();
// import packages
const TelegramBot = require('node-telegram-bot-api');
const markups = require('./replys.js');
const { User } = require('./user.js');
const fs = require('fs');

// setup telegram tocken and listening
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
const cwd = process.cwd();


console.log("Started");

// setup variables
let texts = {};

function loadLanguage(lang) {
  fs.readFile(`${cwd}/languages/${lang}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error('Error loading JSON:', err);
      return;
    }
    texts = JSON.parse(data);
    console.log(texts);
  });
}

loadLanguage('en')

bot.onText(/\/start/, (msg) => {
  text = texts.languageOptions;
  markup = markups.languageOptions;
  bot.sendMessage(msg.chat.id, text, markup);
});

bot.onText(/\/echo (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Other message');
});

bot.on('callback_query', (callbackQuery) => {
  console.log(callbackQuery);
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;
  let user = User.findOrCreate(chatId);
  user.setLanguage(language);
  user.setState('MAIN_MENU');
  loadLanguage(language); // Load selected language texts

  bot.sendMessage(chatId, texts.start_message || 'Language selected.');
  bot.editMessageText();
});

bot.on('polling_error', (err) => {
  console.log(err);
})
