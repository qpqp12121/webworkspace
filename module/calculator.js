const defaultNum = 1;

function add(num1, num2){
  return num1 + num2;
}

function minus(num1, num2){
  return num1 - num2;
}

function multi(num1, num2){
  return num1 * num2;
}

function divide(num1, num2){
  return num1 / num2;
}


//객체
//*마지막에 존재해야 됨!
module.exports = {  //(require를 기반으로 사용)
//export default { //(import를 기반으로 사용)--module.js참고
  defNum : defaultNum, //내부에서 사용하는 이름과 외부에서 사용하는 이름 다르면 개별로 작성해도 되고
  add,  //add : add    //같으면 그냥 하나로 사용하는 약어 
  minus, //"minus" : minus  (더 정확하게 표현하자면)
  multi,
  divide
}

