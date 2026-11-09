(() => {
  'use strict';
  const launchAt = Date.parse('2027-02-15T00:00:00+05:30');
  const fields = ['days', 'hours', 'minutes', 'seconds'].map(id => document.getElementById(id));
  let timer;
  function update() {
    const remaining = Math.max(0, Math.floor((launchAt - Date.now()) / 1000));
    const values = [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
    fields.forEach((field, i) => { field.textContent = String(values[i]).padStart(2, '0'); });
    if (remaining === 0) {
      document.getElementById('launch-message').textContent = 'The countdown is complete. A new chapter begins.';
      clearInterval(timer);
    }
  }
  document.getElementById('year').textContent = new Date().getFullYear();
  timer = setInterval(update, 1000);
  update();
})();
// Decorative simulation: no user data or AI service is involved.
(() => {
  'use strict';
  const intro = document.getElementById('logo-intro');
  const skip = document.getElementById('intro-skip');
  const dismiss = () => {
    if (intro.contains(document.activeElement)) document.querySelector('.brand').focus({preventScroll:true});
    intro.classList.add('is-dismissed');
  };
  skip.addEventListener('click', dismiss);
  setTimeout(dismiss, 3500);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') dismiss(); });

  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const formula = document.getElementById('calculation');
  const formulas = ['h = σ(Wx + b)', 'z = [0.82, 0.41, 0.97]', 'α = softmax(QKᵀ / √d)', '∇L → update → repeat', 'Σ ideas → possibilities'];
  const nodes = [];
  // A connected sphere, with depth projection and signals along its edges.
  const count = 100;
  for (let i = 0; i < count; i++) {
    const y = 1 - 2 * (i + .5) / count;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    nodes.push({x:Math.cos(angle)*radius,y,z:Math.sin(angle)*radius});
  }
  const edges = [];
  nodes.forEach((a,i) => nodes.forEach((b,j) => {
    if(j > i && Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z) < .43) edges.push([i,j]);
  }));
  let size = 0, frame = 0, last = -Infinity, elapsed = 0, previous = null, formulaIndex = -1;
  function resize() {
    size = canvas.clientWidth;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(size*dpr);
    canvas.height = Math.round(size*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function draw(time) {
    const angle = motion.matches ? .35 : time * .00008;
    const scale = size * .31;
    const projected = nodes.map(n => {
      const x = n.x*Math.cos(angle) + n.z*Math.sin(angle);
      const z = n.z*Math.cos(angle) - n.x*Math.sin(angle);
      const perspective = 2.8 / (2.8-z*.25);
      return {x:size*.5+x*scale*perspective,y:size*.46+n.y*scale*perspective,z};
    });
    ctx.clearRect(0,0,size,size);
    edges.forEach(([i,j],index) => {
      const a=projected[i],b=projected[j];
      const alpha=.08+((a.z+b.z+2)/4)*.22;
      ctx.strokeStyle=`rgba(175,126,244,${alpha})`;
      ctx.lineWidth=.7;
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      if(!motion.matches && index%5===0){
        const t=((time*.00023+index*.137)%1);
        ctx.fillStyle='rgba(226,201,255,.85)';
        ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,1.7,0,Math.PI*2);ctx.fill();
      }
    });
    projected.forEach((n,i) => {
      const pulse=motion.matches ? .5 : .5+.5*Math.sin(time*.0018+i);
      const radius=1.3+(n.z+1)*.65+pulse*.6;
      ctx.fillStyle=`rgba(207,171,255,${.25+(n.z+1)*.28})`;
      ctx.shadowBlur=6+pulse*8;ctx.shadowColor='#a770ed';
      ctx.beginPath();ctx.arc(n.x,n.y,radius,0,Math.PI*2);ctx.fill();
    });
    ctx.shadowBlur=0;
    const next=motion.matches ? 0 : Math.floor(time/3300)%formulas.length;
    if(next!==formulaIndex){formula.textContent=formulas[next];formulaIndex=next;}
  }
  function tick(now){
    if(previous!==null) elapsed+=Math.min(now-previous,100);
    previous=now;
    if(now-last>32){draw(elapsed);last=now;}
    frame=requestAnimationFrame(tick);
  }
  function start(){cancelAnimationFrame(frame);previous=null;if(!document.hidden&&!motion.matches)frame=requestAnimationFrame(tick);else draw(elapsed);}
  new ResizeObserver(() => {resize();draw(elapsed);}).observe(canvas);
  document.addEventListener('visibilitychange',start);
  motion.addEventListener('change',start);
  resize();start();
})();