      DZ.init({
      appId  : '261582',
      channelUrl : 'http://127.0.0.1:5000',
    });

      window.onload = function(){
      getGraph();
      };


//arrays to hold objects of bpm list - {[title:title1,bpm:bpm1,artist:artist1],[title:title2,bpm:bpm2,artist:artist2]}...etc        
var arr1 = [];
var arr2 = [];
var arr3 = [];
var arr4 = [];    

function getGraph(){
    
    
      DZ.getLoginStatus(function(response){
          var id = response.userID;
          var token = response.authResponse.accessToken;


          var url = 'https://api.deezer.com/user/' + id +'/tracks&access_token='+ token;
          function httpGet(url){
              var xmlHttp = new XMLHttpRequest();
              xmlHttp.open( "GET", url, false ); 
              xmlHttp.send( null );
              return JSON.parse(xmlHttp.response);
            }


      var apiresponse = httpGet(url)
      console.log(apiresponse)
      console.log(id);

    

      ////////////////Get User Data//////////////////////
      //here we make a call for the user specific details, store the variables and when this parent function is run on page loading - so is this innerHTML injection(s)
        DZ.api('user/me',function(response){
            var name = response.name;
            var pic = response.picture_medium;
            var email = response.email;

      //opening alert to recommend use of the information pop-up
        // alert('Hey '+name+", we recommend you make use of our 'information pop-up' which can be found at the top of your screen on the navigation-bar. Just look for the 'i' icon!")

            //check if the name is undefined...in which case return an error string..the error handling for the image is alot simpler and done within the img tag
            if (name === undefined) {
                // name = "Sorry but there was an error retrieving your name, so here is your email; "+email;
                     name = "Sorry but there was an error retrieving your name..";
            }

            document.getElementById("user_name").innerHTML +="<h4>"+"Hey there,"+"</h4>" + "<h4 class="+"user_name_css"+">"+name+"</h4>" + ".";
            document.getElementById("user_image").innerHTML +="<img  onerror="+"this.onerror=null;this.src='./static/img/backup.jpg';this.style='border-radius:0'"+" alt=User_Image class="+"user-avatar"+" src=\"" + pic + "\">"; 
            //the above line for the user's image has a default src incase the user has no image for their profile so the call returns an error .
        });
    


      ////////////////Slideshow//////////////////////
    DZ.api('/chart', function(response){
    for (var i = 0; i <6; i++) {
    console.log(response.tracks.data[i].album.cover_medium);
    output = response.tracks.data[i].album.cover_medium;
    
    document.getElementById("pic"+i).innerHTML="<img src=\"" + output + "\">";
    }
  });

       /////////Get Albums id to get genres///////////////
    DZ.api('/user/me/albums', function(response){
    for (var i = 0; i <response.data.length; i++) {
    idOutput = response.data[i].id;


        //d3 album section
            DZ.api('album/'+ idOutput, function(response){
            for (var i = 0; i <1; i++) {
            if (typeof response.genres.data[i] !== 'undefined') {
            console.log(response.genres.data[i].name);
        }

        }
        });

    }

  });

    ///GET BPM INFO LOADED
    

  DZ.api('user/me/recommendations/tracks',function(response){
    var recTrackLength = response.data.length;

    var trackListIds = new Array(recTrackLength);
   //console.log(response);//object of all songs
   for(i=0;i<recTrackLength;i++){
     //console.log(response.data[i]); // displays all songs in recommendations
     
     trackListIds[i] = response.data[i].id;
   //   console.log(trackListIds[i]);
   }

   //loop through tracks and store info on each on (name,artist and BPM)
   for(i=0;i<recTrackLength;i++){
       
       //call each track and store info in respective arrays
       DZ.api('track/'+trackListIds[i],function(response){
           if(response.bpm <= 100 && response.bpm!=0)
           {

               //store info in arr1
               arr1[arr1.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
               
           }
           else if (response.bpm <= 125 && response.bpm >= 100){
                 //store info in arr1
                 arr2[arr2.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           else if (response.bpm <= 150 && response.bpm >= 125){
                 //store info in arr1
                 arr3[arr3.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           else if (response.bpm <= 175 && response.bpm >= 150){
                 //store info in arr1
                 arr4[arr4.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           
       });
   }

 });









    /////////Playlist Viewport///////////////
    // Here I just call the api for a user's playlist
    DZ.api('/user/me/playlists', function(response){
    //store response
    var id = response.data[1].id;
    //add it to the iframe link
    var link = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=" + id + "&app_id=1"
    var iframe = document.createElement('iframe');
    iframe.frameBorder=0;
    iframe.width="450px";
    iframe.height="250px";
    iframe.id="randomid";
    iframe.setAttribute("src", link);
    document.getElementById("play").appendChild(iframe);
    
    });




//    // no user session available, someone you dont know
//  }
// });

  // DZ.api('/user/me', function(response){
  //   console.log(response);
  //   // document.getElementById('showGraph').innerHTML = '<h1>Welcome back to Deezer <b>' + response.name + '</b></h1>';
  // });
});
}

        function logout(){
    DZ.logout();

        }



// [][][][][][][][][][][][]BPM CODE[][][][][][][][][]






// function getBPM(){//this function is called in carousel.js onclick of each of the bubbles passing in a range

//}

function clearBPM(){

     arr1.length = 0;
     arr2.length = 0;
     arr3.length = 0;
     arr4.length = 0;
}

function getBPM(){
        ///GET BPM INFO LOADED
    
 
  DZ.api('user/me/recommendations/tracks',function(response){
    
    var recTrackLength = response.data.length;

    var trackListIds = new Array(recTrackLength);
   //console.log(response);//object of all songs
   for(i=0;i<recTrackLength;i++){
     //console.log(response.data[i]); // displays all songs in recommendations
     
     trackListIds[i] = response.data[i].id;
   //   console.log(trackListIds[i]);
   }

   //loop through tracks and store info on each on (name,artist and BPM)
   for(i=0;i<recTrackLength;i++){
       
       //call each track and store info in respective arrays
       DZ.api('track/'+trackListIds[i],function(response){
           if(response.bpm <= 100 && response.bpm!=0)
           {

               //store info in arr1
               arr1[arr1.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
               
           }
           else if (response.bpm <= 125 && response.bpm >= 100){
                 //store info in arr1
                 arr2[arr2.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           else if (response.bpm <= 150 && response.bpm >= 125){
                 //store info in arr1
                 arr3[arr3.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           else if (response.bpm <= 175 && response.bpm >= 150){
                 //store info in arr1
                 arr4[arr4.length] = {
                   title: response.title,
                   bpm: response.bpm,
                   artist: response.artist.name,
                   id: response.id
               }
           }
           
       });
   }

 });
}



//NOT WORKING AT THE MOMENT
// function displayList1(title,artist,bpm){
//     document.getElementsByClassName("list1").innerHTML += "<a href='#' class='list-group-item'><span class='glyphicon glyphicon-music'></span> "+title +" - "+artist+" <span class='badge'>"+bpm+"</span></a>";
// }



/*[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]*/
/*[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]*/
/*[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]*/

  datasetTotal = [
    { label: 'Rock', value: 19 },
    { label: 'Pop', value: 5 },
    { label: 'EDM', value: 13 },
    { label: 'Donkage', value: 17 },
    { label: 'Country', value: 19 },
    { label: 'eee', value: 22 },
    { label: 'p', value: 25 },
    { label: ';', value: 24 },
    { label: 'l', value: 21 },
    { label: 'k', value: 29 },
    { label: 'j', value: 26 },
    { label: 'jjj', value: 27 }
];

// datasetOption1 = [
//     { label: "Category 11", value: 22 },
//     { label: "Category 12", value: 33 },
//     { label: "Category 13", value: 4 },
//     { label: "Category 14", value: 15 },
//     { label: "Category 15", value: 36 },
//     { label: "Category 16", value: 0 }
// ];

// datasetOption2 = [
//     { label: "Category 21", value: 10 },
//     { label: "Category 22", value: 20 },
//     { label: "Category 23", value: 30 },
//     { label: "Category 24", value: 5 },
//     { label: "Category 25", value: 12 },
//     { label: "Category 18", value: 23 }
// ];


d3.selectAll("input").on("change", selectDataset);

function selectDataset() {
    var value = this.value;
    if (value == "total") {
        drawBubbles(datasetTotal);
    } else if (value == "option1") {
        drawBubbles(datasetOption1);
    } else if (value == "option2") {
        drawBubbles(datasetOption2);
    }
}

var diameter = 600,
    bubblePadding = -7, //Give negative value in order to overlop the bubbles
    duration = 750,
    delay = 0;

var svg = d3.select('#bubbleChart').append('svg')
    .attr('width', diameter)
    .attr('height', diameter);


var bubbleNode = d3.layout.pack()
    .size([diameter, diameter])
    .padding(bubblePadding)
    .value(function(d) {
        return d.size = (d.size == '0.0' || d.size == '0') ? '0.1000' : d.size; //0.1000 is considered as a special size for size with value '0' to give some radius for the bubble charts to be drawn
    })

function processData(data) {

    var newDataSet = [];

    for (var i = 0; i < data.length; i++) {
        var name = data[i].label,
            size = data[i].value

        newDataSet.push({ name: name, className: 'bubble-' + (i + 1), size: size });
    }

    return { children: newDataSet.reverse() };
    console.log(newDataSet);
}

function drawBubbles(data) {

    var nodes = bubbleNode.nodes(processData(data))
        .filter(function(d) {
            return !d.children;
        }); // filter out the outer bubble

    var bubble = svg.selectAll('.bubble')
        .data(nodes, function(d) {
            return d.name;
        });

    // exit
    var bubbleExit = bubble.exit()
        .transition()
        .duration(duration + delay)
        .style('opacity', 0)
        .remove();

    var bubbleEnter = bubble.enter()
        .append('g')
        .attr('class', 'bubble')
        // Position the g element like the circle element used to be.
        .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        })



    var bubbleCircle = bubbleEnter.append('circle')
        .attr('r', function(d) {
            return d.r;
        })
        .attr('class', function(d) {
            return d.className;
        })
        .style('opacity', 0)
        .transition()
        .duration(duration)
        .style('opacity', 1);


    var bubbleLabel = bubbleEnter.append('text')
        .attr('class', 'bubble-label')
        .attr('dy', '.3em')
        .attr('text-anchor', 'middle')
        .attr('font-size', function(d) {
            //return (d.r > 85) ? (d.r / 5)+'px' : (d.r / 3)+'px';
            var len = d.name.substring(0, d.r / 5).length;
            var size = d.r / 5;
            size *= 10 / len;
            size += 1;
            size = (size < 18) ? size : 18;
            return Math.round(size) + 'px';
        })
        .text(function(d) {
            //return d.title; 
            var text = d.name.substring(0, d.r / 5);
            return text;
        })
        .style('opacity', 0.2)
        .transition()
        .duration(duration)
        .style('opacity', 1);;

    // update - This only applies to updating nodes
    var bubbleCircleUpdate = bubble.select('circle').transition()
        .duration(duration)
        .delay(function(d, i) {
            delay = i * 7;
            return delay;
        })
        .attr('r', function(d) {
            return d.r;
        })
        .style('opacity', 0)
        .transition()
        .duration(duration)
        .style('opacity', 1);


    var bubbleLableUpdate = bubble.select('text').transition()
        .duration(duration)
        .delay(function(d, i) {
            delay = i * 7;
            return delay;
        })
        .attr('dy', '.3em')
        .attr('text-anchor', 'middle')
        .attr('font-size', function(d) {
            //return (d.r > 85) ? (d.r / 5)+'px' : (d.r / 3)+'px';
            var len = d.name.substring(0, d.r / 5).length;
            var size = d.r / 3;
            size *= 10 / len;
            size += 1;
            size = (size < 18) ? size : 18;
            return Math.round(size) + 'px';
        })
        .text(function(d) {
            //return d.title; 
            var text = d.name.substring(0, d.r / 5);
            return text;
        })
        .style('opacity', 0)
        .transition()
        .duration(duration)
        .style('opacity', 1);



}

drawBubbles(datasetTotal);

/*[][][][][][][][][][][][][][][][][][][][][]*/
/*[][][][][][][][][][][][][][][][][][][][][]*/
/*Konami Code*/

var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

$(document).keydown(function(e) {

  kkeys.push( e.keyCode );

  if ( kkeys.toString().indexOf( konami ) >= 0 ) {

    $(document).unbind('keydown',arguments.callee);
    
    $('#myModal3').modal('show');
    $("#theclosingbutton").click(function(){
        $('#myModal3').modal('hide');
    });
  
  }

});