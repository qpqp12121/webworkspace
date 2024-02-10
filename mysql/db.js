//db.js
const mysql = require('mysql');
const sql = require('./db/customerSql.js');

//1. Pool 생성
const connectionPool = mysql.createPool({ //createConnection은 개별이라 Pool로
  host: '127.0.0.1',
  port: '3306', //mysql port
  user: 'dev01', //외부접근 가능하도록 만든 계정
  password: '1234',
  database: 'dev',
  connectionLimit: 10,
  debug: true
});


//2.쿼리문 실행 -> 결과 반환하는 함수 
//* Pool의 내장함수인 query(실행할 queryString, 사용자가 넘기는 값, callback(db쪽에러, 결과))

//Promise가 return되기 때문에 async붙임 (구문 실행할 때 promise가지고 있어야 되니)
//- db처리 속도 늦어졌을 때 경우 대비해서 Promise로 반환
const executeQuery = async (alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias]; //sql은 객체. 그 중 지금 실행하고자 쿼리문 선택                  
    connectionPool.query(executeSql, values, (err, results) => { //쿼리실행 
      if (err) {                                                  
        console.log(err);
        reject({ err });
      } else {
        console.log(results); //tester전송 후 터미널에서 확인(app.js파일에서 app.get('/customers') 실행확인하려고 작성(async,await붙이기 전에)
        resolve(results);    //결과 select문은 단건이라도 무조건 배열로 넘어오고 DML은 객체로 넘어옴
      }
    })
  })
}


//서버가 db처리 일 몰라도 되니까 exports해서 사용할 거임
module.exports = {
  executeQuery
};