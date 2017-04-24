import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'VideoType',
  description: 'A videon on Egghead.io',
  fields: {
    id: {
      type: GraphQLID,
      desciption: 'The id of the video.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the video.',
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video.'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'The user watched the video.'
    },
  },
})

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'root query type.',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'GraphQL',
          duration: 180,
          watched: false,
        })
      })
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription,
})

const videoA = {
  id: 'a',
  title: 'babel-node',
  duration: 240,
  watched: true,
}
const videoB = {
  id: 'b',
  title: 'node.js',
  duration: 120,
  watched: false,
}
const videos = [videoA, videoB];

const query = `
query myFirstQuery {
  video {
    id,
    title,
    duration,
    watched,
  }
}
`;
server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
server.listen(PORT, () => console.log(`Server listening @ ${PORT}`));
