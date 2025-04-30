import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();

app.use(cors(), express.json(), authMiddleware); // Middleware for authentication and cross-origin resource sharing

app.post('/login', handleLogin);

const typeDefs = await readFile('./schema.graphql', 'utf8'); // Load GraphQL schema from file

const apolloServer = new ApolloServer({ typeDefs, resolvers }); // Create Apollo Server instance with schema and resolvers
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer)); // Middleware for handling GraphQL requests

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});