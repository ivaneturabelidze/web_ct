<?php
include('api/start.php');
$array=array();
if(empty($_POST)){
	exit;
}

if($_POST['person'] ==1){
$message=" Private Person "."\n";
}else if($_POST['person'] ==2){
$message="Travel Company, or Corporate"."\n";
}
if($_POST['gender'] ==1){
$message .="Mr"."\n";
}else if($_POST['gender'] ==2){
$message .="MRS"."\n";
}

$message .="Name: ".$_POST['name']."\n";
$message .="Surname: ".$_POST['surname']."\n";
$message .="E-mail: ".$_POST['email']."\n";
$message .="Country: ".$_POST['country']."\n";
$message .="Phone: ".$_POST['phone']."\n";
if(!empty($_POST['company'] )){
$message .="Company: ".$_POST['company']."\n";
}
if(!empty($_POST['position'] )){
$message .="Position: ".$_POST['position']."\n";
}
$message .="Tour Name: ".$_POST['tourname']."\n";
$message .="Code: ".$_POST['code']."\n";
$message .="Approximate Period Of Visit: ".implode(', ',$_POST['month'])."\n";
$message .="Total Number Of Visitors: ".$_POST['visitor_count']."\n";
$message .="Description: ".$_POST['description']."\n";
$message .="Exact Date Of Arrival: ".$_POST['day']."/".$_POST['monthone']."/".$_POST['year']."\n";

if($_POST['star'] > 0){
$message .="Accommodation Category: ".$_POST['star']."  star"."\n";
}else{
$message .="Accommodation Category: Don’t need"."\n";
}
if(!empty($_POST['staraccommodation'] )){
$message .="Accommodation Category Notes: ".$_POST['staraccommodation']."\n";
}

if($_POST['plan'] == 0){
$message .="Catering Plan: Don’t need"."\n";
}else{
$message .="Catering Plan: ".$_POST['plan']."  star"."\n";
}

if(!empty($_POST['plannote'] )){
$message .="Catering Plan Notes: ".$_POST['plannote']."\n";
}

if(!empty($_POST['package'] )){
$message .="All services as for full package tour (Recommended): ".$_POST['package']."\n";
}
if(!empty($_POST['exclude'] )){
$message .="Following services mentioned in the box: ".$_POST['exclude']."\n";
}

if(!empty($_POST['excludenote'] )){
$message .="Following services mentioned in the box Notes: ".$_POST['excludenote']."\n";
}




 $mail = new Mail('phpmailer');
			$mail->parameter = '';

			$mail->smtp_hostname ='mail.proservice.ge';
			$mail->smtp_username ='vacancy@proservice.ge';
			$mail->smtp_password = 'proservice2023';
			$mail->smtp_port = 587;
			$mail->smtp_timeout = 5;

			$mail->setTo('georgia@caucasustravel.com');
			$mail->setFrom('vacancy@proservice.ge');
			$mail->setReplyTo('vacancy@proservice.ge');
			$mail->setSender(html_entity_decode('caucasustravel.com', ENT_QUOTES, 'UTF-8'));
			$mail->setSubject(html_entity_decode('Tour Request ', ENT_QUOTES, 'UTF-8'));
			$mail->setText($message);

            $mail->send();

$mail->setTo('georgia@caucasustravel.com');
$mail->send();

$mail->setTo('aleko@proservice.ge');
$mail->send();

 $mail->setTo('al.vachadze@gmail.com');
 $mail->send();

//$array['post']=$_POST;
$array['success']=1;

header('Content-type: application/json');
echo json_encode($array);
?>
