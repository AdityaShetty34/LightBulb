var myChart
var chartParam 
var jsonData

$(document).ready(function() {
  console.log(window.location.href)

   $("#exportascsv").on('click',function(e){
    var host = window.document.location.hostname;
    var port = location.port;
    
    var param = document.getElementById("parameter").value;
    var param2 = document.getElementById("parameter2").value;
     
    var freq = document.getElementById("frequency").value;
    var ctype = document.getElementById("chartType").value;
    var lid = document.getElementById("lid").value;
    if(freq == "CUSTOM") {
     var sd = document.getElementById("date1").value;
      var ed = document.getElementById("date2").value;
      if (sd == null || ed == null){
        alert("Please insert the period")
      }
      prd = '{"start_date":"'+sd+'","end_date":"'+ed+'"}'
      console.log("Custom : ", prd)
    }else{
      prd = document.getElementById("period").value
      if (prd == null){
        alert("Please insert the period")
      }
    }
    var tmp = '{"parameter":"'+param+'","parameter2":"'+param2+'","frequency":"'+freq+'","period":'+prd+'}'
        console.log("edata : ", tmp);


        var stUrl = "http://" + host + ":" + port +"/v1/litm/lights/"+lid+"/historicalLightDataForCSV"; 
    $.ajax({
      url: stUrl,
      type: "POST",
      dataType: 'json',
      data:tmp,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
      success: function(data) {  
        if(data == null){
          swal("Data not available", "Please select different time period", "info");
        }else{
         JSONToCSVConvertor(data, "All Parameters", true);
        }
      },error: (function(data) {
        swal("Data not available", "Please select different time period", "info");
      })
    });
        
    });

 $("#changeTimePeriod").off('change').on('change',function(){      
             alert("changed Time Period");
        });

        $("#changeLightId").off('change').on('change',function(){      
             alert("changed Light Id");
        });

	$("#changeParameter").off('change').on('change',function(){      
	     alert("changed Parameter");
	});

	$("#changeLightId").off('keyup').on('keyup',function(){      
	     alert("changed Light Id");
  });
  
  
  //plot button on click function to get the chart data
	$("#submitParam").on('submit',function(e){
		e.preventDefault();
		 $('#myChart').empty();
		var freq = document.getElementById("frequency").value;
		if(freq == "CUSTOM") {
			var sd = $("#datetimepicker1").find("input").val();
			var ed = $("#datetimepicker2").find("input").val();
			if (sd == "" || ed == ""){
				swal("info","Please insert the period","info")
				return	
			}
		}else {
			prd = document.getElementById("period").value
			if (prd == ""){
				swal("info","Please insert the period","info")
				return
			}
		}
			getChartData();
	});

  	 // if custom frequency selected, show from and to date box
     $("#frequency").on('change',function(){ 
      var durationSelected=$('#frequency').val();
  
      if (durationSelected == "HOUR" || durationSelected == "DAY" || durationSelected == "WEEK" || durationSelected == "MONTH" || durationSelected == "YEAR" ){
        
        $('#customPeriod').hide();
        $('#defaultPeriod').show();
      }else if (durationSelected == "CUSTOM"){
        
        $('#customPeriod').show();
          $('#defaultPeriod').hide();
       }
      });

      $("#parameter").on('change',function(){ 
        var parameter=$('#parameter').val();
    
        if (parameter == "OutputVoltage"){
          $("#parameter2").val("OutputCurrent");         
        }
        });

        $("#parameter2").on('change',function(){ 
          var parameter=$('#parameter').val();
      
          if (parameter == "OutputVoltage"){
            swal("Parameter", "Cannot change Parameter2 when Parameter1 is Output Voltage", "info");  
            $("#parameter2").val("OutputCurrent");   
          }
          });

       //date picker script
  $(function () {
    /*$('.datepicker').datetimepicker(
    {
    sideBySide:true,
    format: 'YYYY-MM-DD HH:mm:ss'
    });
    
    $('#datetimepicker2').datetimepicker({
        useCurrent: false,
        sideBySide: true,
  format: 'YYYY-MM-DD HH:mm:ss'
    });
    $("#datetimepicker1").on("dp.change", function (e) {
        $('#datetimepicker2').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker2").on("dp.change", function (e) {
        $('#datetimepicker1').data("DateTimePicker").maxDate(e.date);
    });*/
});
   
	$("#changeChartType").off('change').on('change',function(){      
        var me= $(this);
      	var ctx = document.getElementById("historicalPowerChart1").getContext('2d');
      
        if (me.val()=="bar"){
	myChart = new Chart(ctx, {
   	 type: me.val(),
   	 data: {
         labels: ["L1", "L2", "L3", "L4", "L5", "L6"],
         datasets: [{
            label: 'Power Consumption',
            data: [45, 60, 25, 35, 30,  50],
            backgroundColor: [                
                '#9ca9ad',
		            '#f55352',
                '#9ca9ad',
                '#9ca9ad',
                '#9ca9ad',
                '#9ca9ad'
            ],
            borderWidth: 0
        }]
        },
        options: {
	 legendCallback: function(chart) {
            return "<ul><li>sdfsdfs</li></ul>";
        },
        responsive: true,
	legend: {
          display: false,
	},
        title: {
         display: false,
         text: 'Power Consumption'
        },
        tooltips: {
         mode: 'label',
        },
        hover: {
        mode: 'nearest',
        intersect: true
        },
        scales: {
        xAxes: [{
        display: true,
        gridLines: {
          display: true,
          /*color: "#fff"*/
        },
        scaleLabel: {
          display: true,
          labelString: 'Lights'
        }
        }],
        yAxes: [{
        display: true,
        gridLines: {
          display: true,
          /*color: "#fff"*/
        },
        scaleLabel: {
          display: true,
          labelString: 'Power'
        },
        ticks: {
              beginAtZero:true
        }        
        }]
        }
        }
      	});
       }  
       else
       {
      	Chart.defaults.global.legend.labels.usePointStyle = true;
      	ctx = document.getElementById("historicalPowerChart1").getContext('2d');
     	myChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	    labels: ["Monday", "Tuesday", "Wednesday"],
	    datasets: [{ 
        	data: [0, 25, 30],
	        label: "Consumed Energy",
	        borderColor: "#f55352",
		backgroundColor: "#f55352",
        	fill: false,
		lineTension: 0
	      }, { 
        	data: [0, 20, 22],
	        label: "Baseline Energy",
        	borderColor: "#8bc34a",
	        fill: false,
                backgroundColor: "#8bc34a",
	        lineTension: 0
	      }
    	]
  	},
 	 options: {	
  	  title: {
  	    display: false,
  	    text: 'Projected Power'
  	  },
	  legend: {
            display: true,
            position: 'bottom',
            labels: {
                fontColor: '#fff',
            }
          }
 	 }
      	});

       }


      });
    });

