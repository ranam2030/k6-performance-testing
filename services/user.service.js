import http from 'k6/http';

export function createUser() {
  return http.post(`${__ENV.BASE_URL}/users`, JSON.stringify({
    name: 'test'
  }));
}