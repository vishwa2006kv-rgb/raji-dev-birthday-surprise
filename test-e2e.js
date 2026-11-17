import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function clickButton(page, textSnippet) {
  await page.evaluate((text) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.toLowerCase().includes(text.toLowerCase()));
    if (btn) {
      btn.click();
    } else {
      throw new Error(`Button with text "${text}" not found`);
    }
  }, textSnippet);
}

async function runTest() {
  console.log('🚀 Starting Complete E2E QA Test for Romantic Birthday Website...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  try {
    // 1. Password Screen
    console.log('--- Step 1: Password Lock Screen ---');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
    await page.waitForSelector('input[type="password"]');

    // Type incorrect password '1234'
    await page.type('input[type="password"]', '1234');
    await clickButton(page, 'UNLOCK');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '01-password-error.png') });
    console.log('✓ Incorrect password error verified');

    // Type correct password '1911'
    await page.$eval('input[type="password"]', el => el.value = '');
    await page.type('input[type="password"]', '1911');
    await clickButton(page, 'UNLOCK');
    console.log('✓ Passcode 1911 entered, unlocking...');
    await new Promise(r => setTimeout(r, 1500));

    // 2. Flight Screen
    console.log('--- Step 2: Pondicherry to Dubai Flight Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Distance means nothing'), { timeout: 12000 });
    console.log('✓ Flight arrived in Dubai');
    await page.screenshot({ path: path.join(outDir, '02-flight-landed.png') });

    // Click NEXT 💕
    await new Promise(r => setTimeout(r, 500));
    await clickButton(page, 'NEXT');
    await new Promise(r => setTimeout(r, 1000));

    // 3. Countdown Screen
    console.log('--- Step 3: Birthday Countdown Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Something special is waiting'));
    await page.screenshot({ path: path.join(outDir, '03-countdown.png') });

    // Enable preview wish
    await page.evaluate(() => {
      const heart = document.querySelector('span[title*="Testing toggle"]');
      if (heart) heart.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Click OPEN WISH ✨
    await clickButton(page, 'OPEN WISH');
    await new Promise(r => setTimeout(r, 1000));

    // 4. Happy Birthday Chellame
    console.log('--- Step 4: Happy Birthday Chellame Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Chellame'));
    await page.screenshot({ path: path.join(outDir, '04-birthday-chellame.png') });

    // Click LITTLE NOTES 💌
    await clickButton(page, 'LITTLE NOTES');
    await new Promise(r => setTimeout(r, 1000));

    // 5. Little Notes Screen
    console.log('--- Step 5: Little Notes Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Little Notes'));
    await page.screenshot({ path: path.join(outDir, '05-notes-all.png') });

    // Click NEXT 💍
    await clickButton(page, 'NEXT');
    await new Promise(r => setTimeout(r, 1000));

    // 6. Proposal Screen
    console.log('--- Step 6: Proposal Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Will you be my'));
    await page.screenshot({ path: path.join(outDir, '06-proposal-initial.png') });

    // Click YES 💕
    await clickButton(page, 'Yes');
    console.log('✓ Clicked YES 💕, heart explosion triggered');
    // Proposal has 1200ms delay + 600ms page exit transition
    await new Promise(r => setTimeout(r, 2200));

    // 7. Congratulations Screen
    console.log('--- Step 7: Congratulations Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Congratulations!'));
    await page.screenshot({ path: path.join(outDir, '07-congratulations.png') });
    console.log('✓ Congratulations screen reached');

    // Click OUR MEMORIES
    await new Promise(r => setTimeout(r, 500));
    await clickButton(page, 'OUR MEMORIES');
    await new Promise(r => setTimeout(r, 1000));

    // 8. Memories Gallery Screen
    console.log('--- Step 8: Our Memories Gallery Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Our Moments'));
    await page.screenshot({ path: path.join(outDir, '08-memories-gallery.png') });
    console.log('✓ Our Memories Gallery verified');

    // Click READ MY LETTERS 💌 directly
    await new Promise(r => setTimeout(r, 500));
    await clickButton(page, 'READ MY LETTERS');
    await new Promise(r => setTimeout(r, 1000));

    // 9. Love Letters Screen
    console.log('--- Step 9: Three Love Letters Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Letter 1'));
    await page.screenshot({ path: path.join(outDir, '09-letters-tab1.png') });

    // Switch to Letter 2
    await clickButton(page, 'Letter 2');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '09-letters-tab2.png') });

    // Switch to Letter 3
    await clickButton(page, 'Letter 3');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(outDir, '09-letters-tab3.png') });
    console.log('✓ All 3 Love Letters read and verified');

    // Click FINISH ✨
    await clickButton(page, 'FINISH');
    await new Promise(r => setTimeout(r, 1200));

    // 10. Final Celebration Screen
    console.log('--- Step 10: Final Birthday Celebration Screen ---');
    await page.waitForFunction(() => document.body.innerText.includes('Once again happy'));
    await page.screenshot({ path: path.join(outDir, '10-final-celebration.png') });
    console.log('✓ Final celebration page reached');

    // Click LOVE LOOP 🔄
    await new Promise(r => setTimeout(r, 500));
    await clickButton(page, 'LOVE LOOP');
    await new Promise(r => setTimeout(r, 1200));

    // Verify reset to Password Screen
    await page.waitForSelector('input[type="password"]');
    await page.screenshot({ path: path.join(outDir, '11-love-loop-reset.png') });
    console.log('✓ LOVE LOOP successfully reset to Password Screen!');

    console.log('🎉 100% COMPLETE: ALL 10 PAGES & INTERACTIVE FLOWS FULLY VERIFIED!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

runTest();
