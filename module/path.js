const path = require('path');

//절대경로로 불러오기(별도의 모듈 사용하지 않아도 경로 찾을 수 있음)
//근데 환경변수를 사용해서 값을 불러오거나 다른 값을 가져왔을 땐 path 사용해야 되는 경우 있음
console.log('==절대경로');
console.log(__filename);
console.log(__dirname);

//path사용
console.log('실제 파일명: ', path.basename(__filename)); //경로에서 마지막에 해당되는 파일명을 불러옴
console.log('확장자 ', path.extname(__filename)); //인코딩

let pathList = process.env.PATH.split(path.delimiter);
console.log(path.delimiter);
console.table(pathList);
console.log(path.sep); //경로에 대한 구분자 sep
console.table(pathList[2].split(path.sep));