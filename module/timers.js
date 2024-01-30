// 2024-01-26 15:03:50

//const { setInterval } = require("timers/promises");

//연도 제외 2자리니 특정 코드 필요
function format(value) {
  return ('0' + value).slice(-2); //2자리
}

function getDateTime() {
  let today = new Date();

  let year = today.getFullYear();
  let month = format(today.getMonth() + 1);
  let date = format(today.getDate());

  let hours = format(today.getHours());
  let min = format(today.getMinutes());
  let sec = format(today.getSeconds());

  return `${year}-${month}-${date} ${hours}:${min}:${sec}`;
};
console.log(getDateTime());


//< setTimeout >
const timeout = setTimeout(() => {
  console.log(getDateTime());
}, 3000);

//clearTimeout(timeout); //취소 (3초 지나기 전에 바로 나와서 위 실행 X)

//< setInterval > --반복문 안에 넣지 않기
let count = 0;
const interval = setInterval(()=>{
  console.log('count', ++count);
  if(count == 5){
    clearInterval(interval);
  }
  console.log(getDateTime());
}, 2000);

//< setImmediate >
setImmediate(()=>{
  console.log('setImmediate', getDateTime());
});
console.log('마지막 코드');