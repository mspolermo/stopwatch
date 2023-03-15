const counterElement = document.querySelector("#counter");
const stopwatch = document.querySelector('#stopwatch');
const btnCentr = document.querySelector('#btn');
let container = document.querySelector('#container');
let miliSecCounter = 0;
let secCounter = 0;
let minCounter = 0;
let miliSecCounterDisplay;
let secCounterDisplay;
let minCounterDisplay;
let result='00:00:00';
let timerId;
let startLapValue; 
let currentLapValue='00:00:00';
let lapResult;
let lapResultUpg = [];
let lapClicks = 0;
let stopClicks = 0;
let htmlResult;
let btnCentrCounter = 0;

//Реализация функции активации кнопок по нажатию "Enter"
function keyWaiter (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById(this.id).click();
    document.getElementById(this.id).style.transform= 'translateY(1px)';
    let currentButton = this.id;
    setTimeout(function() {
      document.getElementById(currentButton).style.transform= 'translateY(0px)';
    }, 100)
  };
};

//Запуск секундомера по кнопке "Старт"
const btnStart = document.querySelector('#start');
btnStart.addEventListener('click', function () {
  timerId = setInterval (function () {
  miliSecCounter += 1;
  if (miliSecCounter == 100) {
    secCounter += 1; miliSecCounter = 0; 
  };

  if (secCounter == 60) {
    minCounter += 1; secCounter = 0; 
  };

  (miliSecCounter < 10) ? miliSecCounterDisplay = '0' + miliSecCounter : miliSecCounterDisplay = miliSecCounter;
  (secCounter < 10) ? secCounterDisplay = '0' + secCounter : secCounterDisplay = secCounter;
  (minCounter < 10) ? minCounterDisplay = '0' + minCounter : minCounterDisplay = minCounter;
  result = minCounterDisplay + ':' + secCounterDisplay + ":" + miliSecCounterDisplay;
  
  counterElement.innerText = result;
}, 10);
stopClicks = 0;
});
btnStart.addEventListener('keyup', keyWaiter);

//Реализация кнопки "Пауза"
const btnPause = document.querySelector('#pause');
btnPause.addEventListener('click', function () {
  clearInterval(timerId);
  if ((result=='00:00:00') || (stopClicks>=1)) {
    container.insertAdjacentHTML('afterbegin', `<p class="stopwatch__textContainer__string">Секундомер не запущен</p>`)
  }else{
  container.insertAdjacentHTML('afterbegin', `<p class="stopwatch__textContainer__string">Секундомер на паузе. Текущий результат: ${result} </p>`);}
});
btnPause.addEventListener('keyup', keyWaiter);

//Реализация кнопки "Круг"
const btnLap = document.querySelector('#lap');
btnLap.addEventListener('click', function () {
  
  lapClicks += 1; //Счетчик нажатий кнопки "Круг"

  if (currentLapValue == '00:00:00') {startLapValue = [00, 00, 00];};

  currentLapValue = result.split(":");
  let mil1 = Number(startLapValue[2]) + Number(startLapValue[1]) * 100 + Number(startLapValue[0] * 6000);
  let mil2 = Number(currentLapValue[2]) + Number(currentLapValue[1]) * 100 + Number(currentLapValue[0] * 6000);
  let razn = Math.abs(mil1 - mil2);
  lapResult = [Math.floor(razn / 6000),Math.floor((razn-Math.floor(razn / 6000) * 6000) / 100),
  razn - ((Math.floor(razn / 6000) * 6000) + (Math.floor((razn - Math.floor(razn / 6000) * 6000) / 100)) * 100)];
  startLapValue = currentLapValue;

  (lapResult[0]<10) ? lapResultUpg[0] = '0'+ lapResult[0] : lapResultUpg[0] = lapResult[0];
  (lapResult[1]<10) ? lapResultUpg[1] = '0'+ lapResult[1] : lapResultUpg[1] = lapResult[1];
  (lapResult[2]<10) ? lapResultUpg[2] = '0'+ lapResult[2] : lapResultUpg[2] = lapResult[2];

        //Вставка результата 
  if (miliSecCounter == 0 && secCounter == 0 && minCounter == 0){
    htmlResult = `<p class="stopwatch__textContainer__string">Секундомер не запущен</p>`;
    container.insertAdjacentHTML('afterbegin', htmlResult);
    lapClicks = 0;
    currentLapValue='00:00:00';
    startLapValue = [00, 00, 00];
    lapResultUpg = [00, 00, 00];
  } else {
    htmlResult = 
      `<span class="stopwatch__textContainer__LapElements stopwatch__textContainer__LapElements_numLap">#${lapClicks}</span> 
      <span class="stopwatch__textContainer__LapElements">Круг: ${lapResultUpg.join(":")} </span> 
      <span class="stopwatch__textContainer__LapElements">Общий результат: ${currentLapValue.join(":")} 
      </span>
      </br>`;
    container.insertAdjacentHTML('afterbegin', htmlResult);
  };
}); 
btnLap.addEventListener('keyup', keyWaiter);

//Остановка секундомера по кнопке "Стоп"
const btnStop = document.querySelector('#stop');
btnStop.addEventListener('click', function () {
  stopClicks += 1; //Счетчик нажатий кнопки "Стоп"

  clearInterval(timerId);
  miliSecCounter = 0;
  secCounter = 0;
  minCounter = 0;
  lapClicks = 0;
  currentLapValue='00:00:00';
  startLapValue = [00, 00, 00];
  lapResultUpg = [00, 00, 00];

  counterElement.innerText = '00:00:00';
  htmlResult = `<p class="stopwatch__textContainer__string">Общий результат: ${result}</p>`;

  if ((stopClicks !== 1) || (result=='00:00:00')) {
    container.insertAdjacentHTML('afterbegin', `<p class="stopwatch__textContainer__string">Секундомер не запущен</p>`)
  }else{
    container.insertAdjacentHTML('afterbegin', htmlResult)};
});
btnStop.addEventListener('keyup', keyWaiter);

//Реализация кнопки "Очистить сообщения"
const btnClear = document. querySelector('#clear');
btnClear.addEventListener('click', function clear(){
  container.innerHTML='';
});
btnClear.addEventListener('keyup', keyWaiter);

//Реализация кнопки "Центр"
btnCentr.addEventListener('click', function(){
  btnCentrCounter ++;
  if (btnCentrCounter == 1) {
    stopwatch.classList.add('stopwatch_centerPosition');
  } else {
    btnCentrCounter = 0;
    stopwatch.classList.remove('stopwatch_centerPosition');
  }
});
btnCentr.addEventListener('keyup', keyWaiter);