console.log('arrow.js');

//함수 선언식 = var 선언자와 동일하게 동작(전역) 
//             *동일한 함수명으로 겹치면 문제 발생
function hello(name){
  console.log(name);
}

function hello(msg){
  console.log('출력: ' + msg);
}

//함수표현식 = const 선언자(위 문제로)
const hello2 = function(name){
  console.log('hello, ' + name);
}
//함수표현식을 화살표함수로 사용
const hello3 = (name) => console.log('hello, ' + name);
hello3('Javascript'); //호출은 같음

//기능상 차이는 없고 어디서 사용하고 있는지 추적이 쉽기 때문에 함수표현식 const 사용


//화살표 함수 문법
let msg = msg => console.log('result, ' + msg);
msg = () => console.log('Hello, World');
msg = (x,y) => console.log(x+y);

msg = (x,y) => {
  let result = x + y;
  console.log(result);
}

console.clear();

//*js에선 메서드 안에서 사용되는 내부 this가 객체를 가리킴
//(자바가 가리키는 this가 객체 인스턴스를 가리키는 것처럼)

//화살표 함수와 this의 연관성
let array = [1,3,5,7];

array.forEach(function(value, idx){
  console.log(value, this); //(노드 내장객체가 this에 바인딩되어 나온 거)
});
//* 화살표함수는 this와 무관! (이벤트핸들러 사용시에도 화살표XX)
array.forEach((value, idx) => { 
  console.log(value, this);
});





