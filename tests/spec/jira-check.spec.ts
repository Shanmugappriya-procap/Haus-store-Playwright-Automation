import { test, expect } from "@playwright/test";
import { JiraReporter } from "../utils/JiraReporter";

test.describe("Jira Integration", () => {
  test.skip(
    !process.env.JIRA_ENABLED,
    "Skipped: set JIRA_ENABLED=true to run this infrastructure smoke test"
  );

  test("Jira connection check", async () => {
    const jira = new JiraReporter();
    const issueKey = await jira.createBug({
      testName: "Jira Connection Test",
      errorMessage: "This is a test bug to verify Jira integration",
      suiteName: "Connection Check",
    });

    expect(issueKey).not.toBeNull();
    console.log(`Jira integration working! Created: ${issueKey}`);
  });
});
