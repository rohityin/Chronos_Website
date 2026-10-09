const { spawn } = require('child_process');
const fs = require('fs');

async function audit() {
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
    if (!pageTarget) {
      console.error('No page target found');
      return;
    }

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
    await send('DOM.enable');
    await send('CSS.enable');
    await new Promise(r => setTimeout(r, 1500));

    // Audit query
    const auditScript = `
      (() => {
        const rootFontSize = window.getComputedStyle(document.documentElement).fontSize;
        const bodyFontSize = window.getComputedStyle(document.body).fontSize;
        const bodyZoom = window.getComputedStyle(document.body).zoom;
        const htmlZoom = window.getComputedStyle(document.documentElement).zoom;
        
        // Check sections
        const sectionIds = ['movement', 'metallurgy', 'calibre', 'artisan', 'configurator'];
        const sectionsData = [];
        
        // Also check Hero
        const heroEl = document.querySelector('section');
        const heroRect = heroEl ? heroEl.getBoundingClientRect() : null;
        
        sectionsData.push({
          id: 'hero',
          height: heroRect ? heroRect.height : 0,
          windowHeight: window.innerHeight,
          windowWidth: window.innerWidth,
          scrollHeight: heroEl ? heroEl.scrollHeight : 0,
          clientHeight: heroEl ? heroEl.clientHeight : 0,
          paddingTop: heroEl ? window.getComputedStyle(heroEl).paddingTop : '',
          paddingBottom: heroEl ? window.getComputedStyle(heroEl).paddingBottom : '',
          paddingLeft: heroEl ? window.getComputedStyle(heroEl).paddingLeft : '',
          paddingRight: heroEl ? window.getComputedStyle(heroEl).paddingRight : '',
        });

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const cs = window.getComputedStyle(el);
          const cols = el.querySelectorAll('[class*="lg:max-w-"]');
          const leftCol = cols[0];
          const rightCol = cols[1];

          sectionsData.push({
            id,
            height: rect.height,
            clientHeight: el.clientHeight,
            scrollHeight: el.scrollHeight,
            paddingTop: cs.paddingTop,
            paddingBottom: cs.paddingBottom,
            leftCol: leftCol ? {
              height: leftCol.offsetHeight,
              scrollHeight: leftCol.scrollHeight,
              width: leftCol.offsetWidth,
              topOffset: leftCol.offsetTop
            } : null,
            rightCol: rightCol ? {
              height: rightCol.offsetHeight,
              scrollHeight: rightCol.scrollHeight,
              width: rightCol.offsetWidth,
              topOffset: rightCol.offsetTop
            } : null,
            corridor: (leftCol && rightCol) ? (rightCol.getBoundingClientRect().left - leftCol.getBoundingClientRect().right) : null
          });
        }

        // Navbar info
        const navEl = document.querySelector('nav') || document.querySelector('[class*="resizable-navbar"]') || document.querySelector('header');
        const allNavs = Array.from(document.querySelectorAll('div')).filter(d => d.className && typeof d.className === 'string' && d.className.includes('rounded-full') && d.className.includes('border'));
        
        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          rootFontSize,
          bodyFontSize,
          bodyZoom,
          htmlZoom,
          sectionsData,
          totalScrollHeight: document.documentElement.scrollHeight,
          totalOffsetHeight: document.documentElement.offsetHeight,
          overflowX: document.documentElement.scrollWidth > window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        };
      })()
    `;

    const r100 = await send('Runtime.evaluate', { expression: auditScript, returnByValue: true });
    console.log('=== 100% ZOOM (1920x1080) AUDIT ===');
    console.log(JSON.stringify(r100.result.value, null, 2));

    // Now test at simulated laptop viewports (1440x900, 1366x768, 1536x864)
    for (const [w, h] of [[1536, 864], [1440, 900], [1366, 768], [1280, 800], [390, 844]]) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: w < 768
      });
      await new Promise(r => setTimeout(r, 500));
      const rViewport = await send('Runtime.evaluate', { expression: auditScript, returnByValue: true });
      console.log(`\n=== VIEWPORT ${w}x${h} AUDIT ===`);
      console.log(JSON.stringify(rViewport.result.value, null, 2));
    }

    ws.close();
  } finally {
    edge.kill();
  }
}

audit().catch(console.error);
