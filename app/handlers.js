function lang_handler(user, data, ) {
  user.setLanguage(data);
  user.setState('MAIN_MENU');

  user.save();
  texts = LanguageLoader.getLanguage(user.language);

  text = texts.main_message;
}
