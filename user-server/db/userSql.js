
let userList =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users`;

let userInfo =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users
WHERE user_id = ?`; 
// 1) 배열인지 아닌지 : 물음표 갯수
// 2) ? 별로 객체타입인지 아닌지 : 어느 컬럼에 들어가는 값인지 구분 가능여부

let userInsert = 
`INSERT INTO t_users
SET ?`; // 객체, 필드명 == 컬럼명  (mysql에선 insert문 set절 多)

let userUpdateAll = 
`UPDATE t_users
SET ?
WHERE user_id = ?`; // 배열[ 객체 , 단일값 ]

let userUpdateInfo = 
`UPDATE t_users
SET user_name = ?, user_gender = ?, user_age =?
WHERE user_id = ?`; // 배열[ 단일값, 단일값, 단일값, 단일값 ]

let userDelete =
`DELETE FROM t_users
WHERE user_id = ?`;

module.exports = {
    userList,
    userInfo,
    userInsert,
    userUpdateAll,
    userUpdateInfo,
    userDelete
}