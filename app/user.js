const State = {
    MAIN_MENU:'MAIN_MENU',
    CHOOSE_MENU:'CHOOSE_MENU'
}

const Language = {
    en:'ENGLISH',
    ru:'RUSSIAN',
    uz:'UZBEK'
}

class User {
    static objects = [];
    constructor(chat_id) {
        this.state = State.MAIN_MENU,
        this.chat_id = chat_id,
        this.language = Language.ENGLISH,
        User.objects.push(this)
    }

    static getUsers() {
        return User.objects
    }

    static find(chat_id) {
        return User.objects.find(user => user.chat_id === chat_id);
    }

    static findOrCreate(chatId) {
        let user = User.find(chatId);
        if (user) {
            return user;
        }
        return new User(chatId);
    }

    setLanguage(lang) {
        if (!lang in Language) {
            throw new Error(`Invalid language: ${lang}`);
        }
        this.language = lang;
    }
    setState(state) {
         if (!Object.values(State).includes(state)) {
            throw new Error(`Invalid language: ${state}`);
        }
        this.state = state;
    }
}

module.exports = {
  User,
}
