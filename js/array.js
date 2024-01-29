console.log('array.js');

/* 
1.정렬함수 (원본변화)
 - sort(): 오름차순
 - reverse(): 내림차순 */

let fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.sort();
console.log(fruits);

fruits.reverse();
console.log(fruits);

let points = [40, 100, 1, 5, 25, 10];
points.sort();
console.log(points);

//* 숫자 값으로 정렬하려면 "sort함수 정의"해서 사용
//  : 리턴값이 음수일 땐 위치변화X - 양수면 a가 크니까 뒤로 보냄
points.sort(function(a,b){
  return a-b; //오름차순
});


/*
2.filter()
  : 기존 배열 -> 기준 => 새로운 배열 (원본변화X - 담을 변수 생성)
  - 매개변수(element, index, newArray)  */
let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

let result = words.filter((value, idx) => { 
  //return 데이터 타입: boolean
  return value.length > 6;
  //return value.indexOf('a') > -1; 
});
console.log(result);

//객체 배열에 filter()사용할 경우
// : 두 배열이 같은 객체를 가리키기 때문에(참조타입) 원본 변화 일어나니 주의
let userList = [ {id: 100, name: 'Hong'}, 
                 {id: 200, name: 'Kang'}, 
                 {id: 300, name: 'Han'}
               ];
let newList = userList.filter(obj => {
  return obj.name.indexOf('g') > -1;
});  
console.log(userList, newList);        

newList.forEach(obj => { //newList에만 age: 20 넣었는데 원본userList도 변함
  obj.age = 20;
})
console.log(userList, newList);  


/*
3.map()
  : 기존배열 -> 기준+조작 => 새로운 배열 (filter보다 많이 사용)
 - filter는 조건에 안 맞으면 배열개수를 줄일 수 있지만 map은 길이XXX
   => 그래서 조건에 안 맞는 거에 들어갈 값까지 정해줘야 됨 */

userList = [ {id: 100, name: 'Hong'}, 
                 {id: 200, name: 'Kang'}, 
                 {id: 300, name: 'Han'}
            ];

let newArray = userList.map(function(obj){
  //return데이터 타입 제한없음
  return obj.id < 300 ? obj.name : null;
})
console.log(userList, newArray);
console.clear();

//참조타입의 객체를 복사할 땐, 완전히 새로운 map을 만들어서 내부 property 값을 바꿀 수 있음
newList = userList.map((obj) => {
  return {
    id: obj.id,
    name: obj.name
  };
});
console.log(userList, newList);

newList.forEach(obj => {
  obj.age = 20;
})
console.log(userList, newList);

//4.reduce() : 누적합계
let nums = [50, 12, 999, 6, 100];
let sumRes = nums.reduce(function(total, value){
  return total + value;
}, 0);
console.log(sumRes);
