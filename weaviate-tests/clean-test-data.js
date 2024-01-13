import weaviate from "weaviate-ts-client"

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080'
});

const res = await client.schema.deleteAll();
console.log(res);