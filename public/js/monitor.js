var myChart;
var streetChart;
var edata;
var ldata;

$(document).ready(function() {
  $("#energyBarVal").text(edata);

  //setInterval(newEnergyData, 2000);
  setInterval(newLightData, 4000);

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

  // for lights chart
  var ctx = document.getElementById("streetChart").getContext("2d");
  streetChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "power",

          backgroundColor: "rgb(110, 99, 132)",

          //borderColor: 'rgb(99, 150, 1)',

          data: []
        },
        {
          label: "cct",

          backgroundColor: "rgb(240, 242, 90)",

          //borderColor: 'rgb(99, 150, 1)',

          data: []
        },
        {
          label: "intensity",

          backgroundColor: "rgb(200, 110, 50)",

          //borderColor: 'rgb(99, 150, 1)',

          data: []
        },
        {
          label: "voltage",

          backgroundColor: "rgb(50, 100, 150)",

          //borderColor: 'rgb(99, 150, 1)',

          data: []
        },
        {
          label: "temp",

          backgroundColor: "rgb(90, 20, 242)",

          //borderColor: 'rgb(99, 150, 1)',

          data: []
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  
});

function updateLightChart(pr1,cct1,intens1,volt1,temp1) {
  console.log("inside updateLightChart");
  console.log("inside updatelightchart: ", pr1);
  console.log("inside updatelightchart:", cct1);
  console.log("inside updatelightchart: ", intens1);
  console.log("inside updatelightchart: ", volt1);
  console.log("inside updatelightchart: ", temp1);
  var cd = streetChart.data;

  if (cd.labels.length > 4) {
    cd.labels.shift();

    cd.datasets[0].data.shift();
  }

  var d = new Date();

  var dt = d.toString();
  dt1 = dt.substring(15, 24);
  console.log("date: ", dt1);

  cd.labels.push(dt1);
  cd.datasets[0].data.push(pr1);
  cd.datasets[1].data.push(cct1);
  cd.datasets[2].data.push(intens1);
  cd.datasets[3].data.push(volt1);
  cd.datasets[3].data.push(temp1);

  streetChart.update();
}

function newLightData() {
  console.log("inside realEnergyData");
  var host = window.document.location.hostname;
  var port = location.port;
  var stUrl = "http://" + host + ":" + port + "/lightdata";
  var pr
  var cct
  var intens
  var volt
  var temp
  $.ajax({
    url: stUrl,
    type: "GET",
    dataType: 'json',
    success: function(data) {
      console.log("inside ajax call");
     // var val = JSON.parse(data)
     var val = data
      console.log("val is : ", val)
      
      pr = val.power
      cct = val.cct
      intens = val.intens
      volt = val.volt
      temp = val.temp
      console.log("light data inside ajax is pr: ", pr);
      console.log("light data inside ajax is cct:", cct);
      console.log("light data inside ajax is intens: ", intens);
      console.log("light data inside ajax is volt: ", volt);
      console.log("light data inside ajax is temp: ", temp);

    }
  });
  updateLightChart(pr);
}