import fetch from "node-fetch";
async function query(model_name, input){
    const response = await fetch("http://localhost:11434/api/generate", {
        method: 'POST',
        body: JSON.stringify({
            model: model_name,
            prompt: input,
            stream: false,
            options: {
                temperature: 0.0
            }
        }),
    });
    const result = await response.json();
    return result;
}
query("hxmodel", "tell me if the following body of text contains hatespeech: ''. If this body of text contains hatespeech, asnwer with the letter Y. If this body of text does not contain hatespeech, answer with the letter N. Only output one letter and nothing else. Do not justify yourself, only output a single letter that is the answer. An example output should look like this: 'Y'. Here is another example: 'Y'. Here is a third example: 'N'.").then((response) => {
    console.log(JSON.stringify(response));
});