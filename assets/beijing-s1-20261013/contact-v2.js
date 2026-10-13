(function(){
 'use strict';
 var dialog=document.getElementById('rich-contact');
 if(!dialog || typeof dialog.showModal!=='function') return;
 var previous, details=dialog.querySelector('#wechat-details'), wechat=dialog.querySelector('[data-wechat-choice]'), status=dialog.querySelector('[data-copy-status]');
 document.querySelectorAll('[data-rich-contact]').forEach(function(trigger){trigger.addEventListener('click',function(e){e.preventDefault();previous=trigger;details.hidden=true;wechat.setAttribute('aria-expanded','false');status.textContent='';dialog.showModal();dialog.scrollTop=0;document.body.classList.add('rich-contact-open');dialog.querySelector('.rich-contact-close').focus();});});
 dialog.querySelector('.rich-contact-close').addEventListener('click',function(){dialog.close();});
 dialog.addEventListener('click',function(e){if(e.target===dialog){var r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',function(){document.body.classList.remove('rich-contact-open');if(previous)previous.focus();});
 wechat.addEventListener('click',function(){details.hidden=!details.hidden;wechat.setAttribute('aria-expanded',String(!details.hidden));if(!details.hidden)details.scrollIntoView({block:'nearest'});});
 dialog.querySelector('[data-copy-wechat]').addEventListener('click',function(){
  function fallback(){var field=document.createElement('textarea');field.value='heyheysummer';field.style.cssText='position:fixed;opacity:0';dialog.appendChild(field);field.select();var ok=false;try{ok=document.execCommand('copy');}catch(e){}field.remove();status.textContent=ok?'Copied · 微信号已复制':'Please copy heyheysummer · 请长按上方微信号';dialog.querySelector('[data-copy-wechat]').focus();}
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText('heyheysummer').then(function(){status.textContent='Copied · 微信号已复制';},fallback);else fallback();
 });
})();
