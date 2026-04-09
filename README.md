# 🚀 k6 Performance Testing Framework

A modular, scalable performance testing framework built with [Grafana k6](https://k6.io/), structured for real-world API load testing across multiple environments.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Thresholds](#thresholds)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

---

## Overview

This framework provides a clean, maintainable foundation for running k6 performance tests against REST APIs. It separates concerns into dedicated directories for scenarios, services, configuration, thresholds, and utilities — making it easy to scale your test suite as your application grows.

It targets the [k6 test API](https://test-api.k6.io) by default and supports multi-environment configuration via `.env` files and `dotenv-cli`.

---

## Project Structure

```
k6-performance-testing/
├── config/           # Environment-specific k6 options (VUs, duration, ramp-up)
├── scenarios/        # Test scenarios (load, stress, spike, soak, etc.)
├── services/         # API service abstractions (HTTP request wrappers)
├── tests/
│   └── load/         # Load test entry points
├── thresholds/       # Pass/fail performance thresholds
├── utils/            # Shared helper functions and utilities
├── .env              # Environment variables (base URL, credentials, flags)
├── k6.config.js      # Root k6 configuration file
├── package.json      # Node.js dev dependencies (dotenv-cli)
└── .gitignore
```

---

## Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) `v0.45+`
- [Node.js](https://nodejs.org/) `v16+` (for `dotenv-cli`)
- npm or yarn

---

## Installation

```bash
# Clone the repository
git clone https://github.com/ranam2030/k6-performance-testing.git
cd k6-performance-testing

# Install dev dependencies (dotenv-cli)
npm install
```

---

## Configuration

### Environment Variables

Copy and update the `.env` file with your target environment's values:

```bash
cp .env .env.local
```

| Variable         | Description                         | Default                      |
|------------------|-------------------------------------|------------------------------|
| `BASE_URL`       | Target API base URL                 | `https://test-api.k6.io`     |
| `USERNAME`       | Test user username                  | `test_user`                  |
| `PASSWORD`       | Test user password                  | `123456`                     |
| `API_TIMEOUT`    | Request timeout in milliseconds     | `5000`                       |
| `ENV`            | Current environment (dev/staging)   | `dev`                        |
| `CLIENT_ID`      | OAuth2 client ID                    | —                            |
| `CLIENT_SECRET`  | OAuth2 client secret                | —                            |
| `ENABLE_LOGGING` | Enable verbose request logging      | `true`                       |

> ⚠️ **Never commit real credentials.** The `.env` file in this repo contains placeholder values for demo purposes only. Add `.env.local` and other sensitive files to `.gitignore`.

---

## Running Tests

Tests are run using `k6` directly, with environment variables injected via `dotenv-cli`.

### Run a specific load test

```bash
npx dotenv -e .env -- k6 run tests/load/<test-file>.js
```

### Run with a custom environment file

```bash
npx dotenv -e .env.staging -- k6 run tests/load/<test-file>.js
```

### Run with inline VU override

```bash
npx dotenv -e .env -- k6 run --vus 50 --duration 60s tests/load/<test-file>.js
```

---

## Test Scenarios

Scenarios are defined in the `scenarios/` directory. Each scenario describes the traffic shape for a test run. Common scenario types used in this framework:

| Scenario      | Description                                                    |
|---------------|----------------------------------------------------------------|
| **Load**      | Simulates expected peak traffic over a sustained duration      |
| **Stress**    | Gradually increases load beyond normal capacity                |
| **Spike**     | Sudden burst of traffic to test elasticity                     |
| **Soak**      | Extended duration test to catch memory leaks and degradation   |

Scenarios are referenced from the `k6.config.js` or directly within test files under `tests/load/`.

---

## Thresholds

Performance thresholds are defined in the `thresholds/` directory and define the pass/fail criteria for your tests. Example thresholds:

```js
// thresholds/default.js
export const defaultThresholds = {
  http_req_duration: ['p(95)<500', 'p(99)<1000'],
  http_req_failed:   ['rate<0.01'],
};
```

| Metric                | Threshold         | Meaning                                      |
|-----------------------|-------------------|----------------------------------------------|
| `http_req_duration`   | `p(95) < 500ms`   | 95% of requests complete in under 500ms      |
| `http_req_duration`   | `p(99) < 1000ms`  | 99% of requests complete in under 1 second   |
| `http_req_failed`     | `rate < 1%`       | Less than 1% of requests fail                |

---

## Project Conventions

- **`services/`** — Each file wraps a logical API resource (e.g., `auth.service.js`, `users.service.js`) and exports reusable request functions.
- **`utils/`** — Shared helpers such as random data generators, response validators, and logging wrappers.
- **`config/`** — Environment-specific k6 executor options, keeping test files clean of configuration details.

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feature/my-scenario`
2. Add your test, service, or utility following the existing structure
3. Ensure your thresholds are defined and tests pass locally
4. Open a pull request with a clear description of what was added

---

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [k6 Test API (demo target)](https://test-api.k6.io)
- [k6 Scenarios](https://k6.io/docs/using-k6/scenarios/)
- [k6 Thresholds](https://k6.io/docs/using-k6/thresholds/)
