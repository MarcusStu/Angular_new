/// <reference path="angular.min.js" />

var app = angular.module("myApp", ["ngRoute"])
                 .config(function ($routeProvider) {
                     $routeProvider
                        .when("/home", {
                            templateUrl: "/Templates/home.html",
                            controller: "homeController"
                        })
                        .when("/courses", {
                            templateUrl: "/Templates/courses.html",
                            controller: "coursesController"
                        })
                        .when("/students", {
                            templateUrl: "/Templates/students.html",
                            controller: "studentsController"
                        })
                         .when("/home/:Id", {
                             templateUrl: "/Templates/studentDetail.html",
                             controller: "studentDetailsController"
                         })
                     .otherwise({
                         redirectTo: "/home"
                     })
                     //$locationProvider.html5Mode(true);
                 })


.controller("homeController", function ($scope, $http) {
    $http.get("People/AjaxThatReturnsJson")
    .then(function (response) {
        $scope.persons = response.data;
        console.log(response.data);
    })
})

.controller("studentDetailsController", function ($scope, $http, $routeParams) {
    $http({
        url: "People/AjaxThatReturnsJsonPerson/" + $routeParams.Id,

        method: "get"
    })
        .then(function (response) {
            $scope.studentdetail = response.data;
            console.log(response.data);
        })
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
$('#buttonDetails').click(function () {
    $.ajax({
        type: 'POST',
        url: '@Url.Content("~/Shared/_Studentdetails")',
        data: objectToPass,
        success: function (data) {
            $('#detailsdiv').innerHTML = data;
        }
    });
});