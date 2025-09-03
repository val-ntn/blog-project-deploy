//playwright/post.spec.js
import { test, expect } from '@playwright/test';

test('user can view the posts list', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=News'); // or whatever link shows posts
  const heading = await page.locator('h3').first();
  await expect(heading).toContainText('Posts');
});
