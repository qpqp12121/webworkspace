const multer = require('multer');
const express = require('express');
const app = express();

const storage = multer.diskStorage({ //저장소setting
  destination: function(req, file, cb){ //저장경로
    cb(null, 'files/');                 //콜백에 넣음
  },
  filename: function(req, file, cb){
    let rename = (new Date()).getMilliseconds() + file.originalname; //충돌방지로 rename(꼭시간안해도됨)
    cb(null, rename);
  }
});

const upload = multer({storage: storage}); //바로 .use로 받는 게 아니라 먼저 객체형태로 변환
const staticUrl = '/images';
app.use(staticUrl, express.static('files')); //업로드 진행할 곳을 mapping해놓고

app.post('/profile', upload.single('avatar'), (req, res)=> {
  //<img src=""> -> src 속성이 가져야하는 경로 반환
  let imgUrl = `${staticUrl}\/${req.file.filename}`; //filename은 multer가 rename한 이름 넘어올 거임
  res.send(imgUrl);
});

app.post('/photos', upload.array('list'), (req, res)=> { //.array('list')--'구분하는 식별자로 아무거나' --*form태그의 name에 들어갈 것!
  //<img src=""> -> src 속성이 가져야하는 경로 반환
  let imgUrlList = [];
  for(let file of req.files){
    let imgUrl = `${staticUrl}\/${file.filename}`; //개별개별 경로 생성하고 배열에 넣어줘야 됨
    imgUrlList.push(imgUrl)
  }
    res.send(imgUrlList);
});

app.listen(4000, ()=> {
  console.log('Server Start: multer');
});