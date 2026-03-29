import { userFlow } from '../scenarios/user.scenario.js';
import { BASE_CONFIG } from '../config/base.config.js';

export const options = {
  ...BASE_CONFIG,
  vus: 50,
  duration: '5m',
};

export default function () {
  userFlow();
}