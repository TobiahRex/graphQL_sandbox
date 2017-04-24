import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { getVideoById, getVideos } from './src/data';

const server = express();
const PORT = process.env.PORT || 3000;
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
    videos: {
      type: new GraphQLList(videoType),
      resolve: getVideos,
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the video.',
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  // mutation,
  // subscription,
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
server.listen(PORT, () => console.log(`Server listening @ ${PORT}`));
