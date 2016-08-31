angular.module("mean", [])
.controller('meanController', function($http){
    var meanCtrl = this;
    $http.get('/api').then(function(response){
        meanCtrl.header = response.data.header;
    })
});