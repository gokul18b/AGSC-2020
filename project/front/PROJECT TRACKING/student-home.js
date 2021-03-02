$(document).ready(function () {
	loading();
	$("#tab1").on('click', function () {
		$("#content1").show();
		$("#content2").hide();
		$("#content3").hide();
		$("#content4").hide();
	});
	$("#tab2").on('click', function () {
		$("#content2").show();
		$("#content1").hide();
		$("#content3").hide();
		$("#content4").hide();
	});
	$("#tab3").on('click', function () {
		$("#content3").show();
		$("#content2").hide();
		$("#content1").hide();
		$("#content4").hide();
	});
	$("#tab4").on('click', function () {
		$("#content4").show();
		$("#content2").hide();
		$("#content3").hide();
		$("#content1").hide();
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