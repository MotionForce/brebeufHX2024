import fetch from "node-fetch";
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/KoalaAI/Text-Moderation",
        {
            headers: { 
                Authorization: `Bearer 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`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: {
                inputs: JSON.stringify(data)
            }
        }
    );
    const result = await response.json();
    return result;
}

/*

Prompt:

Tell me if the following body of text contains hatespeech: "". 
If this body of text contains hatespeech answer with the letter Y. Otherwise,
if this body of text does not contain hatespeech, answer with the letter N. 
Only output this letter and nothing else. The response length should be only of one.



, profanity, sexual content, or graphical descriptions of violence

*/