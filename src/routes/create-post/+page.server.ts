import { redirect, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import fetch from "node-fetch";

export const load = (async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");;
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const data = await request.formData();
        const post_title = await data.get("post_title")?.toString();
        const post_body = await data.get("post_body")?.toString();
        const session = await locals.auth.validate();
        if (post_title === undefined || post_body === undefined || session === null) error(400, "The title or the body of the post, or the user information, was not processed correctly");
        const res = await prisma.post.create({ data: { title: post_title, body: post_body, User: { connect: { id: session.user.userId } } } });
        query_llm(post_body).then(async (warning_level) => {
            const update_warning = await prisma.post.update({
                where: {
                    id: res.id,
                },
                data: {
                    warning: warning_level,
                },
            });
        });
        throw redirect(302, "/");
    }
};

async function query_llm(text: string){

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
    let prompt = "tell me if the following body of text contains <type>: " + text + ". If this body of text contains <type>, asnwer with the letter Y. If this body of text does not contain <type>, answer with the letter N. Only output one letter and nothing else.";
    let most_severe = "LOW";
    
    for (let i = 0; i < bad_content_types.length; i++){
        console.log("Checking for " + bad_content_types[i]);
        const final_prompt = prompt.replaceAll("<type>", bad_content_types[i]);
        const response = await fetch(ollama_url, {
            method: "POST",
            body: JSON.stringify({
                model: model_name,
                prompt: final_prompt,
                stream: false,
                options:{
                    temperature: 0.0001,
                }
            })
        });
        const result: any = await response.json();
        const answer: string = result.response;
        const trimed = answer.trim();
        console.log(trimed);
        if (!trimed.startsWith("N.")){
            most_severe = "HIGH";
        }
    }

    return most_severe;
}
