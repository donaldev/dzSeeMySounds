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
