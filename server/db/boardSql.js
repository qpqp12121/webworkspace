//boardSql.js

//전체조회
let boardList =
`SELECT no
        , title
        , writer
        , DATE_FORMAT(created_date, '%Y-%m-%d') as created_date
  FROM t_board_board
  ORDER BY no`  

//단건조회  
let boardInfo =
`SELECT no
        , created_date
        , writer
        , title
        , content
  FROM t_board_board
  WHERE no = ?`
  
//등록
let boardInsert =
`INSERT INTO t_board_board
SET ?`

//수정 2가지
let boardUpdateAll = 
`UPDATE t_board_board
SET ?
WHERE no = ?`


module.exports = {
  boardList,
  boardInfo,
  boardInsert,
  boardUpdateAll
}