import weaviate from "weaviate-ts-client"

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080'
});

const user_id = "test_user";
const bio = "I love bananas";

const user2 = "test_user";
const bio2 = "bananas are my favorite";

const res = await client.data.creator()
    .withClassName("Profile")
    .withProperties({
        'user_id': user_id,
        'bio': bio
    })
    .do();

console.log(res);

const query = await client.graphql.get()
    .withClassName('Profile')
    .withFields(['bio'])
    .withNearText({'concepts': bio2})
    .withLimit(2)
    .do();

console.log(query);
//const response = query.data.Get.Profile[0].bio;
//console.log(response);