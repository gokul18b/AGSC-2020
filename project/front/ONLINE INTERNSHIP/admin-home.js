$(document).ready(function () {
	loading();
	
    $("#requirement_register").on('click', function () {
		var one = $("#1").val();
        var two = $("#2").val();
		var three = $("#3").val();
		var four = $("#4").val();
		var five = $("#5").val();
		// var six = $("#6").val();
		// var seven = $("#7").val();
		// var eight = $("#8").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_requirement/" + encodeURIComponent(one) + "/" + two+ "/" + three+ "/" + four+ "/" + five
        }).done(function (data) {
            $("#1").val("");
          $("#2").val("");
		  $("#3").val("");
		 $("#4").val("");
		  $("#5").val("");
		  $("#6").val("");
		  $("#7").val("");
		  $("#8").val("");
			alert(data);
			loading();
            
        });
    });
	
	
	
	
	
	
	
	
});


function getApplicants(){
		
				$.ajax({
            type: "GET",
            url: "http://localhost:8080/api/view_applicant"
        }).done(function (data) {
			var html='';
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   html += ` <tr><th scope="row">`+(i+1)+`</th>
							<td>`+row[1]+`</td>
							<td>`+row[2]+`</td>
							<td>`+row[3]+`</td>
							<td>`+row[4]+`</td>
							<td>`+row[5]+`</td>
							<td>`+row[6]+`</td>
							<td>`+row[7]+`</td>
							<td>`+row[8]+`</td>
							</tr>`;
			   
		   }
            $("#applicant_body").html(html);
			
        });
}
function getProjectsA(){
	$.ajax({
            type: "GET",
            url: "http://localhost:8080/api/get_projectsA"
        }).done(function (data) {
			
			var html1='';
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   
			   if(row[1]!==null){
			   html1 += `<option value=`+row[0]+`>`+row[1]+`</option>`;
			   }
			   
		   }
			
			$("#22").html(html1);
			$("#22").change(function(){
				for(var i=0;i<data.length;i++){
					if(this.value==data[i][0]){
						$("#23").val(data[i][2]);
						$("#24").val(data[i][3]);
						$("#25").val(data[i][4]);
					}
				}
			})
        });
}
function getStudents(){
	$.ajax({
            type: "GET",
            url: "http://localhost:8080/api/get_student"
        }).done(function (data) {
			var html='';
			
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   html += `<option value=`+row[0]+`>`+row[1]+`</option>`;
			 
			   
		   }
			$("#21").html(html);
			
			
        });
}
function getProjects1(){
	var html='';
	
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/get_projects"
	}).done(function (data) {
		
		var html='';
		
	   for(var i=0;i<data.length;i++){
		   var row=data[i];
		   html +=`<tr>
		   <th scope="row">`+(i+1)+`</th>
		   <td>`+row[2]+`</td>
		   <td>`+row[3]+`</td>
		   <td>`+row[4]+`</td>
		   <td>`+row[5]+`</td>
		   <td><button type="submit" class="btn btn-primary">`+row[6]+`</button></td>
	   </tr>`;
	   
	   }
		$("#project_body").html(html);
		
		
	});
	
}
function getProjects(){
	var html='';
	
	$.ajax({
		type: "GET",
		url: "http://localhost:8080/api/admin_getproject"
	}).done(function (data) {
		
		var html='';
		
	   for(var i=0;i<data.length;i++){
		   var row=data[i];
		   html +=` <tr>
		   <th scope="row">`+(i+1)+`</th>
		   <td>`+row[1]+`</td>
		   <td>`+row[2]+`</td>
		   <td><a href="#">View code</td>
		
		   
	   </tr>`;
	   
	   }
		$("#checkcode").html(html);
		
		
	});
	
}
function loading(){
	getApplicants();
	getProjects();
//	getProjects();
	//getStudents();
}