const ROUTES = {
  LANDING: '/',
  SERIES: '/series',
  SNIPPETS: '/snippets',
  POSTS: '/posts',
  PORTFOLIO: '/portfolio',
  TYPE_TO_POST: (type: string, name: string, id: string) =>
    `/${type}/${name}/${id}`,
  TAG: (tag: string) => `/posts/${tag}`,
  TYPE_TO: (type: string, name: string) => `/${type}/${name}`,
} as const;

const BACKEND_ROUTES = {
  LOGIN: '/api/auth/signin',
  POST: '/api/post',
  RECENT: '/api/recent',
  TAGS: '/api/tags',
  SERIES: '/api/series',
  SNIPPETS: '/api/snippets',
  POST_ID: (id: string) => `/api/post/${id}`,
  SERIES_ID: (id: string) => `/api/series/${id}`,
  SNIPPETS_ID: (id: string) => `/api/snippets/${id}`,
} as const;

export { ROUTES, BACKEND_ROUTES };
