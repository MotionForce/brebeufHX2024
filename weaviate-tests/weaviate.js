import weaviate from "weaviate-ts-client"

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080'
});

const schemaConfig = {
    'class': 'Profile',
    'vectorizer': 'text2vec-transformers',
    'vectorIndexType': 'hnsw',
    'moduleConfig': {
        'text2vec-transformers':{
            'textFiels': [
                'bio'
            ]
        }
    },
    'properties': [
        {
            'name': 'user_id',
            'dataType': ['text'],
        },
        {
            'name': 'bio',
            'dataType': ['text'],
        },
    ]
}

const schemaRes = await client.schema.classCreator().withClass(schemaConfig).do();

console.log(schemaRes);