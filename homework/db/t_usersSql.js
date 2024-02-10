//t_usersSql.js

//전체조회
let userList =
        `SELECT user_no
        ,user_id
        ,user_pwd
        ,user_name
        ,user_gender
        ,user_age
        ,join_date
FROM t_users`

//단건조회
let userInfo =
        `SELECT user_no
        ,user_id
        ,user_pwd
        ,user_name
        ,user_gender
        ,user_age
        ,DATE_FORMAT(join_date, '%Y-%m-%d') as join_date
FROM t_users
WHERE user_id = ?`

//등록
let userInsert =
`INSERT t_users
SET ?`

//수정
//1) [ 객체, 단일값 ]
let userUpdateAll =
`UPDATE t_users
SET ?
WHERE user_id = ?`
//2) [ 단일값, 단일값, 단일값, 단일값 ]
let userUpdateInfo =
`UPDATE t_users
SET user_name = ?, user_gender = ?, user_age = ?
WHERE user_id = ?`

//삭제
let userDelete =
`Delete FROM t_users
WHERE user_id = ?`


module.exports = {
  userList: userList,
  userInfo: userInfo,
  userInsert,
  userUpdateAll,
  userUpdateInfo,
  userDelete
};