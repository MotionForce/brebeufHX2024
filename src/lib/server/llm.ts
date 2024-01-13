export async function query_llm(text: string) {

    const ollama_url = "http://localhost:11434/api/generate";
    const model_name = "hxmodel";
    const bad_content_types = [
        "hatespeech",
        "racism",
        "sexism",
        "discrimination",
        "homophobia",
        "transphobia",
        "profanity",
        "sexual content",
        "graphical descriptions of violence",
        "slurs",
    ]
    let prompt = "tell me if the following body of text contains <type>: " + text + ". If this body of text contains <type>, asnwer with the number 1. If this body of text does not contain <type>, answer with the numnber 0. Only output this number and nothing else. You need to output 0 or 1.";
    let most_severe = "LOW";

    for (let i = 0; i < bad_content_types.length; i++) {
        console.log("Checking for " + bad_content_types[i]);
        const final_prompt = prompt.replaceAll("<type>", bad_content_types[i]);
        const response = await fetch(ollama_url, {
            method: "POST",
            body: JSON.stringify({
                model: model_name,
                prompt: final_prompt,
                stream: false,
                options: {
                    temperature: 0.0001,
                }
            })
        });
        const result: any = await response.json();
        const answer: string = result.response;
        const trimed = answer.trim();
        console.log(trimed);
        if (!trimed.includes("0")) {
            most_severe = "HIGH";
        }
    }

    return most_severe;
}
