const KEYS = {
  POSTS: 'cb_posts',
  LIKES: 'cb_likes',
  THEME: 'cb_theme',
  AUTH: 'cb_auth',
};

export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  keys: KEYS,
};

export function seedIfEmpty() {
  const posts = storage.get(KEYS.POSTS, null);

  if (!posts) {
    const demo = [
      {
        id: '1',
        title: 'Derby Day Tactics',
        description: 'How to read the game like a pro',
        content: 'Full sports content...',
        category: 'Sports',
        createdAt: Date.now(),
      },
      {
        id: '2',
        title: 'Lo-Fi Beats Guide',
        description: 'Music theory for chill hop',
        content: 'Full music content...',
        category: 'Music',
        createdAt: Date.now(),
      },
      {
        id: '3',
        title: 'Minimalist Poster Study',
        description: 'Shapes, grids, and balance',
        content: 'Full art content...',
        category: 'Art',
        createdAt: Date.now(),
      },
      {
        id: '4',
        title: 'Next.js vs Vite',
        description: 'When to choose which',
        content: 'Full tech content...',
        category: 'Tech',
        createdAt: Date.now(),
      },
    ];

    storage.set(KEYS.POSTS, demo);
  }

  const likes = storage.get(KEYS.LIKES, null);
  if (!likes) storage.set(KEYS.LIKES, {});
}
