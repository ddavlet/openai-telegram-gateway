const OpenAI = require ('openai');

// require('dotenv').config({path: '/run/secrets/app_env'});

require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    organization: "org-EUar1yTRIuR2dsQUPNZFKQGK",
    project: process.env.PROJ_ID
});

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

async function request(user, request) {
    const stream = await openai.chat.completions.create({
        model: user.ai_model,
        messages: [
            {role: "system",content: "You are a helpful assistant."},
            {role: "user", content: "Say this is a test" }
        ],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();
