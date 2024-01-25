//Destructuring assignment
//object destructuring 은 module.```
console.log('< Destructuring >');

//1.Object
function getUserInfo(){
  return {
    firstName: 'John',
    lastName: 'Doe',
    age: 37,
    email: 'john@gmail.com',
    city: 'New York',
    country: 'USA',
    info: function(){
      return 'My Name is ' + this.lastName;
    }
  };
};

let user = getUserInfo(); //객체 전체를 배열에 넣어서 메모리 많이 차지
console.log(user);
console.log(user.info()); //객체 전체가 들어있어서 info()메서드로 사용해서 값 나오는데

let { firstName, lastName, info } = getUserInfo(); //두 필드 골라서 넣기 때문에 메모리 효율적으로 사용
console.log(firstName, lastName); 
console.log(info()); //분해했으니 info()더이상 메서드 아니고 함수라 undefined 뜸

//모듈 안에 기능을 사용할 수 있는 건 함수

//2.Array
let ary = [1,2,3];

let [x, y, z] = ary;
console.log(x,y,z);

let [a,b] = ary;
console.log(a,b);

let [e, f, g, h] = ary; //배열의 값보다 많을 경우 undefined
console.log(e, f, g, h);

//