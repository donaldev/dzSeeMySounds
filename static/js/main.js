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

      ////////////////Slideshow//////////////////////
    DZ.api('/user/me/tracks', function(response){
    for (var i = 0; i <3; i++) {
    console.log(response.data[i].album.cover);
    output = response.data[i].album.cover_xl;
    document.getElementById("pic"+i).innerHTML="<img src=\"" + output + "\">";
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
