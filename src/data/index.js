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
const getVideoById = videoId => new Promise((resolve) {
  const [video] = videos.filter(({ id }) => id === videoId);
  resolve (video);
});
export default getVideoById;
