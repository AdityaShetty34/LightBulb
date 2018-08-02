var myChart;
var edata;
var ldata;
var val;
var lightId;
var powerVal;
var cctVal;
var intensVal;
var voltVal;
var tempVal;
var totPower;
var timestmp;


var myTotalChart
var energySaving
var dual1
var dual2
var dual3 
var dual4

var state = "stop"  //Pause/Resume button
var playId
var playId2
var playId3

var totalBase

var p1 = 0
var p2 = 0
// var p3 = 0
// var p4 = 0

var b1 = 0
var b2 = 0
// var b3 = 0
// var b4 = 0

$(document).ready(function() {

  console.log(window.location.href)
  document.getElementById("0").style.color = "#FF7049";
  //document.getElementById("o1").style.color = "#d3d3d3";
  //document.getElementById("o2").style.color = "#d3d3d3";
  document.getElementById("1").style.color = "#d3d3d3";
  document.getElementById("2").style.color = "#d3d3d3";
  // document.getElementById("3").style.color = "#d3d3d3";
  // document.getElementById("4").style.color = "#d3d3d3";
 // $("#energyBarVal").text(edata);


  //setInterval(newEnergyData, 2000);
  
  //setInterval(newLightData, 3000);


  // for energymeter data
  // var ctx = document.getElementById("myChart").getContext("2d");
  // myChart = new Chart(ctx, {
  //   type: "bar",
  //   data: {
  //     labels: [],
  //     datasets: [
  //       {
  //         label: "KW",
  //         data: [],
  //         backgroundColor: ["rgba(255, 99, 132, 0.2)"],
  //         borderWidth: 1
  //       }
  //     ]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }
  //       ]
  //     }
  //   }
  // });

  // function updateChart(edata) {
  //   console.log("inside updateChart");
  //   console.log("edata inside updateChart is: ", edata);

  //   var cd = myChart.data;

  //   if (cd.labels.length > 0) {
  //     cd.labels.shift();

  //     cd.datasets[0].data.shift();
  //   }

  //   var d = new Date();

  //   var dt = d.toString();
  //   dt1 = dt.substring(15, 24);
  //   console.log("date: ", dt1);

  //   cd.labels.push(dt1);
  //   cd.datasets[0].data.push(edata);
  //   $("#edata").text(parseFloat(edata).toFixed(4));

  //   myChart.update(0);
  // }

  // function newEnergyData() {
  //   console.log("inside realEnergtData");
  //   var host = window.document.location.hostname;
  //   var port = location.port;
  //   var stUrl = "http://" + host + ":" + port + "/energybar";
  //   $.ajax({
  //     url: stUrl,
  //     type: "GET",
  //     success: function(val) {
  //       edata = val;
  //       console.log("energy value is: ", edata);
  //     }
  //   });
  //   console.log("edata outside ajax:", edata);
  //   updateChart(edata);
  // }

  
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    

      chartColor = "#FFFFFF";

      // General configuration for the charts with Line gradientStroke
      gradientChartOptionsConfiguration = {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode:"nearest",
            intersect: 0,
            position:"nearest",
            xPadding:10,
            yPadding:10,
            caretPadding:10
          },
          responsive: 1,
          scales: {
              yAxes: [{
                display:0,
                gridLines:0,
                ticks: {
                    display: false
                },
                gridLines: {
                    zeroLineColor: "transparent",
                    drawTicks: false,
                    display: false,
                    drawBorder: false
                }
              }],
              xAxes: [{
                display:0,
                gridLines:0,
                ticks: {
                    display: false
                },
                gridLines: {
                  zeroLineColor: "transparent",
                  drawTicks: false,
                  display: false,
                  drawBorder: false
                }
              }]
          },
          layout:{
            padding:{left:0,right:0,top:15,bottom:15}
          }
      };

      gradientChartOptionsConfigurationWithNumbersAndGrid = {
          maintainAspectRatio: false,
          legend: {
              display: false
          },
          tooltips: {
            bodySpacing: 4,
            mode:"nearest",
            intersect: 0,
            position:"nearest",
            xPadding:10,
            yPadding:10,
            caretPadding:10
          },
          responsive: true,
          scales: {
              yAxes: [{
                gridLines:0,
                gridLines: {
                    zeroLineColor: "transparent",
                    drawBorder: false
                }
              }],
              xAxes: [{
                display:0,
                gridLines:0,
                ticks: {
                    display: false
                },
                gridLines: {
                  zeroLineColor: "transparent",
                  drawTicks: false,
                  display: false,
                  drawBorder: false
                }
              }]
          },
          layout:{
            padding:{left:0,right:0,top:15,bottom:15}
          }
      };

      var cardStatsMiniLineColor = "#fff",
          cardStatsMiniDotColor = "#fff";

// Power Consumption Charts
       var ctx = document.getElementById("consumedPowerChart").getContext('2d');
      myLightsChart = new Chart(ctx, {
     type: 'bar',
     data: {
         labels: ["Street 1","Street 2"],
         datasets: [{
            label: 'Power Consumption',
            data: [0,0,],
            backgroundColor: [                
                // '#9ca9ad',
                // '#9ca9ad',
                // '#9ca9ad',
                // '#9ca9ad'
                '#FF7049',
                '#FF7049'
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
    mirror: true,
        gridLines: {
          display: true,
          /*color: "#fff"*/
        }
        /*scaleLabel: {
          display: true,
          labelString: 'Lights'
        }*/
        }],
        yAxes: [{
        display: true,
    mirror: true,
        gridLines: {
          display: true,
          /*color: "#fff"*/
        },
        scaleLabel: {
          display: true,
          labelString: 'Power'
        },
         ticks: {
          max: 150,
          min: 0
        }
        }]
        }
        }
      });
      
      //uncomment for motion sensor icons

//       document.getElementById('consumedEnergyLegend').innerHTML = 
// "<ul style='list-style-type:none;margin-right:10%;margin-left:8%;width:98%;height:50px;'>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#8bc34a;'></i><br><span style='color:#9ba9ac;'>L1</span></li>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#8bc34a;'></i><br><span style='color:#9ba9ac;'>L2</span></span></li>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#8bc34a;'></i><br><span style='color:#9ba9ac;'>L3</span></li>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#9ba9ac;'></i><br><span style='color:#9ba9ac;'>L4</span></li>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#9ba9ac;'></i><br><span style='color:#9ba9ac;'>L5</span></li>"+
// "<li style='float:left;width:16.66%;line-height:24px;'><i class='fas fa-street-view' style='color:#8bc34a;'></i><br><span style='color:#9ba9ac;'>L6</span></li>"+
// "</ul>";


var ctx = document.getElementById("myGaugeChart");
myTotalChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Total"],
        datasets: [{
           // label: '# of Votes',
            data: [],
            backgroundColor: [
             "#8bc34a",
               "#9ba9ac"
            ],
            borderColor: [
              "#8bc34a",
              "#9ba9ac"
            ],
            borderWidth: 1
        }]
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
    }
});

