const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    chat_id: {
        type: Number,
        required: true,
        unique: true
    },
    state: {
        type: String,
        required: true,
        default: 'MAIN_MENU',
        enum: ['MAIN_MENU', 'CHOOSE_MENU']
    },
    language: {
        type: String,
        required: true,
        default: 'en',
        enum: ['en', 'ru', 'uz']
    },
    ai_model: {
        type: String,
        require: true,
        default: 'gpt-4o-mini',
        enum: ['gpt-4o-mini', 'gpt-4o', 'o1-preview', 'gpt-4-turbo', 'gpt-3.5-turbo']
    }
});

userSchema.statics = {
    findOrCreate: async function(chat_id) {
        let user = await User.findOne({ chat_id });
        if (user) {
        return user;
        }
        user = new User({ chat_id });
        await user.save();
        return user;
    },
    find: async function find(chat_id) {
        return await User.findOne({ chat_id });
    },
    getUsers: async function () {
        return User.find();
    }
}

userSchema.methods = {
    setLanguage: async function (lang) {
        this.language = lang;
    },
    setState: async function(state) {
        this.state = state;
    }
}

const User = mongoose.model('User', userSchema);

async function findOrCreateUser(chat_id) {
  let user = await User.findOne({ chat_id });
  if (user) {
    return user;
  }
  user = new User({ chat_id });
  await user.save();
  return user;
}

module.exports = {
  User,
}
