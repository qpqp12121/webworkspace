require('dotenv').config({path: './db/dbSetting.env'});
const express = require('express');
const app = express();
const mysql = require('./db.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(3000, () => {
  console.log('Server Start\nhttp://localhost:3000');
});

//전체조회
app.get('/boards', async(req, res) => {
  let list = await mysql.query('boardList');
  res.json(list);
});

//단건조회
app.get('/boards/:no', async(req, res) => {
  let boardNo = req.params.no;
  let info = (await mysql.query('boardInfo', boardNo))[0];
  res.json(info);
});

//댓글목록
app.get('/comments/:bno', async(req, res) => {
  let bno = req.params.bno;
  let list = await mysql.query('commentList', bno);
  res.json(list);
});

//등록
app.post('/boards', async(req, res) => {
  let data = req.body.param;
  let result = await mysql.query('boardInsert', data);
  res.json(result);
});


//수정
app.put('/boards/:no', async(req, res) => {
  let data = [ selectedInfo(req.body.param), req.params.no ];
  let result = await mysql.query('boardUpdateAll', data);
  res.json(result);
})

//전체정보에서 -> 변경할 필드만 담은 새로운 객체 생성 함수
function selectedInfo(obj) {
  let delData = ['no'];
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