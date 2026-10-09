const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
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
    await new Promise(r => setTimeout(r, 2000));

    const script = `
      (() => {
        const sections = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];
        const results = {};
        for (const id of sections) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const leftCol = el.querySelector('.lg\\\\:max-w-\\\\[380px\\\\], .lg\\\\:max-w-\\\\[360px\\\\]');
          const cols = el.querySelectorAll('.lg\\\\:max-w-\\\\[380px\\\\], .lg\\\\:max-w-\\\\[360px\\\\]');
          const left = cols[0];
          const right = cols[1];

          const leftRect = left ? left.getBoundingClientRect() : null;
          const rightRect = right ? right.getBoundingClientRect() : null;

          const rightChildren = right ? Array.from(right.children).map(c => ({
            tag: c.tagName,
            rect: c.getBoundingClientRect()
          })) : [];

          const leftChildren = left ? Array.from(left.children).map(c => ({
            tag: c.tagName,
            rect: c.getBoundingClientRect()
          })) : [];

          results[id] = {
            sectionHeight: rect.height,
            leftCol: leftRect ? { width: Math.round(leftRect.width), height: Math.round(leftRect.height), top: Math.round(leftRect.top) } : null,
            rightCol: rightRect ? { width: Math.round(rightRect.width), height: Math.round(rightRect.height), top: Math.round(rightRect.top) } : null,
            centralCorridor: (leftRect && rightRect) ? Math.round(rightRect.left - leftRect.right) : null,
            leftChildrenCount: leftChildren.length,
            rightChildrenCount: rightChildren.length,
            rightChildren: rightChildren.map(c => ({ height: Math.round(c.rect.height), top: Math.round(c.rect.top), bottom: Math.round(c.rect.bottom) })),
            leftChildren: leftChildren.map(c => ({ height: Math.round(c.rect.height), top: Math.round(c.rect.top), bottom: Math.round(c.rect.bottom) }))
          };
        }
        return results;
      })()
    `;

    const evalResult = await send('Runtime.evaluate', {
      expression: script,
      returnByValue: true
    });

    console.log('LAYOUT RESULTS (1440px viewport):');
    console.log(JSON.stringify(evalResult.result.value, null, 2));

    ws.close();
  } finally {
    edge.kill();
  }
}
run().catch(console.error);
