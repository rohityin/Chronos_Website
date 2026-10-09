const { spawn } = require('child_process');
const fs = require('fs');

async function captureSections() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=1440,900',
    'http://localhost:4173/'
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
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await new Promise(r => setTimeout(r, 1500));

    const sections = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];

    for (const secId of sections) {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.getElementById('${secId}');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
          })()
        `
      });

      // Wait for scroll & frame render
      await new Promise(r => setTimeout(r, 800));

      const ss = await send('Page.captureScreenshot', { format: 'png' });
      if (ss && ss.data) {
        fs.writeFileSync(`d:\\Websites\\Chronos\\screenshot_${secId}.png`, Buffer.from(ss.data, 'base64'));
        console.log(`Captured screenshot_${secId}.png`);
      }
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

captureSections().catch(console.error);
