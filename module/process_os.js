//module을 로드하는 코드는 무조건 제일 위에 작성하길 권장(사용하는 위치 상관없이)
const process = require('process');
const os = require('os');

console.log(process.env);
console.log('=====================================================');
console.log(os.cpus());
console.log(os.tmpdir());