/*
//Lux chart
var value = 0;
var max = 100;

var bar_ctx = document.getElementById('bar-chart');
var bar_chart = new Chart(bar_ctx, {
  type: 'horizontalBar',
  data: {
    labels: [],
    datasets: [{
      data: [value],
      backgroundColor: "#8bc34a"
    }, {
      data: [max - value],
      backgroundColor: "lightgrey",
    }, ]
  },
  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    scales: {
      xAxes: [{
        display: false,
        stacked: true
      }],
      yAxes: [{
        display: false,
        stacked: true
      }],
    } // scales
  } // options
});
*/

// dual charts

var ctx = document.getElementById("dualChartOf");
 dualOf = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Total Power',
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: []

    }, {
      label: '% Total Power Savings',
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: []
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
          labelString: 'Total Power'
        },
        ticks: {
          max: 300,
          min: 0
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: '% Power Saving'
        },
        ticks: {
          max: 100,
          min: 0
        }
      }]
    }
  }
});

var ctx = document.getElementById("dualChart1");
 dual1 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Power',
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: []

    }, {
      label: 'CCT',
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: []
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
          labelString: 'Power'
        },
        ticks: {
          max: 150,
          min: 0
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'CCT'
        },
        ticks: {
          max: 100,
          min: 0
        }
      }]
    }
  }
});

