import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { users, posts } from './data.js';

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === Number(id)),
    posts: () => posts
  },
  Post: {
    user: (post) => users.find(user => user.id === post.userId)
  },
  User: {
    posts: (user) => posts.filter(post => post.userId === user.id)
  },
  Mutation: {
    deleteUser: (_, { id }) => {
      const index = users.findIndex(user => user.id === Number(id));
      if (index === -1) {
        return false;
      }
      users.splice(index, 1);
      return true;
    },
    createUser: (_, { createUserDto }) => {
      const { name, age, isSmoker } = createUserDto;
      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const newUser = {
        id: newId,
        name,
        age,
        smokes: isSmoker,
        posts: []
      };
      users.push(newUser);
      return 'user created successfully';
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀 Server ready at: ${url}`);
