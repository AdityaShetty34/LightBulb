var myVar
$(document).ready(function() {

$( "#scheduleFrm" ).submit(function( e ) {
    e.preventDefault();
    //console.log("settings submit button clicked");
    swal("Done","Schedule set successfully","success");
    setSchedule();           
});

$("#demoBtn").click(function(){
    setDemoSchedule();
    myVar = setInterval(getAlert, 1000);
}); 

$("#stopBtn").click(function(){
    stopDemoSchedule();
}); 

});

function setSchedule(){

var host = window.document.location.hostname;
var port = location.port;

var schData = $("#scheduleFrm").serialize();
    console.log("schData is:",schData)


   var stUrl = "http://"+host+":"+port+"/set_schedule";
                $.ajax({
                    type:'POST',
                    url:stUrl,
                    data:schData,
                    //dataType: 'json',
                    success:function(msg){
                       if(msg == "fail"){
                               swal("Error",msg,"error");
                       }else if(msg == "set"){
                        swal("Done",msg,"success");
                       }
                    }
                });

}

function setDemoSchedule(){

    var host = window.document.location.hostname;
    var port = location.port;
    
    var schData = $("#scheduleFrm").serialize();
        console.log("schData is:",schData)
    
    
       var stUrl = "http://"+host+":"+port+"/set_demo_schedule";
                    $.ajax({
                        type:'POST',
                        url:stUrl,
                        data:schData,
                        //dataType: 'json',
                        beforeSend: function(){
                            // Show image container
                           // $("#stopBtn").show();
                            $("#chartloader").show();
                            var elem = document.getElementById('stopBtn');
                            elem.style.display = "inline-block";
                            
                           },
                        success:function(msg){
                           if(msg == "done"){
                            clearInterval(myVar);
                            $("#stopBtn").hide();
                           // swal("Done","Simulator Stopeed!","success");
                            swal({
                                title: "Done",
                                text: "Simulator Stopeed!",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonClass: "btn-primary",
                                confirmButtonText: "Done",
                                closeOnConfirm: true
                              },
                              function(){
                                // swal("Deleted!", "Your imaginary file has been deleted.", "success");
                                $('#alrt1').hide();
                                $('#alrt2').hide();
                                $('#alrt3').hide();
                                $('#alrt4').hide();
                                $('#alrt5').hide();
                                $('#alrt6').hide();
                                $('#alrt7').hide();
                                $('#alrt8').hide();
                                $('#alrt9').hide();
                                $('#alrt10').hide();
                                $('#alrt11').hide();
                                $('#alrt12').hide();
                                $('#alrt13').hide();
                                $('#alrt14').hide();
                              });
                           }else{
                                swal("Error",msg,"error");
                                clearInterval(myVar);
                           }
                        },
                        complete: function(data){
                            // Hide image container
                            $("#chartloader").hide();
                            $("#stopBtn").hide();
                            clearInterval(myVar);
                           }
                    });
    
}

function stopDemoSchedule(){
    var host = window.document.location.hostname;
    var port = location.port;
    var stpData = "stop"
     var stUrl = "http://"+host+":"+port+"/stop_demo";
                    $.ajax({
                        type:'POST',
                        url:stUrl,
                        data:stpData,
                        //dataType: 'json',
                        success:function(msg){

                       }
                    });
    
}

function getAlert(){
    var host = window.document.location.hostname;
    var port = location.port;

    var stUrl = "http://"+host+":"+port+"/get_alert";
    $.ajax({
        type:'GET',
        url:stUrl,
        //data:schData,
        //dataType: 'json',
        success:function(msg){
         console.log(msg)
         switch(msg) {
            case 1:
                $('#alrt1').hide();
                                $('#alrt2').hide();
                                $('#alrt3').hide();
                                $('#alrt4').hide();
                                $('#alrt5').hide();
                                $('#alrt6').hide();
                                $('#alrt7').hide();
                                $('#alrt8').hide();
                                $('#alrt9').hide();
                                $('#alrt10').hide();
                                $('#alrt11').hide();
                                $('#alrt12').hide();
                                $('#alrt13').hide();
                                $('#alrt14').hide();
                $('#alrt1').show();
                break;
            case 2:
                $('#alrt2').show();
                //$('#alrt1').hide();
                break;
            case 3:
                $('#alrt3').show();
                //$('#alrt2').hide();
                break;
            case 4:
                $('#alrt4').show();
               // $('#alrt3').hide();
                break;
            case 5:
                    $('#alrt5').show();
                    //$('#alrt2').hide();
                    break;
            case 6:
                    $('#alrt6').show();
                   // $('#alrt3').hide();
                    break;
            case 7:
                        $('#alrt7').show();
                        //$('#alrt2').hide();
                        break;
            case 8:
                        $('#alrt8').show();
                       // $('#alrt3').hide();
                        break;
                case 9:
                        $('#alrt9').show();
                       // $('#alrt3').hide();
                        break;
                case 10:
                            $('#alrt10').show();
                            //$('#alrt2').hide();
                            break;
                case 11:
                            $('#alrt11').show();
                           // $('#alrt3').hide();
                            break;
                           
                    case 12:
                                $('#alrt12').show();
                                //$('#alrt2').hide();
                                break;
                    case 13:
                                $('#alrt13').show();
                               // $('#alrt3').hide();
                                break;
                     case 14:
                                $('#alrt14').show();
                               // $('#alrt3').hide();
                                break;
            default:
                $('#alertCheck').hide();
        }
        }
    });

}