require('dotenv').config();
const Groq = require('groq-sdk');

const apiKey = process.env.GROQ_KEY;
const groq = new Groq({ apiKey: apiKey });

async function findAllergens(foodItem) {
    const prompt = "give me a list of allergens for the food that the user is looking for. return only a list of allergens as a JSON array of strings, no need to respond with any additional information.";
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": prompt
            },
            {
                "role": "user",
                "content": foodItem
            }
        ],
        "model": "llama3-8b-8192",
        "temperature": 1,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    let result = "";
    for await (const chunk of chatCompletion) {
        result += chunk.choices[0]?.delta?.content || '';
    }
    return JSON.parse(result);
}

module.exports = findAllergens;
