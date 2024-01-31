//homework/db.js
const mysql = require('mysql'); //mysql module
const sql = require('./db/t_usersSql.js'); //쿼리문 작성된 파일

//1.connection pool 생성
const connectionPool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306', //mysql port
  user: 'dev01', //외부접근 가능하도록 만든 계정
  password: '1234',
  database: 'dev',
  connectionLimit: 10,
  debug: true
});

//2.쿼리문 실행하고 결과 반환하는 함수
const executeQuery = async(alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias];
    //Pool생성되면 내장함수인 query(실행하려는 쿼리문, 쿼리문으로 전달할 데이터 배열, callback함수로 결과전달) 사용해서 쿼리 실행
    connectionPool.query(executeSql, values, (err, results) => {
      if(err){
        console.log(err);
        reject({ err });
      }else {
        console.log(results); //talend tester api 확인용
        resolve(results);
      }
    })
  })
}

module.exports = {
  executeQuery
};