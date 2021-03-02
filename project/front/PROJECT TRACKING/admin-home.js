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
    $("#student_register").on('click', function () {
		var one = $("#1").val();
        var two = $("#2").val();
		var three = $("#3").val();
		var four = $("#4").val();
		var five = $("#5").val();
		var six = $("#6").val();
		var seven = $("#7").val();
		var eight = $("#8").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_student/" + one + "/" + two+ "/" + three+ "/" + four+ "/" + five+ "/" + six+ "/" + seven+ "/" + eight
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
	
	
	
	
	$("#project_register").on('click', function () {
		
        var one = $("#11").val();
        var two = $("#12").val();
		var three = $("#13").val();
		var four = $("#14").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_project/" + one + "/" + two+ "/" + three+ "/" + four
        }).done(function (data) {
            $("#11").val("");
          $("#12").val("");
		  $("#13").val("");
		 $("#14").val("");
		 
			alert(data);
			loading();
            
        });
	})
	
	$("#allocate_project").on('click', function () {
		
        var one = $("#21").val();
        var two = $("#22").val();
		
		alert(one)
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/allocate_project/" + one + "/" + two
        }).done(function (data) {
            $("#23").val("");
          $("#24").val("");
		  $("#25").val("");
		 
		 
			alert(data);
			loading();
            
        });
    })
	
	
	
});


function get_projects(){
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const id = urlParams.get('id')
				$.ajax({
            type: "GET",
            url: "http://localhost:8080/api/get_ticket/"+id
        }).done(function (data) {
			var html='';
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   html += ` <div class="card col-md-3" style="width: 18rem;padding:20px">
						  <div id="qrimage`+i+`" class="card-img-top" src="..." alt="Card image cap">
						  <div class="card-body">
							<p class="card-text">`+data[i][4]+`</p>
						  </div>
						</div></div>`;
			   
		   }
            $("#student_body").html(html);
			for(var i=0;i<data.length;i++){
				new QRCode(document.getElementById("qrimage"+i), {
					width : 100,
					height : 100
				}).makeCode("Hall Ticlet No:"+data[i][3]+" Roll No:"+data[i][0]+" Student Name:"+data[i][1]);
				
			}
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
function getProjects(){
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
function loading(){
	getProjectsA();
	getProjects();
	getStudents();
}