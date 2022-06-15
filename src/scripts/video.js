let isSet = false;
let videos = [];

const getRandomArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const setVideos = (list) => {
  videos = list;
  if (videos.length > 0) {
    isSet = true;
  }
};

// const youtubeUrl = videoId => {
//   return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
// };
// const videoIds = ['UVoXbAPY8Dk', 'GlrSs5N0fas', 'lT_lqh2PFik', 'HQvbw0nBeso', 'W7lGXireG7I', 'HOh-3lUPTx0', 'awkkyBH2zEo', 'MR2fmdqSxZ8', 'UVoXbAPY8Dk', 'VWbIEIdNl-Y'];
// const videoIds = ['OkHD4OVjS4E', 'IL0dxX_z2qc'];
let useVideos = [];
if (isSet) {
  useVideos = [...videos];
}


/**
 * Returns a random video from the list without repetition
 * Once all the videos in the list have played it replenishes the list and keeps repeating
 * @return {string}
 */
export const getRandomVideo = () => {
  if (useVideos.length > 0) {
    const index = getRandomArbitrary(0, useVideos.length - 1);
    const video = useVideos[index];
    useVideos.splice(index, 1);
    return video;
  } else {
    useVideos = [...videos];
    return getRandomVideo();
  }
};
