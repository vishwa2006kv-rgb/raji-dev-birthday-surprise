import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-screenshots/branding');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function verifyBranding() {
  console.log('🔍 Verifying Raji & Dev Exclusive Branding...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  // 1. Check Document Title
  const title = await page.title();
  console.log('Browser Tab Title:', title);

  // 2. Check Meta Tags
  const meta = await page.evaluate(() => {
    const desc = document.querySelector('meta[name="description"]')?.content;
    const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
    const ogDesc = document.querySelector('meta[property="og:description"]')?.content;
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')?.content;
    const footerText = document.querySelector('footer')?.innerText;
    return { desc, ogTitle, ogDesc, twitterTitle, footerText };
  });

  console.log('Meta Information:', meta);

  // 3. Scan for any unwanted words across page
  const bodyText = await page.evaluate(() => document.body.innerText);
  const unwantedNames = ['vishwa', 'kv240', 'developer', 'portfolio', 'github.com/'];
  const foundUnwanted = unwantedNames.filter(name => bodyText.toLowerCase().includes(name));

  if (foundUnwanted.length > 0) {
    console.error('❌ Found unwanted names:', foundUnwanted);
  } else {
    console.log('✓ Clean scan: 0 developer names or links found on public page!');
  }

  // 4. Capture screenshot of footer & branding
  await page.screenshot({ path: path.join(outDir, 'password-with-footer.png') });

  // Unlock and check Flight page footer
  await page.type('input[type="password"]', '1911');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, 'flight-with-raji-and-footer.png') });

  await browser.close();
  console.log('🎉 BRANDING VERIFICATION 100% COMPLETE!');
}

verifyBranding();
