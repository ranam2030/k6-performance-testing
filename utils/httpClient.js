import http from 'k6/http';

export function request(method, url, payload, params) {
  return http.request(method, url, payload, params);
}