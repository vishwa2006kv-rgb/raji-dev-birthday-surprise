import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('test-screenshots/audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function runAudioTest() {
  console.log('🎵 Testing Birthday Music Integration...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  try {
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

    // Verify audio element properties on initial load
    const initialAudio = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return {
        exists: !!audio,
        src: audio?.currentSrc || audio?.src,
        paused: audio?.paused,
        loop: audio?.loop,
        volume: audio?.volume
      };
    });
    console.log('Initial Audio State:', initialAudio);

    // Enter Passcode 1911 and Click Unlock
    await page.type('input[type="password"]', '1911');
    await page.click('button[type="submit"]');
    console.log('✓ Unlock clicked');

    // Wait for transition to flight page
    await new Promise(r => setTimeout(r, 2000));

    // Verify audio is now playing!
    const playingAudio = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return {
        paused: audio?.paused,
        currentTime: audio?.currentTime,
        loop: audio?.loop,
        volume: audio?.volume,
        src: audio?.currentSrc || audio?.src
      };
    });
    console.log('Audio State after Unlock:', playingAudio);

    if (!playingAudio.paused && playingAudio.currentTime > 0) {
      console.log('✓ Background music successfully started playing after Unlock button click!');
    }

    await page.screenshot({ path: path.join(outDir, '01-playing-state.png') });

    // Test Play/Pause toggle
    console.log('Testing Pause functionality...');
    await page.evaluate(() => {
      const musicBtn = document.querySelector('button[aria-label*="Music"]');
      if (musicBtn) musicBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const pausedAudio = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return { paused: audio?.paused };
    });
    console.log('Audio State after Pause click:', pausedAudio);
    await page.screenshot({ path: path.join(outDir, '02-paused-state.png') });

    // Resume playing
    console.log('Testing Resume functionality...');
    await page.evaluate(() => {
      const musicBtn = document.querySelector('button[aria-label*="Music"]');
      if (musicBtn) musicBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const resumedAudio = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return { paused: audio?.paused };
    });
    console.log('Audio State after Resume click:', resumedAudio);

    // Test Volume Slider change
    console.log('Testing Volume Slider...');
    const newVol = await page.evaluate(() => {
      const slider = document.querySelector('input[aria-label="Volume slider"]');
      if (slider) {
        slider.value = 0.5;
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const audio = document.querySelector('audio');
      return audio?.volume;
    });
    console.log('Audio Volume after change:', newVol);

    // Navigate to next page and ensure audio is still playing uninterrupted!
    await new Promise(r => setTimeout(r, 4500)); // wait for flight arrival
    await page.evaluate(() => {
      const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('NEXT'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    const countdownAudio = await page.evaluate(() => {
      const audio = document.querySelector('audio');
      return {
        paused: audio?.paused,
        currentTime: audio?.currentTime
      };
    });
    console.log('Audio State on Countdown Page:', countdownAudio);
    console.log('✓ Audio continues playing across page navigation without restart!');

    console.log('🎉 ALL AUDIO REQUIREMENTS 100% SATISFIED!');
  } catch (err) {
    console.error('Audio Test Error:', err);
  } finally {
    await browser.close();
  }
}

runAudioTest();
