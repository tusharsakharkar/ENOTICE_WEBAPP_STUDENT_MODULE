'use strict';
angular.module('EnoticeBoardWebApp.pending', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/pending', {
        templateUrl: 'pending/pending.html'
        , controller: 'pendingCtrl'
    });
}]).controller('pendingCtrl', ['$scope','CommonProp','$firebaseArray','$firebaseObject','$firebaseAuth' ,function($scope,CommonProp,$firebaseArray,$firebaseObject,$firebaseAuth){
$scope.username = CommonProp.getUser();
  var Department;
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
         var userId = firebase.auth().currentUser.uid;
var reff =  firebase.database().ref('/Users/' + userId).once('value').then(function(snapshot) {
  Department = snapshot.val().department;
  $scope.block = snapshot.val().block;
  
  var level  = snapshot.val().level;
 if(level==1){
var ref = firebase.database().ref().child('posts').child(Department).child('Pending').orderByChild("UID").equalTo(userId);
$scope.articles  = $firebaseArray(ref);
}
else{
  alert("Not allowed to use Teacher Module");
}
});
  }
});



$scope.logout = function(){
  console.log("DJDJDJJDJ");
  CommonProp.logoutUser();
};
 $scope.deleteCnf = function (user) {
        $scope.deleteArticle = user;
        console.log($scope.deleteArticle.username);
    };
   $scope.viewCnf = function (user) {
        $scope.viewArticles = user;
        console.log($scope.viewArticles);
    };
      $scope.deletepost = function (deleteArticle) {

        $scope.articles.$remove(deleteArticle);
        $("#deleteModal").modal('hide');
    };

  }])
 