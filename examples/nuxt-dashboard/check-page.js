import { chromium } from 'playwright';

async function checkPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Listen for console messages
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR] ${error.message}`);
  });

  // Listen for request failures
  page.on('requestfailed', request => {
    console.log(
      `[REQUEST FAILED] ${request.url()} - ${request.failure().errorText}`,
    );
  });

  try {
    console.log('Navigating to http://localhost:3001...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

    console.log('\n=== PAGE TITLE ===');
    console.log(await page.title());

    console.log('\n=== PAGE CONTENT (first 1000 chars) ===');
    const content = await page.content();
    console.log(content.substring(0, 1000));

    console.log('\n=== CHECKING FOR ERRORS ===');
    const errors = await page.evaluate(() => {
      const errors = [];
      // Check for any error elements
      const errorElements = document.querySelectorAll(
        '[class*="error"], [id*="error"]',
      );
      errorElements.forEach(el => {
        errors.push(
          `Error element found: ${el.tagName} - ${el.textContent?.substring(0, 100)}`,
        );
      });
      return errors;
    });

    if (errors.length > 0) {
      console.log('Found error elements:', errors);
    } else {
      console.log('No obvious error elements found');
    }

    console.log('\n=== WAITING FOR CONSOLE MESSAGES ===');
    await page.waitForTimeout(3000);
  } catch (error) {
    console.error('Error checking page:', error.message);
  } finally {
    await browser.close();
  }
}

checkPage().catch(console.error);
