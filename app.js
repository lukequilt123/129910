/* header scroll state */
const head=document.querySelector('.site-head');
const onScroll=()=>head.classList.toggle('scrolled',window.scrollY>40);
onScroll();window.addEventListener('scroll',onScroll,{passive:true});

/* mobile burger */
const burger=document.querySelector('.burger');
const nav=document.querySelector('.nav');
if(burger){
  burger.addEventListener('click',()=>{
    burger.classList.toggle('open');nav.classList.toggle('open');
    document.body.style.overflow=nav.classList.contains('open')?'hidden':'';
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');nav.classList.remove('open');document.body.style.overflow='';
  }));
}

/* reveal on scroll */
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* count-up stats */
const countEls=document.querySelectorAll('[data-count]');
const cio=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target,target=parseFloat(el.dataset.count),suf=el.dataset.suffix||'',
      dec=(target%1!==0)?1:0,dur=1600,t0=performance.now();
    const tick=(now)=>{
      const p=Math.min((now-t0)/dur,1),eased=1-Math.pow(1-p,3),val=target*eased;
      el.textContent=val.toLocaleString('en-GB',{minimumFractionDigits:dec,maximumFractionDigits:dec})+suf;
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);cio.unobserve(el);
  });
},{threshold:.5});
countEls.forEach(el=>cio.observe(el));
