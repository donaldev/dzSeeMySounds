      DZ.init({
      appId  : '261582',
      channelUrl : 'http://127.0.0.1:5000',
    });

      window.onload = function(){
      getGraph();
      };




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
     /*
      ////////////////Greet User with alert//////////////////////
    DZ.api('/user/me', function(response){
      alert(name);
    });      
    */

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

    DZ.api('album/'+ idOutput, function(response){
    for (var i = 0; i <1; i++) {
    if (typeof response.genres.data[i] !== 'undefined') {
    console.log(response.genres.data[i].name);
  }

}
  });

}

  });


  
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

function getBPM(range){
  var bpmRangeU = range;//upper range
  var bpmRangeL = range - 20;//lower range


//=============== WORK TO BE DONE HERE =============//


  DZ.api('user/me/tracks',function(response){
     var recTrackLength = response.data.length;
    console.log(response);
    for(i=0;i<recTrackLength;i++){
      console.log(response.data[i]);
    }
  });

}





/*[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]*/

(function() {
  
    // Fake JSON data
    var json = {"countries_msg_vol": {
      "CA": 1700, "US": 393, "BB": 12, "CU": 9, "BR": 89, "MX": 192, "PY": 32, "UY": 9, "VE": 25, "BG": 42, "CZ": 12, "HU": 7, "RU": 184, "FI": 42, "GB": 162, "IT": 87, "ES": 65, "FR": 42, "DE": 102, "NL": 12, "CN": 92, "JP": 65, "KR": 87, "TW": 9, "IN": 98, "SG": 32, "ID": 4, "MY": 7, "VN": 8, "AU": 129, "NZ": 65, "GU": 11, "EG": 18, "LY": 4, "ZA": 76, "A1": 2, "Other": 254 
    }};
    
      // D3 Bubble Chart 
  
      var diameter = 600;
  
      var svg = d3.select('#graph').append('svg')
                      .attr('width', diameter)
                      .attr('height', diameter);
  
      var bubble = d3.layout.pack()
                  .size([diameter, diameter])
                  .value(function(d) {return d.size;})
           // .sort(function(a, b) {
                  // 	return -(a.value - b.value)
                  // }) 
                  .padding(3);
    
    // generate data with calculated layout values
    var nodes = bubble.nodes(processData(json))
                          .filter(function(d) { return !d.children; }); // filter out the outer bubble
   
    var vis = svg.selectAll('circle')
                      .data(nodes);
    
    vis.enter().append('circle')
              .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
              .attr('r', function(d) { return d.r; })
              .attr('class', function(d) { return d.className; });
    
    function processData(data) {
      var obj = data.countries_msg_vol;
  
      var newDataSet = [];
  
      for(var prop in obj) {
        newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
      }
      return {children: newDataSet};
    }
    
  })();