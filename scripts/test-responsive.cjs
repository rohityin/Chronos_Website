const { spawn } = require('child_process');
const fs = require('fs');

async function testResponsive() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--window-size=390,844', // iPhone 14
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
    const send = (method, params = {}) => new Promise(res => {
      const msgId = id++;
      const handler = (evt) => {
        const d = JSON.parse(evt.data);
        if (d.id === msgId) { ws.removeEventListener('message', handler); res(d.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
    
    await send('Page.enable');
    await send('Runtime.enable');
    await new Promise(r => setTimeout(r, 1000));

    // Scroll to configurator on mobile
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById("configurator");
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    if (ss && ss.data) {
      fs.writeFileSync('d:\\Websites\\Chronos\\screenshot_mobile_configurator.png', Buffer.from(ss.data, 'base64'));
      console.log('Captured screenshot_mobile_configurator.png');
    }

    ws.close();
  } finally {
    edge.kill();
  }
}
testResponsive().catch(console.error);
