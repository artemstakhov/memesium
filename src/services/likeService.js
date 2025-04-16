// services/likeService.js

const LOCAL_STORAGE_KEY = 'likesData';

const getRandomLikes = () => Math.floor(Math.random() * 99) + 1;

const getLikesFromStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
};

const saveLikesToStorage = (likesData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likesData));
};

const saveLikes = (memes) => {
  const likesData = {};
  memes.forEach(({ id, likes, liked }) => {
    likesData[id] = { likes, liked };
  });
  saveLikesToStorage(likesData);
};

const initMemeLikes = (memes) => {
  const stored = getLikesFromStorage();

  return memes.map((meme) => {
    const saved = stored[meme.id];
    return {
      ...meme,
      likes: saved?.likes ?? getRandomLikes(),
      liked: saved?.liked ?? false,
    };
  });
};

const toggleLike = (memes, id) => {
  const updated = memes.map((meme) =>
    meme.id === id
      ? {
          ...meme,
          liked: !meme.liked,
          likes: meme.likes + (meme.liked ? -1 : 1),
        }
      : meme
  );

  // Обновляем localStorage
  saveLikes(updated);

  return updated;
};

const hasLiked = (id) => {
  const stored = getLikesFromStorage();
  return stored[id]?.liked || false;
};

export default {
  initMemeLikes,
  toggleLike,
  saveLikes,
  hasLiked,
};
