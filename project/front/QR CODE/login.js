$(document).ready(function () {
	
    $("#login").on('click', function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/login/" + username + "/" + password
        }).done(function (data) {
           
			if(data=='admin'){
				 console.log(data);
				window.location = "/admin-home.html";
			}else if(data=='Invalid'){
				alert('Invalid username please enter valid username and password')	
			}else{
				window.location.href = "/2020/AGSC/QR CODE/student-home.html?"+data;
			}
            
        });
    })
});