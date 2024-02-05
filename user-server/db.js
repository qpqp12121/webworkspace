// db.js
const mysql = require('mysql');
const sql = require('./db/userSql.js');

console.dir(process.env); //값확인용

const connectionPool = mysql.createPool({
    // // host : '127.0.0.1',
    // port : '3306',
    // user : 'dev01',
    // password : '1234',
    // database : 'dev',
    // connectionLimit : 10,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    connectionLimit: process.env.MYSQL_CONNECT_LIMIT,
    debug : true //필수설정X
});

const executeQuery = async ( alias, values) => {
    return new Promise((resolve, reject) =>{
        let executeSql = sql[alias];
        connectionPool.query(executeSql, values, (err, results)=>{ //(미완성의 쿼리문, 거기들어갈 값들)
            if(err){
                reject({err});
            }else{
                resolve(results);
            }
        })
    })
}

module.exports = {
    executeQuery
}