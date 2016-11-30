/// <reference path="angular.min.js" />

var app = angular.module("myApp", ["ngRoute"])
                 .config(function ($routeProvider) {
                     $routeProvider
                        .when("/home", {
                            templateUrl: "/Templates/home.html",
                            controller: "homeController"
                        })
                         .when("/create", {
                             templateUrl: "/Templates/create.html",
                             controller: "createController"
                         })
                         .when("/remove/:Id", {
                             templateUrl: "/Templates/remove.html",
                             controller: "removeController"
                         })
                        //.when("/courses", {
                        //    templateUrl: "/Templates/courses.html",
                        //    controller: "coursesController"
                        //})
                        //.when("/students", {
                        //    templateUrl: "/Templates/students.html",
                        //    controller: "studentsController"
                        //})
                         .when("/people/:Id", {
                             templateUrl: "/Templates/peopleDetail.html",
                             controller: "peopleDetailsController"
                         })
                     .otherwise({
                         redirectTo: "/home"
                     })
                     //$locationProvider.html5Mode(true);
                 })


.controller("homeController", function ($scope, $http) {
    //var vm = this;
    //vm.reloadData = function () {
    //    $route.reloadData();
    //}
    $http.get("People/AjaxThatReturnsJson")
    .then(function (response) {
        $scope.persons = response.data;
        console.log(response.data);
    })
})

.controller("peopleDetailsController", function ($scope, $http, $routeParams) {
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,

        method: "get"
    })
        .then(function (response) {
            $scope.peopledetail = response.data;
            console.log(response.data);
        })
})

.controller("createController", function ($scope, $http, $location) {

    $scope.sendform = function () {
        console.log($scope.form);
        $http({

            url: "People/Create",
            method: "post",
            data: newPerson = $scope.form
        })
        .success(function (response) {
            $scope.successCreate = response.data;
            console.log(response.data);
            alert("Created successfully!");
            $location.url('/home')
        })
    }
})

.controller("removeController", function ($scope, $http, $routeParams, $location) {
    $scope.param = $routeParams;
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,
        method: "get"
    })
    .then(function (response) {
        $scope.peopleRemoveDetail = response.data;
        console.log(response.data);
    })

    $scope.sendRemoveform = function () {
        console.log('removeAjax ' + $scope.param.Id);
        $http({
            url: "People/Remove/" + $scope.param.Id,
            method: "post",
        })

        .success(function (response) {
            $scope.successDelete = response.data;
            console.log(response.data);
            alert("Removed successfully!");
            $location.url('/home')
        })
    }
})







//.controller("studentDetailsController", function ($scope, $http) {
//    $http.get("People/AjaxThatReturnsJsonPerson")
//    .then(function (response) {
//        $scope.studentdetail = response.data;
//        console.log(response.data);
//    })
//})


//.controller("coursesController", function ($scope) {
//    $scope.courses = ["C#", "ASP.NET", "SQL Server", "Linux"];
//})

//.controller("studentsController", function ($scope, $http) {
//    //$http.get("StudentService.asmx/GetAllStudents")
//    //.then(function (response) {
//    //    $scope.students = response.data;
//    //})
//    $scope.students = ["C#", "ASP.NET", "SQL Server", "Linux"];
//})



//Load partial view inside the detailsdiv on button click
//$('#buttonDetails').click(function () {
//    $.ajax({
//        type: 'POST',
//        url: '@Url.Content("~/Shared/_Studentdetails")',
//        data: objectToPass,
//        success: function (data) {
//            $('#detailsdiv').innerHTML = data;
//        }
//    });
//});