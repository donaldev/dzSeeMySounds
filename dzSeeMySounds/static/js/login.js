


        function login(){
          DZ.login(function(response) {
            if (response.authResponse) {
              console.log(response);
              if (response.status == 'connected') {
                DZ.api('/user/me', function(user) {
                  window.location.href = 'http://127.0.0.1:5000/main';
                   });
                  }
                }
              }, {perms: 'email, basic_access, online_access, manage_library, manage_community, delete_library, listening_history'});
            }