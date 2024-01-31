CREATE TABLE `t_users`( 
	`user_no` INT AUTO_INCREMENT,
    `user_id` VARCHAR(100) NOT NULL,
    `user_pwd` VARCHAR(100) NOT NULL,
    `user_name` VARCHAR(100) NOT NULL,
    `user_gender` CHAR(1) CHECK(user_gender IN ('M', 'F')),
    `user_age` INT,
    `join_date` DATE,
    PRIMARY KEY(`user_no`)
);