'use strict';
angular.module('EnoticeBoardWebApp.dashboard', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html'
        , controller: 'dashboardCtrl'
    });
}]).controller('dashboardCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseObject', '$firebaseAuth', '$location', function ($scope, CommonProp, $firebaseArray, $firebaseObject, $firebaseAuth, $location) {
    $scope.username = CommonProp.getUser();
    var Department;
    var name;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userId = firebase.auth().currentUser.uid;
            var reff = firebase.database().ref('/Student/' + userId).once('value').then(function (snapshot) {
                Department = snapshot.val().department;
                name = snapshot.val().name;
                $scope.depth = Department; //Department
                $scope.name = name; //username
                $scope.block = snapshot.val().block; //username
                 var Level = snapshot.val().level;
                 console.log($scope.depth);
                 console.log($scope.name);
                // var block = snapshot.val().block;
                 if(Level==5){
                var ref = firebase.database().ref().child('posts').child(Department).child('Approved').orderByChild("servertime");
                $scope.articles = $firebaseArray(ref);
                var ref1 = firebase.database().ref().child('posts').child(Department).child('Pending').orderByChild("approved").equalTo("pending");
                $scope.pending = $firebaseArray(ref1);
                 var ref11 = firebase.database().ref().child('posts').child(Department).child('Approved').orderByChild("servertime").limitToFirst(3);
                $scope.notify = $firebaseArray(ref11);

                var ref112 = firebase.database().ref().child('posts').child(Department).child('Approved').orderByChild("UID").equalTo(userId);
                $scope.app1 = $firebaseArray(ref112);
                console.log(userId);
                var ref2 = firebase.database().ref().child('Student').orderByChild("department").equalTo(Department);
                $scope.users = $firebaseArray(ref2);
                var ref22 = firebase.database().ref().child('posts').child('ALL').child('Approved');
                $scope.principal = $firebaseArray(ref22);
                
            }
            });
        }
        
    });
    $scope.editPost = function (id) {
        var ref = firebase.database().ref().child('posts').child(Department).child('Deptposts').child(id);
        $scope.editPostData = "true";
        console.log($scope.editPostData);
        ref.update({}).then(function (ref) {
            console.log(ref);
        }, function (error) {
            console.log(error);
        });
    };
    $scope.logout = function () {
        console.log("DJDJDJJDJ");
        CommonProp.logoutUser();
    }
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