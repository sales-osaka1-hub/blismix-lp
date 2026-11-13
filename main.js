(function(){
  var v=document.getElementById('vid'),p=document.getElementById('player'),btn=document.getElementById('playbtn'),ico=document.getElementById('ico'),prog=document.getElementById('prog');
  var PLAY='M7 4.5v15l12-7.5z',PAUSE='M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z';
  function sync(){var on=!v.paused&&!v.ended;p.classList.toggle('on',on);ico.setAttribute('d',on?PAUSE:PLAY);btn.setAttribute('aria-label',on?'紹介動画を一時停止':'紹介動画を再生');}
  if(v&&btn){
    btn.addEventListener('click',function(){if(v.paused||v.ended){var r=v.play();if(r&&r.catch)r.catch(sync);}else v.pause();});
    v.addEventListener('click',function(){btn.click();});
    ['play','pause','ended'].forEach(function(e){v.addEventListener(e,sync);});
    v.addEventListener('timeupdate',function(){if(v.duration)prog.style.width=(v.currentTime/v.duration*100)+'%';});
  }
  /* tabs */
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  tabs.forEach(function(t){t.addEventListener('click',function(){
    tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on?'true':'false');document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});
  });});
  /* phone bar: after first view, hidden over the line-up */
  var bar=document.getElementById('bar'),fv=document.querySelector('.fv'),lu=document.getElementById('lineup');
  if(!bar||!('IntersectionObserver' in window))return;
  var h=true,l=false;function upd(){bar.classList.toggle('on',!h&&!l);}
  new IntersectionObserver(function(e){h=e[0].isIntersecting;upd();},{rootMargin:'0px 0px -40% 0px'}).observe(fv);
  new IntersectionObserver(function(e){l=e[0].isIntersecting;upd();}).observe(lu);
})();
