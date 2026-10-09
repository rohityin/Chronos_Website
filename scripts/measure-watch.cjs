const fs = require('fs');

async function measureWatch() {
  const edge = require('child_process').spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    'http://localhost:5173/'
  ]);
  try {
    let pageTarget = null;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const res = await fetch('http://localhost:9223/json');
        const list = await res.json();
        pageTarget = list.find(t => t.type === 'page');
        if (pageTarget) break;
      } catch (e) {}
    }
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
    await send('Runtime.enable');
    const r = await send('Runtime.evaluate', {
      expression: `
        new Promise(async (resolve) => {
          const frames = [1, 50, 100, 150, 200, 250, 300];
          const results = {};
          for (const f of frames) {
            const img = new Image();
            img.src = '/video-frames-4k/frame-' + String(f).padStart(3, '0') + '.jpg';
            await new Promise(res => img.onload = res);
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = idata.data;
            let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
            for (let y = 0; y < canvas.height; y += 4) {
              for (let x = 0; x < canvas.width; x += 4) {
                const idx = (y * canvas.width + x) * 4;
                const brightness = data[idx] + data[idx+1] + data[idx+2];
                if (brightness > 60) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }
            results[f] = {
              imgW: img.naturalWidth,
              imgH: img.naturalHeight,
              watchBox: { minX, maxX, width: maxX - minX, minY, maxY, height: maxY - minY },
              centerOffset: (minX + maxX)/2 - img.naturalWidth/2
            };
          }
          resolve(results);
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });
    console.log(JSON.stringify(r.result.value, null, 2));
    ws.close();
  } finally {
    edge.kill();
  }
}
measureWatch().catch(console.error);
