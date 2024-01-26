//1. < ES6 이전 >
//재생산을 위한 객체 생성법 = 생성자함수 + 즉시실행함수 

//안의 내용 한 대상을 가리키니 범위지정 위해 함수에 그냥 담아서 묶은 것
// var Person = (function() { //익명함수 안에 객체를 생성하기 위한 생성자함수~메서드 정의 끝나고 해당함수 return

//   //생성자함수
//   function Person(name) {
//     //객체가 가질 필드
//     this._name = name;
//   }

//   //객체가 가질 메소드
//   Person.prototype.sayHi = function () {
//     console.log('Hi ' + this._name);
//   }

//   //필드에 접근할 Setter, Getter
//   Person.prototype.setName = function (name) {
//     this._name = name;
//   }

//   Person.prototype.getName = function () {
//     return this._name;
//   }

//   return Person;

// })();//즉시실행(정의하자마자)

// //객체생성
// let userA = new Person('Hong');

// userA.sayHi(); //내부메서드호출
// userA.setName('Adward'); //값변경
// userA.sayHi();



//2. < ES6 > - let, const 방식으로 동작 (varX)
class Person {
  //생성자 함수
  constructor(name){
    //필드
    this._name = name;
  }
  //메서드
  sayHi(){
    console.log('Hi, new ' + this._name);
  }
  //setter
  set name(name){ //권한 더 강하게 제어(위ES6이전 setter.getter처럼 메서드X) 2가지 방식 사용은 다 가능
    this._name = name;
  }
  //getter
  get name(){
    return this._name;
  }
}
let userB = new Person('Hong');
userB.sayHi();
userB.name = 'Lee';
console.log(userB.name);
userB.sayHi();