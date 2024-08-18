const LINK = {
  GITHUB: 'https://github.com/kcwww',
  PORTFOLIO: 'https://bit.ly/3wVaQjS',
  RESUME: '',
  BLOG: 'https://chanwooyam.dev',
  INSTAGRAM: 'https://www.instagram.com/kcwww.w/',
  LINKEDIN: 'https://www.linkedin.com/in/chanwoo-kim-8757a12a5/',
  MAIL: 'mailto:cwkim0321@gmail.com',
  NAVER_BLOG: 'https://blog.naver.com/cksdn1228',
} as const;

type LINK = (typeof LINK)[keyof typeof LINK];

export default LINK;
