import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  getVideoById,
  getVideos,
  createVideo,
} from './src/data';
import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
} from 'graphql';

const server = express();
const PORT = process.env.PORT || 3000;

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Egghead.io',
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

const videoInputType = new GraphQLInputObjectType({
  name: 'VideoInput',
  description: 'The input object for creating a new video.',
  fields: {
    title: {
      type:  new GraphQLNonNull(GraphQLString),
      description: 'The title of the video.',
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The duration of the video.',
    },
    watched: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'The video has been released.',
    }
  }
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type.',
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType),
        }
      },
      resolve: (_, args) => createVideo(args.video),
    }
  }
})
const queryType = new GraphQLObjectType({
  name: 'Query',
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
  mutation: mutationType,
  // subscription,
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
server.listen(PORT, () => console.log(`Server listening @ ${PORT}`));
