
$(document).ready(function() {
    var carousel = $(".carousel"),
    currdeg  = 0;

$(".btnPrev").on("click", { d: "n" }, rotate);
$(".btnNext").on("click", { d: "p" }, rotate);

function rotate(e){
  if(e.data.d=="n"){
    currdeg = currdeg - 60;
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 60;
  }
  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
}


//============JQJS for BPM


$(".circle1").on('click',function(){

  getBPM(100);
  //getBPM(80);
  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list1").css('visibility')=='hidden'){
    
    $(".list1").css('visibility','visible') 
  }
  else{
    $(".list1").css('visibility','hidden'); 
  }
  
})



$(".circle2").on('click',function(){

  getBPM(125);
  
  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list2").css('visibility')=='hidden'){
    
    $(".list2").css('visibility','visible') 
  }
  else{
    $(".list2").css('visibility','hidden'); 
  }
  
})



$(".circle3").on('click',function(){
  getBPM(150);

  

  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list3").css('visibility')=='hidden'){

    $(".list3").css('visibility','visible') 
  }
  else{
    $(".list3").css('visibility','hidden'); 
  }
  
})



$(".circle4").on('click',function(){
  
  getBPM(175);
  if($(".list4").css('visibility')=='hidden'){
    
    $(".list4").css('visibility','visible') 
  }
  else{
    $(".list4").css('visibility','hidden'); 
  }
  
})



//================================= User details




// function displayList1(title,artist,bpm){

//   $('.list1').append("<a href='#' class='list-group-item'><span class='glyphicon glyphicon-music'></span> "+title +" - "+artist+" <span class='badge'>"+bpm+"</span></a>");
  
// }



});


