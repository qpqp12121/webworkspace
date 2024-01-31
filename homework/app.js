const express = require('express');
const app = express();
const mysql = require('./db.js');

//application/json
app.use(express.json());
//application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));


app.listen(3000, ()=> {
  console.log('Server Start, http://localhost:3000');
});

//1.전체조회 userList
app.get('/users', async(req, res) => {
  let list = await mysql.executeQuery('userList')
  res.json(list);
});

//2.단건조회 userInfo
app.get('/users/:no', async(req, res) => {
  let userNo = req.params.no;
  let info = (await mysql.executeQuery('userInfo', userNo))[0];
  res.json(info);
});

//3.등록 userInsert
app.post('/users', async(req, res) => {
  let data = req.body.param;
  let result = await mysql.executeQuery('userInsert', data);
  res.json(result);
});


//4.수정(pwd, name)
app.put('/users/:no', async(req, res) => {
  //let result = await updateAll(req); //1)userUpdateAll
  let result = await updateInfo(req); //2)userUpdateInfo
  res.json(result);
});
// ↓
//실행해야 되는 쿼리문 2개 => 각각 함수로

//1) userUpdateAll: 데이터 다 가져 옴(제한X)
async function updateAll(request){
  let data = [ selectedInfo(request.body.param), request.params.no ]; // [ set절, user_no 칼럼 ]
  let result = await mysql.executeQuery('userUpdateAll', data);
  return result;
}
//* 수정하지 않는 데이터 제거하고 -> 새로운 {} 생성 (변경할 필드 담은)
function selectedInfo(obj) {
  let delData = ["user_no", "user_id", "user_age", "join_date"];
  let newObj = {};
  let isTargeted = null;

  for(let field in obj) {
    isTargeted = false;
    for(let target of delData) {
      if(field == target) {
        isTargeted = true;
        break;
      }
    }
    if(!isTargeted) {
      newObj[field] = obj[field]; 
    }
  }
  return newObj;
};

//2) userUpdateInfo: 지정된 column만
async function updateInfo(request) {
  let data = [ ...getInfo(request.body.param), request.params.no ]; // [ user_pwd, user_name, user_no ]
  let result = await mysql.executeQuery('userUpdateInfo', data);
  return result;
}
//* 수정하지 않는 데이터 제거하고 -> 새로운 [] 생성 (변경할 값만 담은)
function getInfo(obj) {
  let getData = ["user_pwd", "user_name"];
  let newAry = [];
  
  for(let target of getData) {
    for(let field in obj) {
      if(field == target) {
        newAry.push(obj[field]);
        break;
      }
    }
  }
  return newAry;
}

//5.삭제 userDelete (단건조회 참고)
app.delete('/users/:no', async(req, res) => {
  let userNo = req.params.no;
  let user = (await mysql.executeQuery('userDelete', userNo))[0];
  res.json(user);
})