console.log('< Template Literals >');

let subject = 'Javascript';
let tool = 'VS code';

//현재 수업은 "Javascript"를 진행하고
//사용하는 툴은 "VS code"입니다.
let msg = '현재 수업은 "'+subject+'"를 진행하고';
//console.log(msg);
msg = '사용하는 툴은 "'+tool+'"입니다.';
//console.log(msg);

msg = 
`현재 수업은 "${subject}"를 진행하고
사용하는 툴은 "${tool}"입니다.`
console.log(msg);


//Spread Operator
console.log('< Spread Operator >');

//1)배열
let arr1 = [4,5,6];
let arr2 = [1,2,3];
let arr3 = [arr1, arr2]; // [ [배열][배열] ] 로 이차원배열로 합쳐짐(그럼 이중for문사용해서 값꺼내야되ㅁ)
console.log(arr3);
arr3 = [...arr1, ...arr2]; // [ ] 하나의 배열로 안의 값만 합쳐서 나열
console.log(arr3);

//2)문자열
let word = "Hello";
// H e l l o
let alphabet = [...word, "J", "S"];
console.log(alphabet);

//Array.isArray(); //true면 배열) typeOf는 배열인지 판단X

let user = {
  id: 100,
  name: "Hong",
  age: 20,
  address: "Daegu"
};

//객체 순환 for .. in
let info = [];
for(let field in user){
  //user.field 사용불가 => {field : "js"} -> 필드명을 통해서 접근하는 거고
  //user[field] : 변수field로 접근하는 것
  console.log(field, user[field]); //대괄호로 접근 가능
  
  //객체 -> 배열로 변환
  info.push(field);
}
console.log(info);