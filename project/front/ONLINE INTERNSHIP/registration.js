$(document).ready(function () {
	loading();
	$("#register").on('click', function () {
		var one = $("#1").val();
        var two = $("#2").val();
		var three = $("#3").val();
		var four = $("#4").val();
		var five = $("#5").val();
		var six = $("#6").val();
		var seven = $("#7").val();
		var eight = $("#8").val();
		var nine = $("#9").val();
		var ten = $("#10").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_student/" + one + "/" + two+ "/" + three+ "/" + four+ "/" + five+ "/" + six+ "/" + seven+ "/" + eight+ "/" + nine+ "/" + ten
        }).done(function (data) {
            $("#1").val("");
          $("#2").val("");
		  $("#3").val("");
		 $("#4").val("");
		  $("#5").val("");
		  $("#6").val("");
		  $("#7").val("");
		  $("#8").val("");
		  $("#9").val("");
		  $("#10").val("");
			alert(data);
			loading();
            
        });
    });
	
	
	
function getStudents(){
	var html='';
	const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id')
		
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/get_student/"+id
	}).done(function (data) {
		
		
	   for(var i=0;i<data.length;i++){
		   var row=data[i];
		   $("#1").val(row[2]);
		   $("#2").val(row[3]);
		   $("#3").val(row[4]);
		   $("#4").val(row[5]);
		   $("#5").val(row[9]);
		   
		   $("#update_status").on('click', function () {
			var one = $("#6").val();
		   
			
			$.ajax({
				type: "GET",
				url: "http://localhost:8080/api/update_status/" + row[10]+"/"+one
			}).done(function (data) {
			  
			  $("#6").val("");
			 
				alert(data);
				loading();
				
			});
		});
	   
	   }
		
		
		
	});
}


function loading(){
	
	getStudents();
}});