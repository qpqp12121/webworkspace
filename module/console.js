const fs = require('fs'); //file system
const { Console } = require('console');

const output = fs.createWriteStream('./stdout.log'); //파일쓰기 가능하도록 스트림 생성
const errorOutput = fs.createWriteStream('./stderr.log'); // ( ./ 같은 경로 ../ 상위 )

const logger = new Console({ stdout: output, stderr: errorOutput}); //log남기는 객체를 logger라고 함

const msg = 'Log Writing';

logger.log('Result: %s', msg); //stdout (화면 아닌 별도의 파일에)=> terminal에는 안 나오고 별도의 파일 생성됨
logger.error(`Result: ${msg}`); //stderr에 log 남김

//서버 운영할 때 logger 중요하다는 것 인지하기

