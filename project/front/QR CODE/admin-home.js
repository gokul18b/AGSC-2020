$(document).ready(function () {
	getTickets();
	getTicket();
    $("#student_register").on('click', function () {
        var one = $("#one").val();
        var two = $("#two").val();
		var three = $("#three").val();
		var four = $("#four").val();
		var five = $("#five").val();
		var six = $("#six").val();
		var seven = $("#seven").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_student/" + one + "/" + two+ "/" + three+ "/" + four+ "/" + five+ "/" + six+ "/" + seven
        }).done(function (data) {
            $("#one").val("");
          $("#two").val("");
		  $("#three").val("");
		 $("#four").val("");
		  $("#five").val("");
		  $("#six").val("");
		  $("#seven").val("");
			alert(data);
			getTickets();
            
        });
    });
	
	
	
	
	$("#add_hallticket").on('click', function () {
        var one = $("#one2").val();
        var two = $("#two2").val();
		var three = $("#three2").val();
		var four = $("#four2").val();
		
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/add_hallticket/" + one + "/" + two+ "/" + three+ "/" + four
        }).done(function (data) {
            $("#one").val("");
          $("#two").val("");
		  $("#three").val("");
		 $("#four").val("");
		 
			alert(data);
			getTickets();
            
        });
    })
	
	
	
});

function makeCode (id,value) {		
	return id.makeCode(value	);
}
function getTicket(){
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
function getTickets(){
	$.ajax({
            type: "GET",
            url: "http://localhost:8080/api/get_tickets"
        }).done(function (data) {
			var html='';
           for(var i=0;i<data.length;i++){
			   var row=data[i];
			   html += `<tr>
					<th>`+(i+1)+`</th>
					<td>`+row[0]+`</td>
					<td>`+row[1]+`</td>
					<td>`+row[3]+`</td>
					<td><div class="qrcode" id="qrcode`+i+`" style="width:100px; height:100px; margin-top:15px;"></div></td>
			   </tr>`;
			   
		   }
            $("#ticket_body").html(html);
			for(var i=0;i<data.length;i++){
				new QRCode(document.getElementById("qrcode"+i), {
					width : 100,
					height : 100
				}).makeCode("Hall Ticlet No:"+data[i][3]+" Roll No:"+data[i][0]+" Student Name:"+data[i][1]);
				
			}
        });
}