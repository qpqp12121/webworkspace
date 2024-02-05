require('dotenv').config({ path: './db/dbSetting.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');

// application/json
app.use(express.json());
// application/x-www-form-urlencoded (카테고리,다중조건에서 사용하기도)
app.use(express.urlencoded({extended : false}));

app.listen(3000, ()=>{
    console.log('Server Start, http://localhost:3000');
});

app.get('/users', async (req, res)=>{
    let list = await mysql.executeQuery('userList');
    res.json(list);
})

app.get('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let info = (await mysql.executeQuery('userInfo',userId))[0]; //*단건조회 꼭 제한 걸기
    res.json(info);
})

app.post('/users', async (req, res)=>{
    let data = req.body.param;  
    let result = await mysql.executeQuery('userInsert', data);
    res.json(result);
})

app.put('/users/:id', async ( req, res ) => {
    let result = await updateAll(req);
    res.json(result);
});

async function updateAll(request){
    let data = [ selectedInfo(request.body.param), request.params.id ]; // set절, user_id컬럼
    let result = await mysql.executeQuery('userUpdateAll', data);
    return result;
}

//+selectedInfo(), getInfo()는 서버측말고 화면에서 제어하는 상황있을 수도 있다 
//변경되면 안 되는 필드 제거!(set절로 넘어가면XX)
function selectedInfo(obj){ 
    let delData = ["user_id", "user_no"]; //user_no은 크게 의미있지 않아 안 넣어도 되긴 함
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

async function updateInfo(request){
    let data = [ ...getInfo(request.body.param) , request.params.id]; // 컬럼 : user_name, user_gender, user_age
    let result = await mysql.executeQuery('userUpdateInfo', data);
    return result;
}


function getInfo(obj){
    let getData = ["user_name", "user_gender", "user_age"]; //있어야 되는 필드
    let newAry = []; 
    for(let target of getData){
        for(let field in obj ){        
            if(field == target) {
                newAry.push(obj[field]);
                break;
            }            
        }
    }
    return newAry; 
};

app.delete('/users/:id', async (req, res) => {
    let userId = req.params.id;
    let result = await mysql.executeQuery('userDelete',userId);
    res.json(result);
})