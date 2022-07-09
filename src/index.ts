import { ApolloServer, gql } from 'apollo-server';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
  },
};

const HTTP_PORT = process.env.HTTP_PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Apollo server starts on ${HTTP_PORT} port`);
  })
  .catch((error) => {
    console.error(error);
  });
