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
} as const;

export { ROUTES, BACKEND_ROUTES };
