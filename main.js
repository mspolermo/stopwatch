const counterElement = document.querySelector("#counter");
let container = document.querySelector('#container');
let miliSecCounter = 0;
let secCounter = 0;
let minCounter = 0;
let miliSecCounterDisplay;
let secCounterDisplay;
let minCounterDisplay;
let result;
let timerId;

let startLapValue 
let currentLapValue='00:00:00';
let lapResult;

//Запуск секундомера по кнопке "Старт"
const btnStart = document.querySelector('#start');
btnStart.addEventListener('click', function start() {
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
btnPause.addEventListener('click', function pause(){
  clearInterval(timerId);
});

//Сброс тайминга по кнопке "Сброс"
const btnReset = document.querySelector('#reset');
btnReset.addEventListener('click', function reset(){
  clearInterval(timerId);
  miliSecCounter = 0;
  secCounter = 0;
  minCounter = 0;
  counterElement.innerText = '00:00:00';
  currentLapValue='00:00:00';
  const htmlResult = `<p>Результат: ${result}</p>`;
container.insertAdjacentHTML('beforeend', htmlResult);
});

//Реализация кнопки "Круг"
const btnLap = document.querySelector('#lap');
btnLap.addEventListener('click', function lap() {
if (currentLapValue == '00:00:00') {
  startLapValue = [00, 00, 00];
} ;
currentLapValue = result.split(":");
let mil1 = Number(startLapValue[2]) + Number(startLapValue[1])*100 + Number(startLapValue[0]*6000);
let mil2 = Number(currentLapValue[2]) + Number(currentLapValue[1])*100 + Number(currentLapValue[0]*6000);
let razn = Math.abs(mil1-mil2);
lapResult = [Math.floor(razn/6000),Math.floor((razn-Math.floor(razn/6000)*6000)/100),
razn-((Math.floor(razn/6000)*6000)+(Math.floor((razn-Math.floor(razn/6000)*6000)/100))*100)];
startLapValue=currentLapValue;
console.log('Lap:' + lapResult);
//Вставка результата 
const htmlResult = `<p>Круг: ${lapResult}</p>`;
container.insertAdjacentHTML('beforeend', htmlResult);
}); 
