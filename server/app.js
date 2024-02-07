require('dotenv').config({ path: './db/dbSetting.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');

//미들웨어
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.listen(3000, ()=>{
    console.log('Server Start, http://localhost:3000');
});

//전체조회
app.get('/boards', async (req, res)=>{
    let list = await mysql.executeQuery('boardList');
    res.json(list);
})

//단건조회
app.get('/boards/:no', async (req, res) => {
    let boardNo = req.params.no;
    let info = (await mysql.executeQuery('boardInfo',boardNo))[0];
    res.json(info);
})

//등록
app.post('/boards', async (req, res)=>{
    let data = req.body.param;  
    let result = await mysql.executeQuery('boardInsert', data);
    res.json(result);
})

//수정
app.put('/boards/:no', async ( req, res ) => {
    let result = await updateAll(req);
    res.json(result);
});
async function updateAll(request){
    let data = [ selectedInfo(request.body.param), request.params.no ];
    let result = await mysql.executeQuery('boardUpdateAll', data);
    return result;
}
function selectedInfo(obj){ 
    let delData = ["no"];
    let newObj = {};
    let isTargeted = null;    
    for( let field in obj ){ 
        isTargeted = false;
        for(let target of delData){
            if(field == target) {
                isTargeted = true;
                break;
            }            
        }
        if(!isTargeted){
            newObj[field] = obj[field];
        }
    }
    return newObj;
};