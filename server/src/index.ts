import express from 'express';
import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4'
import axios from 'axios';

async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Company {
                name: String!
                catchPhrase: String!
                bs: String!
            }
            type Geo {
                lat: String!
                lng: String!
            }
            type Address {
                street: String!
                suite: String!
                city: String!
                zipcode: String!
                geo: Geo!
            }
            type User {
                id: ID!
                name: String!
                username: String!
                email: String!
                address: Address!
                phone: String!
                website: String!
                company: Company!
            }
            type Todo {
                id: ID!
                title: String!
                completed: Boolean!
                user: User
            }
            type Query {
                getTodos: [Todo]
                getAllUsers: [User]
                getUser(id: ID!): User
            }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
            },
            Query: {
                getTodos: async () => (
                    (await axios.get('https://jsonplaceholder.typicode.com/todos')).data
                ),
                getAllUsers: async () => (
                    (await axios.get('https://jsonplaceholder.typicode.com/users')).data
                ),
                getUser: async (parent, {id}) => (
                    (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
                ),
                
            },
        },
        
    });

    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

    app.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    });
}

startApolloServer();