var ctx = document.getElementById("dualChart2");
dual2 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Power',
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: []

    }, {
      label: 'CCT',
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: []
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
          labelString: 'Power'
        },
        ticks: {
          max: 150,
          min: 0
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        scaleLabel: {
          display: true,
          labelString: 'CCT'
        },
        ticks: {
          max: 100,
          min: 0
        }
      }]
    }
  }
});

/*
var ctx = document.getElementById("dualChart3");
dual3 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Power',
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: []

    }, {
      label: 'CCT',
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: []
    }]
  },
  options: {
    scales: {
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
        ticks: {
          max: 40,
          min: 0
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        ticks: {
          max: 100,
          min: 0
        }
      }]
    }
  }
});

var ctx = document.getElementById("dualChart4");
dual4 = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Power',
      yAxisID: 'A',
      borderColor: "#FF7049",
      backgroundColor: "#FF7049",
      fill: false,
      data: []

    }, {
      label: 'CCT',
      yAxisID: 'B',
      borderColor: "#8bc34a",
      backgroundColor: "#8bc34a",
      fill: false,
      data: []
    }]
  },
  options: {
    scales: {
      yAxes: [{
        id: 'A',
        type: 'linear',
        position: 'left',
        ticks: {
          max: 40,
          min: 0
        }
      }, {
        id: 'B',
        type: 'linear',
        position: 'right',
        ticks: {
          max: 100,
          min: 0
        }
      }]
    }
  }
});

*/

//Baseline and consumed power chart
      Chart.defaults.global.legend.labels.usePointStyle = true;
      ctx = document.getElementById("projectedPowerChart").getContext('2d');
      myConsumedChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{ 
          data: [],
          label: "Baseline Power",
          borderColor: "#FF7049",
          backgroundColor: "#FF7049",
          fill: false
         // lineTension: 0
        }, { 
          data: [],
          label: "Consumed Power",
          borderColor: "#8bc34a",
          backgroundColor: "#8bc34a",
          fill: false
         // lineTension: 0
        }
      ]
    },
   options: { 
      title: {
        display: false,
        text: 'Projected Power'
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
    legend: {
            display: true,
            position: 'top',
            labels: {
                fontColor: '#fff',
            }
          }
   }
      });


//Power Saving View
  ctx = document.getElementById("energySavingChart").getContext('2d');
  Chart.defaults.global.defaultFontSize = 12;

  var chartOptions = {
    /*     
          rotation: -Math.PI,
    cutoutPercentage: 30,
    circumference: Math.PI,*/
    legend: { 
      display: true,
      position: 'top'
    },

    /*animation: {
      animateRotate: false,
      animateScale: true
    }*/
  };

  


  mySavingChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Power Saving", "Power Consumed"],
      datasets: [{
          //label: '# of Votes',
          data: [0,0],
          backgroundColor: [
            "#8bc34a",
            "#FF7049"
          ],
          borderColor: [
            "#8bc34a",
            "#FF7049"
          ],
          borderWidth: 1
      }]
  },
    options: chartOptions,
    plugins: [{
        beforeDraw: function(chart) {
            height = chart.chart.height;
      width = chart.chart.width,
      ctx = chart.chart.ctx;
      ctx.restore();
      ctx.font ="30px Montserrat";
      ctx.textBaseline = "middle";
      var text = "";
      textX = Math.round((width - ctx.measureText(text).width) / 2);
            textY = height / 2;            
      ctx.fillText(text, textX, textY);
            ctx.fillStyle="#FFF";
      ctx.save();
            }
    }]
  });

});

//Dual chart select from list to display one chart at a time
function getDualOf() {
  console.log("0")
  document.getElementById("0").style.color = "#FF7049";
  document.getElementById("1").style.color = "white";
  document.getElementById("2").style.color = "white";
  // document.getElementById("3").style.color = "white";
  // document.getElementById("4").style.color = "white";
  $("#of").show()
  $("#of1").hide()
  $("#of2").hide()
  // $("#of3").hide()
  // $("#of4").hide()
}


function getDual1() {
  console.log("1")
  document.getElementById("1").style.color = "#FF7049";
  document.getElementById("0").style.color = "white";
  document.getElementById("2").style.color = "white";
  // document.getElementById("3").style.color = "white";
  // document.getElementById("4").style.color = "white";
  $("#of1").show()
  $("#of").hide()
  $("#of2").hide()
  // $("#of3").hide()
  // $("#of4").hide()
}
function getDual2() {
  console.log("2")
  document.getElementById("2").style.color = "#FF7049";
  document.getElementById("0").style.color = "white";
  document.getElementById("1").style.color = "white";
  // document.getElementById("3").style.color = "white";
  // document.getElementById("4").style.color = "white";
  $("#of2").show()
  $("#of").hide()
  $("#of1").hide()
  // $("#of3").hide()
  // $("#of4").hide()

}

