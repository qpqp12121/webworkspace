//Crypto: 암호화 기능 (단방향/양방향)

const crypto = require('crypto'); //module불러오는 형태로 사용
const data = 'pw1234';

//1.기본 암호화
let encData = crypto.createHash('sha512')
                    .update(data) //암호화할 문자열 전달
                    .digest('base64'); //어떤 인코딩 방식으로 암호화된 문자열을 표시할지 매개변수로 전달
                  //.disgest('hex'); //좀 더 길게 암호화

console.log(data, encData);


//2.salting 암호화: 원본 값 알아내기 귀찮게 하는(강화)
const createSalt = ()=>{
  return new Promise((resolve,reject)=>{
    crypto.randomBytes(64, (err, buf)=>{ //무작위 값들로 salting할 수 있도록 randomBytes(몇번돌림, function(){} )사용
      if(err) reject(err);                //buf가 값 가지고 있음
      resolve(buf.toString('base64'));   //그걸 몇자리로 표시할 건지 문자열로 변환
    });
  })
};

const createCryptoPassword =
 async(plainPassword)=>{ //매개변수
  const salt = await createSalt();

  return new Promise((resolve, reject)=>{
    //원데이터, salt, 반복횟수, 출력될 바이트 수, 알고리즘
    crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key)=>{ 
      if(err) reject(err);
      resolve({password: key.toString('base64'), salt})          
    });
  })
 };
//return값이 Promise라 async, await 사용해야 결과출력 처리된 후 실행 됨
const cryptoPassword = async()=>{
  encData = await createCryptoPassword(data); //매개변수
  console.log(encData);
}
cryptoPassword();

//위와 같은 형태(.then이 결과 다 나온 후 되는 거니까 그냥 이렇게 써도 되고)
createCryptoPassword(data) //매개변수
.then(result => console.log(result))
.catch(err => console.log(err));