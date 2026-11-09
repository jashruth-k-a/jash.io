// cursor
const cur = document.getElementById('cur'),
      curR = document.getElementById('curR');

document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    curR.style.left = e.clientX + 'px';
    curR.style.top = e.clientY + 'px';
  }, 65);
});

document.querySelectorAll('a,button,.xcard,.build-card,.tag').forEach(el => {
  el.addEventListener('mouseenter', () => curR.classList.add('on'));
  el.addEventListener('mouseleave', () => curR.classList.remove('on'));
});

// fade-in observer
const io = new IntersectionObserver(es =>
  es.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
  }),
  { threshold: 0.07 }
);

document.querySelectorAll('.fu').forEach(el => io.observe(el));


// ================= DATA =================

const D = {

  mile1:{
    tag:'AI 360 - Pre Summit to the India AI Impact Summit 2026 · Jan 2026',
    title:'Top 5 - AI 360 Ideathon',
    icon:'🤖',
    images:[
      "images/AI360_001.jpg",
      "images/AI360_002.jpg",
      "images/AI360_003.jpg"
    ],
    desc:`Participated in “AI 360 - Unmasking AI for Society,” the official pre-summit to the India AI Impact Summit held at PES University on January 10, 2026.

Worked with Team MAVERICKS and was recognized among the Top 5 teams in the Ideathon + Mini Hackathon.

Built a generative AI solution during the Rapid Prototyping Challenge, focusing on real-world impact, creativity, and responsible AI.

Teammates: Ashmitha, Sanjana, Grishma.`
  },

  mile2:{
    tag:'Milestone — Hackathon · Mar 2026',
    title:'4th Place — Nimbus 1000',
    icon:'⚡',
    images:[
      "images/nimbus1.jpg",
      "images/nimbus2.jpg",
      "images/nimbus3.jpg"
    ],
    desc:`Participated in “Nimbus 1000 — Dev with Kiro,” hosted by Nexus (AWS) PES University in collaboration with AWS User Groups Madurai and Bangalore.

Secured 4th place among 44 teams.

Built “Acadrix,” a RAG-powered academic assistant delivering hallucination-free, document-grounded answers with adaptive study modes.

Worked with AWS services like Lambda and Bedrock while focusing on scalable and practical AI solutions.`
  },

  mile3:{
    tag:'Milestone — Achievement · Aug 2025',
    title:'Gold Medal — National Karate Championship',
    icon:'🥇',
    images:[
      "images/karate1.jpg",
      "images/karate2.jpg",
      "images/karate3.jpg"
    ],
    desc:`Secured a Gold Medal in Kata at an Open National Level Karate Championship on August 3, 2025.

Represented the School of Indian Karate, where our academy delivered outstanding performances across multiple events and emerged as one of the highlights of the championship.

This achievement reflects discipline, consistency, and excellence beyond academics.`
  }

};


// ================= MODAL =================

let s = 0;

function openModal(id){
  const d = D[id];
  if(!d) return;

  document.getElementById('mTag').textContent = d.tag;
  document.getElementById('mTitle').textContent = d.title;
  document.getElementById('mDesc').textContent = d.desc;

  // 🔥 IMAGE CAROUSEL
  const slides = document.querySelectorAll('.c-slide');

  slides.forEach((slide, i) => {
    if(d.images && d.images[i]){
      slide.innerHTML = `<img src="${d.images[i]}" style="width:100%;height:100%;object-fit:cover;">`;
    } else {
      slide.innerHTML = `<div class="c-ph"><div class="c-ico">${d.icon}</div></div>`;
    }
  });

  s = 0;
  updateCar();

  document.getElementById('modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('modalBg').classList.remove('open');
  document.body.style.overflow = '';
}

function closeOut(e){
  if(e.target === document.getElementById('modalBg')) closeModal();
}

function nextS(){
  s = (s + 1) % 3;
  updateCar();
}

function prevS(){
  s = (s - 1 + 3) % 3;
  updateCar();
}

function goS(n){
  s = n;
  updateCar();
}

function updateCar(){
  document.querySelectorAll('.c-slide').forEach((el, i) =>
    el.classList.toggle('on', i === s)
  );
  document.querySelectorAll('.c-dot').forEach((el, i) =>
    el.classList.toggle('on', i === s)
  );
}


// ================= TICKER =================

(function(){
  var t = document.getElementById('tickerTrack');
  if(t) t.innerHTML += t.innerHTML;
})();


// ================= KEY EVENTS =================

document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});