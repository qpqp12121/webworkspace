//Router: 세분화 시켜 줌

const express = require('express'); //module로 구성하기 때문에 app.js랑 별개로 require해 줘야 됨
const router = express.Router();   //express를 통해서 진입 됨
                                  //=>서버실행시키는 listen 없음 Router자체만으로 실행 못 시킨다는 말

//user/
router.get('/', (req, res)=>{ //app.js랑 같은 경로에 같은 url인데 충돌되지 않는 이유
  res.send('회원정보조회');    //app.js에서 app.use('/user', userRouter); mapping시킴
})                            //그래서 여기선 /user가 빠지고 그 뒤에 실제 기능이 되는 서브메뉴부터 시작
                              //+ .get('/') app.js랑 같이 정의되어 있는데 http://localhost:3000/ 치면 app.js에 정의되어있는 게 실행됨
//user/insert
router.post('/insert', (req, res)=>{
  res.send('회원 등록');
})

//user/update
router.put('/update', (req, res)=>{
  res.send('회원 수정');
})

//user/delete
router.delete('/delete', (req, res)=>{
  res.send('회원 삭제');
})

module.exports = router; //router: 객체 => 그대로 export하면 됨