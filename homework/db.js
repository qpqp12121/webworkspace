const mysql = require('mysql'); //mysql module
const sql = require('./db/t_usersSql.js') //쿼리문 파일

//1. Pool 생성
const connectionPool = mysql.createPool({ //createConnection은 개별이라 Pool로
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT, //mysql port
  user: process.env.MYSQL_USER, //외부접근 가능하도록 만든 계정
  password: process.env.MYSQL_PWD,
  database: process.env.MYSQL_DB,
  connectionLimit: process.env.MYSQL_CONNET_LIMIT,
  debug: true
});

//2.쿼리문 실행 -> 결과 반환하는 함수
//* Pool의 내장함수인 query(실행할 queryString, 사용자가 넘기는 값, callback(db쪽에러, 결과))
const query = async(alias, values) => {
  return new Promise((resolve, reject) => {
    let executeSql = sql[alias];
    connectionPool.query(executeSql, values, (err, results) => {
      if(err) {
        console.log(err);
        reject({ err })
      }else {
        // console.log(results); //talend tester api 확인용
        resolve(results);
      }
    })
  })
};

module.exports = {
  query
};