//< Default function parameter > 55p

//초기값 줘서 최소한 값은 나오도록(기능동작되도록)(매개값 안 받아도)
//ex.필수값 아닌 선택값 사용자가 미입력 시 undefined등 문제 생길 경우 등
function getComment(user = 'Anony', msg = 'no comment'){ 
  let result = `${msg}, from ${user}`;
  console.log(result);
}
getComment('Han', 'Today is ...');
getComment('Adward');
getComment(undefined,'Hello, World'); //테스트
getComment();


//< Rest Parameter > --반드시 마지막에 존재하고 배열이다
//더하는 수의 제한이 없는 더하기 계산 
function sum(x=0, y=0, ...args){ //ex.사용자 입장에서 0이 뜨는 거랑 undefined뜨는 거랑
  let result = x + y;
  for(let num of args){
    result += num;
  }
  return result;
}
console.log(sum(1,2))
console.log(sum(10,20,30,40));

let ary = [1,2,3,4,5,6,7];
console.log(sum(...ary)); //매개값으로 spread연산자 사용하면 값 하나씩 다 들어가서 계산 됨

/* 
...args 
1) 정의하는 곳에서 사용되면 Rest Parameter
2) 실행하는 곳: spread연산자
*/