$(document).ready(function () {
	loading();
	
function getProject(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/get_project"
	}).done(function (data) {
		var html='<option>Select Project</option>';
		for(var i=0;i<data.length;i++){
		   var row=data[i];
		  html+=`<option value=`+row[0]+`>`+row[1]+`</option>`;
	   
	   }
		
		$("#1").html(html);
		$("#1").change(function(){
			var id= this.value;
			for(var i=0;i<data.length;i++){
				var row=data[i];
				if(row[0]==id){
					$("#2").val(row[2]);
					$("#3").val(row[3]);
					$("#4").val(row[4]);
					$("#5").val(row[5]);
					
				}
			}
		});
	});
}	
	
$("#apply_intern").on('click', function () {
	var html='';
	
	const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id');
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/api/add_intern/"+$("#1").val()+"/"+id
		}).done(function (data) {
			$("#2").val("");
					$("#3").val("");
					$("#4").val("");
					$("#5").val("");
			alert(data);
		});

});

function getApplicants(){
	const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id');
		$.ajax({
			type: "GET",
			url: "http://localhost:8080/api/student_getproject/"+id
		}).done(function (data) {
			var html='';
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   html += ` <tr><th scope="row">`+(i+1)+`</th>
							<td>`+row[1]+`</td>
							<td>`+row[2]+`</td>
							<td><a href="#">Upload Code</td>
							
							</tr>`;
			   
		   }
            $("#view_applicant").html(html);
		});

}
function loading(){
	getProject();
	getApplicants();
}});