require('dotenv').config({path: './db/dbSetting.env'});
const express = require('express');
const app = express();
const mysql = require('./db.js');


//< MiddleWare > - 전역등록
//application/json
app.use(express.json());
//application/x-www-form-urlencoded 
app.use(express.urlencoded({extended: false}));


//< 서버실행 >
app.listen(3000, () => {
  console.log('Server Start.\nhttp://localhost:3000');
});


//< routing >
//1)전체조회
app.get('/users', async(req, res) => {
  let list = await mysql.query('userList');
  res.json(list);
});

//2)단건조회
app.get('/users/:id', async(req, res) => {
  let userId = req.params.id;
  let info = (await mysql.query('userInfo', userId))[0];
  res.json(info);
});

//3)등록
app.post('/users', async(req, res) => {
  let data = req.body.param;
  let newUser = await mysql.query('userInsert', data);
  res.json(newUser);
});

//4)수정
//4-1) updateAll
app.put('/users/:id', async(req, res) => {
  let data = [ selectedInfo(req.body.param), req.params.id ]; // [객체, 단일값]
  let result = await mysql.query('userUpdateAll', data);
  res.json(updateInfo);
});

//전체정보에서 -> 변경할 필드만 담은 새로운 객체 생성 함수
function selectedInfo(obj) {
  let delData = ["user_no", "user_id"];
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


//4-2) updateInfo
app.put('/users/:id', async function(req, res) {
  let data = [ ...getInfo(req.body.param), req.params.id ];
  let result = await mysql.query('userUpdateInfo', data);
  res.json(result);
});

//수정가능한 필드 지정 함수
function getInfo(obj) {
  let getData = ["user_name", "user_gender", "user_age"]; //해당 필드의 값만 필요
  let newAry = [];

  for(let target of getData) { //값 들어가는 순서 뒤바뀌지 않도록 배열이 기준이 되어 먼저 for문 돌기
    for(let field in obj) {
      if(field == target) {
        newAry.push(obj[field]);
        break;
      }
    }
  } 
  return newAry;
};


//5)삭제
app.delete('/users/:id', async(req, res) => {
  let userId = req.params.id;
  let delInfo = await mysql.query('userDelete', userId);
  res.json(delInfo);
});