const ORIGIN =
  (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ORIGIN) ||
  (process.env.NODE_ENV === 'development' && 'http://localhost:3000') ||
  '';

const URL = 
  (process.env.NODE_ENV === 'production' && 'https://www.chanwooyam.dev') ||
  (process.env.NODE_ENV === 'development' && 'http://localhost:3000') ||
  '';

export { ORIGIN, URL };
