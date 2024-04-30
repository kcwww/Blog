const ROUTES = {
  LANDING: '/',
  SERIES: '/series',
  SNIPPETS: '/snippets',
  POSTS: '/posts',
  PORTFOLIO: '/portfolio',
} as const;

const BACKEND_ROUTES = {
  LOGIN: '/api/auth/signin',
  POST: '/api/post',
  RECENT: '/api/recent',
  POST_ID: (id: string) => `/api/post/${id}`,
} as const;

export { ROUTES, BACKEND_ROUTES };
