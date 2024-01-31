//customerSql.js
//198p

//*column 소문자로 쓰기
//mybatis는 값 작성 #으로 했는데 mysql은 "?" 로

//전체조회
let customerList =
`SELECT id
        , name
        , email
        , phone
        , address
  FROM customers`

//단건조회  
let customerInfo =
`SELECT id
        , name
        , email
        , phone
        , address
  FROM customers
  WHERE id = ?`
  
//등록
let customerInsert =
`INSERT INTO customers
SET ?` //객체이고 필드명 == 컬럼명 (반드시)

//수정 2가지
let customerUpdateAll = 
`UPDATE customers
SET ?
WHERE id = ?`; //배열[ 객체, 단일값 ] --물음표 개수가 배열 크기 (set 필드명 X => 객체)

let customerUpdateInfo = //모든 대상 아닌 특정 대상 명시해야 되는 경우
`UPDATE customers
SET email = ?, phone = ?, address = ?
WHERE id = ?`; //배열[ 단일값, 단일값, 단일값, 단일값 ]




module.exports = {
  customerList,
  customerInfo,
  customerInsert,
  customerUpdateAll,
  customerUpdateInfo
}
