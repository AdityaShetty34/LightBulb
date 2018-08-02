var isOn = "true"
var level
var light_id
var level_id
var dimValue = "100"
var cctValue = "0"
var operation
var port
var cctVal
var host = window.document.location.hostname;
var port = location.port;

$(document).ready(function() {
  
// $("#set").click(function(e) {
//     e.preventDefault();
//     if($('#port').val() == ''){
//       //swal('Please fill the Port Value eg. COM3');
//       swal("Alert!", "Please check for the Port value eg. COM5", "info");
//    }else{
//     sendCommnad();
//   }
//    });

$("#switchToLora").click(function(e) {
  console.log("switchToLora")
  console.log(level_id)
  if (level_id > 2) {
    var stUrl = "http://"+host+":"+port+"/v1/litm/lights";
  $.ajax({
      type:'POST',
      url:stUrl,
      data:{light_id:light_id, opr:"switch"},
      dataType: 'json',
      success:function(msg){
        if(msg.status == "Success"){
         //swal("Done","Command Sent Successfully","success");
         swal({
          title: "Done",
          text: "Command sent successfully",
          type: "success",
          allowOutsideClick: true,
        });
            }else{
              swal("Error",msg.status,"error");
            }
      },
      error:function(response) {
          swal("Error", "Something went wrong. Please Check your internet connection or contact Administator", "error");
      }
      });
  }else{
    swal("Error", "Please click on the light to switch to LoRa", "error");
  }
  //e.preventDefault();
  
  
  

 });

   $("#onButton").click(function(e) {
    e.preventDefault();
    
    isOn = true
    sendCommnad();
  
   });

   $("#offButton").click(function(e) {
    e.preventDefault();
    
    isOn = false
    sendCommnad();
   });

//making selected level required attribute
 $(".readonly").keydown (function(e){
        e.preventDefault();
    });
    
// dim slider value
var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  dimValue = this.value
  //console.log("dimValue: ",dimValue)
}

slider.onchange = function() {
  // output.innerHTML = this.value;
  // dimValue = this.value
  console.log("dimValue: ",dimValue)

  operation = "set_dim"
    console.log("inside set_dim.............")
    console.log("inside set_dim light_id is: ",light_id)
    console.log("inside set_dim level_id is: ",level_id)
    console.log("inside set_dim isOn is: ",isOn)
    console.log("inside set_dim dimValue is: ",dimValue)
    cctVal = document.getElementById("cct").value;
    console.log("inside set_dim cctVal is: ",cctVal)
    console.log("inside set_dim operation is : ", operation)
  
  //ajax call for dim
  var stUrl = "http://"+host+":"+port+"/v1/litm/lights";
                $.ajax({
                    type:'POST',
                    url:stUrl,
                    data:{dimVal:dimValue,light_id:light_id, level_id:level_id, opr:operation},
                    dataType: 'json',
                    success:function(msg){
                      if(msg.status == "Success"){
                       //swal("Done","Command Sent Successfully","success");
                       swal({
                        title: "Done",
                        text: "Command sent successfully",
                        type: "success",
                        allowOutsideClick: true,
                      });
                          }else{
                            swal("Error",msg.status,"error");
                          }
                    },
                    error:function(response) {
                        swal("Error", "Something went wrong. Please Check your internet connection or cantact Administator", "error");
                    }
                    });
}

// cct slider value
var slider1 = document.getElementById("cct");
var output1 = document.getElementById("sliderValue1");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
  cctValue = this.value
  //console.log("cctValue: ",cctValue)
}

slider1.onchange = function() {
  // output1.innerHTML = this.value;
  // cctValue = this.value
  console.log("cctValue: ",cctValue)

  operation = "set_cct"
    console.log("inside set_cct.............")
    console.log("inside set_cct light_id is: ",light_id)
    console.log("inside set_cct level_id is: ",level_id)
    console.log("inside set_cct isOn is: ",isOn)
    console.log("inside set_cct dimValue is: ",dimValue)
    cctVal = document.getElementById("cct").value;
    console.log("inside set_cct cctVal is: ",cctVal)
    console.log("inside set_cct operation is : ", operation)
  //ajax call for cct
  var stUrl = "http://"+host+":"+port+"/v1/litm/lights";
      $.ajax({
          type:'POST',
          url:stUrl,
          data:{cctVal:cctValue,light_id:light_id, level_id:level_id, opr:operation},
          dataType: 'json',
          success:function(msg){
            if(msg.status == "Success"){
             //swal("Done","Command Sent Successfully","success");
             swal({
              title: "Done",
              text: "Command sent successfully",
              type: "success",
              allowOutsideClick: true,
            });
                }else{
                  swal("Error",msg.status,"error");
                }
          },
          error:function(response) {
             swal("Error", "Something went wrong. Please Check your internet connection or contact Administator", "error");
          }
            });
}

         $("#operation").change(function () {
             operation = this.value;
            console.log("operation is: ", operation)   
            if(operation == "set_power"){
                $("#set_power").show()
                $("#set_dim").hide()
                $("#set_cct").hide()
                $("#set").show()

            }else if(operation == "set_dim"){
                $("#set_dim").show()
                $("#set_power").hide()
                $("#set_cct").hide()
                $("#set").show()
            } else{
                $("#set_dim").hide()
                $("#set_power").hide()
                $("#set_cct").show()
                $("#set").show()
            }
         });

         //Power toggle value
    /*     $('#power').change(function() {
         isOn = $(this).prop('checked')
         console.log("Power isOn:", isOn)

         operation = "set_power"
    console.log("inside sendCommnad.............")
    console.log("inside sendCommnad light_id is: ",light_id)
    console.log("inside sendCommnad level_id is: ",level_id)
    console.log("inside sendCommnad isOn is: ",isOn)
    console.log("inside sendCommnad dimValue is: ",dimValue)
    cctVal = document.getElementById("cct").value;
    console.log("inside sendCommnad cctVal is: ",cctVal)
    console.log("inside sendCommnad operation is : ", operation)
      if (isOn == true) {
          var powVal = "01"
      }else{
          powVal = "00"
      }
        var stUrl = "http://"+host+":"+port+"/send";
              $.ajax({
                  type:'POST',
                  url:stUrl,
                  data:{isOn:powVal,light_id:light_id,level_id:level_id,opr: operation},
                  dataType: 'json',
                  success:function(msg){
                    console.log("msg is:",msg)
                     if(msg == "success"){
                     swal("Done","Command Send Successfully","success");
                        }else{
                          swal(msg,"Please reconfigure the port settings in the SETTINGS tab","error");
                        }
                  },
                  error:function(response) {
                    swal("Error", "Something went wrong. Please Check your internet connection or cantact Administator", "error");
                  } 
              });
        })*/

        //cct value is
        //var cctVal = $('#cct').val();
        // cctVal = document.getElementById("cct").value;
        // console.log('cctVal: ', cctVal);

