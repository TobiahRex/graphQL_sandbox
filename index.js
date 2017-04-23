import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean,
  }
  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);
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
const resolvers = {
  video: () => ({
    id: '1',
    title: 'Foo',
    duration: 180,
    watched: true,
  }),
  videos: () => videos,
};

const query = `
query myFirstQuery {
  videos {
    id,
    title,
    duration,
    watched,
  }
}
`;

graphql(schema, query, resolvers)
.then(results => console.log(JSON.stringify(results, null, 2)))
.catch(console.error)
