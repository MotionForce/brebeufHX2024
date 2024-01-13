import { client } from "$lib/server/weaviate-client"

export async function get_personalised_posts(interests: string) {
    const query = await client
        .graphql
        .get()
        .withClassName('Profile')
        .withFields(['user_id'])
        .withNearText({concepts: interests})
        .withLimit(10)
        .do();

    let users: string[] = [];
    query.data.Get.Profile.forEach((user: any) => {
        users.push(user.user_id);
    });
    return users;
}

