const fs = require('fs').promises;
const path = require('path');

class LanguageLoader {
  constructor() {
    this.languages = {};
  }

  // Load languages only once and store them
  async loadLanguage(lang, cwd) {
    if (this.languages[lang]) {
      return this.languages[lang]; // Return if already loaded
    }
    try {
      // Load language files and store in the languages object
      this.languages[lang] = {
        language_options: await fs.readFile(`${cwd}/languages/${lang}/language_options.txt`, 'utf8'),
        main_message: await fs.readFile(`${cwd}/languages/${lang}/main_message.txt`, 'utf8'),
        ai_list: await fs.readFile(`${cwd}/languages/${lang}/ai_list.txt`, 'utf8'),
        settings_menu: await fs.readFile(`${cwd}/languages/${lang}/settings_menu.txt`, 'utf8')
      };

      return this.languages[lang];
    } catch (err) {
      console.error(`Error loading language ${lang}:`, err);
      return null;
    }
  }

  // Get language data (assuming it's already loaded)
  getLanguage(lang) {
    return this.languages[lang];
  }
}

// Export a single instance (Singleton pattern)
module.exports = new LanguageLoader();
