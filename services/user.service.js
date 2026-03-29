import http from 'k6/http';

export function createUser() {
  return http.post(`${__ENV.BASE_URL}/users/register`, JSON.stringify({
    name: 'test'
  }));
}

export function getUser(userId) {
  return http.get(`${__ENV.BASE_URL}/users/${userId}`);
}