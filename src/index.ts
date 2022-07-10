import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { ApolloServer } from 'apollo-server';
import { UsersResolver } from './modules/users/resolvers/users.resolver';
import { GenresResolver } from './modules/genres/resolvers/genres.resolver';

const HTTP_PORT = process.env.HTTP_PORT || 4000;

const schema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()]
});

const resolvers = {
  Query: { ...UsersResolver.Query, ...GenresResolver.Query },
  Mutation: { ...UsersResolver.Mutation, ...GenresResolver.Mutation }
};
// const resolvers = {...UsersResolver};

console.log(resolvers);

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({
    schema: schemaWithResolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => ({
      config: {
        headers: {
          Authorization: req.headers.authorization,
        },
      },
    }),
  }
);

server.listen()
  .then(({ url }) => {
    console.log(`🚀  Apollo server starts on ${HTTP_PORT} port`);
  })
  .catch((error) => {
    console.error(error);
  });
