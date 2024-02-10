//boardSql.js

//전체조회
let boardList =
// `SELECT no
//         ,title
//         ,writer
//         ,DATE_FORMAT(created_date, '%Y-%m-%d') as created_date
// FROM t_board_board
// ORDER BY no` 
`SELECT b.no
		    ,b.title
        ,b.writer
        ,DATE_FORMAT(b.created_date, '%Y-%m-%d') as created_date
		    ,count(c.bno) comment_cnt
FROM t_board_board b
	LEFT OUTER JOIN t_comment_board c
	ON b.no = c.bno
GROUP BY b.no    
ORDER BY b.no`


//단건조회  
let boardInfo =
`SELECT no
        ,created_date
        ,writer
        ,title
        ,content
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


//댓글목록
let commentList = 
`SELECT c.content
		    ,c.writer
        ,DATE_FORMAT(c.created_date, '%Y-%m-%d') as created_date
FROM t_comment_board c
	INNER JOIN t_board_board b
  ON c.bno = b.no
WHERE bno = ?`


module.exports = {
  boardList,
  boardInfo,
  boardInsert,
  boardUpdateAll,
  commentList
}