import {ApolloServer} from 'apollo-server';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
const HTTP_PORT = process.env.HTTP_PORT || 4000;
const types = loadFilesSync('./**/**/*.graphql');
const typeDefs = mergeTypeDefs(types);
const resolver = loadFilesSync('./**/**/*.resolver.ts');
const resolvers = mergeResolvers(resolver);

const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        context: ({req}) => ({
            config: {
                headers: {
                    Authorization: req.headers.authorization,
                },
            },
        }),
    }
);

server.listen({port: HTTP_PORT})
    .then(({url}) => {
        console.log(`🚀  Apollo server starts on ${HTTP_PORT} port`);
    })
    .catch((error) => {
        console.error(error);
    });
