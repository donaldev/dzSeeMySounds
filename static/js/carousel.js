
$(document).ready(function() {

  //=================================== Waypoints & Animate.css

   // hide our element on page load
  //  $('.block1').css('opacity', 0);
   
  //   $('.block1').waypoint(function() {
  //       $('.block1').addClass('fadeInLeft');
  //   }, { offset: '9%' });

  //   $('.block2').css('opacity', 0);
    
  //    $('.block2').waypoint(function() {
  //        $('.block2').addClass('fadeInRight');
  //    }, { offset: '20%' });
   

  //=================================== Waypoints & Animate.css


    var carousel = $(".carousel"),
    arrayNum = 0;
    currdeg  = 0;

$(".btnPrev").on("click", { d: "n" }, rotate);
$(".btnNext").on("click", { d: "p" }, rotate);

function rotate(e){
  if(e.data.d=="n"){
    currdeg = currdeg - 60;
    arrayNum++;
    if(arrayNum < 0)
    {
     
      arrayNum = 5;
      
    }
    else if (arrayNum > 5){
  
      arrayNum = 0;
    }
    getNext(arrayNum);
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 60;
    arrayNum--;
    if(arrayNum < 0)
    {
     
      arrayNum = 5;
      
    }
    else if (arrayNum > 5){
  
      arrayNum = 0;
    }
    
    getNext(arrayNum);
  }
  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
}

function getNext(number){
  
  if(arrayNum < 0)
  {
   
    arrayNum = 5;
    
  }
  else if (arrayNum > 5){

    arrayNum = 0;
  }
  console.log(number);
  $("#caption").html(chartArr[number].title);
}


//============JQJS for BPM


$(".circle1").on('click',function(){
//  console.log(arr1);
  // showBPM(100);
  // var arr1 = JSON.parse(localStorage.getItem("arr1"));
  // console.log(arr1[0]);
  //getBPM(80);
  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list1").css('visibility')=='hidden'){
     var html = "<table class='table bpm_table' border='1|1'>";
     var length1 = arr1.length;
     if(length1 > 5)
     {
       length1=5;
     }
     
     html+="<thead>";
     html+="<tr>";
         html+="<th>#</th>";
         html+="<th>Title</th>";
         html+="<th>BPM</th>";
     html+="</tr>";
     html+="</thead>";
     if(length1==0){
      html+="<tr>No Data Found - Let's try again! <button class='btn btn_reload' value ='Reload' onclick='getGraph()'></button></tr>";
    }
    else{
    for (var i = 0; i < length1; i++) {
      html+="<tr>";
      html+="<td>"+(i+1)+"</td>"
      html+="<td>"+arr1[i].title+ "-" + arr1[i].artist +"</td>";
      html+="<td>"+arr1[i].bpm+"</td>";

      html+="</tr>";

    }
  }

    html+="</table>";
     $(".list1").html(html);
    $(".list1").css('visibility','visible')

  }
  else{
    $(".list1").css('visibility','hidden'); 
  }
  
})



$(".circle2").on('click',function(){

 
  
  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list2").css('visibility')=='hidden'){
    var html = "<table class='table bpm_table' border='1|1'>";
    var length2 = arr2.length;
    console.log(length2);
    if(length2 > 5)
    {
      length2=5;
    }
    html+="<thead>";
    html+="<tr>";
        html+="<th>#</th>";
        html+="<th>Title</th>";
        html+="<th>BPM</th>";
    html+="</tr>";
    html+="</thead>";

    if(length2==0){
      html+="<tr>No Data Found - Let's try again! <button class='btn btn_reload' value ='Reload' onclick='getGraph()'></button></tr>";
    }
   for (var i = 0; i < length2; i++) {
     html+="<tr>";
     html+="<td>"+(i+1)+"</td>"
     html+="<td>"+arr2[i].title+ "-" + arr2[i].artist +"</td>";
     html+="<td>"+arr2[i].bpm+"</td>";

     html+="</tr>";

   }
   html+="</table>";
   $(".list2").html(html);
    $(".list2").css('visibility','visible') 
  }
  else{
    $(".list2").css('visibility','hidden'); 
  }
  
})



$(".circle3").on('click',function(){
  

  

  //getbpm() of users tracks and subsequently return their name if it is within the selected bpm
  if($(".list3").css('visibility')=='hidden'){
    var html = "<table class='table bpm_table' border='1|1'>";
    var length3 = arr3.length;
    console.log(length3);
    if(length3 > 5)
    {
      length3=5;
    }
    html+="<thead>";
    html+="<tr>";
        html+="<th>#</th>";
        html+="<th>Title</th>";
        html+="<th>BPM</th>";
    html+="</tr>";
    html+="</thead>";
    if(length3==0){
      html+="<tr>No Data Found - Let's try again! <button class='btn btn_reload' value ='Reload' onclick='getGraph()'></button></tr>";
    }
   for (var i = 0; i < length3; i++) {
     html+="<tr>";
     html+="<td>"+(i+1)+"</td>"
     html+="<td>"+arr3[i].title+ "-" + arr3[i].artist +"</td>";
     html+="<td>"+arr3[i].bpm+"</td>";

     html+="</tr>";

   }
   html+="</table>";
     $(".list3").html(html);
    $(".list3").css('visibility','visible') 
  }
  else{
    $(".list3").css('visibility','hidden'); 
  }
  
})



$(".circle4").on('click',function(){
  

  if($(".list4").css('visibility')=='hidden'){
    
    var html = "<table class='table bpm_table' border='1|1'>";
    var length4 = arr4.length;
    console.log(length4);
    if(length4 > 5)
    {
      length4=5;
    }
    html+="<thead>";
    html+="<tr>";
        html+="<th>#</th>";
        html+="<th>Title</th>";
        html+="<th>BPM</th>";
    html+="</tr>";
    html+="</thead>";
    if(length4==0){
      html+="<tr>No Data Found - Let's try again! <button class='btn btn_reload' value ='Reload' onclick='getGraph()'></button></tr>";
    }
   for (var i = 0; i < length4; i++) {
     html+="<tr>";
     html+="<td>"+(i+1)+"</td>"
     html+="<td>"+arr4[i].title+ "-" + arr4[i].artist +"</td>";
     html+="<td>"+arr4[i].bpm+"</td>";

     html+="</tr>";

   }
   html+="</table>";
     $(".list4").html(html);
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

//=================================== Change D3 CSS

// $(function() {
//   $('.bubble').hover(function() {
//     $('.bubble').css('opacity', '0.3');
//   }, function() {
//     // on mouseout, reset the background colour
//     $('.bubble').css('opacity', '0.7');
//   });
// });

// });



 

});