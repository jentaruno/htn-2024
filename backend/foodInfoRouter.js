const express = require('express');
const findAllergens = require('./findAllergens');

const translate = require('@google-cloud/translate').v3beta1;
const vision = require('@google-cloud/vision');
const { TranslationServiceClient } = require('@google-cloud/translate');

const Groq = require('groq-sdk')

// Import other required libraries
const fs = require('fs');
//const escape = require('escape-html');
const util = require('util');

const router = express.Router();

async function picToText(inputFile) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs text detection on the local file
    try {
        const [result] = await client.textDetection(inputFile);
        console.log(result);
        return result.fullTextAnnotation.text;
    } catch (e) {
        console.error(e);
    }
}

const groq = new Groq({ apiKey: process.env.GROQ_KEY });
async function getGroqChatCompletion(message, system) {
    let messages = [
        {
            role: "user",
            content: message,
        },
    ]

    if (system && system.length > 0) {
        messages.push({
            role: "system",
            content: system,
        })
    }

    return groq.chat.completions.create({
        messages: messages,
        model: "llama3-8b-8192",
    });
}

async function groqFoodFilter(text) {
    const res = await getGroqChatCompletion("Filter the food items out of the following. Do not include bullet points, numbers, and extra words. Make sure there is a newline between each item: \n\n" + text, "You are an advanced and multilingual text filtering robot similar to C-3PO from starwars")

    return res?.choices[0]?.message?.content?.split('\n').filter(entry => entry && entry.length > 0);
}


// Instantiates a client
const translationClient = new TranslationServiceClient();

async function translateText(text) {
    const projectId = process.env.GCLOUD_PROJECT;
    const location = 'global'
    // Construct request
    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        // sourceLanguageCode: 'en',
        targetLanguageCode: 'en',
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    let translatedEntries = []
    for (const translation of response.translations) {
        // console.log(`Translation: ${translation.translatedText}`);
        translatedEntries = translatedEntries.concat(translation.translatedText.split('\n'))
    }

    return translatedEntries;
}

// async function groqFoodDescription(text) {
//     const res = await getGroqChatCompletion("Briefly describe each of the food items listed in asingle line. Do not include bullet points and extra words. Make sure there is a newline between the description for each element: \n\n" + text)
//
//     return res?.choices[0]?.message?.content?.split('\n').filter(elem => elem && elem.length > 0);
// }
//
async function groqSummaries(filtered, translated) {
    const res = await getGroqChatCompletion(`item-names: ${filtered}
translated: ${translated}

Using these item names and translations, fill out an array of objects described by the below schema
{
    "original": "string (the name of the item, taken from above list)",
    "name": "string (the translation of the item, taken from the above list)",
    "description": "string (a brief description of the item)",
    "allergens": "[]string (an array of the names of all of the allergens present in the item, all allergens should be one of [dairy, gluten, peanuts, sulphites, sesame, wheat, mustard, gelatin, soy]),
    "number": "number (the number of items in "allergens")"
"}`, "You are a expert in foreign cuisines and the allergies that they come with. You only respond in JSON format")

    try {
        return JSON.parse(res?.choices[0]?.message?.content)
    } catch (e) {
        console.error(e)
        return null;
    }
}

/**
 * Request format
 * {
 *   "image": {
 *      "data": string
 *   }
 * }
 */
router.post("/get-food-info", async (req, res, next) => {
    try {
        const imageData = req?.body?.image?.data;
        // console.log(req?.body);

        if (!imageData) {
            console.error('Invalid request: no image data');
            res.status(400).send('Invalid request: no image data');
            return
        }

        let data = undefined;
        let filtered = undefined;
        let translated = undefined;

        try {
            data = await picToText(new Buffer(imageData, "base64"));
            filtered = await groqFoodFilter(data, "");
            // described = await groqFoodDescription(filtered)
            translated = await translateText(filtered.join("\n"));

            console.log(`data: ${data}`)
            console.log(`filtered: ${filtered}`)
            console.log(`translated: ${translated}`)
            // console.log(`described: ${described}`)

            if (translated.length != filtered.length) {
                console.log("translated type: ", typeof translated);

                throw new Error(`translated length (${translated.length}) does not match filtered length (${filtered.length})`)

            }
        } catch (e) {
            console.error("Parsing step failed:", e)
            res.status(500).send('Internal data processing error');
            return;
        }

        res.send(await groqSummaries(filtered, translated));
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
