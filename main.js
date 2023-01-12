const counterElement = document.querySelector("#counter");
let miliSecCounter = 0;
let secCounter = 0;
let minCounter = 0;
let miliSecCounterDisplay;
let secCounterDisplay;
let minCounterDisplay;
let result;
let timerId;

let arrResult1;
let arrResult2='00:00:00';
let lapResult;
let razn = 0;

//Запуск секундомера по кнопке "Старт"
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

//Реализация кнопки "Пауза"
const btnPause = document.querySelector('#pause');
btnPause.addEventListener('click', function (){
  clearInterval(timerId);
});

//Сброс тайминга по кнопке "Сброс"
const btnReset = document.querySelector('#reset');
btnReset.addEventListener('click', function (){
  clearInterval(timerId);
  miliSecCounter = 0;
  secCounter = 0;
  minCounter = 0;
  counterElement.innerText = '00:00:00';
  arrResult2='00:00:00';
  console.log('result='+result);
});

//Реализация кнопки "Круг"
const btnLap = document.querySelector('#lap');
btnLap.addEventListener('click', function () {
if (arrResult2 == '00:00:00') {
  arrResult1 = [00, 00, 00];
} ;
arrResult2 = result.split(":");
let mil1 = Number(arrResult1[2]) + Number(arrResult1[1])*100 + Number(arrResult1[0]*6000);
let mil2 = Number(arrResult2[2]) + Number(arrResult2[1])*100 + Number(arrResult2[0]*6000);
razn = Math.abs(mil1-mil2);
lapResult = [Math.floor(razn/6000),Math.floor((razn-Math.floor(razn/6000)*6000)/100),
razn-((Math.floor(razn/6000)*6000)+(Math.floor((razn-Math.floor(razn/6000)*6000)/100))*100)];
arrResult1=arrResult2;
console.log('Lap:' + lapResult);
}); 

