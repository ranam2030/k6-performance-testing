import dev from '../config/dev.env.json';

export const config = {
  BASE_URL: __ENV.BASE_URL || dev.BASE_URL,
  USERNAME: __ENV.USERNAME || dev.USERNAME,
  PASSWORD: __ENV.PASSWORD || dev.PASSWORD,
};