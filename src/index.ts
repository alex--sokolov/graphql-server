import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema'
import { printSchema } from 'graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { ApolloServer } from 'apollo-server';
import { UsersResolver } from './modules/users/resolvers/user.resolver';

const HTTP_PORT = process.env.HTTP_PORT || 4000;

  const schema = loadSchemaSync('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()]
  });

  const resolvers = {
    ...UsersResolver
  };
  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
  });

  console.log(printSchema(schema));

  const server =  new ApolloServer({
      schema: schemaWithResolvers,
      csrfPrevention: true,
      cache: 'bounded',
      context: async ({ req }) => {
        const token = req.headers.authorization || '';
        // console.log('TOKEN', token);
        if (token) {
          return { token: token };
        }
      },
    }
  );

  server.listen()
  .then(({ url }) => {
    console.log(`🚀  Apollo server starts on ${HTTP_PORT} port`);
  })
  .catch((error) => {
    console.error(error);
  });
