//t_userSql.js

//전체조회
let userList =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , join_date
FROM t_users`

//단건조회
let userInfo =
`SELECT user_no
        , user_id
        , user_pwd
        , user_name
        , user_gender
        , user_age
        , DATE_FORMAT(join_date, '%Y-%m-%d') as join_date
FROM t_users
WHERE user_no = ?`

//등록
let userInsert =
`INSERT INTO t_users
SET ?`

//수정
let userUpdateAll =
`UPDATE t_users
SET ?
WHERE user_no = ?`

let userUpdateInfo =
`UPDATE t_users
SET user_pwd = ?, user_name = ?
WHERE user_no = ?`

let userDelete =
`DELETE
FROM t_users
WHERE user_no = ?`

module.exports = {
  userList,
  userInfo,
  userInsert,
  userUpdateAll,
  userUpdateInfo,
  userDelete
};