//Hardcoded tree
var mytree = [
  /*
{
 text: "All Lights",
 id: "00",
 level_id:"1",
 nodes: [*/
   {
     text: "Gateway 1",
     id:"00",
     level_id:"1",
     nodes: [
       {
         text: "Street 1",
         id: "C9",
         level_id:"2",
         nodes: [
           {
             text: "Light 1",
             id: "01",
             level_id:"3"
           },
           {
             text: "Light 2",
             id: "02",
             level_id:"3"
           }                        
     ]
   },
   {
     text: "Street 2",
     id: "C8",
     level_id:"2",
     nodes: [
       {
         text: "Light 3",
         id: "03",
         level_id:"3"
       },
       {
         text: "Light 4",
         id: "04",
         level_id:"3"
       }                        
     ]
   }
 ]
},
   {
     text: "Gateway 2",
     id:"000",
     level_id:"1",
     nodes: [
       {
         text: "Street 3",
         id: "C10",
         level_id:"2",
         nodes: [
           {
             text: "Light 5",
             id: "05",
             level_id:"3"
           },
           {
             text: "Light 6",
             id: "06",
             level_id:"3"
           }                        
     ]
   },
   {
     text: "Street 4",
     id: "C11",
     level_id:"2",
     nodes: [
       {
         text: "Light 7",
         id: "07",
         level_id:"3"
       },
       {
         text: "Light 8",
         id: "08",
         level_id:"3"
       }                        
     ]
   }
 ]
}
/*
 ]
}*/
];

//Initializing the treeview
 $('#tree').treeview({
          data: mytree,         // data is not optional
          levels: 2,
          selectedBackColor: "#00b56c"
        });

    $('#tree').on('nodeSelected',function(event, ndata) {
            level = ndata.text;
            light_id = ndata.id;
            level_id = ndata.level_id;
            console.log("selected level is: ",level);
            console.log("selected light_id is: ",light_id);
            console.log("selected level_id is: ",level_id);

            var selected = level;
            $("#level").val(selected);
            if(light_id != null){
                $("#infoMsg").hide()
                $("#sideInfo").show()

            }
    });




 });
function sendCommnad(){
  
operation = "set_power"
    console.log("inside sendCommnad.............")
    console.log("inside sendCommnad light_id is: ",light_id)
    console.log("inside sendCommnad level_id is: ",level_id)
    console.log("inside sendCommnad isOn is: ",isOn)
    console.log("inside sendCommnad dimValue is: ",dimValue)
    cctVal = document.getElementById("cct").value;
    console.log("inside sendCommnad cctVal is: ",cctVal)
    console.log("inside sendCommnad operation is : ", operation)
    
   // var tport = document.getElementById("port").value;
   //  temport = tport.toUpperCase();
    //console.log("inside sendCommand com port is: ", temport)
       
        if (isOn == true) {
            var powVal = "01"
        }else{
            powVal = "00"
        }
          var stUrl = "http://"+host+":"+port+"/v1/litm/lights";
                $.ajax({
                    type:'POST',
                    url:stUrl,
                    data:{isOn:isOn,light_id:light_id,level_id:level_id,opr: operation},
                    dataType: 'json',
                    success:function(msg){
                      console.log("msg is:",msg)
                       if(msg.status == "Success"){
                       //swal("Done","Command Sent Successfully","success");
                       swal({
                        title: "Done",
                        text: "Command sent successfully",
                        type: "success",
                        allowOutsideClick: true,
                      });
                          }else{
                            swal("Error",msg.status,"error");
                          }
                    },
                    error:function(response) {
                      swal("Error", "Something went wrong. Please Check your internet connection or contact Administator", "error");
                    } 
                });
    
}
