app.controller('indexController',['$scope','indexFactory', ($scope, indexFactory) => {

    $scope.init = () => {

        var n = 0, msg = 'Please enter username (Maximum limit 20)'
        let username;
        do {
            n++;
            if(n > 1) msg = "You had too many characters! \nPlease enter username (Maximum limit 20).";
            username = prompt(msg, "Name");
        
        }
        while (username.length > 20)

        if(username){
            initSocket(username);
        }
        else
            return false
    };

    function initSocket(username) {
        const connectionOptions = {
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        };

        indexFactory.connectSocket('http://localhost:3000',connectionOptions)
            .then((socket) => { 
                socket.emit('newUser', { username });
            }).catch((err) => {
                console.log(err);
        });
    };


    

    
}]);