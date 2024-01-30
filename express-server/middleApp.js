const express = require('express');
const session = require('express-session');//미들웨어모듈 필요한 건 따로 설치해야 됨
const cors = require('cors');
const app = express();

//Content-Type
//1.application/x-www-form-urlencoded
const defaultParser = express.urlencoded({extended: false}); //내장하고 있는 urlencoded 기반으로 일반적인 기능만 사용할 거라 확장X
//2.application/json
const jsonParser = express.json();

//<미들웨어 등록>
//전체 라우터 적용
//app.use(defaultParser).use(jsonParser);
app.use(jsonParser);

//특정 라우터 적용
//defaultParser: req가 parsing할 때 보조기능
app.get('/search', defaultParser, (req, res)=>{  //http://localhost:5000/search?keyword=First
  let data = req.query.keyword; //get메서드는 query에 (keyword 아직 정의된 거 없어서 처음에 undefined 뜨는 거)
  res.send(data + ', 검색결과'); 
});
//접근: /search?keyword=${value}

app.post('/info', defaultParser, (req, res)=>{
  let data = req.body.name; //post, put메서드는 데이터 body에
  res.send('welcome, ' + data);
});
// /info => method:post, body:name=${value}

app.post('/message', (req, res)=>{ //defaultParser가 빠져있으니 위에 jsonParser가 들어와서 사용 됨
  let data = req.body.param;       //json은 body밖에 안 됨 (query는 위 두 방식 다 대응가능)
  res.send(data.title + ', ' + data.content);
});
//24.01.30메모장참고
// /message => method:post, body: {"param": {"title": "", "content": ""}}

app.listen(5000, ()=>{
  console.log('Server Start');
});

let sessionSetting = session({
  //session options
  secret: 'Have$A!@Nice_day', //이렇게 하드코딩하지 X (환경변수를통해넘김)--실제로 보안과 관련된 정보는 따로 관리함 (&서버별로 달라야 함)
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60000 //milliseconds
  }
});

app.use(sessionSetting); //express에게 알려줘 사용가능하도록 해 줌(=서버에넘김)


//< CORS >
const corsOptions = {
  origin: 'http://127.0.0.1:5500', //index.html오류에서 origin 복사했음
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); //서로 다른 server에서 cors 작동해서 index.html 만들었음(live server로 확인)


//< Routing > --아래에 있어야 위 cors 실행 됨(CORS 적용되고 routing되어야)
//위에서 전역으로 사용가능하도록 app.use(jsonParser); json만 해놨으니 json타입 객체형태로
//query로 하고 싶으면 defaultParser 따로 불러야 됨
app.get('/', (req, res) => {
  res.json(req.session);
});

//session활용하는 login,logout 상황 가정하여 routing
app.post('/login', (req, res)=>{
  const{ id, pwd } = req.body; //->객체distructing{"id": " ", "pwd": " "}
  if(!req.session.isLogin){    // 세션정상동작한 것(localhost:5000/ 직접 쳐서 확인 가능)talend tester가 redirect못 해서 302오류났는데
    req.session.user = id;
    req.session.isLogin = true; 
  }
  req.session.save((err)=>{ //변경되지 않은 것 자동저장 위에 설정에서 resave: false로 막았기 때문에 저장코드 작성해야 됨
    if(err) throw err;
    res.redirect('/');
  });
});

app.get('/logout', (req, res)=>{
  req.session.destroy();
  res.redirect('/');
});

