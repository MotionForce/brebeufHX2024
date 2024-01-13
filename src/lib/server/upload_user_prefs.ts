import { client } from "$lib/server/weaviate-client"

export async function upload_user_prefs(user_id: string, bio: string){
    await client
        .data
        .creator()
        .withClassName('Profile')
        .withProperties({
            'user_id': user_id,
            'bio': bio,
        })
        .do()
}
