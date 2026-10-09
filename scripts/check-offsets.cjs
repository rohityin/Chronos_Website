const { spawn } = require('child_process');

async function check() {
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
    await new Promise(r => ws.onopen = r);
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

    const sections = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];
    for (const s of sections) {
      const r = await send('Runtime.evaluate', {
        expression: `(() => {
          const el = document.getElementById("${s}");
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const progress = el ? (el.offsetTop / maxScroll) : 0;
          const frame = 1 + progress * (331 - 1);
          return {
            id: "${s}",
            offsetTop: el ? el.offsetTop : null,
            progress: progress.toFixed(3),
            frame: Math.round(frame)
          };
        })()`,
        returnByValue: true
      });
      console.log(r.result.value);
    }
    ws.close();
  } finally {
    edge.kill();
  }
}
check().catch(console.error);
