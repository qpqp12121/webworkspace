//db.js
const mysql = require('mysql');
const sql = require('./db/customerSql.js');
//들고있는 대상 sql.customerList 현재 1개

//1.connection pool 생성 (sql문 실행 전) -아래 기본적인 것만 작성 함
const connectionPool = mysql.createPool({ //createConnection은 개별이라 Pool로
  host: '127.0.0.1',
  port: '3306', //mysql port
  user: 'dev01', //외부접근 가능하도록 만든 계정
  password: '1234',
  database: 'dev',
  connectionLimit: 10,
  debug: true
});

//2.SQL문 실행 
//비동기 처리라 함수로 작성함(쿼리문을 실행하고 결과를 반환하는 함수)
//--db처리 속도 늦어졌을 때 경우 대비해서 Promise로 반환
const executeQuery = async (alias, values) => { //Promise가 return되기 때문에 async붙임(구문 실행할 때 promise가지고 있어야 되니)
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias]; //sql은 객체. 그 중 지금 실행하고자 쿼리문 선택
    //쿼리실행                    //현재는 sql문파일에 export 1개되어있는 customerList가 alias로 넘어올 것
    connectionPool.query(executeSql, values, (err, results) => { //(실행하려는 쿼리문, 사용자가 넘기는 값, 콜백(db쪽에러, 결과))
      if (err) {                                                  //결과 select문은 단건이라도 무조건 배열로 넘어오고 DML은 객체로 넘어옴
        console.log(err);
        reject({ err });
      } else {
        console.log(results); //tester전송 후 터미널에서 확인(app.js파일에서 app.get('/customers') 실행확인하려고 작성(async,await붙이기 전에)
        resolve(results);
      }
    })
  })
}
//여기서 변경사항 거의 X -> customerSql.js에서 sql문만 계속 추가되는

//서버가 db처리 일 몰라도 되니까 exports해서 사용할 거임
module.exports = {
  executeQuery
};