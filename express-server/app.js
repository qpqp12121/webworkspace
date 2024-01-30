//REST API 103p (기본적인 기능-조회,등록,수정,삭제)
//필요에 따라 QueryString사용하는 경우 有 (들어오는 데이터가 유동적일 때)

const fs = require('fs');
const express = require('express'); //express는 하나의 모듈로 인식하여 얘만 등록해도 파일 찾아감
const userRouter = require('./user.js'); //근데 우리가 따로 등록한 router는 파일로 인식하여 경로 찾아가 불러오기
const app = express(); //서버 관리하는 객체




//미들웨어(listen 전에 작성하는 거 권장, 모아놓기)
//--Request Data Process

//각각 등록해야 됨(순서는 상관X 전역이라)

//application/json
app.use(express.json({ //client가 보내온 데이터에 대한 처리를 등록하는 것
  limit: '50mb' 
}))

//검색기능
//QueryString Content-Type
//application/x-www-form-urlencoded ->여기에 대해 parsing하는
app.use(express.urlencoded({extended: false})) //->기본기능만할거라 false로 했음

//Error
//1.직접 등록
app.unsubscribe(function(err, req, res, next){
  console.log(err);
  res.status(500).json({statusCode: res.statusCode, errMessage: err.message}); //response가 가진 상태를 강제로 변경하는 것
});
app.get('/customErr', (req, res, next)=>{ 
  next(new Error('Process Fail! Check Data!')); //next()함수사용해서 에러처리 핸들러로 에러 전달
})

//static
app.use(express.static('./files')); //절대경로에 mapping localhost:3000/apple.jpg --파일이름을 경로로
app.use('/public', express.static('./files'));

//2.내장된 error handler 호출 
app.get('/defaultErr', (req, res)=>{ //500 //404: /err(없는경로)
  throw new Error('기본 핸들러 동작');
});


//Data Loading
const jsonFile = fs.readFileSync('./db.json'); //실제DB는 비동기로 하는 게 맞는데 우리는 작은 파일 사용하니 sync기반으로 함
                                                //비동기로 하면 아래 jsonData 결과 나온다는 것 보장 못 해서 
const jsonData = JSON.parse(jsonFile);//↔JSON.stringify --우리가 가진 데이터를 json타입으로 보낼 때

//여기선 변수jsonData)가 db -- db접속하는 쿼리문 (라우팅이 복잡하고 길다면 따로 함수로 만듦)-원래 라우팅 아래처럼 간단명확해야 됨
const getData = (target, where)=>{
  let data = jsonData[target]; //"객체[필드]" 접근//db.json파일의 데이터가 배열도 있고 객체도 있으니
  if(Array.isArray(data)){  //데이터가 배열이면 
    let list = data;
    for(let obj of list){
      if(obj.id == where){
        data = obj;
      }
    }
  }
  return data; //배열아니면 원래 데이터 반환
};

//user.js의 경로 mapping(위에서 정의하기 require())
app.use('/user', userRouter);

app.listen(3000, ()=>{ //listen(): 서버실행 명령어 (이 프로젝트 안에서 한 번만 사용)
  console.log('http://localhost:3000');
});

//라우팅 (listen이 관리하는 대상)
app.get('/', (req, res)=>{ //get방식으로 동작하는 경우 아래 callback동작함
  res.send('Hello, Express.js World'); 
})

//1.< posts >
//전체조회
app.get('/posts', (req, res)=>{   //- 라우팅 간단명확해야 됨
  let data = getData('posts');    //자원요청
  res.json(data); //or res.send() //사용자에게
});

//단건조회
app.get('/posts/:id', (req, res)=>{  
  let postId = req.params.id;//콜론(=변수) 사용하면 params에 해당 필드 들어감(id)
  let data = getData('posts', postId);
  res.json(data);
});

//2.< comments >
//전체조회
app.get('/comments', (req, res)=>{
  let data = getData('comments');
  res.json(data);
});
//단건조회
app.get('/comments/:id', (req, res)=>{
  let commentsId = req.params.id;
  let data = getData('comments', commentsId);
  res.json(data);
});

//3.< profile >
//조회
app.get('/profile', (req, res)=>{
  let data = getData('profile');
  res.json(data);
});

///////////////////////////////////////////////////////////////

//등록
app.post('/posts', (req, res)=>{
  let data = req.body; //post방식이니 req의 body필드에 꼭 접근
  console.log('등록', data);
  res.json(data);
});
//수정
app.put('/posts/:id', (req, res)=>{
  let postId = req.params.id; //단건조회처럼 경로에서 값을 가져오고
  let data = req.body;        //수정하고자 하는 건 body에 있으니 둘 다 접근(body 배열임)-특정값 원하면 인덱스,필드명으로 접근 가능
  console.log('수정', postId, data);
  res.json({id: postId, data}); //여러 개의 값 보낼 때 객체형태 or 배열형태도 묶어 보내기
});
//삭제
app.delete('/posts/:id', (req,res)=>{
  let postId = req.params.id;
  console.log('삭제', postId);
  res.sendStatus(203); //삭제하고 상태코드 보내는 방법도O
})

//*검색기능: QueryString사용 고려
//보내는 대상이 완전 달라도 라우팅에서 처리할 수 O (유연하게 데이터 대응 가능한 건 queryString, body)--param은XX
app.get('/search', (req, res)=>{
  let keywards = req.query; //값 받기(객체타입임)--내부에 들어가는 키 제한적이지 않다는 말(1개일수도2개..)
  console.log('검색조건 구성', keywards);
  res.json(keywards);
});


