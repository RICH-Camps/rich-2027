
(function(){
  const data=JSON.parse(document.getElementById('comparison-data').textContent);
  const buttons=[...document.querySelectorAll('[data-route]')];
  const setText=(id,value)=>{document.getElementById(id).textContent=value;};
  function update(key){
    const d=data[key];
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.route===key)));
    for(const [year,prefix] of [[2026,'old'],[2027,'new']]){
      const count=d[prefix+'_count'],hours=count*d.hours_per_day;
      setText('route-'+year,d.en);setText('count-'+year,count);setText('date-'+year,d[prefix+'_date']);
      setText('hours-'+year,hours);setText('hours-formula-'+year,count+'天 × 每天'+d.hours_per_day+'小时');
      setText('calendar-total-'+year,count+' / 16天 · 课日总量');
      document.getElementById('source-'+year).setAttribute('href',d[prefix+'_url']);
      const calendar=document.getElementById('calendar-'+year);
      while(calendar.firstChild){calendar.removeChild(calendar.firstChild);}
      calendar.setAttribute('aria-label','16天中'+count+'天为中文课日，课日总量示意');
      for(let index=0;index<16;index++){
        const cell=document.createElement('li');
        cell.className=index<count?'class-day':'other-day';
        cell.setAttribute('aria-hidden','true');
        calendar.append(cell);
      }
    }
    const gain=d.new_count-d.old_count,gainHours=gain*d.hours_per_day;
    setText('gain-value','+'+gain);
    setText('gain-hours','+'+gainHours);setText('gain-formula',gain+'天 × 每天'+d.hours_per_day+'小时 = '+gainHours+'小时');
    setText('gain-en',gain+' more class days · '+gainHours+' more hours');setText('route-why',d.why);setText('route-why-en',d.why_en);
    setText('old-travel',d.old_travel);setText('new-travel',d.new_travel);setText('old-travel-en',d.old_travel_en);setText('new-travel-en',d.new_travel_en);
    setText('comparison-status',d.zh+'：2026年'+d.old_count+'天、'+d.old_count*d.hours_per_day+'小时中文课；2027年'+d.new_count+'天、'+d.new_count*d.hours_per_day+'小时中文课；增加'+gain+'天、'+gainHours+'小时。');
  }
  buttons.forEach(button=>button.addEventListener('click',()=>update(button.dataset.route)));
  document.getElementById('print-page').addEventListener('click',()=>window.print());
})();
