let data = 'http://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash';

//1.레거시 API (읽을 줄만 알기)
const url = require('url');
let legercy = url.parse(data);

console.log(legercy); //query: 'query=string' ---fetch에서 인식 못 함


//2.WHATWG(웹표준) API *require() X -> 내장된 객체로
const whatwg = new URL(data); //parsing X -> 새로운 클래스 생성

console.log(whatwg); //origin 추가-웹보안의기준 / query X / searchParams: 텍스트X ->클래스
console.log(whatwg.searchParams instanceof URLSearchParams); //--fetch post방식으로 내부에 query string사용하는 경우 사용 됨
console.log(whatwg.searchParams.get('query'));
