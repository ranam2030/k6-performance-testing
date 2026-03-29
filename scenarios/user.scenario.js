import { createUser, getUser } from '../services/user.service.js';

export function userFlow() {
  const user = createUser();
  getUser(user.id);
}