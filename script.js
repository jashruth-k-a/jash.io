const cur=document.getElementById('cur'),curR=document.getElementById('curR');
document.addEventListener('mousemove',e=>{
  cur.style.left=e.clientX+'px'; cur.style.top=e.clientY+'px';
  setTimeout(()=>{curR.style.left=e.clientX+'px'; curR.style.top=e.clientY+'px';},65);
});
document.querySelectorAll('a,button,.xcard,.build-card,.tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>curR.classList.add('on'));
  el.addEventListener('mouseleave',()=>curR.classList.remove('on'));
});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:0.07});
document.querySelectorAll('.fu').forEach(el=>io.observe(el));

const D={ /* HUGE DATA OBJECT (unchanged from your file) */ };

let s=0;
function openModal(id){
  const d=D[id]; if(!d) return;
  document.getElementById('mTag').textContent=d.tag;
  document.getElementById('mTitle').textContent=d.title;
  document.getElementById('mDesc').textContent=d.desc;
  document.getElementById('cIco').textContent=d.icon;
  s=0; updateCar();
  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){ document.getElementById('modalBg').classList.remove('open'); document.body.style.overflow=''; }
function closeOut(e){ if(e.target===document.getElementById('modalBg')) closeModal(); }
function nextS(){ s=(s+1)%3; updateCar(); }
function prevS(){ s=(s-1+3)%3; updateCar(); }
function goS(n){ s=n; updateCar(); }
function updateCar(){
  document.querySelectorAll('.c-slide').forEach((el,i)=>el.classList.toggle('on',i===s));
  document.querySelectorAll('.c-dot').forEach((el,i)=>el.classList.toggle('on',i===s));
}

// ticker loop
(function(){
  var t = document.getElementById('tickerTrack');
  if(t) t.innerHTML += t.innerHTML;
})();

document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeModal();
});