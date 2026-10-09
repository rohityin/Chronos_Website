const { spawn } = require('child_process');
const fs = require('fs');

async function capture() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'http://localhost:5173/'
  ]);

  try {
    let pageTarget = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch('http://localhost:9222/json');
        const list = await res.json();
        pageTarget = list.find(t => t.type === 'page');
        if (pageTarget) break;
      } catch (e) {}
    }
    if (!pageTarget) return;

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    const send = (method, params = {}) => new Promise(res => {
      const msgId = id++;
      const handler = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.id === msgId) { ws.removeEventListener('message', handler); res(d); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    const sections = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];

    // 1. Capture at 100% zoom (1920x1080)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1000));

    // Capture Hero at 100%
    let ss = await send('Page.captureScreenshot', { format: 'png' });
    if (ss.result?.data) fs.writeFileSync('d:\\Websites\\Chronos\\zoom100_hero.png', Buffer.from(ss.result.data, 'base64'));

    for (const secId of sections) {
      await send('Runtime.evaluate', {
        expression: `document.getElementById('${secId}').scrollIntoView({ behavior: 'instant', block: 'end' });`
      });
      await new Promise(r => setTimeout(r, 800));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      if (ss.result?.data) fs.writeFileSync(`d:\\Websites\\Chronos\\zoom100_${secId}.png`, Buffer.from(ss.result.data, 'base64'));
    }

    // 2. Capture at 80% zoom (In Chrome 80% zoom on 1920x1080 screen means viewport is 1920/0.8 = 2400 x 1350)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 2400,
      height: 1350,
      deviceScaleFactor: 0.8,
      mobile: false
    });
    // Scroll back to top
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await new Promise(r => setTimeout(r, 1000));

    ss = await send('Page.captureScreenshot', { format: 'png' });
    if (ss.result?.data) fs.writeFileSync('d:\\Websites\\Chronos\\zoom80_hero.png', Buffer.from(ss.result.data, 'base64'));

    for (const secId of sections) {
      await send('Runtime.evaluate', {
        expression: `document.getElementById('${secId}').scrollIntoView({ behavior: 'instant', block: 'end' });`
      });
      await new Promise(r => setTimeout(r, 800));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      if (ss.result?.data) fs.writeFileSync(`d:\\Websites\\Chronos\\zoom80_${secId}.png`, Buffer.from(ss.result.data, 'base64'));
    }

    console.log('Finished capturing zoom100 and zoom80 screenshots!');
    ws.close();
  } finally {
    edge.kill();
  }
}

capture().catch(console.error);
