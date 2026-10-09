const { spawn } = require('child_process');
const fs = require('fs');

async function captureVerified() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1920,1080',
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 1200));

    // Hero
    let ss = await send('Page.captureScreenshot', { format: 'png' });
    if (ss.result?.data) fs.writeFileSync('d:\\Websites\\Chronos\\verified_hero.png', Buffer.from(ss.result.data, 'base64'));

    const sections = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];
    for (const secId of sections) {
      await send('Runtime.evaluate', {
        expression: `document.getElementById('${secId}').scrollIntoView({ behavior: 'instant', block: 'end' });`
      });
      await new Promise(r => setTimeout(r, 1000));
      ss = await send('Page.captureScreenshot', { format: 'png' });
      if (ss.result?.data) fs.writeFileSync(`d:\\Websites\\Chronos\\verified_${secId}.png`, Buffer.from(ss.result.data, 'base64'));
    }

    console.log('Successfully captured all verified 100% zoom screenshots!');
    ws.close();
  } finally {
    edge.kill();
  }
}

captureVerified().catch(console.error);
