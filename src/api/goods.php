<?php
	include 'connect.php';
	
	$id = isset($_GET['id']) ? $_GET['id'] : '';

	$sql = 'select * from goods where id='. $id;


	// 获取查询结果
	$result = $conn->query($sql);

	// 使用查询结果集
	$row = $result->fetch_assoc();
	
	//释放查询结果集
    $result->close();

    //把结果输出到前台
    echo json_encode($row,JSON_UNESCAPED_UNICODE);


	// 释放查询内存(销毁)
	//$result->free();

	//关闭连接
	$conn->close();
?>