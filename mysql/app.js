//서버실행 파일
const express = require('express');
const app = express();
const mysql = require('./db.js'); //자원 db.js가 들고있으니 불러오기
//위 이용해서 mysql.executeQuery() 실행 --db.js에서 export한 sql문 실행 함수 사용할 거임

//! listen기준으로 위쪽은 middleware / 아래쪽은 routing 작성했음


//< middleware > 등록 use() -전역사용
//application/json
app.use(express.json()); //미들웨어이지만 express에 내장되어 있어 설치X //+app.use(function(req,res,next) {}); //직접만드는미들웨어
//application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false})); //queryString형태 대응 (많이 사용하진 않지만 검색 등 사용)

//< listen >
app.listen(3000, ()=>{
  console.log('Server Start, http://localhost:3000');
});

//< routing >
//전체조회 customerList
app.get('/customers', async(req, res)=>{
  //executeQuery return이 promise긴 하지만
  //1.데이터가 들어오고 -> 2.응답하는. 동기적으로 실행되어야 되니 then 사용하든가 async 사용하든가 해야 됨
  let list = await mysql.executeQuery('customerList') //실제 sql문 가지고 있는 파일 타고 가보기(db.js파일에서 const sql = require('./db/customerSql.js'); 확인하고 저 파일로 가서 sql문 참고)
  res.json(list);             // ↑ module.exports객체의 필드명이니 문자열로                               
});

//단건조회 customerInfo
app.get('/customers/:id', async(req, res) => { //똑같은 자원이라 하더라도 누구를 받을 건지 작성(경로에 값 붙여서-변수명은 id아니고 마음대로 해도 됨)
  let customerId = req.params.id;  //데이터 가져와야 되니까 async // :id --변수명
  let info = (await mysql.executeQuery('customerInfo', customerId))[0]; //select문 무조건 배열로 넘어와서 await한 결과를 그대로 감싸고 [0] 인덱스 값 반환(따로 지정해줘야됨)
  // let info = await mysql.executeQuery('customerInfo', customerId);
  // info = info[0]; //위랑 같음(근데 변수 무분별하게 만드는 것 좋지X => 위 코드처럼 한 줄로 多)
  res.json(info);
});

//등록 customerInsert(메모장확인)
app.post('/customers', async(req, res) => { 
  let data = req.body.param; //let data = {}; 객체
  let result = await mysql.executeQuery('customerInsert', data);
  res.json(result);                               
});

//수정 1.customerUpdateAll & 2.customerUpdateInfo
//실행해야 되는 쿼리문 2개니 각각 함수로 
app.put('/customers/:id', async(req, res) => {
  //let result = await updateAll(req); //1.customerUpdateAll
  let result = await updateInfo(req); //2.customerUpdateInfo
  res.json(result);
});

//1.customerUpdateAll (넘어오는 값 다)
async function updateAll(request){
  let data = [ selectedInfo(request.body.param), request.params.id ]; // [ set절, id칼럼 ]
  let result = await mysql.executeQuery('customerUpdateAll', data);
  return result;
}//selectedInfo(request.body.param) 함수 거쳐서 제거될 대상은 제거한 값으로

//* 수정하지 않는 데이터 제거 후 -> 변경할 필드만 담은 새로운 { } 생성하기 
//(수정하지 않는 데이터 분리가 안 되니 데이터 통신하기 전에 제거하는 코드 작성)
function selectedInfo(obj){
  //내가 빼고자 하는 대상/필요한 필드만 복사해서 새로운 객체로 만듦 (+배열은 특정값 제거 splice() )
  let delData = ["id", "email"]; //수정하지 않을 대상을 배열로 만들어 놓고
  let newObj = {};  //*객체로 값 꼭 넘겨야 됨
  let isTargeted = null;
  for(let field in obj){ //field: id, name, email, phone, address
    isTargeted = false;  //field하나를 기준으로 해서 delData의 대상에 해당하는 지 안쪽 for문 돌리면서 전체를 확인
    for(let target of delData){
      if(field == target){  //한 번이라도 일치하면 break
        isTargeted = true;
        break;
      }
    }
    if(!isTargeted){
      newObj[field] = obj[field];  //실제로 수정하고자 하는 대상-> 새로운 배열에 복사
    }
  }
  return newObj;
}

//2.customerUpdateInfo (지정된 컬럼만 값을 가질 수 있도록 처리)
//update라 배열인 건 같음(where절의 값과, set 수정하는 값 최소 두 개 이상이니)
//똑같이 배열이지만 물음표 개수만큼 단일값을 요구 함
//client가 넘기는 값은 위랑 같음 --그 중에 서버에서 걸러내는 것
async function updateInfo(request){
  let data = [ ...getInfo(request.body.param), request.params.id ]; // [ email, phone, address, id ]
  let result = await mysql.executeQuery('customerUpdateInfo', data);
  return result;
}

function getInfo(obj){
  let getData = ["email", "phone", "address"]; //필드 아닌 값만 필요함 =>기준이 되는 게 객체X "배열"(각 인덱스별로 어느 컬럼 들어갈 건지 정해져있으니)
  let newAry = [];
  for(let target of getData){ //그래서 배열이 기준이 되어 먼저 for문 (아니면 값 들어가는 순서 뒤바뀔 수 있다)
    for(let field in obj){
      if(field == target){
        newAry.push(obj[field]); //객체에 있는 key 찾아서 '값'이 있으면 push (뒤에 추가되니 순서대로 될 것)
        break;
      }
    }
  }
  return newAry; //펼침연산자 사용하려고 반환 배열로(함수에서)
  //["hkhong@email.com", "010-1234-1234", null]
}

//삭제(단건조회참고)