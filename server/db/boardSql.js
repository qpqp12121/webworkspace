//전체조회
let boardList =
`SELECT b.no
      , b.title
      , b.writer
      , b.created_date
      , count(c.bno) as comment_cnt
FROM t_board_board b
  LEFT OUTER JOIN t_comment_board c
  ON b.no = c.bno
GROUP BY b.no
ORDER BY b.no`

//단건조회
let boardInfo =
`SELECT no
      , created_date
      , writer
      , title
      , content
FROM t_board_board
WHERE no = ?`

//댓글목록
let commentList =
`SELECT content
      , writer
      , DATE_FORMAT(created_date, '%Y-%m-%d') as created_date
FROM t_comment_board
WHERE bno = ?`

//등록
let boardInsert =
`INSERT t_board_board
SET ?`

//수정
let boardUpdateAll =
`UPDATE t_board_board
SET ?
WHERE no = ?`

module.exports = {
  boardList,
  boardInfo,
  commentList,
  boardInsert,
  boardUpdateAll
}