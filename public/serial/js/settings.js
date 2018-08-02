var cport
var brate
var dbits
var parity
var sbits

$(document).ready(function() {

    cport = document.getElementById("port").value;

  $("#brate").change(function () {
             brate = this.value;
            console.log("brate is: ", brate)   
         });

$("#dbits").change(function () {
             dbits = this.value;
            console.log("dbits is: ", dbits)   
          
         });

$("#parity").change(function () {
             parity = this.value;
            console.log("parity is: ", parity)   
          
         });

$("#sbits").change(function () {
             sbits = this.value;
            console.log("sbits is: ", sbits)   
          
         });


$( "#portConf" ).submit(function( e ) {
        e.preventDefault();
        //console.log("settings submit button clicked");
        sendToLight();           
   });

});

function sendToLight(){
var host = window.document.location.hostname;
var port = location.port;

var portDetails = $("#portConf").serialize();
console.log(portDetails)

	cport = document.getElementById("port").value;
    console.log("inside sendToLight.............")
    console.log("inside sendToLight cport is: ",cport)
    console.log("inside sendToLight light_id is: ",brate)
    console.log("inside sendToLight level_id is: ",dbits)
    console.log("inside sendToLight isOn is: ",parity)
    console.log("inside sendToLight dimValue is: ",sbits)

   var stUrl = "http://"+host+":"+port+"/getsettings";
                $.ajax({
                    type:'POST',
                    url:stUrl,
                    //data:{cport:cport,brate:brate,dbits:dbits,parity: parity,cport:cport},
                    data:portDetails,
                    //dataType: 'json',
                    beforeSend: function(){
                        // Show image container
                        $("#chartloader").show();
                       },
                    success:function(msg){
                       if(msg == "failed"){
                               swal("Error",msg,"error");
                       }else{
                        swal("Done","Your settings have been saved successfully","success");
                       }
                    },
                    complete: function(data){
                        // Hide image container
                        $("#chartloader").hide();
                       }
                });
}
