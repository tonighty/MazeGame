 var init = 0;
 var startDate;
 var time;
 var bestTime=8640000000000000;
 var clocktimer;

 function resetTime() {
   init = 0;
   clearTimeout(clocktimer);
   timer.innerHTML = '00:00.00';
 }

 function startTIME() {
   var thisDate = new Date();
    time = thisDate.getTime() - startDate.getTime();
t=time;
   var ms = t % 1000;
   t -= ms;
   ms = Math.floor(ms / 10);
   t = Math.floor(t / 1000);
   var s = t % 60;
   t -= s;
   t = Math.floor(t / 60);
   var m = t;
   if (s < 10) s = '0' + s;
   if (ms < 10) ms = '0' + ms;
   if (init == 1) timer.innerHTML = m + ':' + s + '.' + ms;
   clocktimer = setTimeout("startTIME()", 10);
 }

 function findTIME() {
   if (init == 0) {
     startDate = new Date();
     startTIME();
     init = 1;
   } else {
     results.innerHTML = "<span>" + timer.innerHTML + "</span><br>"+results.innerHTML;
     resetTime();
   }
 }
