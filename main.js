const counterElement = document.querySelector("#counter");
let miliSecCounter = 0;
let secCounter = 56;
let minCounter = 0;
let miliSecCounterDisplay;
let secCounterDisplay;
let minCounterDisplay;
let result = '00:00:00';
let timerId;

const btnStart = document.querySelector('#start');
btnStart.addEventListener('click', function () {
  timerId = setInterval (function(){
  miliSecCounter += 1;
  if (miliSecCounter == 100) {
    secCounter += 1;
    miliSecCounter = 0;
  };
  if (secCounter == 60) {
      minCounter += 1;
      secCounter = 0;
    };

  (miliSecCounter<10) ? miliSecCounterDisplay = '0'+miliSecCounter : miliSecCounterDisplay=miliSecCounter;
  (secCounter<10) ? secCounterDisplay = '0'+secCounter : secCounterDisplay=secCounter;
  (minCounter<10) ? minCounterDisplay = '0'+minCounter : minCounterDisplay=minCounter;
result = minCounterDisplay + ':' + secCounterDisplay + ":" + miliSecCounterDisplay;
  
  counterElement.innerText = result;
}, 10)
});

const btnPause = document.querySelector('#pause');
btnPause.addEventListener('click', function (){
  clearInterval(timerId);
})

const btnReset = document.querySelector('#reset');
btnReset.addEventListener('click', function (){
  clearInterval(timerId);
  miliSecCounter = 0;
  secCounter = 0;
  minCounter = 0;
  counterElement.innerText = '00:00:00';
})