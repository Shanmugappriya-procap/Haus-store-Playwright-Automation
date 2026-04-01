# AI Playwright Framework

A Playwright-based end-to-end testing framework with automatic Jira bug reporting integration.

---

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Automatic screenshot capture on test runs
- Trace capture on first retry
- Jira integration — failed tests automatically create bug tickets
- HTML test reports
- CI/CD ready configuration

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- A Jira account with API access (if using Jira integration)

---

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Configuration

Create a `.env` file in the project root (never commit this file):

```env
JIRA_BASE_URL=https://your-org.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your_api_token_here
JIRA_PROJECT_KEY=PC
JIRA_ISSUE_TYPE=Bug
JIRA_ASSIGNEE_ID=your_assignee_account_id
```

> **Note:** `.env` is listed in `.gitignore` and should never be committed to source control.

To generate a Jira API token, visit: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)

---

## Running Tests

```bash
# Run all tests
npm test

# Run E2E tests only
npm run test:e2e

# Run tests against the CI target URL
npm run test:ci
```

### Run with Jira reporting enabled

```bash
JIRA_ENABLED=true npm test
```

---

## Jira Integration

When `JIRA_ENABLED=true` is set, the custom `JiraReporter` is activated. After a test run, failed tests will automatically have bug tickets created in your configured Jira project.

The reporter is located at `tests/utils/JiraReporter.ts`.

---

## Project Structure

```
.
├── tests/
│   ├── utils/
│   │   └── JiraReporter.ts      # Custom Jira reporter
│   └── ...                      # Test spec files
├── setup/
│   └── global-teardown.ts       # Global teardown / post-run hooks
├── playwright.config.ts          # Playwright configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json
└── .env                         # Local environment variables (not committed)
```

---

## Reporting

After a test run, open the HTML report with:

```bash
npx playwright show-report
```

Reports are saved to the `playwright-report/` directory.

Artifacts (screenshots and traces) are saved to `test-results/`.

---

## CI/CD

In CI environments, the following behaviour is applied automatically:

- Parallel execution is disabled (`workers: 1`)
- Failed tests are retried up to **2 times**
- The `--forbid-only` flag is enforced to prevent accidental `.only` usage

Example CI command:

```bash
BASE_URL=https://your-staging-url.com npm run test:ci
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Playwright](https://playwright.dev/) | Browser automation & testing |
| [TypeScript](https://www.typescriptlang.org/) | Language |
| [Allure Playwright](https://allurereport.org/) | Extended reporting |
| [jira-client](https://www.npmjs.com/package/jira-client) | Jira API integration |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variable management |
| [axios](https://axios-http.com/) | HTTP client |

---

## License

ISC
