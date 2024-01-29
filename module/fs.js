//96p
const fs = require('fs');
const data = 'Hello, Node.js World';

//stream작업이 되어 아래 file 새로 생성 됨 (data출력)
// fs.writeFile('./sample.txt', data, 'utf-8', (err)=>{ //options인코딩중요!
//   if(err) throw err;
//   console.log('job completed');
// });


fs.readFile('./sample.txt', 'utf-8', (err, data)=>{ //함수스코프라 위 const data가지고 오는 거 아님
  if(err) throw err;                                //sample.txt file 읽어오는 것
  console.log(data);
});