function getChartData(){
  console.log("Inside getChartData")
      var host = window.document.location.hostname;
      var port = location.port;
      var prd
      var param = document.getElementById("parameter").value;
	  window.chartParam = param; 
      var param2 = document.getElementById("parameter2").value;
     // window.chartParam = param; 
      //window.chartParam2 = param2;
      var freq = document.getElementById("frequency").value;
      var ctype = document.getElementById("chartType").value;
      var lid = document.getElementById("lid").value;
      if(freq == "CUSTOM") {
        // var sd = $("#datetimepicker1").find("input").val();
        // var ed = $("#datetimepicker2").find("input").val();
       var sd = document.getElementById("date1").value;
        var ed = document.getElementById("date2").value;
        if (sd == null || ed == null){
          alert("Please insert the period")
        }
        prd = '{"start_date":"'+sd+'","end_date":"'+ed+'"}'
        console.log("Custom : ", prd)
      }else{
        prd = document.getElementById("period").value
        if (prd == null){
          alert("Please insert the period")
        }
      }
      var tmp = '{"parameter":"'+param+'","parameter2":"'+param2+'","frequency":"'+freq+'","period":'+prd+'}'
          console.log("edata : ", tmp);
  
      // var edata = JSON.parse(tmp)
      //var edata = $("#energyParameters").serialize();
      $.ajax({	
           type: "POST",
           dataType: "json",
           url: "http://" + host + ":" + port + "/v1/litm/lights/"+lid+"/historicalLightData",
           headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
           data:tmp,
            beforeSend: function(){
          // Show image container
          $("#chartloader").show();
          
         },
          success: function (data) {
        if (data[0] == null) {
              swal("Data not available", "Please select different time period", "info");
              console.log("Data is empty")
         }else{  
         //console.log("data is:",data)
			var tmpd = JSON.stringify(data)
			//console.log("Parsed data is:",tmpd)
				
			window.jsonData = tmpd;

         var p1data = data[0]
         console.log(data[0].length)
         console.log(p1data)
         console.log(data[1].length)
         var p2data = data[1]
         console.log(p2data)
			  var p1values = [];
        var p1timestmp = [];
        var p2values = [];
        var p2timestmp = [];

			for (var i=0; i<p1data.length; i++){
         p1values[i]= Math.ceil(p1data[i].value);
         console.log(p1values[i])
			 	p1timestmp[i]= p1data[i].time;
      }

      for (var i=0; i<p2data.length; i++){
        p2values[i]= Math.ceil(p2data[i].value);
        console.log(p2values[i])
        p2timestmp[i]= p2data[i].time;
     }
    console.log(param)
    console.log(param2)
			drawChart(param,p1values,p1timestmp,param2, p2values,p2timestmp,ctype);
     
    }
  
      },
       complete: function(data){
          // Hide image container
          $("#chartloader").hide();
            var elem = document.getElementById('exportascsv');
                elem.style.display = "inline-block";
             // $("#exportascsv").hide();
  
         },
          error: (function(response) {
          swal("Data not available", "Please select different time period", "info");
        })
      });
  
  }

  function drawChart(param1, value1, timestamp,param2, value2, timestamp2, ctype){
   console.log("inside drawChart");
   console.log("param1: ",param1)
   console.log("param2: ",param2)
   var minL, maxL, minL1, maxL1

   //y axis limit for param 1
   if(param1 == "Temperature" ){
     minL = 0
     maxL = 100
   }else if(param2 == "Ambient_temp" ){
    minL1 = 0
    maxL1 = 100
  }else if(param1 == "Cct" ){
    minL = 0
    maxL = 100
  }else if(param1 == "Intensity" ){
    minL = 0
    maxL = 100
  }else if(param1 == "OutputVoltage" ){
    minL = 0
    maxL = 100
  }else if(param1 == "Power"){
    minL = 0
    maxL = 150
  }else if(param1 == "Current" ){
    minL = 0
    maxL = 2
  }

  //y axis limit for param 2
  if(param2 == "Temperature" ){
    minL1 = 0
    maxL1 = 100
  }else if(param2 == "Ambient_temp" ){
    minL1 = 0
    maxL1 = 100
  }else if(param2 == "Cct" ){
   minL1 = 0
   maxL1 = 100
 }else if(param2 == "Intensity" ){
   minL1 = 0
   maxL1 = 100
 }else if(param2 == "Voltage" ){
   minL1 = 0
   maxL1 = 80
 }else if(param2 == "Power"){
   minL1 = 0
   maxL1 = 150
 }else if(param2 == "OutputCurrent" ){
   minL1 = 0
   maxL1 = 2
 }
  
  
  var ctx = document.getElementById("historicalPowerChart").getContext('2d');
  if(myChart != null) {
          console.log("Clearing old data of chart")
          myChart.destroy();
          }
	myChart = new Chart(ctx, {

  type: ctype,
  data: {
    labels: timestamp,
    datasets: [{
      label: param1,
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: value1

    }, {
      label: param2,
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: value2
    }]
  },
  options: {
    scales: {
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: param1
        },
        ticks: {
          max: maxL,
          min: minL
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: param2
        },
        ticks: {
          max: maxL1,
          min: minL1
        }
      }]
    }
  }
});

}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "Light Data Report_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
