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
export const getVideoById = videoId => new Promise((resolve) => {
  const [video] = videos.filter(({ id }) => id === videoId);
  resolve (video);
});
export const getVideos = () => new Promise((resolve) => {
  resolve(videos);
});
export const createVideo = ({ title, duration, watched }) => {
  const video = {
    id: (new Buffer(`${Date.now()}${title}`, 'utf8').toString('base64')),
    title,
    duration,
    watched,
  }
  videos.push(video);
  return video;
}
