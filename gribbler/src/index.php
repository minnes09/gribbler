<?php

include_once 'gdbconfig.php';
session_start();

// code for checking login

	if(!isset($_SESSION["email_login"])){
		if (isset($_POST["email_login"]) && isset($_POST["password_login"])) {
			$email_login = $_POST["email_login"];
			$password_login = preg_replace('/[^!<>@&\/\sA-Za-z0-9_]/', '', $_POST["password_login"]);

			$password_login_md5 = md5($password_login);
			$sql = @mysql_query("SELECT id FROM users WHERE email='$email_login' AND password = '$password_login_md5'");
			$userCount = @mysql_num_rows($sql);
			if($userCount == 1) {
				while ($row = @mysql_fetch_array($sql)) {
					$id = $row["id"];
				}

				
				$_SESSION["email_login"] = $email_login;
				$sql2 = @mysql_query("SELECT id, username FROM users WHERE email='$email_login'");
				$row2 = @mysql_fetch_array($sql2);
				$username = $row2['username'];
				?><script>window.location.href='indexmap.html?log=success'; </script><?php
				exit();
			}

			else{
				?><script>window.location.href='index.php?log=failedlogin'; </script><?php
				exit();
			}
			
		}
	}
	else{ 

		?><script>window.location.href='indexmap.html?u=insession&&log=success'; </script><?php
				exit();
	}


// code for checking signup

	$reg= @$_POST['reg'];

	$em="";
	$pswd="";
	$u_check="";
	$sign_mess="";

	$em= strip_tags(@$_POST['email']);
	$pswd= strip_tags(@$_POST['password']);




if ($reg){

	if($em) {		

		$u_check = @mysql_query("SELECT email FROM users where email= '$em' ");
		$check = @mysql_num_rows($u_check);



		if($check == 0){

			if($em&&$pswd){			

				if($pswd){			

					
					if(strlen($pswd)>30||strlen($pswd)<6) {

						$sign_mess = 'password: between 6 & 30 characters';

					}	
					else {

						$email = filter_var($em, FILTER_SANITIZE_EMAIL);
						// Validate e-mail
						if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
							$sign_mess="Please enter a valid email address";
						}


							?>
							<div style="visibility:hidden;">
								<form id="dateForm" action="index.php" method="POST">
		    						<input type="email" name="email_login" value="<?php echo $em; ?>">
		    						<input type="password" name="password_login" value="<?php echo $pswd; ?>"></div>
		  						</form>
	  						</div>
							<?php 

						if($sign_mess==""){

									$em= @strtoupper($em);
									$pswd= @md5($pswd);


									$query= @mysql_query("INSERT INTO users (email, password) VALUES ('$em', '$pswd')");		?><script>document.getElementById('dateForm').submit();</script><?php
						}


					}

				}	

			}
			else{

				$sign_mess =  'Please fill in all the details!';

			}

		}
		else{

			$sign_mess =  'Sorry an account with that email already exists!';

		}

	}

}






?>
<html>
	<head>
		<meta charset=utf-8>
		<title>Gribbler | Map Generator</title>
		<style>
			body { margin: 0; }
			canvas { width: 100%; height: 100%; }
		</style>

		<link rel="stylesheet" type="text/css" href="style.css">
	</head>


	<body>

	<div align="center" class="wrapper">
		
		<h2>Gribbler</h2>

		<div id="logblock">
			<form action="" method="POST">
				<input class="inputbar" type="email" name="email_login" placeholder="Email"><br/>
				<input class="inputbar" type="password" name="password_login" placeholder="Password"><br/>
				<input class="buttonbar" type="submit" name="login" value="Login">
			</form>

			<div id="signit">
			   <p>Need an account? <a href="#" onclick="document.getElementById('signblock').style.display='block'; document.getElementById('logblock').style.display='none';">Signup</a></p>
			</div>
		</div>

		

		<div id="signblock">
			<form action="" method="POST">
				<input class="inputbar" type="email" name="email" placeholder="Email"><br/>
				<input class="inputbar" type="password" name="password" placeholder="Password"><br/>
				<input class="buttonbar" type="submit" name="reg" value="Signup">
			</form>

			<div id="signit">
			   <p>Have an account? <a href="#" onclick="document.getElementById('logblock').style.display='block'; document.getElementById('signblock').style.display='none'">Login</a></p>
			</div>
		</div>

	</div>

	</body>
</html>