/*
function getDual3() {
  console.log("3")
  document.getElementById("3").style.color = "#FF7049";
  document.getElementById("0").style.color = "white";
  document.getElementById("1").style.color = "white";
  document.getElementById("2").style.color = "white";
  document.getElementById("4").style.color = "white";
  $("#of3").show()
  $("#of").hide()
  $("#of1").hide()
  $("#of2").hide()
  $("#of4").hide()

}
function getDual4() {
  console.log("4")
  document.getElementById("4").style.color = "#FF7049";
  document.getElementById("0").style.color = "white";
  document.getElementById("3").style.color = "white";
  document.getElementById("2").style.color = "white";
  document.getElementById("1").style.color = "white";
  $("#of4").show()
  $("#of").hide()
  $("#of1").hide()
  $("#of2").hide()
  $("#of3").hide()

}*/

 // Play/resume polling script
 function buttonPlayPress() {
   //var myVar = 0
  if(state=='stop'){
    state='play';
    var button = d3.select("#button_play").classed('btn-success', true); 
    button.select("i").attr('class', "fa fa-pause");
    var myVar = setInterval(newLightData, 2000);
    // var myVar2 = setInterval(newOtherData, 2000);  
	  // var myVar3 = setInterval(newSwitchData, 2000);
    window.playId = myVar
    // window.playId2 = myVar2
	  // window.playId3 = myVar3
    //console.log("playId 1st time is: ",playId)
  }
  else if(state=='play' || state=='resume'){
    state = 'pause';
    d3.select("#button_play i").attr('class', "fa fa-play"); 
    //myStopFunction(myVar)
    //console.log("playId in pause is: ",playId)
    clearInterval(playId);
    // clearInterval(playId2);
	  // clearInterval(playId3);
  }
  else if(state=='pause'){
    state = 'resume';
    d3.select("#button_play i").attr('class', "fa fa-pause");  
    var myVar = setInterval(newLightData, 2000); 
    // var myVar2 = setInterval(newOtherData, 2000);   
	  // var myVar3 = setInterval(newSwitchData, 2000); 
    window.playId = myVar
    // window.playId2 = myVar2
	  // window.playId3 = myVar3

    //console.log("playId in resume is: ",playId)
   
  }
  console.log("button play pressed, state is: "+state);
}

function myStopFunction(myVar) {
  clearInterval(myVar);
}

function newLightData() {
  console.log("request for newLightData");
  var host = window.document.location.hostname;
  var port = location.port;
  var stUrl = "http://" + host + ":" + port +"/v1/litm/lightData";
  
  $.ajax({
    url: stUrl,
    type: "GET",
    dataType: 'json',
    success: function(data) {  
      console.log("/lightdata data is: ",data)  
      //lightId1 = data.lid 
      if (data != "" || data != null ){
      var lightId1
      var powerVal1
      var tempVal1
      var timestmp1     
      lightId1 = data.lid 
      console.log('lightId: ', lightId1);
      powerVal1 = data.power
      console.log('powerVal: ', powerVal1);
      cctVal = data.cct
      console.log('cctVal: ', cctVal);
      intensVal = data.intensity
      console.log('intensVal: ', intensVal);
      voltVal = data.voltage
      console.log('voltVal: ', voltVal);
      tempVal1 = data.temperature
      console.log('tempVal: ', tempVal1);
      timestmp1 = data.time
      console.log('timestmp1: ', timestmp1);
      if(timestmp1 == timestmp){
          console.log("Same Data")
      }else{
        if (lightId1 == "01" || lightId1 == "02"){
        console.log("new Data received___________________")
        timestmp = timestmp1
        
        if (lightId1 == "01"){
          p1 = powerVal1
        }else if (lightId1 == "02"){
          p2 = powerVal1
        }
        // }else if (lightId1 == "03"){
        //   p3 = powerVal1
        // }else if (lightId1 == "04"){
        //   p4 = powerVal1
        // }
        

      updateLightChart(lightId1,powerVal1);
      updateDualChart(lightId1,powerVal1,cctVal,timestmp1)
      calcValues();
      }else{
        console.log("WRONG LIGHT ID:",lightId1)
      }
      }
      }
    }
  });
}
/*
function newOtherData() {
  console.log("request for newOtherData");
  var host = window.document.location.hostname;
  var port = location.port;
  var stUrl = "http://" + host + ":" + port + "/otherdata";
  
  $.ajax({
    url: stUrl,
    type: "GET",
    //dataType: 'json',
    success: function(msg) {  
	var data = JSON.stringify(msg)
      console.log("other data is*********************************: ",data)  
    if(data.motion == true){
    $("#l1").css('color', '#8bc34a');
    }else{
    $("#l1").css('color', '#d3d3d3');
    }
      }
  });
}
*/

