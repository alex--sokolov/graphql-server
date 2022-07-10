import { ApolloServer } from 'apollo-server';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { UsersResolver } from './modules/users/resolvers/users.resolver';
import { GenresResolver } from './modules/genres/resolvers/genres.resolver';
import { BandsResolver } from './modules/bands/resolvers/bands.resolver';
import { ArtistsResolver } from './modules/artists/resolvers/artists.resolver';
import { AlbumsResolver } from './modules/albums/resolvers/albums.resolver';
import { TracksResolver } from './modules/tracks/resolvers/tracks.resolver';

const HTTP_PORT = process.env.HTTP_PORT || 4000;

const schema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()]
});

const resolvers = {
  Query: {
    ...UsersResolver.Query,
    ...GenresResolver.Query,
    ...BandsResolver.Query,
    ...ArtistsResolver.Query,
    ...AlbumsResolver.Query,
    ...TracksResolver.Query,
  },
  Mutation: {
    ...UsersResolver.Mutation,
    ...GenresResolver.Mutation,
    ...BandsResolver.Mutation,
    ...ArtistsResolver.Mutation,
    ...AlbumsResolver.Mutation,
    ...TracksResolver.Mutation,
  }
};

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
