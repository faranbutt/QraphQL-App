import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './schema/resolvers.js';
import typeDefs from './schema/type-defs.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
    
  const { url } = await startStandaloneServer(server, {
    context: ({req}) => {return {req}},
    listen: { port: 4000 },
  });
  
   
  console.log(`🚀  Server ready at: ${url}`);