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
      const language_options = await fs.readFile(`${cwd}/languages/${lang}/language_options.txt`, 'utf8');
      const mainMessage = await fs.readFile(`${cwd}/languages/${lang}/main_message.txt`, 'utf8');

      this.languages[lang] = {
        language_options: language_options,
        main_message: mainMessage
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
