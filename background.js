const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getViewportSize(root, win) {
  const width = root.clientWidth || win.innerWidth || 1280;
  const height = root.clientHeight || win.innerHeight || 720;

  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

function resizeCanvas(canvas, ctx, root, win) {
  const { width, height } = getViewportSize(root, win);
  const dpr = clamp(win.devicePixelRatio || 1, 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { width, height, dpr };
}

function drawInteractiveDots(ctx, state, timestamp = 0) {
  const { width, height } = state.size;
  const time = timestamp * 0.001;

  state.pointer.x += (state.pointer.targetX - state.pointer.x) * 0.08;
  state.pointer.y += (state.pointer.targetY - state.pointer.y) * 0.08;

  const pointerX = state.pointer.x * width;
  const pointerY = state.pointer.y * height;
  const horizonY = height * (0.46 + (state.pointer.y - 0.5) * 0.05);
  const floorHeight = height * 0.58;
  const centerX = width * 0.5 + (state.pointer.x - 0.5) * width * 0.1;

  ctx.clearRect(0, 0, width, height);

  for (let rowIndex = 0; rowIndex < state.rows; rowIndex += 1) {
    const rowRatio = state.rows === 1 ? 0 : rowIndex / (state.rows - 1);
    const depth = rowRatio * rowRatio;
    const y = horizonY + depth * floorHeight;
    const spread = width * (0.2 + depth * 1.08);
    const rowColumns = state.columns + Math.round(depth * 10);

    for (let colIndex = 0; colIndex < rowColumns; colIndex += 1) {
      const columnRatio = rowColumns === 1 ? 0.5 : colIndex / (rowColumns - 1);
      let x = centerX + (columnRatio - 0.5) * spread;

      x += (state.pointer.x - 0.5) * (1 - depth) * -140;
      x += Math.sin(time * 1.8 + rowIndex * 0.62 + colIndex * 0.18) * depth * 4;

      const distance = Math.hypot(x - pointerX, y - pointerY);
      const focus = clamp(1 - distance / 240, 0, 1);
      const glow = 0.08 + depth * 0.24 + focus * 0.32;
      const size = 0.7 + depth * 3.2 + focus * 1.25;

      ctx.fillStyle = `rgba(170, 248, 255, ${glow.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, TAU);
      ctx.fill();
    }
  }
}

export function mountInteractiveBackground(doc = document) {
  if (!doc?.getElementById || !doc?.defaultView || !doc?.createElement) {
    return false;
  }

  const root = doc.getElementById('dots');
  const win = doc.defaultView;

  if (!root || root.dataset?.enhanced === 'true') {
    return false;
  }

  if (win.VANTA?.DOTS) {
    win.VANTA.DOTS({
      el: root,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 5,
      size: 10,
      scaleMobile: 1,
      color: 2242616,
      color2: 16777215,
      backgroundColor: 0,
      spacing: 100,
      showLines: false,
    });

    if (root.dataset) {
      root.dataset.enhanced = 'true';
    }

    return true;
  }

  if (!root.appendChild) {
    return false;
  }

  const canvas = doc.createElement('canvas');
  canvas.className = 'dots-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const ctx = canvas.getContext?.('2d');

  if (!ctx) {
    return false;
  }

  root.appendChild(canvas);

  if (root.dataset) {
    root.dataset.enhanced = 'true';
  }

  const state = {
    canvas,
    columns: 30,
    rows: 16,
    pointer: {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
    },
    root,
    size: {
      width: 0,
      height: 0,
      dpr: 1,
    },
    win,
  };

  function resize() {
    state.size = resizeCanvas(canvas, ctx, root, win);
  }

  function handlePointerMove(event) {
    const width = state.size.width || win.innerWidth || 1;
    const height = state.size.height || win.innerHeight || 1;

    state.pointer.targetX = clamp((event.clientX ?? width * 0.5) / width, 0, 1);
    state.pointer.targetY = clamp((event.clientY ?? height * 0.5) / height, 0, 1);
  }

  function handlePointerReset() {
    state.pointer.targetX = 0.5;
    state.pointer.targetY = 0.5;
  }

  function animate(timestamp) {
    drawInteractiveDots(ctx, state, timestamp);

    if (typeof win.requestAnimationFrame === 'function') {
      win.requestAnimationFrame(animate);
    }
  }

  resize();

  win.addEventListener?.('resize', resize);
  win.addEventListener?.('pointermove', handlePointerMove);
  win.addEventListener?.('pointerleave', handlePointerReset);

  if (typeof win.requestAnimationFrame === 'function') {
    win.requestAnimationFrame(animate);
  } else {
    drawInteractiveDots(ctx, state, 0);
  }

  return true;
}

export function registerInteractiveBackgroundBoot(doc) {
  if (typeof doc === 'undefined') {
    return;
  }

  if (doc.readyState !== 'loading') {
    mountInteractiveBackground(doc);
    return;
  }

  doc.addEventListener('DOMContentLoaded', () => {
    mountInteractiveBackground(doc);
  });
}