function newOtherData() {
  console.log("request for newOtherData");
  var host = window.document.location.hostname;
  var port = location.port;
  var stUrl = "http://" + host + ":" + port + "/otherdata";
  
  $.ajax({
    url: stUrl,
    type: "GET",
    //dataType: 'json',
    success: function(msg) {  
	console.log("otherData is: ",msg)
	if(msg == true){
    $("#l1").css('color', '#FF7049');
      //setTimeout(myFunction2, 3000)
    }else if(msg == false){
    $("#l1").css('color', '#d3d3d3');
    }
      }
  });
}

function newSwitchData() {
  console.log("request for newSwitchData");
  var host = window.document.location.hostname;
  var port = location.port;
  var stUrl = "http://" + host + ":" + port + "/switchdata";
  
  $.ajax({
    url: stUrl,
    type: "GET",
    //dataType: 'json',
    success: function(msg) {  
	console.log("switchData is: ",msg)
	if(msg == true){
    $("#l2").css('color', '#FF7049');
//setTimeout(myFunction1, 3000)
    }else{
    $("#l2").css('color', '#8bc34a');
	}
	
      }
  });
}

function myFunction1(){
    $("#l2").css('color', '#8bc34a');
}

function myFunction2(){
    $("#l1").css('color', '#d3d3d3');
}


function calcValues(){

  totPower = p1 + p2 //+ p3 + p4
  console.log("Total power is: ", totPower )

  if(p1 == 0){
    b1 = 0
    }else {
    b1 = 120*2
  }
  if(p2 == 0){
    b2 = 0
    }else{
    b2 = 120*2
  }
  // if(p3 == 0){
  //   b3 = 0
  //   }else{
  //   b3 = 34*2
  // }
  // if(p4 == 0){
  //   b4 = 0
  //   }else{
  //   b4 = 34*2
  // }
  var cons = p1 + p2 //+ p3 + p4
  console.log('cons: ', cons);
  totalBase = b1 + b2 //+ b3 + b4
  console.log('totalBase: ', totalBase);
  var tmp = ((totalBase-cons)/totalBase)*100
  energySaving = Math.floor(tmp)
  console.log('energySaving: ', energySaving);
  //check for Nan 
  if (isNaN(energySaving)) energySaving = 100;
  console.log('energySaving: ', energySaving);
  updateConsumedChart(totalBase,cons)
  updateSavingsChart(energySaving)
  updateTotalChart(totPower)
  //myLightsChart.update();
}

function updateLightChart(lightId, powerVal) {
    console.log("inside updatelightchart lightId is: ", lightId);
    console.log("inside updatelightchart powerValue is: ", powerVal);
    
    var cd = myLightsChart.data;
    if(lightId == "01"){
    cd.datasets[0].data[0] = powerVal
    myLightsChart.update();
    }else if(lightId == "02"){
    cd.datasets[0].data[1] = powerVal
    myLightsChart.update();
  // }else if(lightId == "03"){
  //   cd.datasets[0].data[2] = powerVal
  //   myLightsChart.update();
  // }else if(lightId == "04"){
  //   cd.datasets[0].data[3] = powerVal
  //   myLightsChart.update();
  // }
    }else{
    console.log("WRONG LIGHT ID:",lightId)
  }
}

