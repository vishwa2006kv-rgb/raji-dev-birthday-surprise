import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-screenshots/desktop');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function clickByText(page, snippet) {
  await page.evaluate((text) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.toLowerCase().includes(text.toLowerCase()));
    if (btn) btn.click();
    else console.warn(`Button "${text}" not found`);
  }, snippet);
}

async function runDesktop() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(outDir, 'desktop-password.png') });

  await page.type('input[type="password"]', '1911');
  await clickByText(page, 'UNLOCK');
  await new Promise(r => setTimeout(r, 6500)); // wait for flight arrival
  await page.screenshot({ path: path.join(outDir, 'desktop-flight.png') });

  await clickByText(page, 'NEXT');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-countdown.png') });

  // Open wish
  await page.evaluate(() => document.querySelector('span[title*="Testing toggle"]').click());
  await new Promise(r => setTimeout(r, 400));
  await clickByText(page, 'OPEN WISH');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-birthday.png') });

  // Little notes
  await clickByText(page, 'LITTLE NOTES');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-notes.png') });

  // Next -> Proposal
  await clickByText(page, 'NEXT');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-proposal.png') });

  // Yes -> Congrats
  await clickByText(page, 'yes');
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.join(outDir, 'desktop-congrats.png') });

  // Memories
  await clickByText(page, 'our memories');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-memories.png') });

  // Letters
  await clickByText(page, 'read my letters');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-letters.png') });

  // Final
  await clickByText(page, 'finish');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'desktop-final.png') });

  await browser.close();
  console.log('✓ Desktop testing completed successfully');
}

runDesktop();
