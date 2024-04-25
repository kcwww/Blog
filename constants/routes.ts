const ROUTES = {
  LANDING: '/',
  SERIES: '/series',
  SNIPPETS: '/snippets',
  ARCHIVES: '/archives',
  PORTFOLIO: '/portfolio',
} as const;

const BACKEND_ROUTES = {
  LOGIN: '/api/auth/signin',
} as const;

export { ROUTES, BACKEND_ROUTES };