/*
function updateLightChart2(lightId, powerVal) {
    console.log("inside updatelightchart2 lightId is: ", lightId);
    console.log("inside updatelightchart2 powerValue is: ", powerVal);
    
  var cd = myLightsChart2.data;
  cd.datasets[0].data[0] = powerVal
  myLightsChart2.update();
}
*/

/*function updateLightChart3(lightId, powerVal) {
  console.log("inside updatelightchart2 lightId is: ", lightId);
  console.log("inside updatelightchart2 powerValue is: ", powerVal);
  
var cd = myLightsChart3.data;
cd.datasets[0].data[0] = powerVal
myLightsChart3.update();
}*/

function updateSavingsChart(enrgy){
  var cd = mySavingChart.data
  cd.datasets[0].data[0] = enrgy
  cd.datasets[0].data[1] = 100 - enrgy
  mySavingChart.update();
  $("#powerSavingValue").text(enrgy);
}

function updateConsumedChart(baseline, consumed){
  var cd = myConsumedChart.data

  if(cd.labels.length > 100){

  cd.labels.shift()
  cd.datasets[0].data.shift()
  cd.datasets[1].data.shift()

  }

  var d = new Date();
  var dt = d.toString();
  var dt1 = dt.substring(15, 24);
  cd.labels.push(dt1)  
  cd.datasets[0].data.push(baseline)
  cd.datasets[1].data.push(consumed)

  myConsumedChart.update();
}

function updateTotalChart(totp) {
  console.log("inside updateTotalChart lightId is: ", totp);
  var cd = myTotalChart.data;
  var rem = totalBase - totp
  cd.datasets[0].data[0] = totp
  cd.datasets[0].data[1] = rem
  myTotalChart.update();
  $("#totalPowerVal").text(totp);
}

  function updateDualChart(lightId, powerVal, tempVal, timeVal) {
          console.log("inside updateDualChart lightId is: ", lightId);
          console.log("inside updateDualChart powerValue is: ", powerVal);
          console.log("inside updateDualChart tempVal is: ", tempVal);
          console.log("inside updateDualChart timeVal is: ", timeVal);
    // var cd = myLightsChart.data;


     //for Total Dual Chart
     var cd = dualOf.data
     if(cd.labels.length > 80){

      cd.labels.shift()

      cd.datasets[0].data.shift()
      cd.datasets[1].data.shift()

      }
    var ti = timeVal.substring(10, 20);
    cd.labels.push(ti)  
    cd.datasets[0].data.push(totPower)
    cd.datasets[1].data.push(energySaving)

      dualOf.update();

//For individual dual charts
  if(lightId == "01"){
  
     var cd = dual1.data
    
         if(cd.labels.length > 80){
    
          cd.labels.shift()
    
          cd.datasets[0].data.shift()
          cd.datasets[1].data.shift()
    
          }
        var ti = timeVal.substring(10, 20);
        cd.labels.push(ti)  
        cd.datasets[0].data.push(powerVal)
        cd.datasets[1].data.push(tempVal)
  
          dual1.update();
  
  
      }else if(lightId == "02"){
          var cd = dual2.data
    
         if(cd.labels.length > 80){
    
          cd.labels.shift()
    
          cd.datasets[0].data.shift()
          cd.datasets[1].data.shift()
    
          }
        var ti = timeVal.substring(10, 20);
        cd.labels.push(ti)  
        cd.datasets[0].data.push(powerVal)
        cd.datasets[1].data.push(tempVal)
  
          dual2.update();
  
  }
// else if(lightId == "03"){
//     var cd = dual3.data

//    if(cd.labels.length > 80){

//     cd.labels.shift()

//     cd.datasets[0].data.shift()
//     cd.datasets[1].data.shift()

//     }
//   var ti = timeVal.substring(10, 20);
//   cd.labels.push(ti)  
//   cd.datasets[0].data.push(powerVal)
//   cd.datasets[1].data.push(tempVal)

//     dual3.update();

// }else if(lightId == "04"){
//   var cd = dual4.data

//  if(cd.labels.length > 80){

//   cd.labels.shift()

//   cd.datasets[0].data.shift()
//   cd.datasets[1].data.shift()

//   }
// var ti = timeVal.substring(10, 20);
// cd.labels.push(ti)  
// cd.datasets[0].data.push(powerVal)
// cd.datasets[1].data.push(tempVal)

//   dual4.update();

// }
}
